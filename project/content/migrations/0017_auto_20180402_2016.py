# Generated by Django 2.0.3 on 2018-04-02 20:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0016_profile_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='status',
            field=models.SmallIntegerField(choices=[(0, 'На модерации'), (1, 'В конкурсе')], default=1, verbose_name='Статус'),
        ),
    ]