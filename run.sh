#!/bin/bash

# Legal Chatbot startup script
# This script starts the Flask backend server for the Legal Chatbot

echo "🚀 Starting Legal Chatbot Backend..."
echo "======================================"

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3 to continue."
    exit 1
fi

# Check if pip is available
if ! command -v pip3 &> /dev/null && ! command -v pip &> /dev/null; then
    echo "❌ pip is not installed. Please install pip to continue."
    exit 1
fi

# Install dependencies if requirements.txt exists
if [ -f "requirements.txt" ]; then
    echo "📦 Installing dependencies..."
    pip install -r requirements.txt
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies. Please check requirements.txt"
        exit 1
    fi
else
    echo "⚠️  requirements.txt not found. Make sure Flask and dependencies are installed."
fi

# Start the backend server
echo "🎯 Starting Flask server on http://127.0.0.1:5000"
echo "📄 Open index.html in your browser to use the chatbot"
echo "🛑 Press Ctrl+C to stop the server"
echo ""

cd backend && python app.py