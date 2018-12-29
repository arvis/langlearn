from django.test import TestCase
from rest_framework.test import APITestCase
from leads.models import Lead,Suggestion,List,Favorite
from leads.serializers import SuggestionSerializer,ListSerializer,FavoriteSerializer,AddFavoriteSerializer,MyFavoriteSerializer



class SuggestionTests(APITestCase):
  def test_can_get_suggestion(self):
    item = Suggestion.objects.create(title='Learn much', image='https://dev.to/',link='https://dev.to/',description='Learning resource')
    response = self.client.get(f'/api/sugg/{item.id}')
    self.assertEqual(response.status_code, 200)
    #self.assertEqual(response.data, SuggestionSerializer(instance=item).data)

  def test_can_get_suggestion_list(self):
    item = Suggestion.objects.create(title='Learn much', image='https://dev.to/',link='https://dev.to/',description='Learning resource')
    response =  self.client.get(f'/api/sugg')
    self.assertEqual(response.status_code, 200)
    import pdb;pdb.set_trace()
    print(response)
    # self.assertEqual(response.data[0], SuggestionSerializer(instance=item).data)