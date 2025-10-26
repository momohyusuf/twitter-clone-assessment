# Twitter Clone - Full Stack Application

A modern, full-stack Twitter clone built with React, TypeScript, Node.js, Express, Prisma, and PostgreSQL. This application allows users to create tweets, share them with specific users, and view their personalized timeline.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## ✨ Features

### Authentication

- ✅ User registration with email and username validation
- ✅ Login with email or username
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Welcome email on registration (Resend)

### Tweet Management

- ✅ Create tweets (max 280 characters)
- ✅ Share tweets with specific users (max 10)
- ✅ View personal timeline (own tweets + shared tweets)
- ✅ View feed of tweets posted by user
- ✅ Delete own tweets
- ✅ Email notifications when tweets are shared

### User Features

- ✅ View other users for sharing
- ✅ Paginated user lists
- ✅ User profile information

### UI/UX

- ✅ Infinite scroll for timeline and feed
- ✅ Responsive design with Tailwind CSS
- ✅ Loading skeletons
- ✅ Form validation with Zod
- ✅ Toast notifications
- ✅ Protected routes

## 🛠 Tech Stack

### Frontend

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **SWR** - Data fetching
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend

- **Node.js** - Runtime
- **Express 5** - Web framework
- **TypeScript** - Type safety
- **Prisma** - ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Express Validator** - Input validation
- **Resend** - Email service
- **Morgan** - Request logging
- **CORS** - Cross-origin resource sharing

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.x ([Download](https://nodejs.org/))
- **npm** >= 9.x or **yarn** >= 1.22.x
- **PostgreSQL** >= 14.x ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/downloads))

Optional but recommended:

- **pgAdmin** or **TablePlus** - Database GUI
- **Postman** or **Insomnia** - API testing

## 📁 Project Structure

```
twitter-clone/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── app-screens/     # Page components
│   │   │   ├── auth/        # Login, Register pages
│   │   │   ├── timeline/    # Timeline, Feed components
│   │   │   └── Home.tsx     # Landing page
│   │   ├── components/      # Reusable UI components
│   │   │   ├── ui/          # Shadcn UI components
│   │   │   ├── Navbar.tsx
│   │   │   └── UserAccount.tsx
│   │   ├── services/        # API service layer
│   │   │   ├── api.ts       # Axios instance
│   │   │   ├── authService.ts
│   │   │   ├── tweetServices.ts
│   │   │   └── usersServices.ts
│   │   ├── redux/           # Redux store setup
│   │   │   ├── app/
│   │   │   └── feature/
│   │   ├── layout/          # Layout components
│   │   ├── lib/             # Utility functions
│   │   ├── app-routes.tsx   # Route definitions
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env                 # Environment variables
│   ├── package.json
│   └── vite.config.ts
│
└── server/                   # Node.js backend application
    ├── src/
    │   ├── controllers/      # Request handlers
    │   │   ├── auth-controller.ts
    │   │   ├── tweet-controller.ts
    │   │   └── user-controller.ts
    │   ├── services/         # Business logic
    │   │   ├── auth-services.ts
    │   │   ├── tweet-services.ts
    │   │   ├── user-services.ts
    │   │   └── email-service.ts
    │   ├── routes/           # API routes
    │   │   ├── auth-routes.ts
    │   │   ├── tweet-routes.ts
    │   │   ├── users-routes.ts
    │   │   └── routes.ts
    │   ├── middlewares/      # Express middlewares
    │   │   ├── auth-middleware.ts
    │   │   ├── error-handler.ts
    │   │   └── payload-validation.ts
    │   ├── utils/            # Helper functions
    │   ├── generated/        # Prisma generated client
    │   └── index.ts          # App entry point
    ├── prisma/
    │   ├── schema.prisma     # Database schema
    │   └── migrations/       # Database migrations
    ├── .env                  # Environment variables
    ├── package.json
    └── tsconfig.json
```

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/momohyusuf/twitter-clone-assessment.git
cd twitter-clone
```

### 2. Backend Setup

#### Navigate to server directory

```bash
cd server
```

#### Install dependencies

```bash
npm install
```

#### Configure environment variables

```bash
cp env.sample .env
```

Edit the `.env` file with your configuration:

```env
# Database connection string
DATABASE_URL="postgresql://username:password@localhost:5432/twitter_clone?schema=public"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# Email Service (Resend)
RESEND_API_KEY="re_your_resend_api_key_here"
RESEND_FROM_EMAIL="onboarding@resend.dev"

