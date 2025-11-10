# NDC Packaging & Quantity Calculator - System Architecture

## Architecture Overview

This document describes the system architecture for the NDC Packaging & Quantity Calculator, a SvelteKit-based web application that provides AI-accelerated prescription fulfillment calculations. The architecture follows a server-side rendering pattern with secure API integrations and stateless request handling.

---

## Architecture Diagram

```mermaid
graph TB
    subgraph "Client Browser"
        subgraph "SvelteKit Application"
            UI[UI Components]
            
            subgraph "Routes & Pages"
                HomePage[HomePage<br/>Main Calculator Interface<br/>Input forms + Results display]
            end
            
            subgraph "Components Layer"
                DrugInput[Drug Input Component<br/>Drug name/NDC entry<br/>Autocomplete suggestions]
                PrescriptionForm[Prescription Form<br/>SIG input<br/>Days' supply entry]
                ResultsDisplay[Results Display<br/>Calculation breakdown<br/>NDC recommendations]
                NDCTable[NDC Table<br/>Package sizes<br/>Active status indicators]
                ErrorDisplay[Error Display<br/>Validation messages<br/>API error handling]
            end
            
            subgraph "Client-Side Services"
                APIClient[API Client<br/>Fetch wrapper<br/>Error handling]
                FormValidation[Form Validation<br/>Input sanitization<br/>Required field checks]
            end
            
            subgraph "Utilities"
                Formatters[Formatters<br/>formatNDC()<br/>formatQuantity()<br/>formatPercentage()]
                Validators[Validators<br/>validateNDC()<br/>validateSIG()<br/>validateDaysSupply()]
            end
        end
    end
    
    subgraph "SvelteKit Server (SSR)"
        subgraph "API Routes (+server.js)"
            NormalizeAPI[/api/normalize<br/>Drug normalization endpoint<br/>RxCUI lookup]
            CalculateAPI[/api/calculate<br/>Quantity calculation endpoint<br/>NDC recommendations]
        end
        
        subgraph "Server Services"
            RxNormService[RxNorm Service<br/>Drug name → RxCUI<br/>Drug info retrieval<br/>Synonym handling]
            FDAService[FDA NDC Service<br/>NDC directory queries<br/>Package size retrieval<br/>Active status checks]
            OpenAIService[OpenAI Service<br/>SIG parsing<br/>Dose extraction<br/>Natural language understanding]
            CalculationService[Calculation Service<br/>Quantity math<br/>Package optimization<br/>Overfill calculation]
        end
        
        subgraph "Server Utilities"
            APICache[API Response Cache<br/>In-memory caching<br/>TTL management]
            Logger[Logger<br/>Request logging<br/>Error tracking]
            RateLimiter[Rate Limiter<br/>Request throttling<br/>API quota management]
        end
    end
    
    subgraph "External APIs"
        subgraph "RxNorm API"
            RxNormAPI[NLM RxNorm API<br/>Drug normalization<br/>RxCUI resolution<br/>Free, no auth required]
        end
        
        subgraph "FDA APIs"
            FDAAPI[FDA NDC Directory<br/>Package data<br/>Active status<br/>Free, no auth required]
        end
        
        subgraph "OpenAI API"
            OpenAI[OpenAI Chat API<br/>GPT-4 for SIG parsing<br/>Requires API key]
        end
    end
    
    subgraph "Google Cloud Platform"
        subgraph "Cloud Run"
            Container[Docker Container<br/>SvelteKit app<br/>Auto-scaling<br/>HTTPS enabled]
        end
        
        subgraph "Secret Manager"
            Secrets[GCP Secret Manager<br/>OPENAI_API_KEY<br/>Environment config]
        end
        
        subgraph "Cloud Build (Optional)"
            CICD[Cloud Build<br/>Automated deployment<br/>Image building]
        end
    end
    
    %% User interactions
    User([Pharmacist/Technician]) -->|Enter prescription| UI
    
    %% Component connections
    HomePage --> DrugInput
    HomePage --> PrescriptionForm
    HomePage --> ResultsDisplay
    ResultsDisplay --> NDCTable
    UI --> ErrorDisplay
    
    %% Client to Server API calls
    DrugInput -->|POST drug name/NDC| APIClient
    PrescriptionForm -->|Submit prescription| APIClient
    APIClient -->|Validate inputs| FormValidation
    
    %% API Client to Server Routes
    APIClient -->|/api/normalize| NormalizeAPI
    APIClient -->|/api/calculate| CalculateAPI
    
    %% Server Routes to Services
    NormalizeAPI --> RxNormService
    NormalizeAPI --> Logger
    NormalizeAPI --> RateLimiter
    
    CalculateAPI --> RxNormService
    CalculateAPI --> FDAService
    CalculateAPI --> OpenAIService
    CalculateAPI --> CalculationService
    CalculateAPI --> Logger
    CalculateAPI --> RateLimiter
    
    %% Services to External APIs
    RxNormService -->|HTTP GET| RxNormAPI
    FDAService -->|HTTP GET| FDAAPI
    OpenAIService -->|HTTP POST| OpenAI
    
    %% Caching
    RxNormService -.->|Cache responses| APICache
    FDAService -.->|Cache responses| APICache
    APICache -.->|Return cached data| RxNormService
    APICache -.->|Return cached data| FDAService
    
    %% Utilities
    Formatters -.-> ResultsDisplay
    Formatters -.-> NDCTable
    Validators -.-> FormValidation
    
    %% GCP Infrastructure
    Container -->|Read secrets| Secrets
    UI -.->|Build & Deploy<br/>npm run build| CICD
    CICD -.->|Deploy image| Container
    User -->|HTTPS requests| Container
    
    %% Styling
    classDef client fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef server fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef external fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef gcp fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    classDef user fill:#fce4ec,stroke:#c2185b,stroke-width:3px
    
    class HomePage,DrugInput,PrescriptionForm,ResultsDisplay,NDCTable,ErrorDisplay,APIClient,FormValidation,Formatters,Validators client
    class NormalizeAPI,CalculateAPI,RxNormService,FDAService,OpenAIService,CalculationService,APICache,Logger,RateLimiter server
    class RxNormAPI,FDAAPI,OpenAI external
    class Container,Secrets,CICD gcp
    class User user
```

