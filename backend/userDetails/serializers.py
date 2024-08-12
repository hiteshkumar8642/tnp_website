from rest_framework import serializers
from dashboard.models import UserDetails

class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = ['current_cgpa', 'backlogs', 'codeforces', 'codechef', 'leetcode', 'github', 'portfolio', 'website']