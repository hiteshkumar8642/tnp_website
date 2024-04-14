# dashboard/models.py
from django.db import models
from django.contrib.auth.models import User  

class Course(models.Model):
    DEGREE_CHOICES = [
        ('B.Tech', 'Bachelor of Technology'),
        ('B.E', 'Bachelor of Engineering'),
        ('M.Tech', 'Master of Technology'),
        ('M.E', 'Master of Engineering'),
        ('BCA', 'Bachelor of Computer Applications'),
        ('MCA', 'Master of Computer Applications'),
        ('B.Sc', 'Bachelor of Science'),
        ('M.Sc', 'Master of Science'),
        
    ]

    degree = models.CharField(max_length=20, choices=DEGREE_CHOICES)
    specialization = models.CharField(max_length=100)
    course_duration = models.IntegerField()  # Duration in years

    def __str__(self):
        return f"{self.degree} - {self.specialization}"

class College(models.Model):
    name = models.CharField(max_length=100)
    subdomain = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class CollegeCourse(models.Model):
    college = models.ForeignKey(College, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.college.name} - {self.course}"

class Company(models.Model):
    name = models.CharField(max_length=100)
    allowed_courses = models.ManyToManyField(Course, blank=True)
    is_intern = models.BooleanField(null=True, blank=True)
    is_ppo = models.BooleanField(null=True, blank=True)
    is_fte = models.BooleanField(null=True, blank=True)
    poc = models.ForeignKey(CollegeCourse, null=True, blank=True, on_delete=models.SET_NULL, related_name='poc_company')
    general_ctc = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    college_ctc = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    college_branch = models.ForeignKey(CollegeCourse, null=True, blank=True, on_delete=models.CASCADE, related_name='companies')
    time_of_visit = models.DateField(null=True, blank=True)
    history = models.JSONField(null=True, blank=True)

    def __str__(self):
        return self.name


# Company_Contact DataBase  
    
class Shared_Company(models.Model):
    company_name = models.CharField(max_length=50)
    company_email = models.CharField(max_length=90)
    company_contact = models.CharField(max_length=20,default="")
    ctc = models.CharField(max_length=15)
    college_visited = models.CharField(max_length=50)
    type = models.CharField(max_length=100)
    is_company = models.CharField(max_length=10)
    location = models.CharField(max_length=30)
    college_branch = models.ForeignKey(CollegeCourse, null=True, blank=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.company_name
    

# HR_Contact DataBase 
    
class Shared_HR_contact(models.Model):
    name = models.CharField(max_length=30)
    company_name = models.CharField(max_length=50)
    email =  models.CharField(max_length=50)
    contact_number = models.CharField(max_length=20)
    linkedin_id = models.CharField(max_length=70)
    college_branch = models.ForeignKey(CollegeCourse, null=True, blank=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class HRContact(models.Model):
    name = models.CharField(max_length=100)
    linkedin = models.URLField(null=True, blank=True)
    mobile = models.CharField(max_length=15, null=True, blank=True)
    mail_id = models.EmailField(null=True, blank=True)
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE)
    gender = models.CharField(max_length=10, null=True, blank=True)
    date_of_contact = models.DateField(null=True, blank=True)
    college_branch = models.ForeignKey(CollegeCourse, null=True, blank=True, on_delete=models.CASCADE)
    assigned = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='assigned_hr')
    reassigned = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='reassigned_hr')

    def __str__(self):
        return f"{self.name} - {self.company_id.name}"

class CallHistory(models.Model):
    hr_id = models.ForeignKey(HRContact, on_delete=models.CASCADE)
    student_id = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField(null=True, blank=True)
    COLOR_CHOICES = [
        ('red', 'Red'),
        ('blue', 'Blue'),
        ('yellow', 'Yellow'),
        ('green', 'Green'),
    ]
    colour = models.CharField(max_length=10, choices=COLOR_CHOICES, null=True, blank=True)
    college_branch = models.ForeignKey(CollegeCourse, null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return f"Call History - {self.hr_id.name} - {self.student_id.username}"

class UserDetails(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    resume = models.FileField(upload_to='user_resumes/')
    photo = models.ImageField(upload_to='user_photos/')
    backlogs = models.IntegerField()
    graduation_marksheet = models.FileField(upload_to='user_marksheets/')
    graduation_cgpa = models.DecimalField(max_digits=4, decimal_places=2)
    twelfth_marksheet = models.FileField(upload_to='user_marksheets/')
    twelfth_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    tenth_marksheet = models.FileField(upload_to='user_marksheets/')
    tenth_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    current_cgpa = models.DecimalField(max_digits=4, decimal_places=2)
    other_website_link = models.TextField(null=True,blank=True)
    leetcode_profile = models.URLField(null=True,blank=True)
    codechef_profile = models.URLField(null=True,blank=True)
    codeforces_profile = models.URLField(null=True,blank=True)
    github_profile = models.URLField(null=True,blank=True)
    portfolio_link = models.URLField(null=True,blank=True)
    linkedin_profile = models.URLField(null=True,blank=True)
    department = models.CharField(max_length=100)
    gap_after_twelfth = models.IntegerField(default=0)
    gap_after_graduation = models.IntegerField(default=0)
    mobile = models.CharField(max_length=15)
    is_placed = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    college_branch = models.ForeignKey(CollegeCourse, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username} - {self.college_branch.college.name} - {self.college_branch.course}"

class Application(models.Model):
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE)
    predicted_visit_date = models.DateField(null=True, blank=True)
    twelfth_marks_eligibility = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    tenth_marks_eligibility = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    allowed_branch = models.ManyToManyField(Course, blank=True)
    college_branch = models.ForeignKey(CollegeCourse, null=True, blank=True, on_delete=models.CASCADE)
    job_description = models.TextField(null=True, blank=True)
    is_spp = models.BooleanField(null=True, blank=True)
    is_sip = models.BooleanField(null=True, blank=True)
    twelfth_gap = models.IntegerField(null=True, blank=True)
    graduation_gap = models.IntegerField(null=True, blank=True)
    backlogs = models.IntegerField(null=True, blank=True)
    graduation_marks = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    current_cgpa = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f"Application - {self.company_id.name} - {self.college_branch}"
    
class AppliedCompany(models.Model):
    application_id = models.ForeignKey(Application, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    
    STATUS_CHOICES = [
        ('applied', 'Applied'),
        ('rejected', 'Rejected'),
        ('selected', 'Selected'),

    ]
    is_selected = models.CharField(max_length=10, choices=STATUS_CHOICES, default='applied')
    comment = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Applied Company - {self.application_id.company_id.name} - {self.user_id.username}"

class UserProfile(models.Model):
    ROLE_CHOICES = [
        (1, "Student"),
        (2, "Helper"),
        (3, "Coordinator"),
        (4, "Officer"),
        (5, "Admin 1"),
        (6, "Admin 2"),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES)

class Announcement(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    job_description = models.TextField(null=True, blank=True)    
    
