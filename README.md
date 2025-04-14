# Secure Task Management System (TMS)

This is a web application for managing tasks with secure login, built using **React (frontend)**, **Node.js and Express (backend)**, and **MongoDB (database)**.

---

## 🔐 Features

1. **User Authentication**  
   - Register and Login securely  
   - Passwords are hashed (secure)  
   - JWT token for session  
   - Admin and regular users

2. **Task Management (CRUD)**  
   - Create tasks (with title, description, due date, priority)  
   - View task list  
   - Edit and Delete tasks  
   - Mark as completed  

3. **Search, Filter, Sort**  
   - Filter tasks by priority/date  
   - Search by task title

---

## ⚙️ How to Run the Project Locally

### Backend (Server)

1. Open terminal and go to the backend folder:

2. Install backend packages:
   npm install

4. Create a file called `.env` in `backend` and add this:
PORT=5000 MONGO_URI=your_mongodb_connection_string
 JWT_SECRET=your_secret_key

5. Start the backend server:
npm run dev


---

### Frontend (React App)

1. Open terminal and go to the frontend folder:
cd frontend

3. Install frontend packages:
   npm install
