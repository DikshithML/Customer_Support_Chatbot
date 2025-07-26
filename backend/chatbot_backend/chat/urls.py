from django.urls import path
from .views import chat_view
from . import views


urlpatterns = [
    path('chat/', chat_view, name='chat_api'),
     path('api/chat/', views.chat),
]
