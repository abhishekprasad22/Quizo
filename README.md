# Quizo

## Project Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/abhishekprasad22/quizo.git
   cd quizo
   ```
2. Make a Postgres database using the queries in the file location:
    ```bash
   server/src/db/schema.sql
   ```

3. Navigate to the client directory and install dependencies:
   ```bash
   cd client
   npm install
   ```
4. Start client frontend server:
   ```bash
   npm run dev
   ```

5. Navigate to the server directory and install dependencies:
   ```bash
   cd server
   npm install
   ```

6. Start the backend server:
   ```bash
   npm run dev
   ```

7. Open your browser and navigate to `http://localhost:3000`.

## API Documentation

### Endpoints

#### Login
- **URL:** `/api/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "username": "your-username",
    "password": "your-password"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "token": "your-auth-token"
  }
  ```

#### Check Authentication
- **URL:** `/api/checkAuth`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer your-auth-token"
  }
  ```
- **Response:**
  ```json
  {
    "isAuthenticated": true
  }
  ```

#### Dashboard
- **URL:** `/api/dashboard`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer your-auth-token"
  }
  ```
- **Response:**
  ```json
  {
    "data": {
      // ...dashboard data...
    }
  }
  ```