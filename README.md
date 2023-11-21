# Getting Started with Retro Toy WebApp

## Introduction

Please download Node v16.15.0 on your PC (If you have it, please skip it).
https://nodejs.org/en/download/

## Usage

1. Open your terminal and Go to your directory.
```bash
$ cd your_directory_name
```

2. Clone the project with the following command.
```bash
$ git clone https://github.com/toma1031/toy_project_app_production/
```

3. Install to switch to MySQL(If MySQL was installed already, you can skip this section)
First, let's install MySQL. It can be installed by running the command below.
```bash
brew install mysql
```

4. Start MySQL with the following command. Once it starts up, check if you can connect.
```bash
mysql.server start
Starting MySQL
.SUCCESS!

$ mysql -u root
...
mysql>
```

When you want to stop MySQL sever, you can use the following command.
```bash
mysql.server stop
```

5. Now create the database that will be used in this project. 
Run the following command while connected to mysql.
```bash
mysql> create database toy_project;
```

After that,
Exit MySql with the command below.
```bash
mysql> quit;
```

6. Go to toy_project folder(Backend) at terminal and let's create a virtual environment (Assuming it is named myenv),
```bash
python3 -m venv myenv
```

After that, you should do activate the virtual environment.
```bash
source myenv/bin/activate 
```

You can deactivate the virtual environment with the following command(Only you want to down the backend)
```bash
deactivate
```

7. Do Install packages.
```bash
pip install -r requirements.txt
```

8. Generate SECRET_KEY in python shell.
```bash
python
```

and then,

```bash
from django.core.management.utils import get_random_secret_key
get_random_secret_key() 
```

This will output a SECRET_KEY that you can use in next step.

Ctrl + C will stop python shell.

9. Creat .env file in toy_project folder and you write this
```
DEBUG=TRUE
SECRET_KEY=Put_SECRET_KEY_here

DATABASESPASSWORD=
EMAIL=
PASSWORD=
```

10, Let's do migration with the following command.
```bash
python manage.py migrate
python manage.py makemigrations
```

11.Check if the site starts up with Runserver.
```bash
python manage.py runserver
```
After that,
If you can see the project at http://localhost:8000/,
backend side is ready for use.

12. Create super user
Create a superuser using Shell commands.
```bash
python manage.py shell

In [1]: from accounts.models import State
In [2]: state = State.objects.create(state='NY')
In [3]: state.save()
In [4]: from accounts.models import User
In [5]: User.objects.create_user(username='admin', email='admin@gmail.com', password='testpass')
In [5]: user.city = 'New York'
In [6]: user.zipcode = 11011
In [7]: user.is_active = True
In [8]: user.is_superuser = True
In [9]: user.is_staff = True
In [10]: user.save()
```
Now you have a superuser
Try accessing http://localhost:8000/admin and see if you can log in.

13. Login to http://localhost:8000/admin and make Condition Tag like the following.

"Brand New", id: 1

"Mint", id: 2

"Excellent", id: 3

"Very Good", id: 4

"Good", id: 5

"Fair", id: 6

"Poor", id: 7

"Non Functioning", id: 8


14. Go to toy_project_frontend folder(Frontend) at terminal and do following command at terminal for installing library.
```bash
$ npm install
```

15. In the toy_project_frontend directory, you can run.
```bash
$ npm start
```

16. Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.