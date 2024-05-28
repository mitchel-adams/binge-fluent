const cron = require('node-cron');
const ContentDetail = require('./models/ContentDetail');
const ContentAnalysis = require('./models/ContentAnalysis');

const analyzeContent = (text) => {
  const totalWords = text.split(' ').length;
  const uniqueWords = new Set(text.split(' ')).size;
  // Further analysis for grammar, sentence structure, etc.
  
  return {
    totalWords,
    uniqueWords,
    // Add more metrics as needed
  };
};

cron.schedule('0 0 * * *', async () => { // Run every day at midnight
  const contentDetails = await ContentDetail.find();
  
  for (const detail of contentDetails) {
    const analysis = analyzeContent(detail.content);
    const contentAnalysis = new ContentAnalysis({
      contentId: detail._id,
      ...analysis
    });
    await contentAnalysis.save();
  }
});
