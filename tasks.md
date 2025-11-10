# NDC Packaging & Quantity Calculator MVP - Development Task List

## Project File Structure

```
ndc-calculator/
├── src/
│   ├── routes/
│   │   ├── +page.svelte                 # Main calculator page
│   │   ├── +page.ts                     # Page load function
│   │   └── api/
│   │       ├── normalize/
│   │       │   └── +server.ts           # Drug normalization endpoint
│   │       └── calculate/
│   │           └── +server.ts           # Quantity calculation endpoint
│   ├── lib/
│   │   ├── components/
│   │   │   ├── DrugInput.svelte
│   │   │   ├── PrescriptionForm.svelte
│   │   │   ├── ResultsDisplay.svelte
│   │   │   ├── NDCTable.svelte
│   │   │   └── ErrorDisplay.svelte
│   │   ├── services/
│   │   │   ├── apiClient.ts            # Frontend API client
│   │   │   └── validation.ts           # Client-side validation
│   │   ├── server/
│   │   │   ├── services/
│   │   │   │   ├── rxnorm.ts           # RxNorm API service
│   │   │   │   ├── fda.ts              # FDA NDC API service
│   │   │   │   ├── openai.ts           # OpenAI API service
│   │   │   │   └── calculation.ts      # Calculation logic
│   │   │   └── utils/
│   │   │       ├── cache.ts            # API response cache
│   │   │       ├── logger.ts           # Logging utility
│   │   │       └── rateLimiter.ts      # Rate limiting
│   │   ├── utils/
│   │   │   ├── formatters.ts           # Display formatters
│   │   │   ├── validators.ts           # Validation functions
│   │   │   └── constants.ts            # App constants
│   │   └── types/
│   │       ├── drug.ts                 # Drug-related types
│   │       ├── prescription.ts         # Prescription types
│   │       └── api.ts                  # API response types
│   ├── app.html                        # HTML template
│   ├── app.css                         # Global styles
│   └── hooks.server.ts                 # Server hooks (logging, etc.)
├── tests/
│   ├── unit/
│   │   ├── utils/
│   │   │   ├── formatters.test.ts
│   │   │   └── validators.test.ts
│   │   └── server/
│   │       ├── calculation.test.ts
│   │       └── rxnorm.test.ts
│   └── integration/
│       ├── normalize.test.ts
│       └── calculate.test.ts
├── static/
│   └── favicon.png
├── .env.example
├── .env
├── .gitignore
├── Dockerfile
├── .dockerignore
├── cloudbuild.yaml
├── package.json
├── tsconfig.json
├── svelte.config.js
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## PR #1: Project Setup & Configuration

**Branch:** `setup/initial-config`  
**Goal:** Initialize SvelteKit project with all dependencies and GCP configuration

### Tasks:

- [ ] **1.1: Initialize SvelteKit + TypeScript Project**
  - Files to create: `package.json`, `svelte.config.js`, `vite.config.ts`
  - Run: `npm create svelte@latest ndc-calculator`
  - Select: Skeleton project, TypeScript, ESLint, Prettier
  - Verify dev server runs: `npm run dev`

- [ ] **1.2: Install Core Dependencies**
  - Files to update: `package.json`
  - Install:
    ```bash
    npm install openai
    npm install -D @tailwindcss/forms @tailwindcss/typography
    npm install -D vitest @vitest/ui
    npm install -D @playwright/test
    ```

- [ ] **1.3: Configure TailwindCSS**
  - Files to create: `tailwind.config.js`, `postcss.config.js`
  - Files to update: `src/app.css`
  - Run: `npx svelte-add@latest tailwindcss`
  - Add Tailwind directives to `app.css`
  - Verify Tailwind classes work with test component

- [ ] **1.4: Set Up Environment Variables**
  - Files to create: `.env`, `.env.example`
  - Add to `.env`:
    ```
    OPENAI_API_KEY=sk-...
    NODE_ENV=development
    LOG_LEVEL=debug
    PUBLIC_API_URL=http://localhost:5173
    ```
  - Add to `.env.example` (without actual keys)

- [ ] **1.5: Configure TypeScript**
  - Files to update: `tsconfig.json`
  - Add path aliases for `$lib/*`
  - Enable strict mode
  - Configure server vs client types

- [ ] **1.6: Create Type Definitions**
  - Files to create:
    - `src/lib/types/drug.ts`
    - `src/lib/types/prescription.ts`
    - `src/lib/types/api.ts`
  - Define interfaces for Drug, Prescription, NDC, API responses

- [ ] **1.7: Configure Git & .gitignore**
  - Files to create/update: `.gitignore`
  - Ensure `.env` is ignored
  - Add `node_modules/`, `build/`, `.svelte-kit/` to `.gitignore`

- [ ] **1.8: Create README with Setup Instructions**
  - Files to create: `README.md`
  - Include setup steps, env variables needed, run commands
  - Add project description and tech stack

**PR Checklist:**
- [ ] Dev server runs successfully (`npm run dev`)
- [ ] TypeScript compilation works (`npm run check`)
- [ ] TailwindCSS classes work in test component
- [ ] `.env` is in `.gitignore`
- [ ] All type definitions compile without errors

---

## PR #2: Utility Functions & Validation

**Branch:** `feature/utils-validation`  
**Goal:** Build foundational utility functions, validators, and formatters

### Tasks:

- [ ] **2.1: Create Constants File**
  - Files to create: `src/lib/utils/constants.ts`
  - Define:
    ```typescript
    export const NDC_FORMAT_REGEX = /^\d{5}-\d{4}-\d{2}$/;
    export const RXCUI_REGEX = /^\d{1,8}$/;
    export const MAX_SIG_LENGTH = 500;
    export const MAX_DAYS_SUPPLY = 365;
    export const CACHE_TTL_HOURS = 24;
    ```

- [ ] **2.2: Create Validator Functions**
  - Files to create: `src/lib/utils/validators.ts`
  - Implement:
    - `validateNDC(ndc: string): boolean`
    - `validateRxCUI(rxcui: string): boolean`
    - `validateSIG(sig: string): boolean`
    - `validateDaysSupply(days: number): boolean`
    - `sanitizeInput(input: string): string`

- [ ] **2.3: Create Formatter Functions**
  - Files to create: `src/lib/utils/formatters.ts`
  - Implement:
    - `formatNDC(ndc: string): string` (add dashes if missing)
    - `formatQuantity(amount: number, unit: string): string`
    - `formatPercentage(value: number): string`
    - `formatCurrency(amount: number): string`
    - `formatDate(date: Date): string`

- [ ] **2.4: Write Unit Tests for Validators**
  - Files to create: `tests/unit/utils/validators.test.ts`
  - Test all validator functions with valid/invalid inputs
  - Verify edge cases (empty strings, negative numbers, etc.)

- [ ] **2.5: Write Unit Tests for Formatters**
  - Files to create: `tests/unit/utils/formatters.test.ts`
  - Test all formatter functions
  - Verify formatting edge cases

- [ ] **2.6: Configure Vitest**
  - Files to update: `vite.config.ts`
  - Add Vitest configuration
  - Run: `npm run test` to verify tests pass

**PR Checklist:**
- [ ] All validator functions work correctly
- [ ] All formatter functions produce expected output
- [ ] Unit tests have 100% coverage for utils
- [ ] `npm run test` passes all tests
- [ ] TypeScript types are correct

---

## PR #3: RxNorm Service & Drug Normalization

**Branch:** `feature/rxnorm-service`  
**Goal:** Implement RxNorm API integration for drug normalization

### Tasks:

- [ ] **3.1: Create RxNorm Service**
  - Files to create: `src/lib/server/services/rxnorm.ts`
  - Implement:
    - `normalizeByName(drugName: string): Promise<RxNormResult>`
    - `normalizeByNDC(ndc: string): Promise<RxNormResult>`
    - `getDrugInfo(rxcui: string): Promise<DrugInfo>`
    - `searchDrugs(query: string): Promise<DrugSuggestion[]>`
  - Use fetch API for HTTP requests
  - Handle errors gracefully

- [ ] **3.2: Create API Response Cache**
  - Files to create: `src/lib/server/utils/cache.ts`
  - Implement simple in-memory LRU cache
  - Functions:
    - `get(key: string): Promise<any | null>`
    - `set(key: string, value: any, ttl: number): void`
    - `clear(): void`
  - Use Map for storage

- [ ] **3.3: Integrate Cache with RxNorm Service**
  - Files to update: `src/lib/server/services/rxnorm.ts`
  - Check cache before API calls
  - Store responses in cache with 24h TTL
  - Generate cache keys from request parameters

- [ ] **3.4: Create Logger Utility**
  - Files to create: `src/lib/server/utils/logger.ts`
  - Implement logging levels (debug, info, warn, error)
  - Log API calls and responses
  - Log errors with stack traces

- [ ] **3.5: Add Logging to RxNorm Service**
  - Files to update: `src/lib/server/services/rxnorm.ts`
  - Log all API requests
  - Log cache hits/misses
  - Log errors with context

- [ ] **3.6: Write Unit Tests for RxNorm Service**
  - Files to create: `tests/unit/server/rxnorm.test.ts`
  - Mock fetch API
  - Test normalization functions
  - Test error handling
  - Test cache integration

**PR Checklist:**
- [ ] RxNorm service successfully normalizes common drug names
- [ ] NDC lookup returns RxCUI
- [ ] Cache reduces API calls for repeated queries
- [ ] Errors are logged with useful context
- [ ] Unit tests pass with mocked API responses

---

## PR #4: Normalize API Endpoint

**Branch:** `feature/normalize-api`  
**Goal:** Create /api/normalize endpoint and connect frontend

### Tasks:

- [ ] **4.1: Create Normalize API Route**
  - Files to create: `src/routes/api/normalize/+server.ts`
  - Implement POST handler
  - Accept: `{ input: string }` (drug name or NDC)
  - Call RxNorm service
  - Return structured response with drug info

- [ ] **4.2: Add Input Validation**
  - Files to update: `src/routes/api/normalize/+server.ts`
  - Validate input is not empty
  - Sanitize input
  - Return 400 for invalid inputs

- [ ] **4.3: Add Rate Limiting**
  - Files to create: `src/lib/server/utils/rateLimiter.ts`
  - Implement IP-based rate limiting
  - Use sliding window algorithm
  - Limit: 60 requests/minute per IP for /api/normalize

- [ ] **4.4: Integrate Rate Limiter with API**
  - Files to update: `src/routes/api/normalize/+server.ts`
  - Check rate limit before processing
  - Return 429 if rate limited
  - Include retry-after header

- [ ] **4.5: Create Frontend API Client**
  - Files to create: `src/lib/services/apiClient.ts`
  - Implement:
    - `normalizeDrug(input: string): Promise<NormalizeResponse>`
  - Handle loading states
  - Handle errors
  - Transform API errors to user-friendly messages

- [ ] **4.6: Create Client-Side Validation**
  - Files to create: `src/lib/services/validation.ts`
  - Implement:
    - `validateDrugInput(input: string): ValidationResult`
  - Check input not empty
  - Check reasonable length

- [ ] **4.7: Write Integration Tests**
  - Files to create: `tests/integration/normalize.test.ts`
  - Test API endpoint with valid inputs
  - Test error cases
  - Test rate limiting

**PR Checklist:**
- [ ] POST /api/normalize works with drug names
- [ ] POST /api/normalize works with NDC codes
- [ ] Returns structured response with RxCUI and drug info
- [ ] Returns 400 for invalid inputs with helpful errors
- [ ] Rate limiting works (429 after 60 requests/minute)
- [ ] Integration tests pass

---

## PR #5: Drug Input Component & UI

**Branch:** `feature/drug-input-ui`  
**Goal:** Build drug input UI component with normalization

### Tasks:

- [ ] **5.1: Create Drug Input Component**
  - Files to create: `src/lib/components/DrugInput.svelte`
  - Props: `value`, `onNormalize`, `error`
  - Features:
    - Text input field
    - "Normalize" button
    - Loading state
    - Error display
  - Style with TailwindCSS

- [ ] **5.2: Add Input Validation to Component**
  - Files to update: `src/lib/components/DrugInput.svelte`
  - Validate on input change
  - Show validation errors
  - Disable normalize button if invalid

- [ ] **5.3: Create Error Display Component**
  - Files to create: `src/lib/components/ErrorDisplay.svelte`
  - Props: `errors`, `type` (error, warning, info)
  - Display errors with appropriate styling
  - Dismissible alerts

- [ ] **5.4: Create Main Page Layout**
  - Files to create: `src/routes/+page.svelte`
  - Page title and description
  - Include DrugInput component
  - Placeholder for prescription form
  - Placeholder for results

- [ ] **5.5: Integrate API Client with Drug Input**
  - Files to update: `src/routes/+page.svelte`
  - Handle normalize button click
  - Call apiClient.normalizeDrug()
  - Display normalized drug info
  - Show loading state during API call

- [ ] **5.6: Add Success State Display**
  - Files to update: `src/routes/+page.svelte`
  - Show RxCUI
  - Show drug name
  - Show generic/brand info
  - Show dosage form and strength

**PR Checklist:**
- [ ] Drug input field accepts text
- [ ] Normalize button calls API
- [ ] Loading spinner shows during API call
- [ ] Normalized drug info displays on success
- [ ] Validation errors show clearly
- [ ] API errors display with friendly messages
- [ ] UI is responsive and styled

---

## PR #6: FDA NDC Service

**Branch:** `feature/fda-service`  
**Goal:** Implement FDA NDC Directory API integration

### Tasks:

- [ ] **6.1: Create FDA NDC Service**
  - Files to create: `src/lib/server/services/fda.ts`
  - Implement:
    - `getNDCsByRxCUI(rxcui: string): Promise<NDC[]>`
    - `getNDCDetails(ndc: string): Promise<NDCDetails>`
    - `checkActiveStatus(ndc: string): Promise<boolean>`
    - `getPackageInfo(ndc: string): Promise<PackageInfo>`
  - Parse FDA API response format
  - Handle pagination if needed

- [ ] **6.2: Add Response Parsing Logic**
  - Files to update: `src/lib/server/services/fda.ts`
  - Parse packaging array from FDA response
  - Extract package size from description
  - Determine package type (bottle, box, etc.)
  - Convert to standardized format

- [ ] **6.3: Integrate Cache with FDA Service**
  - Files to update: `src/lib/server/services/fda.ts`
  - Cache FDA responses for 6 hours
  - Use RxCUI as cache key
  - Implement cache warming for common drugs (optional)

- [ ] **6.4: Add Error Handling**
  - Files to update: `src/lib/server/services/fda.ts`
  - Handle "no results found" gracefully
  - Handle API rate limits (retry with backoff)
  - Handle malformed responses

- [ ] **6.5: Add Logging**
  - Files to update: `src/lib/server/services/fda.ts`
  - Log all FDA API calls
  - Log parsing errors
  - Log rate limit hits

- [ ] **6.6: Write Unit Tests**
  - Files to create: `tests/unit/server/fda.test.ts`
  - Mock FDA API responses
  - Test NDC retrieval
  - Test package parsing
  - Test active status check

**PR Checklist:**
- [ ] FDA service retrieves NDCs by RxCUI
- [ ] Package sizes parsed correctly
- [ ] Active/inactive status determined correctly
- [ ] Caching works (6h TTL)
- [ ] Errors handled gracefully
- [ ] Unit tests pass

---

## PR #7: OpenAI SIG Parsing Service

**Branch:** `feature/openai-sig-parsing`  
**Goal:** Implement AI-powered SIG instruction parsing

### Tasks:

- [ ] **7.1: Create OpenAI Service**
  - Files to create: `src/lib/server/services/openai.ts`
  - Import OpenAI SDK
  - Initialize with API key from env
  - Implement error handling

- [ ] **7.2: Design SIG Parsing Prompt**
  - Files to update: `src/lib/server/services/openai.ts`
  - Create system prompt for pharmacy assistant role
  - Define JSON output format
  - Include examples of common SIG formats
  - Handle abbreviations (BID, TID, QID, etc.)

- [ ] **7.3: Implement parseSIG Function**
  - Files to update: `src/lib/server/services/openai.ts`
  - Function: `parseSIG(sig: string): Promise<ParsedSIG>`
  - Use GPT-4o-mini model
  - Temperature: 0.1 (deterministic)
  - Max tokens: 500
  - Return: `{ dosePerAdministration, frequencyPerDay, route }`

- [ ] **7.4: Add Response Validation**
  - Files to update: `src/lib/server/services/openai.ts`
  - Validate OpenAI response is valid JSON
  - Check required fields present
  - Fallback to default values if parsing fails

- [ ] **7.5: Integrate Cache with OpenAI Service**
  - Files to update: `src/lib/server/services/openai.ts`
  - Cache parsed SIG results (1h TTL)
  - Use SIG string as cache key (normalized)
  - Reduces OpenAI costs for repeated queries

- [ ] **7.6: Add Logging and Monitoring**
  - Files to update: `src/lib/server/services/openai.ts`
  - Log all OpenAI API calls
  - Log parsing failures
  - Track token usage
  - Monitor costs

- [ ] **7.7: Write Unit Tests**
  - Files to create: `tests/unit/server/openai.test.ts`
  - Mock OpenAI API
  - Test common SIG formats
  - Test abbreviation handling
  - Test error cases

**PR Checklist:**
- [ ] OpenAI service initializes correctly
- [ ] parseSIG extracts dose, frequency, route correctly
- [ ] Handles common abbreviations (BID, TID, etc.)
- [ ] Caching works (1h TTL)
- [ ] Validation catches malformed responses
- [ ] Unit tests pass with mocked API

---

## PR #8: Calculation Service

**Branch:** `feature/calculation-service`  
**Goal:** Build quantity calculation and package optimization logic

### Tasks:

- [ ] **8.1: Create Calculation Service**
  - Files to create: `src/lib/server/services/calculation.ts`
  - Implement core calculation functions
  - Pure functions (no side effects)

- [ ] **8.2: Implement Quantity Calculation**
  - Files to update: `src/lib/server/services/calculation.ts`
  - Function: `calculateTotalQuantity(dose, frequency, days): number`
  - Formula: dose × frequency × days
  - Handle fractional results
  - Round up to nearest unit

- [ ] **8.3: Implement Package Optimization**
  - Files to update: `src/lib/server/services/calculation.ts`
  - Function: `optimizePackages(totalQuantity, packages): PackageSelection[]`
  - Algorithm:
    1. Sort packages by size (descending)
    2. Greedy selection (use largest packages first)
    3. Minimize total package count
    4. Minimize waste
  - Return: Array of `{ ndc, quantity, totalUnits }`

- [ ] **8.4: Implement Overfill Calculation**
  - Files to update: `src/lib/server/services/calculation.ts`
  - Function: `calculateOverfill(dispensed, needed): OverfillResult`
  - Calculate absolute overfill: dispensed - needed
  - Calculate percentage: (overfill / needed) × 100
  - Return: `{ amount, percentage }`

- [ ] **8.5: Add Support for Different Unit Types**
  - Files to update: `src/lib/server/services/calculation.ts`
  - Handle tablets/capsules (integer units)
  - Handle mL (decimal units)
  - Handle inhalers (doses/actuations)
  - Handle insulin (units)

- [ ] **8.6: Write Comprehensive Unit Tests**
  - Files to create: `tests/unit/server/calculation.test.ts`
  - Test quantity calculation with various inputs
  - Test package optimization algorithms
  - Test overfill calculation
  - Test edge cases (fractional doses, large quantities)
  - Verify rounding behavior

**PR Checklist:**
- [ ] calculateTotalQuantity works for all test cases
- [ ] Package optimization minimizes waste
- [ ] Overfill percentage calculated correctly
- [ ] Supports tablets, mL, inhalers, insulin units
- [ ] Unit tests have 100% coverage
- [ ] All tests pass

---

## PR #9: Calculate API Endpoint

**Branch:** `feature/calculate-api`  
**Goal:** Create complete /api/calculate endpoint integrating all services

### Tasks:

- [ ] **9.1: Create Calculate API Route**
  - Files to create: `src/routes/api/calculate/+server.ts`
  - Implement POST handler
  - Accept: `{ rxcui, sig, daysSupply }`
  - Return comprehensive calculation result

- [ ] **9.2: Integrate OpenAI SIG Parsing**
  - Files to update: `src/routes/api/calculate/+server.ts`
  - Call OpenAI service to parse SIG
  - Extract dose, frequency, route
  - Handle parsing errors

- [ ] **9.3: Integrate FDA NDC Retrieval**
  - Files to update: `src/routes/api/calculate/+server.ts`
  - Call FDA service to get NDCs
  - Filter active NDCs only
  - Sort by package size

- [ ] **9.4: Integrate Calculation Service**
  - Files to update: `src/routes/api/calculate/+server.ts`
  - Calculate total quantity
  - Optimize package selection
  - Calculate overfill
  - Format recommendation

- [ ] **9.5: Implement Parallel API Calls**
  - Files to update: `src/routes/api/calculate/+server.ts`
  - Use Promise.all() for concurrent calls:
    - OpenAI SIG parsing
    - FDA NDC retrieval
    - RxNorm drug details (if needed)
  - Reduces total latency by ~40%

- [ ] **9.6: Add Comprehensive Error Handling**
  - Files to update: `src/routes/api/calculate/+server.ts`
  - Handle missing RxCUI
  - Handle SIG parsing failures
  - Handle no NDCs found
  - Return helpful error messages

- [ ] **9.7: Add Rate Limiting**
  - Files to update: `src/routes/api/calculate/+server.ts`
  - Limit: 30 requests/minute per IP
  - Return 429 with retry-after if exceeded

- [ ] **9.8: Add Response Logging**
  - Files to update: `src/routes/api/calculate/+server.ts`
  - Log successful calculations
  - Log errors with context
  - Track calculation metrics

- [ ] **9.9: Write Integration Tests**
  - Files to create: `tests/integration/calculate.test.ts`
  - Test complete calculation flow
  - Test with various drug types
  - Test error cases
  - Test rate limiting

**PR Checklist:**
- [ ] POST /api/calculate returns complete results
- [ ] SIG parsing works for common instructions
- [ ] NDCs retrieved and filtered correctly
- [ ] Quantity calculated accurately
- [ ] Package recommendations make sense
- [ ] Parallel API calls work (latency <3s)
- [ ] Rate limiting enforced (429 after 30 req/min)
- [ ] Integration tests pass

---

## PR #10: Prescription Form & Results Display

**Branch:** `feature/prescription-ui`  
**Goal:** Build prescription input form and results display components

### Tasks:

- [ ] **10.1: Create Prescription Form Component**
  - Files to create: `src/lib/components/PrescriptionForm.svelte`
  - Props: `rxcui`, `sig`, `daysSupply`, `onCalculate`, `loading`
  - Fields:
    - Multi-line textarea for SIG
    - Number input for days' supply
    - Calculate button
  - Validation and error display

- [ ] **10.2: Create Results Display Component**
  - Files to create: `src/lib/components/ResultsDisplay.svelte`
  - Props: `result`, `loading`
  - Sections:
    - Prescription summary
    - Parsed SIG components
    - Total quantity calculation
    - Package recommendations
    - Warnings (overfill, inactive NDCs)

- [ ] **10.3: Create NDC Table Component**
  - Files to create: `src/lib/components/NDCTable.svelte`
  - Props: `ndcs`, `selectedNDCs`
  - Columns: NDC, Package Size, Package Type, Status
  - Color coding: Green (active), Red (inactive)
  - Sortable columns

- [ ] **10.4: Add Copy to Clipboard Feature**
  - Files to update: `src/lib/components/ResultsDisplay.svelte`
  - Button to copy results as text
  - Button to copy results as JSON
  - Show "Copied!" confirmation

- [ ] **10.5: Add Print-Friendly Styling**
  - Files to update: `src/lib/components/ResultsDisplay.svelte`
  - Add `@media print` CSS rules
  - Hide unnecessary UI elements when printing
  - Ensure readability on paper

- [ ] **10.6: Integrate with Main Page**
  - Files to update: `src/routes/+page.svelte`
  - Show prescription form after successful normalization
  - Pass RxCUI from normalization to form
  - Handle calculate button click
  - Display results after calculation

- [ ] **10.7: Add Loading States**
  - Files to update: `src/routes/+page.svelte`
  - Show loading spinner during calculation
  - Disable form inputs during loading
  - Show progress indicator

**PR Checklist:**
- [ ] Prescription form accepts SIG and days' supply
- [ ] Form validation works (required fields)
- [ ] Calculate button triggers API call
- [ ] Results display shows all calculated data
- [ ] NDC table displays correctly with color coding
- [ ] Copy to clipboard works (text and JSON)
- [ ] Print view looks good
- [ ] Loading states work smoothly

---

## PR #11: Error Handling & Edge Cases

**Branch:** `fix/error-handling`  
**Goal:** Improve error handling and handle edge cases

### Tasks:

- [ ] **11.1: Improve API Error Messages**
  - Files to update: All API routes
  - Map technical errors to user-friendly messages
  - Provide actionable suggestions
  - Include error codes for debugging

- [ ] **11.2: Add Retry Logic for Failed API Calls**
  - Files to update: `src/lib/server/services/*.ts`
  - Implement exponential backoff
  - Max 3 retries
  - Only retry on transient errors (5xx, timeouts)

- [ ] **11.3: Handle "Drug Not Found" Gracefully**
  - Files to update: `src/routes/api/normalize/+server.ts`
  - Suggest similar drug names
  - Provide examples of valid formats
  - Link to NDC lookup tool

- [ ] **11.4: Handle "No NDCs Found" for Drug**
  - Files to update: `src/routes/api/calculate/+server.ts`
  - Check if drug is too generic
  - Suggest refining search with strength
  - Provide manual NDC entry option (future)

- [ ] **11.5: Handle Ambiguous SIG Instructions**
  - Files to update: `src/lib/server/services/openai.ts`
  - Detect low confidence parsing
  - Flag for user review
  - Allow manual override of parsed values

- [ ] **11.6: Add Input Sanitization**
  - Files to update: All API routes
  - Strip HTML tags
  - Limit input lengths
  - Validate data types

- [ ] **11.7: Add Network Timeout Handling**
  - Files to update: All service files
  - Set timeouts for all external API calls
  - 10s timeout for RxNorm
  - 15s timeout for FDA
  - 20s timeout for OpenAI

- [ ] **11.8: Create Error Boundary**
  - Files to create: `src/routes/+error.svelte`
  - Catch-all error page
  - Display friendly error message
  - Log errors for debugging

**PR Checklist:**
- [ ] Error messages are helpful and actionable
- [ ] Retry logic works for transient failures
- [ ] "Drug not found" handled gracefully
- [ ] "No NDCs found" handled gracefully
- [ ] Ambiguous SIG parsing flagged
- [ ] Input sanitization prevents XSS
- [ ] Timeouts prevent hanging requests
- [ ] Error boundary catches uncaught errors

---

## PR #12: Testing & Quality Assurance

**Branch:** `test/comprehensive-testing`  
**Goal:** Comprehensive testing and bug fixing

### Tasks:

- [ ] **12.1: End-to-End Testing Setup**
  - Files to create: `tests/e2e/calculator.test.ts`
  - Install Playwright: `npx playwright install`
  - Configure Playwright for SvelteKit

- [ ] **12.2: Write E2E Tests**
  - Files to update: `tests/e2e/calculator.test.ts`
  - Test complete user flow:
    1. Enter drug name → normalize
    2. View normalized drug info
    3. Enter SIG and days' supply
    4. Calculate quantity
    5. View results and recommendations
  - Test error cases
  - Test edge cases

- [ ] **12.3: Test with Real Drugs**
  - Manually test with:
    - Lisinopril 10mg
    - Metformin 500mg
    - Atorvastatin 20mg
    - Albuterol inhaler
    - Insulin glargine
  - Verify accuracy of all calculations
  - Document any issues

- [ ] **12.4: Performance Testing**
  - Test response times with real APIs
  - Verify <2s for normalization
  - Verify <3s for calculation
  - Test with slow network conditions
  - Test with API rate limiting

- [ ] **12.5: Accessibility Testing**
  - Run Lighthouse audit
  - Check keyboard navigation
  - Verify screen reader compatibility
  - Ensure sufficient color contrast
  - Add ARIA labels where needed

- [ ] **12.6: Cross-Browser Testing**
  - Test in Chrome, Firefox, Safari, Edge
  - Verify layout consistency
  - Check form functionality
  - Test API calls

- [ ] **12.7: Mobile Responsiveness**
  - Test on mobile viewport sizes
  - Verify touch interactions work
  - Check layout on small screens
  - Ensure forms are usable

- [ ] **12.8: Load Testing (Optional)**
  - Simulate 10-20 concurrent users
  - Monitor response times
  - Check for memory leaks
  - Verify auto-scaling works

**PR Checklist:**
- [ ] All E2E tests pass
- [ ] Manual testing with real drugs successful
- [ ] Response times meet targets
- [ ] Accessibility score >90
- [ ] Works in all major browsers
- [ ] Mobile responsive and usable
- [ ] No critical bugs found

---

## PR #13: Documentation & Polish

**Branch:** `docs/final-polish`  
**Goal:** Finalize documentation and UI polish

### Tasks:

- [ ] **13.1: Update README**
  - Files to update: `README.md`
  - Add project description
  - Add setup instructions
  - Add API documentation
  - Add deployment guide
  - Add contributing guidelines

- [ ] **13.2: Add Inline Code Comments**
  - Files to update: All service files
  - Document complex algorithms
  - Explain API interactions
  - Add JSDoc comments for functions

- [ ] **13.3: Create API Documentation**
  - Files to create: `docs/API.md`
  - Document /api/normalize endpoint
  - Document /api/calculate endpoint
  - Include request/response examples
  - Document error codes

- [ ] **13.4: UI Polish**
  - Files to update: All component files
  - Consistent spacing and alignment
  - Smooth transitions and animations
  - Improve button hover states
  - Polish loading indicators

- [ ] **13.5: Add Helpful Tooltips**
  - Files to update: Component files
  - Add tooltips for unclear fields
  - Explain technical terms (RxCUI, NDC)
  - Provide SIG examples

- [ ] **13.6: Add Example Prescriptions**
  - Files to update: `src/routes/+page.svelte`
  - Add "Try Example" button
  - Populate form with sample data
  - Include 3-4 common examples

- [ ] **13.7: Create User Guide**
  - Files to create: `docs/USER_GUIDE.md`
  - Step-by-step usage instructions
  - Troubleshooting section
  - FAQ section

- [ ] **13.8: Add Footer with Links**
  - Files to update: `src/routes/+page.svelte`
  - Add footer with project info
  - Link to documentation
  - Link to GitHub repo (if public)

**PR Checklist:**
- [ ] README is comprehensive and clear
- [ ] Code is well-commented
- [ ] API documentation is complete
- [ ] UI is polished and consistent
- [ ] Tooltips are helpful
- [ ] Example prescriptions work
- [ ] User guide is easy to follow
- [ ] Footer provides useful links

---

## PR #14: Docker & GCP Deployment

**Branch:** `deploy/gcp-cloud-run`  
**Goal:** Containerize application and deploy to Google Cloud Run

### Tasks:

- [ ] **14.1: Create Dockerfile**
  - Files to create: `Dockerfile`
  - Multi-stage build (builder + production)
  - Use node:20-alpine base image
  - Copy only necessary files
  - Set NODE_ENV=production

- [ ] **14.2: Create .dockerignore**
  - Files to create: `.dockerignore`
  - Exclude: node_modules, .git, .env, tests, .svelte-kit

- [ ] **14.3: Test Docker Build Locally**
  - Run: `docker build -t ndc-calculator .`
  - Run: `docker run -p 3000:3000 ndc-calculator`
  - Verify application works in container
  - Check image size (<200MB)

- [ ] **14.4: Set Up GCP Project**
  - Create new GCP project or use existing
  - Enable Cloud Run API
  - Enable Container Registry API
  - Enable Secret Manager API
  - Set up billing

- [ ] **14.5: Create GCP Secrets**
  - Create secret: `openai-api-key`
  - Add OPENAI_API_KEY value
  - Grant Cloud Run service account access

- [ ] **14.6: Configure Cloud Run Service**
  - Files to create: `cloud-run.yaml`
  - Set memory limit: 512Mi
  - Set CPU: 1
  - Set concurrency: 80
  - Set timeout: 60s
  - Set min instances: 0 (MVP)
  - Set max instances: 10

- [ ] **14.7: Build and Push Docker Image**
  - Tag image: `gcr.io/[PROJECT_ID]/ndc-calculator`
  - Push to Container Registry
  - Verify image in GCP console

- [ ] **14.8: Deploy to Cloud Run**
  - Deploy using gcloud CLI
  - Allow unauthenticated access
  - Map secrets to environment variables
  - Set region: us-central1

- [ ] **14.9: Configure Custom Domain (Optional)**
  - Map custom domain to Cloud Run service
  - Set up DNS records
  - Verify SSL certificate

- [ ] **14.10: Test Production Deployment**
  - Access deployed URL
  - Test all functionality
  - Verify environment variables loaded
  - Check logs in Cloud Logging

**PR Checklist:**
- [ ] Docker image builds successfully
- [ ] Application runs in Docker container
- [ ] Image size is optimized (<200MB)
- [ ] Deployed to Cloud Run
- [ ] Accessible via public URL
- [ ] Secrets loaded correctly
- [ ] All features work in production
- [ ] Logs appear in Cloud Logging

---

## PR #15: Monitoring & CI/CD (Optional)

**Branch:** `ops/monitoring-cicd`  
**Goal:** Set up monitoring, alerting, and automated deployment

### Tasks:

- [ ] **15.1: Set Up Cloud Logging Queries**
  - Create saved queries for:
    - Error logs
    - API call logs
    - Calculation logs
  - Set log retention policy

- [ ] **15.2: Create Cloud Monitoring Dashboard**
  - Add charts for:
    - Request count per endpoint
    - Response time (p50, p95, p99)
    - Error rate
    - Cache hit ratio
    - Active instances

- [ ] **15.3: Set Up Alerting**
  - Alert on error rate >10%
  - Alert on response time p95 >5s
  - Alert on instance count at max
  - Alert on OpenAI quota approaching
  - Send alerts to email or Slack

- [ ] **15.4: Create Cloud Build Configuration**
  - Files to create: `cloudbuild.yaml`
  - Define build steps:
    1. Build Docker image
    2. Push to Container Registry
    3. Deploy to Cloud Run
  - Run tests before deployment

- [ ] **15.5: Set Up Automated Deployments**
  - Connect GitHub repo to Cloud Build
  - Trigger on push to main branch
  - Automatic deployment after successful build
  - Rollback capability

- [ ] **15.6: Add Health Check Endpoint**
  - Files to create: `src/routes/health/+server.ts`
  - Return 200 if application healthy
  - Check external API connectivity
  - Cloud Run uses for health checks

- [ ] **15.7: Add Metrics Endpoint (Optional)**
  - Files to create: `src/routes/metrics/+server.ts`
  - Expose Prometheus-style metrics
  - Request count, latency, error rate
  - Cache statistics

**PR Checklist:**
- [ ] Logs are queryable in Cloud Logging
- [ ] Dashboard shows key metrics
- [ ] Alerts configured and tested
- [ ] Automated deployment works
- [ ] Health check endpoint responds
- [ ] Monitoring provides useful insights

---

## MVP Completion Checklist

### Required Features:

- [ ] Drug normalization (name → RxCUI)
- [ ] NDC validation and lookup
- [ ] SIG parsing with AI
- [ ] Quantity calculation
- [ ] Package optimization
- [ ] Overfill calculation
- [ ] Active NDC filtering
- [ ] Real-time error handling
- [ ] Responsive web UI
- [ ] Deployed to Cloud Run

### Performance Targets:

- [ ] Normalization <2 seconds
- [ ] Full calculation <3 seconds
- [ ] SIG parsing <1.5 seconds
- [ ] Cached requests <100ms
- [ ] Supports 50+ concurrent users
- [ ] 95% uptime

### Testing Scenarios:

- [ ] Common medications (Lisinopril, Metformin, Atorvastatin)
- [ ] Different dosage forms (tablets, liquids, inhalers)
- [ ] Various SIG formats (with abbreviations)
- [ ] Edge cases (fractional doses, large quantities)
- [ ] Error cases (invalid drug, no NDCs, API failures)
- [ ] Rate limiting enforcement
- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness

### Documentation:

- [ ] README with setup instructions
- [ ] API documentation
- [ ] User guide
- [ ] Code comments and JSDoc
- [ ] Deployment guide

---

## Post-MVP: Phase 2 Preparation

**Next PRs (After MVP Deadline):**

- PR #16: User Authentication & Accounts
- PR #17: Prescription History & Saved Calculations
- PR #18: Batch Processing (Multiple Prescriptions)
- PR #19: Advanced Dosage Form Support (Transdermal, IV)
- PR #20: Insurance Formulary Integration
- PR #21: Pharmacy System Integration API
- PR #22: Advanced Analytics Dashboard
- PR #23: Multi-Language Support
- PR #24: Offline Mode with Service Worker
- PR #25: Mobile Native Apps (React Native)