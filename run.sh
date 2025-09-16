#!/bin/bash

# Legal Chatbot Development Script

echo "🚀 Legal Chatbot Development Environment"
echo "========================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if we're in the right directory
if [ ! -d "frontend" ]; then
    echo "❌ Frontend directory not found. Please run this from the project root."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install
    cd ..
fi

# Start the development server
echo "🎯 Starting React development server..."
echo "✨ The application will open at http://localhost:3000"
echo "🌙 Features: Dark/Light theme, English/Hindi language support"
echo "📱 Responsive design works on mobile and desktop"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

cd frontend && npm start
