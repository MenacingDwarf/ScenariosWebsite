from django.shortcuts import render
from .models import *
from .serializers import *

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import authentication


def hello(request):
    scenarios = Scenario.objects.all()
    print(len(scenarios))
    return render(request, "scenarios/index.html")


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
        scenario_id = request.GET.get('scenario_id')
        if scenario_id is not None:
            scenario = Scenario.objects.get(id=scenario_id)
            serializer = ScenarioFullSerializer(scenario)
            return Response({"data": serializer.data})

        category = request.GET.get('category')
        scenarios = Scenario.objects.all()
        if category is not None:
            scenarios.filter(categories__title=category)

        serializer = ScenarioShortSerializer(scenarios, many=True)
        return Response({"data": serializer.data})
