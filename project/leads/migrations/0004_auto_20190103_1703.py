# Generated by Django 2.1.4 on 2019-01-03 15:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leads', '0003_auto_20190102_1410'),
    ]

    operations = [
        migrations.AlterField(
            model_name='suggestion',
            name='keywords',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='suggestion',
            name='title',
            field=models.CharField(max_length=300),
        ),
    ]
