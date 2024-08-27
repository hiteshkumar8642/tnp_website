# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from interface.models import ContactUs
from interface.serializers import ContactUsSerializer
import logging

# Configure logging
logger = logging.getLogger(__name__)

@api_view(['POST'])
def ContactUsView(request):
    if request.method == 'POST':
        serializer = ContactUsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Thank you for contacting us!'}, status=status.HTTP_201_CREATED)
        else:
            # Log any serializer errors
            logger.error(f"Serializer errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'detail': 'Method not allowed.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
