# Generated by Django 5.1.5 on 2025-05-29 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patient', '0013_alter_labrequest_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='patient_id',
            field=models.CharField(editable=False, max_length=50, primary_key=True, serialize=False, unique=True),
        ),
    ]
