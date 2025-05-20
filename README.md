# 📝 Blog Editor Web App

A full-stack blogging platform where users can:
- Register/login securely
- Create and manage blog drafts and published posts
- View personal profile information
- See all their blogs grouped by status
- Delete blogs (optional)

---

## 🚀 Features

- 🔐 JWT-based Authentication (Signup/Login)
- 🧑‍💼 Profile page showing name, email, and blogs
- ✍️ Blog Editor with:
  - Auto-save drafts
  - Publish blogs
  - Optional edit/delete functionality
- 📄 View all blogs grouped as Published and Drafts
- 📱 Responsive UI with Tailwind CSS

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Tailwind CSS

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT (JSON Web Tokens)
- bcryptjs

---

## 🗂️ Folder Structure

blog-editor/
├── client/ # React frontend
│ └── src/
│ ├── pages/ # Login, Signup, Profile, Editor
│ ├── components/ # Header, PrivateRoute
│ └── App.jsx
├── server/ # Express backend
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ └── index.js