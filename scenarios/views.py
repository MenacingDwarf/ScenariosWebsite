from django.http import HttpResponse
from django.shortcuts import render, redirect
from .models import *
from .forms import *
from .serializers import *

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import authentication


def hello(request):
    scenarios = Scenario.objects.all()
    print(len(scenarios))
    return render(request, "scenarios/index.html")


def hotel_image_view(request):
    if request.method == 'POST':
        form = PhotoForm(request.POST, request.FILES)

        if form.is_valid():
            form.save()
            return redirect('success')
    else:
        form = PhotoForm()
    return render(request, 'scenarios/photos.html', {'form': form})


def success(request):
    return HttpResponse('successfully uploaded')


class CategoryView(APIView):
    permission_classes = [permissions.AllowAny, ]
    authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request):
        category = request.GET.get('category')
        if category is not None:
            category = Category.objects.get(title=category)
            serializer = CategoryFullSerializer(category)
            return Response({"data": serializer.data})

        categories = Category.objects.all()
        serializer = CategoryShortSerializer(categories, many=True)
        return Response({"data": serializer.data})


class ScenariosView(APIView):
    permission_classes = [permissions.AllowAny, ]
    authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request):
        on_page = 12

        scenario_id = request.GET.get('scenario_id')
        if scenario_id is not None:
            scenario = Scenario.objects.get(id=scenario_id)
            print(scenario.photos)
            serializer = ScenarioFullSerializer(scenario)
            return Response({"data": serializer.data})

        category = request.GET.get('category')
        page = int(request.GET.get('page'))
        scenarios = Scenario.objects.filter(posted=True).order_by('creation_date')
        if category is not None:
            scenarios = Scenario.objects.filter(categories__title=category, posted=True).order_by('creation_date')

        serializer = ScenarioShortSerializer(scenarios[(page-1)*on_page:page*on_page], many=True)
        return Response({"data": serializer.data, "pages_num": (len(scenarios)-1)//on_page+1})


class PhotoView(APIView):
    permission_classes = [permissions.AllowAny, ]
    authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request):
        photos = Photo.objects.all()
        serializer = PhotoFullSerializer(photos, many=True)
        return Response({"data": serializer.data})
