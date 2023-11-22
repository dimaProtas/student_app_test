API Students Dashboard

API приложение (DRF)
Frontend (React)
Database (Postgres)

Структура бд в соотвествии с ТЗ:
Созданы сущности:
srudents,
student_card,
curses,
semester,
Semester_curse,
teacher.

"""localhost:8000/api""" - API приложения
"""localhost:3000""" - Frontend приложения
"""localhost:8000/api/docs""" - Документация swwager
"""localhost:8000/admin/""" - Админка


Создайте .env фаил в student_app рядом с manage.py

Содержимое .env:
'''
POSTGRES_DB=your_database_name
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
PGPORT=5432
PGHOST=my_postgres
'''

Запуск проекьта:
'''docker-compose up --build''
(может возникнуть ошибка запуска api контейнера, тогда нужно 
его перезапустить '''docker restart id-контейнера'')

Наполнение БД:
осушевствляеться DB seeder, выполнить можно командой '''python manage.py shell < api_student/seeds.py'''
но наполнение автоматическое при запуске docker-compose.yaml
Так же создал фикстуры которыми можно наполнить БД выполнив команду 
'''python manage.py loaddata имя фиктуры'''

автоматически создаёться пользователь admin c правами суперпользователя, черз него можно авторизоваться
на фронте и в админке.
username: admin 
password: admin