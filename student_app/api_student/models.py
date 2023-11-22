from django.contrib.auth.models import AbstractUser, Permission, Group
from django.db import models
from django.utils import timezone


class CustomUser(AbstractUser):
    groups = models.ManyToManyField(Group, related_name='custom_user_groups')
    user_permissions = models.ManyToManyField(
        Permission, related_name='custom_user_permissions'
    )


class StudentModel(models.Model):
    name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} {self.last_name}"

    class Meta:
        verbose_name = 'Студент'
        verbose_name_plural = 'Студенты'


class StudentCardModel(models.Model):
    id_student = models.ForeignKey(StudentModel, on_delete=models.CASCADE, related_name='id_student_cards')
    name = models.ForeignKey(StudentModel, on_delete=models.CASCADE, related_name='name_student_cards')

    def __str__(self):
        return str(self.id_student)

    class Meta:
        verbose_name = 'Карта Студента'
        verbose_name_plural = 'Карты Студентов'


class CursesModel(models.Model):
    name_curses = models.CharField(max_length=255)
    num_curses = models.IntegerField(default=0)
    student = models.ManyToManyField(StudentModel)

    def __str__(self):
        return self.name_curses

    class Meta:
        verbose_name = 'Курс'
        verbose_name_plural = 'Курсы'


class SemestrModel(models.Model):
    num_semester = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.num_semester}'

    class Meta:
        verbose_name = 'Семестр'
        verbose_name_plural = 'Семестры'


class SemesterCursesModel(models.Model):
    id_semester = models.ForeignKey(SemestrModel, on_delete=models.CASCADE, related_name='id_semester')
    id_curses = models.ForeignKey(CursesModel, on_delete=models.CASCADE, related_name='id_curses')
    date_start = models.DateField(default=timezone.now)
    date_end = models.DateField()

    class Meta:
        verbose_name = 'Семестр Курса'
        verbose_name_plural = 'Семестры Курсов'


class TeacherModel(models.Model):
    name_teacher = models.CharField(max_length=100)
    last_name_teacher = models.CharField(max_length=100)
    rank_teacher = models.CharField(max_length=100)
    semester = models.ManyToManyField(SemestrModel)

    def __str__(self):
        return self.name_teacher

    class Meta:
        verbose_name = 'Преподаватель'
        verbose_name_plural = 'Преподаватели'


