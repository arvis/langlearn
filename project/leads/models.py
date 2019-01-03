from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model

# Create your models here.
class Lead(models.Model):
  name=models.CharField(max_length=100)
  email=models.EmailField()
  message=models.CharField(max_length=300)
  created_at=models.DateTimeField(auto_now_add=True)

class Suggestion(models.Model):
  title = models.CharField(max_length=300)
  image = models.URLField()
  link = models.URLField(blank=True)
  description = models.TextField()
  keywords = models.TextField(blank=True)
  author = models.ForeignKey(get_user_model(),on_delete=models.CASCADE,)
  created_at = models.DateTimeField(auto_now_add=True)
  def __str__(self):
    return self.title

class List(models.Model):
  title=models.CharField(max_length=50)
  created_at=models.DateTimeField(auto_now_add=True)
  author = models.ForeignKey(get_user_model(),on_delete=models.CASCADE,)
  def __str__(self):
    return self.title

class Favorite(models.Model):
  suggestion = models.ForeignKey(Suggestion, on_delete=models.CASCADE)
  list = models.ForeignKey(List, on_delete=models.CASCADE)
  author = models.ForeignKey(get_user_model(),on_delete=models.CASCADE,)
  created_at=models.DateTimeField(auto_now_add=True)
  def __str__(self):
    return self.suggestion.title 
