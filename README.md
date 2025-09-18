# 💰 Expense Management API

A robust and secure API for managing personal expenses, built with Node.js, Express.js, and TypeScript. This project provides a full suite of features, including user authentication, CRUD operations for expenses, and advanced filtering capabilities.

## 🚀 Features

* **User Authentication**: Secure user registration and login using JWT (JSON Web Tokens).
* **User Profile**: Retrieve user details via a protected route.
* **Expense Management**: Full CRUD (Create, Read, Update, Delete) functionality for expenses.
* **Expense Filtering**: Easily filter expenses by specific time periods: last week, last month, last quarter, and a custom date range.
* **Database**: Uses **Prisma ORM** with PostgreSQL (NeonDB) for a type-safe and efficient data layer.
* **Category Seeding**: Automatically seeds a predefined list of expense categories into the database upon server startup.

## 🛠️ Tech Stack

* **Backend**: Node.js, Express.js, TypeScript
* **Database**: PostgreSQL (NeonDB) with Prisma ORM
* **Authentication**: JWT
* **Package Manager**: Yarn

## 💻 Setup and Installation

### 1. Clone the repository:
```bash
git clone https://github.com/Dipit12/Expense-TrackerAPI-Backend-Assignment.git

```

### 2. Install dependencies:
```bash
yarn install
```

### 3. Environment Variables:
Create a `.env` file in the root directory and add the following variables. Replace the placeholder values with your actual database connection string and a strong JWT secret.
```env
PORT = "the port where you want to run the application"
DATABASE_URL="your_database_connection_string"
SALT_KEY="your_very_strong_secret"
```

### 4. Run Prisma Migrations:
To set up your database schema, run the following command:
```bash
npx prisma migrate dev
```

### 5. Start the server:
```bash
yarn dev
```

The API will now be running at `http://localhost:3000` (or your configured port).

## 🗺️ API Endpoints

All endpoints are prefixed with `/api/v1`.

### ➡️ Health Check

* **GET** `/api/v1/healthCheck`
   * **Description**: Checks if the API is up and running.
   * **Response**: `API is up and running`

### ➡️ Authentication

* **POST** `/api/v1/auth/signup`
   * **Description**: Registers a new user.
   * **Body**: `{ "userName":"user name","email": "user@example.com", "password": "password123" }`

* **POST** `/api/v1/auth/login`
   * **Description**: Authenticates a user and returns a JWT token.
   * **Body**: `{ "email": "user@example.com", "password": "password123" }`

* **GET** `/api/v1/auth/profile`
   * **Description**: Retrieves the authenticated user's profile. This is a protected route.
   * **Headers**: `Authorization: Bearer <JWT_token>`

### ➡️ Expense Management

All expense management routes require a **JWT token** in the `Authorization` header.

* **POST** `/api/v1/expenses`
   * **Description**: Adds a new expense for the authenticated user.
   * **Headers**: `Authorization: Bearer <JWT_token>`
   * **Body**: `{ "amount": 50.75, "description": "Coffee", "date": "2025-09-18", "categoryId": 1 }`

* **GET** `/api/v1/expenses`
   * **Description**: Retrieves all expenses for the authenticated user.
   * **Headers**: `Authorization: Bearer <JWT_token>`

* **GET** `/api/v1/expenses/:id`
   * **Description**: Retrieves a specific expense by ID.
   * **Headers**: `Authorization: Bearer <JWT_token>`
   * **URL Param**: `:id` (ID of the expense)

* **PUT** `/api/v1/expenses/:id`
   * **Description**: Updates an existing expense.
   * **Headers**: `Authorization: Bearer <JWT_token>`
   * **URL Param**: `:id` (ID of the expense)
   * **Body**: `{ "amount": 60.50 }` (partial update)

* **DELETE** `/api/v1/expenses/:id`
   * **Description**: Deletes an expense.
   * **Headers**: `Authorization: Bearer <JWT_token>`
   * **URL Param**: `:id` (ID of the expense)

### ➡️ Expense Filtering

These routes also require a **JWT token**.

* **GET** `/api/v1/expenses/filter/week`
   * **Description**: Retrieves all expenses from the last 7 days.
   * **Headers**: `Authorization: Bearer <JWT_token>`

* **GET** `/api/v1/expenses/filter/month`
   * **Description**: Retrieves all expenses from the last 30 days.
   * **Headers**: `Authorization: Bearer <JWT_token>`

* **GET** `/api/v1/expenses/filter/quarter`
   * **Description**: Retrieves all expenses from the last 90 days.
   * **Headers**: `Authorization: Bearer <JWT_token>`

* **GET** `/api/v1/expenses/filter/custom`
   * **Description**: Retrieves expenses within a custom date range.
   * **Headers**: `Authorization: Bearer <JWT_token>`
   * **Query Params**: `?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
   * **Example**: `/api/v1/expenses/filter/custom?startDate=2025-09-01&endDate=2025-09-30`