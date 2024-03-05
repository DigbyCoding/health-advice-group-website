from django.contrib import admin
from api.models import User, Profile

class UserAdmin(admin.ModelAdmin):
  list_display = ['username', 'email']
  
class ProfileAdmin(admin.ModelAdmin):
  # Editable fields through admin dashboard
  list_editable = ['verified']
  # Showed Fields through admin dashboard
  list_display = ['user', 'full_name', 'verified']
  
admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)