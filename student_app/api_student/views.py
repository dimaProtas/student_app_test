from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import viewsets, permissions, generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.contrib.auth import logout
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from . import serializers
from . import models
from . import filters


@api_view()
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def user(request: Request):
    return Response({
        'data': serializers.UserSerializer(request.user).data
    })


class StudentViewSet(viewsets.ModelViewSet):
    queryset = models.StudentModel.objects.all()
    serializer_class = serializers.StudentSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filter_class = filters.StudentModelFilter

    def get_queryset(self):
        queryset = super().get_queryset()
        filtered_queryset = self.filter_class(self.request.query_params, queryset=queryset).qs
        return filtered_queryset


class StudentCardViewSet(viewsets.ModelViewSet):
    queryset = models.StudentCardModel.objects.all()
    serializer_class = serializers.StudentCardSerializer
    permission_classes = (permissions.IsAuthenticated,)


class CursesViewSet(viewsets.ModelViewSet):
    queryset = models.CursesModel.objects.all()
    serializer_class = serializers.CursesSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filter_class = filters.CursesModelFilter

    def get_queryset(self):
        queryset = super().get_queryset()
        filtered_queryset = self.filter_class(self.request.query_params, queryset=queryset).qs
        return filtered_queryset


class SemesterViewSet(viewsets.ModelViewSet):
    queryset = models.SemestrModel.objects.all()
    serializer_class = serializers.SemesterSerializer
    permission_classes = (permissions.IsAuthenticated,)


class SemesterCursesViewSet(viewsets.ModelViewSet):
    queryset = models.SemesterCursesModel.objects.all()
    serializer_class = serializers.SemesterCursesSerializer
    permission_classes = (permissions.IsAuthenticated,)


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = models.TeacherModel.objects.all()
    serializer_class = serializers.TeacherSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filter_class = filters.TeacherModelFilter

    def get_queryset(self):
        queryset = super().get_queryset()
        filtered_queryset = self.filter_class(self.request.query_params, queryset=queryset).qs
        return filtered_queryset


class LogoutView(APIView):
    def delete(self, request, *args, **kwargs):
        logout(request)
        return Response({
            'resultCode': 0,
            'messages': [],
            'data': {}
        })


class RegisterView(generics.CreateAPIView):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
