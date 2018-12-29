from django.contrib import admin

from .models import Lead,Suggestion,List,Favorite

admin.site.register(Lead)
admin.site.register(Suggestion)
admin.site.register(List)
admin.site.register(Favorite)
