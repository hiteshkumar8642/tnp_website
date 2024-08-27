from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from interface.models import Company
from interface.serializers import CompanySerializer
import logging

# Configure logging
logger = logging.getLogger(__name__)

@api_view(['GET'])
def CompanyListView(request):
    try:
        # Retrieve all company objects
        companies = Company.objects.all()

        # If no companies are found, return a 204 No Content response
        if not companies.exists():
            logger.info("No companies found.")
            return Response({'detail': 'No companies available.'}, status=status.HTTP_204_NO_CONTENT)

        # Serialize and return the company data
        serializer = CompanySerializer(companies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        # Log any unexpected exceptions
        logger.error(f"Unexpected error: {str(e)}", exc_info=True)
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
