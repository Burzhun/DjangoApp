# Generated by Django 2.0.3 on 2018-03-30 14:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0005_auto_20180321_2149'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='citizenship',
            field=models.TextField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='profile',
            name='interests',
            field=models.TextField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='profile',
            name='profession',
            field=models.TextField(blank=True, max_length=100),
        ),
    ]