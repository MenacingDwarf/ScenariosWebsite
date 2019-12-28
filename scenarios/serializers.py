from rest_framework import serializers
from .models import *


class PhotoFullSerializer(serializers.ModelSerializer):
    scenario = serializers.StringRelatedField()

    class Meta:
        model = Photo
        fields = ("title", "image", "scenario")


class PhotoShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ("title", "image")


class ScenarioShortSerializer(serializers.ModelSerializer):
    categories = serializers.StringRelatedField(many=True)

    class Meta:
        model = Scenario
        fields = ("id", "creation_date", "title", "description", "image", "categories", "min_duration_minutes",
                  "max_duration_minutes", "actors_number", "target_audience", "price")


class ScenarioFullSerializer(serializers.ModelSerializer):
    categories = serializers.StringRelatedField(many=True)
    photos = PhotoShortSerializer(many=True)

    class Meta:
        model = Scenario
        fields = ("id", "creation_date", "title", "description", "demo", "image", "categories", "min_duration_minutes",
                  "max_duration_minutes", "actors_number", "target_audience", "photos", "price")


class CategoryShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "title")


class CategoryFullSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "title", "description")
