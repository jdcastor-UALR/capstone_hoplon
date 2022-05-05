import json
import logging

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import obtain_auth_token, ObtainAuthToken

from Django_API.model_functions import get_section_instructor_discipline_map, get_section_overlap_map
from Django_API.models import Instructor, RegistrationRequest, TimeSlot, Course, Section, Discipline, Solution, \
    DBInitStatus
from Django_API.recursive_scheduler import RecursiveScheduler
from Django_API.serializers import PasswordChangeSerializer, UserSerializer, RegistrationRequestSerializer, \
    TimeSlotSerializer, CourseSerializer, SectionSerializer, InstructorSerializer, DisciplineSerializer, \
    InstructorWriteSerializer, CourseWriteSerializer, SolutionSerializer, SectionFullSerializer, SectionWriteSerializer

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
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, time_slot_id, **kwargs):
        time_slot = self._get_timeslot(time_slot_id)
        if time_slot:
            time_slot.delete()
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
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, course_id, **kwargs):
        course = self._get_course(course_id)
        if course:
            course.delete()
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
            try:
                data = SectionSerializer(Section.objects.get(id=serializer.data['id'])).data
                return Response(data, status=status.HTTP_201_CREATED)
            except Section.DoesNotExist:
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
                try:
                    data = SectionSerializer(self._get_section(serializer.data['id'])).data
                    return Response(data)
                except Section.DoesNotExist:
                    return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, section_id, **kwargs):
        section = self._get_section(section_id)
        if section:
            section.delete()
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
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, instructor_id, **kwargs):
        instructor = self._get_instructor(instructor_id)
        if instructor:
            instructor.delete()
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
            # TODO: put solution editing functionality here
            pass
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
