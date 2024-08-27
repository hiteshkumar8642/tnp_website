from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

class ApiTests(APITestCase):
    def test_company_contacts(self):
        url = reverse('company_contacts')  # Adjust the reverse name as needed
        response = self.client.get('/dashboard/api/company_contacts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_hr_contacts(self):
        url = reverse('hr_contacts')  # Adjust the reverse name as needed
        response = self.client.get('/dashboard/api/hr_contacts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_hr_list(self):
        url = reverse('hr_list')  # Adjust the reverse name as needed
        response = self.client.get('/dashboard/api/hr_list/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_common_company_form(self):
        url = reverse('common_company_form')  # Adjust the reverse name as needed
        response = self.client.post('/dashboard/api/common_company_form/', data={})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_my_hr_list(self):
        url = reverse('my_hr_list')  # Adjust the reverse name as needed
        response = self.client.get('/dashboard/api/my_hr_list/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_announcement(self):
        url = reverse('announcement')  # Adjust the reverse name as needed
        response = self.client.get('/dashboard/api/announcement/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_application(self):
        url = reverse('application')  # Adjust the reverse name as needed
        response = self.client.post('/dashboard/api/application/', data={})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
