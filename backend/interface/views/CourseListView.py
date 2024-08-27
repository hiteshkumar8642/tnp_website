from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from interface.models import Course
from interface.serializers import CourseSerializer
import logging

# Configure logging
logger = logging.getLogger(__name__)

@api_view(['GET'])
def CourseListView(request):
    try:
        # Retrieve all course objects
        courses = Course.objects.all()

        # If no courses are found, return a 204 No Content response
        if not courses.exists():
            return Response({'detail': 'No courses available.'}, status=status.HTTP_204_NO_CONTENT)

        # Serialize and return the course data
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        # Log any unexpected exceptions
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