---

## System Components

### Frontend Architecture

#### 1. Routes & Pages

**HomePage (`src/routes/+page.svelte`)**
- **Purpose**: Main calculator interface combining all input and output components
- **Responsibilities**:
  - Render drug input form
  - Display prescription input fields
  - Show calculation results
  - Handle form submission
  - Manage loading states
- **State Management**: Component-level reactive state (Svelte stores not needed for MVP)

#### 2. Components Layer

**Drug Input Component (`src/lib/components/DrugInput.svelte`)**
- **Purpose**: Accept drug name or NDC as input
- **Features**:
  - Text input with autocomplete suggestions
  - Real-time validation
  - Drug/NDC format detection
  - Clear button
- **Props**: `value`, `onInput`, `error`, `suggestions`

**Prescription Form Component (`src/lib/components/PrescriptionForm.svelte`)**
- **Purpose**: Collect SIG and days' supply information
- **Features**:
  - Multi-line text input for SIG
  - Number input for days' supply
  - Input validation
  - Example SIG templates
- **Props**: `sig`, `daysSupply`, `onSigChange`, `onDaysSupplyChange`, `errors`

**Results Display Component (`src/lib/components/ResultsDisplay.svelte`)**
- **Purpose**: Show calculation results and recommendations
- **Features**:
  - Prescription summary card
  - Parsed SIG components
  - Total quantity calculation
  - Package recommendations
  - Overfill/underfill warnings
  - Copy to clipboard button
  - JSON export button
- **Props**: `result`, `loading`

**NDC Table Component (`src/lib/components/NDCTable.svelte`)**
- **Purpose**: Display all available NDCs with package information
- **Features**:
  - Sortable columns
  - Active/inactive status badges
  - Package size formatting
  - Selection highlighting
- **Props**: `ndcs`, `selectedNDCs`, `onSelect`

