from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, 'portfolio/index.html')

def ping(request):
    return HttpResponse("pong", content_type="text/plain")