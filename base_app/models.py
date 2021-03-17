from django.db import models
import random
import string


def generate_unique_code():
    length = 8
    while True:
        code = "".join(random.choices(string.ascii_uppercase + string.digits,k=length))
        if Room.objects.filter(code=code).count() == 0:
            break
    return code

class Room(models.Model):
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    room_name = models.CharField(max_length=40)
    host = models.CharField(max_length=50, unique=True)
    max_people = models.IntegerField(default=5)
    guest_can_pause = models.BooleanField(default=False, null=False)
    votes_to_skip = models.IntegerField(null=False, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.room_name} ({self.code})"