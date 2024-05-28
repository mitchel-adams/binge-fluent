const mongoose = require('mongoose');

const ContentAnalysisSchema = new mongoose.Schema({
  contentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Content' },
  totalWords: { type: Number },
  uniqueWords: { type: Number },
  // Add more fields as needed for different metrics
});

module.exports = mongoose.model('ContentAnalysis', ContentAnalysisSchema);
