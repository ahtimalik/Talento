import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

mongoose.connect('mongodb://127.0.0.1:27017/talento')
  .then(async () => {
    const hr = mongoose.connection.collection('hrs');
    const admin = await hr.findOne({ role: 'superadmin' });
    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_this_in_production', { expiresIn: '1d' });
    console.log(token);
    process.exit(0);
  });
