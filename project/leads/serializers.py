from rest_framework import serializers
from leads.models import Lead,Suggestion,List,Favorite

class LeadSerializer(serializers.ModelSerializer):
  class Meta:
    model = Lead
    fields = '__all__'


class SuggestionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Suggestion
    fields = '__all__'


class ListSerializer(serializers.ModelSerializer):
  class Meta:
    model = List
    fields = '__all__'

class FavoriteSerializer(serializers.ModelSerializer):
  class Meta:
    model = Favorite
    fields = '__all__'

class MyFavoriteSerializer(serializers.ModelSerializer):
  suggestion = SuggestionSerializer(many=False, read_only=True)
  list = ListSerializer(many=False, read_only=True)

  class Meta:
    model = Favorite
    fields = ('suggestion','list', 'id')

class AddFavoriteSerializer(serializers.Serializer):
  suggestion_id = serializers.IntegerField()
  user_id = serializers.IntegerField(required=False)

  def create(self, validated_data):
    return Favorite.objects.create(**validated_data)