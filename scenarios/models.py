from django.db import models
from django.utils import timezone


class StringWithTitle(str):
    def __new__(cls, value, title):
        instance = str.__new__(cls, value)
        instance._title = title
        return instance

    def title(self):
        return self._title

    __copy__ = lambda self: self
    __deepcopy__ = lambda self, memodict: self


class Category(models.Model):
    creation_date = models.DateTimeField(default=timezone.now, verbose_name="дата создания")
    title = models.CharField(max_length=50, verbose_name="название")
    description = models.TextField(null=True, blank=True, verbose_name="краткое описание")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'категорию'  # название приложения в ед.
        verbose_name_plural = 'категории'  # название мн. числ.
        # ниже меняем название модели,
        app_label = StringWithTitle("scenarios", u"Работа со сценариями")


class Scenario(models.Model):
    creation_date = models.DateTimeField(default=timezone.now, verbose_name="дата создания")
    posted = models.BooleanField(default=False, verbose_name="опубликовать")
    title = models.CharField(max_length=100, verbose_name="название")
    description = models.TextField(verbose_name="краткое описание")
    demo = models.TextField(verbose_name="демо фрагмент")
    image = models.ImageField(upload_to='images/', verbose_name="главная картинка", null=True, blank=True)
    categories = models.ManyToManyField(Category, related_name="scenarios", blank=True, verbose_name="категории")
    min_duration_minutes = models.IntegerField(default=0, verbose_name="минимальная длительность (в минутах)")
    max_duration_minutes = models.IntegerField(default=0, verbose_name="максимальная длительность (в минутах)")
    actors_number = models.IntegerField(default=0, verbose_name="количество актёров")
    target_audience = models.CharField(max_length=100, default="", verbose_name="целевая аудитория")
    price = models.IntegerField(default=0, verbose_name="цена")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'сценарий'  # название приложения в ед.
        verbose_name_plural = 'сценарии'  # название мн. числ.
        # ниже меняем название модели,
        app_label = StringWithTitle("scenarios", u"Работа со сценариями")


class Photo(models.Model):
    creation_date = models.DateTimeField(default=timezone.now, verbose_name="дата создания")
    posted = models.BooleanField(default=False, verbose_name="опубликовать")
    title = models.CharField(max_length=100, null=True, blank=True, default=None, verbose_name="название")
    image = models.ImageField(upload_to='images/', verbose_name="изображение")
    scenario = models.ForeignKey(Scenario, related_name="photos", on_delete=models.CASCADE,
                                 verbose_name="связанный сценарий")

    def __str__(self):
        return self.image.url

    class Meta:
        verbose_name = 'фотографию'  # название приложения в ед.
        verbose_name_plural = 'фотографии'  # название мн. числ.
        # ниже меняем название модели,
        app_label = StringWithTitle("scenarios", u"Работа со сценариями")
