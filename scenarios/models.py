from django.db import models
from django.utils import timezone


class Photo(models.Model):
    creation_date = models.DateTimeField(default=timezone.now)
    posted = models.BooleanField(default=False)
    title = models.CharField(max_length=100)
    link = models.CharField(max_length=150)

    def __str__(self):
        return self.title


class Category(models.Model):
    creation_date = models.DateTimeField(default=timezone.now)
    title = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title


class Scenario(models.Model):
    creation_date = models.DateTimeField(default=timezone.now)
    posted = models.BooleanField(default=False)
    title = models.CharField(max_length=100)
    description = models.TextField()
    demo = models.TextField()
    image = models.CharField(max_length=150)
    categories = models.ManyToManyField(Category, related_name="scenarios", blank=True)
    min_duration_minutes = models.IntegerField(default=0)
    max_duration_minutes = models.IntegerField(default=0)
    actors_number = models.IntegerField(default=0)
    target_audience = models.CharField(max_length=100, default="")
    price = models.IntegerField(default=0)
    photos = models.ManyToManyField(Photo, related_name="scenarios", blank=True)

    def __str__(self):
        return self.title
