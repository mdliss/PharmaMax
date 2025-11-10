# NDC Packaging & Quantity Calculator MVP - Product Requirements Document

**Project**: NDC Packaging & Quantity Calculator - AI-Accelerated Prescription Fulfillment Tool  
**Organization**: Foundation Health  
**Project ID**: hnCCiUa1F2Q7UU8GBlCe_1762540939252  
**Goal**: Enhance prescription fulfillment accuracy by matching prescriptions with valid NDCs and calculating correct dispense quantities

**Note**: Advanced features like pharmacy system integration, multi-location support, and comprehensive analytics are intentionally excluded from MVP and will be addressed in future phases.

---

## Core Architecture (MVP)

**Single Calculation Flow:**

- MVP features a stateless calculation tool - each query is independent
- No user authentication or session management in MVP
- Single shared calculation endpoint accessible to all users
- Future: Multi-user workspace, prescription history, batch processing

**URL Structure:**

- Static route: `/` - Main calculator interface
- API endpoint: `/api/calculate` - NDC calculation endpoint
- API endpoint: `/api/normalize` - Drug normalization endpoint

---

## User Stories

### Primary User: Pharmacist (MVP Priority)

- As a pharmacist, I want to **input a drug name and receive its RxCUI** so that I can standardize drug references
- As a pharmacist, I want to **input a prescription with SIG and days' supply** so that I can calculate the exact quantity to dispense
- As a pharmacist, I want to **see all valid NDCs with package sizes** so that I can choose the optimal packaging combination
- As a pharmacist, I want to **be warned about inactive NDCs** so that I can avoid claim rejections
- As a pharmacist, I want to **see quantity calculations broken down by package type** so that I can understand how to fill the prescription accurately

**Note:** Focus on completing all Pharmacist user stories before addressing Pharmacy Technician needs.

### Secondary User: Pharmacy Technician (Implement After Primary User)

- As a pharmacy technician, I want to **quickly verify NDC validity** so that I can assist with prescription processing
- As a pharmacy technician, I want to **see clear error messages** so that I can troubleshoot issues efficiently

---

## Key Features for MVP

### 1. Drug Normalization

**Must Have:**

- Text input for drug name or NDC (11-digit format)
- Call RxNorm API to normalize input to RxCUI
- Display drug name, RxCUI, and generic/brand information
- Handle common drug name variations and synonyms
- Error handling for unrecognized drugs

**Drug Search Logic:**

- Accept partial drug names and suggest matches
- Support both generic and brand name searches
- Display drug strength and dosage form
- Validate 11-digit NDC format (5-4-2 or 4-4-2 patterns)

**Success Criteria:**

- Drug normalization completes in <2 seconds
- 95%+ accuracy in matching common drug names to correct RxCUI
- Clear error messages for unrecognized inputs

### 2. Prescription Input

**Must Have:**

- **Text input fields** for:
  - Drug name or NDC (required)
  - SIG (e.g., "Take 2 tablets by mouth twice daily", required)
  - Days' supply (number, required)
- AI-powered SIG parsing using OpenAI API
- Extract dosage amount, frequency, and route from SIG
- Visual feedback for parsed SIG components
- Input validation and error messages

**SIG Parsing Behavior:**

- Use OpenAI to interpret natural language SIG instructions
- Extract: dose per administration, frequency per day, route
- Calculate total daily dose automatically
- Handle common SIG abbreviations (BID, TID, QID, etc.)

**Success Criteria:**

- SIG parsing accuracy of 90%+ for common prescriptions
- Clear display of parsed components for user verification
- Graceful handling of ambiguous or incomplete SIG instructions
- Input validation prevents submission of incomplete data

### 3. NDC Retrieval and Display

**Must Have:**

- Query FDA NDC Directory API with RxCUI
- Retrieve all valid NDCs for the drug
- Display NDC, package size, package type, and active status
- **Exclude inactive NDCs** (highlight if included for reference)
- Show package size in standardized units (tablets, mL, doses)
- Sort NDCs by package size (smallest to largest)
- Visual indicator for active vs inactive status

