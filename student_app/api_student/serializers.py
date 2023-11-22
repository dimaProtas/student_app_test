from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from . import models
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'date_joined']


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentModel
        fields = '__all__'


class StudentCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentCardModel
        fields = '__all__'


class CursesSerializer(serializers.ModelSerializer):
    student = StudentSerializer(many=True, read_only=True)

    class Meta:
        model = models.CursesModel
        fields = '__all__'


class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SemestrModel
        fields = '__all__'


class SemesterCursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SemesterCursesModel
        fields = '__all__'


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TeacherModel
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password')

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(UserSerializer, self).create(validated_data)
