from django.shortcuts import render


def hello(request):
    return render(request, 'frontend/index.html')


def hello_with_id(request, id):
    return render(request, 'frontend/index.html')

