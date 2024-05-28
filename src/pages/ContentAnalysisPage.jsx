import React, { useState } from 'react';
import axios from 'axios';

const ContentAnalysisPage = () => {
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState('en');
  const [knownWords, setKnownWords] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/analyze-content', {
        content,
        language,
        known_words: knownWords.split(','),
      });
      setAnalysis(response.data);
    } catch (error) {
      console.error('Error analyzing content:', error);
    }
  };

  return (
    <div>
      <h1>Content Analysis</h1>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Enter content here" />
      <input value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="Language (e.g., en, es)" />
      <input value={knownWords} onChange={(e) => setKnownWords(e.target.value)} placeholder="Known Words (comma-separated)" />
      <button onClick={handleAnalyze}>Analyze Content</button>
      {analysis && (
        <div>
          <h2>Analysis Results</h2>
          <pre>{JSON.stringify(analysis, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ContentAnalysisPage;
