import django_filters
from .models import StudentModel, CursesModel, TeacherModel


class StudentModelFilter(django_filters.FilterSet):
    class Meta:
        model = StudentModel
        fields = ['name', 'last_name']


class CursesModelFilter(django_filters.FilterSet):
    class Meta:
        model = CursesModel
        fields = ['name_curses', 'num_curses']


class TeacherModelFilter(django_filters.FilterSet):
    class Meta:
        model = TeacherModel
        fields = ['name_teacher', 'last_name_teacher', 'rank_teacher', 'semester']