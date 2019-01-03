from django.urls import path
from . import views

urlpatterns=[
  path('lead/', views.LeadListCreate.as_view() ),
  # TODO: remove short forms and add my views
  path('sugg/', views.SuggestionListCreate.as_view() ),
  path('sugg/<int:pk>/', views.SuggestionGet.as_view() ),
  path('fav/', views.FavoriteListCreate.as_view() ),
  path('lst/', views.ListListCreate.as_view() ),
  path('my/', views.my_favorites ),
  path('favorite/', views.add_favorite ),
  path('suggestion/', views.add_suggestion ),
  path('auth/', views.is_auth ),
]