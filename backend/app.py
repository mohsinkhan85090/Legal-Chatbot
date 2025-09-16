from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import json
import logging

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load sample legal data
def load_sample_data():
    """Load some sample legal responses for testing"""
    return {
        "default": "I'm a legal chatbot assistant. I can help you with Indian legal questions related to IPC, CrPC, Consumer Protection, and other legal matters. Please ask me a specific legal question.",
        "rights": "If you are detained by police, you have several fundamental rights: 1) Right to know the grounds of arrest, 2) Right to legal representation, 3) Right to remain silent, 4) Right to be produced before magistrate within 24 hours, 5) Right to inform family/friends about arrest.",
        "ipc": "The Indian Penal Code (IPC) is the main criminal code in India. It covers various offenses and their punishments. Could you please specify which section or type of offense you're asking about?",
        "consumer": "Under the Consumer Protection Act, consumers have rights against defective goods and deficient services. You can file complaints with Consumer Forums for compensation, replacement, or refund."
    }

# Global sample data
SAMPLE_DATA = load_sample_data()

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "Legal Chatbot API is running"})

@app.route('/chat', methods=['POST'])
def chat():
    """Main chat endpoint"""
    try:
        # Validate request
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400
        
        data = request.get_json()
        if not data or 'query' not in data:
            return jsonify({"error": "Missing 'query' field in request"}), 400
        
        user_query = data['query'].strip()
        if not user_query:
            return jsonify({"error": "Query cannot be empty"}), 400
        
        logger.info(f"Received query: {user_query}")
        
        # Generate response based on keywords (simple rule-based approach)
        response = generate_response(user_query)
        
        return jsonify({
            "answer": response,
            "status": "success"
        })
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        return jsonify({
            "error": "Internal server error",
            "answer": "I'm sorry, I encountered an error while processing your request. Please try again."
        }), 500

def generate_response(query):
    """Generate a response based on the user query"""
    query_lower = query.lower()
    
    # Simple keyword-based response matching
    if any(keyword in query_lower for keyword in ['rights', 'arrest', 'detained', 'police']):
        return SAMPLE_DATA['rights']
    elif any(keyword in query_lower for keyword in ['ipc', 'penal code', 'crime', 'offense']):
        return SAMPLE_DATA['ipc']
    elif any(keyword in query_lower for keyword in ['consumer', 'defective', 'goods', 'service']):
        return SAMPLE_DATA['consumer']
    elif any(keyword in query_lower for keyword in ['hello', 'hi', 'help', 'what']):
        return SAMPLE_DATA['default']
    else:
        # Generic legal response
        return f"Thank you for your legal question: '{query}'. This is a complex legal matter that may require specific analysis based on your circumstances. I recommend consulting with a qualified legal professional for personalized advice. However, I can provide general information about Indian laws - please feel free to ask about specific legal topics like IPC sections, consumer rights, or arrest procedures."

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    
    logger.info(f"Starting Legal Chatbot server on port {port}")
    app.run(host='0.0.0.0', port=port, debug=debug)