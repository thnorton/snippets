from rest_framework.routers import DefaultRouter
from .views import SnippetViewSet, TagViewSet

router = DefaultRouter()
router.register(r'', SnippetViewSet, basename='snippet-list')
router.register(r'tags', TagViewSet, basename='tags')

urlpatterns = router.urls