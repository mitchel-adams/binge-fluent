import express from 'express';
import mongoose from 'mongoose';
import TVShow from '../models/TVShow.js';

const createTVShowsRouter = (db) => {
  const router = express.Router();

  router.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
  });

  const TVShowModel = db.model('TVShow', new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: [String], required: true },
    creator: { type: String, required: true },
    seasons: { type: Number, required: true },
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
      console.log('Fetching all TV shows');
      const tvShows = await TVShowModel.find();
      res.json(tvShows);
    } catch (err) {
      console.error('Error fetching TV shows:', err);
      res.status(500).json({ message: err.message });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      console.log(`Fetching TV show with ID ${req.params.id}`);
      const tvShow = await TVShowModel.findById(req.params.id);
      if (!tvShow) return res.status(404).json({ message: 'TV show not found' });
      res.json(tvShow);
    } catch (err) {
      console.error('Error fetching TV show:', err);
      res.status(500).json({ message: err.message });
    }
  });

  router.post('/', async (req, res) => {
    console.log('Creating a new TV show');
    const tvShow = new TVShowModel({
      title: req.body.title,
      genre: req.body.genre,
      creator: req.body.creator,
      seasons: req.body.seasons,
      originalLanguage: req.body.originalLanguage,
      dubbedLanguages: req.body.dubbedLanguages,
      subtitles: req.body.subtitles,
      summary: req.body.summary,
      episodes: req.body.episodes
    });

    try {
      const newTVShow = await tvShow.save();
      res.status(201).json(newTVShow);
      console.log('New TV show created successfully');
    } catch (err) {
      console.error('Error creating TV show:', err);
      res.status(400).json({ message: err.message });
    }
  });

  router.patch('/:id', async (req, res) => {
    try {
      console.log(`Updating TV show with ID ${req.params.id}`);
      const tvShow = await TVShowModel.findById(req.params.id);
      if (!tvShow) return res.status(404).json({ message: 'TV show not found' });

      Object.assign(tvShow, req.body);

      const updatedTVShow = await tvShow.save();
      res.json(updatedTVShow);
      console.log('TV show updated successfully');
    } catch (err) {
      console.error('Error updating TV show:', err);
      res.status(400).json({ message: err.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      console.log(`Deleting TV show with ID ${req.params.id}`);
      const tvShow = await TVShowModel.findById(req.params.id);
      if (!tvShow) return res.status(404).json({ message: 'TV show not found' });

      await tvShow.deleteOne();
      res.json({ message: 'TV show deleted' });
      console.log('TV show deleted successfully');
    } catch (err) {
      console.error('Error deleting TV show:', err);
      res.status(500).json({ message: err.message });
    }
  });

  return router;
};

export default createTVShowsRouter;
