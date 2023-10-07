from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User, State
from find_retro_toys.models import Like

import logging

logger = logging.getLogger(__name__)

from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'state', 'city', 'address', 'zipcode', 'phone_number')
    def create(self,validated_data):
            logger.info(validated_data)
            user = User.objects.create_user(
                email=validated_data['email'],
                username=validated_data['username'],
                password=validated_data['password'],
            )
            return user

    def update(self,instance,validated_data):
        if 'password' in validated_data:
            password=validated_data.pop('password')
            instance.set_password(password)  

        return super().update(instance,validated_data)

class StateSerializer(serializers.ModelSerializer):

    class Meta:
        model = State
        fields = ('state',)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        return token

class LikedPostsSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    timestamp = serializers.DateTimeField(format="%Y-%m-%d %H:%M")

    def get_user(self, obj):
        return obj.user.username

    class Meta:
        model = Like
        fields = ('post', 'user', 'timestamp')


class UidAndTokenSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()

    default_error_messages = {
        "invalid_token": "Invalid token for given user.",
        "invalid_uid": "Invalid user id or user doesn't exist.",
    }


class ActivationSerializer(UidAndTokenSerializer):

    def validate(self, attrs):
        attrs = super().validate(attrs)
        if not self.user.is_active:
            return attrs