import mongoose from 'mongoose';
import dotenv from 'dotenv';
import HR from '../models/HR.js';
import connectDB from '../config/db.js';

dotenv.config();

const fixAdmin = async () => {
    try {
        await connectDB();
        console.log('🔍 Checking for user with email: admin@talento.com');

        const user = await HR.findOne({ email: 'admin@talento.com' });

        if (!user) {
            console.log('❌ No user found with this email.');
        } else {
            console.log(`👤 User found: ${user.name} | Role: ${user.role} | ID: ${user._id}`);

            if (user.role !== 'superadmin') {
                console.log('⚠️  User is NOT a superadmin. Deleting incorrect account...');
                await HR.findByIdAndDelete(user._id);
                console.log('✅ User deleted successfully.');
            } else {
                console.log('✅ User is already a superadmin. No action needed.');
            }
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

fixAdmin();
