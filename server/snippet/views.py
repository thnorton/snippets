from rest_framework import viewsets
from .serializers import SnippetSerializer, TagSerializer
from .models import Snippet, Tag
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination


class SnippetPagination(PageNumberPagination):
    page_size = 10


class SnippetViewSet(viewsets.ModelViewSet):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['tags__name']
    search_fields = ['tags__name']
    pagination_class = SnippetPagination

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
