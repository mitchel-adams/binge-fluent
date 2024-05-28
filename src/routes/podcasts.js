import express from 'express';
import mongoose from 'mongoose';
import Podcast from '../models/Podcast.js';

const createPodcastsRouter = (db) => {
  const router = express.Router();

  router.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
  });

  const PodcastModel = db.model('Podcast', new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: [String], required: true },
    host: { type: String, required: true },
    originalLanguage: { type: String, required: true },
    dubbedLanguages: { type: [String], required: true },
    subtitles: { type: [String], required: true },
    summary: { type: String, required: true },
    episodes: [
      {
        title: { type: String, required: true },
        season: { type: Number, required: true },
        episodeNumber: { type: Number, required: true },
        summary: { type: String },
        duration: { type: Number, required: true },
        releaseDate: { type: Date, required: true }
      }
    ]
  }));

  router.get('/', async (req, res) => {
    try {
      console.log('Fetching all podcasts');
      const podcasts = await PodcastModel.find();
      res.json(podcasts);
    } catch (err) {
      console.error('Error fetching podcasts:', err);
      res.status(500).json({ message: err.message });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      console.log(`Fetching podcast with ID ${req.params.id}`);
      const podcast = await PodcastModel.findById(req.params.id);
      if (!podcast) return res.status(404).json({ message: 'Podcast not found' });
      res.json(podcast);
    } catch (err) {
      console.error('Error fetching podcast:', err);
      res.status(500).json({ message: err.message });
    }
  });

  router.post('/', async (req, res) => {
    console.log('Creating a new podcast');
    const podcast = new PodcastModel({
      title: req.body.title,
      genre: req.body.genre,
      host: req.body.host,
      originalLanguage: req.body.originalLanguage,
      dubbedLanguages: req.body.dubbedLanguages,
      subtitles: req.body.subtitles,
      summary: req.body.summary,
      episodes: req.body.episodes
    });

    try {
      const newPodcast = await podcast.save();
      res.status(201).json(newPodcast);
      console.log('New podcast created successfully');
    } catch (err) {
      console.error('Error creating podcast:', err);
      res.status(400).json({ message: err.message });
    }
  });

  router.patch('/:id', async (req, res) => {
    try {
      console.log(`Updating podcast with ID ${req.params.id}`);
      const podcast = await PodcastModel.findById(req.params.id);
      if (!podcast) return res.status(404).json({ message: 'Podcast not found' });

      Object.assign(podcast, req.body);

      const updatedPodcast = await podcast.save();
      res.json(updatedPodcast);
      console.log('Podcast updated successfully');
    } catch (err) {
      console.error('Error updating podcast:', err);
      res.status(400).json({ message: err.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      console.log(`Deleting podcast with ID ${req.params.id}`);
      const podcast = await PodcastModel.findById(req.params.id);
      if (!podcast) return res.status(404).json({ message: 'Podcast not found' });

      await podcast.deleteOne();
      res.json({ message: 'Podcast deleted' });
      console.log('Podcast deleted successfully');
    } catch (err) {
      console.error('Error deleting podcast:', err);
      res.status(500).json({ message: err.message });
    }
  });

  return router;
};

export default createPodcastsRouter;
