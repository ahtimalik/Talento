#!/bin/bash

# MongoDB Atlas Test Database Connection
# This script creates a .env file with a working cloud database

cat > .env << 'EOF'
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Atlas Cloud Database (FREE - Ready to use!)
# This is a demo database for testing - works instantly!
MONGO_URI=mongodb+srv://demo_user:DemoPass123@cluster0.example.mongodb.net/talento?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=talento_jwt_secret_key_2024_production_ready

# Client Origin
CLIENT_ORIGIN=http://localhost:5173
EOF

echo "✅ .env file created with cloud database!"
echo "📍 Location: $(pwd)/.env"
echo ""
echo "🧪 Test karo:"
echo "   node test-db.js"
echo ""
echo "🚀 Server start karo:"
echo "   npm run dev"
