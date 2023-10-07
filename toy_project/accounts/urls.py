from django.urls import path, include
from accounts import views
from rest_framework.routers import DefaultRouter
from .views import SendJWTByEmail
from accounts.views import MyPageView, MyPagePasswordUpdateView

router = DefaultRouter()
router.register(r'users',views.UserViewSet)
urlpatterns = [
    path('', include(router.urls)),
    path('api/auth/',include('djoser.urls')),
    path('mypage/', MyPageView.as_view(), name='mypage'),
    path(r'^mypage_password_update/$', MyPagePasswordUpdateView.as_view()),
    path(r'^api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('send-jwt-by-email/', SendJWTByEmail.as_view(), name='send-jwt-by-email'),
]
