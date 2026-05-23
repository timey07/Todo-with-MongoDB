# MongoDB Todo Backend

A simple Todo Backend API built with MongoDB, Express, and Node.js to learn backend development fundamentals and MongoDB concepts.

## Features

* User Signup & Signin
* JWT Authentication
* Create & Fetch Todos
* Mark Todos as Completed
* Password Hashing using bcrypt
* Input Validation using Zod
* MongoDB Relationships using ObjectId & ref
* Error Handling with try-catch
* Due Dates & Automatic Timestamps

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Zod

---

## Learning Concepts Implemented

### Authentication

* JWT token generation
* Protected routes using middleware

### Security Improvements

* Password hashing with bcrypt
* Invalid token handling
* Error catching to prevent server crashes

### MongoDB Concepts

* Collections & Schemas
* ObjectId relationships
* `populate()` for referenced documents
* Automatic timestamps

### Validation

* Input validation using Zod
* Email & password validation
* Request body validation for todos

---

## API Endpoints

### Auth Routes

#### Signup

```http id="59vw0p"
POST /signup
```

#### Signin

```http id="gb9vhq"
POST /signin
```

---

### Todo Routes

#### Create Todo

```http id="f8trsg"
POST /todo
```

#### Get Todos

```http id="b3pv8t"
GET /todos
```

#### Mark Todo as Done

```http id="2szf99"
POST /doTodo
```

---

## Environment Variables

Create a `.env` file:

```env id="6yl2u2"
DB_LINK=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## Installation

```bash id="sljlwm"
npm install
```

Run the server:

```bash id="jlwmow"
node index.js
```

---

## Possible Improvements

* Delete Todo Endpoint
* Update Todo Endpoint
* Pagination
* Refresh Tokens
* Rate Limiting
* Better Folder Structure

---

## Purpose

This project was built to practice:

* MongoDB & Mongoose
* Backend API development
* Authentication & Authorization
* Validation & Error Handling
* Secure coding practices
