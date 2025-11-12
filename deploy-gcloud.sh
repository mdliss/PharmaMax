#!/bin/bash

# PharmaMax - Google Cloud Run Deployment Script
# This script builds and deploys PharmaMax with synthetic demo data pre-loaded

set -e

# Configuration
PROJECT_ID="${GCLOUD_PROJECT_ID:-your-project-id}"
SERVICE_NAME="${SERVICE_NAME:-pharmamax}"
REGION="${REGION:-us-central1}"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 PharmaMax Deployment to Google Cloud Run${NC}"
echo "================================================"

# Check if required environment variables are set
if [ -z "$DATABASE_URL" ]; then
    echo -e "${YELLOW}⚠️  Warning: DATABASE_URL not set${NC}"
    read -p "Enter DATABASE_URL: " DATABASE_URL
fi

if [ -z "$OPENAI_API_KEY" ]; then
    echo -e "${YELLOW}⚠️  Warning: OPENAI_API_KEY not set${NC}"
    read -p "Enter OPENAI_API_KEY: " OPENAI_API_KEY
fi

# Confirm demo data loading
echo -e "\n${BLUE}Demo Data Configuration:${NC}"
echo "The app will automatically load synthetic demo data on first visit."
echo "This includes:"
echo "  • 60 patient profiles"
echo "  • 223 prescription history entries"
echo "  • 158 inventory items (NDCs)"
echo ""
read -p "Auto-load demo data in production? (Y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Nn]$ ]]; then
    AUTO_LOAD_DEMO="false"
else
    AUTO_LOAD_DEMO="true"
fi

# Build the Docker image with build args
echo -e "\n${BLUE}🔨 Building Docker image...${NC}"
gcloud builds submit \
  --tag "${IMAGE_NAME}" \
  --project="${PROJECT_ID}" \
  --build-arg DATABASE_URL="${DATABASE_URL}" \
  --build-arg OPENAI_API_KEY="${OPENAI_API_KEY}" \
  --build-arg PUBLIC_AUTO_LOAD_DEMO_DATA="${AUTO_LOAD_DEMO}"

# Deploy to Cloud Run
echo -e "\n${BLUE}🚢 Deploying to Cloud Run...${NC}"
gcloud run deploy "${SERVICE_NAME}" \
  --image "${IMAGE_NAME}" \
  --platform managed \
  --region "${REGION}" \
  --project="${PROJECT_ID}" \
  --allow-unauthenticated \
  --set-env-vars "DATABASE_URL=${DATABASE_URL},OPENAI_API_KEY=${OPENAI_API_KEY},PUBLIC_AUTO_LOAD_DEMO_DATA=${AUTO_LOAD_DEMO}" \
  --memory 1Gi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --timeout 300

# Get the service URL
SERVICE_URL=$(gcloud run services describe "${SERVICE_NAME}" \
  --platform managed \
  --region "${REGION}" \
  --project="${PROJECT_ID}" \
  --format 'value(status.url)')

echo -e "\n${GREEN}✅ Deployment successful!${NC}"
echo "================================================"
echo -e "${GREEN}🌐 Service URL: ${SERVICE_URL}${NC}"
echo ""
echo "Demo Data Status: ${AUTO_LOAD_DEMO}"
if [ "$AUTO_LOAD_DEMO" = "true" ]; then
    echo "  → Demo data will auto-load on first visit"
else
    echo "  → Users must manually load demo data via UI"
fi
echo ""
echo "Next steps:"
echo "  1. Visit the URL above to access PharmaMax"
if [ "$AUTO_LOAD_DEMO" = "true" ]; then
    echo "  2. Demo data will load automatically"
else
    echo "  2. Click the database icon (bottom-left) to load demo data"
fi
echo "  3. Explore all features with realistic pharmacy data"
echo ""
