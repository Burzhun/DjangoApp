# Generated by Django 2.0.4 on 2018-04-08 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0020_profile_last_vote_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='status',
            field=models.SmallIntegerField(choices=[(0, 'На модерации'), (1, 'В конкурсе')], default=0, verbose_name='Статус'),
        ),
    ]
