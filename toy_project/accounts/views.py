from rest_framework import permissions, generics, status
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.views import APIView
from .serializers import UserSerializer
from .models import User
from find_retro_toys.serializers import PostSerializer
from rest_framework.decorators import action
from .serializers import MyTokenObtainPairSerializer #追加
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

from accounts import permissions
from rest_framework.permissions import IsAuthenticated

from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.tokens import default_token_generator
from rest_framework import generics, status, views, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from djoser import utils
from djoser.conf import settings


class TokenCreateView(utils.ActionViewMixin, generics.GenericAPIView):
    serializer_class = settings.SERIALIZERS.token_create
    permission_classes = settings.PERMISSIONS.token_create

    def _action(self, serializer):
        token = utils.login_user(self.request, serializer.user)
        token_serializer_class = settings.SERIALIZERS.token
        return Response(
            data=token_serializer_class(token).data, status=status.HTTP_200_OK
        )


class TokenDestroyView(views.APIView):
    permission_classes = settings.PERMISSIONS.token_destroy

    def post(self, request):
        utils.logout_user(request)
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.UpdateOwnProfile,)
    queryset = User.objects.all()
    serializer_class = UserSerializer
    def update(self, request, pk, partial=True):
            user = User.objects.get(id=pk)
            if user.is_anonymous:
                return Response("unauthorized", status=status.HTTP_401_UNAUTHORIZED)
            try:
                serializer = self.serializer_class(user,data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response("bad request", status=status.HTTP_400_BAD_REQUEST)

            except Exception:
                data={'state': request.data['state'], 'city': request.data['city'], 'address': request.data['address'], 'zipcode': request.data['zipcode'],'phone_number': request.data['phone_number']}
                if request.data['username'] != user.username:
                    data['username'] = request.data['username']
                if request.data['email'] != user.email:
                    data['email'] = request.data['email']

            serializer = self.serializer_class(user,data=data, partial=True)
            if user.is_anonymous:
                return Response("unauthorized", status=status.HTTP_401_UNAUTHORIZED)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response("bad request", status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, permission_classes=[IsAuthenticated])
    def liked_posts(self, request, pk=None):
        liked_posts = request.user.like_by_user.all()
        post_data = []
        for i in range(len(liked_posts)):
            post_data.append(liked_posts[i].post)
        data = PostSerializer(post_data,many=True).data
        return Response(data,status=status.HTTP_200_OK)

class ObtainTokenPairWithColorView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class MyPageView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, format=None):
        user = User.objects.get(id=request.user.id)
        data = UserSerializer(user).data
        return Response(data,status=status.HTTP_200_OK)

class MyPagePasswordUpdateView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, format=None):
        user = User.objects.get(id=request.user.id)
        data = UserSerializer(user).data
        return Response(data,status=status.HTTP_200_OK)


class SendJWTByEmail(APIView):
    def post(self, request):
        email = request.data.get('email')
        user = User.objects.get(email=email)
        refresh = RefreshToken.for_user(user)
        token = str(refresh.access_token)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token_generator = default_token_generator.make_token(user)
        password_reset_link = f"{settings.FRONTEND_URL}/password-reset-confirm/{uid}/{token_generator}/"
        message = f"Click the following link to reset your password:\n\n{password_reset_link}\n\nYour JWT token is: {token}"
        mail_subject = 'Password reset instructions'
        to_email = email
        email = EmailMessage(mail_subject, message, to=[to_email])
        email.send()
        return Response({'status': 'success'})