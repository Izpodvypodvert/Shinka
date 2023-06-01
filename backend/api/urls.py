from rest_framework import routers
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.urls import include, path, re_path, register_converter

from api.utils import DateConverter

from .views import (ApointmentView, RecordViewSet, CategoryViewSet, AppointmentViewSet, ServiceViewSet,
                    ClientViewSet, AppointmentsManagerView, ProductCategoryView,
                    ProductView, ProductListView, ServiceGroupViewSet, FAQView)


app_name = 'posts'

router_v1 = routers.DefaultRouter()
router_v1.register(r'records', RecordViewSet)
router_v1.register(r'categories', CategoryViewSet)
router_v1.register(r'appointments', AppointmentViewSet, basename='appointment')
router_v1.register(r'services', ServiceViewSet)
router_v1.register(r'clients', ClientViewSet)
router_v1.register(r'service-groups', ServiceGroupViewSet)

register_converter(DateConverter, 'my_date')

urlpatterns = [
    path('v1/', include(router_v1.urls)),
    path('v1/', include('djoser.urls.authtoken')),
    path('v1/appointment/date/<my_date:date>/', ApointmentView.as_view(), name='date'),
    path('v1/appointments_manager/', AppointmentsManagerView.as_view()),
    path('v1/products-category/', ProductCategoryView.as_view()),
    path('v1/products/<int:productcategoryid>/', ProductView.as_view()),
    path('v1/searched-products/', ProductListView.as_view()),
    path('v1/faq/', FAQView.as_view())
]


schema_view = get_schema_view(
   openapi.Info(
      title="Shinka API",
      default_version='v1',
      description="Документация для api проекта Shinka",
      contact=openapi.Contact(email="izalbu@yandex.ru"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

urlpatterns += [
    re_path(r'^swagger(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0),
            name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0),
            name='schema-redoc'),
]
