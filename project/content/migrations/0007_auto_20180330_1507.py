# Generated by Django 2.0.3 on 2018-03-30 15:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0006_auto_20180330_1455'),
    ]

    operations = [
        migrations.RenameField(
            model_name='propertyimage',
            old_name='property',
            new_name='property_field',
        ),
        migrations.AlterField(
            model_name='propertyimage',
            name='image',
            field=models.ImageField(upload_to='upload/'),
        ),
    ]
