# Country Explorer 🌍

A full-stack web application for exploring country data with secure user authentication and API integration.

![App Screenshot](/screenshots/app-preview.png) *(Replace with your actual screenshot)*

## Features

- **User Authentication**
  - Secure JWT-based login/logout
  - Role-based access control (User/Admin)
  - API key management

- **Country Data**
  - Browse comprehensive country information
  - Search and filter functionality
  - Responsive card displays

- **Admin Dashboard**
  - User management
  - API usage statistics
  - System monitoring

## Tech Stack

**Frontend:**
- React 18
- Material-UI (MUI)
- React Router 6
- Axios
- Framer Motion (animations)

**Backend:**
- Node.js
- Express
- SQLite (with Knex.js optional)
- JWT Authentication
- REST API

## Prerequisites

- Node.js (v16+ recommended)
- npm
- Git

## Installation

### 1. Clone the repository
```bash
git clone [https://github.com/Michila0/server-side-assignment.git]
cd cw1
```
### 2. Backend Setup
```bash
cd ../backend
npm install
```
Create a `.env` file:
```env
JWT_SECRET=your_jwt_secret_key
PORT=5000
```
### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
## Running the Application
### Start Backend Server
```bash
cd backend
npm run start
```
### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
### The application will be available at:
- Frontend: http://localhost:5176

- Backend API: http://localhost:5001

## Project Structure
```
cw1/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middlewares/    # Express middlewares
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions
│   │   ├── app.js          # Main backend application
│   │   └── dao/initDB.js       # Database initialization
│   ├── .env.example        # Environment variables template
│   └── package.json
│
├── frontend/
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # React context providers
│   │   ├── pages/          # Page components
│   │   ├── styles/         # Global styles
│   │   ├── App.js          # Main React component
│   │   └── index.js        # Entry point
│   ├── .env.example        # Environment variables template
│   └── package.json
│
├── .gitignore
└── README.md               # This file
```
## API Endpoints

| Endpoint             | Method | Description                   | Auth Required    |
|----------------------|--------|-------------------------------|------------------|
| /api/register   | POST   | Register new user             | No               |
| /api/login      | POST   | User login                    | No               |
| /api/auth/logout     | POST   | User logout                   | Yes              |
| /api/auth/me         | GET    | Get current user profile      | Yes              |
| /api/countries       | GET    | Get all countries             | Yes              |
| /api/admin/users     | GET    | Get all users (Admin only)    | Yes (Admin)      |
| /api/admin/role     | PUT    | Get all update users (Admin only)    | Yes (Admin)      |
| /api/admin/delete     | DELETE    | Get all delete users (Admin only)    | Yes (Admin)      |

## Enviroment Variables
### Backend(.env)
- `JWT_SECRET`: Secret key for JWT signing
- `PORT`: Server port
