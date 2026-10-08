# CAPSTONE PROJECT
User -[Authetication]- Admin

User 
-> create support task
-> would be able to see all support task but himself 
--> Admin will be able to see all
-> User will be able to update their task only
-> Similar for deletion

Admin
-> File upload feature some banners

Authentication
-> Email and password login
-> google login


Concepts
-> JWT
-> Middleware
-> express

urlencoder -> parses incomming request with URL encoded payload - form submission

CORS 


Tables
Users
    - id,email,pass,google id,role[user/admin]
Support task
    - id, item, status,user_id
Banners
    -id,cloudnary unique id(CUD),



PG package for postgreSQL


Resgiter -> Email, password, continue with google

Folder structure
-> Repository -> DB related logic
-> Service -> Business logic
-> Routes -> actual routes based on feature
-> Root Route FIle -> all routes combined 
-> Entry File -> Root Route file is used here