from django import forms
from .models import criminalModel


class criminalsForm(forms.ModelForm):
    class Meta:
        model = criminalModel
        fields = '__all__'