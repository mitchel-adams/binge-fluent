import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import createMoviesRouter from './src/routes/movies.js';
import createTVShowsRouter from './src/routes/tvShows.js';
import createPodcastsRouter from './src/routes/podcasts.js';
import createAudiobooksRouter from './src/routes/audiobooks.js';
import createMusicRouter from './src/routes/music.js';
import createBooksRouter from './src/routes/books.js';
import createCategoriesRouter from './src/routes/categories.js';
import createContentDetailsRouter from './src/routes/contentDetails.js';
import createAuthRoutes from './src/routes/auth.js';
import aiRouter from './src/routes/ai.js';

dotenv.config();

const app = express();

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,
  maxPoolSize: 10,
};

// Metadata database connection
const metadataDb = mongoose.createConnection(process.env.MONGO_URI_METADATA, mongoOptions);

// Content database connection
const contentDb = mongoose.createConnection(process.env.MONGO_URI_CONTENT, mongoOptions);

// User database connection
const userDb = mongoose.createConnection(process.env.MONGO_URI_USERS, mongoOptions);

metadataDb.on('error', (error) => {
  console.error('Metadata DB connection error:', error);
});

metadataDb.once('open', () => {
  console.log('Connected to Metadata Database');
});

contentDb.on('error', (error) => {
  console.error('Content DB connection error:', error);
});

contentDb.once('open', () => {
  console.log('Connected to Content Database');
});

userDb.on('error', (error) => {
  console.error('User DB connection error:', error);
});

userDb.once('open', () => {
  console.log('Connected to User Database');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Middleware to check if the database connections are ready
app.use((req, res, next) => {
  if (metadataDb.readyState !== 1) {
    console.error('Metadata database connection not ready');
    return res.status(500).json({ message: 'Metadata database connection not ready' });
  }
  if (contentDb.readyState !== 1) {
    console.error('Content database connection not ready');
    return res.status(500).json({ message: 'Content database connection not ready' });
  }
  if (userDb.readyState !== 1) {
    console.error('User database connection not ready');
    return res.status(500).json({ message: 'User database connection not ready' });
  }
  next();
});

app.use('/api/movies', createMoviesRouter(metadataDb));
app.use('/api/tvshows', createTVShowsRouter(metadataDb));
app.use('/api/podcasts', createPodcastsRouter(metadataDb));
app.use('/api/audiobooks', createAudiobooksRouter(metadataDb));
app.use('/api/music', createMusicRouter(metadataDb));
app.use('/api/books', createBooksRouter(metadataDb));
app.use('/api/categories', createCategoriesRouter(metadataDb));
app.use('/api/content-details', createContentDetailsRouter(metadataDb, contentDb));
app.use('/api/auth', createAuthRoutes(userDb));
app.use('/api/ai', aiRouter());

// Route to analyze content
app.post('/api/analyze-content', async (req, res) => {
  try {
    const { content, language } = req.body;
    const response = await axios.post('http://127.0.0.1:5001/analyze', {
      content,
      language,
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error analyzing content:', error);
    res.status(500).json({ message: 'Error analyzing content', error: error.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { metadataDb, contentDb, userDb };
