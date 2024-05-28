import express from 'express';
import mongoose from 'mongoose';

const createMoviesRouter = (db) => {
  const router = express.Router();

  const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: [String], required: true },
    director: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    originalLanguage: { type: String, required: true },
    dubbedLanguages: { type: [String], required: true },
    subtitles: { type: [String], required: true },
    summary: { type: String, required: true },
    duration: { type: Number, required: true }
  });

  const Movie = db.model('Movie', MovieSchema);

  router.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
  });

  router.get('/', async (req, res) => {
    try {
      console.log('Fetching all movies');
      const movies = await Movie.find();
      res.json(movies);
    } catch (err) {
      console.error('Error fetching movies:', err);
      res.status(500).json({ message: err.message });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      console.log(`Fetching movie with ID ${req.params.id}`);
      const movie = await Movie.findById(req.params.id);
      if (!movie) return res.status(404).json({ message: 'Movie not found' });
      res.json(movie);
    } catch (err) {
      console.error('Error fetching movie:', err);
      res.status(500).json({ message: err.message });
    }
  });

  router.post('/', async (req, res) => {
    console.log('Creating a new movie');
    const movie = new Movie({
      title: req.body.title,
      genre: req.body.genre,
      director: req.body.director,
      releaseYear: req.body.releaseYear,
      originalLanguage: req.body.originalLanguage,
      dubbedLanguages: req.body.dubbedLanguages,
      subtitles: req.body.subtitles,
      summary: req.body.summary,
      duration: req.body.duration
    });

    try {
      const newMovie = await movie.save();
      res.status(201).json(newMovie);
      console.log('New movie created successfully');
    } catch (err) {
      console.error('Error creating movie:', err);
      res.status(400).json({ message: err.message });
    }
  });

  router.patch('/:id', async (req, res) => {
    try {
      console.log(`Updating movie with ID ${req.params.id}`);
      const movie = await Movie.findById(req.params.id);
      if (!movie) return res.status(404).json({ message: 'Movie not found' });

      Object.assign(movie, req.body);

      const updatedMovie = await movie.save();
      res.json(updatedMovie);
      console.log('Movie updated successfully');
    } catch (err) {
      console.error('Error updating movie:', err);
      res.status(400).json({ message: err.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      console.log(`Deleting movie with ID ${req.params.id}`);
      const movie = await Movie.findById(req.params.id);
      if (!movie) return res.status(404).json({ message: 'Movie not found' });

      await movie.deleteOne();
      res.json({ message: 'Movie deleted' });
      console.log('Movie deleted successfully');
    } catch (err) {
      console.error('Error deleting movie:', err);
      res.status(500).json({ message: err.message });
    }
  });

  return router;
};

export default createMoviesRouter;
