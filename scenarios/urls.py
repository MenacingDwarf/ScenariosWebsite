from django.urls import path
from . import views

urlpatterns = [
    path('scenarios/', views.ScenariosView.as_view()),
    path('categories/', views.CategoryView.as_view())
]
