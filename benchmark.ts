/**
 * Performance Benchmark Suite for PharmaMax API Endpoints
 * Tests API response times to ensure they meet the <2 second requirement
 */

interface BenchmarkResult {
	endpoint: string;
	testCase: string;
	responseTime: number;
	status: number;
	success: boolean;
	meetsRequirement: boolean;
}

interface BenchmarkSummary {
	totalTests: number;
	passed: number;
	failed: number;
	averageResponseTime: number;
	maxResponseTime: number;
	minResponseTime: number;
	allMeetRequirement: boolean;
}

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5173';
const REQUIREMENT_MS = 2000; // 2 second requirement from PRD

/**
 * Measure the response time of an API call
 */
async function measureEndpoint(
	endpoint: string,
	method: string,
	body?: any
): Promise<{ responseTime: number; status: number; success: boolean; error?: string }> {
	const startTime = performance.now();

	try {
		const response = await fetch(`${API_BASE_URL}${endpoint}`, {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: body ? JSON.stringify(body) : undefined
		});

		const endTime = performance.now();
		const responseTime = endTime - startTime;

		let error: string | undefined;
		if (!response.ok) {
			try {
				const data = await response.json();
				error = data.error || data.message || `HTTP ${response.status}`;
			} catch {
				error = `HTTP ${response.status}`;
			}
		}

		return {
			responseTime,
			status: response.status,
			success: response.ok,
			error
		};
	} catch (error) {
		const endTime = performance.now();
		return {
			responseTime: endTime - startTime,
			status: 0,
			success: false,
			error: error instanceof Error ? error.message : 'Unknown error'
		};
	}
}

/**
 * Run benchmark tests for all API endpoints
 */
