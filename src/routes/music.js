import express from 'express';
import mongoose from 'mongoose';

const createMusicRouter = (db) => {
  const router = express.Router();
  const { Schema } = mongoose;
  
  const musicSchema = new Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    genre: { type: [String], required: true },
    releaseYear: { type: Number, required: true },
    album: { type: String },
    duration: { type: Number, required: true },
    originalLanguage: { type: String, required: true },
    dubbedLanguages: { type: [String], required: true },
    subtitles: { type: [String], required: true }
  });

  const Music = db.model('Music', musicSchema);

  router.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
  });

  router.get('/', async (req, res) => {
    try {
      console.log('Fetching all music');
      const music = await Music.find();
      res.json(music);
    } catch (err) {
      console.error('Error fetching music:', err);
      res.status(500).json({ message: err.message });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      console.log(`Fetching music with ID ${req.params.id}`);
      const music = await Music.findById(req.params.id);
      if (!music) return res.status(404).json({ message: 'Music not found' });
      res.json(music);
    } catch (err) {
      console.error('Error fetching music:', err);
      res.status(500).json({ message: err.message });
    }
  });

  router.post('/', async (req, res) => {
    console.log('Creating a new music entry');
    const music = new Music({
      title: req.body.title,
      artist: req.body.artist,
      genre: req.body.genre,
      releaseYear: req.body.releaseYear,
      album: req.body.album,
      duration: req.body.duration,
      originalLanguage: req.body.originalLanguage,
      dubbedLanguages: req.body.dubbedLanguages,
      subtitles: req.body.subtitles
    });

    try {
      const newMusic = await music.save();
      res.status(201).json(newMusic);
      console.log('New music created successfully');
    } catch (err) {
      console.error('Error creating music:', err);
      res.status(400).json({ message: err.message });
    }
  });

  router.patch('/:id', async (req, res) => {
    try {
      console.log(`Updating music with ID ${req.params.id}`);
      const music = await Music.findById(req.params.id);
      if (!music) return res.status(404).json({ message: 'Music not found' });

      Object.assign(music, req.body);

      const updatedMusic = await music.save();
      res.json(updatedMusic);
      console.log('Music updated successfully');
    } catch (err) {
      console.error('Error updating music:', err);
      res.status(400).json({ message: err.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      console.log(`Deleting music with ID ${req.params.id}`);
      const music = await Music.findById(req.params.id);
      if (!music) return res.status(404).json({ message: 'Music not found' });

      await music.deleteOne();
      res.json({ message: 'Music deleted' });
      console.log('Music deleted successfully');
    } catch (err) {
      console.error('Error deleting music:', err);
      res.status(500).json({ message: err.message });
    }
  });

  return router;
};

export default createMusicRouter;
