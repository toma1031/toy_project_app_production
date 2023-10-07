from rest_framework import serializers
from .models import Post, MessageRoom, Message, Like

class PostSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    condition_name = serializers.SerializerMethodField()

    def get_username(self, obj):
        return obj.user.username

    def get_condition_name(self, obj):
        return obj.condition.condition_tag

    class Meta:
        model = Post
        fields = ('id', 'title', 'maker', 'condition', 'price', 'description',
                  'user', 'username', 'condition_name', 'shipping_price',
                  'photo', 'photo2', 'photo3', 'photo4', 'photo5', 'like_numbers')
        read_only_fields = ('id', 'user', 'username', 'condition_name')


class MessageRoomSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    def get_username(self, obj):
        return obj.post.user.username
    messages = serializers.SerializerMethodField()
    def get_messages(self,obj):
        data = []
        for i in range(len(obj.message_set.all())):
            data.append(obj.message_set.all()[i])
        data = MessageSerializer(data,many=True).data
        return data
    class Meta:
        model = MessageRoom
        fields = ('id', 'post', 'inquiry_user', 'update_time', 'messages', 'username')
        depth = 1

class MessageSerializer(serializers.ModelSerializer):
    message_user = serializers.SerializerMethodField()
    create_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M")

    def get_message_user(self, obj):
        return obj.message_user.username
    class Meta:
        model = Message
        fields = ('message', 'message_room', 'message_user', 'create_time')


class LikeSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    timestamp = serializers.DateTimeField(format="%Y-%m-%d %H:%M")

    def get_user(self, obj):
        return obj.user.username

    class Meta:
        model = Like
        fields = ('post', 'user', 'timestamp')
