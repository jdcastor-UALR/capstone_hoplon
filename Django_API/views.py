import json

from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from Django_API.model_functions import get_section_instructor_discipline_map, get_section_overlap_map, data_changed, \
    add_change_record
from Django_API.models import Instructor, RegistrationRequest, TimeSlot, Course, Section, Discipline, Solution, \
    DBInitStatus, AssignedSection
from Django_API.recursive_scheduler import RecursiveScheduler
from Django_API.serializers import PasswordChangeSerializer, UserSerializer, RegistrationRequestSerializer, \
    TimeSlotSerializer, CourseSerializer, SectionSerializer, InstructorSerializer, DisciplineSerializer, \
    InstructorWriteSerializer, CourseWriteSerializer, SolutionSerializer, SectionFullSerializer, SectionWriteSerializer, \
    AssignedSectionSerializer
from .user_permissions import *

logger = logging.getLogger()


# This view basically pre-processes token requests so we can catch login requests for the initialization step
class ObtainAuthTokenPreCheck(APIView):
    permission_classes = []

    @staticmethod
    def post(request, *args, **kwargs):
        try:
            init_ran = DBInitStatus.objects.get(id=1).root_initialized
            root_active = User.objects.get(username="root").is_active
            # if root_initialized has been set in the database and the root user is_active, then call basic token view
            if init_ran and root_active:
                auth_token_view = ObtainAuthToken.as_view()
                # I really don't like this direct reference to a private member but I couldn't
                # figure out another way to pass the request along.
                return auth_token_view(request._request, *args, **kwargs)
        except Exception as e:
            logger.exception(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response("root user initialization check failed", status=status.HTTP_404_NOT_FOUND)


class UserList(APIView):
    permission_classes = [IsRoot]

    @staticmethod
    def _get_users():
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return serializer.data

    def get(self, request, **kwargs):
        return Response(self._get_users())

    @staticmethod
    def post(request, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserPasswordChange(APIView):
    permission_classes = []

    @staticmethod
    def _get_user(username):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            return None

    def put(self, request, **kwargs):
        serializer = PasswordChangeSerializer(data=request.data)
        if serializer.is_valid():
            user = self._get_user(serializer.validated_data['username'])
            if user:
                if user.change_password(serializer.validated_data['password'],
                                        serializer.validated_data['new_password']):
                    return Response()
                return Response(status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(APIView):
    permission_classes = [IsRoot]

    @staticmethod
    def _get_user(user_id):
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None

    def get(self, request, user_id, **kwargs):
        user = self._get_user(user_id)
        if user:
            serializer = UserSerializer(user)
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, user_id, **kwargs):
        user = self._get_user(user_id)
        if user:
            serializer = UserSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, user_id, **kwargs):
        user = self._get_user(user_id)
        if user:
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_404_NOT_FOUND)


class RegistrationRequestList(APIView):
    permission_classes = [IsRoot]

    @staticmethod
    def _get_registration_requests():
        registration_request = RegistrationRequest.objects.all()
        serializer = RegistrationRequestSerializer(registration_request, many=True)
        return serializer.data

    def get(self, request, **kwargs, ):
        return Response(self._get_registration_requests())

    @staticmethod
    def post(request, **kwargs):
        if RegistrationRequest.objects.filter(email=request.data['email']):
            return Response(status=400)

        serializer = RegistrationRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegistrationRequestDetail(APIView):
    permission_classes = [IsRoot]

    @staticmethod
    def _get_registration_request(registration_request_id):
        try:
            return RegistrationRequest.objects.get(id=registration_request_id)
        except RegistrationRequest.DoesNotExist:
            return None

    def get(self, request, registration_request_id, **kwargs):
        registration_request = self._get_registration_request(registration_request_id)
        if registration_request:
            serializer = RegistrationRequestSerializer(registration_request)
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, registration_request_id, **kwargs):
        registration_request = self._get_registration_request(registration_request_id)
        if registration_request:
            serializer = RegistrationRequestSerializer(registration_request, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, registration_request_id, **kwargs):
        registration_request = self._get_registration_request(registration_request_id)
        if registration_request:
            registration_request.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_404_NOT_FOUND)


