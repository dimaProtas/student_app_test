FROM python:3.10

# Устанавливаем зависимости
RUN pip install --upgrade pip

# Указываем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файлы приложения в контейнер
COPY . .

# Устанавливаем зависимости из requirements.txt
RUN pip install -r requirements.txt

RUN #python manage.py migrate

# Установка сервера Daphne
#CMD ["python", "./student_app/manage.py", "runserver", "0.0.0.0:8000"]