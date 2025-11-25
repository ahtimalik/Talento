# Talento - HR Interview Management Platform

Backend API server for Talento platform built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Install Dependencies**
```bash
cd server
npm install
```

2. **Setup Environment Variables**
Create a `.env` file in the server directory:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/talento
JWT_SECRET=your_super_secret_jwt_key
CLIENT_ORIGIN=http://localhost:5173
```

3. **Start MongoDB**

**Option A: Local MongoDB**
```bash
# macOS (using Homebrew)
brew services start mongodb-community

# Or manually
mongod --dbpath /path/to/your/data/directory
```

**Option B: MongoDB Atlas (Cloud)**
- Create account at https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get connection string and update `MONGO_URI` in `.env`

4. **Run the Server**

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Authentication

#### Signup
```http
POST /api/hr/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "plan": "free",
    "interviewCount": 0
  },
  "token": "jwt_token_here"
}
```

#### Login
```http
POST /api/hr/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "plan": "free",
    "interviewCount": 0
  },
  "token": "jwt_token_here"
}
```

## 🗂️ Project Structure

```
server/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   └── hrController.js    # HR authentication logic
├── models/
│   └── HR.js             # HR user schema
├── routes/
│   └── hrRoutes.js       # HR routes
├── middleware/           # Custom middleware
├── .env                  # Environment variables
├── .env.example         # Example env file
├── server.js            # Entry point
└── package.json         # Dependencies
```

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Environment:** dotenv

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- CORS protection
- Input validation
- Error handling middleware

## 📝 Development

### Install MongoDB on macOS
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Check if running
brew services list
```

### Check Database
```bash
# Connect to MongoDB shell
mongosh

# Show databases
show dbs

# Use talento database
use talento

# Show collections
show collections

# View users
db.hrs.find().pretty()
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running: `brew services list`
- Check if port 27017 is available
- Verify MONGO_URI in `.env` file

### Port Already in Use
- Change PORT in `.env` file
- Or kill process: `lsof -ti:5000 | xargs kill`

### Module Import Errors
- Make sure `"type": "module"` is in package.json
- Use `.js` extensions in imports

## 📄 License

ISC
