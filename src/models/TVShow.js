import mongoose from 'mongoose';
import episodeSchema from './Episode.js';

const tvShowSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: [String], required: true },
  creator: { type: String, required: true },
  seasons: { type: Number, required: true },
  originalLanguage: { type: String, required: true },
  dubbedLanguages: { type: [String], required: true },
  subtitles: { type: [String], required: true },
  summary: { type: String, required: true },
  episodes: [episodeSchema]
});

const TVShow = mongoose.model('TVShow', tvShowSchema);
export default TVShow;
