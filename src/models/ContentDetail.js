import mongoose from 'mongoose';

const contentDetailSchema = new mongoose.Schema({
  contentType: { type: String, required: true },
  contentFile: { type: String, required: true },
  originalLanguage: { type: String, required: true },
  analyzedData: {
    wordCount: { type: Number },
    uniqueWordCount: { type: Number },
    difficultyLevel: { type: Number },
    wordFrequency: { type: Map, of: Number }
  }
});

const ContentDetail = mongoose.model('ContentDetail', contentDetailSchema);
export default ContentDetail;