**Error Display Component (`src/lib/components/ErrorDisplay.svelte`)**
- **Purpose**: Show user-friendly error messages
- **Features**:
  - Error severity indicators (warning, error, info)
  - Suggested actions
  - Dismissible alerts
- **Props**: `errors`, `onDismiss`

#### 3. Client-Side Services

**API Client (`src/lib/services/apiClient.ts`)**
- **Responsibilities**:
  - Centralized fetch wrapper
  - Request/response handling
  - Error transformation
  - Loading state management
- **Key Functions**:
  - `normalizeDrug(input)`: Call /api/normalize
  - `calculateQuantity(rxcui, sig, daysSupply)`: Call /api/calculate

**Form Validation (`src/lib/services/validation.ts`)**
- **Responsibilities**:
  - Client-side input validation
  - Error message generation
  - Input sanitization
- **Key Functions**:
  - `validateDrugInput()`: Ensure drug name or valid NDC
  - `validateSIG()`: Check SIG is not empty
  - `validateDaysSupply()`: Ensure positive integer

#### 4. Utilities

**Formatters (`src/lib/utils/formatters.ts`)**
- `formatNDC(ndc)`: Format NDC in 5-4-2 pattern
- `formatQuantity(amount, unit)`: Format with proper units
- `formatPercentage(value)`: Format as percentage with 1 decimal
- `formatDate(timestamp)`: Format timestamps

**Validators (`src/lib/utils/validators.ts`)**
- `validateNDC(ndc)`: Check 11-digit NDC format
- `validateSIG(sig)`: Validate SIG string
- `validateDaysSupply(days)`: Validate positive integer
- `isValidRxCUI(rxcui)`: Check RxCUI format

---

### Backend Architecture (SvelteKit Server)

#### 1. API Routes

**Normalize API (`src/routes/api/normalize/+server.ts`)**
- **Purpose**: Drug normalization endpoint
- **HTTP Method**: POST
- **Request Body**:
  ```typescript
  {
    input: string; // Drug name or NDC
  }
  ```
- **Response Body**:
  ```typescript
  {
    success: boolean;
    rxcui?: string;
    drugName?: string;
    genericName?: string;
    brandNames?: string[];
    doseForm?: string;
    strength?: string;
    error?: string;
  }
  ```
- **Responsibilities**:
  - Validate input
  - Call RxNorm service
  - Handle errors
  - Return normalized drug data

**Calculate API (`src/routes/api/calculate/+server.ts`)**
- **Purpose**: NDC calculation and recommendation endpoint
- **HTTP Method**: POST
- **Request Body**:
  ```typescript
  {
    rxcui: string;
    sig: string;
    daysSupply: number;
  }
  ```
- **Response Body**: See Data Model section below
- **Responsibilities**:
  - Parse SIG using OpenAI
  - Retrieve NDCs from FDA
  - Calculate total quantity
  - Recommend optimal packages
  - Return comprehensive results

#### 2. Server Services

**RxNorm Service (`src/lib/server/services/rxnorm.ts`)**
- **Responsibilities**:
  - Interface with RxNorm API
  - Drug name to RxCUI resolution
  - Handle synonyms and brand names
  - Cache responses
- **Key Functions**:
  - `normalizeByName(drugName)`: Get RxCUI from drug name
  - `normalizeByNDC(ndc)`: Get RxCUI from NDC
  - `getDrugInfo(rxcui)`: Get detailed drug information
  - `searchDrugs(query)`: Search for drug suggestions
- **API Endpoint**: `https://rxnav.nlm.nih.gov/REST/`

**FDA NDC Service (`src/lib/server/services/fda.ts`)**
- **Responsibilities**:
  - Query FDA NDC Directory
  - Retrieve package sizes and types
  - Check active/inactive status
  - Filter by RxCUI
- **Key Functions**:
  - `getNDCsByRxCUI(rxcui)`: Get all NDCs for drug
  - `getNDCDetails(ndc)`: Get specific NDC information
  - `checkActiveStatus(ndc)`: Verify if NDC is active
  - `getPackageInfo(ndc)`: Get package size and type
