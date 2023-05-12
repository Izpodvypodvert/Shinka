from django.utils import timezone
from rest_framework import viewsets, filters, status
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.generics import ListAPIView
from rest_framework.exceptions import MethodNotAllowed
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny


from shinata.models import (Product, ProductsCategory, Record, Service, Category, Appointment,
                            Client, AppointmentsManager, ComplexServices)

from .serializers import (ProductCategorySerializer, ProductSerializer, RecordSerializer, CategorySerializer, AppointmentSerializer, ServiceSerializer,
                          AppointmentsManagerSerializer, ComplexServicesSerializer, ClientSerializer,
                          RecordReadSerializer)


class RecordViewSet(viewsets.ModelViewSet):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    permission_classes = [AllowAny, ]
    lookup_field = 'client__username'

    def get_object(self):
        me = self.kwargs.get('client__username')
        if me == 'me' and self.request.method not in ('GET', 'PATCH'):
            raise MethodNotAllowed('Разрешены только GET и PATCH методы')
        if me == 'me':
            self.kwargs['client__username'] = self.request.user.username
        return super(RecordViewSet, self).get_object()

    def perform_create(self, serializer):
        serializer.save(client=self.request.user)

    def get_serializer_class(self):
        if self.action in ('list', 'retrieve'):
            return RecordReadSerializer
        return RecordSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny, ]


class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [AllowAny, ]
    
    
    def get_queryset(self):
        return Appointment.objects.filter(reserved=False)


class ApointmentView(APIView):
    def get(self, request, date):
        appointments = Appointment.objects.filter(dt__year=date.year, dt__month=date.month, dt__day=date.day)
        appointments.filter(dt__lte=timezone.now()).update(expired=True)
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    #permission_classes = [AllowAny, ]


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [AllowAny, ]
    lookup_field = 'username'
    
    def get_object(self):
        me = self.kwargs.get('username')
        if me == 'me' and self.request.method not in ('GET', 'PATCH'):
            raise MethodNotAllowed('Разрешены только GET и PATCH методы')
        if me == 'me':
            self.kwargs['username'] = self.request.user.username
        print(self.request.data)
        return super(ClientViewSet, self).get_object()


class AppointmentsManagerView(APIView):
    def get(self, request):
        appointments = AppointmentsManager.objects.all()
        serializer = AppointmentsManagerSerializer(appointments, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AppointmentsManagerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ComplexServicesViewSet(viewsets.ModelViewSet):
    queryset = ComplexServices.objects.all()
    serializer_class = ComplexServicesSerializer
    permission_classes = [AllowAny, ]
    

class ProductCategoryView(APIView):
    def get(self, request):
        categories = ProductsCategory.objects.all()
        serializer = ProductCategorySerializer(categories, many=True)
        return Response(serializer.data)
    
    
class ProductView(APIView):
    def get(self, request, productcategoryid):
        product_category = ProductsCategory.objects.filter(pk=productcategoryid).first()
        products = product_category.products.all()
        # products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class ProductListView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['brand', 'description']
