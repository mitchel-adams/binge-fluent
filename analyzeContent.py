from flask import Flask, request, jsonify, render_template, redirect, url_for
import spacy
from textblob import TextBlob
import textstat
import nltk
from nltk.tokenize import word_tokenize, sent_tokenize
from transformers import pipeline
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation
from googletrans import Translator
import json

# Initialize Flask app
app = Flask(__name__)

# Download necessary NLTK data
nltk.download('punkt')

# Load SpaCy models
nlp_en = spacy.load('en_core_web_sm')
nlp_es = spacy.load('es_core_news_sm')
nlp_de = spacy.load('de_core_news_sm')
nlp_fr = spacy.load('fr_core_news_sm')
nlp_it = spacy.load('it_core_news_sm')
nlp_pt = spacy.load('pt_core_news_sm')
nlp_nl = spacy.load('nl_core_news_sm')

# Summarization pipeline
summarizer = pipeline("summarization")

# Translator for translation
translator = Translator()

# Define a common words set
common_words = """
the be to of and a in that have I it for not on with he as you do at
this but his by from they we say her she or an will my one all would
there their what so up out if about who get which go me when make can
like time no just him know take people into year your good some could
them see other than then now look only come its over think also back
after use two how our work first well way even new want because any
these give day most us
"""
common_word_set = set(common_words.split())

# Global variable to store analysis results
global_analysis = {}

# Function to get basic statistics
def get_basic_statistics(text):
    words = word_tokenize(text)
    sentences = sent_tokenize(text)
    paragraphs = text.split('\n\n')
    return {
        'word_count': len(words),
        'unique_word_count': len(set(words)),
        'sentence_count': len(sentences),
        'paragraph_count': len(paragraphs)
    }

# Function to get readability scores
def get_readability_scores(text):
    return {
        'flesch_reading_ease': textstat.flesch_reading_ease(text),
        'flesch_kincaid_grade': textstat.flesch_kincaid_grade(text),
        'gunning_fog': textstat.gunning_fog(text),
        'smog_index': textstat.smog_index(text),
        'automated_readability_index': textstat.automated_readability_index(text),
        'coleman_liau_index': textstat.coleman_liau_index(text),
        'dale_chall_readability_score': textstat.dale_chall_readability_score(text)
    }

# Function to get part of speech tagging
def get_pos_tags(doc):
    pos_counts = doc.count_by(spacy.attrs.POS)
    pos_data = {doc.vocab.strings[k]: v for k, v in pos_counts.items()}
    return pos_data

# Function to get named entities
def get_named_entities(doc):
    return [(ent.text, ent.label_) for ent in doc.ents]

# Function to perform sentiment analysis
def get_sentiment(text, language):
    if language == 'en':
        blob = TextBlob(text)
        return {
            'polarity': blob.sentiment.polarity,
            'subjectivity': blob.sentiment.subjectivity
        }
    else:
        # Use googletrans for translation
        translated = translator.translate(text, src=language, dest='en')
        translated_text = translated.text
        blob = TextBlob(translated_text)
        return {
            'polarity': blob.sentiment.polarity,
            'subjectivity': blob.sentiment.subjectivity
        }

# Function to get complexity measures
def get_complexity_measures(text):
    words = word_tokenize(text)
    sentences = sent_tokenize(text)
    word_lengths = [len(word) for word in words]
    sentence_lengths = [len(sent.split()) for sent in sentences]
    return {
        'average_word_length': sum(word_lengths) / len(word_lengths) if word_lengths else 0,
        'average_sentence_length': sum(sentence_lengths) / len(sentence_lengths) if sentence_lengths else 0,
        'lexical_density': len(set(words)) / len(words) if words else 0
    }

# Function to measure vocabulary sophistication
def get_vocabulary_sophistication(text):
    words = word_tokenize(text)
    rare_words = [word for word in words if word not in common_word_set]
    sophistication = len(rare_words) / len(words) if words else 0
    return sophistication * 100  # Scale to 0-100

# Function to measure grammar complexity
def get_grammar_complexity(doc):
    complexity = sum(1 for token in doc if token.dep_ in ['acl', 'advcl', 'relcl']) / len(doc) if len(doc) > 0 else 0
    return complexity * 100  # Scale to 0-100

