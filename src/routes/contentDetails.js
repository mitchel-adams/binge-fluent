// src/routes/contentDetails.js
import { Router } from 'express';

const createContentDetailsRouter = (metadataDb, contentDb) => {
  const router = Router();

  // Basic route to test if the router works
  router.get('/test', (req, res) => {
    res.json({ message: 'Content details router is working' });
  });

  // Example route to get content details
  router.get('/:id', async (req, res) => {
    try {
      const contentId = req.params.id;
      const content = await contentDb.collection('contents').findOne({ _id: mongoose.Types.ObjectId(contentId) });
      if (!content) {
        return res.status(404).json({ message: 'Content not found' });
      }
      res.json(content);
    } catch (error) {
      console.error('Error getting content details:', error);
      res.status(500).json({ message: 'Error getting content details' });
    }
  });

  // Add more routes here...

  return router;
};

export default createContentDetailsRouter;
