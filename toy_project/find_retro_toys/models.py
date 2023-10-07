from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

class ConditionTag(models.Model):
  condition_tag = models.CharField(verbose_name='ConditionTag', max_length=20, null=False, blank=False)
  def __str__(self):
    return str(self.condition_tag)

class Post(models.Model):
  title = models.CharField(verbose_name='Title', max_length=40, null=False, blank=False)
  maker = models.CharField(verbose_name='Maker', max_length=40, null=False, blank=False)
  condition = models.ForeignKey(ConditionTag, verbose_name='Condition', on_delete=models.CASCADE)
  price = models.IntegerField(verbose_name='Price',null=False, blank=False)
  description = models.TextField(verbose_name='Description', max_length=300, null=False, blank=False)
  user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, null=False, related_name='user_posts')
  shipping_price = models.IntegerField(verbose_name='Shipping Price',null=False, blank=False)
  photo = models.ImageField(verbose_name='Photo', null=False, blank=False, upload_to='images/photo_from_user')
  photo2 = models.ImageField(verbose_name='Photo2', null=True, blank=True, upload_to='images/photo_from_user')
  photo3 = models.ImageField(verbose_name='Photo3', null=True, blank=True, upload_to='images/photo_from_user')
  photo4 = models.ImageField(verbose_name='Photo4', null=True, blank=True, upload_to='images/photo_from_user')
  photo5 = models.ImageField(verbose_name='Photo5', null=True, blank=True, upload_to='images/photo_from_user')
  like_numbers = models.IntegerField(default=0)

  def __str__(self):
    return str(self.title)

  def __str__(self):
    return str(self.user)

  def countup_like_numbers(self):
      self.like_numbers += 1
      self.save()

  def countdown_like_numbers(self):
      self.like_numbers -= 1
      self.save()

class MessageRoom(models.Model):
    post = models.ForeignKey(Post, verbose_name='MessageRoom Post', related_name='messageroom_post', on_delete=models.CASCADE)
    inquiry_user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, null=False, related_name='inquiry_user')
    update_time = models.DateTimeField(auto_now=True)

    def get_last_message(self):
      first_message_obj = self.message_set.all().order_by('-create_time').first()
      if first_message_obj:
          return first_message_obj.message
      else:
          return 'No massage yet'

    def __str__(self):
      return str(self.id)
      
class Message(models.Model):
    message = models.CharField(max_length=100)
    message_room = models.ForeignKey(MessageRoom, verbose_name='Message_room_id', on_delete=models.CASCADE)
    message_user = models.ForeignKey(get_user_model(), verbose_name='message_user', on_delete=models.CASCADE)
    create_time = models.DateTimeField(default=timezone.now)

    def __str__(self):
      return str(self.id)

class Like(models.Model):
  post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='like_linked_post')
  user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='like_by_user')
  timestamp = models.DateTimeField(default=timezone.now)
