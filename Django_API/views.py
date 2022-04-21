import json
import logging

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from Django_API.model_functions import get_section_instructor_discipline_map, get_section_overlap_map
from Django_API.models import Instructor, User, RegistrationRequest, Session, TimeSlot, Course, Section, Discipline, \
    Solution
from Django_API.recursive_scheduler import RecursiveScheduler
from Django_API.serializers import UserSerializer, RegistrationRequestSerializer, SessionSerializer, \
    TimeSlotSerializer, CourseSerializer, SectionSerializer, InstructorSerializer, DisciplineSerializer, \
    InstructorWriteSerializer, CourseWriteSerializer, SolutionSerializer, SectionFullSerializer

logger = logging.getLogger()


class UserList(APIView):
    # Read
    def get(self, request, **kwargs, ):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)

    # Create
    def post(self, request, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(APIView):
    # Read
    def get(self, request, user_id, **kwargs):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    # Update
    def put(self, request, user_id, **kwargs):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete
    def delete(self, request, user_id, **kwargs):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class RegistrationRequestList(APIView):
    # Read
    def get(self, request, **kwargs, ):
        registration_request = RegistrationRequest.objects.all()
        serializer = RegistrationRequestSerializer(registration_request, many=True)
        return Response(serializer.data)

    # Create
    def post(self, request, **kwargs):
        serializer = RegistrationRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegistrationRequestDetail(APIView):
    # Read
    def get(self, request, registration_request_id, **kwargs):
        try:
            registration_request = RegistrationRequest.objects.get(id=registration_request_id)
        except RegistrationRequest.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = RegistrationRequestSerializer(registration_request)
        return Response(serializer.data)

    # Update
    def put(self, request, registration_request_id, **kwargs):
        try:
            registration_request = RegistrationRequest.objects.get(id=registration_request_id)
        except RegistrationRequest.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = RegistrationRequestSerializer(registration_request, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete
    def delete(self, request, registration_request_id, **kwargs):
        try:
            registration_request = RegistrationRequest.objects.get(id=registration_request_id)
        except RegistrationRequest.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        registration_request.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SessionList(APIView):
    # Read
    def get(self, request, **kwargs, ):
        session = Session.objects.all()
        serializer = SessionSerializer(session, many=True)
        return Response(serializer.data)

    # Create
    def post(self, request, **kwargs):
        serializer = SessionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SessionDetail(APIView):
    # Read
    def get(self, request, session_id, **kwargs):
        try:
            session = Session.objects.get(id=session_id)
        except Session.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = SessionSerializer(session)
        return Response(serializer.data)

    # Update
    def put(self, request, session_id, **kwargs):
        try:
            session = Session.objects.get(id=session_id)
        except Session.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = SessionSerializer(session, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete
    def delete(self, request, session_id, **kwargs):
        try:
            session = Session.objects.get(id=session_id)
        except Session.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        session.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TimeSlotList(APIView):
    # Read
    def get(self, request, **kwargs, ):
        time_slot = TimeSlot.objects.all()
        serializer = TimeSlotSerializer(time_slot, many=True)
        return Response(serializer.data)

    # Create
    def post(self, request, **kwargs):
        serializer = TimeSlotSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TimeSlotDetail(APIView):
    # Read
    def get(self, request, time_slot_id, **kwargs):
        try:
            time_slot = TimeSlot.objects.get(id=time_slot_id)
        except TimeSlot.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = TimeSlotSerializer(time_slot)
        return Response(serializer.data)

    # Update
    def put(self, request, time_slot_id, **kwargs):
        try:
            time_slot = TimeSlot.objects.get(id=time_slot_id)
        except TimeSlot.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = TimeSlotSerializer(time_slot, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete
    def delete(self, request, time_slot_id, **kwargs):
        try:
            time_slot = TimeSlot.objects.get(id=time_slot_id)
        except TimeSlot.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        time_slot.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CourseList(APIView):
    # Read
    def get(self, request, **kwargs, ):
        course = Course.objects.all()
        serializer = CourseSerializer(course, many=True)
        return Response(serializer.data)

    # Create
    def post(self, request, **kwargs):
        serializer = CourseWriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseDetail(APIView):
    # Read
    def get(self, request, course_id, **kwargs):
        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CourseSerializer(course)
        return Response(serializer.data)

    # Update
    def put(self, request, course_id, **kwargs):
        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CourseWriteSerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete
    def delete(self, request, course_id, **kwargs):
        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SectionList(APIView):
    # Read
    def get(self, request, **kwargs, ):
        section = Section.objects.all()
        serializer = SectionSerializer(section, many=True)
        return Response(serializer.data)

    # Create
    def post(self, request, **kwargs):
        serializer = SectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SectionDetail(APIView):

    def get(self, request, section_id, **kwargs):
        try:
            section = Section.objects.get(id=section_id)
        except Section.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = SectionSerializer(section)
        return Response(serializer.data)

    def put(self, request, section_id, **kwargs):
        try:
            section = Section.objects.get(id=section_id)
        except Section.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = SectionSerializer(section, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, section_id, **kwargs):
        try:
            section = Section.objects.get(id=section_id)
        except Section.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        section.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DisciplineView(APIView):
    def get(self, request, **kwargs):
        disciplines = Discipline.objects.all()
        serializer = DisciplineSerializer(disciplines, many=True)
        return Response(serializer.data)


class InstructorList(APIView):
    # Read
    @staticmethod
    def get(request, **kwargs):
        instructor = Instructor.objects.all()
        serializer = InstructorSerializer(instructor, many=True)
        return Response(serializer.data)

    # Create
    @staticmethod
    def post(request, **kwargs):
        serializer = InstructorWriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class InstructorDetail(APIView):
    # Read
    @staticmethod
    def get(request, instructor_id, **kwargs):
        try:
            instructor = Instructor.objects.get(id=instructor_id)
        except Instructor.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = InstructorSerializer(instructor)
        return Response(serializer.data)

    # Update
    @staticmethod
    def put(request, instructor_id, **kwargs):
        try:
            instructor = Instructor.objects.get(id=instructor_id)
        except Instructor.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = InstructorWriteSerializer(instructor, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete
    @staticmethod
    def delete(request, instructor_id, **kwargs):
        try:
            instructor = Instructor.objects.get(id=instructor_id)
        except Instructor.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        instructor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SolutionList(APIView):

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
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, solution_id, **kwargs):
        solution = self._get_solution(solution_id)
        if solution:
            # TODO: put solution editing functionality here
            pass
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, solution_id, **kwargs):
        solution = self._get_solution(solution_id)
        if solution:
            solution.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class SolutionConstraintMap(APIView):
    @staticmethod
    def get(request, **kwargs):
        section_data = json.loads(json.dumps(SectionFullSerializer(Section.objects.all(), many=True).data))
        section_overlap_map = get_section_overlap_map(section_data)
        discipline_overlap_map = get_section_instructor_discipline_map()
        return Response({'section_overlap_map': section_overlap_map, 'discipline_overlap_map': discipline_overlap_map})
