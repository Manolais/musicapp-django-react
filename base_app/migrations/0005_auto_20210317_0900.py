# Generated by Django 3.1.7 on 2021-03-17 12:00

import base_app.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base_app', '0004_auto_20210316_1927'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='code',
            field=models.CharField(default=base_app.models.generate_unique_code, max_length=8, unique=True),
        ),
        migrations.AlterField(
            model_name='room',
            name='host',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
