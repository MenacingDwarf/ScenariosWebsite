from django.urls import path
from . import views

urlpatterns = [
    path('scenarios/', views.ScenariosView.as_view()),
    path('categories/', views.CategoryView.as_view()),
    path('photos/', views.PhotoView.as_view()),
    path('image_upload', views.hotel_image_view, name='image_upload'),
    path('success', views.success, name='success'),
]
