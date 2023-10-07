from django.shortcuts import redirect, get_object_or_404
from rest_framework import permissions

from rest_framework.response import Response
from rest_framework import status, viewsets, filters
from .serializers import PostSerializer, MessageSerializer, MessageRoomSerializer, LikeSerializer
from .models import Post, Message, MessageRoom, Like
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from django.db.models import Q

from django.core.mail import send_mail
from django.conf import settings
class PostViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny, )
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'maker']

    def create(self, request, pk=None):
        data = {
            'title': request.data['title'],
            'maker': request.data['maker'],
            'condition': request.data['condition'],
            'price': request.data['price'],
            'description': request.data['description'],
            'shipping_price': request.data['shipping_price'],
            'photo': request.data['photo']
        }
        if request.data['photo2']:
            data['photo2'] = request.data['photo2']
        elif request.data['photo3']:
            data['photo3'] = request.data['photo3']
        elif request.data['photo4']:
            data['photo4'] = request.data['photo4']
        elif request.data['photo5']:
            data['photo5'] = request.data['photo5']

        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save(user=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk, partial=True):
        obj = Post.objects.get(id=pk)

        data = {
            'title': request.data['title'],
            'maker': request.data['maker'],
            'condition': request.data['condition'],
            'price': request.data['price'],
            'description': request.data['description'],
            'shipping_price': request.data['shipping_price'],
        }
        if request.data['photo'] != 'null':
            data['photo'] = request.data['photo']
        if request.data['photo2'] != 'null':
            data['photo2'] = request.data['photo2']
        if request.data['photo3'] != 'null':
            data['photo3'] = request.data['photo3']
        if request.data['photo4'] != 'null':
            data['photo4'] = request.data['photo4']
        if request.data['photo5'] != 'null':
            data['photo5'] = request.data['photo5']
        serializer = self.serializer_class(obj, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, permission_classes=[IsAuthenticated])
    def open_messageroom(self, request, pk):
        post = self.get_object()
        messageroom_id_from_react = request.query_params.get('messageroom_id', None)
        if post.user == request.user:
            obj = MessageRoom.objects.get(id=messageroom_id_from_react, post=post)
        else:
            obj, created = MessageRoom.objects.get_or_create(inquiry_user=request.user, post=post)
        serializer = MessageRoomSerializer(obj)
        if obj.post.user == obj.inquiry_user:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        else:
            return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, permission_classes=[IsAuthenticated])
    def like(self, request, pk):
        obj, created = Like.objects.get_or_create(user=request.user, post=self.get_object())
        serializer = LikeSerializer(obj)
        post = self.get_object()
        if created:
            post.countup_like_numbers()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            post.countdown_like_numbers()
            obj.delete()
            return Response("Delete Like Object", status=status.HTTP_200_OK)
        
    @action(detail=True)
    def judgeLiked(self, request, pk):
        isLiked = False
        post_id = self.kwargs['pk']
        post = Post.objects.get(id=post_id)
        if not self.request.user.is_anonymous:
            if Like.objects.filter(user=self.request.user, post=post).exists():
                isLiked = True
            else:
                isLiked = False
        return Response(isLiked,status=status.HTTP_200_OK)

class MessageRoomViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny, )
    queryset = MessageRoom.objects.all()
    serializer_class = MessageRoomSerializer

    def get(self, request, **kwargs):
        message_room_obj = get_object_or_404(MessageRoom, pk=self.kwargs['pk'])
        if message_room_obj.post.user == self.request.user or message_room_obj.post.inquiry_user == self.request.user:
            return super().get(request, **kwargs)
        else:
            return redirect('/')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['message_list'] = Message.objects.filter(message_room_id=self.kwargs['pk'])
        return context

    @action(detail=False, permission_classes=[IsAuthenticated])
    def my_messagerooms(self, request, pk=None):
        user_posts = request.user.user_posts.all()
        obj= MessageRoom.objects.filter(Q(inquiry_user=request.user)|Q(post__in=user_posts))
        data = self.serializer_class(obj, many=True).data
        if not obj:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(data,status=status.HTTP_200_OK)



class MessageViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny, )
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def create(self, request, pk=None):
            data = {
                'message': request.data['message'],
                'message_room': request.data['message_room'],
                'create_time': timezone.now(),
                'message_user': self.request.user.id,
            }
            serializer = self.serializer_class(data=data)
            if serializer.is_valid():
                serializer.save(message_user=self.request.user)
                message_room = MessageRoom.objects.get(id=request.data['message_room'])
                post_user = message_room.post.user
                if message_room.inquiry_user == self.request.user:
                    recipient_list = [post_user.email]
                elif post_user == self.request.user:
                    recipient_list = [message_room.inquiry_user.email]
                else:
                    raise ValueError("Can't determine recipient")
                send_mail(
                    subject='New message', 
                    message='Access to http://localhost:3000/messagerooms', 
                    from_email=settings.EMAIL_HOST_USER, 
                    recipient_list=recipient_list,
                    )
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)
