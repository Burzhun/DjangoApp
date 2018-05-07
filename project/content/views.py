from content.models import Profile, ProfileImage
from django.contrib.auth import logout
from django.shortcuts import render, redirect
from content.forms import ProfileForm, ImageUploadForm
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, Http404
from datetime import datetime, date
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from django.views.decorators.csrf import ensure_csrf_cookie


def index_view(request):
    participants = Profile.objects.filter(
        status=Profile.STATUS_IN_COMPETITION
    ).order_by('-rating', '-created_date')[:9]
    # events = Events.objects.all()
    data = {
        'participants': participants
    }
    template_name = 'content/index.html'
    if request.user_agent.is_mobile:
        template_name = 'content/mobile/index.html'
    return render(request, template_name, data)


@login_required(login_url='/')
def form_view(request):
    data = {}
    if request.method == 'POST':
        profile = request.user.profile
        form = ProfileForm(request.POST, instance=profile)
        data['images'] = list(profile.images.all())
        data['images'] += [None] * (5 - len(data['images']))
        if form.is_valid():
            profile = form.save(commit=True)
            profile.images.clear()
            profile.status = Profile.STATUS_ON_MODERATION
            profile.save()
            for i in range(0, 5):
                if request.POST.get('image-%s' % i):
                    pk = int(request.POST.get('image-%s' % i))
                    try:
                        image = ProfileImage.objects.get(pk=pk)
                        image.profile = profile
                        image.save()
                        if i == 0:
                            profile.avatar = image.file
                            profile.save()
                    except ProfileImage.DoesNotExist:
                        continue

            return redirect('/form/success/')

    else:
        data['images'] = list(request.user.profile.images.all())
        if not request.user_agent.is_mobile:
            data['images'] += [None] * (5 - len(data['images']))
        form = ProfileForm(instance=request.user.profile)
    data['form'] = form

    template_name = 'content/form.html'
    if request.user_agent.is_mobile:
        template_name = 'content/mobile/form.html'
    return render(request, template_name, data)


@login_required(login_url='/')
def form_succ_view(request):
    template_name = 'content/form_succ.html'
    if request.user_agent.is_mobile:
        template_name = 'content/mobile/form_succ.html'
    return render(request, template_name)

@ensure_csrf_cookie
def participants_view(request):
    if request.method == 'POST':
        offset = int(request.POST['offset'])
        profiles = Profile.objects.filter(status=Profile.STATUS_IN_COMPETITION).order_by('-rating', '-created_date')[offset:offset + 9]
        return render(request, 'content/participants_ajax.html',
                      {'profiles': profiles, 'is_mobile': request.user_agent.is_mobile})

    profiles = Profile.objects.filter(status=Profile.STATUS_IN_COMPETITION)

    profiles = profiles.order_by('-rating', '-created_date')[:9]

    return render(request, 'content/participants.html', {'profiles': profiles, 'is_mobile': request.user_agent.is_mobile})


def participant_view(request, profile_id):
    try:
        user = User.objects.get(pk=profile_id)
    except User.DoesNotExist:
        raise Http404
    template_name = 'content/view.html'
    if request.user_agent.is_mobile:
        template_name = 'content/mobile/view.html'
    try:
        profile = Profile.objects.get(user=user)
    except Profile.DoesNotExist:
        raise Http404
    return render(request, template_name, {'profile': user.profile})


@login_required(login_url='/')
def vote(request):
    user_id = request.POST.get('user_id')
    if request.method != 'POST' or not user_id or not user_id.isdigit():
        return JsonResponse({"success": False})

    if (request.user.profile.can_vote and user_id != request.user.id):
        profile = User.objects.get(pk=user_id).profile
        profile.rating = profile.rating + 1
        profile.save()
        request.user.profile.last_vote_date = datetime.now()
        request.user.profile.save()
        return JsonResponse({"success": True, "new_rating": profile.rating})
    else:
        return JsonResponse({"success": False, "message": "Вы уже голосовали сегодня"})


@login_required(login_url='/')
def upload_image_view(request):
    form = ImageUploadForm(request.POST, request.FILES)
    if form.is_valid():
        upload = form.save()
        return JsonResponse({"file": upload.file.url, 'pk': upload.pk})

    return JsonResponse({"error": "Ошибка загрузки файлов."})


@login_required(login_url='/')
def remove_image_view(request):
    pk = request.POST.get('pk')
    if request.method != 'POST' or not pk or not pk.isdigit():
        raise Http404
    try:
        ProfileImage.objects.get(pk=pk).delete()
        return JsonResponse({'succ': True})
    except ProfileImage.DoesNotExist:
        raise Http404


@login_required(login_url='/')
def logout_view(request):
    logout(request)
    return redirect('/')


def page_not_found(request, exception=None):
    return redirect('/')


def internal_error(request, exception=None):
    return redirect('/')
