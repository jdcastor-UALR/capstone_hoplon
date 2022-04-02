from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from Django_API.models import Instructor, User, RegistrationRequest, Session, TimeSlot, Course, Section, Discipline
from Django_API.serializers import UserSerializer, RegistrationRequestSerializer, SessionSerializer, \
    TimeSlotSerializer, CourseSerializer, SectionSerializer, InstructorSerializer, DisciplineSerializer


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

    # Update
    def put(self, request, user_id, **kwargs):
        user = self.get_object(user_id)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete
    def delete(self, request, user_id, **kwargs):
        user = self.get_object(user_id)
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

    # Update
    def put(self, request, registration_request_id, **kwargs):
        registration_request = self.get_object(registration_request_id)
        serializer = RegistrationRequestSerializer(registration_request, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete
    def delete(self, request, registration_request_id, **kwargs):
        registration_request = self.get_object(registration_request_id)
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

    # Update
    def put(self, request, session_id, **kwargs):
        session = self.get_object(session_id)
        serializer = SessionSerializer(session, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete
    def delete(self, request, session_id, **kwargs):
        session = self.get_object(session_id)
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

    # Update
    def put(self, request, time_slot_id, **kwargs):
        time_slot = self.get_object(time_slot_id)
        serializer = TimeSlotSerializer(time_slot, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete
    def delete(self, request, time_slot_id, **kwargs):
        time_slot = self.get_object(time_slot_id)
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
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseDetail(APIView):
    # Read
    def get(self, request, **kwargs, ):
        course = Course.objects.all()
        serializer = CourseSerializer(course, many=True)
        return Response(serializer.data)

    # Create
    def post(self, request, **kwargs):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Update
    def put(self, request, course_id, **kwargs):
        course = self.get_object(course_id)
        serializer = CourseSerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete
    def delete(self, request, course_id, **kwargs):
        course = self.get_object(course_id)
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

    # Update
    def put(self, request, section_id, **kwargs):
        section = self.get_object(section_id)
        serializer = SectionSerializer(section, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete
    def delete(self, request, section_id, **kwargs):
        section = self.get_object(section_id)
        section.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DisciplineView(APIView):
    def get(self, request, **kwargs):
        disciplines = Discipline.objects.all()
        serializer = DisciplineSerializer(disciplines, many=True)
        return Response(serializer.data)


class InstructorList(APIView):
    # Read
    def get(self, request, **kwargs, ):
        instructor = Instructor.objects.all()
        serializer = InstructorSerializer(instructor, many=True)
        return Response(serializer.data)

    # Create
    def post(self, request, **kwargs):
        serializer = InstructorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class InstructorDetail(APIView):
    # Read
    def get(self, request, instructor_id, **kwargs):
        try:
            instructor = Instructor.objects.get(id=instructor_id)
        except Instructor.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = InstructorSerializer(instructor)
        return Response(serializer.data)

    # Update
    def put(self, request, instructor_id, **kwargs):
        try:
            instructor = Instructor.objects.get(id=instructor_id)
        except Instructor.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = InstructorSerializer(instructor, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete
    def delete(self, request, instructor_id, **kwargs):
        try:
            instructor = Instructor.objects.get(id=instructor_id)
        except Instructor.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        instructor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
