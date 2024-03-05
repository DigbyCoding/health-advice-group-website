from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save

class User(AbstractUser):
  username = models.CharField(max_length=100)
  email = models.EmailField(unique=True)
  
  ##
  # By default the username field will be username 
  # however I want the username field to be email 
  # to distinguish between users.
  #
  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['username']

  # Just a string representation for testing purposes.
  def __str__(self):
    return self.username
  
class Profile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  full_name = models.CharField(max_length=300)
  bio = models.CharField(max_length=300)
  image = models.ImageField(default="default.jpg", upload_to="user_images")
  verified = models.BooleanField(default=False)
  
  # Just a string representation for testing purposes.
  def __str__(self):
    return self.full_name


# Automatically generates a profile for the new user.
def create_user_profile(sender, instance, created, **kwargs):
  if created:
    Profile.objects.create(user=instance)
    
def save_user_profile(sender, instance, **kwargs):
  instance.profile.save()
  
post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)