# Generated by Django 3.1.7 on 2021-03-17 19:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base_app', '0007_auto_20210317_1401'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='votes_to_skip',
            field=models.IntegerField(default=0),
        ),
    ]