- **API Endpoint**: `https://api.fda.gov/drug/ndc.json`

**OpenAI Service (`src/lib/server/services/openai.ts`)**
- **Responsibilities**:
  - Parse SIG instructions using GPT-4
  - Extract dose, frequency, and route
  - Handle natural language variations
- **Key Functions**:
  - `parseSIG(sig)`: Parse SIG into structured format
  - `extractDosage(sig)`: Extract dose per administration
  - `extractFrequency(sig)`: Extract frequency per day
  - `extractRoute(sig)`: Extract administration route
- **API Configuration**:
  - Model: `gpt-4o-mini` (cost-effective)
  - Temperature: 0.1 (deterministic)
  - Max tokens: 500

**Calculation Service (`src/lib/server/services/calculation.ts`)**
- **Responsibilities**:
  - Calculate total quantity needed
  - Optimize package selection
  - Calculate overfill/underfill
  - Handle different dosage forms
- **Key Functions**:
  - `calculateTotalQuantity(dose, frequency, days)`: Compute total
  - `optimizePackages(quantity, packages)`: Find best combination
  - `calculateOverfill(dispensed, needed)`: Compute waste
  - `formatRecommendation(packages, quantity)`: Structure output

#### 3. Server Utilities

**API Response Cache (`src/lib/server/utils/cache.ts`)**
- **Purpose**: In-memory caching for API responses
- **Features**:
  - LRU cache with TTL
  - Configurable max size
  - Cache key generation
  - Cache invalidation
- **Cache TTLs**:
  - RxNorm responses: 24 hours
  - FDA NDC data: 6 hours
  - OpenAI SIG parsing: 1 hour (per unique SIG)

**Logger (`src/lib/server/utils/logger.ts`)**
- **Purpose**: Request and error logging
- **Features**:
  - Structured logging
  - Different log levels (debug, info, warn, error)
  - Request ID tracking
  - Performance metrics
- **Log Destinations**:
  - Console (development)
  - Cloud Logging (production)

**Rate Limiter (`src/lib/server/utils/rateLimiter.ts`)**
- **Purpose**: Prevent API abuse and manage quotas
- **Features**:
  - IP-based rate limiting
  - Sliding window algorithm
  - Configurable limits per endpoint
- **Limits**:
  - /api/normalize: 60 requests/minute per IP
  - /api/calculate: 30 requests/minute per IP

---

## Data Flow Patterns

### 1. Drug Normalization Flow

```
User enters drug name
    ↓
DrugInput Component (validation)
    ↓
API Client (POST /api/normalize)
    ↓
Normalize API Route (+server.ts)
    ↓
Rate Limiter (check limits)
    ↓
RxNorm Service
    ↓
Check Cache (if hit, return cached)
    ↓
Call RxNorm API
    ↓
Cache Response (24h TTL)
    ↓
Return { rxcui, drugName, ... }
    ↓
API Client (receive response)
    ↓
Update UI with drug info
```

**Latency Target**: <2 seconds (cached: <100ms)

### 2. Full Calculation Flow

```
User submits prescription form
    ↓
PrescriptionForm Component (validation)
    ↓
API Client (POST /api/calculate)
    ↓
Calculate API Route (+server.ts)
    ↓
Rate Limiter (check limits)
    ↓
[Parallel Processing]
    ↓
├── OpenAI Service (parse SIG)
│   └── Extract dose, frequency, route
│
├── FDA Service (get NDCs)
│   └── Query by RxCUI, filter active
│
└── RxNorm Service (drug details)
    └── Get additional drug info
    ↓
[Combine Results]
    ↓
Calculation Service
    ↓
Calculate total quantity
    ↓
Optimize package selection
    ↓
Calculate overfill
    ↓
Format recommendation
    ↓
Return comprehensive response
    ↓
API Client (receive response)
    ↓
ResultsDisplay Component
    ↓
Show calculation breakdown
    ↓
Display recommended packages
```

**Latency Target**: <3 seconds

### 3. Error Handling Flow

