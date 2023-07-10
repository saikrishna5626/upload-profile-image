from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse


def hello(request):
	return HttpResponse('Hello')
class Check(APIView):

	def post(self, request, format=None):
		data=request.data
		print(data)
		return Response({'msg' : 'worked'}, status=status.HTTP_200_OK)
