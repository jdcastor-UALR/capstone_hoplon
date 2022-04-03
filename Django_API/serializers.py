from rest_framework import serializers

from Django_API.model_enums import SectionDayChoices
from Django_API.models import User, RegistrationRequest, Session, Section, TimeSlot, Course, Instructor, Discipline


# class SnippetSerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only=True)
#     title = serializers.CharField(required=False, allow_blank=True, max_length=100)
#     code = serializers.CharField(style={'base_template': 'textarea.html'})
#     linenos = serializers.BooleanField(required=False)
#     language = serializers.ChoiceField(choices=LANGUAGE_CHOICES, default='python')
#     style = serializers.ChoiceField(choices=STYLE_CHOICES, default='friendly')
#
#     def create(self, validated_data):
#         """
#         Create and return a new `Snippet` instance, given the validated data.
#         """
#         return Snippet.objects.create(**validated_data)
#
#     def update(self, instance, validated_data):
#         """
#         Update and return an existing `Snippet` instance, given the validated data.
#         """
#         instance.title = validated_data.get('title', instance.title)
#         instance.code = validated_data.get('code', instance.code)
#         instance.linenos = validated_data.get('linenos', instance.linenos)
#         instance.language = validated_data.get('language', instance.language)
#         instance.style = validated_data.get('style', instance.style)
#         instance.save()
#         return instance
from Django_API.utility import prettyTimeString


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class RegistrationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistrationRequest
        fields = '__all__'


class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
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
