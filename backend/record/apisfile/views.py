from django.shortcuts import render

from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from django.contrib.auth.forms import UserCreationForm
from rest_framework.permissions import AllowAny


from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from rest_framework.authtoken.models import Token

from .models import criminalModel
from .forms import criminalsForm
from .serializers import criminalSerializer

@api_view(['POST'])
@permission_classes((AllowAny,))
def signup(request):
    form = UserCreationForm(data=request.data)
    if form.is_valid():
        user = form.save()
        return Response("account created successfully", status=status.HTTP_201_CREATED)
    return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)
    


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key},status=HTTP_200_OK)


# add criminal records

@api_view(['POST'])
@permission_classes((AllowAny,))
def addCriminals(request):
    form = criminalsForm(request.data)
    if form.is_valid():
        criminals = form.save()
        return Response({'id': criminals.id}, status=status.HTTP_201_CREATED)
    return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

# list

@api_view(['GET'])
@permission_classes((AllowAny,))
def list_all_criminals(request):
    criminal = criminalModel.objects.all()
    serializer = criminalSerializer(criminal, many=True)
    return Response(serializer.data)

#delete

@api_view(['DELETE'])
@permission_classes((AllowAny,))
def delete_record(request, pk):
    try:
        criminal = criminalModel.objects.get(pk=pk)
    except criminalModel.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    criminal.delete()
    return Response("deleted successfully")