```
API Error Occurs
    ↓
Catch in Service Layer
    ↓
Log Error (with context)
    ↓
Transform to User-Friendly Message
    ↓
Return { success: false, error: "..." }
    ↓
API Client (detect error)
    ↓
ErrorDisplay Component
    ↓
Show Error with Suggested Action
    ↓
User Can Retry or Modify Input
```

---

## Performance Characteristics

### Target Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Drug Normalization | <2s | API response time |
| Full Calculation | <3s | End-to-end request |
| SIG Parsing (OpenAI) | <1.5s | OpenAI API call |
| NDC Retrieval (FDA) | <1s | FDA API call |
| Cached Response | <100ms | In-memory lookup |
| Page Load (First Paint) | <1s | Lighthouse metric |
| Time to Interactive | <2s | Lighthouse metric |
| Concurrent Users | 50+ | Cloud Run auto-scaling |

### Optimization Strategies

**1. Response Caching**
- Cache RxNorm responses for 24 hours
- Cache FDA NDC data for 6 hours
- Cache parsed SIG results for 1 hour per unique SIG
- LRU eviction when cache full

**2. Parallel API Calls**
- Call OpenAI, FDA, and RxNorm concurrently where possible
- Use Promise.all() for parallel execution
- Reduces total wait time by ~40%

**3. API Request Optimization**
- Batch FDA queries when searching multiple NDCs
- Use minimal necessary fields in API requests
- Implement request deduplication

**4. Server-Side Rendering**
- Pre-render static content
- Reduce client-side JavaScript
- Faster initial page load

**5. Docker Image Optimization**
- Multi-stage build for smaller images
- Alpine Linux base image
- Minimize cold start time

---

## Security Architecture

### API Key Management

**GCP Secret Manager:**
- Store `OPENAI_API_KEY` securely
- Access via environment variables
- Never expose in client code
- Rotate keys periodically

**Environment Variables:**
```bash
OPENAI_API_KEY=sk-...        # From Secret Manager
NODE_ENV=production          # production | development
LOG_LEVEL=info               # debug | info | warn | error
CACHE_TTL_HOURS=24          # Cache expiration
RATE_LIMIT_WINDOW_MS=60000  # Rate limit window
```

### Data Security

**Input Sanitization:**
- Validate all user inputs server-side
- Strip HTML/script tags
- Limit input lengths
- Validate data types

**API Security:**
- HTTPS only (enforced by Cloud Run)
- CORS configuration for trusted origins
- Rate limiting per IP
- Request size limits

**No PII Storage:**
- No prescription data stored
- Stateless requests
- Logs contain no patient information
- HIPAA considerations addressed by design

### Security Rules

**Server-Side Validation:**
```typescript
// All API routes validate inputs
export async function POST({ request }) {
  const body = await request.json();
  
  // Validate required fields
  if (!body.rxcui || !body.sig || !body.daysSupply) {
    return json({ success: false, error: 'Missing required fields' }, { status: 400 });
  }
  
  // Sanitize inputs
  const sanitized = {
    rxcui: sanitizeRxCUI(body.rxcui),
    sig: sanitizeSIG(body.sig),
    daysSupply: sanitizeDaysSupply(body.daysSupply)
  };
  
  // Process request...
}
```

---

## Testing Strategy

### Unit Tests

**Framework**: Vitest (built-in with SvelteKit)

**Coverage Areas:**
- Utility functions (formatters, validators)
- Calculation logic (quantity calculations, package optimization)
- Service layer (RxNorm, FDA, OpenAI wrappers)
- Input sanitization and validation

**Example Tests:**
```typescript
// src/lib/utils/validators.test.ts
describe('validateNDC', () => {
  it('validates correct 11-digit NDC', () => {
    expect(validateNDC('00093-1234-01')).toBe(true);
  });
  
  it('rejects invalid NDC formats', () => {
    expect(validateNDC('123')).toBe(false);
  });
});

// src/lib/server/services/calculation.test.ts
describe('calculateTotalQuantity', () => {
  it('calculates simple tablet quantity', () => {
    const result = calculateTotalQuantity(2, 2, 30);
    expect(result).toBe(120); // 2 tablets × 2 times/day × 30 days
  });
});
```

