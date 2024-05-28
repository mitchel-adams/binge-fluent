import express from 'express';
import mongoose from 'mongoose';

const createCategoriesRouter = (db) => {
  const router = express.Router();
  const { Schema } = mongoose;
  
  const categorySchema = new Schema({
    name: { type: String, required: true },
    subcategories: { type: [String], required: true }
  });

  const Category = db.model('Category', categorySchema);

  router.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
  });

  router.get('/', async (req, res) => {
    try {
      console.log('Fetching all categories');
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      console.error('Error fetching categories:', err);
      res.status(500).json({ message: err.message });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      console.log(`Fetching category with ID ${req.params.id}`);
      const category = await Category.findById(req.params.id);
      if (!category) return res.status(404).json({ message: 'Category not found' });
      res.json(category);
    } catch (err) {
      console.error('Error fetching category:', err);
      res.status(500).json({ message: err.message });
    }
  });

  router.post('/', async (req, res) => {
    console.log('Creating a new category');
    const category = new Category({
      name: req.body.name,
      subcategories: req.body.subcategories
    });

    try {
      const newCategory = await category.save();
      res.status(201).json(newCategory);
      console.log('New category created successfully');
    } catch (err) {
      console.error('Error creating category:', err);
      res.status(400).json({ message: err.message });
    }
  });

  router.patch('/:id', async (req, res) => {
    try {
      console.log(`Updating category with ID ${req.params.id}`);
      const category = await Category.findById(req.params.id);
      if (!category) return res.status(404).json({ message: 'Category not found' });

      Object.assign(category, req.body);

      const updatedCategory = await category.save();
      res.json(updatedCategory);
      console.log('Category updated successfully');
    } catch (err) {
      console.error('Error updating category:', err);
      res.status(400).json({ message: err.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      console.log(`Deleting category with ID ${req.params.id}`);
      const category = await Category.findById(req.params.id);
      if (!category) return res.status(404).json({ message: 'Category not found' });

      await category.deleteOne();
      res.json({ message: 'Category deleted' });
      console.log('Category deleted successfully');
    } catch (err) {
      console.error('Error deleting category:', err);
      res.status(500).json({ message: err.message });
    }
  });

  return router;
};

export default createCategoriesRouter;
