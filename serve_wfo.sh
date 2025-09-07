#!/bin/bash

# Script to serve wfo.html locally to avoid CORS issues
# This allows external background images to work properly

echo "🚀 Starting local server for wfo.html..."
echo "📁 Serving from: $(pwd)"
echo "🌐 Server will be available at: http://localhost:8000/wfo.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "✅ Using Python 3"
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✅ Using Python 2"
    python -m SimpleHTTPServer 8000
else
    echo "❌ Error: Python not found!"
    echo "Please install Python to use this script."
    exit 1
fi
