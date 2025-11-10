#!/bin/bash

# PharmaMax - Google Cloud Run Deployment Script

echo "🚀 Deploying PharmaMax to Google Cloud Run..."
echo ""

# Check if OPENAI_API_KEY is provided
if [ -z "$OPENAI_API_KEY" ]; then
    echo "⚠️  OPENAI_API_KEY not found in environment"
    echo "Please run: export OPENAI_API_KEY=your-key-here"
    echo "Or pass it directly in the deploy command"
    exit 1
fi

# Set project
echo "📦 Setting project to flightmax-5b191..."
gcloud config set project flightmax-5b191

# Enable required APIs
echo "🔧 Enabling required APIs..."
gcloud services enable cloudbuild.googleapis.com run.googleapis.com

# Deploy to Cloud Run
echo "🚢 Deploying to Cloud Run..."
gcloud run deploy pharmamax \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars OPENAI_API_KEY=$OPENAI_API_KEY \
  --memory 512Mi \
  --timeout 300s \
  --max-instances 10

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Your app is now live on Google Cloud Run!"
echo "Access it at the URL shown above."
