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
source env/bin/activate 
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
 get_random_secret_key() 
```

This will output a SECRET_KEY that you can use in next step.

Ctrl + C will stop pytho shell.


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

In [1]: from adopt_animal.models import State
In [2]: from accounts.models import State
In [3]: state = State.objects.create(state='NY')
In [4]: state.save()
In [5]: from accounts.models import User
In [6]: User(
    ...: username='your_username',
    ...: password='your_password',
    ...: state=state,
    ...: city='New York',
    ...: zipcode=11011,
    ...: is_active=True,
    ...: is_superuser=True,
    ...: is_staff=True
    ...: ).save()
In [7]: user = User.objects.get(id=1)
In [8]: user.save()
```
Now you have a super user
Try accessing http://localhost:8000/admin and see if you can log in.


13. Go to toy_project_frontend folder(Frontend) at terminal and do following command at terminal for installing library.
```bash
$ npm install
```

14. In the toy_project_frontend directory, you can run.
```bash
$ npm start
```

15. Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.