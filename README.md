# Gaming Login Portal

A full stack gaming authentication platform built with modern web technologies and a SQL database backend. The application provides secure user registration, login, session management, and user profile functionality for gaming platforms.

## Features

### Authentication

* User Registration
* Secure Login System
* Password Hashing and Encryption
* Session Management
* Logout Functionality
* Input Validation
* Authentication Error Handling

### User Management

* User Profiles
* Account Information Storage
* Profile Updates
* Unique Username and Email Validation

### Database

* SQL Database Integration
* User Data Storage
* Secure Credential Management
* Relational Data Structure
* Database Constraints and Validation

### Security

* Password Hashing
* SQL Injection Protection
* Input Sanitization
* Secure Authentication Workflow
* Protected Routes

## Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MySQL / SQL Database

### Additional Tools

* Git
* GitHub
* Environment Variables (.env)

## Project Structure

```text
gaming-login/
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── css/
│   └── js/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
├── database/
│   └── schema.sql
│
├── .env
├── package.json
└── README.md
```

## Database Schema

### Users Table

| Column     | Type         | Description           |
| ---------- | ------------ | --------------------- |
| id         | INT          | Primary Key           |
| username   | VARCHAR(50)  | Unique Username       |
| email      | VARCHAR(100) | Unique Email          |
| password   | VARCHAR(255) | Hashed Password       |
| created_at | TIMESTAMP    | Account Creation Date |

## Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd gaming-login
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=gaming_login

SESSION_SECRET=your_secret_key
```

### 4. Create Database

Create a SQL database and import the schema file.

### 5. Start Server

```bash
npm start
```

Application will run on:

```text
http://localhost:5000
```

## API Endpoints

### Authentication

| Method | Endpoint  | Description       |
| ------ | --------- | ----------------- |
| POST   | /register | Register New User |
| POST   | /login    | User Login        |
| POST   | /logout   | User Logout       |

### User

| Method | Endpoint | Description         |
| ------ | -------- | ------------------- |
| GET    | /profile | Get User Profile    |
| PUT    | /profile | Update User Profile |

## Authentication Flow

1. User submits registration form.
2. Password is hashed before storage.
3. User credentials are saved in SQL database.
4. User logs in with email/username and password.
5. Server validates credentials.
6. Session or token is generated.
7. Protected resources become accessible.

## Future Improvements

* JWT Authentication
* Email Verification
* Password Reset
* Two Factor Authentication (2FA)
* Social Login Integration
* User Roles and Permissions
* Gaming Statistics Dashboard
* Leaderboards
* Achievement System

## Learning Objectives

This project demonstrates:

* Full Stack Development
* REST API Design
* SQL Database Integration
* Authentication and Authorization
* Backend Architecture
* Database Relationships
* Security Best Practices
* Client-Server Communication

## License

This project is intended for educational and portfolio purposes.
