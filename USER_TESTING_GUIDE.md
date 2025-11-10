# PharmaMax - User Testing Guide

## Purpose
This guide helps pharmacy staff test PharmaMax and provide valuable feedback to improve the application.

## Test Scenarios

### Scenario 1: Basic Prescription Entry
**Objective**: Test basic prescription calculation workflow

**Steps**:
1. Enter drug name: "Lisinopril 10mg"
2. Enter SIG: "Take 1 tablet daily"
3. Enter quantity: 30
4. Click "Calculate Days Supply"
5. Review results

**Expected Results**:
- Drug normalized correctly
- Days supply calculated as 30 days
- NDC options displayed
- Package recommendations shown

**Questions**:
- Was the interface intuitive?
- Were the results clear and accurate?
- Any confusing elements?

---

### Scenario 2: Complex Dosing
**Objective**: Test AI SIG parsing with complex directions

**Test Cases**:
1. "Take 2 tablets twice daily with meals"
2. "Take 1 tablet every 12 hours"
3. "Take 1-2 tablets every 4-6 hours as needed for pain"
4. "Take 1 tablet in the morning and 2 at bedtime"

**Expected Results**:
- AI correctly interprets dosing frequency
- Total daily dose calculated accurately
- Days supply matches prescription intent

**Questions**:
- Did the AI interpret directions correctly?
- Any misinterpretations?
- Suggestions for improvement?

---

### Scenario 3: Package Optimization
**Objective**: Test NDC selection and waste calculation

**Steps**:
1. Enter prescription requiring 45 tablets
2. Review package recommendations
3. Note overfill percentage
4. Compare with your typical dispensing approach

**Expected Results**:
- Optimal package combination suggested
- Overfill/waste clearly shown
- Alternative packages visible

**Questions**:
- Does this match your usual package selection?
- Is the overfill calculation helpful?
- Would you change your dispensing based on this?

---

### Scenario 4: Error Handling
**Objective**: Test validation and error messages

**Test Cases**:
1. Enter invalid drug name
2. Leave SIG blank
3. Enter quantity of 0
4. Try unusual medication names

**Expected Results**:
- Clear error messages
- Helpful guidance provided
- No application crashes

**Questions**:
- Were error messages helpful?
- Any confusing validation?
- Suggestions for better messaging?

---

### Scenario 5: Real-World Workflow
**Objective**: Test with actual prescriptions from your pharmacy

**Steps**:
1. Select 5 recent prescriptions from your queue
2. Enter each into PharmaMax
3. Compare results with your actual dispensing
4. Note any discrepancies

**Expected Results**:
- Results match your professional judgment
- Calculation time is reasonable
- Output is useful for workflow

**Questions**:
- Would this save you time?
- Does it integrate with your current workflow?
- What features are missing?

---

## Feedback Collection

### General Usability
- [ ] Interface is clean and professional
- [ ] Navigation is intuitive
- [ ] Results are easy to understand
- [ ] Response time is acceptable
- [ ] Mobile/tablet experience is good

### Accuracy
- [ ] Drug normalization works correctly
- [ ] SIG parsing is accurate
- [ ] Days supply calculations are correct
- [ ] NDC suggestions are relevant
- [ ] Package recommendations are practical

### Features
Rate each feature (1-5 scale):
- Drug name search: ___/5
- SIG parsing: ___/5
- Days supply calculation: ___/5
- NDC lookup: ___/5
- Package recommendations: ___/5
- Copy functionality: ___/5
- Print functionality: ___/5

### Most Useful Features
1. _______________________
2. _______________________
3. _______________________

### Least Useful Features
1. _______________________
2. _______________________
3. _______________________

### Missing Features
What features would make this more useful?
_______________________________________
_______________________________________
_______________________________________

### Workflow Integration
- Would you use this daily? [ ] Yes [ ] No [ ] Maybe
- Estimated time saved per prescription: ______ seconds
- Would this reduce dispensing errors? [ ] Yes [ ] No [ ] Unsure
- Would this reduce medication waste? [ ] Yes [ ] No [ ] Unsure

### Concerns
- Privacy/security concerns: _______________________
- Reliability concerns: _______________________
- Training needs: _______________________
- Other: _______________________

### Improvement Suggestions
Priority 1 (Critical):
_______________________________________
_______________________________________

Priority 2 (Important):
_______________________________________
_______________________________________

Priority 3 (Nice to have):
_______________________________________
_______________________________________

### Overall Satisfaction
- Overall rating: ___/10
- Would recommend to colleagues: [ ] Yes [ ] No [ ] Maybe
- Would pay for this tool: [ ] Yes [ ] No [ ] Maybe

---

## Technical Feedback

### Performance
- Page load time: [ ] Fast [ ] Acceptable [ ] Slow
- Calculation speed: [ ] Fast [ ] Acceptable [ ] Slow
- Any lag or delays? _______________________

### Bugs/Issues Encountered
1. _______________________________________
2. _______________________________________
3. _______________________________________

### Browser/Device Used
- Browser: _______________________
- Device: _______________________
- Screen size: _______________________
- Any display issues? _______________________

---

## Tester Information (Optional)
- Pharmacy type: [ ] Community [ ] Hospital [ ] Specialty [ ] Other
- Years of experience: _______
- Typical daily prescription volume: _______
- Date of testing: _______________________

---

## Next Steps

After completing testing:
1. Submit feedback form
2. Share observations with development team
3. Participate in follow-up discussions
4. Test updated versions as improvements are made

## Contact
For questions or additional feedback, contact: [Insert contact info]

---

**Thank you for your time and valuable feedback!**
Your insights will help make PharmaMax a better tool for pharmacy professionals.
