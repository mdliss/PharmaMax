#!/bin/bash
# Quick Deploy to Google Cloud Run with Demo Data

# Check for required environment variables
if [ -z "$DATABASE_URL" ] || [ -z "$OPENAI_API_KEY" ]; then
    echo "❌ Error: Required environment variables not set"
    echo ""
    echo "Please set:"
    echo "  export DATABASE_URL='postgresql://...'"
    echo "  export OPENAI_API_KEY='sk-...'"
    exit 1
fi

# Get project ID
PROJECT_ID=$(gcloud config get-value project 2>/dev/null)
if [ -z "$PROJECT_ID" ]; then
    echo "❌ Error: No GCloud project set"
    echo "Run: gcloud config set project YOUR_PROJECT_ID"
    exit 1
fi

echo "🚀 Deploying PharmaMax to Cloud Run..."
echo "   Project: $PROJECT_ID"
echo "   Auto-load demo data: YES"
echo ""

# Deploy with source-based deployment
gcloud run deploy pharmamax \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "DATABASE_URL=${DATABASE_URL},OPENAI_API_KEY=${OPENAI_API_KEY},PUBLIC_AUTO_LOAD_DEMO_DATA=true" \
  --set-build-env-vars "PUBLIC_AUTO_LOAD_DEMO_DATA=true" \
  --memory 1Gi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --timeout 300

echo ""
echo "✅ Deployment complete!"
echo "Demo data will auto-load on first visit"
