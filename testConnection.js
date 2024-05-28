import mongoose from 'mongoose';

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // 5 seconds timeout
};

const uri = 'mongodb://localhost:27017/test';

mongoose.connect(uri, mongoOptions)
  .then(() => {
    console.log('Connected to MongoDB');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
  });
