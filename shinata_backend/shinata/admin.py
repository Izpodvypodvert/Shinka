from django.contrib.auth.admin import UserAdmin

from django.contrib import admin

from django.utils.timezone import now
from shinata.models import (Record, Service, Category, Appointment, Client, RecordService, ProductsCategory, Product,
                            AppointmentsManager, ComplexServices, ComplexServicesService, ComplexServicesRecord)

from rangefilter.filters import DateRangeFilterBuilder
from shinata.forms import CustomUserCreationForm, CustomUserChangeForm


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = Client
    list_display = ('username', 'phone', 'email', 'car_brand', 'car_model')
    list_filter = ('role', )
    fieldsets = (
        (None, {'fields': ('username', 'phone', 'email', 'password', 'car_brand', 'car_model')}),
        ('Permissions', {'fields': ('role',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'username', 'phone', 'email', 'password1', 'password2', 'car_brand', 'car_model', 'role',
                
            )}
        ),
    )
    search_fields = ('username', 'phone', 'email', 'car_brand', 'car_model')
    ordering = ('username',)

admin.site.register(Client, CustomUserAdmin)


class CompexServicesRecordInline(admin.TabularInline):
    model = ComplexServicesRecord
    extra = 0


class CompexServicesServiceInline(admin.TabularInline):
    model = ComplexServicesService
    extra = 0


class ComplexServicesAdmin(admin.ModelAdmin):
    inlines = (CompexServicesServiceInline, )


class RecordServiceInline(admin.TabularInline):
    model = RecordService
    extra = 0


class RecordInline(admin.ModelAdmin):
    inlines = (RecordServiceInline, CompexServicesRecordInline)
    list_filter = [('appointment__dt', DateRangeFilterBuilder()), ]
    search_fields = ['client__username', 'client__phone', 'client__email',
                     'client__car_model', 'client__car_brand']

    def get_form(self, request, obj=None, **kwargs):
        form = super(RecordInline, self).get_form(request, obj, **kwargs)
        form.base_fields['appointment'].queryset = Appointment.objects.filter(
            reserved=False, dt__gt=now())
        return form


class AppointmentAdmin(admin.ModelAdmin):
    # date_hierarchy = 'dt'
    list_filter = [('dt', DateRangeFilterBuilder()), 'reserved']
    

class ProductAdmin(admin.ModelAdmin):
    search_fields = ['brand', 'description']

admin.site.register(Product, ProductAdmin)
admin.site.register(ProductsCategory)
admin.site.register(Record, RecordInline)
admin.site.register(Service)
admin.site.register(ComplexServices, ComplexServicesAdmin)
admin.site.register(Category)
admin.site.register(Appointment, AppointmentAdmin)
# admin.site.register(Client, UserAdmin)
admin.site.register(AppointmentsManager)
