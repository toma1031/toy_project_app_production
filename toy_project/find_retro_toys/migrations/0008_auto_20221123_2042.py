# Generated by Django 2.2.17 on 2022-11-23 20:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('find_retro_toys', '0007_post_like_numbers'),
    ]

    operations = [
        migrations.AlterField(
            model_name='like',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='like_linked_post', to='find_retro_toys.Post'),
        ),
        migrations.AlterField(
            model_name='like',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='like_by_user', to=settings.AUTH_USER_MODEL),
        ),
    ]
