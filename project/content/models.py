import os
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import datetime, date, timedelta
from uuid import uuid4
from math import floor

def generate_file_name(instance, filename, date=date.today()):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (str(uuid4()).replace('-', ''), ext)

    if not type(instance) is str:
        instance = instance.__class__.__name__.lower()
    return 'images/' + instance + '/{y}/{m}/{d}/{filename}'.format(**{
        'y': date.year,
        'm': date.month,
        'd': date.day,
        'filename': filename
    })


class Profile(models.Model):
    STATUS_ON_MODERATION = 0
    STATUS_IN_COMPETITION = 1
    STATUS_CHOICES = (
        (STATUS_ON_MODERATION, 'На модерации'),
        (STATUS_IN_COMPETITION, 'В конкурсе')
    )
    status = models.SmallIntegerField(
        choices=STATUS_CHOICES,
        verbose_name='Статус',
        default=STATUS_ON_MODERATION
    )

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile',
        verbose_name='Пользователь'
    )
    avatar = models.ImageField(
        upload_to=generate_file_name,
        blank=True,
        null=True,
        verbose_name='Юзерпик'
    )
    fio = models.CharField(
        max_length=200,
        verbose_name='ФИО'
    )
    age = models.IntegerField(
        verbose_name='Возраст'
    )
    height = models.IntegerField(
        verbose_name='Рост'
    )
    weight = models.IntegerField(
        verbose_name='Вес'
    )
    rating = models.IntegerField(
        verbose_name='Голоса'
    )
    city = models.CharField(
        max_length=200,
        blank=True,
        verbose_name='Город'
    )
    info = models.TextField(
        max_length=500,
        blank=True,
        verbose_name='О себе'
    )
    citizenship = models.CharField(
        max_length=100,
        blank=True,
        verbose_name='Гражданство'
    )
    profession = models.CharField(
        max_length=200,
        blank=True,
        verbose_name='Профессия'
    )
    interests = models.TextField(
        max_length=200,
        blank=True,
        verbose_name='Интересы'
    )
    created_date = models.DateTimeField(
        default=timezone.now,
        verbose_name='Дата создания'
    )

    last_vote_date = models.DateTimeField(
        default=timezone.now,
        verbose_name='Дата последнего голосования'
    )

    def __str__(self):
        return self.fio

    @property
    def correct_age(self):
        age = self.age
        if age > 10 and age < 21:
            return str(age) + ' лет'
        if age % 10 == 1:
            return str(age) + ' год'
        if age % 10 > 1 and age % 10 < 5:
            return str(age) + ' года'
        if age % 10 > 5 or age % 10 == 0:
            return str(age) + ' лет'
        return '-'

    @property
    def sorted_image_set(self):
        return self.images.order_by('id')

    @property
    def can_vote(self):
        t = floor(timezone.now().timestamp() / 86400) - floor(self.last_vote_date.timestamp() / 86400) 
        return t > 0

    class Meta:
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профили'


class ProfileImage(models.Model):
    profile = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='images',
        verbose_name='Профиль'
    )
    file = models.ImageField(
        upload_to=generate_file_name,
        blank=True,
        null=True,
        verbose_name='Изображение'
    )

    def filename(self):
        return os.path.basename(self.file.name)

    def __str__(self):
        return self.filename()

    class Meta:
        verbose_name_plural = 'Изображения'
        verbose_name = 'Изображение'


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        profile = Profile(
            user=instance,
            fio=instance.first_name,
            age=0,
            height=0,
            weight=0,
            rating=0,
            last_vote_date=datetime.now() - timedelta(days=1)
        )
        profile.save()


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if Profile.objects.filter(user=instance).exists():
        instance.profile.save()
    else:
        profile = Profile(
            user=instance,
            fio=instance.first_name,
            age=0,
            height=0,
            weight=0,
            rating=0,
            last_vote_date=datetime.now() - timedelta(days=1)
        )
        profile.save()


@receiver(post_save, sender=Profile)
def create_user_profile_images(sender, instance, created, **kwargs):
    if created:
        for i in range(0, 5):
            image = ProfileImage(profile=instance)
            image.save()
