from datetime import date
from django.contrib.auth import get_user_model
from api_student.models import (StudentModel, StudentCardModel, CursesModel, SemestrModel,
                                SemesterCursesModel, TeacherModel)

def seed_data():

    User = get_user_model()

    data_user = [
        {'username': 'admin', 'email': 'admin@mail.ru', 'password': 'admin', 'is_superuser': True},
        {'username': 'teacher', 'email': 'teacher@mail.ru', 'password': 'teacher'}
    ]

    for user_data in data_user:
        user = User.objects.create_user(
            username=user_data['username'],
            email=user_data['email'],
            password=user_data['password'],
            is_superuser=user_data.get('is_superuser', False)
        )
        if user_data.get('is_superuser', False):
            user.is_staff = True
            user.save()

    data_students = [
        {'name': 'Лео', 'last_name': 'Месси'},
        {'name': 'Криштиано', 'last_name': 'Роналду'},
        {'name': 'Василий', 'last_name': 'Уткин'},
        {'name': 'Егор', 'last_name': 'Титов'},
    ]

    students = [StudentModel.objects.create(**student_data) for student_data in data_students]

    data_cards = [
        {'id_student': students[0], 'name': students[0]},
        {'id_student': students[1], 'name': students[1]},
        {'id_student': students[2], 'name': students[1]},
        {'id_student': students[3], 'name': students[1]},
    ]

    for card_data in data_cards:
        StudentCardModel.objects.create(**card_data)

    data_curses = [
        {'name_curses': 'Высшая математика', 'num_curses': 1},
        {'name_curses': 'Прикладная физика', 'num_curses': 2},
        {'name_curses': 'Философия', 'num_curses': 3},
    ]

    curses = [CursesModel.objects.create(**curse) for curse in data_curses]

    curses[0].student.set([students[0], students[1]])
    curses[1].student.set([students[0], students[2]])
    curses[2].student.set([students[2], students[3]])

    data_semester = [
        {'num_semester': 1},
        {'num_semester': 2},
        {'num_semester': 3},
        {'num_semester': 4},
    ]

    semesters = [SemestrModel.objects.create(**semester) for semester in data_semester]

    data_semester_curses = [
        {'id_semester': semesters[0], 'id_curses': curses[0], 'date_start': date(2023, 1, 31), 'date_end': date(2023, 12, 31)},
        {'id_semester': semesters[1], 'id_curses': curses[1], 'date_start': date(2022, 12, 1), 'date_end': date(2023, 12, 31)},
        {'id_semester': semesters[3], 'id_curses': curses[1], 'date_start': date(2022, 11, 15), 'date_end': date(2022, 12, 31)},
        {'id_semester': semesters[2], 'id_curses': curses[2], 'date_start': date(2023, 6, 1), 'date_end': date(2023, 12, 31)},
    ]

    for semester_curse in data_semester_curses:
        SemesterCursesModel.objects.create(**semester_curse)

    data_teachers = [
        {'name_teacher': 'Альберт', 'last_name_teacher': 'Энштейн', 'rank_teacher': 'Профессор'},
        {'name_teacher': 'Грек', 'last_name_teacher': 'Пифагор', 'rank_teacher': 'Легенда'},
        {'name_teacher': 'Леонардо', 'last_name_teacher': 'Да Винчи', 'rank_teacher': 'Профессор'},
    ]

    teachers = [TeacherModel.objects.create(**teacher) for teacher in data_teachers]
    teachers[0].semester.set([semesters[0], semesters[1]])
    teachers[0].semester.set([semesters[1], semesters[2]])
    teachers[0].semester.set([semesters[0], semesters[1]])

seed_data()

# Загрузка данных:
# python manage.py shell < api_student/seeds.py
