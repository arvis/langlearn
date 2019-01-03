from leads.models import Lead,Suggestion,List,Favorite
from leads.serializers import LeadSerializer,SuggestionSerializer,ListSerializer,FavoriteSerializer,AddFavoriteSerializer,MyFavoriteSerializer
from rest_framework import generics
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from leads.scrape import get_data


class LeadListCreate(generics.ListCreateAPIView):
  queryset = Lead.objects.all()
  serializer_class = LeadSerializer  

class SuggestionListCreate(generics.ListCreateAPIView):
  queryset = Suggestion.objects.all()
  serializer_class = SuggestionSerializer  

class ListListCreate(generics.ListCreateAPIView):
  queryset = List.objects.all()
  serializer_class = ListSerializer  

class FavoriteListCreate(generics.ListCreateAPIView):
  queryset = Favorite.objects.all()
  serializer_class = FavoriteSerializer  

class SuggestionGet(generics.RetrieveAPIView):
  queryset = Suggestion.objects.all()
  serializer_class = SuggestionSerializer  

# class FavoriteGet(generics.RetrieveAPIView):
#   queryset = Favorite.objects.all()
#   serializer_class = FavoriteSerializer  


@csrf_exempt
def my_favorites(request):
  if not request.user.is_authenticated:
    return JsonResponse(status=403)

  if request.method == 'GET':
    #id = request.user.id
    favorites = Favorite.objects.filter(author__exact=request.user)
    serializer = MyFavoriteSerializer(favorites, many=True)
    return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def add_favorite(request):
  if not request.user.is_authenticated:
    auth=dict()
    auth['message']='No authentification'
    return JsonResponse(auth, status=403)

  if request.method == 'POST':
    data = JSONParser().parse(request)
    data['author'] = request.user.id
    data['list'] = '1'
    #TODO: now always first list, later need to think which id to take
    # data['list_id'] = '1' #List.objects.get(pk=1).id
    serializer = FavoriteSerializer(data=data)
    if serializer.is_valid():
      serializer.save()
      return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def is_auth(request):
  auth_data = dict()
  if request.user.is_authenticated:
    auth_data['auth'] = True
    user_data = dict()
    user_data['username']=request.user.username
    auth_data['user'] = user_data
  else:
    auth_data['auth'] = False
  return JsonResponse(auth_data, status=200)

@csrf_exempt
def add_suggestion(request):
  if not request.user.is_authenticated:
    return JsonResponse(status=401)

  if request.method == 'POST':
    data = JSONParser().parse(request)
    data['author'] = request.user.id

    webpage_data = get_data(data['link'])
    if webpage_data['title']:
      data['title'] = webpage_data['title']

    if webpage_data['description']:
      dots_mark = '..'
      if len(webpage_data['description']) < 295:
        dots_mark = ''
      data['description'] = webpage_data['description'][:295] + dots_mark  
    else:
      data['description'] = webpage_data['title']

    if webpage_data['keywords']:
      data['keywords'] = webpage_data['keywords'][:295]
    

    #TODO: get image from webpage
    if webpage_data['type']=='youtube':
      #get image
      data['image']=data['link']
    else:
      data['image']=data['link']


    #TODO: add to model: keywords and author (just to see who is using it)
    #get data from POST request
    #get data from webpage, if it exists, if there is some data etc
    # save the suggestion
    # save the same suggestion to users favorites

    # import pdb;pdb.set_trace()
    serializer = SuggestionSerializer(data=data)
    if serializer.is_valid():
      serializer.save()
      return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)