### Integration Tests

**Framework**: Playwright

**Test Scenarios:**
1. Full normalization flow (input → API → result display)
2. Complete calculation flow (prescription → calculation → recommendations)
3. Error handling (invalid inputs, API failures)
4. Caching behavior (repeated requests)
5. Rate limiting (burst requests)

**Example Test:**
```typescript
// tests/integration/calculate.test.ts
test('full calculation flow', async ({ page }) => {
  await page.goto('/');
  
  // Enter drug name
  await page.fill('[data-testid="drug-input"]', 'lisinopril 10mg');
  await page.click('[data-testid="normalize-button"]');
  
  // Wait for normalization
  await expect(page.locator('[data-testid="rxcui"]')).toBeVisible();
  
  // Enter prescription details
  await page.fill('[data-testid="sig-input"]', 'Take 2 tablets by mouth twice daily');
  await page.fill('[data-testid="days-supply-input"]', '30');
  
  // Calculate
  await page.click('[data-testid="calculate-button"]');
  
  // Verify results
  await expect(page.locator('[data-testid="total-quantity"]')).toContainText('120');
  await expect(page.locator('[data-testid="ndc-table"]')).toBeVisible();
});
```

### API Testing

**Framework**: Vitest with supertest-style requests

**Test Scenarios:**
1. /api/normalize with valid drug names
2. /api/normalize with NDC codes
3. /api/calculate with complete prescription
4. Error responses for invalid inputs
5. Rate limiting enforcement

---

## Deployment Architecture

### Build Process

```bash
# Install dependencies
npm install

# Run linting
npm run lint

# Run type checking
npm run check

# Run tests
npm run test

# Build production bundle
npm run build
# Output: build/ directory (Node adapter)
```

### Docker Configuration

**Dockerfile:**
```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "build"]
```

**Image Size**: ~150MB (Alpine-based)

### Cloud Run Deployment

**Configuration:**
```yaml
# cloud-run.yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: ndc-calculator
spec:
  template:
    spec:
      containers:
      - image: gcr.io/[PROJECT_ID]/ndc-calculator
        ports:
        - containerPort: 3000
        env:
        - name: OPENAI_API_KEY
          valueFrom:
            secretKeyRef:
              name: openai-api-key
              key: latest
        resources:
          limits:
            memory: 512Mi
            cpu: "1"
      containerConcurrency: 80
      timeoutSeconds: 60
```

**Scaling Configuration:**
- Min instances: 0 (MVP) or 1 (production)
- Max instances: 10
- Target concurrency: 80 requests per instance
- Scale-down delay: 60 seconds

### Deployment Pipeline

**Manual Deployment:**
```bash
# Build and tag image
docker build -t gcr.io/[PROJECT_ID]/ndc-calculator:latest .

# Push to Container Registry
docker push gcr.io/[PROJECT_ID]/ndc-calculator:latest

# Deploy to Cloud Run
gcloud run deploy ndc-calculator \
  --image gcr.io/[PROJECT_ID]/ndc-calculator:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-secrets OPENAI_API_KEY=openai-api-key:latest
```

**Automated Deployment (Cloud Build):**
```yaml
# cloudbuild.yaml
steps:
  # Build Docker image
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/ndc-calculator:$COMMIT_SHA', '.']
  
  # Push to Container Registry
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/ndc-calculator:$COMMIT_SHA']
  
  # Deploy to Cloud Run
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      - 'run'
      - 'deploy'
      - 'ndc-calculator'
      - '--image'
      - 'gcr.io/$PROJECT_ID/ndc-calculator:$COMMIT_SHA'
      - '--region'
      - 'us-central1'
      - '--platform'
      - 'managed'
```

### Environment Configuration

**Development (.env):**
```env
OPENAI_API_KEY=sk-test-...
NODE_ENV=development
LOG_LEVEL=debug
PUBLIC_API_URL=http://localhost:5173
```

