from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from interface.models import Application, AppliedCompany, UserProfile
import logging

# Configure logging
logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def StudentsApplicationView(request):
    try:
        # Retrieve the authenticated user
        user = request.user
        
        # Get application ID from the request
        application_id = request.data.get('application')
        
        if not application_id:
            return Response({'detail': 'Application ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Retrieve the application object
        try:
            application = Application.objects.get(id=application_id)
        except Application.DoesNotExist:
            return Response({'detail': 'Application not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if the user has already applied
        existing_application = AppliedCompany.objects.filter(
            user_id=user, application_id=application
        ).exists()
        
        if existing_application:
            return Response({"detail": "Already applied."}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new application record
        AppliedCompany.objects.create(
            user_id=user,
            application_id=application
        )
        
        return Response({'message': 'Applied successfully.'}, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
