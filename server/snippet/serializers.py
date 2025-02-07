from rest_framework.serializers import ModelSerializer
from drf_writable_nested.serializers import WritableNestedModelSerializer
from drf_writable_nested.mixins import UniqueFieldsMixin
from django.core.exceptions import ObjectDoesNotExist
from .models import Snippet, Tag


class TagSerializer(UniqueFieldsMixin, ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name']

    def validate_name(self, value):
        return value.lower()

    def create(self, validated_data):
        try:
            # if there is already an instance in the database with the
            # given value, we simply return this instance
            return Tag.objects.get(name=validated_data['name'])
        except ObjectDoesNotExist:
            # else, we create a new tag with the given value
            return super(TagSerializer, self).create(validated_data)

class SnippetSerializer(WritableNestedModelSerializer):

    tags = TagSerializer(many=True)

    class Meta:
        model = Snippet
        fields = ['id', 'content', 'info', 'tags']
