# TaskFlow Pro 📝

A full-stack task management app built with the MERN stack.

## 🔧 Technologies

- Frontend: React, React Router
- Backend: Node.js, Express
- Database: MongoDB (Atlas)
- Hosting: Vercel (frontend), Render (backend)

## 🚀 Features

- User signup/login (JWT-based)
- Dashboard overview
- Create and manage projects
- Add tasks within projects

### Flow of the project

-create an account on signup page
-login to your account with the created credentials
-after logging in You will be redirected to the dashboard page where We can see the details of the user and a link to project page where we can create the projects.
-On the projects page ,create a project, You will see your created project at the bottom of the page, clink on the project you created.
-you will be redirected to the tasks page related to that project, in this page we can create tasks related to the project and manage there status(To Do,In Progress,Completed).

## 🛠️ Setup Instructions

### Backend

### On Terminal Run

cd backend
npm install

# Create a .env file with your MongoDB URI and JWT_SECRET in your backend directory

# Add this into you .env file with your mongodb uri

MONGO_URI=Your_Mongo_URL
JWT_SECRET=supersecretkey
PORT=5000

### Then On terminal Run

npm start

#### Frontend

### On Terminal Run

cd frontend
npm install
npm start

✍️ Author
Talha Mohammed Khan

#### render backend deployed url

https://trial-of-craft-task-manager.onrender.com

### vercel frontend deployed url

https://trial-of-craft-task-manager.vercel.app/

### Deployment link

### click the below link to view the website

https://trial-of-craft-task-manager.vercel.app/
