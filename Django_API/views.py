from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response

from Django_API.models import Instructor


class InstructorView(APIView):

    # Read
    def get(self, request, **kwargs):
        instructors = Instructor.objects.all()
        return Response(instructors)

    # Create
    def post(self, request, **kwargs):
        return Response()

    # Update
    def put(self, request, **kwargs):
        return Response()

    # Delete
    def delete(self, request, **kwargs):
        return Response()
