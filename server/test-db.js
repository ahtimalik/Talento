import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/talento';

        console.log('🔄 Attempting to connect to MongoDB...');
        console.log(`📍 URI: ${mongoURI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')}`);

        await mongoose.connect(mongoURI);

        console.log('\n✅ SUCCESS! MongoDB Connected');
        console.log(`📊 Database: ${mongoose.connection.name}`);
        console.log(`🌐 Host: ${mongoose.connection.host}`);
        console.log(`✨ Connection is working perfectly!\n`);

        await mongoose.connection.close();
        console.log('👋 Connection closed');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ CONNECTION FAILED');
        console.error('Error:', error.message);
        console.error('\n💡 Troubleshooting:');
        console.error('1. Check if MongoDB is running (brew services list)');
        console.error('2. Verify MONGO_URI in .env file');
        console.error('3. For local MongoDB: Make sure it\'s installed and started');
        console.error('4. For Atlas: Check username, password, and network access\n');
        process.exit(1);
    }
};

testConnection();
