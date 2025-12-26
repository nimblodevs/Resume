# Resume Builder

A full-stack resume builder application with multiple templates, real-time preview, JWT authentication, and a MongoDB backend. Built with React, Vite, Express, and MongoDB.

## 🎯 Features

- **Multiple Resume Templates** - 10+ professionally designed templates (Classic, Minimal, Modern, Tech, Designer, Executive, Creative, Elegant, Infographic, Timeline, Startup, etc.)
- **Live Preview** - Real-time preview while editing form sections
- **Dynamic Form Management** - Add/remove experiences, education entries, projects, and skills
- **User Authentication** - JWT-based registration and login with secure password hashing
- **Persistent Storage** - Store and manage multiple resumes per user in MongoDB
- **Export & Print Ready** - Browser-ready resume output for exporting and printing
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Color Customization** - Pick custom colors for your resume template

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite (build tool)
- JavaScript/JSX
- Responsive CSS

**Backend:**
- Node.js with Express.js
- MongoDB with Mongoose
- JWT (JSON Web Tokens) for authentication
- Bcrypt for password hashing
- Multer for file uploads
- CORS enabled for cross-origin requests

## 📁 Project Structure

```
Resume/
├── client/                          # Frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── templates/          # Resume template components
│   │   │   ├── home/               # Landing page components
│   │   │   ├── *.jsx               # Form and UI components
│   │   ├── pages/                  # Page components (Dashboard, Builder, Preview, etc.)
│   │   ├── assets/                 # Images and static assets
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
│
├── server/                          # Backend application
│   ├── controllers/                # Business logic
│   │   ├── UserController.js       # User authentication & profile
│   │   └── ResumeController.js     # Resume CRUD operations
│   ├── models/                     # Database schemas
│   │   ├── UserModel.js            # User schema
│   │   └── ResumeModel.js          # Resume schema
│   ├── routes/                     # API routes
│   │   └── userRoutes.js           # User & resume endpoints
│   ├── middlewares/                # Custom middleware
│   │   ├── authMiddleware.js       # JWT verification
│   │   └── dbReady.js              # Database readiness check
│   ├── config/                     # Configuration
│   │   └── db.js                   # MongoDB connection
│   ├── server.js
│   └── package.json
│
└── README.md
```

## ⚙️ Environment Setup

Create a `.env` file in the `server` folder with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/resume-builder

# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRATION=7d

# Optionally for file uploads
FILE_UPLOAD_LIMIT=10mb
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB (local or cloud instance like MongoDB Atlas)

### 1. Clone and Navigate

```bash
git clone <repository-url>
cd Resume
```

### 2. Backend Setup

```bash
cd server
npm install
npm run dev
```

The server will start on `http://localhost:3000` and attempt to connect to MongoDB with automatic retry logic.

### 3. Frontend Setup (in a new terminal)

```bash
cd client
npm install
npm run dev
```

The development server will run on `http://localhost:5173` (or next available port).

### 4. Production Build

```bash
# Frontend build
cd client
npm run build

# Backend uses Node.js directly
cd server
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
  - Body: `{ email, password, name }`
  - Returns: User object and JWT token

- `POST /api/users/login` - Login user
  - Body: `{ email, password }`
  - Returns: User object and JWT token

### User Profile (JWT Protected)
- `GET /api/users/profile` - Get current user profile
- `GET /api/users/data` - Get user by ID
- `GET /api/users/resumes` - Get all user's resumes

### Health & Status
- `GET /health` - Server health check
  - Returns: Server status, DB connection status, and uptime

## 🔐 Authentication Flow

1. User registers with email/password → Password hashed with bcrypt
2. User logs in → JWT token issued
3. Token stored in client (localStorage/sessionStorage)
4. Protected routes verify JWT via `authMiddleware`
5. Expired tokens require re-login

## 🔄 Database Connection Flow

```
Node.js starts
    ↓
Server listens on PORT
    ↓
connectWithRetry() attempts DB connection
    ↓
    ├─ ✅ Success → DB connected, routes enabled
    └─ ❌ Failure → Retry after delay (5s → 10s → 20s → max 30s)
```

Routes are protected by `dbReady` middleware and return 503 if DB is unavailable.

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Verify MongoDB is running locally or check cloud connection string
- Check `MONGODB_URI` in `.env` is correct
- Review server logs for connection errors
- Server will retry automatically every 5-30 seconds

### Port Already in Use
- Change `PORT` in `.env` or kill the process using that port
- Frontend defaults to 5173, can be configured in `vite.config.js`

### JWT Token Issues
- Ensure `JWT_SECRET` is set in `.env`
- Clear browser localStorage and re-login if tokens are stale
- Check token expiration in `JWT_EXPIRATION`

### CORS Errors
- Verify both frontend and backend are running
- Check CORS configuration in `server.js`
- Ensure API calls use correct base URL

### Vite Hot Module Replacement Not Working
- Try clearing `.vite` cache in `node_modules`
- Restart the dev server with `npm run dev`

## 📝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request with a clear description

Keep changes focused and include brief descriptions in PRs.

## 📄 License

This project is available under the MIT License. See LICENSE file for details.

