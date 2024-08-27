from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from interface.models import UserProfile, CallHistory
from interface.serializers import CallHistorySerializer
import logging

# Configure logging
logger = logging.getLogger(__name__)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def HRCallHistoryView(request):
    try:
        # Retrieve the authenticated user
        user = request.user

        # Retrieve the user's branch from UserDetails model
        branch = user.userdetails.college_branch

        # Retrieve the user's role from UserProfile model
        try:
            user_profile = UserProfile.objects.get(user=user)
            role = user_profile.role
        except UserProfile.DoesNotExist:
            logger.warning(f"UserProfile not found for user: {user.id}")
            return Response({'detail': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)

        # Check if the user's role is either 3 or 4
        if role in [3, 4]:
            # Retrieve call history for the user's branch
            callhistory = CallHistory.objects.filter(college_branch=branch)

            if not callhistory.exists():
                logger.info(f"No call history found for branch: {branch}")
                return Response({'detail': 'No call history found.'}, status=status.HTTP_204_NO_CONTENT)

            # Serialize the call history data
            callhistory_serializer = CallHistorySerializer(callhistory, many=True)
            logger.info(f"Call history retrieved and serialized for user: {user.id}")

            # Return the serialized data with a 200 OK status
            return Response(callhistory_serializer.data, status=status.HTTP_200_OK)
        else:
            logger.warning(f"Permission denied for user: {user.id} with role: {role}")
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

    except DatabaseError as db_err:
        logger.error(f"Database error occurred: {str(db_err)}")
        return Response({'detail': 'Database error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    except Exception as e:
        logger.error(f"Unexpected error occurred: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.'}, status=status.HTTP_400_BAD_REQUEST)
