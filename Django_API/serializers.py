from abc import ABC

from rest_framework import serializers

from Django_API.model_enums import SectionDayChoices
from Django_API.models import PasswordChange, User, RegistrationRequest, Section, TimeSlot, Course, Instructor, \
    Discipline, \
    Solution, AssignedSection
from Django_API.utility import prettyTimeString


class PasswordChangeSerializer(serializers.Serializer):
    def update(self, instance, validated_data):
        pass

    username = serializers.CharField(label="username")
    password = serializers.CharField(label="password",
                                     style={'input_type': 'password'}
                                     )
    new_password = serializers.CharField(label="new_password",
                                         style={'input_type': 'password'}
                                         )

    def create(self, **kwargs):
        return PasswordChange(**self.validated_data)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class RegistrationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistrationRequest
        fields = '__all__'


class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = '__all__'


class DisciplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discipline
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    subject_disciplines = DisciplineSerializer(many=True)

    class Meta:
        model = Course
        fields = '__all__'


class CourseWriteSerializer(serializers.ModelSerializer):
    subject_disciplines = serializers.PrimaryKeyRelatedField(many=True, queryset=Discipline.objects)

    class Meta:
        model = Course
        fields = '__all__'


class SectionSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)
    meetingTimes = serializers.SerializerMethodField('get_meeting_times_by_day')
    meetingTimeString = serializers.SerializerMethodField('prettify_time_string')

    def prettify_time_string(self, model):
        return prettyTimeString(model.id)

    def get_meeting_times_by_day(self, instance):
        times = sorted(instance.meetingTimes.all(), key=lambda x: SectionDayChoices.values.index(x.meetingDays))
        return TimeSlotSerializer(times, many=True).data

    class Meta:
        model = Section
        fields = '__all__'


class SectionWriteSerializer(serializers.ModelSerializer):
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects)
    meetingTimes = TimeSlotSerializer(many=True)

    class Meta:
        model = Section
        fields = '__all__'

    def create(self, validated_data):
        meetingTime_data = validated_data.pop('meetingTimes')
        section = Section.objects.create(**validated_data)
        for meetingTime in meetingTime_data:
            section.meetingTimes.add(TimeSlot.objects.create(**meetingTime))
        return section

    def update(self, instance, validated_data):
        meetingTime_data = validated_data.pop('meetingTimes')
        remove_ids = [x.id for x in instance.meetingTimes.all()]
        for meetingTime in meetingTime_data:
            if not meetingTime.get('id'):
                instance.meetingTimes.add(TimeSlot.objects.create(**meetingTime))
            else:
                remove_ids.remove(meetingTime['id'])
        instance.meetingTimes.remove(*remove_ids)
        instance.save()
        return instance


class SectionFullSerializer(serializers.ModelSerializer):
    """ Read only serializer with more detail of foreign keys """
    meetingTimes = serializers.SerializerMethodField('get_meeting_times_by_day')
    course = CourseSerializer()

    def get_meeting_times_by_day(self, instance):
        times = sorted(instance.meetingTimes.all(), key=lambda x: SectionDayChoices.values.index(x.meetingDays))
        return TimeSlotSerializer(times, many=True).data

    class Meta:
        model = Section
        fields = '__all__'


class InstructorSerializer(serializers.ModelSerializer):
    qualifications = DisciplineSerializer(read_only=True, many=True)

    class Meta:
        model = Instructor
        fields = '__all__'


class InstructorWriteSerializer(serializers.ModelSerializer):
    qualifications = serializers.PrimaryKeyRelatedField(many=True, queryset=Discipline.objects)

    class Meta:
        model = Instructor
        fields = '__all__'


class AssignedSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignedSection
        fields = '__all__'


class SolutionSerializer(serializers.ModelSerializer):
    assignments = AssignedSectionSerializer(source="assignedsection_set", many=True)

    class Meta:
        model = Solution
        fields = '__all__'


'''
class SolutionChangeSerializer(serializers.ModelSerializer):
    def update(self, instance, validated_data):
        pass
    '''
