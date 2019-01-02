from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework.test import APITestCase
import json
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

from leads.models import Lead,Suggestion,List,Favorite
from leads.serializers import SuggestionSerializer,ListSerializer,FavoriteSerializer,AddFavoriteSerializer,MyFavoriteSerializer

from leads.scrape import simple_get

class SuggestionTests(APITestCase):
  def test_can_get_suggestion(self):
    item = Suggestion.objects.create(title='Learn much', image='https://dev.to/',link='https://dev.to/',description='Learning resource')
    response = self.client.get(f'/api/sugg/{item.id}/')
    self.assertEqual(response.status_code, 200)
    self.assertEqual(response.data, SuggestionSerializer(instance=item).data)

  def test_can_get_suggestion_list(self):
    item = Suggestion.objects.create(title='Learn much', image='https://dev.to/',link='https://dev.to/',description='Learning resource')
    response =  self.client.get(f'/api/sugg/')
    self.assertEqual(response.status_code, 200)
    self.assertEqual(response.data[0], SuggestionSerializer(instance=item).data)

  def test_is_authenticated(self):
    usr = User.objects.create_user(username='testuser', password='12345')
    c = APIClient()
    c.login(username='testuser', password='12345')
    response = c.get(f'/api/auth/')
    self.assertEqual(response.status_code, 200)
    data=json.loads(response.content)
    self.assertEqual(data['auth'], True)
    self.assertEqual(data['user']['username'], 'testuser')


  def test_can_add_favorite_without_list(self):
    item = Suggestion.objects.create(title='Learn much', image='https://dev.to/',link='https://dev.to/',description='Learning resource')
    usr = User.objects.create_user(username='testuser', password='12345')
    c = APIClient()
    c.login(username='testuser', password='12345')
    item = List.objects.create(title='Other',author = usr)
    response = c.post(f'/api/favorite/',{'suggestion': '1'}, format='json')
    self.assertEqual(response.status_code, 201)
    data=json.loads(response.content)
    self.assertEqual(data['suggestion'], 1)

  def test_can_add_favorite_not_exists(self):
    usr = User.objects.create_user(username='testuser', password='12345')
    c = APIClient()
    c.login(username='testuser', password='12345')
    item = List.objects.create(title='Other',author = usr)
    response = c.post(f'/api/favorite/',{'suggestion': '15'}, format='json')
    self.assertEqual(response.status_code, 400)


  # def test_can_add_suggestion(self):
  #   usr = User.objects.create_user(username='testuser', password='12345')
  #   c = APIClient()
  #   c.login(username='testuser', password='12345')
  #   item = List.objects.create(title='Other',author = usr)
  #   response = c.post(f'/api/suggestion/',{'link': 'https://www.tutorialspoint.com/nodejs/'}, format='json')
  #   self.assertEqual(response.status_code, 201)
  #   data=json.loads(response.content)
  #   # TODO: from website additional information is added

  def test_scraping_web(self):
    from leads.scrape import get_data
    data= get_data('https://www.tutorialspoint.com/nodejs/')
    self.assertEqual('Node.js Tutorial',data['title'])
    self.assertGreater(data['description'].find("Learn Node.js framework in simple and easy steps starting"),-1)
    