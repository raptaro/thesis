# Generated by Django 5.1.5 on 2025-02-20 01:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patient', '0004_alter_patient_complaint'),
        ('queueing', '0005_preliminaryassessment_assessment'),
    ]

    operations = [
        migrations.CreateModel(
            name='Treatment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('treatment_notes', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('diagnoses', models.ManyToManyField(related_name='treatments', to='patient.diagnosis')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='treatments', to='patient.patient')),
                ('prescriptions', models.ManyToManyField(related_name='treatments', to='patient.prescription')),
            ],
        ),
    ]
