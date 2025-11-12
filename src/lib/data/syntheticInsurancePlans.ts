import type { InsuranceFormularyPlan } from './syntheticTypes';

export const SYNTHETIC_INSURANCE_PLANS: InsuranceFormularyPlan[] = [
  {
    "insuranceProvider": "PharmaMax Commercial PPO",
    "planName": "PharmaMax Preferred PPO",
    "planType": "Commercial PPO",
    "formulary": [
      {
        "drugName": "Atorvastatin 40 mg Tablet",
        "rxcui": "861007",
        "tier": 1,
        "copay": 10,
        "priorAuthRequired": false,
        "quantityLimits": {
          "quantity": 90,
          "days": 90
        },
        "stepTherapyRequired": false,
        "stepTherapyAlternatives": [],
        "covered": true,
        "restrictions": []
      },
      {
        "drugName": "Apixaban 5 mg Tablet",
        "rxcui": "1364430",
        "tier": 3,
        "copay": 145,
        "priorAuthRequired": true,
        "quantityLimits": {
          "quantity": 60,
          "days": 30
        },
        "stepTherapyRequired": true,
        "stepTherapyAlternatives": [
          "Warfarin 5 mg Tablet"
        ],
        "covered": true,
        "restrictions": [
          "Annual prior authorization renewal"
        ]
      },
      {
        "drugName": "Buprenorphine/Naloxone 8-2 mg Film",
        "rxcui": "1010607",
        "tier": 2,
        "copay": 45,
        "priorAuthRequired": true,
        "quantityLimits": {
          "quantity": 30,
          "days": 30
        },
        "stepTherapyRequired": false,
        "stepTherapyAlternatives": [],
        "covered": true,
        "restrictions": [
          "Requires counseling documentation each quarter"
        ]
      },
      {
        "drugName": "Isotretinoin 40 mg Capsule",
        "rxcui": "40265",
        "tier": 4,
        "copay": 220,
        "priorAuthRequired": true,
        "quantityLimits": {
          "quantity": 30,
          "days": 30
        },
        "stepTherapyRequired": true,
        "stepTherapyAlternatives": [
          "Doxycycline 100 mg Capsule"
        ],
        "covered": true,
        "restrictions": [
          "iPLEDGE documentation required each fill"
        ]
      }
    ]
  },
  {
    "insuranceProvider": "Golden State Medicare Advantage",
    "planName": "Golden State Medicare Complete",
    "planType": "Medicare Part D",
    "formulary": [
      {
        "drugName": "Lisinopril 20 mg Tablet",
        "rxcui": "197361",
        "tier": 1,
        "copay": 8,
        "priorAuthRequired": false,
        "quantityLimits": {
          "quantity": 90,
          "days": 90
        },
        "stepTherapyRequired": false,
        "stepTherapyAlternatives": [],
        "covered": true,
        "restrictions": []
      },
      {
        "drugName": "Metformin 1000 mg Tablet",
        "rxcui": "860976",
        "tier": 1,
        "copay": 6,
        "priorAuthRequired": false,
        "quantityLimits": {
          "quantity": 180,
          "days": 90
        },
        "stepTherapyRequired": false,
        "stepTherapyAlternatives": [],
        "covered": true,
        "restrictions": [
          "Requires annual A1c documentation"
        ]
      },
      {
        "drugName": "Gabapentin 300 mg Capsule",
        "rxcui": "310798",
        "tier": 2,
        "copay": 25,
        "priorAuthRequired": false,
        "quantityLimits": {
          "quantity": 270,
          "days": 90
        },
        "stepTherapyRequired": false,
        "stepTherapyAlternatives": [],
        "covered": true,
        "restrictions": []
      }
    ]
  },
  {
    "insuranceProvider": "CommunityCare Medicaid",
    "planName": "CommunityCare Essential",
    "planType": "Medicaid Managed Care",
    "formulary": [
      {
        "drugName": "Amphetamine/Dextroamphetamine 20 mg Tablet",
        "rxcui": "861014",
        "tier": 3,
        "copay": 5,
        "priorAuthRequired": true,
        "quantityLimits": {
          "quantity": 60,
          "days": 30
        },
        "stepTherapyRequired": true,
        "stepTherapyAlternatives": [
          "Methylphenidate ER 18 mg Tablet"
        ],
        "covered": true,
        "restrictions": [
          "Requires updated ADHD assessment yearly"
        ]
      },
      {
        "drugName": "Naloxone 4 mg/0.1 mL Spray",
        "rxcui": "0000000",
        "tier": 1,
        "copay": 0,
        "priorAuthRequired": false,
        "quantityLimits": {
          "quantity": 2,
          "days": 30
        },
        "stepTherapyRequired": false,
        "stepTherapyAlternatives": [],
        "covered": true,
        "restrictions": [
          "Mandatory counseling at first fill"
        ]
      }
    ]
  },
  {
    "insuranceProvider": "Sunrise HMO",
    "planName": "Sunrise Choice HMO",
    "planType": "Commercial HMO",
    "formulary": [
      {
        "drugName": "Montelukast 10 mg Tablet",
        "rxcui": "200224",
        "tier": 1,
        "copay": 12,
        "priorAuthRequired": false,
        "quantityLimits": {
          "quantity": 30,
          "days": 30
        },
        "stepTherapyRequired": false,
        "stepTherapyAlternatives": [],
        "covered": true,
        "restrictions": []
      },
      {
        "drugName": "Fluticasone 110 mcg/actuation Inhaler",
        "rxcui": "0000000",
        "tier": 2,
        "copay": 35,
        "priorAuthRequired": false,
        "quantityLimits": {
          "quantity": 120,
          "days": 30
        },
        "stepTherapyRequired": false,
        "stepTherapyAlternatives": [],
        "covered": true,
        "restrictions": []
      }
    ]
  },
  {
    "insuranceProvider": "MetroPlus Commercial HMO",
    "planName": "MetroPlus Advantage",
    "planType": "Commercial HMO",
    "formulary": [
      {
        "drugName": "Buprenorphine/Naloxone 12-3 mg Film",
        "rxcui": "1010611",
        "tier": 2,
        "copay": 40,
        "priorAuthRequired": true,
        "quantityLimits": {
          "quantity": 30,
          "days": 30
        },
        "stepTherapyRequired": false,
        "stepTherapyAlternatives": [],
        "covered": true,
        "restrictions": [
          "Monthly urine toxicology required"
        ]
      },
      {
        "drugName": "Oxycodone 5 mg Tablet",
        "rxcui": "1049624",
        "tier": 3,
        "copay": 60,
        "priorAuthRequired": true,
        "quantityLimits": {
          "quantity": 30,
          "days": 7
        },
        "stepTherapyRequired": true,
        "stepTherapyAlternatives": [
          "Hydrocodone/Acetaminophen 5-325 mg Tablet"
        ],
        "covered": true,
        "restrictions": [
          "Requires pain management agreement"
        ]
      }
    ]
  }
] as const;
