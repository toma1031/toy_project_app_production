# Generated by Django 2.2.17 on 2021-07-06 06:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ConditionTag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('condition_tag', models.CharField(max_length=20, verbose_name='ConditionTag')),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=40, verbose_name='Title')),
                ('maker', models.CharField(max_length=40, verbose_name='Maker')),
                ('price', models.IntegerField(verbose_name='Price')),
                ('description', models.TextField(max_length=300, verbose_name='Description')),
                ('shipping_price', models.IntegerField(verbose_name='Shipping Price')),
                ('photo', models.ImageField(upload_to='images/', verbose_name='Photo')),
                ('photo2', models.ImageField(blank=True, null=True, upload_to='images/', verbose_name='Photo2')),
                ('photo3', models.ImageField(blank=True, null=True, upload_to='images/', verbose_name='Photo3')),
                ('photo4', models.ImageField(blank=True, null=True, upload_to='images/', verbose_name='Photo4')),
                ('photo5', models.ImageField(blank=True, null=True, upload_to='images/', verbose_name='Photo5')),
                ('condition', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='find_retro_toys.ConditionTag', verbose_name='Condition')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MessageRoom',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('update_time', models.DateTimeField(auto_now=True)),
                ('inquiry_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='inquiry_user', to=settings.AUTH_USER_MODEL)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='find_retro_toys.Post', verbose_name='MessageRoom Post')),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=100)),
                ('create_time', models.DateTimeField(default=django.utils.timezone.now)),
                ('message_room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='find_retro_toys.MessageRoom', verbose_name='Message')),
                ('message_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='message_user')),
            ],
        ),
    ]
