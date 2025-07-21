# 🏦 Addis Bank Job Portal

Welcome to the official repository of the **Job Portal for Addis Bank S.C.** – a professional recruitment system built with Django and React. The platform includes:

- A public-facing job portal for applicants
- A secure admin panel for HR staff
- A RESTful backend API for data management

---

## 🚀 Features

- 📝 Post and manage job vacancies
- 👨‍💼 User registration and login
- 📄 Submit and track job applications
- 🗂️ Admin dashboard to manage jobs and applicants
- 🔍 Filter, search, and view applicant details
- 🔍 Download Accepted Applicants Profile
- 📧 Email notifications (optional)
- 🔐 Secure authentication and authorization

---

## 🛠️ Tech Stack

| Layer       | Technology             |
|-------------|------------------------|
| Frontend    | React (Vite or CRA)    |
| Admin Panel | React (Vite or CRA)    |
| Backend     | Django + Django REST Framework |
| Database    | PostgreSQL / SQLite    |
| Others      | Axios, CSS3, HTML5     |

---

## 📂 Project Structure
```bash 
AddisBankJobPortal/
├── backend/ # Django backend
│ ├── manage.py
│ ├── jobportal/
│ └── ...
├── frontend/ # User-facing React app
│ ├── src/
│ └── ...
├── adminpanel/ # Admin dashboard React app
│ ├── src/
│ └── ...
├── README.md # This file
```


---

## ⚙️ Setup Instructions

### 📦 1. Clone the Repository

```bash
git clone https://github.com/yourusername/addis-bank-job-portal.git
cd addis-bank-job-portal

```
## 🐍 2. Setup Django Backend

```bash
cd backend
python -m venv env
source env/bin/activate   # On Windows: env\Scripts\activate
pip install -r requirements.txt

# Set up the database
python manage.py makemigrations
python manage.py migrate

# Create a superuser
python manage.py createsuperuser

# Run the backend server
python manage.py runserver
```
## 🌐 3. Setup Frontend (User Job Portal)
```bash
cd ../frontend
npm install
npm start
```
The user portal will run on: http://localhost:30
## 🛡️ 4. Setup Admin Panel (HR Dashboard)
```bash
cd ../adminpanel
npm install
npm start
```
The admin panel will run on: http://localhost:3001/ (or another available port)
## 📸 Screenshots
<p align="center"> <img src="screenshots/homepage.png" width="500" alt="Job Portal Home"/> <img src="screenshots/admin-dashboard.png" width="500" alt="Admin Panel"/> </p>

## 👤 Super Admin Access
After running createsuperuser, you can log in to the Django admin panel at:
```bash
http://127.0.0.1:8000/admin/
```
Use the credentials you created to access and manage jobs, users, and applications.

## 🛡️ Environment Variables
Set up environment variables in each frontend folder:

.env in frontend/ and adminpanel/:
```bash 
REACT_APP_API_BASE_URL=http://127.0.0.1:8000/api/
```
## 👥 Author
Daniel Semu - GitHub | LinkedIn | website


## 📄 License
This project is licensed under the MIT License.

## 📬 Contact
If you have questions or feedback, please reach out at danielsemu06@gmail.com or open an issue in the repository.

```bash

---

Let me know if:
- You want to add **deployment instructions**.
- You have a **live link** or **demo video**.
- You want to include **API documentation** (Swagger or Postman).

I can format that too!
```