async function runBenchmarks(): Promise<BenchmarkResult[]> {
	const results: BenchmarkResult[] = [];

	console.log('\n🚀 Starting Performance Benchmark Suite...\n');
	console.log(`API Base URL: ${API_BASE_URL}`);
	console.log(`Performance Requirement: <${REQUIREMENT_MS}ms\n`);
	console.log('─'.repeat(80));

	// Test 1: Normalize endpoint - simple drug name
	console.log('\n📊 Test 1: Drug Normalization (Aspirin)...');
	const test1 = await measureEndpoint('/api/normalize', 'POST', {
		input: 'Aspirin'
	});
	results.push({
		endpoint: '/api/normalize',
		testCase: 'Simple drug name (Aspirin)',
		responseTime: test1.responseTime,
		status: test1.status,
		success: test1.success,
		meetsRequirement: test1.responseTime < REQUIREMENT_MS
	});
	console.log(`   ⏱️  Response time: ${test1.responseTime.toFixed(2)}ms`);
	console.log(`   ${test1.responseTime < REQUIREMENT_MS ? '✅' : '❌'} ${test1.responseTime < REQUIREMENT_MS ? 'PASS' : 'FAIL'} - Requirement: <${REQUIREMENT_MS}ms`);
	if (test1.error) console.log(`   ⚠️  Error: ${test1.error}`);

	// Test 2: Normalize endpoint - complex drug name
	console.log('\n📊 Test 2: Drug Normalization (Lisinopril 10mg tablet)...');
	const test2 = await measureEndpoint('/api/normalize', 'POST', {
		input: 'Lisinopril 10mg tablet'
	});
	results.push({
		endpoint: '/api/normalize',
		testCase: 'Complex drug name (Lisinopril 10mg tablet)',
		responseTime: test2.responseTime,
		status: test2.status,
		success: test2.success,
		meetsRequirement: test2.responseTime < REQUIREMENT_MS
	});
	console.log(`   ⏱️  Response time: ${test2.responseTime.toFixed(2)}ms`);
	console.log(`   ${test2.responseTime < REQUIREMENT_MS ? '✅' : '❌'} ${test2.responseTime < REQUIREMENT_MS ? 'PASS' : 'FAIL'} - Requirement: <${REQUIREMENT_MS}ms`);
	if (test2.error) console.log(`   ⚠️  Error: ${test2.error}`);

	// Test 3: Calculate endpoint - simple SIG
	console.log('\n📊 Test 3: Quantity Calculation (Aspirin - Take 1 tablet daily)...');
	const test3 = await measureEndpoint('/api/calculate', 'POST', {
		rxcui: '1191',  // Aspirin RxCUI
		drugName: 'Aspirin 81mg',
		sig: 'Take 1 tablet by mouth daily',
		daysSupply: 30
	});
	results.push({
		endpoint: '/api/calculate',
		testCase: 'Simple SIG (1 tablet daily for 30 days)',
		responseTime: test3.responseTime,
		status: test3.status,
		success: test3.success,
		meetsRequirement: test3.responseTime < REQUIREMENT_MS
	});
	console.log(`   ⏱️  Response time: ${test3.responseTime.toFixed(2)}ms`);
	console.log(`   ${test3.responseTime < REQUIREMENT_MS ? '✅' : '❌'} ${test3.responseTime < REQUIREMENT_MS ? 'PASS' : 'FAIL'} - Requirement: <${REQUIREMENT_MS}ms`);
	if (test3.error) console.log(`   ⚠️  Error: ${test3.error}`);

	// Test 4: Calculate endpoint - complex SIG
	console.log('\n📊 Test 4: Quantity Calculation (Metformin - Complex dosing)...');
	const test4 = await measureEndpoint('/api/calculate', 'POST', {
		rxcui: '6809',  // Metformin RxCUI
		drugName: 'Metformin 500mg',
		sig: 'Take 1 tablet by mouth twice daily with meals',
		daysSupply: 30
	});
	results.push({
		endpoint: '/api/calculate',
		testCase: 'Complex SIG (twice daily for 30 days)',
		responseTime: test4.responseTime,
		status: test4.status,
		success: test4.success,
		meetsRequirement: test4.responseTime < REQUIREMENT_MS
	});
	console.log(`   ⏱️  Response time: ${test4.responseTime.toFixed(2)}ms`);
	console.log(`   ${test4.responseTime < REQUIREMENT_MS ? '✅' : '❌'} ${test4.responseTime < REQUIREMENT_MS ? 'PASS' : 'FAIL'} - Requirement: <${REQUIREMENT_MS}ms`);
	if (test4.error) console.log(`   ⚠️  Error: ${test4.error}`);

	// Test 5: Calculate endpoint - liquid formulation
	console.log('\n📊 Test 5: Quantity Calculation (Amoxicillin suspension)...');
	const test5 = await measureEndpoint('/api/calculate', 'POST', {
		rxcui: '723',  // Amoxicillin RxCUI
		drugName: 'Amoxicillin 250mg/5ml',
		sig: 'Take 10ml by mouth three times daily',
		daysSupply: 10
	});
	results.push({
		endpoint: '/api/calculate',
		testCase: 'Liquid formulation (10ml three times daily)',
		responseTime: test5.responseTime,
		status: test5.status,
		success: test5.success,
		meetsRequirement: test5.responseTime < REQUIREMENT_MS
	});
	console.log(`   ⏱️  Response time: ${test5.responseTime.toFixed(2)}ms`);
	console.log(`   ${test5.responseTime < REQUIREMENT_MS ? '✅' : '❌'} ${test5.responseTime < REQUIREMENT_MS ? 'PASS' : 'FAIL'} - Requirement: <${REQUIREMENT_MS}ms`);
	if (test5.error) console.log(`   ⚠️  Error: ${test5.error}`);

	// Test 6: Drug interaction checker
	console.log('\n📊 Test 6: Drug Interaction Check (2 drugs)...');
	const test6 = await measureEndpoint('/api/check-interaction', 'POST', {
		currentDrug: 'Aspirin 81mg',
		additionalMedication: 'Warfarin 5mg'
	});
	results.push({
		endpoint: '/api/check-interaction',
		testCase: 'Two-drug interaction check',
		responseTime: test6.responseTime,
		status: test6.status,
		success: test6.success,
		meetsRequirement: test6.responseTime < REQUIREMENT_MS
	});
	console.log(`   ⏱️  Response time: ${test6.responseTime.toFixed(2)}ms`);
	console.log(`   ${test6.responseTime < REQUIREMENT_MS ? '✅' : '❌'} ${test6.responseTime < REQUIREMENT_MS ? 'PASS' : 'FAIL'} - Requirement: <${REQUIREMENT_MS}ms`);
	if (test6.error) console.log(`   ⚠️  Error: ${test6.error}`);

	// Test 7: Drug interaction checker - another pair
	console.log('\n📊 Test 7: Drug Interaction Check (Metformin + Lisinopril)...');
	const test7 = await measureEndpoint('/api/check-interaction', 'POST', {
		currentDrug: 'Metformin 500mg',
		additionalMedication: 'Lisinopril 10mg'
	});
	results.push({
		endpoint: '/api/check-interaction',
		testCase: 'Four-drug interaction check',
		responseTime: test7.responseTime,
		status: test7.status,
		success: test7.success,
		meetsRequirement: test7.responseTime < REQUIREMENT_MS
	});
	console.log(`   ⏱️  Response time: ${test7.responseTime.toFixed(2)}ms`);
	console.log(`   ${test7.responseTime < REQUIREMENT_MS ? '✅' : '❌'} ${test7.responseTime < REQUIREMENT_MS ? 'PASS' : 'FAIL'} - Requirement: <${REQUIREMENT_MS}ms`);
	if (test7.error) console.log(`   ⚠️  Error: ${test7.error}`);

	return results;
}

