from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models
from phone_field import PhoneField


from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created

from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string

from django_rest_passwordreset.signals import reset_password_token_created
class CustomUserManager(UserManager):
    use_in_migrations = True


    def _create_user(self, username, email, password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, is_staff=extra_fields.get('is_staff', False), is_superuser=extra_fields.get('is_superuser', False))
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self._create_user(email, password, **extra_fields)

# Create your models here.
class State(models.Model):
    state = models.CharField(verbose_name='State', max_length=20, unique=True)

    def __str__(self):
      return self.state
class User(AbstractUser):
    username = models.CharField(max_length=20, unique=True, blank=False, null=False)
    email = models.EmailField(max_length=254, unique=True, verbose_name='email address')
    state = models.ForeignKey(State,verbose_name='State', on_delete=models.CASCADE, blank=True, null=True)
    city = models.CharField(verbose_name='City', max_length=20, blank=True, null=True)
    address = models.CharField(verbose_name='Address', max_length=50, blank=True, null=True)
    zipcode = models.CharField(verbose_name='Zip Code',max_length=10, blank=True, null=True)
    phone_number = PhoneField(verbose_name='Phone Number ',blank=True, null=True)
    is_active = models.BooleanField(default=False)
    
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    EMAIL_FIELD = 'email'

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    context = {
        'current_user': reset_password_token.user,
        'username': reset_password_token.user.username,
        'email': reset_password_token.user.email,
        'reset_password_url': "http://localhost:3000/password_reset_confirm/?token=" + reset_password_token.key
    }

    email_html_message = render_to_string('email/user_reset_password.html', context)
    email_plaintext_message = render_to_string('email/user_reset_password.txt', context)

    msg = EmailMultiAlternatives(
        "Password Reset for {title}".format(title="Some website title"),
        email_plaintext_message,
        "noreply@somehost.local",
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()