**NDC Display Section:**

- Tabular format with columns: NDC, Package Size, Package Type, Status
- Color coding: Green for active, Red for inactive
- Filter to show only active NDCs (default)
- Option to show inactive NDCs with warning labels

**Success Criteria:**

- All active NDCs retrieved from FDA database
- Inactive NDCs clearly marked and separated
- Package sizes displayed in consistent units
- Retrieval completes in <2 seconds

### 4. Quantity Calculation

**Must Have:**

- Calculate total quantity needed based on:
  - Dose per administration (from SIG)
  - Frequency per day (from SIG)
  - Days' supply (user input)
- Display total quantity in appropriate units
- Recommend optimal package combination to fulfill prescription
- Show overfill or underfill amounts if exact match not possible
- Support multiple package types (tablets, mL, inhalers, insulin units)

**Calculation Logic:**

- Total Quantity = (Dose × Frequency × Days' Supply)
- Find smallest combination of packages that meets or exceeds total quantity
- Prefer larger packages to minimize package count
- Calculate waste/overfill percentage
- Handle fractional doses (e.g., 1.5 tablets)

**Success Criteria:**

- Accurate quantity calculations for 100% of test cases
- Optimal package selection minimizes waste
- Clear display of calculation breakdown
- Support for at least 5 common dosage forms (tablets, capsules, mL, inhalers, insulin)

### 5. Results Display

**Must Have:**

- Summary card showing:
  - Drug name and RxCUI
  - Parsed SIG components
  - Total quantity needed
  - Recommended NDC(s) and package combination
  - Overfill/underfill amount and percentage
- Structured JSON output available for API integration
- Copy-to-clipboard functionality for results
- Print-friendly format

**Results Organization:**

- Top section: Prescription summary
- Middle section: Calculation breakdown
- Bottom section: Recommended package selection
- Warning section: Inactive NDCs or quantity mismatches

**Success Criteria:**

- Results are clear and easy to interpret
- All relevant information displayed without clutter
- JSON output is well-structured and machine-readable
- Copy and print functions work reliably

### 6. Error Handling and Validation

**Must Have:**

- Input validation for all required fields
- API error handling (RxNorm, FDA, OpenAI)
- User-friendly error messages
- Suggestions for correcting common errors
- Network failure handling with retry mechanism

**Success Criteria:**

- All errors display helpful messages (no raw API errors shown)
- Failed API calls retry automatically (up to 3 attempts)
- User is never left in uncertain state
- Clear guidance on how to proceed when errors occur

### 7. Performance Optimization

**Must Have:**

- Response time <2 seconds for normalization
- Response time <3 seconds for full calculation
- Efficient API call batching where possible
- Loading states for all async operations
- Timeout handling for slow API responses

**Success Criteria:**

- 95% of requests complete within target time
- Loading indicators appear for operations >500ms
- No UI freezing during API calls
- Graceful degradation if APIs are slow

### 8. Deployment

**Must Have:**

- Dockerized SvelteKit application
- Deployed on Google Cloud Run
- Environment variables for API keys (OpenAI, RxNorm, FDA)
- HTTPS enabled
- Public URL accessible without authentication

**Success Criteria:**

- Application is publicly accessible
- No API keys exposed in client-side code
- Supports at least 50 concurrent users
- Auto-scales based on demand

---

## Data Model

### API Request: `/api/normalize`

**Request Body:**

```json
{
  "input": "lisinopril 10mg" | "00093-1234-01"
}
```

**Response Body:**

```json
{
  "success": true,
  "rxcui": "314076",
  "drugName": "Lisinopril 10 MG Oral Tablet",
  "genericName": "Lisinopril",
  "brandNames": ["Prinivil", "Zestril"],
  "doseForm": "Oral Tablet",
  "strength": "10 MG"
}
```

### API Request: `/api/calculate`

**Request Body:**

```json
{
  "rxcui": "314076",
  "sig": "Take 2 tablets by mouth twice daily",
  "daysSupply": 30
}
```

**Response Body:**

```json
{
  "success": true,
  "prescription": {
    "rxcui": "314076",
    "drugName": "Lisinopril 10 MG Oral Tablet",
    "sig": "Take 2 tablets by mouth twice daily",
    "daysSupply": 30
  },
  "sigParsed": {
    "dosePerAdministration": 2,
    "frequencyPerDay": 2,
    "route": "by mouth",
    "totalDailyDose": 4
  },
  "calculation": {
    "totalQuantityNeeded": 120,
    "unit": "tablets"
  },
  "ndcs": [
    {
      "ndc": "00093-1234-01",
      "packageSize": 100,
      "packageType": "bottle",
      "isActive": true,
      "labelerName": "Teva Pharmaceuticals"
    },
    {
      "ndc": "00093-1234-10",
      "packageSize": 1000,
      "packageType": "bottle",
      "isActive": true,
      "labelerName": "Teva Pharmaceuticals"
    }
  ],
  "recommendation": {
    "packages": [
      {
        "ndc": "00093-1234-01",
        "quantity": 2,
        "totalUnits": 200
      }
    ],
    "totalDispensed": 200,
    "overfill": 80,
    "overfillPercentage": 66.7,
    "warnings": []
  }
}
```

---

## Proposed Tech Stack

### Recommended Stack (SvelteKit + GCP)

**Frontend:**

- SvelteKit with TypeScript
- File-based routing
- Server-side rendering for SEO
- TailwindCSS for styling

**Backend:**

- SvelteKit +server.js API routes
- OpenAI API for SIG parsing
- RxNorm API for drug normalization
- FDA NDC Directory API for NDC data

**Infrastructure:**

- Google Cloud Run (containerized deployment)
- Docker for containerization
- GCP Secret Manager for API keys
- Cloud Build for CI/CD (optional)

**Pros:**

- Fast development with SvelteKit's simple architecture
- TypeScript provides type safety
- Server-side API routes keep keys secure
- Cloud Run provides automatic scaling
- Pay-per-use pricing (cost-effective for MVP)
- Easy to deploy with Docker

**Cons:**

- Learning curve if team unfamiliar with Svelte
- Less mature ecosystem compared to React
- Fewer third-party components available

**Pitfalls to Watch:**

- API rate limits (RxNorm, FDA) - implement caching
- OpenAI costs can grow quickly - use prompt optimization
- Cloud Run cold starts - consider min instances for production
- Need to handle CORS carefully with API routes

---

## Out of Scope for MVP

### Features NOT Included:

- **User authentication and accounts** (no login required)
- **Prescription history or saved calculations** (stateless tool)
- **Multi-location or multi-pharmacy support** (single shared instance)
- **Integration with pharmacy management systems** (manual input only)
- **Batch processing of multiple prescriptions** (one at a time)
- Advanced drug interactions checking
- Insurance formulary checking
- Inventory management integration
- Mobile native apps (responsive web only)
- Custom drug database or offline mode

### Technical Items NOT Included:

- Sophisticated caching layer (can add if performance issues arise)
- Advanced analytics or usage tracking (basic logging only)
- User roles and permissions (no authentication)
- Multi-language support (English only)
- Real-time collaboration features
- Prescription image upload and OCR
- E-prescribing capabilities
- Audit trail or compliance reporting

---

## Known Limitations & Trade-offs

1. **No Authentication**: Anyone with the URL can use the tool (acceptable for MVP, security not a concern for calculation tool)
2. **No Prescription History**: Each calculation is independent (future: add user accounts and history)
3. **API Dependencies**: Reliant on external APIs (RxNorm, FDA, OpenAI) being available
4. **Rate Limits**: Subject to API rate limits (mitigation: implement basic caching)
5. **No Offline Mode**: Requires internet connection (acceptable for web-based MVP)
6. **English Only**: SIG parsing optimized for English language instructions
7. **Limited Dosage Forms**: Initial support for common forms (tablets, capsules, mL, inhalers, insulin)
8. **No Insurance Integration**: Cannot check formulary or coverage (manual verification required)

---

## Success Metrics for MVP Checkpoint

1. **Drug normalization accuracy** of 95%+ for common medications
2. **SIG parsing accuracy** of 90%+ for standard instructions
3. **Calculation accuracy** of 100% for all supported dosage forms
4. **Response time** <2s for normalization, <3s for full calculation
5. **Error rate** <5% for API calls (with retries)
6. **Deployed and accessible** via public Cloud Run URL

---

## MVP Testing Checklist

### Core Functionality:

- [ ] User can input drug name and receive RxCUI
- [ ] User can input 11-digit NDC and receive drug details
- [ ] User can input SIG and have it parsed correctly
- [ ] User can input days' supply as a number

### Normalization Operations:

- [ ] Can normalize common generic drug names (lisinopril, metformin, etc.)
- [ ] Can normalize brand drug names (Lipitor, Zestril, etc.)
- [ ] Can validate and look up NDC codes
- [ ] Displays error for unrecognized drugs
- [ ] Suggests corrections for misspelled drugs

### SIG Parsing:

- [ ] Parses "Take X tablets Y times daily" format
- [ ] Handles common abbreviations (BID, TID, QID)
- [ ] Extracts dose, frequency, and route correctly
- [ ] Displays parsed components for verification
- [ ] Shows warning for ambiguous SIG instructions

### NDC Retrieval:

- [ ] Retrieves all active NDCs for a drug
- [ ] Displays package sizes in correct units
- [ ] Marks inactive NDCs clearly (if shown)
- [ ] Sorts NDCs by package size
- [ ] Shows labeler name for each NDC

### Quantity Calculation:

- [ ] Calculates total quantity correctly for simple cases (e.g., 1 tablet twice daily for 30 days)
- [ ] Handles fractional doses (e.g., 1.5 tablets per dose)
- [ ] Recommends optimal package combination
- [ ] Shows overfill amount and percentage
- [ ] Works for multiple dosage forms (tablets, mL, etc.)

### Results Display:

- [ ] Shows prescription summary clearly
- [ ] Displays calculation breakdown
- [ ] Recommends specific NDCs and quantities
- [ ] Provides JSON output
- [ ] Copy-to-clipboard works
- [ ] Print-friendly format works

### Error Handling:

- [ ] Shows friendly error for invalid drug name
- [ ] Handles missing required fields gracefully
- [ ] Displays useful message when API is unavailable
- [ ] Retries failed API calls automatically
- [ ] Handles network timeouts appropriately

### Performance:

- [ ] Normalization completes in <2 seconds
- [ ] Full calculation completes in <3 seconds
- [ ] Loading states appear for operations >500ms
- [ ] No UI freezing during API calls
- [ ] Supports at least 10 concurrent calculations

---

## Risk Mitigation

**Biggest Risk:** External API dependencies (RxNorm, FDA, OpenAI) could be unavailable or rate-limited  
**Mitigation:** Implement retry logic with exponential backoff; add basic response caching for repeated queries; monitor API status and have fallback error messages

**Second Risk:** SIG parsing accuracy may be lower than target for complex instructions  
**Mitigation:** Use OpenAI with carefully crafted prompts and examples; allow users to manually override parsed values; collect failed cases for future improvement

**Third Risk:** NDC data from FDA may be incomplete or outdated  
**Mitigation:** Clearly communicate data source and freshness; provide ability to manually input NDC if not found; plan for periodic data refresh mechanism

**Fourth Risk:** Cloud Run cold starts could cause slow first requests  
**Mitigation:** Configure minimum instances for production (1-2); optimize Docker image size; implement warming strategy if needed