# Function to measure cohesion and coherence
def get_cohesion_coherence(text):
    return textstat.text_standard(text, float_output=True)

# Function to measure idiomatic expressions
def get_idiomatic_expressions(text):
    idioms = ['piece of cake', 'once in a blue moon', 'break the ice']  # Add more idioms as needed
    count = sum(1 for idiom in idioms if idiom in text)
    return count / len(text.split()) if len(text.split()) > 0 else 0

# Function to measure frequency of new words
def get_new_word_frequency(text, known_words):
    words = word_tokenize(text)
    new_words = [word for word in words if word.lower() not in known_words]
    frequency = len(new_words) / len(words) if words else 0
    return frequency * 100  # Scale to 0-100

# Function to perform topic modeling
def get_topics(text, language, num_topics=5):
    nlp = nlp_en if language == 'en' else nlp_es if language == 'es' else nlp_de if language == 'de' else nlp_fr if language == 'fr' else nlp_it if language == 'it' else nlp_pt if language == 'pt' else nlp_nl
    doc = nlp(text)
    tokens = [token.text for token in doc if not token.is_stop and not token.is_punct]
    vectorizer = CountVectorizer(stop_words=None)
    X = vectorizer.fit_transform([' '.join(tokens)])
    lda = LatentDirichletAllocation(n_components=num_topics, random_state=0)
    lda.fit(X)
    terms = vectorizer.get_feature_names_out()
    topics = []
    for idx, topic in enumerate(lda.components_):
        top_terms = [terms[i] for i in topic.argsort()[:-6:-1]]
        topics.append((idx, top_terms))
    return topics

# Placeholder function to load weights from a database
def load_weights_from_db():
    return {
        'readability': 0.3,
        'complexity': 0.2,
        'vocabulary_sophistication': 0.15,
        'grammar_complexity': 0.15,
        'cohesion_coherence': 0.1,
        'idiomatic_expressions': 0.05,
        'new_word_frequency': 0.05,
    }

# Function to calculate difficulty score
def calculate_difficulty_score(analysis, weights):
    readability_scores = analysis['readability_scores']
    complexity_measures = analysis['complexity_measures']

    # Average readability scores (normalized to 0-100 scale)
    avg_readability = (
        readability_scores['flesch_reading_ease'] +
        readability_scores['flesch_kincaid_grade'] * 10 +  # Approximate normalization
        readability_scores['gunning_fog'] * 10 +  # Approximate normalization
        readability_scores['smog_index'] * 10 +  # Approximate normalization
        readability_scores['automated_readability_index'] * 10 +  # Approximate normalization
        readability_scores['coleman_liau_index'] * 10 +  # Approximate normalization
        readability_scores['dale_chall_readability_score'] * 10  # Approximate normalization
    ) / 7

    # Average complexity measures (normalized to 0-100 scale)
    avg_complexity = (
        complexity_measures['average_word_length'] * 10 +  # Approximate normalization
        complexity_measures['average_sentence_length'] * 10 +  # Approximate normalization
        complexity_measures['lexical_density'] * 100  # Lexical density is already on a 0-1 scale
    ) / 3

    # Combine all metrics using weights
    difficulty_score = (
        avg_readability * weights['readability'] + 
        avg_complexity * weights['complexity'] + 
        analysis['vocabulary_sophistication'] * weights['vocabulary_sophistication'] +
        analysis['grammar_complexity'] * weights['grammar_complexity'] +
        analysis['cohesion_coherence'] * weights['cohesion_coherence'] +
        analysis['idiomatic_expressions'] * weights['idiomatic_expressions'] +
        analysis['new_word_frequency'] * weights['new_word_frequency']
    )

    # Ensure score is between 0 and 100
    difficulty_score = max(0, min(difficulty_score, 100))

    return difficulty_score

# Function to get CEFR level based on difficulty score
def get_cefr_level(difficulty_score):
    if difficulty_score <= 10:
        return 'A1 (Beginner)'
    elif difficulty_score <= 30:
        return 'A2 (Elementary)'
    elif difficulty_score <= 55:
        return 'B1 (Intermediate)'
    elif difficulty_score <= 75:
        return 'B2 (Upper Intermediate)'
    elif difficulty_score <= 90:
        return 'C1 (Advanced)'
    else:
        return 'C2 (Proficiency)'

