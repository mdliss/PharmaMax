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

# Check if DATABASE_URL is provided
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  DATABASE_URL not found in environment"
    echo "Please run: export DATABASE_URL=your-database-url-here"
    echo "Or pass it directly in the deploy command"
    exit 1
fi

# Set project
echo "📦 Setting project to flightmax-5b191..."
gcloud config set project flightmax-5b191

# Enable required APIs
echo "🔧 Enabling required APIs..."
gcloud services enable cloudbuild.googleapis.com run.googleapis.com

# Deploy using Cloud Build
echo "🚢 Building and deploying to Cloud Run..."
gcloud builds submit \
  --config cloudbuild.yaml \
  --substitutions _OPENAI_API_KEY=$OPENAI_API_KEY,_DATABASE_URL=$DATABASE_URL

# Update service configuration
echo "⚙️  Updating service configuration..."
gcloud run services update pharmamax \
  --region us-central1 \
  --memory 512Mi \
  --timeout 300s \
  --max-instances 10

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Your app is now live on Google Cloud Run!"
echo "Access it at the URL shown above."
