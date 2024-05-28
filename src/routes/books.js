import express from 'express';
import mongoose from 'mongoose';
import Book from '../models/Book.js';

const createBooksRouter = (db) => {
  const router = express.Router();

  const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: [String], required: true },
    releaseYear: { type: Number, required: true },
    originalLanguage: { type: String, required: true },
    translationLanguages: { type: [String], required: true },
    summary: { type: String, required: true }
  });

  const BookModel = db.model('Book', bookSchema);

  router.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
  });

  router.get('/', async (req, res) => {
    try {
      const books = await BookModel.find();
      res.json(books);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.post('/', async (req, res) => {
    const book = new BookModel({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      releaseYear: req.body.releaseYear,
      originalLanguage: req.body.originalLanguage,
      translationLanguages: req.body.translationLanguages,
      summary: req.body.summary
    });

    try {
      const newBook = await book.save();
      res.status(201).json(newBook);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  return router;
};

export default createBooksRouter;