class RegistrationRequestPublic(APIView):
    permission_classes = [IsRoot | IsPost]

    @staticmethod
    def post(request, **kwargs):
        serializer = RegistrationRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TimeSlotList(APIView):
    permission_classes = [IsRoot | IsAdmin | IsAssistantReadOnly]

    @staticmethod
    def _get_timeslots():
        time_slot = TimeSlot.objects.all()
        serializer = TimeSlotSerializer(time_slot, many=True)
        return serializer.data

    def get(self, request, **kwargs, ):
        return Response(self._get_timeslots())

    @staticmethod
    def post(request, **kwargs):
        serializer = TimeSlotSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            add_change_record(False)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TimeSlotDetail(APIView):
    permission_classes = [IsRoot | IsAdmin | IsAssistantReadOnly]

    @staticmethod
    def _get_timeslot(time_slot_id):
        try:
            return TimeSlot.objects.get(id=time_slot_id)
        except TimeSlot.DoesNotExist:
            return None

    def get(self, request, time_slot_id, **kwargs):
        time_slot = self._get_timeslot(time_slot_id)
        if time_slot:
            serializer = TimeSlotSerializer(time_slot)
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, time_slot_id, **kwargs):
        time_slot = self._get_timeslot(time_slot_id)
        if time_slot:
            serializer = TimeSlotSerializer(time_slot, data=request.data)
            if serializer.is_valid():
                serializer.save()
                add_change_record(False)
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, time_slot_id, **kwargs):
        time_slot = self._get_timeslot(time_slot_id)
        if time_slot:
            time_slot.delete()
            add_change_record(False)
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_404_NOT_FOUND)


class CourseList(APIView):
    permission_classes = [IsRoot | IsAdmin | IsAssistantReadOnly]

    @staticmethod
    def _get_courses():
        course = Course.objects.all()
        serializer = CourseSerializer(course, many=True)
        return serializer.data

    def get(self, request, **kwargs, ):
        return Response(self._get_courses())

    @staticmethod
    def post(request, **kwargs):
        serializer = CourseWriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            add_change_record(False)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseDetail(APIView):
    permission_classes = [IsRoot | IsAdmin | IsAssistantReadOnly]

    @staticmethod
    def _get_course(course_id):
        try:
            return Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return None

    def get(self, request, course_id, **kwargs):
        course = self._get_course(course_id)
        if course:
            serializer = CourseSerializer(course)
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, course_id, **kwargs):
        course = self._get_course(course_id)
        if course:
            serializer = CourseWriteSerializer(course, data=request.data)
            if serializer.is_valid():
                serializer.save()
                add_change_record(False)
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, course_id, **kwargs):
        course = self._get_course(course_id)
        if course:
            course.delete()
            add_change_record(False)
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_404_NOT_FOUND)


class SectionList(APIView):
    permission_classes = [IsRoot | IsAdmin | IsAssistantReadOnly]

    @staticmethod
    def _get_sections():
        section = Section.objects.all()
        serializer = SectionSerializer(section, many=True)
        return serializer.data

    def get(self, request, **kwargs, ):
        return Response(self._get_sections())

    @staticmethod
    def post(request, **kwargs):
        serializer = SectionWriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            add_change_record(False)
            try:
                data = SectionSerializer(Section.objects.get(id=serializer.data['id'])).data
                return Response(data, status=status.HTTP_201_CREATED)
            except Exception as e:
                logger.exception(e)
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SectionDetail(APIView):
    permission_classes = [IsRoot | IsAdmin | IsAssistantReadOnly]

    @staticmethod
    def _get_section(section_id):
        try:
            return Section.objects.get(id=section_id)
        except Section.DoesNotExist:
            return None

    def get(self, request, section_id, **kwargs):
        section = self._get_section(section_id)
        if section:
            serializer = SectionSerializer(section)
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, section_id, **kwargs):
        section = self._get_section(section_id)
        if section:
            serializer = SectionWriteSerializer(section, data=request.data)
            if serializer.is_valid():
                serializer.save()
                add_change_record(False)
                try:
                    data = SectionSerializer(self._get_section(serializer.data['id'])).data
                    return Response(data)
                except Exception as e:
                    logger.exception(e)
                    return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, section_id, **kwargs):
        section = self._get_section(section_id)
        if section:
            section.delete()
            add_change_record(False)
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_404_NOT_FOUND)