# Function to analyze text
def analyze_text(text, language, known_words):
    nlp = nlp_en if language == 'en' else nlp_es if language == 'es' else nlp_de if language == 'de' else nlp_fr if language == 'fr' else nlp_it if language == 'it' else nlp_pt if language == 'pt' else nlp_nl
    doc = nlp(text)

    analysis = {
        'basic_statistics': get_basic_statistics(text),
        'readability_scores': get_readability_scores(text),
        'pos_tags': get_pos_tags(doc),
        'named_entities': get_named_entities(doc),
        'sentiment': get_sentiment(text, language),
        'complexity_measures': get_complexity_measures(text),
        'vocabulary_sophistication': get_vocabulary_sophistication(text),
        'grammar_complexity': get_grammar_complexity(doc),
        'cohesion_coherence': get_cohesion_coherence(text),
        'idiomatic_expressions': get_idiomatic_expressions(text),
        'new_word_frequency': get_new_word_frequency(text, known_words),
        'topics': get_topics(text, language)
    }

    # Calculate difficulty score
    weights = load_weights_from_db()
    difficulty_score = calculate_difficulty_score(analysis, weights)
    analysis['difficulty_score'] = difficulty_score
    analysis['cefr_level'] = get_cefr_level(difficulty_score)

    return analysis

@app.route('/analyze', methods=['POST'])
def analyze():
    global global_analysis
    data = request.get_json()
    content = data.get('content')
    language = data.get('language', 'en')
    known_words = data.get('known_words', [])
    try:
        global_analysis = analyze_text(content, language, known_words)
        return redirect(url_for('results'))
    except Exception as e:
        app.logger.error(f"Error during text analysis: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/results', methods=['GET'])
def results():
    explanations = {
        'basic_statistics': "Basic statistics include word count, unique word count, sentence count, and paragraph count.",
        'readability_scores': "Readability scores indicate how easy or difficult it is to read the text. These scores include Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog Index, SMOG Index, Automated Readability Index, Coleman-Liau Index, and Dale-Chall Readability Score.",
        'pos_tags': "Part of Speech (POS) tagging identifies the grammatical categories of words in the text.",
        'named_entities': "Named entities are specific names or terms in the text, such as people, organizations, locations, etc.",
        'sentiment': "Sentiment analysis measures the polarity (positive or negative) and subjectivity (opinionated or factual) of the text.",
        'complexity_measures': "Complexity measures include average word length, average sentence length, and lexical density.",
        'vocabulary_sophistication': "Measures the frequency of advanced vocabulary or rare words in the text.",
        'grammar_complexity': "Analyzes the syntactic complexity of the text.",
        'cohesion_coherence': "Evaluates the logical flow and structure of the text.",
        'idiomatic_expressions': "Analyzes the usage of idioms and phrases.",
        'new_word_frequency': "Assesses how many new words are introduced relative to the learner's known vocabulary.",
        'topics': "Topic modeling identifies the main topics discussed in the text using Latent Dirichlet Allocation (LDA).",
        'difficulty_score': "The overall difficulty score of the text based on various metrics."
    }

    # Separate float values from the analysis and handle other types
    float_metrics = {}
    analysis_copy = {}
    for key, value in global_analysis.items():
        if isinstance(value, (int, float)):
            float_metrics[key] = value
        elif isinstance(value, dict):
            analysis_copy[key] = value
        elif isinstance(value, list):
            # Convert lists to a string representation
            analysis_copy[key] = value
        elif isinstance(value, str):
            float_metrics[key] = value
        else:
            app.logger.error(f"Unexpected data type for key {key}: {type(value)}")

    difficulty_score = float_metrics.get('difficulty_score', "N/A")
    cefr_level = float_metrics.get('cefr_level', "N/A")

    # Debugging: print the structure of analysis_copy
    app.logger.debug(f"analysis_copy: {json.dumps(analysis_copy, indent=2)}")

    return render_template('index.html', analysis=analysis_copy, explanations=explanations, difficulty_score=difficulty_score, cefr_level=cefr_level)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
