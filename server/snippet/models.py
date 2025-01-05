from django.db import models


class Tag(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return f"{self.name}"


class Snippet(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.TextField(default="")
    tags = models.ManyToManyField(Tag, related_name='snippets')

    def __str__(self):
        return f"{self.id} - {self.content}"