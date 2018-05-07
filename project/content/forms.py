from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from content.models import Profile, ProfileImage


class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')


class ProfileForm(forms.ModelForm):
    fio = forms.CharField(label='ФИО', max_length=100, required=True)
    age = forms.IntegerField(label='Возраст', required=True)
    height = forms.IntegerField(label='Рост', required=True)
    weight = forms.IntegerField(label='Вес', required=True)
    city = forms.CharField(label='Город, в котором я живу', max_length=100, required=True)
    citizenship = forms.CharField(label='Гражданство', max_length=100, required=True)
    profession = forms.CharField(label='Профессия (для учащихся – указать учебное заведение и факультет)',
                                 max_length=100, required=True)
    interests = forms.CharField(label='Интересы и увлечения', max_length=200, required=True)
    info = forms.CharField(label='О себе', max_length=5000, widget=forms.Textarea, required=False)

    class Meta:
        model = Profile
        fields = ('fio', 'age', 'height', 'weight', 'city', 'citizenship', 'profession', 'interests', 'info',)


class ImageUploadForm(forms.ModelForm):
    file = forms.ImageField(required=True)

    class Meta:
        model = ProfileImage
        fields = ('file',)