/**
 * Calculate summary statistics from benchmark results
 */
function calculateSummary(results: BenchmarkResult[]): BenchmarkSummary {
	const responseTimes = results.map(r => r.responseTime);

	return {
		totalTests: results.length,
		passed: results.filter(r => r.meetsRequirement && r.success).length,
		failed: results.filter(r => !r.meetsRequirement || !r.success).length,
		averageResponseTime: responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length,
		maxResponseTime: Math.max(...responseTimes),
		minResponseTime: Math.min(...responseTimes),
		allMeetRequirement: results.every(r => r.meetsRequirement && r.success)
	};
}

/**
 * Display summary report
 */
function displaySummary(summary: BenchmarkSummary) {
	console.log('\n' + '═'.repeat(80));
	console.log('\n📈 BENCHMARK SUMMARY REPORT\n');
	console.log('─'.repeat(80));
	console.log(`Total Tests:              ${summary.totalTests}`);
	console.log(`Passed:                   ${summary.passed} ${summary.passed === summary.totalTests ? '✅' : ''}`);
	console.log(`Failed:                   ${summary.failed} ${summary.failed > 0 ? '❌' : ''}`);
	console.log('─'.repeat(80));
	console.log(`Average Response Time:    ${summary.averageResponseTime.toFixed(2)}ms`);
	console.log(`Min Response Time:        ${summary.minResponseTime.toFixed(2)}ms`);
	console.log(`Max Response Time:        ${summary.maxResponseTime.toFixed(2)}ms`);
	console.log(`Performance Requirement:  <${REQUIREMENT_MS}ms`);
	console.log('─'.repeat(80));

	if (summary.allMeetRequirement) {
		console.log('\n✅ SUCCESS: All API endpoints meet the <2 second performance requirement!');
	} else {
		console.log('\n❌ FAILED: Some endpoints do not meet the <2 second performance requirement.');
		console.log('   Optimization needed for endpoints exceeding the threshold.');
	}

	console.log('\n' + '═'.repeat(80) + '\n');
}

/**
 * Main execution
 */
async function main() {
	try {
		const results = await runBenchmarks();
		const summary = calculateSummary(results);
		displaySummary(summary);

		// Exit with appropriate code
		process.exit(summary.allMeetRequirement ? 0 : 1);
	} catch (error) {
		console.error('\n❌ Benchmark failed with error:', error);
		process.exit(1);
	}
}

// Run benchmarks
main();