**Production (GCP Secret Manager):**
```bash
# Create secret
gcloud secrets create openai-api-key --data-file=./secret.txt

# Grant Cloud Run access
gcloud secrets add-iam-policy-binding openai-api-key \
  --member=serviceAccount:[SERVICE_ACCOUNT] \
  --role=roles/secretmanager.secretAccessor
```

---

## Scalability Considerations

### Current Capabilities (MVP)

1. **Stateless Architecture**: No session storage, fully horizontally scalable
2. **Auto-Scaling**: Cloud Run scales from 0 to 10 instances automatically
3. **Request Handling**: Each instance handles up to 80 concurrent requests
4. **Expected Load**: Supports 50+ concurrent users comfortably

### Performance Bottlenecks

**External API Dependencies:**
- RxNorm: 20 requests/second/IP (rate limited by NLM)
- FDA: 240 requests/minute/IP (rate limited by FDA)
- OpenAI: Depends on tier (free tier: 3 requests/minute)

**Mitigation Strategies:**
- Aggressive caching reduces API calls by 70-80%
- Rate limiting prevents quota exhaustion
- Graceful degradation on API failures

### Future Scalability Plans

**Phase 2 (1-100 concurrent users):**
- Increase Cloud Run max instances to 50
- Upgrade OpenAI tier for higher rate limits
- Implement Redis cache for distributed caching
- Add Cloud CDN for static assets

**Phase 3 (100-1000 concurrent users):**
- Multi-region deployment (US, EU)
- Load balancer with geographic routing
- Dedicated database for caching (Cloud Memorystore)
- API gateway for centralized rate limiting
- Consider FDA NDC data mirroring (if allowed)

**Phase 4 (1000+ concurrent users):**
- Kubernetes Engine for finer scaling control
- Message queue for async processing
- OpenAI batch API for non-urgent parsing
- Advanced monitoring and alerting
- SLA guarantees for uptime

---

## Monitoring & Observability

### Key Metrics to Monitor

**Application Metrics:**
- Request count per endpoint
- Response time percentiles (p50, p95, p99)
- Error rate by type
- Cache hit ratio
- Concurrent user count

**External API Metrics:**
- RxNorm API response time
- FDA API response time
- OpenAI API response time
- API error rates
- Rate limit proximity

**Infrastructure Metrics:**
- Cloud Run instance count
- CPU utilization
- Memory utilization
- Request queue depth
- Cold start frequency

**Business Metrics:**
- Successful calculations per hour
- Failed normalizations (drug not found)
- Average prescription complexity
- Most queried drugs

### Recommended Tools

**Google Cloud Operations Suite:**
- **Cloud Logging**: Centralized log aggregation
- **Cloud Monitoring**: Metrics and dashboards
- **Cloud Trace**: Request tracing and latency analysis
- **Error Reporting**: Automatic error detection and alerting

**Custom Dashboards:**
- Real-time request volume
- API response time trends
- Error rate alerts (>5% threshold)
- Cache performance metrics

**Alerting Rules:**
- Error rate >10% for 5 minutes
- Response time p95 >5 seconds
- OpenAI API quota approaching (>80%)
- Cloud Run instance count at max

---

## Technology Choices Rationale

### Why SvelteKit?

- **Fast Performance**: Compiles to vanilla JS, minimal runtime overhead
- **Developer Experience**: Simple, intuitive API with less boilerplate than React
- **Built-in SSR**: Server-side rendering improves SEO and initial load time
- **TypeScript Support**: First-class TypeScript integration
- **File-Based Routing**: Intuitive route structure
- **Small Bundle Size**: Typically 40-50% smaller than React equivalents

### Why Google Cloud Run?

- **Automatic Scaling**: Scales to zero when not in use (cost-effective)
- **Containerized**: Portable, can migrate to other platforms if needed
- **Managed Service**: No server management, automatic HTTPS
- **Pay-per-use**: Only pay for actual request time (not idle time)
- **Fast Deployments**: Deploy new versions in seconds
- **Integration**: Native integration with Secret Manager, Cloud Build

### Why OpenAI API for SIG Parsing?

