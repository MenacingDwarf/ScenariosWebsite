from django.urls import path
from . import views

urlpatterns = [
    path('', views.hello),
    path('scenarios/', views.hello),
    path('scenarios/<id>', views.hello_with_id),
    path('photos/', views.hello),
    path('contacts/', views.hello),
    path('rewards/', views.hello),
]
