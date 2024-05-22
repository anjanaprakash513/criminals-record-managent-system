from rest_framework import serializers
from .models import criminalModel

class criminalSerializer(serializers.ModelSerializer):
    class Meta:
        model = criminalModel
        fields = '__all__'