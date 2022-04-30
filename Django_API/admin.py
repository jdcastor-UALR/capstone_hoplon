from django.contrib import admin
from django.db.utils import IntegrityError
from django.contrib.auth.hashers import make_password
# Register your models here.
from .models import RegistrationRequest, User
from .utility import send_email


@admin.action(description='Approve Selected Accounts')
def approve_account(modeladmin, request, queryset):
    for registration in queryset:
        try:
            User.objects.create(username=registration.contact_email,
                                email=registration.contact_email,
                                password=make_password(registration.requested_password),
                                accessLevel=registration.access_level,
                                is_active=True)
            send_email(registration.contact_email, True, registration.requested_password)
        except IntegrityError:
            send_email(registration.contact_email, False, registration.requested_password)
    RegistrationRequestAdmin.delete_queryset(modeladmin, request, queryset)


@admin.action(description='Decline Selected Accounts')
def decline_account(modeladmin, request, queryset):
    for registration in queryset:
        send_email(registration.contact_email, False, registration.requested_password)
    RegistrationRequestAdmin.delete_queryset(modeladmin, request, queryset)


approve_account.short_description = 'Approve Selected Accounts'
decline_account.short_description = 'Decline Selected Accounts'


class RegistrationRequestAdmin(admin.ModelAdmin):
    list_display = ['id', 'access_level', 'requested_password', 'contact_email']
    actions = [approve_account, decline_account]  # <-- Add the list action function here


class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'accessLevel', 'email']


admin.site.register(RegistrationRequest, RegistrationRequestAdmin)
admin.site.register(User, UserAdmin)
