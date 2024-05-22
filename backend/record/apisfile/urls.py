from django.urls import path
from . import views

urlpatterns = [
    path('signup',views.signup,name='signup_api'),
    path('login', views.login, name='login_api'),
    path('addcriminals', views.addCriminals, name='addcriminals'),
    path('listcriminals', views.list_all_criminals, name='listcriminals'),
    path('deleterecord/<int:pk>', views.delete_record, name='deleterecord'),
]