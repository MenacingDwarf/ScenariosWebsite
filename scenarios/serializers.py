from rest_framework import serializers
from .models import *


class ScenarioShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scenario
        fields = ("id", "title", "description", "image", "categories")


class ScenarioFullSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scenario
        fields = ("id", "title", "description", "demo", "image", "categories")


class CategoryShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "title")


class CategoryFullSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "title", "description")
