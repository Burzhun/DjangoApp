# Generated by Django 2.0.3 on 2018-03-30 16:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0008_auto_20180330_1507'),
    ]

    operations = [
        migrations.AlterField(
            model_name='propertyimage',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='upload/'),
        ),
    ]