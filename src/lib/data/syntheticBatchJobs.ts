import type { BatchJob } from './syntheticTypes';

export const SYNTHETIC_BATCH_JOBS: BatchJob[] = [
  {
    "batchId": "BATCH-0001",
    "timestamp": 1684870200000,
    "prescriptions": [
      {
        "patientName": "Jamal Ferguson",
        "drugName": "Oxycodone 10 mg Tablet",
        "sig": "Take 1 tablet by mouth every 4 hours as needed for severe pain",
        "daysSupply": 7,
        "priority": "urgent"
      },
      {
        "patientName": "Caleb Dawson",
        "drugName": "Amphetamine/Dextroamphetamine 20 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Eleanor Price",
        "drugName": "Azithromycin 250 mg Tablet",
        "sig": "Take 2 tablets on day 1, then 1 tablet daily on days 2-5",
        "daysSupply": 5,
        "priority": "routine"
      },
      {
        "patientName": "Lucas59 Morgan",
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Malik Johnson",
        "drugName": "Amoxicillin 500 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily for 10 days",
        "daysSupply": 10,
        "priority": "urgent"
      },
      {
        "patientName": "Lucas59 Morgan",
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Ethan Nguyen",
        "drugName": "Fluticasone Inhaler 110 mcg/actuation Inhaler",
        "sig": "Inhale 1 puff by mouth twice daily",
        "daysSupply": 60,
        "priority": "routine"
      },
      {
        "patientName": "Amelia58 Clark",
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 90,
        "priority": "routine"
      }
    ],
    "status": "errors",
    "totalCount": 8,
    "completedCount": 5,
    "errorCount": 2,
    "processingTime": 1260,
    "pharmacist": "Jordan Patel"
  },
  {
    "batchId": "BATCH-0002",
    "timestamp": 1685453400000,
    "prescriptions": [
      {
        "patientName": "Amelia58 Clark",
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Jackson57 Lee",
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Jackson57 Lee",
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Mia56 Thompson",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Mia56 Thompson",
        "drugName": "30G Lancets 30 gauge Supply",
        "sig": "Use to obtain blood sample four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Mia56 Thompson",
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Mia56 Thompson",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Aiden55 Harper",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 14,
        "priority": "routine"
      }
    ],
    "status": "completed",
    "totalCount": 8,
    "completedCount": 7,
    "errorCount": 0,
    "processingTime": 1260,
    "pharmacist": "Priyanka Shah"
  },
  {
    "batchId": "BATCH-0003",
    "timestamp": 1686328200000,
    "prescriptions": [
      {
        "patientName": "Aiden55 Harper",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Aiden55 Harper",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Emma54 Lopez",
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Emma54 Lopez",
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Noah53 Simmons",
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Noah53 Simmons",
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Olivia52 Garcia",
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Olivia52 Garcia",
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30,
        "priority": "routine"
      }
    ],
    "status": "completed",
    "totalCount": 8,
    "completedCount": 8,
    "errorCount": 0,
    "processingTime": 1260,
    "pharmacist": "Lisa Hernandez"
  },
  {
    "batchId": "BATCH-0004",
    "timestamp": 1687293000000,
    "prescriptions": [
      {
        "patientName": "Liam51 Bennett",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Liam51 Bennett",
        "drugName": "30G Lancets 30 gauge Supply",
        "sig": "Use to obtain blood sample four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Liam51 Bennett",
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Liam51 Bennett",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Caleb50 Gibson",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 14,
        "priority": "routine"
      },
      {
        "patientName": "Caleb50 Gibson",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Caleb50 Gibson",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Sofia49 Ruiz",
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 90,
        "priority": "routine"
      }
    ],
    "status": "completed",
    "totalCount": 8,
    "completedCount": 7,
    "errorCount": 0,
    "processingTime": 1260,
    "pharmacist": "Amelia Johnson"
  },
  {
    "batchId": "BATCH-0005",
    "timestamp": 1688077800000,
    "prescriptions": [
      {
        "patientName": "Sofia49 Ruiz",
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Ethan48 Torres",
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Ethan48 Torres",
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Luna47 Stewart",
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Luna47 Stewart",
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Logan46 Kim",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Logan46 Kim",
        "drugName": "30G Lancets 30 gauge Supply",
        "sig": "Use to obtain blood sample four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Logan46 Kim",
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30,
        "priority": "routine"
      }
    ],
    "status": "completed",
    "totalCount": 8,
    "completedCount": 8,
    "errorCount": 0,
    "processingTime": 1260,
    "pharmacist": "Anthony Kim"
  },
  {
    "batchId": "BATCH-0006",
    "timestamp": 1689039000000,
    "prescriptions": [
      {
        "patientName": "Logan46 Kim",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Isabella45 Reed",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 14,
        "priority": "routine"
      },
      {
        "patientName": "Isabella45 Reed",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Isabella45 Reed",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Avery44 Sullivan",
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Avery44 Sullivan",
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Mason43 Foster",
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Mason43 Foster",
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30,
        "priority": "routine"
      }
    ],
    "status": "completed",
    "totalCount": 8,
    "completedCount": 7,
    "errorCount": 0,
    "processingTime": 1260,
    "pharmacist": "Jordan Patel"
  },
  {
    "batchId": "BATCH-0007",
    "timestamp": 1689917400000,
    "prescriptions": [
      {
        "patientName": "Zoe42 Ng",
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Zoe42 Ng",
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Elijah41 Wright",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Elijah41 Wright",
        "drugName": "30G Lancets 30 gauge Supply",
        "sig": "Use to obtain blood sample four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Elijah41 Wright",
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Elijah41 Wright",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Charlotte40 Diaz",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 14,
        "priority": "routine"
      },
      {
        "patientName": "Charlotte40 Diaz",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 90,
        "priority": "routine"
      }
    ],
    "status": "completed",
    "totalCount": 8,
    "completedCount": 7,
    "errorCount": 0,
    "processingTime": 1260,
    "pharmacist": "Priyanka Shah"
  },
  {
    "batchId": "BATCH-0008",
    "timestamp": 1690788600000,
    "prescriptions": [
      {
        "patientName": "Charlotte40 Diaz",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Lucas39 Morgan",
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Lucas39 Morgan",
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Amelia38 Clark",
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Amelia38 Clark",
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Jackson37 Lee",
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Jackson37 Lee",
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Mia36 Thompson",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 90,
        "priority": "routine"
      }
    ],
    "status": "completed",
    "totalCount": 8,
    "completedCount": 8,
    "errorCount": 0,
    "processingTime": 1260,
    "pharmacist": "Lisa Hernandez"
  },
  {
    "batchId": "BATCH-0009",
    "timestamp": 1691753400000,
    "prescriptions": [
      {
        "patientName": "Mia36 Thompson",
        "drugName": "30G Lancets 30 gauge Supply",
        "sig": "Use to obtain blood sample four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Mia36 Thompson",
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Mia36 Thompson",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Aiden35 Harper",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 14,
        "priority": "routine"
      },
      {
        "patientName": "Aiden35 Harper",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Aiden35 Harper",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Emma34 Lopez",
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Emma34 Lopez",
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30,
        "priority": "routine"
      }
    ],
    "status": "completed",
    "totalCount": 8,
    "completedCount": 7,
    "errorCount": 0,
    "processingTime": 1260,
    "pharmacist": "Amelia Johnson"
  },
  {
    "batchId": "BATCH-0010",
    "timestamp": 1692541800000,
    "prescriptions": [
      {
        "patientName": "Noah33 Simmons",
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Noah33 Simmons",
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Olivia32 Garcia",
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Olivia32 Garcia",
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Liam31 Bennett",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Liam31 Bennett",
        "drugName": "30G Lancets 30 gauge Supply",
        "sig": "Use to obtain blood sample four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Liam31 Bennett",
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Liam31 Bennett",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30,
        "priority": "routine"
      }
    ],
    "status": "completed",
    "totalCount": 8,
    "completedCount": 8,
    "errorCount": 0,
    "processingTime": 1260,
    "pharmacist": "Anthony Kim"
  },
  {
    "batchId": "BATCH-0011",
    "timestamp": 1693416600000,
    "prescriptions": [
      {
        "patientName": "Caleb30 Gibson",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 14,
        "priority": "routine"
      },
      {
        "patientName": "Caleb30 Gibson",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Caleb30 Gibson",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Sofia29 Ruiz",
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Sofia29 Ruiz",
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Ethan28 Torres",
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Ethan28 Torres",
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Luna27 Stewart",
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90,
        "priority": "routine"
      }
    ],
    "status": "completed",
    "totalCount": 8,
    "completedCount": 7,
    "errorCount": 0,
    "processingTime": 1260,
    "pharmacist": "Jordan Patel"
  },
  {
    "batchId": "BATCH-0012",
    "timestamp": 1694291400000,
    "prescriptions": [
      {
        "patientName": "Luna27 Stewart",
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Logan26 Kim",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Logan26 Kim",
        "drugName": "30G Lancets 30 gauge Supply",
        "sig": "Use to obtain blood sample four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Logan26 Kim",
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Logan26 Kim",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Isabella25 Reed",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 14,
        "priority": "routine"
      },
      {
        "patientName": "Isabella25 Reed",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Isabella25 Reed",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 30,
        "priority": "routine"
      }
    ],
    "status": "completed",
    "totalCount": 8,
    "completedCount": 7,
    "errorCount": 0,
    "processingTime": 1260,
    "pharmacist": "Priyanka Shah"
  },
  {
    "batchId": "BATCH-0013",
    "timestamp": 1695252600000,
    "prescriptions": [
      {
        "patientName": "Avery24 Sullivan",
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Avery24 Sullivan",
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Mason23 Foster",
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Mason23 Foster",
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Zoe22 Ng",
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Zoe22 Ng",
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Elijah21 Wright",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Elijah21 Wright",
        "drugName": "30G Lancets 30 gauge Supply",
        "sig": "Use to obtain blood sample four times daily",
        "daysSupply": 30,
        "priority": "routine"
      }
    ],
    "status": "completed",
    "totalCount": 8,
    "completedCount": 8,
    "errorCount": 0,
    "processingTime": 1260,
    "pharmacist": "Lisa Hernandez"
  },
  {
    "batchId": "BATCH-0014",
    "timestamp": 1696127400000,
    "prescriptions": [
      {
        "patientName": "Elijah21 Wright",
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Elijah21 Wright",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Charlotte20 Diaz",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 14,
        "priority": "routine"
      },
      {
        "patientName": "Charlotte20 Diaz",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Charlotte20 Diaz",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Lucas19 Morgan",
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Lucas19 Morgan",
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Amelia18 Clark",
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 90,
        "priority": "routine"
      }
    ],
    "status": "completed",
    "totalCount": 8,
    "completedCount": 7,
    "errorCount": 0,
    "processingTime": 1260,
    "pharmacist": "Amelia Johnson"
  },
  {
    "batchId": "BATCH-0015",
    "timestamp": 1697002200000,
    "prescriptions": [
      {
        "patientName": "Amelia18 Clark",
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Jackson17 Lee",
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Jackson17 Lee",
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Mia16 Thompson",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Mia16 Thompson",
        "drugName": "30G Lancets 30 gauge Supply",
        "sig": "Use to obtain blood sample four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Mia16 Thompson",
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Mia16 Thompson",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Aiden15 Harper",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 14,
        "priority": "routine"
      }
    ],
    "status": "completed",
    "totalCount": 8,
    "completedCount": 7,
    "errorCount": 0,
    "processingTime": 1260,
    "pharmacist": "Anthony Kim"
  },
  {
    "batchId": "BATCH-0016",
    "timestamp": 1697877000000,
    "prescriptions": [
      {
        "patientName": "Aiden15 Harper",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Aiden15 Harper",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Emma14 Lopez",
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Emma14 Lopez",
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Noah13 Simmons",
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Noah13 Simmons",
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Olivia12 Garcia",
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Olivia12 Garcia",
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30,
        "priority": "routine"
      }
    ],
    "status": "completed",
    "totalCount": 8,
    "completedCount": 8,
    "errorCount": 0,
    "processingTime": 1260,
    "pharmacist": "Jordan Patel"
  },
  {
    "batchId": "BATCH-0017",
    "timestamp": 1698841800000,
    "prescriptions": [
      {
        "patientName": "Liam11 Bennett",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Liam11 Bennett",
        "drugName": "30G Lancets 30 gauge Supply",
        "sig": "Use to obtain blood sample four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Liam11 Bennett",
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Liam11 Bennett",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Robert Ellis",
        "drugName": "Albuterol Inhaler 90 mcg/actuation Inhaler",
        "sig": "Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing",
        "daysSupply": 14,
        "priority": "routine"
      },
      {
        "patientName": "Robert Ellis",
        "drugName": "Albuterol Inhaler 90 mcg/actuation Inhaler",
        "sig": "Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Robert Ellis",
        "drugName": "Prednisone 10 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily with food",
        "daysSupply": 10,
        "priority": "routine"
      },
      {
        "patientName": "Robert Ellis",
        "drugName": "Fluticasone Inhaler 110 mcg/actuation Inhaler",
        "sig": "Inhale 1 puff by mouth twice daily",
        "daysSupply": 30,
        "priority": "routine"
      }
    ],
    "status": "completed",
    "totalCount": 8,
    "completedCount": 7,
    "errorCount": 0,
    "processingTime": 1260,
    "pharmacist": "Priyanka Shah"
  },
  {
    "batchId": "BATCH-0018",
    "timestamp": 1699709400000,
    "prescriptions": [
      {
        "patientName": "Robert Ellis",
        "drugName": "Albuterol Inhaler 90 mcg/actuation Inhaler",
        "sig": "Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Natalie Hoffman",
        "drugName": "Metoprolol 50 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Mia56 Thompson",
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Natalie Hoffman",
        "drugName": "Metoprolol 50 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Liam51 Bennett",
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Logan46 Kim",
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Elijah41 Wright",
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Mia36 Thompson",
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30,
        "priority": "routine"
      }
    ],
    "status": "completed",
    "totalCount": 8,
    "completedCount": 8,
    "errorCount": 0,
    "processingTime": 1260,
    "pharmacist": "Lisa Hernandez"
  },
  {
    "batchId": "BATCH-0019",
    "timestamp": 1700010000000,
    "prescriptions": [
      {
        "patientName": "Liam31 Bennett",
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Logan26 Kim",
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Elijah21 Wright",
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Mia16 Thompson",
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Liam11 Bennett",
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Robert Ellis",
        "drugName": "Fluticasone Inhaler 110 mcg/actuation Inhaler",
        "sig": "Inhale 1 puff by mouth twice daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Imani Rodgers",
        "drugName": "Lisinopril 10 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Caleb Dawson",
        "drugName": "Alprazolam 0.25 mg Tablet",
        "sig": "Take 1 tablet by mouth three times daily as needed for anxiety",
        "daysSupply": 30,
        "priority": "routine"
      }
    ],
    "status": "completed",
    "totalCount": 8,
    "completedCount": 8,
    "errorCount": 0,
    "processingTime": 1260,
    "pharmacist": "Amelia Johnson"
  },
  {
    "batchId": "BATCH-0020",
    "timestamp": 1700145000000,
    "prescriptions": [
      {
        "patientName": "Eleanor Price",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Imani Rodgers",
        "drugName": "Gabapentin 600 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Avery Chang",
        "drugName": "Alprazolam 0.5 mg Tablet",
        "sig": "Take 1 tablet by mouth three times daily as needed for anxiety",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Jamal Ferguson",
        "drugName": "Naloxone Nasal Spray 4 mg/0.1 mL Spray",
        "sig": "Administer 1 spray into one nostril for opioid overdose. Repeat with new device if needed.",
        "daysSupply": 365,
        "priority": "routine"
      },
      {
        "patientName": "Sofia Martinez",
        "drugName": "Vitamin D3 2000 IU Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Malik Johnson",
        "drugName": "Metformin 850 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Harriet Coleman",
        "drugName": "Atorvastatin 40 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily in the evening",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Ethan Nguyen",
        "drugName": "Fluticasone Inhaler 110 mcg/actuation Inhaler",
        "sig": "Inhale 1 puff by mouth twice daily",
        "daysSupply": 30,
        "priority": "routine"
      }
    ],
    "status": "completed",
    "totalCount": 8,
    "completedCount": 8,
    "errorCount": 0,
    "processingTime": 1260,
    "pharmacist": "Anthony Kim"
  },
  {
    "batchId": "BATCH-0021",
    "timestamp": 1700235000000,
    "prescriptions": [
      {
        "patientName": "Imani Rodgers",
        "drugName": "Lisinopril 10 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Imani Rodgers",
        "drugName": "Gabapentin 600 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Caleb Dawson",
        "drugName": "Amphetamine/Dextroamphetamine 20 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Caleb Dawson",
        "drugName": "Alprazolam 0.25 mg Tablet",
        "sig": "Take 1 tablet by mouth three times daily as needed for anxiety",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Caleb Dawson",
        "drugName": "Amphetamine/Dextroamphetamine 20 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Eleanor Price",
        "drugName": "Apixaban 5 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Eleanor Price",
        "drugName": "Lisinopril 40 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Eleanor Price",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30,
        "priority": "routine"
      }
    ],
    "status": "completed",
    "totalCount": 8,
    "completedCount": 8,
    "errorCount": 0,
    "processingTime": 1260,
    "pharmacist": "Jordan Patel"
  },
  {
    "batchId": "BATCH-0022",
    "timestamp": 1701192600000,
    "prescriptions": [
      {
        "patientName": "Eleanor Price",
        "drugName": "Apixaban 5 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Avery Chang",
        "drugName": "Escitalopram 20 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 14,
        "priority": "routine"
      },
      {
        "patientName": "Avery Chang",
        "drugName": "Escitalopram 20 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Avery Chang",
        "drugName": "Alprazolam 0.5 mg Tablet",
        "sig": "Take 1 tablet by mouth three times daily as needed for anxiety",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Avery Chang",
        "drugName": "Escitalopram 20 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Jamal Ferguson",
        "drugName": "Buprenorphine/Naloxone 8-2 mg Film",
        "sig": "Place 1 film under the tongue once daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Jamal Ferguson",
        "drugName": "Buprenorphine/Naloxone 8-2 mg Film",
        "sig": "Place 1 film under the tongue once daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Jamal Ferguson",
        "drugName": "Naloxone Nasal Spray 4 mg/0.1 mL Spray",
        "sig": "Administer 1 spray into one nostril for opioid overdose. Repeat with new device if needed.",
        "daysSupply": 365,
        "priority": "routine"
      }
    ],
    "status": "completed",
    "totalCount": 8,
    "completedCount": 6,
    "errorCount": 0,
    "processingTime": 1260,
    "pharmacist": "Priyanka Shah"
  },
  {
    "batchId": "BATCH-0023",
    "timestamp": 1702150200000,
    "prescriptions": [
      {
        "patientName": "Jamal Ferguson",
        "drugName": "Buprenorphine/Naloxone 8-2 mg Film",
        "sig": "Place 1 film under the tongue once daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Sofia Martinez",
        "drugName": "Prenatal Vitamin with Iron 27 mg iron Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Sofia Martinez",
        "drugName": "Vitamin D3 2000 IU Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Sofia Martinez",
        "drugName": "Prenatal Vitamin with Iron 27 mg iron Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Malik Johnson",
        "drugName": "Amlodipine 10 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Malik Johnson",
        "drugName": "Tramadol 50 mg Tablet",
        "sig": "Take 1 tablet by mouth every 6 hours as needed for pain",
        "daysSupply": 7,
        "priority": "routine"
      },
      {
        "patientName": "Malik Johnson",
        "drugName": "Metformin 850 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Malik Johnson",
        "drugName": "Amlodipine 10 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30,
        "priority": "routine"
      }
    ],
    "status": "completed",
    "totalCount": 8,
    "completedCount": 8,
    "errorCount": 0,
    "processingTime": 1260,
    "pharmacist": "Lisa Hernandez"
  },
  {
    "batchId": "BATCH-0024",
    "timestamp": 1703197800000,
    "prescriptions": [
      {
        "patientName": "Harriet Coleman",
        "drugName": "Lisinopril 20 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Harriet Coleman",
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Harriet Coleman",
        "drugName": "Metformin 1000 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Harriet Coleman",
        "drugName": "Atorvastatin 40 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily in the evening",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Harriet Coleman",
        "drugName": "Lisinopril 20 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30,
        "priority": "routine"
      },
      {
        "patientName": "Ethan Nguyen",
        "drugName": "Albuterol Inhaler 90 mcg/actuation Inhaler",
        "sig": "Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing",
        "daysSupply": 14,
        "priority": "routine"
      },
      {
        "patientName": "Ethan Nguyen",
        "drugName": "Albuterol Inhaler 90 mcg/actuation Inhaler",
        "sig": "Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Malik Johnson",
        "drugName": "Amlodipine 10 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30,
        "priority": "urgent"
      }
    ],
    "status": "errors",
    "totalCount": 8,
    "completedCount": 5,
    "errorCount": 2,
    "processingTime": 1260,
    "pharmacist": "Amelia Johnson"
  },
  {
    "batchId": "BATCH-0025",
    "timestamp": 1703820600000,
    "prescriptions": [
      {
        "patientName": "Jamal Ferguson",
        "drugName": "Buprenorphine/Naloxone 8-2 mg Film",
        "sig": "Place 1 film under the tongue once daily",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Eleanor Price",
        "drugName": "Apixaban 5 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Imani Rodgers",
        "drugName": "Gabapentin 600 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Robert Ellis",
        "drugName": "Albuterol Inhaler 90 mcg/actuation Inhaler",
        "sig": "Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Olivia12 Garcia",
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Emma14 Lopez",
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Mia16 Thompson",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Amelia18 Clark",
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30,
        "priority": "urgent"
      }
    ],
    "status": "errors",
    "totalCount": 8,
    "completedCount": 0,
    "errorCount": 8,
    "processingTime": 1260,
    "pharmacist": "Anthony Kim"
  },
  {
    "batchId": "BATCH-0026",
    "timestamp": 1703878200000,
    "prescriptions": [
      {
        "patientName": "Charlotte20 Diaz",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Zoe22 Ng",
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Ethan Nguyen",
        "drugName": "Albuterol Inhaler 90 mcg/actuation Inhaler",
        "sig": "Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing",
        "daysSupply": 90,
        "priority": "routine"
      },
      {
        "patientName": "Avery24 Sullivan",
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Logan26 Kim",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Ethan28 Torres",
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Caleb30 Gibson",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Olivia32 Garcia",
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30,
        "priority": "urgent"
      }
    ],
    "status": "errors",
    "totalCount": 8,
    "completedCount": 1,
    "errorCount": 7,
    "processingTime": 1260,
    "pharmacist": "Jordan Patel"
  },
  {
    "batchId": "BATCH-0027",
    "timestamp": 1703928600000,
    "prescriptions": [
      {
        "patientName": "Emma34 Lopez",
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Mia36 Thompson",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Amelia38 Clark",
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Charlotte40 Diaz",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Zoe42 Ng",
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Avery44 Sullivan",
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Logan46 Kim",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Ethan Nguyen",
        "drugName": "Fluticasone Inhaler 110 mcg/actuation Inhaler",
        "sig": "Inhale 1 puff by mouth twice daily",
        "daysSupply": 30,
        "priority": "routine"
      }
    ],
    "status": "errors",
    "totalCount": 8,
    "completedCount": 1,
    "errorCount": 7,
    "processingTime": 1260,
    "pharmacist": "Priyanka Shah"
  },
  {
    "batchId": "BATCH-0028",
    "timestamp": 1703979000000,
    "prescriptions": [
      {
        "patientName": "Ethan48 Torres",
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Caleb50 Gibson",
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Olivia52 Garcia",
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Emma54 Lopez",
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Mia56 Thompson",
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Amelia58 Clark",
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30,
        "priority": "urgent"
      },
      {
        "patientName": "Ethan Nguyen",
        "drugName": "Albuterol Inhaler 90 mcg/actuation Inhaler",
        "sig": "Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing",
        "daysSupply": 30,
        "priority": "routine"
      }
    ],
    "status": "errors",
    "totalCount": 7,
    "completedCount": 1,
    "errorCount": 6,
    "processingTime": 1215,
    "pharmacist": "Lisa Hernandez"
  }
] as const;