# App Configuration
APP_URL="http://localhost:5173"
PORT=3002
NODE_ENV="development"
```

#### Set up the database

**Option A: Using local PostgreSQL**

1. Create a new PostgreSQL database:

```bash
psql -U postgres
CREATE DATABASE twitter_clone;
\q
```

2. Update `DATABASE_URL` in `.env`:

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/twitter_clone?schema=public"
```

**Option B: Using cloud PostgreSQL (Recommended for testing)**

Use services like:

- [Supabase](https://supabase.com/) (Free tier available)
- [Railway](https://railway.app/) (Free tier available)
- [Neon](https://neon.tech/) (Free tier available)

#### Run Prisma migrations

```bash
npx prisma migrate dev --name init
```

This will:

- Create the database tables
- Generate the Prisma Client
- Seed any initial data (if configured)

#### Generate Prisma Client

```bash
npx prisma generate
```

#### Verify database setup

```bash
npx prisma studio
```

This opens a GUI to view your database at `http://localhost:5555`

### 3. Frontend Setup

#### Navigate to frontend directory

```bash
cd ../frontend
```

#### Install dependencies

```bash
npm install
```

#### Configure environment variables

```bash
cp .env.example .env
```

Edit the `.env` file:

```env
VITE_API_URL=http://localhost:3002/api/v1
```

## 🏃 Running the Application

### Development Mode

#### 1. Start the Backend Server

Open a terminal in the `server` directory:

```bash
cd server
npm run dev
```

The server will start on `http://localhost:3002`

You should see:

```
Server is running on port 3002
```

#### 2. Start the Frontend Development Server

Open a **new terminal** in the `frontend` directory:

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

You should see:

```
  VITE v7.1.7  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

#### 3. Access the Application

Open your browser and navigate to:

```
http://localhost:5173
```

### Production Build

#### Build Backend

```bash
cd server
npm run build
npm start
```

#### Build Frontend

```bash
cd frontend
npm run build
npm run preview
```

## 📚 API Documentation

### Base URL

```
http://localhost:3002/api/v1
```

### Authentication Endpoints

#### Register User

```http
POST /auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "status": 201,
  "message": "User registered successfully"
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Or login with username:

```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Response:**

```json
{
  "status": 200,
  "message": "Login successful",
  "data": {
    "user": {
      "userId": "uuid-here",
      "username": "johndoe"
    },
    "token": "jwt-token-here"
  }
}
```

### Tweet Endpoints

All tweet endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer your-jwt-token-here
```

#### Create Tweet

```http
POST /tweets
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Hello, world!",
  "recipientsIds": ["user-uuid-1", "user-uuid-2"]
}
```

**Response:**

```json
{
  "status": 201,
  "message": "Tweet created successfully",
  "data": {
    "tweetId": "uuid-here",
    "content": "Hello, world!",
    "authorId": "author-uuid",
    "createdAt": "2025-10-26T10:00:00.000Z",
    "author": {
      "username": "johndoe"
    },
    "_count": {
      "sharedWith": 2
    }
  }
}
```

#### Get Timeline (Own + Shared Tweets)

```http
GET /tweets?page=1&limit=20
Authorization: Bearer <token>
```

**Response:**

```json
{
  "status": 200,
  "message": "All tweets fetched successfully",
  "data": [
    {
      "tweetId": "uuid",
      "content": "Tweet content",
      "authorId": "uuid",
      "createdAt": "2025-10-26T10:00:00.000Z",
      "author": {
        "username": "johndoe"
      },
      "images": [],
      "_count": {
        "sharedWith": 0
      }
    }
  ],
  "metaData": {
    "total": 50,
    "currentPage": 1,
    "totalPages": 3,
    "hasMore": true
  }
}
```

#### Get User Feed (Only Own Tweets)

```http
GET /tweets/feed?page=1&limit=20
Authorization: Bearer <token>
```

#### Delete Tweet

```http
DELETE /tweets/:tweetId
Authorization: Bearer <token>
```

### User Endpoints

#### Get Other Users (for sharing)

```http
GET /users/others?page=1&limit=10
Authorization: Bearer <token>
```

**Response:**

```json
{
  "status": 200,
  "message": "Other users fetched successfully",
  "data": [
    {
      "userId": "uuid",
      "username": "janedoe",
      "email": "jane@example.com"
    }
  ],
  "metaData": {
    "total": 100,
    "currentPage": 1,
    "totalPages": 10,
    "hasMore": true
  }
}
```

## 🔐 Environment Variables

### Backend (.env)

| Variable            | Description                  | Example                                    | Required |
| ------------------- | ---------------------------- | ------------------------------------------ | -------- |
| `DATABASE_URL`      | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` | ✅ Yes   |
| `JWT_SECRET`        | Secret key for JWT signing   | `my-super-secret-key`                      | ✅ Yes   |
| `JWT_EXPIRES_IN`    | JWT token expiration         | `7d`                                       | ✅ Yes   |
| `RESEND_API_KEY`    | Resend email service API key | `re_xxxxx`                                 | ❌ No    |
| `RESEND_FROM_EMAIL` | Email sender address         | `onboarding@resend.dev`                    | ❌ No    |
| `APP_URL`           | Frontend application URL     | `http://localhost:5173`                    | ❌ No    |
| `PORT`              | Server port                  | `3002`                                     | ❌ No    |
| `NODE_ENV`          | Environment mode             | `development`                              | ❌ No    |

### Frontend (.env)

| Variable       | Description          | Example                        | Required |
| -------------- | -------------------- | ------------------------------ | -------- |
| `VITE_API_URL` | Backend API base URL | `http://localhost:3002/api/v1` | ✅ Yes   |

## 🗄 Database Schema

### User Table

```sql
- userId (UUID, Primary Key)
- email (String, Unique)
- username (String, Unique)
- password (String, Hashed)
- createdAt (DateTime)
- updatedAt (DateTime)
```

### Tweet Table

```sql
- tweetId (UUID, Primary Key)
- content (String)
- authorId (UUID, Foreign Key -> User)
- createdAt (DateTime, Indexed)
- updatedAt (DateTime)
```

### Shared Table

```sql
- shareId (UUID, Primary Key)
- tweetRefId (UUID, Foreign Key -> Tweet, Indexed)
- recipientId (UUID, Foreign Key -> User, Indexed)
- createdAt (DateTime)
```

### TweetImage Table

```sql
- imageId (UUID, Primary Key)
- tweetRefId (UUID, Foreign Key -> Tweet, Indexed)
- url (String)
- publicId (String)
- createdAt (DateTime)
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Error:** `EADDRINUSE: address already in use :::3002`

**Solution:**

```bash
# Find process using the port
lsof -i :3002

# Kill the process
kill -9 <PID>

# Or use different port in .env
PORT=3003
```

#### 2. Database Connection Failed

**Error:** `Can't reach database server`

**Solutions:**

- Ensure PostgreSQL is running:

  ```bash
  # macOS
  brew services start postgresql

  # Linux
  sudo systemctl start postgresql

  # Windows
  # Use pgAdmin or Services app
  ```

- Verify DATABASE_URL format
- Check database credentials
- Test connection:
  ```bash
  psql -U postgres -d twitter_clone
  ```

#### 3. Prisma Client Not Generated

**Error:** `Cannot find module '@prisma/client'`

**Solution:**

```bash
cd server
npx prisma generate
```

#### 4. CORS Errors

**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**

- Check `VITE_API_URL` in frontend `.env`
- Ensure backend CORS is configured correctly
- Verify backend is running

#### 5. JWT Token Invalid

**Error:** `Invalid token` or `401 Unauthorized`

**Solutions:**

- Clear browser localStorage
- Login again
- Check JWT_SECRET is same across restarts
- Verify token expiration

#### 6. Email Service Not Working

**Error:** Email notifications not received

**Solutions:**

- Verify RESEND_API_KEY is correct
- Check Resend dashboard for errors
- Ensure email domain is verified
- Check spam folder
- Email sending is non-blocking (check server logs)

#### 7. TypeScript Errors

**Error:** Various TypeScript compilation errors

**Solutions:**

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Check TypeScript version
npm list typescript

# Rebuild
npm run build
```

## 📝 Scripts Reference

### Backend Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Compile TypeScript to JavaScript
npm start        # Start production server
```

### Frontend Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Database Scripts

```bash
npx prisma migrate dev --name <name>  # Create and apply migration
npx prisma migrate deploy             # Apply migrations in production
npx prisma generate                   # Generate Prisma Client
npx prisma studio                     # Open Prisma Studio GUI
npx prisma db push                    # Push schema without migration
npx prisma db seed                    # Run seed script
npx prisma migrate reset              # Reset database (destructive)
```

## 🧪 Testing

### Test User Accounts

After setup, you can create test accounts:

```bash
# Using the registration endpoint
curl -X POST http://localhost:3002/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 🙏 Acknowledgments

- [Prisma Documentation](https://www.prisma.io/docs)
- [Express Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)

---

**Built with ❤️ by Yusuf**