class DisciplineView(APIView):
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, **kwargs):
        disciplines = Discipline.objects.all()
        serializer = DisciplineSerializer(disciplines, many=True)
        return Response(serializer.data)


class InstructorList(APIView):
    permission_classes = [IsRoot | IsAdmin | IsAssistantReadOnly]

    @staticmethod
    def _get_instructors():
        instructor = Instructor.objects.all()
        serializer = InstructorSerializer(instructor, many=True)
        return serializer.data

    def get(self, request, **kwargs):
        return Response(self._get_instructors())

    @staticmethod
    def post(request, **kwargs):
        serializer = InstructorWriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            add_change_record(False)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class InstructorDetail(APIView):
    permission_classes = [IsRoot | IsAdmin | IsAssistantReadOnly]

    @staticmethod
    def _get_instructor(instructor_id):
        try:
            return Instructor.objects.get(id=instructor_id)
        except Instructor.DoesNotExist:
            return None

    def get(self, request, instructor_id, **kwargs):
        instructor = self._get_instructor(instructor_id)
        if instructor:
            serializer = InstructorSerializer(instructor)
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, instructor_id, **kwargs):
        instructor = self._get_instructor(instructor_id)
        if instructor:
            serializer = InstructorWriteSerializer(instructor, data=request.data)
            if serializer.is_valid():
                serializer.save()
                add_change_record(False)
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, instructor_id, **kwargs):
        instructor = self._get_instructor(instructor_id)
        if instructor:
            instructor.delete()
            add_change_record(False)
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_404_NOT_FOUND)


