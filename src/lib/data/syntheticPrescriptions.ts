import type { PrescriptionHistoryEntry } from './syntheticTypes';

export const SYNTHETIC_PRESCRIPTIONS: PrescriptionHistoryEntry[] = [
  {
    "id": "RX-000001",
    "timestamp": 1704067200000,
    "patientId": "PT-000001",
    "drugInput": "Albuterol Inhaler 90 mcg/actuation Inhaler",
    "sig": "Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Alicia Romero",
    "prescribedDate": "2024-01-01",
    "isFavorite": true,
    "result": {
      "prescription": {
        "drugName": "Albuterol Inhaler 90 mcg/actuation Inhaler",
        "rxcui": "7511",
        "sig": "Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 240,
        "unit": "puff",
        "perDose": 2,
        "frequency": 4,
        "dailyAmount": 8
      },
      "packages": [
        {
          "ndc": "54868-1096-01",
          "packageDescription": "200-dose metered inhaler",
          "packageSize": 200,
          "packagesNeeded": 2,
          "totalQuantity": 400,
          "costPerPackage": 30
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2024-01-02",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000002",
    "timestamp": 1703980800000,
    "patientId": "PT-000001",
    "drugInput": "Fluticasone Inhaler 110 mcg/actuation Inhaler",
    "sig": "Inhale 1 puff by mouth twice daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Benjamin Hsu",
    "prescribedDate": "2023-12-31",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Fluticasone Inhaler 110 mcg/actuation Inhaler",
        "rxcui": "1991476",
        "sig": "Inhale 1 puff by mouth twice daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "puff",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1097-01",
          "packageDescription": "120-dose inhaler",
          "packageSize": 120,
          "packagesNeeded": 1,
          "totalQuantity": 120,
          "costPerPackage": 42
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2024-01-02",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000003",
    "timestamp": 1703894400000,
    "patientId": "PT-000001",
    "drugInput": "Albuterol Inhaler 90 mcg/actuation Inhaler",
    "sig": "Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing",
    "daysSupply": 90,
    "refills": 4,
    "prescriber": "Dr. Alicia Romero",
    "prescribedDate": "2023-12-30",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Albuterol Inhaler 90 mcg/actuation Inhaler",
        "rxcui": "7511",
        "sig": "Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 720,
        "unit": "puff",
        "perDose": 2,
        "frequency": 4,
        "dailyAmount": 8
      },
      "packages": [
        {
          "ndc": "54868-1096-01",
          "packageDescription": "200-dose metered inhaler",
          "packageSize": 200,
          "packagesNeeded": 4,
          "totalQuantity": 800,
          "costPerPackage": 30
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-12-30",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000004",
    "timestamp": 1700179200000,
    "patientId": "PT-000001",
    "drugInput": "Fluticasone Inhaler 110 mcg/actuation Inhaler",
    "sig": "Inhale 1 puff by mouth twice daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Benjamin Hsu",
    "prescribedDate": "2023-11-17",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Fluticasone Inhaler 110 mcg/actuation Inhaler",
        "rxcui": "1991476",
        "sig": "Inhale 1 puff by mouth twice daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "puff",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1097-01",
          "packageDescription": "120-dose inhaler",
          "packageSize": 120,
          "packagesNeeded": 1,
          "totalQuantity": 120,
          "costPerPackage": 42
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Historical refill documented for adherence tracking."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-20",
    "pharmacist": "Priyanka Shah",
    "notes": "Historical record for adherence review."
  },
  {
    "id": "RX-000005",
    "timestamp": 1703808000000,
    "patientId": "PT-000001",
    "drugInput": "Albuterol Inhaler 90 mcg/actuation Inhaler",
    "sig": "Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Alicia Romero",
    "prescribedDate": "2023-12-29",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Albuterol Inhaler 90 mcg/actuation Inhaler",
        "rxcui": "7511",
        "sig": "Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 240,
        "unit": "puff",
        "perDose": 2,
        "frequency": 4,
        "dailyAmount": 8
      },
      "packages": [
        {
          "ndc": "54868-1096-01",
          "packageDescription": "200-dose metered inhaler",
          "packageSize": 200,
          "packagesNeeded": 2,
          "totalQuantity": 400,
          "costPerPackage": 30
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Amelia Johnson",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000006",
    "timestamp": 1703635200000,
    "patientId": "PT-000001",
    "drugInput": "Albuterol Inhaler 90 mcg/actuation Inhaler",
    "sig": "Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing",
    "daysSupply": 14,
    "refills": 4,
    "prescriber": "Dr. Alicia Romero",
    "prescribedDate": "2023-12-27",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Albuterol Inhaler 90 mcg/actuation Inhaler",
        "rxcui": "7511",
        "sig": "Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing",
        "daysSupply": 14
      },
      "calculation": {
        "totalQuantityNeeded": 112,
        "unit": "puff",
        "perDose": 2,
        "frequency": 4,
        "dailyAmount": 8
      },
      "packages": [
        {
          "ndc": "54868-1096-01",
          "packageDescription": "200-dose metered inhaler",
          "packageSize": 200,
          "packagesNeeded": 1,
          "totalQuantity": 200,
          "costPerPackage": 30
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "partial-fill",
    "fillDate": "2023-12-28",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000007",
    "timestamp": 1703545200000,
    "patientId": "PT-000002",
    "drugInput": "Lisinopril 20 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Benjamin Hsu",
    "prescribedDate": "2023-12-25",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Lisinopril 20 mg Tablet",
        "rxcui": "197361",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1003-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 8.4
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-12-26",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000008",
    "timestamp": 1703458800000,
    "patientId": "PT-000002",
    "drugInput": "Atorvastatin 40 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily in the evening",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Maya Chen",
    "prescribedDate": "2023-12-24",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Atorvastatin 40 mg Tablet",
        "rxcui": "861007",
        "sig": "Take 1 tablet by mouth once daily in the evening",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1011-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 9.6
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-12-26",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000009",
    "timestamp": 1703372400000,
    "patientId": "PT-000002",
    "drugInput": "Metformin 1000 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 30,
    "refills": 4,
    "prescriber": "Dr. Noah Patel",
    "prescribedDate": "2023-12-23",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 1000 mg Tablet",
        "rxcui": "860976",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "43112-1043-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-12-26",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000010",
    "timestamp": 1703286000000,
    "patientId": "PT-000002",
    "drugInput": "Gabapentin 300 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 30,
    "refills": 4,
    "prescriber": "Dr. Evelyn Brooks",
    "prescribedDate": "2023-12-22",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1080-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 1,
          "totalQuantity": 90,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-12-23",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000011",
    "timestamp": 1703199600000,
    "patientId": "PT-000002",
    "drugInput": "Lisinopril 20 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 90,
    "refills": 2,
    "prescriber": "Dr. Benjamin Hsu",
    "prescribedDate": "2023-12-21",
    "isFavorite": true,
    "result": {
      "prescription": {
        "drugName": "Lisinopril 20 mg Tablet",
        "rxcui": "197361",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1003-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 8.4
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-12-21",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000012",
    "timestamp": 1700173800000,
    "patientId": "PT-000002",
    "drugInput": "Atorvastatin 40 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily in the evening",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Maya Chen",
    "prescribedDate": "2023-11-16",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Atorvastatin 40 mg Tablet",
        "rxcui": "861007",
        "sig": "Take 1 tablet by mouth once daily in the evening",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1011-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 9.6
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Historical refill documented for adherence tracking."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-19",
    "pharmacist": "Anthony Kim",
    "notes": "Historical record for adherence review."
  },
  {
    "id": "RX-000013",
    "timestamp": 1703023200000,
    "patientId": "PT-000003",
    "drugInput": "Amlodipine 10 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Maya Chen",
    "prescribedDate": "2023-12-19",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Amlodipine 10 mg Tablet",
        "rxcui": "308135",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1029-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 10.5
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-12-20",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000014",
    "timestamp": 1702936800000,
    "patientId": "PT-000003",
    "drugInput": "Metformin 850 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Noah Patel",
    "prescribedDate": "2023-12-18",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 850 mg Tablet",
        "rxcui": "860975",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "62037-1041-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-12-20",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000015",
    "timestamp": 1702850400000,
    "patientId": "PT-000003",
    "drugInput": "Tramadol 50 mg Tablet",
    "sig": "Take 1 tablet by mouth every 6 hours as needed for pain",
    "daysSupply": 7,
    "refills": 0,
    "prescriber": "Dr. Evelyn Brooks",
    "prescribedDate": "2023-12-17",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Tramadol 50 mg Tablet",
        "rxcui": "845314",
        "sig": "Take 1 tablet by mouth every 6 hours as needed for pain",
        "daysSupply": 7
      },
      "calculation": {
        "totalQuantityNeeded": 28,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1125-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 15.6
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-12-20",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000016",
    "timestamp": 1702764000000,
    "patientId": "PT-000003",
    "drugInput": "Amlodipine 10 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 90,
    "refills": 3,
    "prescriber": "Dr. Maya Chen",
    "prescribedDate": "2023-12-16",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Amlodipine 10 mg Tablet",
        "rxcui": "308135",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1029-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 10.5
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-12-16",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000017",
    "timestamp": 1700168400000,
    "patientId": "PT-000003",
    "drugInput": "Metformin 850 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 30,
    "refills": 1,
    "prescriber": "Dr. Noah Patel",
    "prescribedDate": "2023-11-16",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 850 mg Tablet",
        "rxcui": "860975",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "62037-1041-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Historical refill documented for adherence tracking."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-19",
    "pharmacist": "Priyanka Shah",
    "notes": "Historical record for adherence review."
  },
  {
    "id": "RX-000018",
    "timestamp": 1703815200000,
    "patientId": "PT-000003",
    "drugInput": "Amlodipine 10 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Maya Chen",
    "prescribedDate": "2023-12-29",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Amlodipine 10 mg Tablet",
        "rxcui": "308135",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1029-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 10.5
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Amelia Johnson",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000019",
    "timestamp": 1702501200000,
    "patientId": "PT-000004",
    "drugInput": "Prenatal Vitamin with Iron 27 mg iron Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 30,
    "refills": 6,
    "prescriber": "Dr. Noah Patel",
    "prescribedDate": "2023-12-13",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Prenatal Vitamin with Iron 27 mg iron Tablet",
        "rxcui": "848076",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "54868-1136-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 8.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-12-14",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000020",
    "timestamp": 1702414800000,
    "patientId": "PT-000004",
    "drugInput": "Vitamin D3 2000 IU Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Evelyn Brooks",
    "prescribedDate": "2023-12-12",
    "isFavorite": true,
    "result": {
      "prescription": {
        "drugName": "Vitamin D3 2000 IU Tablet",
        "rxcui": "1984408",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1140-01",
          "packageDescription": "90 tablets",
          "packageSize": 90,
          "packagesNeeded": 1,
          "totalQuantity": 90,
          "costPerPackage": 7.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-12-14",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000021",
    "timestamp": 1702328400000,
    "patientId": "PT-000004",
    "drugInput": "Prenatal Vitamin with Iron 27 mg iron Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 90,
    "refills": 6,
    "prescriber": "Dr. Noah Patel",
    "prescribedDate": "2023-12-11",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Prenatal Vitamin with Iron 27 mg iron Tablet",
        "rxcui": "848076",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "54868-1136-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 8.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-12-11",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000022",
    "timestamp": 1700163000000,
    "patientId": "PT-000004",
    "drugInput": "Vitamin D3 2000 IU Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Evelyn Brooks",
    "prescribedDate": "2023-11-16",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Vitamin D3 2000 IU Tablet",
        "rxcui": "1984408",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1140-01",
          "packageDescription": "90 tablets",
          "packageSize": 90,
          "packagesNeeded": 1,
          "totalQuantity": 90,
          "costPerPackage": 7.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Historical refill documented for adherence tracking."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-19",
    "pharmacist": "Amelia Johnson",
    "notes": "Historical record for adherence review."
  },
  {
    "id": "RX-000023",
    "timestamp": 1702152000000,
    "patientId": "PT-000005",
    "drugInput": "Buprenorphine/Naloxone 8-2 mg Film",
    "sig": "Place 1 film under the tongue once daily",
    "daysSupply": 30,
    "refills": 1,
    "prescriber": "Dr. Evelyn Brooks",
    "prescribedDate": "2023-12-09",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Buprenorphine/Naloxone 8-2 mg Film",
        "rxcui": "1010607",
        "sig": "Place 1 film under the tongue once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "film",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "54868-1148-01",
          "packageDescription": "14 films",
          "packageSize": 14,
          "packagesNeeded": 3,
          "totalQuantity": 42,
          "costPerPackage": 49
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-12-10",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000024",
    "timestamp": 1702065600000,
    "patientId": "PT-000005",
    "drugInput": "Naloxone Nasal Spray 4 mg/0.1 mL Spray",
    "sig": "Administer 1 spray into one nostril for opioid overdose. Repeat with new device if needed.",
    "daysSupply": 365,
    "refills": 2,
    "prescriber": "Dr. Samuel Ortiz",
    "prescribedDate": "2023-12-08",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Naloxone Nasal Spray 4 mg/0.1 mL Spray",
        "rxcui": "1729615",
        "sig": "Administer 1 spray into one nostril for opioid overdose. Repeat with new device if needed.",
        "daysSupply": 365
      },
      "calculation": {
        "totalQuantityNeeded": 365,
        "unit": "spray",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "54868-1135-01",
          "packageDescription": "2-device carton",
          "packageSize": 2,
          "packagesNeeded": 183,
          "totalQuantity": 366,
          "costPerPackage": 74
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-12-10",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000025",
    "timestamp": 1701979200000,
    "patientId": "PT-000005",
    "drugInput": "Buprenorphine/Naloxone 8-2 mg Film",
    "sig": "Place 1 film under the tongue once daily",
    "daysSupply": 90,
    "refills": 2,
    "prescriber": "Dr. Evelyn Brooks",
    "prescribedDate": "2023-12-07",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Buprenorphine/Naloxone 8-2 mg Film",
        "rxcui": "1010607",
        "sig": "Place 1 film under the tongue once daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "film",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "54868-1148-01",
          "packageDescription": "14 films",
          "packageSize": 14,
          "packagesNeeded": 7,
          "totalQuantity": 98,
          "costPerPackage": 49
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-12-07",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000026",
    "timestamp": 1700157600000,
    "patientId": "PT-000005",
    "drugInput": "Naloxone Nasal Spray 4 mg/0.1 mL Spray",
    "sig": "Administer 1 spray into one nostril for opioid overdose. Repeat with new device if needed.",
    "daysSupply": 365,
    "refills": 2,
    "prescriber": "Dr. Samuel Ortiz",
    "prescribedDate": "2023-11-16",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Naloxone Nasal Spray 4 mg/0.1 mL Spray",
        "rxcui": "1729615",
        "sig": "Administer 1 spray into one nostril for opioid overdose. Repeat with new device if needed.",
        "daysSupply": 365
      },
      "calculation": {
        "totalQuantityNeeded": 365,
        "unit": "spray",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "54868-1135-01",
          "packageDescription": "2-device carton",
          "packageSize": 2,
          "packagesNeeded": 183,
          "totalQuantity": 366,
          "costPerPackage": 74
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Historical refill documented for adherence tracking."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-19",
    "pharmacist": "Amelia Johnson",
    "notes": "Historical record for adherence review."
  },
  {
    "id": "RX-000027",
    "timestamp": 1703822400000,
    "patientId": "PT-000005",
    "drugInput": "Buprenorphine/Naloxone 8-2 mg Film",
    "sig": "Place 1 film under the tongue once daily",
    "daysSupply": 30,
    "refills": 1,
    "prescriber": "Dr. Evelyn Brooks",
    "prescribedDate": "2023-12-29",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Buprenorphine/Naloxone 8-2 mg Film",
        "rxcui": "1010607",
        "sig": "Place 1 film under the tongue once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "film",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "54868-1148-01",
          "packageDescription": "14 films",
          "packageSize": 14,
          "packagesNeeded": 3,
          "totalQuantity": 42,
          "costPerPackage": 49
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Jordan Patel",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000028",
    "timestamp": 1701720000000,
    "patientId": "PT-000005",
    "drugInput": "Buprenorphine/Naloxone 8-2 mg Film",
    "sig": "Place 1 film under the tongue once daily",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Evelyn Brooks",
    "prescribedDate": "2023-12-04",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Buprenorphine/Naloxone 8-2 mg Film",
        "rxcui": "1010607",
        "sig": "Place 1 film under the tongue once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "film",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "54868-1148-01",
          "packageDescription": "14 films",
          "packageSize": 14,
          "packagesNeeded": 3,
          "totalQuantity": 42,
          "costPerPackage": 49
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "partial-fill",
    "fillDate": "2023-12-05",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000029",
    "timestamp": 1701630000000,
    "patientId": "PT-000006",
    "drugInput": "Escitalopram 20 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Samuel Ortiz",
    "prescribedDate": "2023-12-03",
    "isFavorite": true,
    "result": {
      "prescription": {
        "drugName": "Escitalopram 20 mg Tablet",
        "rxcui": "352263",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1058-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 9.9
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-12-04",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000030",
    "timestamp": 1701543600000,
    "patientId": "PT-000006",
    "drugInput": "Alprazolam 0.5 mg Tablet",
    "sig": "Take 1 tablet by mouth three times daily as needed for anxiety",
    "daysSupply": 30,
    "refills": 0,
    "prescriber": "Dr. Priya Nair",
    "prescribedDate": "2023-12-02",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Alprazolam 0.5 mg Tablet",
        "rxcui": "308048",
        "sig": "Take 1 tablet by mouth three times daily as needed for anxiety",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "62037-1066-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 12
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-12-04",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000031",
    "timestamp": 1701457200000,
    "patientId": "PT-000006",
    "drugInput": "Escitalopram 20 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 90,
    "refills": 3,
    "prescriber": "Dr. Samuel Ortiz",
    "prescribedDate": "2023-12-01",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Escitalopram 20 mg Tablet",
        "rxcui": "352263",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1058-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 9.9
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-12-01",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000032",
    "timestamp": 1700152200000,
    "patientId": "PT-000006",
    "drugInput": "Alprazolam 0.5 mg Tablet",
    "sig": "Take 1 tablet by mouth three times daily as needed for anxiety",
    "daysSupply": 30,
    "refills": 0,
    "prescriber": "Dr. Priya Nair",
    "prescribedDate": "2023-11-16",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Alprazolam 0.5 mg Tablet",
        "rxcui": "308048",
        "sig": "Take 1 tablet by mouth three times daily as needed for anxiety",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "62037-1066-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 12
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Historical refill documented for adherence tracking."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-19",
    "pharmacist": "Lisa Hernandez",
    "notes": "Historical record for adherence review."
  },
  {
    "id": "RX-000033",
    "timestamp": 1701284400000,
    "patientId": "PT-000006",
    "drugInput": "Escitalopram 20 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 14,
    "refills": 3,
    "prescriber": "Dr. Samuel Ortiz",
    "prescribedDate": "2023-11-29",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Escitalopram 20 mg Tablet",
        "rxcui": "352263",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 14
      },
      "calculation": {
        "totalQuantityNeeded": 14,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1058-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 9.9
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "partial-fill",
    "fillDate": "2023-11-30",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000034",
    "timestamp": 1701194400000,
    "patientId": "PT-000007",
    "drugInput": "Apixaban 5 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Priya Nair",
    "prescribedDate": "2023-11-28",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Apixaban 5 mg Tablet",
        "rxcui": "1364430",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1031-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 312
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-29",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000035",
    "timestamp": 1701108000000,
    "patientId": "PT-000007",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Grace Whitman",
    "prescribedDate": "2023-11-27",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-29",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000036",
    "timestamp": 1701021600000,
    "patientId": "PT-000007",
    "drugInput": "Lisinopril 40 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Michael Tanaka",
    "prescribedDate": "2023-11-26",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Lisinopril 40 mg Tablet",
        "rxcui": "206134",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1005-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 8.4
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-29",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000037",
    "timestamp": 1700935200000,
    "patientId": "PT-000007",
    "drugInput": "Apixaban 5 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 90,
    "refills": 3,
    "prescriber": "Dr. Priya Nair",
    "prescribedDate": "2023-11-25",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Apixaban 5 mg Tablet",
        "rxcui": "1364430",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 180,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1031-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 3,
          "totalQuantity": 180,
          "costPerPackage": 312
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-25",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000038",
    "timestamp": 1700146800000,
    "patientId": "PT-000007",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Grace Whitman",
    "prescribedDate": "2023-11-16",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Historical refill documented for adherence tracking."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-19",
    "pharmacist": "Priyanka Shah",
    "notes": "Historical record for adherence review."
  },
  {
    "id": "RX-000039",
    "timestamp": 1703829600000,
    "patientId": "PT-000007",
    "drugInput": "Apixaban 5 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Priya Nair",
    "prescribedDate": "2023-12-29",
    "isFavorite": true,
    "result": {
      "prescription": {
        "drugName": "Apixaban 5 mg Tablet",
        "rxcui": "1364430",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1031-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 312
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Amelia Johnson",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000040",
    "timestamp": 1700672400000,
    "patientId": "PT-000008",
    "drugInput": "Amphetamine/Dextroamphetamine 20 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 30,
    "refills": 0,
    "prescriber": "Dr. Grace Whitman",
    "prescribedDate": "2023-11-22",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Amphetamine/Dextroamphetamine 20 mg Tablet",
        "rxcui": "861014",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "62037-1072-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 66
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-23",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000041",
    "timestamp": 1700586000000,
    "patientId": "PT-000008",
    "drugInput": "Alprazolam 0.25 mg Tablet",
    "sig": "Take 1 tablet by mouth three times daily as needed for anxiety",
    "daysSupply": 30,
    "refills": 1,
    "prescriber": "Dr. Michael Tanaka",
    "prescribedDate": "2023-11-21",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Alprazolam 0.25 mg Tablet",
        "rxcui": "308047",
        "sig": "Take 1 tablet by mouth three times daily as needed for anxiety",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1064-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 12
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-23",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000042",
    "timestamp": 1700499600000,
    "patientId": "PT-000008",
    "drugInput": "Amphetamine/Dextroamphetamine 20 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 90,
    "refills": 1,
    "prescriber": "Dr. Grace Whitman",
    "prescribedDate": "2023-11-20",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Amphetamine/Dextroamphetamine 20 mg Tablet",
        "rxcui": "861014",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 180,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "62037-1072-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 3,
          "totalQuantity": 180,
          "costPerPackage": 66
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-20",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000043",
    "timestamp": 1700141400000,
    "patientId": "PT-000008",
    "drugInput": "Alprazolam 0.25 mg Tablet",
    "sig": "Take 1 tablet by mouth three times daily as needed for anxiety",
    "daysSupply": 30,
    "refills": 1,
    "prescriber": "Dr. Michael Tanaka",
    "prescribedDate": "2023-11-16",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Alprazolam 0.25 mg Tablet",
        "rxcui": "308047",
        "sig": "Take 1 tablet by mouth three times daily as needed for anxiety",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1064-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 12
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Historical refill documented for adherence tracking."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-19",
    "pharmacist": "Amelia Johnson",
    "notes": "Historical record for adherence review."
  },
  {
    "id": "RX-000044",
    "timestamp": 1700323200000,
    "patientId": "PT-000009",
    "drugInput": "Gabapentin 600 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Michael Tanaka",
    "prescribedDate": "2023-11-18",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 600 mg Capsule",
        "rxcui": "310800",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "62037-1082-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 1,
          "totalQuantity": 90,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-19",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000045",
    "timestamp": 1700236800000,
    "patientId": "PT-000009",
    "drugInput": "Lisinopril 10 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Lauren McKay",
    "prescribedDate": "2023-11-17",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Lisinopril 10 mg Tablet",
        "rxcui": "1049633",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1001-02",
          "packageDescription": "90 tablets",
          "packageSize": 90,
          "packagesNeeded": 1,
          "totalQuantity": 90,
          "costPerPackage": 25.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-19",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000046",
    "timestamp": 1700150400000,
    "patientId": "PT-000009",
    "drugInput": "Gabapentin 600 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 90,
    "refills": 2,
    "prescriber": "Dr. Michael Tanaka",
    "prescribedDate": "2023-11-16",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 600 mg Capsule",
        "rxcui": "310800",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 270,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "62037-1082-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 3,
          "totalQuantity": 270,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-16",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000047",
    "timestamp": 1700136000000,
    "patientId": "PT-000009",
    "drugInput": "Lisinopril 10 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Lauren McKay",
    "prescribedDate": "2023-11-16",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Lisinopril 10 mg Tablet",
        "rxcui": "1049633",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1001-02",
          "packageDescription": "90 tablets",
          "packageSize": 90,
          "packagesNeeded": 1,
          "totalQuantity": 90,
          "costPerPackage": 25.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Historical refill documented for adherence tracking."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-19",
    "pharmacist": "Amelia Johnson",
    "notes": "Historical record for adherence review."
  },
  {
    "id": "RX-000048",
    "timestamp": 1703836800000,
    "patientId": "PT-000009",
    "drugInput": "Gabapentin 600 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Michael Tanaka",
    "prescribedDate": "2023-12-29",
    "isFavorite": true,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 600 mg Capsule",
        "rxcui": "310800",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "62037-1082-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 1,
          "totalQuantity": 90,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Jordan Patel",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000049",
    "timestamp": 1699887600000,
    "patientId": "PT-000010",
    "drugInput": "Metoprolol 50 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Lauren McKay",
    "prescribedDate": "2023-11-13",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 50 mg Tablet",
        "rxcui": "866409",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "62037-1023-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-14",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000050",
    "timestamp": 1699801200000,
    "patientId": "PT-000010",
    "drugInput": "Metoprolol 50 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 90,
    "refills": 3,
    "prescriber": "Dr. Lauren McKay",
    "prescribedDate": "2023-11-12",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 50 mg Tablet",
        "rxcui": "866409",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 180,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "62037-1023-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 3,
          "totalQuantity": 180,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-12",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000051",
    "timestamp": 1699711200000,
    "patientId": "PT-000011",
    "drugInput": "Albuterol Inhaler 90 mcg/actuation Inhaler",
    "sig": "Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Henry Caldwell",
    "prescribedDate": "2023-11-11",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Albuterol Inhaler 90 mcg/actuation Inhaler",
        "rxcui": "7511",
        "sig": "Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 240,
        "unit": "puff",
        "perDose": 2,
        "frequency": 4,
        "dailyAmount": 8
      },
      "packages": [
        {
          "ndc": "54868-1096-01",
          "packageDescription": "200-dose metered inhaler",
          "packageSize": 200,
          "packagesNeeded": 2,
          "totalQuantity": 400,
          "costPerPackage": 30
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-12",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000052",
    "timestamp": 1699624800000,
    "patientId": "PT-000011",
    "drugInput": "Fluticasone Inhaler 110 mcg/actuation Inhaler",
    "sig": "Inhale 1 puff by mouth twice daily",
    "daysSupply": 30,
    "refills": 4,
    "prescriber": "Dr. Fatima Al-Hassan",
    "prescribedDate": "2023-11-10",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Fluticasone Inhaler 110 mcg/actuation Inhaler",
        "rxcui": "1991476",
        "sig": "Inhale 1 puff by mouth twice daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "puff",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1097-01",
          "packageDescription": "120-dose inhaler",
          "packageSize": 120,
          "packagesNeeded": 1,
          "totalQuantity": 120,
          "costPerPackage": 42
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-12",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000053",
    "timestamp": 1699538400000,
    "patientId": "PT-000011",
    "drugInput": "Prednisone 10 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily with food",
    "daysSupply": 10,
    "refills": 1,
    "prescriber": "Dr. Victor Suarez",
    "prescribedDate": "2023-11-09",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Prednisone 10 mg Tablet",
        "rxcui": "1982111",
        "sig": "Take 1 tablet by mouth once daily with food",
        "daysSupply": 10
      },
      "calculation": {
        "totalQuantityNeeded": 10,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1102-01",
          "packageDescription": "21 tablets",
          "packageSize": 21,
          "packagesNeeded": 1,
          "totalQuantity": 21,
          "costPerPackage": 5.04
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-12",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000054",
    "timestamp": 1699452000000,
    "patientId": "PT-000011",
    "drugInput": "Albuterol Inhaler 90 mcg/actuation Inhaler",
    "sig": "Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing",
    "daysSupply": 90,
    "refills": 3,
    "prescriber": "Dr. Henry Caldwell",
    "prescribedDate": "2023-11-08",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Albuterol Inhaler 90 mcg/actuation Inhaler",
        "rxcui": "7511",
        "sig": "Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 720,
        "unit": "puff",
        "perDose": 2,
        "frequency": 4,
        "dailyAmount": 8
      },
      "packages": [
        {
          "ndc": "54868-1096-01",
          "packageDescription": "200-dose metered inhaler",
          "packageSize": 200,
          "packagesNeeded": 4,
          "totalQuantity": 800,
          "costPerPackage": 30
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-08",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000055",
    "timestamp": 1700125200000,
    "patientId": "PT-000011",
    "drugInput": "Fluticasone Inhaler 110 mcg/actuation Inhaler",
    "sig": "Inhale 1 puff by mouth twice daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Fatima Al-Hassan",
    "prescribedDate": "2023-11-16",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Fluticasone Inhaler 110 mcg/actuation Inhaler",
        "rxcui": "1991476",
        "sig": "Inhale 1 puff by mouth twice daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "puff",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1097-01",
          "packageDescription": "120-dose inhaler",
          "packageSize": 120,
          "packagesNeeded": 1,
          "totalQuantity": 120,
          "costPerPackage": 42
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Historical refill documented for adherence tracking."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-19",
    "pharmacist": "Amelia Johnson",
    "notes": "Historical record for adherence review."
  },
  {
    "id": "RX-000056",
    "timestamp": 1703844000000,
    "patientId": "PT-000011",
    "drugInput": "Albuterol Inhaler 90 mcg/actuation Inhaler",
    "sig": "Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Henry Caldwell",
    "prescribedDate": "2023-12-29",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Albuterol Inhaler 90 mcg/actuation Inhaler",
        "rxcui": "7511",
        "sig": "Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 240,
        "unit": "puff",
        "perDose": 2,
        "frequency": 4,
        "dailyAmount": 8
      },
      "packages": [
        {
          "ndc": "54868-1096-01",
          "packageDescription": "200-dose metered inhaler",
          "packageSize": 200,
          "packagesNeeded": 2,
          "totalQuantity": 400,
          "costPerPackage": 30
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Jordan Patel",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000057",
    "timestamp": 1699192800000,
    "patientId": "PT-000011",
    "drugInput": "Albuterol Inhaler 90 mcg/actuation Inhaler",
    "sig": "Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing",
    "daysSupply": 14,
    "refills": 2,
    "prescriber": "Dr. Henry Caldwell",
    "prescribedDate": "2023-11-05",
    "isFavorite": true,
    "result": {
      "prescription": {
        "drugName": "Albuterol Inhaler 90 mcg/actuation Inhaler",
        "rxcui": "7511",
        "sig": "Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing",
        "daysSupply": 14
      },
      "calculation": {
        "totalQuantityNeeded": 112,
        "unit": "puff",
        "perDose": 2,
        "frequency": 4,
        "dailyAmount": 8
      },
      "packages": [
        {
          "ndc": "54868-1096-01",
          "packageDescription": "200-dose metered inhaler",
          "packageSize": 200,
          "packagesNeeded": 1,
          "totalQuantity": 200,
          "costPerPackage": 30
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "partial-fill",
    "fillDate": "2023-11-06",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000058",
    "timestamp": 1699102800000,
    "patientId": "PT-000012",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Fatima Al-Hassan",
    "prescribedDate": "2023-11-04",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-05",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000059",
    "timestamp": 1699016400000,
    "patientId": "PT-000012",
    "drugInput": "Blood Glucose Test Strips Standard Supply",
    "sig": "Use to test blood glucose four times daily",
    "daysSupply": 30,
    "refills": 6,
    "prescriber": "Dr. Victor Suarez",
    "prescribedDate": "2023-11-03",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "rxcui": "578367",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "strip",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1142-01",
          "packageDescription": "50 strips",
          "packageSize": 50,
          "packagesNeeded": 3,
          "totalQuantity": 150,
          "costPerPackage": 37.5
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-05",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000060",
    "timestamp": 1698930000000,
    "patientId": "PT-000012",
    "drugInput": "30G Lancets 30 gauge Supply",
    "sig": "Use to obtain blood sample four times daily",
    "daysSupply": 30,
    "refills": 5,
    "prescriber": "Dr. Rachel Goldstein",
    "prescribedDate": "2023-11-02",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "30G Lancets 30 gauge Supply",
        "rxcui": "998218",
        "sig": "Use to obtain blood sample four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "lancet",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1144-01",
          "packageDescription": "100 lancets",
          "packageSize": 100,
          "packagesNeeded": 2,
          "totalQuantity": 200,
          "costPerPackage": 12
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-05",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000061",
    "timestamp": 1698843600000,
    "patientId": "PT-000012",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 90,
    "refills": 4,
    "prescriber": "Dr. Fatima Al-Hassan",
    "prescribedDate": "2023-11-01",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 180,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 3,
          "totalQuantity": 180,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-01",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000062",
    "timestamp": 1700119800000,
    "patientId": "PT-000012",
    "drugInput": "Blood Glucose Test Strips Standard Supply",
    "sig": "Use to test blood glucose four times daily",
    "daysSupply": 30,
    "refills": 5,
    "prescriber": "Dr. Victor Suarez",
    "prescribedDate": "2023-11-16",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "rxcui": "578367",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "strip",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1142-01",
          "packageDescription": "50 strips",
          "packageSize": 50,
          "packagesNeeded": 3,
          "totalQuantity": 150,
          "costPerPackage": 37.5
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Historical refill documented for adherence tracking."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-19",
    "pharmacist": "Anthony Kim",
    "notes": "Historical record for adherence review."
  },
  {
    "id": "RX-000063",
    "timestamp": 1698667200000,
    "patientId": "PT-000013",
    "drugInput": "Sertraline 50 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Rachel Goldstein",
    "prescribedDate": "2023-10-30",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Sertraline 50 mg Tablet",
        "rxcui": "312941",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1052-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 10.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-10-31",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000064",
    "timestamp": 1698580800000,
    "patientId": "PT-000013",
    "drugInput": "Sertraline 50 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 90,
    "refills": 3,
    "prescriber": "Dr. Rachel Goldstein",
    "prescribedDate": "2023-10-29",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Sertraline 50 mg Tablet",
        "rxcui": "312941",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1052-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 10.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-10-29",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000065",
    "timestamp": 1703851200000,
    "patientId": "PT-000013",
    "drugInput": "Sertraline 50 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Rachel Goldstein",
    "prescribedDate": "2023-12-29",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Sertraline 50 mg Tablet",
        "rxcui": "312941",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1052-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 10.2
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Lisa Hernandez",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000066",
    "timestamp": 1698404400000,
    "patientId": "PT-000014",
    "drugInput": "Gabapentin 300 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Teresa Nguyen",
    "prescribedDate": "2023-10-27",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1080-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 1,
          "totalQuantity": 90,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-10-28",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000067",
    "timestamp": 1698318000000,
    "patientId": "PT-000014",
    "drugInput": "Gabapentin 300 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 90,
    "refills": 3,
    "prescriber": "Dr. Teresa Nguyen",
    "prescribedDate": "2023-10-26",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 270,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1080-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 3,
          "totalQuantity": 270,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-10-26",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000068",
    "timestamp": 1698228000000,
    "patientId": "PT-000015",
    "drugInput": "Metoprolol 25 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 30,
    "refills": 4,
    "prescriber": "Dr. Sofia Martinez",
    "prescribedDate": "2023-10-25",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 25 mg Tablet",
        "rxcui": "866408",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1021-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-10-26",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000069",
    "timestamp": 1698141600000,
    "patientId": "PT-000015",
    "drugInput": "Metoprolol 25 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 90,
    "refills": 4,
    "prescriber": "Dr. Sofia Martinez",
    "prescribedDate": "2023-10-24",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 25 mg Tablet",
        "rxcui": "866408",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 180,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1021-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 3,
          "totalQuantity": 180,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-10-24",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000070",
    "timestamp": 1703858400000,
    "patientId": "PT-000015",
    "drugInput": "Metoprolol 25 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 30,
    "refills": 4,
    "prescriber": "Dr. Sofia Martinez",
    "prescribedDate": "2023-12-29",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 25 mg Tablet",
        "rxcui": "866408",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1021-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Priyanka Shah",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000071",
    "timestamp": 1697965200000,
    "patientId": "PT-000016",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 30,
    "refills": 5,
    "prescriber": "Dr. Alicia Romero",
    "prescribedDate": "2023-10-22",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-10-23",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000072",
    "timestamp": 1697878800000,
    "patientId": "PT-000016",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 90,
    "refills": 5,
    "prescriber": "Dr. Alicia Romero",
    "prescribedDate": "2023-10-21",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-10-21",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000073",
    "timestamp": 1697792400000,
    "patientId": "PT-000016",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 14,
    "refills": 5,
    "prescriber": "Dr. Alicia Romero",
    "prescribedDate": "2023-10-20",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 14
      },
      "calculation": {
        "totalQuantityNeeded": 14,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "partial-fill",
    "fillDate": "2023-10-21",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000074",
    "timestamp": 1697702400000,
    "patientId": "PT-000017",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 30,
    "refills": 4,
    "prescriber": "Dr. Maya Chen",
    "prescribedDate": "2023-10-19",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-10-20",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000075",
    "timestamp": 1697616000000,
    "patientId": "PT-000017",
    "drugInput": "Blood Glucose Test Strips Standard Supply",
    "sig": "Use to test blood glucose four times daily",
    "daysSupply": 30,
    "refills": 5,
    "prescriber": "Dr. Noah Patel",
    "prescribedDate": "2023-10-18",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "rxcui": "578367",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "strip",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1142-01",
          "packageDescription": "50 strips",
          "packageSize": 50,
          "packagesNeeded": 3,
          "totalQuantity": 150,
          "costPerPackage": 37.5
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-10-20",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000076",
    "timestamp": 1697529600000,
    "patientId": "PT-000017",
    "drugInput": "30G Lancets 30 gauge Supply",
    "sig": "Use to obtain blood sample four times daily",
    "daysSupply": 30,
    "refills": 6,
    "prescriber": "Dr. Evelyn Brooks",
    "prescribedDate": "2023-10-17",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "30G Lancets 30 gauge Supply",
        "rxcui": "998218",
        "sig": "Use to obtain blood sample four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "lancet",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1144-01",
          "packageDescription": "100 lancets",
          "packageSize": 100,
          "packagesNeeded": 2,
          "totalQuantity": 200,
          "costPerPackage": 12
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-10-20",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000077",
    "timestamp": 1697443200000,
    "patientId": "PT-000017",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 90,
    "refills": 4,
    "prescriber": "Dr. Maya Chen",
    "prescribedDate": "2023-10-16",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 180,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 3,
          "totalQuantity": 180,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-10-16",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000078",
    "timestamp": 1700092800000,
    "patientId": "PT-000017",
    "drugInput": "Blood Glucose Test Strips Standard Supply",
    "sig": "Use to test blood glucose four times daily",
    "daysSupply": 30,
    "refills": 6,
    "prescriber": "Dr. Noah Patel",
    "prescribedDate": "2023-11-16",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "rxcui": "578367",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "strip",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1142-01",
          "packageDescription": "50 strips",
          "packageSize": 50,
          "packagesNeeded": 3,
          "totalQuantity": 150,
          "costPerPackage": 37.5
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Historical refill documented for adherence tracking."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-19",
    "pharmacist": "Priyanka Shah",
    "notes": "Historical record for adherence review."
  },
  {
    "id": "RX-000079",
    "timestamp": 1703865600000,
    "patientId": "PT-000017",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Maya Chen",
    "prescribedDate": "2023-12-29",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Amelia Johnson",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000080",
    "timestamp": 1697180400000,
    "patientId": "PT-000018",
    "drugInput": "Sertraline 50 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Evelyn Brooks",
    "prescribedDate": "2023-10-13",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Sertraline 50 mg Tablet",
        "rxcui": "312941",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1052-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 10.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-10-14",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000081",
    "timestamp": 1697094000000,
    "patientId": "PT-000018",
    "drugInput": "Sertraline 50 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 90,
    "refills": 3,
    "prescriber": "Dr. Evelyn Brooks",
    "prescribedDate": "2023-10-12",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Sertraline 50 mg Tablet",
        "rxcui": "312941",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1052-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 10.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-10-12",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000082",
    "timestamp": 1697004000000,
    "patientId": "PT-000019",
    "drugInput": "Gabapentin 300 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Priya Nair",
    "prescribedDate": "2023-10-11",
    "isFavorite": true,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1080-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 1,
          "totalQuantity": 90,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-10-12",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000083",
    "timestamp": 1696917600000,
    "patientId": "PT-000019",
    "drugInput": "Gabapentin 300 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 90,
    "refills": 3,
    "prescriber": "Dr. Priya Nair",
    "prescribedDate": "2023-10-10",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 270,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1080-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 3,
          "totalQuantity": 270,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-10-10",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000084",
    "timestamp": 1703872800000,
    "patientId": "PT-000019",
    "drugInput": "Gabapentin 300 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Priya Nair",
    "prescribedDate": "2023-12-29",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1080-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 1,
          "totalQuantity": 90,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Lisa Hernandez",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000085",
    "timestamp": 1696741200000,
    "patientId": "PT-000020",
    "drugInput": "Metoprolol 25 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 30,
    "refills": 4,
    "prescriber": "Dr. Michael Tanaka",
    "prescribedDate": "2023-10-08",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 25 mg Tablet",
        "rxcui": "866408",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1021-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-10-09",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000086",
    "timestamp": 1696654800000,
    "patientId": "PT-000020",
    "drugInput": "Metoprolol 25 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 90,
    "refills": 4,
    "prescriber": "Dr. Michael Tanaka",
    "prescribedDate": "2023-10-07",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 25 mg Tablet",
        "rxcui": "866408",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 180,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1021-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 3,
          "totalQuantity": 180,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-10-07",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000087",
    "timestamp": 1696564800000,
    "patientId": "PT-000021",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 30,
    "refills": 4,
    "prescriber": "Dr. Henry Caldwell",
    "prescribedDate": "2023-10-06",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-10-07",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000088",
    "timestamp": 1696478400000,
    "patientId": "PT-000021",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 90,
    "refills": 5,
    "prescriber": "Dr. Henry Caldwell",
    "prescribedDate": "2023-10-05",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-10-05",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000089",
    "timestamp": 1703880000000,
    "patientId": "PT-000021",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 30,
    "refills": 4,
    "prescriber": "Dr. Henry Caldwell",
    "prescribedDate": "2023-12-29",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Priyanka Shah",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000090",
    "timestamp": 1696305600000,
    "patientId": "PT-000021",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 14,
    "refills": 5,
    "prescriber": "Dr. Henry Caldwell",
    "prescribedDate": "2023-10-03",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 14
      },
      "calculation": {
        "totalQuantityNeeded": 14,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "partial-fill",
    "fillDate": "2023-10-04",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000091",
    "timestamp": 1696215600000,
    "patientId": "PT-000022",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 30,
    "refills": 4,
    "prescriber": "Dr. Victor Suarez",
    "prescribedDate": "2023-10-02",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-10-03",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000092",
    "timestamp": 1696129200000,
    "patientId": "PT-000022",
    "drugInput": "Blood Glucose Test Strips Standard Supply",
    "sig": "Use to test blood glucose four times daily",
    "daysSupply": 30,
    "refills": 5,
    "prescriber": "Dr. Rachel Goldstein",
    "prescribedDate": "2023-10-01",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "rxcui": "578367",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "strip",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1142-01",
          "packageDescription": "50 strips",
          "packageSize": 50,
          "packagesNeeded": 3,
          "totalQuantity": 150,
          "costPerPackage": 37.5
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-10-03",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000093",
    "timestamp": 1696042800000,
    "patientId": "PT-000022",
    "drugInput": "30G Lancets 30 gauge Supply",
    "sig": "Use to obtain blood sample four times daily",
    "daysSupply": 30,
    "refills": 6,
    "prescriber": "Dr. Omar Ibrahim",
    "prescribedDate": "2023-09-30",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "30G Lancets 30 gauge Supply",
        "rxcui": "998218",
        "sig": "Use to obtain blood sample four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "lancet",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1144-01",
          "packageDescription": "100 lancets",
          "packageSize": 100,
          "packagesNeeded": 2,
          "totalQuantity": 200,
          "costPerPackage": 12
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-10-03",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000094",
    "timestamp": 1695956400000,
    "patientId": "PT-000022",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 90,
    "refills": 4,
    "prescriber": "Dr. Victor Suarez",
    "prescribedDate": "2023-09-29",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 180,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 3,
          "totalQuantity": 180,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-09-29",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000095",
    "timestamp": 1700065800000,
    "patientId": "PT-000022",
    "drugInput": "Blood Glucose Test Strips Standard Supply",
    "sig": "Use to test blood glucose four times daily",
    "daysSupply": 30,
    "refills": 6,
    "prescriber": "Dr. Rachel Goldstein",
    "prescribedDate": "2023-11-15",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "rxcui": "578367",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "strip",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1142-01",
          "packageDescription": "50 strips",
          "packageSize": 50,
          "packagesNeeded": 3,
          "totalQuantity": 150,
          "costPerPackage": 37.5
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Historical refill documented for adherence tracking."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-18",
    "pharmacist": "Jordan Patel",
    "notes": "Historical record for adherence review."
  },
  {
    "id": "RX-000096",
    "timestamp": 1695780000000,
    "patientId": "PT-000023",
    "drugInput": "Sertraline 50 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Omar Ibrahim",
    "prescribedDate": "2023-09-27",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Sertraline 50 mg Tablet",
        "rxcui": "312941",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1052-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 10.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-09-28",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000097",
    "timestamp": 1695693600000,
    "patientId": "PT-000023",
    "drugInput": "Sertraline 50 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 90,
    "refills": 3,
    "prescriber": "Dr. Omar Ibrahim",
    "prescribedDate": "2023-09-26",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Sertraline 50 mg Tablet",
        "rxcui": "312941",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1052-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 10.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-09-26",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000098",
    "timestamp": 1703887200000,
    "patientId": "PT-000023",
    "drugInput": "Sertraline 50 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Omar Ibrahim",
    "prescribedDate": "2023-12-29",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Sertraline 50 mg Tablet",
        "rxcui": "312941",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1052-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 10.2
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Amelia Johnson",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000099",
    "timestamp": 1695517200000,
    "patientId": "PT-000024",
    "drugInput": "Gabapentin 300 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Carlos Mendes",
    "prescribedDate": "2023-09-24",
    "isFavorite": true,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1080-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 1,
          "totalQuantity": 90,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-09-25",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000100",
    "timestamp": 1695430800000,
    "patientId": "PT-000024",
    "drugInput": "Gabapentin 300 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 90,
    "refills": 3,
    "prescriber": "Dr. Carlos Mendes",
    "prescribedDate": "2023-09-23",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 270,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1080-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 3,
          "totalQuantity": 270,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-09-23",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000101",
    "timestamp": 1695340800000,
    "patientId": "PT-000025",
    "drugInput": "Metoprolol 25 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Elliot Harper",
    "prescribedDate": "2023-09-22",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 25 mg Tablet",
        "rxcui": "866408",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1021-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-09-23",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000102",
    "timestamp": 1695254400000,
    "patientId": "PT-000025",
    "drugInput": "Metoprolol 25 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 90,
    "refills": 4,
    "prescriber": "Dr. Elliot Harper",
    "prescribedDate": "2023-09-21",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 25 mg Tablet",
        "rxcui": "866408",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 180,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1021-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 3,
          "totalQuantity": 180,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-09-21",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000103",
    "timestamp": 1703894400000,
    "patientId": "PT-000025",
    "drugInput": "Metoprolol 25 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Elliot Harper",
    "prescribedDate": "2023-12-30",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 25 mg Tablet",
        "rxcui": "866408",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1021-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Lisa Hernandez",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000104",
    "timestamp": 1695078000000,
    "patientId": "PT-000026",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 30,
    "refills": 4,
    "prescriber": "Dr. Benjamin Hsu",
    "prescribedDate": "2023-09-18",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-09-19",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000105",
    "timestamp": 1694991600000,
    "patientId": "PT-000026",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 90,
    "refills": 5,
    "prescriber": "Dr. Benjamin Hsu",
    "prescribedDate": "2023-09-17",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-09-17",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000106",
    "timestamp": 1694905200000,
    "patientId": "PT-000026",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 14,
    "refills": 4,
    "prescriber": "Dr. Benjamin Hsu",
    "prescribedDate": "2023-09-16",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 14
      },
      "calculation": {
        "totalQuantityNeeded": 14,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "partial-fill",
    "fillDate": "2023-09-17",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000107",
    "timestamp": 1694815200000,
    "patientId": "PT-000027",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Noah Patel",
    "prescribedDate": "2023-09-15",
    "isFavorite": true,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-09-16",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000108",
    "timestamp": 1694728800000,
    "patientId": "PT-000027",
    "drugInput": "Blood Glucose Test Strips Standard Supply",
    "sig": "Use to test blood glucose four times daily",
    "daysSupply": 30,
    "refills": 6,
    "prescriber": "Dr. Evelyn Brooks",
    "prescribedDate": "2023-09-14",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "rxcui": "578367",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "strip",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1142-01",
          "packageDescription": "50 strips",
          "packageSize": 50,
          "packagesNeeded": 3,
          "totalQuantity": 150,
          "costPerPackage": 37.5
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-09-16",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000109",
    "timestamp": 1694642400000,
    "patientId": "PT-000027",
    "drugInput": "30G Lancets 30 gauge Supply",
    "sig": "Use to obtain blood sample four times daily",
    "daysSupply": 30,
    "refills": 5,
    "prescriber": "Dr. Samuel Ortiz",
    "prescribedDate": "2023-09-13",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "30G Lancets 30 gauge Supply",
        "rxcui": "998218",
        "sig": "Use to obtain blood sample four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "lancet",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1144-01",
          "packageDescription": "100 lancets",
          "packageSize": 100,
          "packagesNeeded": 2,
          "totalQuantity": 200,
          "costPerPackage": 12
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-09-16",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000110",
    "timestamp": 1694556000000,
    "patientId": "PT-000027",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 90,
    "refills": 4,
    "prescriber": "Dr. Noah Patel",
    "prescribedDate": "2023-09-12",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 180,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 3,
          "totalQuantity": 180,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-09-12",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000111",
    "timestamp": 1700038800000,
    "patientId": "PT-000027",
    "drugInput": "Blood Glucose Test Strips Standard Supply",
    "sig": "Use to test blood glucose four times daily",
    "daysSupply": 30,
    "refills": 5,
    "prescriber": "Dr. Evelyn Brooks",
    "prescribedDate": "2023-11-15",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "rxcui": "578367",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "strip",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1142-01",
          "packageDescription": "50 strips",
          "packageSize": 50,
          "packagesNeeded": 3,
          "totalQuantity": 150,
          "costPerPackage": 37.5
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Historical refill documented for adherence tracking."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-18",
    "pharmacist": "Lisa Hernandez",
    "notes": "Historical record for adherence review."
  },
  {
    "id": "RX-000112",
    "timestamp": 1703901600000,
    "patientId": "PT-000027",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 30,
    "refills": 4,
    "prescriber": "Dr. Noah Patel",
    "prescribedDate": "2023-12-30",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Anthony Kim",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000113",
    "timestamp": 1694293200000,
    "patientId": "PT-000028",
    "drugInput": "Sertraline 50 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Samuel Ortiz",
    "prescribedDate": "2023-09-09",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Sertraline 50 mg Tablet",
        "rxcui": "312941",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1052-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 10.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-09-10",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000114",
    "timestamp": 1694206800000,
    "patientId": "PT-000028",
    "drugInput": "Sertraline 50 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 90,
    "refills": 3,
    "prescriber": "Dr. Samuel Ortiz",
    "prescribedDate": "2023-09-08",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Sertraline 50 mg Tablet",
        "rxcui": "312941",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1052-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 10.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-09-08",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000115",
    "timestamp": 1694116800000,
    "patientId": "PT-000029",
    "drugInput": "Gabapentin 300 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Grace Whitman",
    "prescribedDate": "2023-09-07",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1080-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 1,
          "totalQuantity": 90,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-09-08",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000116",
    "timestamp": 1694030400000,
    "patientId": "PT-000029",
    "drugInput": "Gabapentin 300 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 90,
    "refills": 3,
    "prescriber": "Dr. Grace Whitman",
    "prescribedDate": "2023-09-06",
    "isFavorite": true,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 270,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1080-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 3,
          "totalQuantity": 270,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-09-06",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000117",
    "timestamp": 1703908800000,
    "patientId": "PT-000029",
    "drugInput": "Gabapentin 300 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Grace Whitman",
    "prescribedDate": "2023-12-30",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1080-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 1,
          "totalQuantity": 90,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Amelia Johnson",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000118",
    "timestamp": 1693854000000,
    "patientId": "PT-000030",
    "drugInput": "Metoprolol 25 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Lauren McKay",
    "prescribedDate": "2023-09-04",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 25 mg Tablet",
        "rxcui": "866408",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1021-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-09-05",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000119",
    "timestamp": 1693767600000,
    "patientId": "PT-000030",
    "drugInput": "Metoprolol 25 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 90,
    "refills": 4,
    "prescriber": "Dr. Lauren McKay",
    "prescribedDate": "2023-09-03",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 25 mg Tablet",
        "rxcui": "866408",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 180,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1021-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 3,
          "totalQuantity": 180,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-09-03",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000120",
    "timestamp": 1693677600000,
    "patientId": "PT-000031",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 30,
    "refills": 5,
    "prescriber": "Dr. Fatima Al-Hassan",
    "prescribedDate": "2023-09-02",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-09-03",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000121",
    "timestamp": 1693591200000,
    "patientId": "PT-000031",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 90,
    "refills": 5,
    "prescriber": "Dr. Fatima Al-Hassan",
    "prescribedDate": "2023-09-01",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-09-01",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000122",
    "timestamp": 1703916000000,
    "patientId": "PT-000031",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 30,
    "refills": 5,
    "prescriber": "Dr. Fatima Al-Hassan",
    "prescribedDate": "2023-12-30",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Lisa Hernandez",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000123",
    "timestamp": 1693418400000,
    "patientId": "PT-000031",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 14,
    "refills": 4,
    "prescriber": "Dr. Fatima Al-Hassan",
    "prescribedDate": "2023-08-30",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 14
      },
      "calculation": {
        "totalQuantityNeeded": 14,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "partial-fill",
    "fillDate": "2023-08-31",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000124",
    "timestamp": 1693328400000,
    "patientId": "PT-000032",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Rachel Goldstein",
    "prescribedDate": "2023-08-29",
    "isFavorite": true,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-08-30",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000125",
    "timestamp": 1693242000000,
    "patientId": "PT-000032",
    "drugInput": "Blood Glucose Test Strips Standard Supply",
    "sig": "Use to test blood glucose four times daily",
    "daysSupply": 30,
    "refills": 6,
    "prescriber": "Dr. Omar Ibrahim",
    "prescribedDate": "2023-08-28",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "rxcui": "578367",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "strip",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1142-01",
          "packageDescription": "50 strips",
          "packageSize": 50,
          "packagesNeeded": 3,
          "totalQuantity": 150,
          "costPerPackage": 37.5
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-08-30",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000126",
    "timestamp": 1693155600000,
    "patientId": "PT-000032",
    "drugInput": "30G Lancets 30 gauge Supply",
    "sig": "Use to obtain blood sample four times daily",
    "daysSupply": 30,
    "refills": 5,
    "prescriber": "Dr. Teresa Nguyen",
    "prescribedDate": "2023-08-27",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "30G Lancets 30 gauge Supply",
        "rxcui": "998218",
        "sig": "Use to obtain blood sample four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "lancet",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1144-01",
          "packageDescription": "100 lancets",
          "packageSize": 100,
          "packagesNeeded": 2,
          "totalQuantity": 200,
          "costPerPackage": 12
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-08-30",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000127",
    "timestamp": 1693069200000,
    "patientId": "PT-000032",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 90,
    "refills": 4,
    "prescriber": "Dr. Rachel Goldstein",
    "prescribedDate": "2023-08-26",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 180,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 3,
          "totalQuantity": 180,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-08-26",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000128",
    "timestamp": 1700011800000,
    "patientId": "PT-000032",
    "drugInput": "Blood Glucose Test Strips Standard Supply",
    "sig": "Use to test blood glucose four times daily",
    "daysSupply": 30,
    "refills": 5,
    "prescriber": "Dr. Omar Ibrahim",
    "prescribedDate": "2023-11-15",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "rxcui": "578367",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "strip",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1142-01",
          "packageDescription": "50 strips",
          "packageSize": 50,
          "packagesNeeded": 3,
          "totalQuantity": 150,
          "costPerPackage": 37.5
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Historical refill documented for adherence tracking."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-18",
    "pharmacist": "Priyanka Shah",
    "notes": "Historical record for adherence review."
  },
  {
    "id": "RX-000129",
    "timestamp": 1692892800000,
    "patientId": "PT-000033",
    "drugInput": "Sertraline 50 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Teresa Nguyen",
    "prescribedDate": "2023-08-24",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Sertraline 50 mg Tablet",
        "rxcui": "312941",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1052-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 10.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-08-25",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000130",
    "timestamp": 1692806400000,
    "patientId": "PT-000033",
    "drugInput": "Sertraline 50 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 90,
    "refills": 3,
    "prescriber": "Dr. Teresa Nguyen",
    "prescribedDate": "2023-08-23",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Sertraline 50 mg Tablet",
        "rxcui": "312941",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1052-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 10.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-08-23",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000131",
    "timestamp": 1703923200000,
    "patientId": "PT-000033",
    "drugInput": "Sertraline 50 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Teresa Nguyen",
    "prescribedDate": "2023-12-30",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Sertraline 50 mg Tablet",
        "rxcui": "312941",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1052-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 10.2
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Anthony Kim",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000132",
    "timestamp": 1692630000000,
    "patientId": "PT-000034",
    "drugInput": "Gabapentin 300 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Sofia Martinez",
    "prescribedDate": "2023-08-21",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1080-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 1,
          "totalQuantity": 90,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-08-22",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000133",
    "timestamp": 1692543600000,
    "patientId": "PT-000034",
    "drugInput": "Gabapentin 300 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 90,
    "refills": 3,
    "prescriber": "Dr. Sofia Martinez",
    "prescribedDate": "2023-08-20",
    "isFavorite": true,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 270,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1080-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 3,
          "totalQuantity": 270,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-08-20",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000134",
    "timestamp": 1692453600000,
    "patientId": "PT-000035",
    "drugInput": "Metoprolol 25 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 30,
    "refills": 4,
    "prescriber": "Dr. Alicia Romero",
    "prescribedDate": "2023-08-19",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 25 mg Tablet",
        "rxcui": "866408",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1021-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-08-20",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000135",
    "timestamp": 1692367200000,
    "patientId": "PT-000035",
    "drugInput": "Metoprolol 25 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 90,
    "refills": 4,
    "prescriber": "Dr. Alicia Romero",
    "prescribedDate": "2023-08-18",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 25 mg Tablet",
        "rxcui": "866408",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 180,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1021-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 3,
          "totalQuantity": 180,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-08-18",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000136",
    "timestamp": 1703930400000,
    "patientId": "PT-000035",
    "drugInput": "Metoprolol 25 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 30,
    "refills": 4,
    "prescriber": "Dr. Alicia Romero",
    "prescribedDate": "2023-12-30",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 25 mg Tablet",
        "rxcui": "866408",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1021-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Amelia Johnson",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000137",
    "timestamp": 1692190800000,
    "patientId": "PT-000036",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 30,
    "refills": 5,
    "prescriber": "Dr. Maya Chen",
    "prescribedDate": "2023-08-16",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-08-17",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000138",
    "timestamp": 1692104400000,
    "patientId": "PT-000036",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 90,
    "refills": 5,
    "prescriber": "Dr. Maya Chen",
    "prescribedDate": "2023-08-15",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-08-15",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000139",
    "timestamp": 1692018000000,
    "patientId": "PT-000036",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 14,
    "refills": 5,
    "prescriber": "Dr. Maya Chen",
    "prescribedDate": "2023-08-14",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 14
      },
      "calculation": {
        "totalQuantityNeeded": 14,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "partial-fill",
    "fillDate": "2023-08-15",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000140",
    "timestamp": 1691928000000,
    "patientId": "PT-000037",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 30,
    "refills": 4,
    "prescriber": "Dr. Evelyn Brooks",
    "prescribedDate": "2023-08-13",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-08-14",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000141",
    "timestamp": 1691841600000,
    "patientId": "PT-000037",
    "drugInput": "Blood Glucose Test Strips Standard Supply",
    "sig": "Use to test blood glucose four times daily",
    "daysSupply": 30,
    "refills": 5,
    "prescriber": "Dr. Samuel Ortiz",
    "prescribedDate": "2023-08-12",
    "isFavorite": true,
    "result": {
      "prescription": {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "rxcui": "578367",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "strip",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1142-01",
          "packageDescription": "50 strips",
          "packageSize": 50,
          "packagesNeeded": 3,
          "totalQuantity": 150,
          "costPerPackage": 37.5
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-08-14",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000142",
    "timestamp": 1691755200000,
    "patientId": "PT-000037",
    "drugInput": "30G Lancets 30 gauge Supply",
    "sig": "Use to obtain blood sample four times daily",
    "daysSupply": 30,
    "refills": 6,
    "prescriber": "Dr. Priya Nair",
    "prescribedDate": "2023-08-11",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "30G Lancets 30 gauge Supply",
        "rxcui": "998218",
        "sig": "Use to obtain blood sample four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "lancet",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1144-01",
          "packageDescription": "100 lancets",
          "packageSize": 100,
          "packagesNeeded": 2,
          "totalQuantity": 200,
          "costPerPackage": 12
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-08-14",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000143",
    "timestamp": 1691668800000,
    "patientId": "PT-000037",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 90,
    "refills": 4,
    "prescriber": "Dr. Evelyn Brooks",
    "prescribedDate": "2023-08-10",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 180,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 3,
          "totalQuantity": 180,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-08-10",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000144",
    "timestamp": 1699984800000,
    "patientId": "PT-000037",
    "drugInput": "Blood Glucose Test Strips Standard Supply",
    "sig": "Use to test blood glucose four times daily",
    "daysSupply": 30,
    "refills": 6,
    "prescriber": "Dr. Samuel Ortiz",
    "prescribedDate": "2023-11-14",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "rxcui": "578367",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "strip",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1142-01",
          "packageDescription": "50 strips",
          "packageSize": 50,
          "packagesNeeded": 3,
          "totalQuantity": 150,
          "costPerPackage": 37.5
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Historical refill documented for adherence tracking."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-17",
    "pharmacist": "Amelia Johnson",
    "notes": "Historical record for adherence review."
  },
  {
    "id": "RX-000145",
    "timestamp": 1703937600000,
    "patientId": "PT-000037",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Evelyn Brooks",
    "prescribedDate": "2023-12-30",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Jordan Patel",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000146",
    "timestamp": 1691406000000,
    "patientId": "PT-000038",
    "drugInput": "Sertraline 50 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Priya Nair",
    "prescribedDate": "2023-08-07",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Sertraline 50 mg Tablet",
        "rxcui": "312941",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1052-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 10.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-08-08",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000147",
    "timestamp": 1691319600000,
    "patientId": "PT-000038",
    "drugInput": "Sertraline 50 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 90,
    "refills": 3,
    "prescriber": "Dr. Priya Nair",
    "prescribedDate": "2023-08-06",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Sertraline 50 mg Tablet",
        "rxcui": "312941",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1052-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 10.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-08-06",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000148",
    "timestamp": 1691229600000,
    "patientId": "PT-000039",
    "drugInput": "Gabapentin 300 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Michael Tanaka",
    "prescribedDate": "2023-08-05",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1080-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 1,
          "totalQuantity": 90,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-08-06",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000149",
    "timestamp": 1691143200000,
    "patientId": "PT-000039",
    "drugInput": "Gabapentin 300 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 90,
    "refills": 3,
    "prescriber": "Dr. Michael Tanaka",
    "prescribedDate": "2023-08-04",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 270,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1080-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 3,
          "totalQuantity": 270,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-08-04",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000150",
    "timestamp": 1703944800000,
    "patientId": "PT-000039",
    "drugInput": "Gabapentin 300 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Michael Tanaka",
    "prescribedDate": "2023-12-30",
    "isFavorite": true,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1080-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 1,
          "totalQuantity": 90,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Anthony Kim",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000151",
    "timestamp": 1690966800000,
    "patientId": "PT-000040",
    "drugInput": "Metoprolol 25 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 30,
    "refills": 4,
    "prescriber": "Dr. Henry Caldwell",
    "prescribedDate": "2023-08-02",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 25 mg Tablet",
        "rxcui": "866408",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1021-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-08-03",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000152",
    "timestamp": 1690880400000,
    "patientId": "PT-000040",
    "drugInput": "Metoprolol 25 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 90,
    "refills": 4,
    "prescriber": "Dr. Henry Caldwell",
    "prescribedDate": "2023-08-01",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 25 mg Tablet",
        "rxcui": "866408",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 180,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1021-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 3,
          "totalQuantity": 180,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-08-01",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000153",
    "timestamp": 1690790400000,
    "patientId": "PT-000041",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 30,
    "refills": 4,
    "prescriber": "Dr. Victor Suarez",
    "prescribedDate": "2023-07-31",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-08-01",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000154",
    "timestamp": 1690704000000,
    "patientId": "PT-000041",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 90,
    "refills": 5,
    "prescriber": "Dr. Victor Suarez",
    "prescribedDate": "2023-07-30",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-07-30",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000155",
    "timestamp": 1703952000000,
    "patientId": "PT-000041",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 30,
    "refills": 4,
    "prescriber": "Dr. Victor Suarez",
    "prescribedDate": "2023-12-30",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Amelia Johnson",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000156",
    "timestamp": 1690531200000,
    "patientId": "PT-000041",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 14,
    "refills": 5,
    "prescriber": "Dr. Victor Suarez",
    "prescribedDate": "2023-07-28",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 14
      },
      "calculation": {
        "totalQuantityNeeded": 14,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "partial-fill",
    "fillDate": "2023-07-29",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000157",
    "timestamp": 1690441200000,
    "patientId": "PT-000042",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 30,
    "refills": 4,
    "prescriber": "Dr. Omar Ibrahim",
    "prescribedDate": "2023-07-27",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-07-28",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000158",
    "timestamp": 1690354800000,
    "patientId": "PT-000042",
    "drugInput": "Blood Glucose Test Strips Standard Supply",
    "sig": "Use to test blood glucose four times daily",
    "daysSupply": 30,
    "refills": 5,
    "prescriber": "Dr. Teresa Nguyen",
    "prescribedDate": "2023-07-26",
    "isFavorite": true,
    "result": {
      "prescription": {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "rxcui": "578367",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "strip",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1142-01",
          "packageDescription": "50 strips",
          "packageSize": 50,
          "packagesNeeded": 3,
          "totalQuantity": 150,
          "costPerPackage": 37.5
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-07-28",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000159",
    "timestamp": 1690268400000,
    "patientId": "PT-000042",
    "drugInput": "30G Lancets 30 gauge Supply",
    "sig": "Use to obtain blood sample four times daily",
    "daysSupply": 30,
    "refills": 6,
    "prescriber": "Dr. Carlos Mendes",
    "prescribedDate": "2023-07-25",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "30G Lancets 30 gauge Supply",
        "rxcui": "998218",
        "sig": "Use to obtain blood sample four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "lancet",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1144-01",
          "packageDescription": "100 lancets",
          "packageSize": 100,
          "packagesNeeded": 2,
          "totalQuantity": 200,
          "costPerPackage": 12
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-07-28",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000160",
    "timestamp": 1690182000000,
    "patientId": "PT-000042",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 90,
    "refills": 4,
    "prescriber": "Dr. Omar Ibrahim",
    "prescribedDate": "2023-07-24",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 180,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 3,
          "totalQuantity": 180,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-07-24",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000161",
    "timestamp": 1699957800000,
    "patientId": "PT-000042",
    "drugInput": "Blood Glucose Test Strips Standard Supply",
    "sig": "Use to test blood glucose four times daily",
    "daysSupply": 30,
    "refills": 6,
    "prescriber": "Dr. Teresa Nguyen",
    "prescribedDate": "2023-11-14",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "rxcui": "578367",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "strip",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1142-01",
          "packageDescription": "50 strips",
          "packageSize": 50,
          "packagesNeeded": 3,
          "totalQuantity": 150,
          "costPerPackage": 37.5
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Historical refill documented for adherence tracking."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-17",
    "pharmacist": "Lisa Hernandez",
    "notes": "Historical record for adherence review."
  },
  {
    "id": "RX-000162",
    "timestamp": 1690005600000,
    "patientId": "PT-000043",
    "drugInput": "Sertraline 50 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Carlos Mendes",
    "prescribedDate": "2023-07-22",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Sertraline 50 mg Tablet",
        "rxcui": "312941",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1052-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 10.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-07-23",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000163",
    "timestamp": 1689919200000,
    "patientId": "PT-000043",
    "drugInput": "Sertraline 50 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 90,
    "refills": 3,
    "prescriber": "Dr. Carlos Mendes",
    "prescribedDate": "2023-07-21",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Sertraline 50 mg Tablet",
        "rxcui": "312941",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1052-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 10.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-07-21",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000164",
    "timestamp": 1703959200000,
    "patientId": "PT-000043",
    "drugInput": "Sertraline 50 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Carlos Mendes",
    "prescribedDate": "2023-12-30",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Sertraline 50 mg Tablet",
        "rxcui": "312941",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1052-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 10.2
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Jordan Patel",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000165",
    "timestamp": 1689742800000,
    "patientId": "PT-000044",
    "drugInput": "Gabapentin 300 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Elliot Harper",
    "prescribedDate": "2023-07-19",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1080-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 1,
          "totalQuantity": 90,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-07-20",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000166",
    "timestamp": 1689656400000,
    "patientId": "PT-000044",
    "drugInput": "Gabapentin 300 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 90,
    "refills": 3,
    "prescriber": "Dr. Elliot Harper",
    "prescribedDate": "2023-07-18",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 270,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1080-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 3,
          "totalQuantity": 270,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-07-18",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000167",
    "timestamp": 1689566400000,
    "patientId": "PT-000045",
    "drugInput": "Metoprolol 25 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Benjamin Hsu",
    "prescribedDate": "2023-07-17",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 25 mg Tablet",
        "rxcui": "866408",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1021-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-07-18",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000168",
    "timestamp": 1689480000000,
    "patientId": "PT-000045",
    "drugInput": "Metoprolol 25 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 90,
    "refills": 4,
    "prescriber": "Dr. Benjamin Hsu",
    "prescribedDate": "2023-07-16",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 25 mg Tablet",
        "rxcui": "866408",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 180,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1021-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 3,
          "totalQuantity": 180,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-07-16",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000169",
    "timestamp": 1703966400000,
    "patientId": "PT-000045",
    "drugInput": "Metoprolol 25 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Benjamin Hsu",
    "prescribedDate": "2023-12-30",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 25 mg Tablet",
        "rxcui": "866408",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1021-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Anthony Kim",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000170",
    "timestamp": 1689303600000,
    "patientId": "PT-000046",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 30,
    "refills": 4,
    "prescriber": "Dr. Noah Patel",
    "prescribedDate": "2023-07-14",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-07-15",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000171",
    "timestamp": 1689217200000,
    "patientId": "PT-000046",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 90,
    "refills": 5,
    "prescriber": "Dr. Noah Patel",
    "prescribedDate": "2023-07-13",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-07-13",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000172",
    "timestamp": 1689130800000,
    "patientId": "PT-000046",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 14,
    "refills": 4,
    "prescriber": "Dr. Noah Patel",
    "prescribedDate": "2023-07-12",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 14
      },
      "calculation": {
        "totalQuantityNeeded": 14,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "partial-fill",
    "fillDate": "2023-07-13",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000173",
    "timestamp": 1689040800000,
    "patientId": "PT-000047",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Samuel Ortiz",
    "prescribedDate": "2023-07-11",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-07-12",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000174",
    "timestamp": 1688954400000,
    "patientId": "PT-000047",
    "drugInput": "Blood Glucose Test Strips Standard Supply",
    "sig": "Use to test blood glucose four times daily",
    "daysSupply": 30,
    "refills": 6,
    "prescriber": "Dr. Priya Nair",
    "prescribedDate": "2023-07-10",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "rxcui": "578367",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "strip",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1142-01",
          "packageDescription": "50 strips",
          "packageSize": 50,
          "packagesNeeded": 3,
          "totalQuantity": 150,
          "costPerPackage": 37.5
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-07-12",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000175",
    "timestamp": 1688868000000,
    "patientId": "PT-000047",
    "drugInput": "30G Lancets 30 gauge Supply",
    "sig": "Use to obtain blood sample four times daily",
    "daysSupply": 30,
    "refills": 5,
    "prescriber": "Dr. Grace Whitman",
    "prescribedDate": "2023-07-09",
    "isFavorite": true,
    "result": {
      "prescription": {
        "drugName": "30G Lancets 30 gauge Supply",
        "rxcui": "998218",
        "sig": "Use to obtain blood sample four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "lancet",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1144-01",
          "packageDescription": "100 lancets",
          "packageSize": 100,
          "packagesNeeded": 2,
          "totalQuantity": 200,
          "costPerPackage": 12
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-07-12",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000176",
    "timestamp": 1688781600000,
    "patientId": "PT-000047",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 90,
    "refills": 4,
    "prescriber": "Dr. Samuel Ortiz",
    "prescribedDate": "2023-07-08",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 180,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 3,
          "totalQuantity": 180,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-07-08",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000177",
    "timestamp": 1699930800000,
    "patientId": "PT-000047",
    "drugInput": "Blood Glucose Test Strips Standard Supply",
    "sig": "Use to test blood glucose four times daily",
    "daysSupply": 30,
    "refills": 5,
    "prescriber": "Dr. Priya Nair",
    "prescribedDate": "2023-11-14",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "rxcui": "578367",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "strip",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1142-01",
          "packageDescription": "50 strips",
          "packageSize": 50,
          "packagesNeeded": 3,
          "totalQuantity": 150,
          "costPerPackage": 37.5
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Historical refill documented for adherence tracking."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-17",
    "pharmacist": "Anthony Kim",
    "notes": "Historical record for adherence review."
  },
  {
    "id": "RX-000178",
    "timestamp": 1703973600000,
    "patientId": "PT-000047",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 30,
    "refills": 4,
    "prescriber": "Dr. Samuel Ortiz",
    "prescribedDate": "2023-12-30",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Priyanka Shah",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000179",
    "timestamp": 1688518800000,
    "patientId": "PT-000048",
    "drugInput": "Sertraline 50 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Grace Whitman",
    "prescribedDate": "2023-07-05",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Sertraline 50 mg Tablet",
        "rxcui": "312941",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1052-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 10.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-07-06",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000180",
    "timestamp": 1688432400000,
    "patientId": "PT-000048",
    "drugInput": "Sertraline 50 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 90,
    "refills": 3,
    "prescriber": "Dr. Grace Whitman",
    "prescribedDate": "2023-07-04",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Sertraline 50 mg Tablet",
        "rxcui": "312941",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1052-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 10.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-07-04",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000181",
    "timestamp": 1688342400000,
    "patientId": "PT-000049",
    "drugInput": "Gabapentin 300 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Lauren McKay",
    "prescribedDate": "2023-07-03",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1080-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 1,
          "totalQuantity": 90,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-07-04",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000182",
    "timestamp": 1688256000000,
    "patientId": "PT-000049",
    "drugInput": "Gabapentin 300 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 90,
    "refills": 3,
    "prescriber": "Dr. Lauren McKay",
    "prescribedDate": "2023-07-02",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 270,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1080-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 3,
          "totalQuantity": 270,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-07-02",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000183",
    "timestamp": 1703980800000,
    "patientId": "PT-000049",
    "drugInput": "Gabapentin 300 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Lauren McKay",
    "prescribedDate": "2023-12-31",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1080-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 1,
          "totalQuantity": 90,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Jordan Patel",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000184",
    "timestamp": 1688079600000,
    "patientId": "PT-000050",
    "drugInput": "Metoprolol 25 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Fatima Al-Hassan",
    "prescribedDate": "2023-06-29",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 25 mg Tablet",
        "rxcui": "866408",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1021-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-06-30",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000185",
    "timestamp": 1687993200000,
    "patientId": "PT-000050",
    "drugInput": "Metoprolol 25 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 90,
    "refills": 4,
    "prescriber": "Dr. Fatima Al-Hassan",
    "prescribedDate": "2023-06-28",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 25 mg Tablet",
        "rxcui": "866408",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 180,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1021-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 3,
          "totalQuantity": 180,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-06-28",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000186",
    "timestamp": 1687903200000,
    "patientId": "PT-000051",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 30,
    "refills": 5,
    "prescriber": "Dr. Rachel Goldstein",
    "prescribedDate": "2023-06-27",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-06-28",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000187",
    "timestamp": 1687816800000,
    "patientId": "PT-000051",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 90,
    "refills": 5,
    "prescriber": "Dr. Rachel Goldstein",
    "prescribedDate": "2023-06-26",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-06-26",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000188",
    "timestamp": 1703988000000,
    "patientId": "PT-000051",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 30,
    "refills": 5,
    "prescriber": "Dr. Rachel Goldstein",
    "prescribedDate": "2023-12-31",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Anthony Kim",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000189",
    "timestamp": 1687644000000,
    "patientId": "PT-000051",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 14,
    "refills": 4,
    "prescriber": "Dr. Rachel Goldstein",
    "prescribedDate": "2023-06-24",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 14
      },
      "calculation": {
        "totalQuantityNeeded": 14,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "partial-fill",
    "fillDate": "2023-06-25",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000190",
    "timestamp": 1687554000000,
    "patientId": "PT-000052",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Teresa Nguyen",
    "prescribedDate": "2023-06-23",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-06-24",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000191",
    "timestamp": 1687467600000,
    "patientId": "PT-000052",
    "drugInput": "Blood Glucose Test Strips Standard Supply",
    "sig": "Use to test blood glucose four times daily",
    "daysSupply": 30,
    "refills": 6,
    "prescriber": "Dr. Carlos Mendes",
    "prescribedDate": "2023-06-22",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "rxcui": "578367",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "strip",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1142-01",
          "packageDescription": "50 strips",
          "packageSize": 50,
          "packagesNeeded": 3,
          "totalQuantity": 150,
          "costPerPackage": 37.5
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-06-24",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000192",
    "timestamp": 1687381200000,
    "patientId": "PT-000052",
    "drugInput": "30G Lancets 30 gauge Supply",
    "sig": "Use to obtain blood sample four times daily",
    "daysSupply": 30,
    "refills": 5,
    "prescriber": "Dr. Sofia Martinez",
    "prescribedDate": "2023-06-21",
    "isFavorite": true,
    "result": {
      "prescription": {
        "drugName": "30G Lancets 30 gauge Supply",
        "rxcui": "998218",
        "sig": "Use to obtain blood sample four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "lancet",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1144-01",
          "packageDescription": "100 lancets",
          "packageSize": 100,
          "packagesNeeded": 2,
          "totalQuantity": 200,
          "costPerPackage": 12
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-06-24",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000193",
    "timestamp": 1687294800000,
    "patientId": "PT-000052",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 90,
    "refills": 4,
    "prescriber": "Dr. Teresa Nguyen",
    "prescribedDate": "2023-06-20",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 180,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 3,
          "totalQuantity": 180,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-06-20",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000194",
    "timestamp": 1699903800000,
    "patientId": "PT-000052",
    "drugInput": "Blood Glucose Test Strips Standard Supply",
    "sig": "Use to test blood glucose four times daily",
    "daysSupply": 30,
    "refills": 5,
    "prescriber": "Dr. Carlos Mendes",
    "prescribedDate": "2023-11-13",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "rxcui": "578367",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "strip",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1142-01",
          "packageDescription": "50 strips",
          "packageSize": 50,
          "packagesNeeded": 3,
          "totalQuantity": 150,
          "costPerPackage": 37.5
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Historical refill documented for adherence tracking."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-16",
    "pharmacist": "Amelia Johnson",
    "notes": "Historical record for adherence review."
  },
  {
    "id": "RX-000195",
    "timestamp": 1687118400000,
    "patientId": "PT-000053",
    "drugInput": "Sertraline 50 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Sofia Martinez",
    "prescribedDate": "2023-06-18",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Sertraline 50 mg Tablet",
        "rxcui": "312941",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1052-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 10.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-06-19",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000196",
    "timestamp": 1687032000000,
    "patientId": "PT-000053",
    "drugInput": "Sertraline 50 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 90,
    "refills": 3,
    "prescriber": "Dr. Sofia Martinez",
    "prescribedDate": "2023-06-17",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Sertraline 50 mg Tablet",
        "rxcui": "312941",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1052-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 10.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-06-17",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000197",
    "timestamp": 1703995200000,
    "patientId": "PT-000053",
    "drugInput": "Sertraline 50 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Sofia Martinez",
    "prescribedDate": "2023-12-31",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Sertraline 50 mg Tablet",
        "rxcui": "312941",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1052-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 10.2
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Priyanka Shah",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000198",
    "timestamp": 1686855600000,
    "patientId": "PT-000054",
    "drugInput": "Gabapentin 300 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Alicia Romero",
    "prescribedDate": "2023-06-15",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1080-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 1,
          "totalQuantity": 90,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-06-16",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000199",
    "timestamp": 1686769200000,
    "patientId": "PT-000054",
    "drugInput": "Gabapentin 300 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 90,
    "refills": 3,
    "prescriber": "Dr. Alicia Romero",
    "prescribedDate": "2023-06-14",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 270,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1080-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 3,
          "totalQuantity": 270,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-06-14",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000200",
    "timestamp": 1686679200000,
    "patientId": "PT-000055",
    "drugInput": "Metoprolol 25 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 30,
    "refills": 4,
    "prescriber": "Dr. Maya Chen",
    "prescribedDate": "2023-06-13",
    "isFavorite": true,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 25 mg Tablet",
        "rxcui": "866408",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1021-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-06-14",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000201",
    "timestamp": 1686592800000,
    "patientId": "PT-000055",
    "drugInput": "Metoprolol 25 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 90,
    "refills": 4,
    "prescriber": "Dr. Maya Chen",
    "prescribedDate": "2023-06-12",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 25 mg Tablet",
        "rxcui": "866408",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 180,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1021-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 3,
          "totalQuantity": 180,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-06-12",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000202",
    "timestamp": 1704002400000,
    "patientId": "PT-000055",
    "drugInput": "Metoprolol 25 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 30,
    "refills": 4,
    "prescriber": "Dr. Maya Chen",
    "prescribedDate": "2023-12-31",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 25 mg Tablet",
        "rxcui": "866408",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1021-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Jordan Patel",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000203",
    "timestamp": 1686416400000,
    "patientId": "PT-000056",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 30,
    "refills": 5,
    "prescriber": "Dr. Evelyn Brooks",
    "prescribedDate": "2023-06-10",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-06-11",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000204",
    "timestamp": 1686330000000,
    "patientId": "PT-000056",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 90,
    "refills": 5,
    "prescriber": "Dr. Evelyn Brooks",
    "prescribedDate": "2023-06-09",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-06-09",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000205",
    "timestamp": 1686243600000,
    "patientId": "PT-000056",
    "drugInput": "Levothyroxine 75 mcg Tablet",
    "sig": "Take 1 tablet by mouth every morning on an empty stomach",
    "daysSupply": 14,
    "refills": 5,
    "prescriber": "Dr. Evelyn Brooks",
    "prescribedDate": "2023-06-08",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "rxcui": "966159",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "daysSupply": 14
      },
      "calculation": {
        "totalQuantityNeeded": 14,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "43112-1092-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 5.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "partial-fill",
    "fillDate": "2023-06-09",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000206",
    "timestamp": 1686153600000,
    "patientId": "PT-000057",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 30,
    "refills": 4,
    "prescriber": "Dr. Priya Nair",
    "prescribedDate": "2023-06-07",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-06-08",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000207",
    "timestamp": 1686067200000,
    "patientId": "PT-000057",
    "drugInput": "Blood Glucose Test Strips Standard Supply",
    "sig": "Use to test blood glucose four times daily",
    "daysSupply": 30,
    "refills": 5,
    "prescriber": "Dr. Grace Whitman",
    "prescribedDate": "2023-06-06",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "rxcui": "578367",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "strip",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1142-01",
          "packageDescription": "50 strips",
          "packageSize": 50,
          "packagesNeeded": 3,
          "totalQuantity": 150,
          "costPerPackage": 37.5
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-06-08",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000208",
    "timestamp": 1685980800000,
    "patientId": "PT-000057",
    "drugInput": "30G Lancets 30 gauge Supply",
    "sig": "Use to obtain blood sample four times daily",
    "daysSupply": 30,
    "refills": 6,
    "prescriber": "Dr. Michael Tanaka",
    "prescribedDate": "2023-06-05",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "30G Lancets 30 gauge Supply",
        "rxcui": "998218",
        "sig": "Use to obtain blood sample four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "lancet",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1144-01",
          "packageDescription": "100 lancets",
          "packageSize": 100,
          "packagesNeeded": 2,
          "totalQuantity": 200,
          "costPerPackage": 12
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-06-08",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000209",
    "timestamp": 1685894400000,
    "patientId": "PT-000057",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 90,
    "refills": 4,
    "prescriber": "Dr. Priya Nair",
    "prescribedDate": "2023-06-04",
    "isFavorite": true,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 180,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 3,
          "totalQuantity": 180,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-06-04",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000210",
    "timestamp": 1699876800000,
    "patientId": "PT-000057",
    "drugInput": "Blood Glucose Test Strips Standard Supply",
    "sig": "Use to test blood glucose four times daily",
    "daysSupply": 30,
    "refills": 6,
    "prescriber": "Dr. Grace Whitman",
    "prescribedDate": "2023-11-13",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "rxcui": "578367",
        "sig": "Use to test blood glucose four times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "strip",
        "perDose": 1,
        "frequency": 4,
        "dailyAmount": 4
      },
      "packages": [
        {
          "ndc": "54868-1142-01",
          "packageDescription": "50 strips",
          "packageSize": 50,
          "packagesNeeded": 3,
          "totalQuantity": 150,
          "costPerPackage": 37.5
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Historical refill documented for adherence tracking."
      }
    },
    "status": "filled",
    "fillDate": "2023-11-16",
    "pharmacist": "Jordan Patel",
    "notes": "Historical record for adherence review."
  },
  {
    "id": "RX-000211",
    "timestamp": 1704009600000,
    "patientId": "PT-000057",
    "drugInput": "Metformin 500 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily with meals",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Priya Nair",
    "prescribedDate": "2023-12-31",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metformin 500 mg Tablet",
        "rxcui": "861008",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1039-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Lisa Hernandez",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000212",
    "timestamp": 1685631600000,
    "patientId": "PT-000058",
    "drugInput": "Sertraline 50 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 30,
    "refills": 2,
    "prescriber": "Dr. Michael Tanaka",
    "prescribedDate": "2023-06-01",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Sertraline 50 mg Tablet",
        "rxcui": "312941",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1052-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 10.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-06-02",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000213",
    "timestamp": 1685545200000,
    "patientId": "PT-000058",
    "drugInput": "Sertraline 50 mg Tablet",
    "sig": "Take 1 tablet by mouth once daily",
    "daysSupply": 90,
    "refills": 3,
    "prescriber": "Dr. Michael Tanaka",
    "prescribedDate": "2023-05-31",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Sertraline 50 mg Tablet",
        "rxcui": "312941",
        "sig": "Take 1 tablet by mouth once daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "62037-1052-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 3,
          "totalQuantity": 90,
          "costPerPackage": 10.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-05-31",
    "pharmacist": "Amelia Johnson"
  },
  {
    "id": "RX-000214",
    "timestamp": 1685455200000,
    "patientId": "PT-000059",
    "drugInput": "Gabapentin 300 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Henry Caldwell",
    "prescribedDate": "2023-05-30",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1080-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 1,
          "totalQuantity": 90,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-05-31",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000215",
    "timestamp": 1685368800000,
    "patientId": "PT-000059",
    "drugInput": "Gabapentin 300 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 90,
    "refills": 3,
    "prescriber": "Dr. Henry Caldwell",
    "prescribedDate": "2023-05-29",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 270,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1080-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 3,
          "totalQuantity": 270,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-05-29",
    "pharmacist": "Anthony Kim"
  },
  {
    "id": "RX-000216",
    "timestamp": 1704016800000,
    "patientId": "PT-000059",
    "drugInput": "Gabapentin 300 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily",
    "daysSupply": 30,
    "refills": 3,
    "prescriber": "Dr. Henry Caldwell",
    "prescribedDate": "2023-12-31",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "sig": "Take 1 capsule by mouth three times daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 90,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1080-01",
          "packageDescription": "90 capsules",
          "packageSize": 90,
          "packagesNeeded": 1,
          "totalQuantity": 90,
          "costPerPackage": 20.7
        }
      ],
      "recommendation": {
        "type": "inventory",
        "message": "Awaiting stock replenishment before fill."
      }
    },
    "status": "pending",
    "pharmacist": "Priyanka Shah",
    "notes": "Pending due to temporary stock shortage."
  },
  {
    "id": "RX-000217",
    "timestamp": 1685192400000,
    "patientId": "PT-000060",
    "drugInput": "Metoprolol 25 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 30,
    "refills": 4,
    "prescriber": "Dr. Victor Suarez",
    "prescribedDate": "2023-05-27",
    "isFavorite": true,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 25 mg Tablet",
        "rxcui": "866408",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1021-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-05-28",
    "pharmacist": "Jordan Patel"
  },
  {
    "id": "RX-000218",
    "timestamp": 1685106000000,
    "patientId": "PT-000060",
    "drugInput": "Metoprolol 25 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 90,
    "refills": 4,
    "prescriber": "Dr. Victor Suarez",
    "prescribedDate": "2023-05-26",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Metoprolol 25 mg Tablet",
        "rxcui": "866408",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 90
      },
      "calculation": {
        "totalQuantityNeeded": 180,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1021-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 3,
          "totalQuantity": 180,
          "costPerPackage": 16.2
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "filled",
    "fillDate": "2023-05-26",
    "pharmacist": "Lisa Hernandez"
  },
  {
    "id": "RX-000219",
    "timestamp": 1685232000000,
    "patientId": "PT-000001",
    "drugInput": "Fluticasone Inhaler 110 mcg/actuation Inhaler",
    "sig": "Inhale 1 puff by mouth twice daily",
    "daysSupply": 60,
    "refills": 2,
    "prescriber": "Dr. Benjamin Hsu",
    "prescribedDate": "2023-05-28",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Fluticasone Inhaler 110 mcg/actuation Inhaler",
        "rxcui": "1991476",
        "sig": "Inhale 1 puff by mouth twice daily",
        "daysSupply": 60
      },
      "calculation": {
        "totalQuantityNeeded": 120,
        "unit": "puff",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "54868-1097-01",
          "packageDescription": "120-dose inhaler",
          "packageSize": 120,
          "packagesNeeded": 1,
          "totalQuantity": 120,
          "costPerPackage": 42
        }
      ],
      "recommendation": {
        "type": "manual-review",
        "message": "Verify spacer technique and adherence before extending supply."
      }
    },
    "status": "filled",
    "fillDate": "2023-05-29",
    "pharmacist": "Priyanka Shah",
    "notes": "Extended supply for upcoming travel."
  },
  {
    "id": "RX-000220",
    "timestamp": 1685138400000,
    "patientId": "PT-000003",
    "drugInput": "Amoxicillin 500 mg Capsule",
    "sig": "Take 1 capsule by mouth three times daily for 10 days",
    "daysSupply": 10,
    "refills": 1,
    "prescriber": "Dr. Maya Chen",
    "prescribedDate": "2023-05-26",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Amoxicillin 500 mg Capsule",
        "rxcui": "833036",
        "sig": "Take 1 capsule by mouth three times daily for 10 days",
        "daysSupply": 10
      },
      "calculation": {
        "totalQuantityNeeded": 30,
        "unit": "capsule",
        "perDose": 1,
        "frequency": 3,
        "dailyAmount": 3
      },
      "packages": [
        {
          "ndc": "54868-1106-01",
          "packageDescription": "30 capsules",
          "packageSize": 30,
          "packagesNeeded": 1,
          "totalQuantity": 30,
          "costPerPackage": 5.4
        }
      ],
      "recommendation": {
        "type": "allergy",
        "message": "Allergy alert: patient reports hives with penicillin.",
        "notes": "Contact prescriber for alternative antibiotic."
      }
    },
    "status": "pending",
    "pharmacist": "Lisa Hernandez",
    "notes": "On hold due to documented penicillin allergy."
  },
  {
    "id": "RX-000221",
    "timestamp": 1685037600000,
    "patientId": "PT-000007",
    "drugInput": "Azithromycin 250 mg Tablet",
    "sig": "Take 2 tablets on day 1, then 1 tablet daily on days 2-5",
    "daysSupply": 5,
    "refills": 0,
    "prescriber": "Dr. Priya Nair",
    "prescribedDate": "2023-05-25",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Azithromycin 250 mg Tablet",
        "rxcui": "309362",
        "sig": "Take 2 tablets on day 1, then 1 tablet daily on days 2-5",
        "daysSupply": 5
      },
      "calculation": {
        "totalQuantityNeeded": 5,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 1,
        "dailyAmount": 1
      },
      "packages": [
        {
          "ndc": "54868-1108-01",
          "packageDescription": "6-tablet dose pack",
          "packageSize": 6,
          "packagesNeeded": 1,
          "totalQuantity": 6,
          "costPerPackage": 10.8
        }
      ],
      "recommendation": {
        "type": "warning",
        "message": "Potential interaction with apixaban. Monitor for bleeding.",
        "notes": "Consider alternative antibiotic if possible."
      }
    },
    "status": "filled",
    "fillDate": "2023-05-25",
    "pharmacist": "Lisa Hernandez",
    "notes": "Interaction alert generated by clinical decision support."
  },
  {
    "id": "RX-000222",
    "timestamp": 1684947600000,
    "patientId": "PT-000008",
    "drugInput": "Amphetamine/Dextroamphetamine 20 mg Tablet",
    "sig": "Take 1 tablet by mouth twice daily",
    "daysSupply": 30,
    "refills": 0,
    "prescriber": "Dr. Grace Whitman",
    "prescribedDate": "2023-05-24",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Amphetamine/Dextroamphetamine 20 mg Tablet",
        "rxcui": "861014",
        "sig": "Take 1 tablet by mouth twice daily",
        "daysSupply": 30
      },
      "calculation": {
        "totalQuantityNeeded": 60,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 2,
        "dailyAmount": 2
      },
      "packages": [
        {
          "ndc": "62037-1072-01",
          "packageDescription": "60 tablets",
          "packageSize": 60,
          "packagesNeeded": 1,
          "totalQuantity": 60,
          "costPerPackage": 66
        }
      ],
      "recommendation": {
        "type": "optimal",
        "message": "Calculated optimal package combination."
      }
    },
    "status": "partial-fill",
    "fillDate": "2023-05-25",
    "pharmacist": "Priyanka Shah"
  },
  {
    "id": "RX-000223",
    "timestamp": 1684872000000,
    "patientId": "PT-000005",
    "drugInput": "Oxycodone 10 mg Tablet",
    "sig": "Take 1 tablet by mouth every 4 hours as needed for severe pain",
    "daysSupply": 7,
    "refills": 0,
    "prescriber": "Dr. Evelyn Brooks",
    "prescribedDate": "2023-05-23",
    "isFavorite": false,
    "result": {
      "prescription": {
        "drugName": "Oxycodone 10 mg Tablet",
        "rxcui": "1049628",
        "sig": "Take 1 tablet by mouth every 4 hours as needed for severe pain",
        "daysSupply": 7
      },
      "calculation": {
        "totalQuantityNeeded": 42,
        "unit": "tablet",
        "perDose": 1,
        "frequency": 6,
        "dailyAmount": 6
      },
      "packages": [
        {
          "ndc": "62037-1129-01",
          "packageDescription": "30 tablets",
          "packageSize": 30,
          "packagesNeeded": 2,
          "totalQuantity": 60,
          "costPerPackage": 22.5
        }
      ],
      "recommendation": {
        "type": "manual-review",
        "message": "Early refill request flagged for review.",
        "notes": "Patient requested refill 10 days early; requires prescriber authorization."
      }
    },
    "status": "pending",
    "pharmacist": "Lisa Hernandez",
    "notes": "Hold until prescriber approval is obtained."
  }
] as const;
