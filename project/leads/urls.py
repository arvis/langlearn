from django.urls import path
from . import views

urlpatterns=[
  path('api/lead/', views.LeadListCreate.as_view() ),
  path('api/sugg/', views.SuggestionListCreate.as_view() ),
  path('api/sugg/<int:pk>/', views.SuggestionGet.as_view() ),
  path('api/fav/', views.FavoriteListCreate.as_view() ),
  path('api/lst/', views.ListListCreate.as_view() ),
  path('api/my/', views.my_favorites ),
  path('api/add/', views.add_favorite ),
]