- **Natural Language Understanding**: Handles variations and medical abbreviations
- **Reduced Development Time**: No need to build custom NLP model
- **Accuracy**: High accuracy with proper prompt engineering
- **Flexibility**: Easy to improve with prompt updates
- **Cost-Effective**: GPT-4-mini is sufficient and inexpensive (<$0.01 per calculation)

### Why In-Memory Caching vs External Cache?

- **Simplicity**: No additional infrastructure for MVP
- **Cost**: Zero additional cost
- **Latency**: Fastest possible cache hits (<1ms)
- **Sufficient for MVP**: Handles expected load without issues
- **Future Migration**: Can easily add Redis later if needed

---

## Known Issues & Limitations

### MVP Limitations

1. **No Persistent Storage**: Each request is independent, no history
2. **Single Region**: Deployed in one GCP region (US-Central1)
3. **No Authentication**: Anyone with URL can use the tool
4. **Rate Limiting Per IP**: Users on shared IPs (corporate networks) may be limited together
5. **No Offline Mode**: Requires internet for all API calls
6. **English Only**: SIG parsing optimized for English language
7. **Limited Dosage Forms**: Initial support covers common forms, may need expansion

### Technical Debt

1. **In-Memory Cache**: Will not scale beyond single instance without Redis
   - Plan: Migrate to Cloud Memorystore if load increases
2. **No Request Queuing**: Burst traffic could overwhelm external APIs
   - Plan: Implement message queue for non-urgent requests
3. **Basic Error Handling**: Some edge cases may not have ideal UX
   - Plan: Collect error patterns and improve messaging iteratively

---

## References

- **SvelteKit Documentation**: https://kit.svelte.dev/docs
- **RxNorm API Documentation**: https://lhncbc.nlm.nih.gov/RxNav/APIs/
- **FDA NDC Directory API**: https://open.fda.gov/apis/drug/ndc/
- **OpenAI API Documentation**: https://platform.openai.com/docs/api-reference
- **Google Cloud Run**: https://cloud.google.com/run/docs
- **Project PRD**: `PRD.md`
- **Task List**: `TASKS.md`

---

## Appendix: API Response Schemas

### RxNorm API Response

**Endpoint**: GET `/REST/rxcui.json?name={drugName}`

```json
{
  "idGroup": {
    "rxnormId": ["314076"]
  }
}
```

**Endpoint**: GET `/REST/rxcui/{rxcui}/property.json?propName=RxNorm Name`

```json
{
  "propConceptGroup": {
    "propConcept": [
      {
        "propValue": "Lisinopril 10 MG Oral Tablet"
      }
    ]
  }
}
```

### FDA NDC API Response

**Endpoint**: GET `/drug/ndc.json?search=openfda.rxcui:{rxcui}&limit=100`

```json
{
  "results": [
    {
      "product_ndc": "0093-1234",
      "generic_name": "LISINOPRIL",
      "brand_name": "LISINOPRIL",
      "dosage_form": "TABLET",
      "active_ingredients": [
        {
          "name": "LISINOPRIL",
          "strength": "10 mg/1"
        }
      ],
      "packaging": [
        {
          "package_ndc": "0093-1234-01",
          "description": "100 TABLET in 1 BOTTLE",
          "marketing_start_date": "20180101"
        }
      ],
      "labeler_name": "TEVA PHARMACEUTICALS USA INC",
      "openfda": {
        "rxcui": ["314076"]
      }
    }
  ]
}
```

### OpenAI API Response

**Endpoint**: POST `/v1/chat/completions`

**Request:**
```json
{
  "model": "gpt-4o-mini",
  "messages": [
    {
      "role": "system",
      "content": "You are a pharmacy assistant. Parse SIG instructions and return JSON with: dosePerAdministration (number), frequencyPerDay (number), route (string)."
    },
    {
      "role": "user",
      "content": "Take 2 tablets by mouth twice daily"
    }
  ],
  "temperature": 0.1,
  "max_tokens": 500
}
```

**Response:**
```json
{
  "choices": [
    {
      "message": {
        "content": "{\"dosePerAdministration\": 2, \"frequencyPerDay\": 2, \"route\": \"by mouth\"}"
      }
    }
  ]
}
```