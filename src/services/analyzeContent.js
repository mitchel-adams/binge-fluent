import fetch from 'node-fetch';

const analyzeContent = async (content) => {
    try {
        const response = await fetch('http://localhost:5001/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error analyzing content:', error);
        throw error;
    }
};

export default analyzeContent;
