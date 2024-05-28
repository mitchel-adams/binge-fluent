import express from 'express';
import mongoose from 'mongoose';

const createAudiobooksRouter = (db) => {
  const router = express.Router();
  const { Schema } = mongoose;
  
  const audiobookSchema = new Schema({
    title: { type: String, required: true },
    genre: { type: [String], required: true },
    author: { type: String, required: true },
    narrator: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    originalLanguage: { type: String, required: true },
    dubbedLanguages: { type: [String], required: true },
    subtitles: { type: [String], required: true },
    summary: { type: String, required: true },
    duration: { type: Number, required: true }
  });

  const Audiobook = db.model('Audiobook', audiobookSchema);

  router.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
  });

  router.get('/', async (req, res) => {
    try {
      console.log('Fetching all audiobooks');
      const audiobooks = await Audiobook.find();
      res.json(audiobooks);
    } catch (err) {
      console.error('Error fetching audiobooks:', err);
      res.status(500).json({ message: err.message });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      console.log(`Fetching audiobook with ID ${req.params.id}`);
      const audiobook = await Audiobook.findById(req.params.id);
      if (!audiobook) return res.status(404).json({ message: 'Audiobook not found' });
      res.json(audiobook);
    } catch (err) {
      console.error('Error fetching audiobook:', err);
      res.status(500).json({ message: err.message });
    }
  });

  router.post('/', async (req, res) => {
    console.log('Creating a new audiobook');
    const audiobook = new Audiobook({
      title: req.body.title,
      genre: req.body.genre,
      author: req.body.author,
      narrator: req.body.narrator,
      releaseYear: req.body.releaseYear,
      originalLanguage: req.body.originalLanguage,
      dubbedLanguages: req.body.dubbedLanguages,
      subtitles: req.body.subtitles,
      summary: req.body.summary,
      duration: req.body.duration
    });

    try {
      const newAudiobook = await audiobook.save();
      res.status(201).json(newAudiobook);
      console.log('New audiobook created successfully');
    } catch (err) {
      console.error('Error creating audiobook:', err);
      res.status(400).json({ message: err.message });
    }
  });

  router.patch('/:id', async (req, res) => {
    try {
      console.log(`Updating audiobook with ID ${req.params.id}`);
      const audiobook = await Audiobook.findById(req.params.id);
      if (!audiobook) return res.status(404).json({ message: 'Audiobook not found' });

      Object.assign(audiobook, req.body);

      const updatedAudiobook = await audiobook.save();
      res.json(updatedAudiobook);
      console.log('Audiobook updated successfully');
    } catch (err) {
      console.error('Error updating audiobook:', err);
      res.status(400).json({ message: err.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      console.log(`Deleting audiobook with ID ${req.params.id}`);
      const audiobook = await Audiobook.findById(req.params.id);
      if (!audiobook) return res.status(404).json({ message: 'Audiobook not found' });

      await audiobook.deleteOne();
      res.json({ message: 'Audiobook deleted' });
      console.log('Audiobook deleted successfully');
    } catch (err) {
      console.error('Error deleting audiobook:', err);
      res.status(500).json({ message: err.message });
    }
  });

  return router;
};

export default createAudiobooksRouter;
