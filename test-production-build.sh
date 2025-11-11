#!/bin/bash
set -e

echo "================================"
echo "Testing Production Build Locally"
echo "================================"

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

echo "Building application..."
npm run build

echo ""
echo "Starting production server..."
echo "Server will run on http://localhost:3000"
echo "Press Ctrl+C to stop"
echo ""

PORT=3000 node build/index.js
