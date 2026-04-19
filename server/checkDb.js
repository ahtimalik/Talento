import mongoose from 'mongoose';
mongoose.connect('mongodb://127.0.0.1:27017/talento')
  .then(async () => {
    const hr = mongoose.connection.collection('hrs');
    const users = await hr.find({role: 'hr'}).toArray();
    console.log("HRs:", JSON.stringify(users, null, 2));
    process.exit(0);
  });
