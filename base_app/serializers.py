from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'room_name','host', 
                  'max_people','guest_can_pause', 
                  'votes_to_skip', 'created_at')

class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('max_people', 'guest_can_pause', 'votes_to_skip', 'room_name')
