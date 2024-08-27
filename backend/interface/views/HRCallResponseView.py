from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from interface.models import UserProfile, CallHistory, HRContact
from interface.serializers import CallHistorySerializer
import logging

# Configure logging
logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def HRCallResponseView(request):
    try:
        # Retrieve the authenticated user
        user = request.user

        # Retrieve the user's role from UserProfile model
        user_profile = UserProfile.objects.get(user=user)
        role = user_profile.role
        
        if role in [3, 4]:
            # Retrieve the user's branch from UserDetails model
            college_branch = user.userdetails.college_branch
            hr_id = request.data.get('hr_id')
            colour = request.data.get('colour')
            comment = request.data.get('comment')

            # Check if HRContact with the given ID exists
            hr_contact = get_object_or_404(HRContact, id=hr_id)

            # Create and save the CallHistory record
            call_history = CallHistory(
                student_id=user,
                hr_id=hr_contact,
                comment=comment,
                colour=colour,
                college_branch=college_branch
            )
            call_history.save()

            # Retrieve and serialize the CallHistory records for the user and hr_id
            call_histories = CallHistory.objects.filter(student_id=user, hr_id=hr_contact)
            serializer = CallHistorySerializer(call_histories, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        
        # If the role is not 3 or 4, return a 403 Forbidden response
        return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

    except UserProfile.DoesNotExist:
        # Handle the case where the user's profile is not found
        logger.error("User profile not found for user with ID: {}".format(user.id))
        return Response({'detail': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
    
    except HRContact.DoesNotExist:
        # Handle the case where the HRContact object is not found
        logger.error(f"HRContact with ID {hr_id} not found.")
        return Response({'detail': 'HRContact not found'}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        # Handle any other exceptions and return a 500 Internal Server Error response
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
