from django.contrib import admin
from . import models


@admin.register(models.StudentModel)
class StudentModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'last_name')
    list_display_links = ['id']


@admin.register(models.StudentCardModel)
class StudentCardAdmin(admin.ModelAdmin):
    list_display = ('id', 'id_student', 'name')
    list_display_links = ['id']


@admin.register(models.CursesModel)
class CursesAdmin(admin.ModelAdmin):
    list_display = ('id', 'name_curses', 'num_curses')
    list_display_links = ['id']


@admin.register(models.SemestrModel)
class SemestrAdmin(admin.ModelAdmin):
    list_display = ('id', 'num_semester')
    list_display_links = ['id']


@admin.register(models.SemesterCursesModel)
class SemesterCursesAdmin(admin.ModelAdmin):
    list_display = ('id', 'id_semester', 'id_curses', 'date_start', 'date_end')
    list_display_links = ['id']


@admin.register(models.TeacherModel)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ('id', 'name_teacher', 'last_name_teacher', 'rank_teacher')
    list_display_links = ['id']