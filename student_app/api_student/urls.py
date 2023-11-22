from django.urls import path, include
from rest_framework.routers import DefaultRouter
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from drf_yasg import openapi
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

schema_view = get_schema_view(
    openapi.Info(
        title="API Students Dashboard",
        default_version='v1',
        description="API Students Dashboard",
        terms_of_service="https://www.yourapp.com/terms/",
        contact=openapi.Contact(email="dima_protasevich92@mail.ru"),
        license=openapi.License(name="MIT"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


router = DefaultRouter()
router.register(r'students', views.StudentViewSet)
router.register(r'student_card', views.StudentCardViewSet)
router.register(r'curses', views.CursesViewSet)
router.register(r'semestr', views.SemesterViewSet)
router.register(r'semester_curses', views.SemesterCursesViewSet)
router.register(r'teachers', views.TeacherViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('user/', views.user, name='user'),
    path('token/obtain/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('auth/logout/', views.LogoutView.as_view()),
    path('register/', views.RegisterView.as_view()),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
