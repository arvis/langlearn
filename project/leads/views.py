from leads.models import Lead,Suggestion,List,Favorite
from leads.serializers import LeadSerializer,SuggestionSerializer,ListSerializer,FavoriteSerializer,AddFavoriteSerializer,MyFavoriteSerializer
from rest_framework import generics
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse

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
    return JsonResponse(status=403)

  if request.method == 'POST':
    data = JSONParser().parse(request)

    #create new item
    # get from JSON item id and list id
    # check if it exists
    # add current user
    # check if such entry exists
    # if not, save it

    data.user_id = request.user.id
    serializer = AddFavoriteSerializer(data=data)
    if serializer.is_valid():
      serializer.save()
      return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)