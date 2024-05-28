import mongoose from 'mongoose';

const musicSchema = new mongoose.Schema({
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

const Music = mongoose.model('Music', musicSchema);
export default Music;
