from .models import generate_file_name, User
from django.core.files.base import ContentFile
from social_core.pipeline.user import USER_FIELDS
from content.models import Profile
import requests


def create_user(strategy, details, backend, user=None, *args, **kwargs):
    if user:
        return {'is_new': False}

    fields = dict((name, kwargs.get(name, details.get(name)))
                  for name in backend.setting('USER_FIELDS', USER_FIELDS))
    if not fields:
        return

    if not fields.get('email'):
        fields['email'] = str(kwargs['response']['id']) + '@' + backend.name + '.social'

    user = strategy.create_user(**fields)
    
    if 'first_name' in details:
        user.profile.fio = details['first_name']
    if 'last_name' in details:
        user.profile.fio += ' ' + details['last_name']
    user.profile.save()

    return {
        'is_new': True,
        'user': user
    }


def save_profile(backend, user, response, is_new=False, *args, **kwargs):
    if not Profile.objects.filter(user=user).exists():
        user.save()
        
    if backend.name == 'facebook':
        if is_new or not user.profile.avatar:
            url = 'http://graph.facebook.com/{0}/picture?type=large'.format(response['id'])
            try:
                r = requests.get(url=url)
                r.raise_for_status()
            except requests.HTTPError:
                pass
            else:
                user.profile.avatar.save(
                    '{0}_fb.jpg'.format(response['id']),
                    ContentFile(r.content),
                    save=True
                )

    elif backend.name == 'vk-oauth2':

        if is_new or not user.profile.avatar:
            try:
                r = requests.get(
                    url='https://api.vk.com/method/users.get?user_id={0}&fields=photo_max&v=5.7.4'.format(response['id'])
                ).json()
                r = requests.get(url=r['response'][0]['photo_max'])
                r.raise_for_status()
            except requests.HTTPError:
                pass
            else:
                user.profile.avatar.save(
                    '{0}_vk.jpg'.format(response['id']),
                    ContentFile(r.content),
                    save=True
                )

    user.save()
