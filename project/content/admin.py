from django.contrib import admin
from .models import Profile, ProfileImage


class ProfileImageAdminInline(admin.TabularInline):
    model = ProfileImage
    max_num = 5


class ProfileAdmin(admin.ModelAdmin):
    inlines = (ProfileImageAdminInline,)
    list_display = ('fio', 'status', 'rating', 'city', )
    list_filter = ('status', )


# Register your models here.
admin.site.register(Profile, ProfileAdmin)
admin.site.register(ProfileImage)
