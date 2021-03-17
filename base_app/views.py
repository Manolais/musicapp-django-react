from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response


class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data['guest_can_pause']
            max_people = serializer.data['max_people']
            votes_to_skip = serializer.data['votes_to_skip']
            room_name = serializer.data['room_name']
            host = self.request.session.session_key

            queryset = Room.objects.filter(host=host)
            if queryset:
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.max_people = max_people
                room.room_name = room_name
                room.save(update_fields=['guest_can_pause', 'votes_to_skip', 'max_people', 'room_name', 'code'])
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip, max_people=max_people, room_name=room_name)
                room.save()

            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
        