import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: [String], required: true },
  director: String,
  releaseYear: Number,
  originalLanguage: String,
  dubbedLanguages: [String],
  subtitles: [String],
  summary: String,
  duration: Number
});

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;
