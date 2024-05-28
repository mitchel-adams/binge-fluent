import mongoose from 'mongoose';

const episodeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  season: { type: Number, required: true },
  episodeNumber: { type: Number, required: true },
  summary: { type: String },
  duration: { type: Number, required: true },
  releaseDate: { type: Date, required: true }
});

export default episodeSchema;