class SolutionList(APIView):
    permission_classes = [IsRoot | IsAdmin | IsAssistant]

    @staticmethod
    def _get_solutions():
        solutions = Solution.objects.all()
        serializer = SolutionSerializer(solutions, many=True)
        return serializer.data

    def get(self, request, **kwargs):
        return Response(self._get_solutions())

    def post(self, request, **kwargs):
        section_data = json.loads(json.dumps(SectionFullSerializer(Section.objects.all(), many=True).data))
        instructor_data = json.loads(json.dumps(InstructorSerializer(Instructor.objects.all(), many=True).data))
        try:
            rs = RecursiveScheduler(section_data, instructor_data)
            rs.run()
            add_change_record(True)
        except Exception as e:
            logger.exception(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(self._get_solutions())


class SolutionDetail(APIView):
    permission_classes = [IsRoot | IsAdmin | IsAssistant]

    @staticmethod
    def _get_solution(solution_id):
        try:
            return Solution.objects.get(id=solution_id)
        except Solution.DoesNotExist:
            return None

    def get(self, request, solution_id, **kwargs):
        solution = self._get_solution(solution_id)
        if solution:
            serializer = SolutionSerializer(solution)
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, solution_id, **kwargs):
        solution = self._get_solution(solution_id)
        if solution:
            try:
                # STEP 1: Get assignments from database solution and request edited solution
                saved_assignments = solution.assignedsection_set.values()
                updated_assignments = request.data.get('assignments')

                # STEP 2: Verify submitted assignments are compatible with saved assignments
                # This is not necessary, but it makes it safer
                if len(updated_assignments) != len(saved_assignments):
                    return Response('Incorrect number of assignments', status=status.HTTP_400_BAD_REQUEST)
                if not all('id' in item and 'solution' in item and 'section' in item and 'instructor' in item
                           for item in updated_assignments):
                    return Response('Assignments missing required data members', status=status.HTTP_400_BAD_REQUEST)

                # STEP 3: Begin iteration over each inputted assignment
                assignments_to_update = []
                for assignment in updated_assignments:
                    # Get saved assignment where ID matches
                    # the expression in parenthesis is a generator expression,
                    # it acts like a list but it is evaluated one at a time
                    # next gives us the first value
                    saved_assignment = next(a for a in saved_assignments if a['id'] == assignment['id'])

                    # STEP 4: Compare new assignment to old assignment
                    if assignment['instructor'] != saved_assignment['instructor_id']:
                        # Get model from ID, change instructor to new instructor, add to list
                        model = AssignedSection.objects.get(id=assignment['id'])
                        model.instructor = Instructor.objects.get(id=assignment['instructor'])
                        assignments_to_update.append(model)

                # STEP 5: Use list to update database
                # bulk_update ensures we only hit the database once to save all models
                AssignedSection.objects.bulk_update(assignments_to_update, ['instructor'])
                serializer = SolutionSerializer(self._get_solution(solution_id))
                return Response(serializer.data)
            # As a bonus I wrapped it all in a try-except block in case something went wrong
            except Exception as e:
                logger.exception(e)
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            '''
            Here you're trying to sort a list of dictionaries, the format is like:
            [ {id: X, section_id: X}, {id: X, section_id: x} ]
            if you call sorted on this, python will try to use the < operator, which won't work
            instead you have to provide a lambda function python can use to sort the dictionaries like:
            sorted(request.data['assignments'], lambda x: x['id'])
            '''
            # dict(sorted(request.data.items()))
            '''
            Here you sort both lists and use a while loop to iterate through the index
            In Python, the better approach is to directly iterate through lists with the in operator, to minimize the amount of extra variables
            it also assumes several things, like the list will have the same assignments, which would break the loop if it weren't true
            If you iterate by ID, make sure you use the len() function on the list to prevent any IndexErrors like:
            while x < len(assignments)
            '''
            # result = AssignedSection.objects.filter(solution_id=solution_id).order_by('id').values()
            # list_result = [entry for entry in result]
            # x = 0
            # while x < request.data["assignment_count"]:
            #     keys = {"solution_id": "solution", "instructor_id": "instructor", "section_id": "section"}
            #     for key, value in keys.items():
            #         request.data["assignments"][x][key] = request.data["assignments"][x].pop(value)
            #         if request.data["assignments"][x] != list_result[x]:
            '''
            This filter().update() will work, but there a couple ways to improve it
            Calling an update() one-by-one will make it slower, it's much faster to push objects into a list and then call one DB query
            Only one AssignedSection is being updated here so get() should be used instead of filter()
            the ID field should be used to get from the database, because it's guaranteed to be unique
            We only want to update the instructor field, the solution and section fields need to stay the same
            '''
            #             AssignedSection.objects.filter(section_id=request.data["assignments"][x]['section_id'],
            #                                            solution_id=request.data["assignments"][x][
            #                                                'solution_id']).update(
            #                 solution_id=request.data["assignments"][x]['solution_id'],
            #                 instructor_id=request.data["assignments"][x]['instructor_id'],
            #                 section_id=request.data["assignments"][x]['section_id'])
            #     x = x + 1
            # return Response(request.data)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, solution_id, **kwargs):
        solution = self._get_solution(solution_id)
        if solution:
            solution.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_404_NOT_FOUND)


class SolutionConstraintMap(APIView):
    permission_classes = [IsRoot | IsAdmin | IsAssistant]

    @staticmethod
    def get(request, **kwargs):
        section_data = json.loads(json.dumps(SectionFullSerializer(Section.objects.all(), many=True).data))
        section_overlap_map = get_section_overlap_map(section_data)
        discipline_overlap_map = get_section_instructor_discipline_map()
        return Response({'section_overlap_map': section_overlap_map, 'discipline_overlap_map': discipline_overlap_map})


class ChangeRecordView(APIView):
    permission_classes = [IsRoot | IsAdmin | IsAssistant]

    @staticmethod
    def get(request, **kwargs):
        return Response({'data_changed': data_changed()})


class WriteAccessView(APIView):
    permission_classes = [IsRoot | IsAdmin]

    @staticmethod
    def get(request, **kwargs):
        return Response()
