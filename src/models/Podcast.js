import mongoose from 'mongoose';
import episodeSchema from './Episode.js';

const podcastSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: [String], required: true },
  host: { type: String, required: true },
  originalLanguage: { type: String, required: true },
  dubbedLanguages: { type: [String], required: true },
  subtitles: { type: [String], required: true },
  summary: { type: String, required: true },
  episodes: [episodeSchema]
});

const Podcast = mongoose.model('Podcast', podcastSchema);
export default Podcast;
