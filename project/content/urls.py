"""content URLs

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from django.conf.urls import url
from content import views

urlpatterns = [
    path('', views.index_view, name="index-page"),
    path('form/', views.form_view, name="form-page"),
    path('form/success/', views.form_succ_view, name="form-page-succ"),
    path('form/upload/', views.upload_image_view, name="upload_image"),
    path('form/remove/', views.remove_image_view, name="remove_image"),
    path('participants/', views.participants_view, name="participants"),
    url(r'^participants/$', views.participants_view, name="participants"),
    url(r'^participants/(?P<profile_id>\d{1,5})/$', views.participant_view, name="participant-page"),
    path('vote', views.vote, name="vote"),
    url(r'^logout/$', views.logout_view, name="logout-page"),
]
