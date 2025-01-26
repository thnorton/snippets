from rest_framework.routers import DefaultRouter
from .views import SnippetViewSet, TagViewSet

router = DefaultRouter()
router.register(r'list', SnippetViewSet, basename='snipper-list')
router.register(r'tags', TagViewSet, basename='tags')

urlpatterns = router.urls