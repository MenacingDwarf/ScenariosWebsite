from django.db import models
from django.utils import timezone


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
    image = models.ImageField(upload_to='images/')
    categories = models.ManyToManyField(Category, related_name="scenarios", blank=True)
    min_duration_minutes = models.IntegerField(default=0)
    max_duration_minutes = models.IntegerField(default=0)
    actors_number = models.IntegerField(default=0)
    target_audience = models.CharField(max_length=100, default="")
    price = models.IntegerField(default=0)

    def __str__(self):
        return self.title


class Photo(models.Model):
    creation_date = models.DateTimeField(default=timezone.now)
    posted = models.BooleanField(default=False)
    title = models.CharField(max_length=100, null=True, blank=True, default=None)
    image = models.ImageField(upload_to='images/')
    scenario = models.ForeignKey(Scenario, related_name="photos", on_delete=models.CASCADE)

    def __str__(self):
        return self.image.url
