import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: [String], required: true },
  releaseYear: { type: Number, required: true },
  originalLanguage: { type: String, required: true },
  translationLanguages: { type: [String], required: true },
  summary: { type: String, required: true }
});

const Book = mongoose.model('Book', bookSchema);
export default Book;
