# 📅 Simple Booking Manager

A full-stack booking management system built with **Express.js**, **MongoDB**, and **Next.js**.

![Tech Stack](https://img.shields.io/badge/Backend-Express.js-green) ![Tech Stack](https://img.shields.io/badge/Database-MongoDB-brightgreen) ![Tech Stack](https://img.shields.io/badge/Frontend-Next.js-black) ![Tech Stack](https://img.shields.io/badge/Styling-TailwindCSS-blue) ![Tech Stack](https://img.shields.io/badge/Language-TypeScript-blue)

## ✨ Features

- ✅ Create new bookings with validation
- ✅ View all bookings in a beautiful grid layout
- ✅ Responsive design for all devices
- ✅ TypeScript for type safety
- ✅ Clean and organized folder structure
- ✅ REST API with error handling
- ✅ Animated UI with smooth transitions

---

## 🛠️ Tech Stack

| Layer          | Technology                        |
| -------------- | --------------------------------- |
| **Backend**    | Node.js, Express.js, TypeScript   |
| **Database**   | MongoDB with Mongoose ODM         |
| **Frontend**   | Next.js 14 (App Router), React 18 |
| **Styling**    | Tailwind CSS                      |
| **Testing**    | Jest, Supertest                   |
| **Validation** | express-validator                 |

---

## 📁 Project Structure

```
assignment/
├── backend/                 # Express.js API
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Error handling
│   │   └── index.ts        # App entry point
│   └── tests/              # API tests
│
├── frontend/               # Next.js Application
│   └── src/
│       ├── app/           # Pages (App Router)
│       ├── components/    # Reusable components
│       └── lib/           # API client & utilities
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas account
- npm or yarn package manager

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd assignment
```

### Step 2: Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your MongoDB URI
# MONGODB_URI=mongodb://localhost:27017/booking-manager
# or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/booking-manager

# Start development server
npm run dev
```

The API will be available at `http://localhost:5000`

### Step 3: Setup Frontend

```bash
# Open a new terminal, navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

---

## 🔌 API Endpoints

### Create a Booking

```http
POST /api/bookings
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "date": "2024-12-25",
  "time": "18:00",
  "numberOfGuests": 4,
  "notes": "Birthday celebration"
}
```

### Get All Bookings

```http
GET /api/bookings
```

---

## 🧪 Running Tests

```bash
# In the backend folder
cd backend

# Make sure MongoDB is running, then run tests
npm test
```

---

## 🌐 Deployment

### Backend Deployment (Render)

1. **Create a Render Account**
   - Go to [render.com](https://render.com) and sign up

2. **Create New Web Service**
   - Connect your GitHub repository
   - Select `backend` as the root directory

3. **Configure Build Settings**

   ```
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

4. **Add Environment Variables**

   ```
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_uri
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Note your backend URL (e.g., `https://booking-api.onrender.com`)

---

### Frontend Deployment (Vercel)

1. **Create a Vercel Account**
   - Go to [vercel.com](https://vercel.com) and sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Select `frontend` as the root directory

3. **Configure Build Settings**

   ```
   Framework Preset: Next.js
   Build Command: npm run build
   Output Directory: .next
   ```

4. **Add Environment Variables**

   ```
   NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
   ```

5. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-app.vercel.app`

---

### MongoDB Atlas Setup

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create database user with password
4. Whitelist IP (0.0.0.0/0 for all)
5. Get connection string:
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/booking-manager
   ```

---

## 🎓 What I Learned

Building this project helped me understand:

1. **Full-Stack Architecture**
   - How frontend and backend communicate via REST APIs
   - Separation of concerns in a modern web application

2. **TypeScript**
   - Type safety across the entire stack
   - Better developer experience with autocomplete and error checking

3. **MongoDB & Mongoose**
   - NoSQL database design
   - Schema validation and indexing

4. **Next.js App Router**
   - Server components vs client components
   - Dynamic data fetching and caching

5. **Tailwind CSS**
   - Utility-first CSS approach
   - Responsive design with minimal code

6. **Error Handling**
   - Graceful error messages for users
   - Validation on both client and server

7. **Deployment**
   - Environment variables management
   - CI/CD with Vercel and Render

---

## 📝 Future Improvements

- [ ] Add user authentication
- [ ] Edit and delete bookings
- [ ] Email notifications
- [ ] Calendar view integration
- [ ] Search and filter functionality

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ for learning
