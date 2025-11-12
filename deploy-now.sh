#!/bin/bash
# Load .env and deploy in one command

# Load environment variables from .env file
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
    echo "✓ Loaded environment variables from .env"
else
    echo "❌ .env file not found"
    exit 1
fi

# Run the quick deploy
./quick-deploy.sh
