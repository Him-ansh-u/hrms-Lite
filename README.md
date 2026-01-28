# HRMS-Lite 🧑‍💼

A lightweight **Human Resource Management System (HRMS)** designed to manage basic HR operations such as employee management and internal workflows.  
This project showcases a clean **full-stack architecture** with separate frontend and backend layers.

---

## 📌 Project Overview

**HRMS-Lite** is a simple and scalable HRMS starter project.  
It demonstrates:

- Full-stack application structure  
- Clear separation of frontend (client) and backend (server)  
- Scalable codebase for adding advanced features  
- Practical real-world project architecture  

This project can be extended into a complete HR management platform.

---

## 🛠 Tech Stack Used

### Frontend
- React  
- TypeScript  
- HTML5  
- Tailwind CSS

### Backend
- Node.js  
- Express.js  
- MongoDB  

### Tools & Utilities
- npm  
- Git & GitHub  
- Environment variables (.env)  
- Client–Server modular structure  

---

## 📂 Project Structure

```
hrms-Lite/
│
├── client/        # Frontend (React)
├── server/        # Backend (Node.js + Express)
├── README.md
```

---

## 🚀 Steps to Run the Project Locally

### 1. Clone the repository
```bash
git clone https://github.com/Him-ansh-u/hrms-Lite.git
cd hrms-Lite
```

---

### 2. Install dependencies

Backend:
```bash
cd server
npm install
```

Frontend:
```bash
cd ../client
npm install
```

---

### 3. Setup Environment Variables

Create a `.env` file inside the `server` folder:

```env
PORT=8080
```

Add: MONGO_DB_URL

---

### 4. Run the backend server
```bash
cd server
npm run dev
```
or
```bash
npm start
```

---

### 5. Run the frontend
```bash
cd client
npm start
```

---

### 6. Open in browser
Visit:
```
http://localhost:3000
```

---

## ⚠️ Assumptions / Limitations

- This is a **lite version**, not a complete enterprise HRMS.
- Authentication and advanced role management si not implemented.
- Database integration can be extended further with caching and indexing.
- UI focuses on functionality more than heavy design.

---

## 📈 Future Improvements

- JWT authentication (Login / Signup)
- Role-based access (Admin / HR / Employee)
- Employee dashboard
- Leave management system
- Database integration (MongoDB / PostgreSQL)
- UI/UX improvements
- Deployment (Vercel + Render / Railway)

---

## 👨‍💻 Author

**Himanshu Kumar Sharma**  
Full Stack Developer (MERN / Next.js)  
📍 Noida, India  

GitHub: https://github.com/Him-ansh-u  

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
