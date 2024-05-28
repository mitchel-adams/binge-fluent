import mongoose from 'mongoose';

const audiobookSchema = new mongoose.Schema({
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

const Audiobook = mongoose.model('Audiobook', audiobookSchema);
export default Audiobook;
