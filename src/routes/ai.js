import express from 'express';
import { calculateMetadata } from '../services/aiService.js';

const aiRouter = () => {
  const router = express.Router();

  // Endpoint to calculate metadata
  router.post('/calculate-metadata', async (req, res) => {
    try {
      const { text } = req.body;
      const metadata = await calculateMetadata(text);
      res.json(metadata);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  return router;
};

export default aiRouter;
