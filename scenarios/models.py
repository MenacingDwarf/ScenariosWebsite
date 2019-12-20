from django.db import models


class Category(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title


class Scenario(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    demo = models.TextField()
    image = models.CharField(max_length=150)
    categories = models.ManyToManyField(Category, related_name="scenarios")

    def __str__(self):
        return self.title
