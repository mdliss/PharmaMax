import type { PatientProfile } from './syntheticTypes';

export const SYNTHETIC_PATIENTS: PatientProfile[] = [
  {
    "id": "PT-000001",
    "name": "Ethan Nguyen",
    "dateOfBirth": "2015-04-12",
    "age": 8,
    "gender": "male",
    "phone": "415-555-1000",
    "email": "ethan.nguyen0@pharmamax.test",
    "address": "400 Fulton St, San Francisco, CA 94102",
    "insurance": {
      "provider": "Sunrise HMO",
      "planType": "Commercial HMO",
      "memberId": "SH500000",
      "groupNumber": "SHG210"
    },
    "allergies": [
      {
        "allergen": "Peanut oil",
        "reaction": "anaphylaxis",
        "severity": "severe",
        "dateReported": "2019-08-04"
      }
    ],
    "conditions": [
      "asthma"
    ],
    "currentMedications": [
      {
        "drugName": "Albuterol Inhaler 90 mcg/actuation Inhaler",
        "sig": "Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing",
        "prescriber": "Dr. Alicia Romero",
        "startDate": "2023-05-01",
        "refillsRemaining": 3
      },
      {
        "drugName": "Fluticasone Inhaler 110 mcg/actuation Inhaler",
        "sig": "Inhale 1 puff by mouth twice daily",
        "prescriber": "Dr. Benjamin Hsu",
        "startDate": "2023-02-15",
        "refillsRemaining": 2
      }
    ],
    "notes": "Pediatric asthma patient using spacer with inhalers."
  },
  {
    "id": "PT-000002",
    "name": "Harriet Coleman",
    "dateOfBirth": "1944-11-05",
    "age": 79,
    "gender": "female",
    "phone": "628-555-1073",
    "email": "harriet.coleman1@pharmamax.test",
    "address": "417 Jackson St, San Francisco, CA 94103",
    "insurance": {
      "provider": "Golden State Medicare Advantage",
      "planType": "Medicare Part D",
      "memberId": "GSM500007",
      "groupNumber": "GSMG211"
    },
    "allergies": [
      {
        "allergen": "Sulfa antibiotics",
        "reaction": "rash",
        "severity": "moderate",
        "dateReported": "2002-03-11"
      }
    ],
    "conditions": [
      "hypertension",
      "hyperlipidemia",
      "type 2 diabetes",
      "osteoarthritis"
    ],
    "currentMedications": [
      {
        "drugName": "Lisinopril 20 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "prescriber": "Dr. Benjamin Hsu",
        "startDate": "2018-01-10",
        "refillsRemaining": 1
      },
      {
        "drugName": "Atorvastatin 40 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily in the evening",
        "prescriber": "Dr. Maya Chen",
        "startDate": "2019-05-22",
        "refillsRemaining": 2
      },
      {
        "drugName": "Metformin 1000 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "prescriber": "Dr. Noah Patel",
        "startDate": "2017-09-01",
        "refillsRemaining": 3
      },
      {
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "prescriber": "Dr. Evelyn Brooks",
        "startDate": "2020-04-15",
        "refillsRemaining": 4
      }
    ],
    "notes": "Uses pill organizer; grandson assists with pickups."
  },
  {
    "id": "PT-000003",
    "name": "Malik Johnson",
    "dateOfBirth": "1983-02-18",
    "age": 40,
    "gender": "male",
    "phone": "650-555-1146",
    "email": "malik.johnson2@pharmamax.test",
    "address": "434 Valencia St, San Francisco, CA 94107",
    "insurance": {
      "provider": "CommunityCare Medicaid",
      "planType": "Medicaid Managed Care",
      "memberId": "CM500014",
      "groupNumber": "CMG212"
    },
    "allergies": [
      {
        "allergen": "Penicillin",
        "reaction": "hives",
        "severity": "moderate",
        "dateReported": "1991-07-03"
      }
    ],
    "conditions": [
      "hypertension",
      "type 2 diabetes",
      "chronic back pain"
    ],
    "currentMedications": [
      {
        "drugName": "Amlodipine 10 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "prescriber": "Dr. Maya Chen",
        "startDate": "2021-11-02",
        "refillsRemaining": 2
      },
      {
        "drugName": "Metformin 850 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "prescriber": "Dr. Noah Patel",
        "startDate": "2020-06-12",
        "refillsRemaining": 1
      },
      {
        "drugName": "Tramadol 50 mg Tablet",
        "sig": "Take 1 tablet by mouth every 6 hours as needed for pain",
        "prescriber": "Dr. Evelyn Brooks",
        "startDate": "2023-09-01",
        "refillsRemaining": 0
      }
    ],
    "notes": "Flag for antibiotic alternatives due to penicillin allergy."
  },
  {
    "id": "PT-000004",
    "name": "Sofia Martinez",
    "dateOfBirth": "1990-06-27",
    "age": 33,
    "gender": "female",
    "phone": "510-555-1219",
    "email": "sofia.martinez3@pharmamax.test",
    "address": "451 Geary Blvd, San Francisco, CA 94109",
    "insurance": {
      "provider": "PharmaMax Commercial PPO",
      "planType": "Commercial PPO",
      "memberId": "PCP500021",
      "groupNumber": "PCPG213"
    },
    "allergies": [],
    "conditions": [
      "pregnancy",
      "iron deficiency anemia"
    ],
    "currentMedications": [
      {
        "drugName": "Prenatal Vitamin with Iron 27 mg iron Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "prescriber": "Dr. Noah Patel",
        "startDate": "2023-12-01",
        "refillsRemaining": 5
      },
      {
        "drugName": "Vitamin D3 2000 IU Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "prescriber": "Dr. Evelyn Brooks",
        "startDate": "2023-12-01",
        "refillsRemaining": 3
      }
    ],
    "notes": "Currently 24 weeks pregnant; avoid Category X medications."
  },
  {
    "id": "PT-000005",
    "name": "Jamal Ferguson",
    "dateOfBirth": "1978-09-14",
    "age": 45,
    "gender": "male",
    "phone": "415-555-1292",
    "email": "jamal.ferguson4@pharmamax.test",
    "address": "468 Market St, San Francisco, CA 94110",
    "insurance": {
      "provider": "MetroPlus Commercial HMO",
      "planType": "Commercial HMO",
      "memberId": "MCH500028",
      "groupNumber": "MCHG214"
    },
    "allergies": [],
    "conditions": [
      "opioid use disorder",
      "chronic pain"
    ],
    "currentMedications": [
      {
        "drugName": "Buprenorphine/Naloxone 8-2 mg Film",
        "sig": "Place 1 film under the tongue once daily",
        "prescriber": "Dr. Evelyn Brooks",
        "startDate": "2022-05-05",
        "refillsRemaining": 1
      },
      {
        "drugName": "Naloxone Nasal Spray 4 mg/0.1 mL Spray",
        "sig": "Administer 1 spray into one nostril for opioid overdose. Repeat with new device if needed.",
        "prescriber": "Dr. Samuel Ortiz",
        "startDate": "2022-10-01",
        "refillsRemaining": 1
      }
    ],
    "notes": "Requires monthly counseling note prior to buprenorphine refill."
  },
  {
    "id": "PT-000006",
    "name": "Avery Chang",
    "dateOfBirth": "1998-01-09",
    "age": 25,
    "gender": "non-binary",
    "phone": "628-555-1365",
    "email": "avery.chang5@pharmamax.test",
    "address": "485 Mission St, San Francisco, CA 94114",
    "insurance": {
      "provider": "PharmaMax Commercial PPO",
      "planType": "Commercial PPO",
      "memberId": "PCP500035",
      "groupNumber": "PCPG215"
    },
    "allergies": [
      {
        "allergen": "Sertraline",
        "reaction": "nausea",
        "severity": "mild",
        "dateReported": "2021-02-18"
      }
    ],
    "conditions": [
      "generalized anxiety disorder",
      "major depressive disorder"
    ],
    "currentMedications": [
      {
        "drugName": "Escitalopram 20 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "prescriber": "Dr. Samuel Ortiz",
        "startDate": "2022-04-10",
        "refillsRemaining": 2
      },
      {
        "drugName": "Alprazolam 0.5 mg Tablet",
        "sig": "Take 1 tablet by mouth three times daily as needed for anxiety",
        "prescriber": "Dr. Priya Nair",
        "startDate": "2023-11-22",
        "refillsRemaining": 0
      }
    ],
    "notes": "Controlled substance agreement on file; monitor use with therapy notes."
  },
  {
    "id": "PT-000007",
    "name": "Eleanor Price",
    "dateOfBirth": "1955-03-03",
    "age": 68,
    "gender": "female",
    "phone": "650-555-1438",
    "email": "eleanor.price6@pharmamax.test",
    "address": "502 3rd Ave, Oakland, CA 94607",
    "insurance": {
      "provider": "Golden State Medicare Advantage",
      "planType": "Medicare Part D",
      "memberId": "GSM500042",
      "groupNumber": "GSMG216"
    },
    "allergies": [
      {
        "allergen": "Warfarin",
        "reaction": "excessive bruising",
        "severity": "moderate",
        "dateReported": "2016-08-12"
      }
    ],
    "conditions": [
      "atrial fibrillation",
      "type 2 diabetes",
      "hypertension"
    ],
    "currentMedications": [
      {
        "drugName": "Apixaban 5 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "prescriber": "Dr. Priya Nair",
        "startDate": "2021-03-01",
        "refillsRemaining": 2
      },
      {
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "prescriber": "Dr. Grace Whitman",
        "startDate": "2020-05-10",
        "refillsRemaining": 2
      },
      {
        "drugName": "Lisinopril 40 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "prescriber": "Dr. Michael Tanaka",
        "startDate": "2019-07-24",
        "refillsRemaining": 1
      }
    ],
    "notes": "Apixaban requires prior authorization renewal each year."
  },
  {
    "id": "PT-000008",
    "name": "Caleb Dawson",
    "dateOfBirth": "2005-12-21",
    "age": 18,
    "gender": "male",
    "phone": "510-555-1511",
    "email": "caleb.dawson7@pharmamax.test",
    "address": "519 24th St, Daly City, CA 94014",
    "insurance": {
      "provider": "CommunityCare Medicaid",
      "planType": "Medicaid Managed Care",
      "memberId": "CM500049",
      "groupNumber": "CMG217"
    },
    "allergies": [],
    "conditions": [
      "ADHD",
      "generalized anxiety disorder"
    ],
    "currentMedications": [
      {
        "drugName": "Amphetamine/Dextroamphetamine 20 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "prescriber": "Dr. Grace Whitman",
        "startDate": "2024-01-05",
        "refillsRemaining": 0
      },
      {
        "drugName": "Alprazolam 0.25 mg Tablet",
        "sig": "Take 1 tablet by mouth three times daily as needed for anxiety",
        "prescriber": "Dr. Michael Tanaka",
        "startDate": "2023-12-15",
        "refillsRemaining": 0
      }
    ],
    "notes": "Multiple controlled substance prescriptions; monitor for doctor shopping."
  },
  {
    "id": "PT-000009",
    "name": "Imani Rodgers",
    "dateOfBirth": "1972-05-18",
    "age": 51,
    "gender": "female",
    "phone": "415-555-1584",
    "email": "imani.rodgers8@pharmamax.test",
    "address": "536 Potrero Ave, San Mateo, CA 94401",
    "insurance": {
      "provider": "MetroPlus Commercial HMO",
      "planType": "Commercial HMO",
      "memberId": "MCH500056",
      "groupNumber": "MCHG218"
    },
    "allergies": [
      {
        "allergen": "Morphine",
        "reaction": "itching",
        "severity": "mild",
        "dateReported": "2010-04-08"
      }
    ],
    "conditions": [
      "chronic kidney disease stage 3",
      "hypertension"
    ],
    "currentMedications": [
      {
        "drugName": "Gabapentin 600 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "prescriber": "Dr. Michael Tanaka",
        "startDate": "2023-02-10",
        "refillsRemaining": 1
      },
      {
        "drugName": "Lisinopril 10 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "prescriber": "Dr. Lauren McKay",
        "startDate": "2022-08-01",
        "refillsRemaining": 2
      }
    ],
    "notes": "Renal dosing adjustments required for gabapentin."
  },
  {
    "id": "PT-000010",
    "name": "Natalie Hoffman",
    "dateOfBirth": "1988-08-29",
    "age": 35,
    "gender": "female",
    "phone": "628-555-1657",
    "email": "natalie.hoffman9@pharmamax.test",
    "address": "553 Sutter St, San Francisco, CA 94102",
    "insurance": {
      "provider": "PharmaMax Commercial PPO",
      "planType": "Commercial PPO",
      "memberId": "PCP500063",
      "groupNumber": "PCPG219"
    },
    "allergies": [
      {
        "allergen": "Levofloxacin",
        "reaction": "tendon pain",
        "severity": "moderate",
        "dateReported": "2019-11-19"
      }
    ],
    "conditions": [
      "recurrent sinusitis",
      "migraine"
    ],
    "currentMedications": [
      {
        "drugName": "Metoprolol 50 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "prescriber": "Dr. Lauren McKay",
        "startDate": "2022-02-01",
        "refillsRemaining": 2
      }
    ],
    "notes": "Avoid fluoroquinolones due to previous tendon issues."
  },
  {
    "id": "PT-000011",
    "name": "Robert Ellis",
    "dateOfBirth": "1958-01-02",
    "age": 65,
    "gender": "male",
    "phone": "650-555-1730",
    "email": "robert.ellis10@pharmamax.test",
    "address": "570 Polk St, San Francisco, CA 94103",
    "insurance": {
      "provider": "Golden State Medicare Advantage",
      "planType": "Medicare Part D",
      "memberId": "GSM500070",
      "groupNumber": "GSMG220"
    },
    "allergies": [],
    "conditions": [
      "COPD",
      "hypertension"
    ],
    "currentMedications": [
      {
        "drugName": "Albuterol Inhaler 90 mcg/actuation Inhaler",
        "sig": "Inhale 2 puffs by mouth every 4-6 hours as needed for wheezing",
        "prescriber": "Dr. Henry Caldwell",
        "startDate": "2021-01-10",
        "refillsRemaining": 2
      },
      {
        "drugName": "Fluticasone Inhaler 110 mcg/actuation Inhaler",
        "sig": "Inhale 1 puff by mouth twice daily",
        "prescriber": "Dr. Fatima Al-Hassan",
        "startDate": "2022-06-15",
        "refillsRemaining": 3
      },
      {
        "drugName": "Prednisone 10 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily with food",
        "prescriber": "Dr. Victor Suarez",
        "startDate": "2023-10-01",
        "refillsRemaining": 1
      }
    ],
    "notes": "History of COPD exacerbations requiring steroid tapers."
  },
  {
    "id": "PT-000012",
    "name": "Liam11 Bennett",
    "dateOfBirth": "1964-10-28",
    "age": 59,
    "gender": "male",
    "phone": "510-555-1803",
    "email": "liam11.bennett11@pharmamax.test",
    "address": "587 Fillmore St, San Francisco, CA 94107",
    "insurance": {
      "provider": "CommunityCare Medicaid",
      "planType": "Medicaid Managed Care",
      "memberId": "CM500077",
      "groupNumber": "CMG221"
    },
    "allergies": [],
    "conditions": [
      "type 2 diabetes"
    ],
    "currentMedications": [
      {
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "prescriber": "Dr. Fatima Al-Hassan",
        "startDate": "2021-10-15",
        "refillsRemaining": 3
      },
      {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "prescriber": "Dr. Victor Suarez",
        "startDate": "2023-05-01",
        "refillsRemaining": 5
      },
      {
        "drugName": "30G Lancets 30 gauge Supply",
        "sig": "Use to obtain blood sample four times daily",
        "prescriber": "Dr. Rachel Goldstein",
        "startDate": "2023-05-01",
        "refillsRemaining": 5
      }
    ]
  },
  {
    "id": "PT-000013",
    "name": "Olivia12 Garcia",
    "dateOfBirth": "1978-04-10",
    "age": 45,
    "gender": "female",
    "phone": "415-555-1876",
    "email": "olivia12.garcia12@pharmamax.test",
    "address": "604 Fulton St, San Francisco, CA 94109",
    "insurance": {
      "provider": "MetroPlus Commercial HMO",
      "planType": "Commercial HMO",
      "memberId": "MCH500091",
      "groupNumber": "MCHG223"
    },
    "allergies": [],
    "conditions": [
      "depression"
    ],
    "currentMedications": [
      {
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "prescriber": "Dr. Rachel Goldstein",
        "startDate": "2022-06-01",
        "refillsRemaining": 2
      }
    ]
  },
  {
    "id": "PT-000014",
    "name": "Noah13 Simmons",
    "dateOfBirth": "1992-10-20",
    "age": 31,
    "gender": "male",
    "phone": "628-555-1949",
    "email": "noah13.simmons13@pharmamax.test",
    "address": "621 Jackson St, San Francisco, CA 94110",
    "insurance": {
      "provider": "Golden State Medicare Advantage",
      "planType": "Medicare Part D",
      "memberId": "GSM500105",
      "groupNumber": "GSMG225"
    },
    "allergies": [
      {
        "allergen": "Shellfish",
        "reaction": "hives",
        "severity": "moderate",
        "dateReported": "2015-08-22"
      }
    ],
    "conditions": [
      "chronic pain"
    ],
    "currentMedications": [
      {
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "prescriber": "Dr. Teresa Nguyen",
        "startDate": "2020-09-10",
        "refillsRemaining": 2
      }
    ]
  },
  {
    "id": "PT-000015",
    "name": "Emma14 Lopez",
    "dateOfBirth": "2006-04-02",
    "age": 17,
    "gender": "female",
    "phone": "650-555-2022",
    "email": "emma14.lopez14@pharmamax.test",
    "address": "638 Valencia St, San Francisco, CA 94114",
    "insurance": {
      "provider": "Sunrise HMO",
      "planType": "Commercial HMO",
      "memberId": "SH500119",
      "groupNumber": "SHG227"
    },
    "allergies": [],
    "conditions": [
      "migraine"
    ],
    "currentMedications": [
      {
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "prescriber": "Dr. Sofia Martinez",
        "startDate": "2023-04-20",
        "refillsRemaining": 3
      }
    ]
  },
  {
    "id": "PT-000016",
    "name": "Aiden15 Harper",
    "dateOfBirth": "1960-10-12",
    "age": 63,
    "gender": "male",
    "phone": "510-555-2095",
    "email": "aiden15.harper15@pharmamax.test",
    "address": "655 Geary Blvd, Oakland, CA 94607",
    "insurance": {
      "provider": "PharmaMax Commercial PPO",
      "planType": "Commercial PPO",
      "memberId": "PCP500133",
      "groupNumber": "PCPG229"
    },
    "allergies": [],
    "conditions": [
      "hypothyroidism"
    ],
    "currentMedications": [
      {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "prescriber": "Dr. Alicia Romero",
        "startDate": "2019-03-15",
        "refillsRemaining": 4
      }
    ]
  },
  {
    "id": "PT-000017",
    "name": "Mia16 Thompson",
    "dateOfBirth": "1974-04-22",
    "age": 49,
    "gender": "female",
    "phone": "415-555-2168",
    "email": "mia16.thompson16@pharmamax.test",
    "address": "672 Market St, Daly City, CA 94014",
    "insurance": {
      "provider": "CommunityCare Medicaid",
      "planType": "Medicaid Managed Care",
      "memberId": "CM500147",
      "groupNumber": "CMG231"
    },
    "allergies": [],
    "conditions": [
      "type 2 diabetes"
    ],
    "currentMedications": [
      {
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "prescriber": "Dr. Maya Chen",
        "startDate": "2021-10-15",
        "refillsRemaining": 3
      },
      {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "prescriber": "Dr. Noah Patel",
        "startDate": "2023-05-01",
        "refillsRemaining": 5
      },
      {
        "drugName": "30G Lancets 30 gauge Supply",
        "sig": "Use to obtain blood sample four times daily",
        "prescriber": "Dr. Evelyn Brooks",
        "startDate": "2023-05-01",
        "refillsRemaining": 5
      }
    ],
    "notes": "Participating in medication synchronization program."
  },
  {
    "id": "PT-000018",
    "name": "Jackson17 Lee",
    "dateOfBirth": "1988-10-04",
    "age": 35,
    "gender": "male",
    "phone": "628-555-2241",
    "email": "jackson17.lee17@pharmamax.test",
    "address": "689 Mission St, San Mateo, CA 94401",
    "insurance": {
      "provider": "MetroPlus Commercial HMO",
      "planType": "Commercial HMO",
      "memberId": "MCH500161",
      "groupNumber": "MCHG233"
    },
    "allergies": [],
    "conditions": [
      "depression"
    ],
    "currentMedications": [
      {
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "prescriber": "Dr. Evelyn Brooks",
        "startDate": "2022-06-01",
        "refillsRemaining": 2
      }
    ]
  },
  {
    "id": "PT-000019",
    "name": "Amelia18 Clark",
    "dateOfBirth": "2002-04-14",
    "age": 21,
    "gender": "female",
    "phone": "650-555-2314",
    "email": "amelia18.clark18@pharmamax.test",
    "address": "706 3rd Ave, San Francisco, CA 94102",
    "insurance": {
      "provider": "Golden State Medicare Advantage",
      "planType": "Medicare Part D",
      "memberId": "GSM500175",
      "groupNumber": "GSMG235"
    },
    "allergies": [
      {
        "allergen": "Shellfish",
        "reaction": "hives",
        "severity": "moderate",
        "dateReported": "2015-08-22"
      }
    ],
    "conditions": [
      "chronic pain"
    ],
    "currentMedications": [
      {
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "prescriber": "Dr. Priya Nair",
        "startDate": "2020-09-10",
        "refillsRemaining": 2
      }
    ]
  },
  {
    "id": "PT-000020",
    "name": "Lucas19 Morgan",
    "dateOfBirth": "1956-10-24",
    "age": 67,
    "gender": "male",
    "phone": "510-555-2387",
    "email": "lucas19.morgan19@pharmamax.test",
    "address": "723 24th St, San Francisco, CA 94103",
    "insurance": {
      "provider": "Sunrise HMO",
      "planType": "Commercial HMO",
      "memberId": "SH500189",
      "groupNumber": "SHG237"
    },
    "allergies": [],
    "conditions": [
      "migraine"
    ],
    "currentMedications": [
      {
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "prescriber": "Dr. Michael Tanaka",
        "startDate": "2023-04-20",
        "refillsRemaining": 3
      }
    ]
  },
  {
    "id": "PT-000021",
    "name": "Charlotte20 Diaz",
    "dateOfBirth": "1970-04-06",
    "age": 53,
    "gender": "female",
    "phone": "415-555-2460",
    "email": "charlotte20.diaz20@pharmamax.test",
    "address": "740 Potrero Ave, San Francisco, CA 94107",
    "insurance": {
      "provider": "PharmaMax Commercial PPO",
      "planType": "Commercial PPO",
      "memberId": "PCP500203",
      "groupNumber": "PCPG239"
    },
    "allergies": [],
    "conditions": [
      "hypothyroidism"
    ],
    "currentMedications": [
      {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "prescriber": "Dr. Henry Caldwell",
        "startDate": "2019-03-15",
        "refillsRemaining": 4
      }
    ]
  },
  {
    "id": "PT-000022",
    "name": "Elijah21 Wright",
    "dateOfBirth": "1984-10-16",
    "age": 39,
    "gender": "male",
    "phone": "628-555-2533",
    "email": "elijah21.wright21@pharmamax.test",
    "address": "757 Sutter St, San Francisco, CA 94109",
    "insurance": {
      "provider": "CommunityCare Medicaid",
      "planType": "Medicaid Managed Care",
      "memberId": "CM500217",
      "groupNumber": "CMG241"
    },
    "allergies": [],
    "conditions": [
      "type 2 diabetes"
    ],
    "currentMedications": [
      {
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "prescriber": "Dr. Victor Suarez",
        "startDate": "2021-10-15",
        "refillsRemaining": 3
      },
      {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "prescriber": "Dr. Rachel Goldstein",
        "startDate": "2023-05-01",
        "refillsRemaining": 5
      },
      {
        "drugName": "30G Lancets 30 gauge Supply",
        "sig": "Use to obtain blood sample four times daily",
        "prescriber": "Dr. Omar Ibrahim",
        "startDate": "2023-05-01",
        "refillsRemaining": 5
      }
    ]
  },
  {
    "id": "PT-000023",
    "name": "Zoe22 Ng",
    "dateOfBirth": "1998-04-26",
    "age": 25,
    "gender": "female",
    "phone": "650-555-2606",
    "email": "zoe22.ng22@pharmamax.test",
    "address": "774 Polk St, San Francisco, CA 94110",
    "insurance": {
      "provider": "MetroPlus Commercial HMO",
      "planType": "Commercial HMO",
      "memberId": "MCH500231",
      "groupNumber": "MCHG243"
    },
    "allergies": [],
    "conditions": [
      "depression"
    ],
    "currentMedications": [
      {
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "prescriber": "Dr. Omar Ibrahim",
        "startDate": "2022-06-01",
        "refillsRemaining": 2
      }
    ]
  },
  {
    "id": "PT-000024",
    "name": "Mason23 Foster",
    "dateOfBirth": "1952-10-08",
    "age": 71,
    "gender": "male",
    "phone": "510-555-2679",
    "email": "mason23.foster23@pharmamax.test",
    "address": "791 Fillmore St, San Francisco, CA 94114",
    "insurance": {
      "provider": "Golden State Medicare Advantage",
      "planType": "Medicare Part D",
      "memberId": "GSM500245",
      "groupNumber": "GSMG245"
    },
    "allergies": [
      {
        "allergen": "Shellfish",
        "reaction": "hives",
        "severity": "moderate",
        "dateReported": "2015-08-22"
      }
    ],
    "conditions": [
      "chronic pain"
    ],
    "currentMedications": [
      {
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "prescriber": "Dr. Carlos Mendes",
        "startDate": "2020-09-10",
        "refillsRemaining": 2
      }
    ],
    "notes": "Participating in medication synchronization program."
  },
  {
    "id": "PT-000025",
    "name": "Avery24 Sullivan",
    "dateOfBirth": "1966-04-18",
    "age": 57,
    "gender": "non-binary",
    "phone": "415-555-2752",
    "email": "avery24.sullivan24@pharmamax.test",
    "address": "808 Fulton St, Oakland, CA 94607",
    "insurance": {
      "provider": "Sunrise HMO",
      "planType": "Commercial HMO",
      "memberId": "SH500259",
      "groupNumber": "SHG247"
    },
    "allergies": [],
    "conditions": [
      "migraine"
    ],
    "currentMedications": [
      {
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "prescriber": "Dr. Elliot Harper",
        "startDate": "2023-04-20",
        "refillsRemaining": 3
      }
    ]
  },
  {
    "id": "PT-000026",
    "name": "Isabella25 Reed",
    "dateOfBirth": "1980-10-28",
    "age": 43,
    "gender": "female",
    "phone": "628-555-2825",
    "email": "isabella25.reed25@pharmamax.test",
    "address": "825 Jackson St, Daly City, CA 94014",
    "insurance": {
      "provider": "PharmaMax Commercial PPO",
      "planType": "Commercial PPO",
      "memberId": "PCP500273",
      "groupNumber": "PCPG249"
    },
    "allergies": [],
    "conditions": [
      "hypothyroidism"
    ],
    "currentMedications": [
      {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "prescriber": "Dr. Benjamin Hsu",
        "startDate": "2019-03-15",
        "refillsRemaining": 4
      }
    ]
  },
  {
    "id": "PT-000027",
    "name": "Logan26 Kim",
    "dateOfBirth": "1994-04-10",
    "age": 29,
    "gender": "male",
    "phone": "650-555-2898",
    "email": "logan26.kim26@pharmamax.test",
    "address": "842 Valencia St, San Mateo, CA 94401",
    "insurance": {
      "provider": "CommunityCare Medicaid",
      "planType": "Medicaid Managed Care",
      "memberId": "CM500287",
      "groupNumber": "CMG251"
    },
    "allergies": [],
    "conditions": [
      "type 2 diabetes"
    ],
    "currentMedications": [
      {
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "prescriber": "Dr. Noah Patel",
        "startDate": "2021-10-15",
        "refillsRemaining": 3
      },
      {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "prescriber": "Dr. Evelyn Brooks",
        "startDate": "2023-05-01",
        "refillsRemaining": 5
      },
      {
        "drugName": "30G Lancets 30 gauge Supply",
        "sig": "Use to obtain blood sample four times daily",
        "prescriber": "Dr. Samuel Ortiz",
        "startDate": "2023-05-01",
        "refillsRemaining": 5
      }
    ]
  },
  {
    "id": "PT-000028",
    "name": "Luna27 Stewart",
    "dateOfBirth": "1948-10-20",
    "age": 75,
    "gender": "female",
    "phone": "510-555-2971",
    "email": "luna27.stewart27@pharmamax.test",
    "address": "859 Geary Blvd, San Francisco, CA 94102",
    "insurance": {
      "provider": "MetroPlus Commercial HMO",
      "planType": "Commercial HMO",
      "memberId": "MCH500301",
      "groupNumber": "MCHG253"
    },
    "allergies": [],
    "conditions": [
      "depression"
    ],
    "currentMedications": [
      {
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "prescriber": "Dr. Samuel Ortiz",
        "startDate": "2022-06-01",
        "refillsRemaining": 2
      }
    ]
  },
  {
    "id": "PT-000029",
    "name": "Ethan28 Torres",
    "dateOfBirth": "1962-04-02",
    "age": 61,
    "gender": "male",
    "phone": "415-555-3044",
    "email": "ethan28.torres28@pharmamax.test",
    "address": "876 Market St, San Francisco, CA 94103",
    "insurance": {
      "provider": "Golden State Medicare Advantage",
      "planType": "Medicare Part D",
      "memberId": "GSM500315",
      "groupNumber": "GSMG255"
    },
    "allergies": [
      {
        "allergen": "Shellfish",
        "reaction": "hives",
        "severity": "moderate",
        "dateReported": "2015-08-22"
      }
    ],
    "conditions": [
      "chronic pain"
    ],
    "currentMedications": [
      {
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "prescriber": "Dr. Grace Whitman",
        "startDate": "2020-09-10",
        "refillsRemaining": 2
      }
    ]
  },
  {
    "id": "PT-000030",
    "name": "Sofia29 Ruiz",
    "dateOfBirth": "1976-10-12",
    "age": 47,
    "gender": "female",
    "phone": "628-555-3117",
    "email": "sofia29.ruiz29@pharmamax.test",
    "address": "893 Mission St, San Francisco, CA 94107",
    "insurance": {
      "provider": "Sunrise HMO",
      "planType": "Commercial HMO",
      "memberId": "SH500329",
      "groupNumber": "SHG257"
    },
    "allergies": [],
    "conditions": [
      "migraine"
    ],
    "currentMedications": [
      {
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "prescriber": "Dr. Lauren McKay",
        "startDate": "2023-04-20",
        "refillsRemaining": 3
      }
    ]
  },
  {
    "id": "PT-000031",
    "name": "Caleb30 Gibson",
    "dateOfBirth": "1990-04-22",
    "age": 33,
    "gender": "male",
    "phone": "650-555-3190",
    "email": "caleb30.gibson30@pharmamax.test",
    "address": "410 3rd Ave, San Francisco, CA 94109",
    "insurance": {
      "provider": "PharmaMax Commercial PPO",
      "planType": "Commercial PPO",
      "memberId": "PCP500343",
      "groupNumber": "PCPG259"
    },
    "allergies": [],
    "conditions": [
      "hypothyroidism"
    ],
    "currentMedications": [
      {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "prescriber": "Dr. Fatima Al-Hassan",
        "startDate": "2019-03-15",
        "refillsRemaining": 4
      }
    ],
    "notes": "Participating in medication synchronization program."
  },
  {
    "id": "PT-000032",
    "name": "Liam31 Bennett",
    "dateOfBirth": "2004-10-04",
    "age": 19,
    "gender": "male",
    "phone": "510-555-3263",
    "email": "liam31.bennett31@pharmamax.test",
    "address": "427 24th St, San Francisco, CA 94110",
    "insurance": {
      "provider": "CommunityCare Medicaid",
      "planType": "Medicaid Managed Care",
      "memberId": "CM500357",
      "groupNumber": "CMG261"
    },
    "allergies": [],
    "conditions": [
      "type 2 diabetes"
    ],
    "currentMedications": [
      {
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "prescriber": "Dr. Rachel Goldstein",
        "startDate": "2021-10-15",
        "refillsRemaining": 3
      },
      {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "prescriber": "Dr. Omar Ibrahim",
        "startDate": "2023-05-01",
        "refillsRemaining": 5
      },
      {
        "drugName": "30G Lancets 30 gauge Supply",
        "sig": "Use to obtain blood sample four times daily",
        "prescriber": "Dr. Teresa Nguyen",
        "startDate": "2023-05-01",
        "refillsRemaining": 5
      }
    ]
  },
  {
    "id": "PT-000033",
    "name": "Olivia32 Garcia",
    "dateOfBirth": "1958-04-14",
    "age": 65,
    "gender": "female",
    "phone": "415-555-3336",
    "email": "olivia32.garcia32@pharmamax.test",
    "address": "444 Potrero Ave, San Francisco, CA 94114",
    "insurance": {
      "provider": "MetroPlus Commercial HMO",
      "planType": "Commercial HMO",
      "memberId": "MCH500371",
      "groupNumber": "MCHG263"
    },
    "allergies": [],
    "conditions": [
      "depression"
    ],
    "currentMedications": [
      {
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "prescriber": "Dr. Teresa Nguyen",
        "startDate": "2022-06-01",
        "refillsRemaining": 2
      }
    ]
  },
  {
    "id": "PT-000034",
    "name": "Noah33 Simmons",
    "dateOfBirth": "1972-10-24",
    "age": 51,
    "gender": "male",
    "phone": "628-555-3409",
    "email": "noah33.simmons33@pharmamax.test",
    "address": "461 Sutter St, Oakland, CA 94607",
    "insurance": {
      "provider": "Golden State Medicare Advantage",
      "planType": "Medicare Part D",
      "memberId": "GSM500385",
      "groupNumber": "GSMG265"
    },
    "allergies": [
      {
        "allergen": "Shellfish",
        "reaction": "hives",
        "severity": "moderate",
        "dateReported": "2015-08-22"
      }
    ],
    "conditions": [
      "chronic pain"
    ],
    "currentMedications": [
      {
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "prescriber": "Dr. Sofia Martinez",
        "startDate": "2020-09-10",
        "refillsRemaining": 2
      }
    ]
  },
  {
    "id": "PT-000035",
    "name": "Emma34 Lopez",
    "dateOfBirth": "1986-04-06",
    "age": 37,
    "gender": "female",
    "phone": "650-555-3482",
    "email": "emma34.lopez34@pharmamax.test",
    "address": "478 Polk St, Daly City, CA 94014",
    "insurance": {
      "provider": "Sunrise HMO",
      "planType": "Commercial HMO",
      "memberId": "SH500399",
      "groupNumber": "SHG267"
    },
    "allergies": [],
    "conditions": [
      "migraine"
    ],
    "currentMedications": [
      {
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "prescriber": "Dr. Alicia Romero",
        "startDate": "2023-04-20",
        "refillsRemaining": 3
      }
    ]
  },
  {
    "id": "PT-000036",
    "name": "Aiden35 Harper",
    "dateOfBirth": "2000-10-16",
    "age": 23,
    "gender": "male",
    "phone": "510-555-3555",
    "email": "aiden35.harper35@pharmamax.test",
    "address": "495 Fillmore St, San Mateo, CA 94401",
    "insurance": {
      "provider": "PharmaMax Commercial PPO",
      "planType": "Commercial PPO",
      "memberId": "PCP500413",
      "groupNumber": "PCPG269"
    },
    "allergies": [],
    "conditions": [
      "hypothyroidism"
    ],
    "currentMedications": [
      {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "prescriber": "Dr. Maya Chen",
        "startDate": "2019-03-15",
        "refillsRemaining": 4
      }
    ]
  },
  {
    "id": "PT-000037",
    "name": "Mia36 Thompson",
    "dateOfBirth": "1954-04-26",
    "age": 69,
    "gender": "female",
    "phone": "415-555-3628",
    "email": "mia36.thompson36@pharmamax.test",
    "address": "512 Fulton St, San Francisco, CA 94102",
    "insurance": {
      "provider": "CommunityCare Medicaid",
      "planType": "Medicaid Managed Care",
      "memberId": "CM500427",
      "groupNumber": "CMG271"
    },
    "allergies": [],
    "conditions": [
      "type 2 diabetes"
    ],
    "currentMedications": [
      {
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "prescriber": "Dr. Evelyn Brooks",
        "startDate": "2021-10-15",
        "refillsRemaining": 3
      },
      {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "prescriber": "Dr. Samuel Ortiz",
        "startDate": "2023-05-01",
        "refillsRemaining": 5
      },
      {
        "drugName": "30G Lancets 30 gauge Supply",
        "sig": "Use to obtain blood sample four times daily",
        "prescriber": "Dr. Priya Nair",
        "startDate": "2023-05-01",
        "refillsRemaining": 5
      }
    ]
  },
  {
    "id": "PT-000038",
    "name": "Jackson37 Lee",
    "dateOfBirth": "1968-10-08",
    "age": 55,
    "gender": "male",
    "phone": "628-555-3701",
    "email": "jackson37.lee37@pharmamax.test",
    "address": "529 Jackson St, San Francisco, CA 94103",
    "insurance": {
      "provider": "MetroPlus Commercial HMO",
      "planType": "Commercial HMO",
      "memberId": "MCH500441",
      "groupNumber": "MCHG273"
    },
    "allergies": [],
    "conditions": [
      "depression"
    ],
    "currentMedications": [
      {
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "prescriber": "Dr. Priya Nair",
        "startDate": "2022-06-01",
        "refillsRemaining": 2
      }
    ],
    "notes": "Participating in medication synchronization program."
  },
  {
    "id": "PT-000039",
    "name": "Amelia38 Clark",
    "dateOfBirth": "1982-04-18",
    "age": 41,
    "gender": "female",
    "phone": "650-555-3774",
    "email": "amelia38.clark38@pharmamax.test",
    "address": "546 Valencia St, San Francisco, CA 94107",
    "insurance": {
      "provider": "Golden State Medicare Advantage",
      "planType": "Medicare Part D",
      "memberId": "GSM500455",
      "groupNumber": "GSMG275"
    },
    "allergies": [
      {
        "allergen": "Shellfish",
        "reaction": "hives",
        "severity": "moderate",
        "dateReported": "2015-08-22"
      }
    ],
    "conditions": [
      "chronic pain"
    ],
    "currentMedications": [
      {
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "prescriber": "Dr. Michael Tanaka",
        "startDate": "2020-09-10",
        "refillsRemaining": 2
      }
    ]
  },
  {
    "id": "PT-000040",
    "name": "Lucas39 Morgan",
    "dateOfBirth": "1996-10-28",
    "age": 27,
    "gender": "male",
    "phone": "510-555-3847",
    "email": "lucas39.morgan39@pharmamax.test",
    "address": "563 Geary Blvd, San Francisco, CA 94109",
    "insurance": {
      "provider": "Sunrise HMO",
      "planType": "Commercial HMO",
      "memberId": "SH500469",
      "groupNumber": "SHG277"
    },
    "allergies": [],
    "conditions": [
      "migraine"
    ],
    "currentMedications": [
      {
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "prescriber": "Dr. Henry Caldwell",
        "startDate": "2023-04-20",
        "refillsRemaining": 3
      }
    ]
  },
  {
    "id": "PT-000041",
    "name": "Charlotte40 Diaz",
    "dateOfBirth": "1950-04-10",
    "age": 73,
    "gender": "female",
    "phone": "415-555-3920",
    "email": "charlotte40.diaz40@pharmamax.test",
    "address": "580 Market St, San Francisco, CA 94110",
    "insurance": {
      "provider": "PharmaMax Commercial PPO",
      "planType": "Commercial PPO",
      "memberId": "PCP500483",
      "groupNumber": "PCPG279"
    },
    "allergies": [],
    "conditions": [
      "hypothyroidism"
    ],
    "currentMedications": [
      {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "prescriber": "Dr. Victor Suarez",
        "startDate": "2019-03-15",
        "refillsRemaining": 4
      }
    ]
  },
  {
    "id": "PT-000042",
    "name": "Elijah41 Wright",
    "dateOfBirth": "1964-10-20",
    "age": 59,
    "gender": "male",
    "phone": "628-555-3993",
    "email": "elijah41.wright41@pharmamax.test",
    "address": "597 Mission St, San Francisco, CA 94114",
    "insurance": {
      "provider": "CommunityCare Medicaid",
      "planType": "Medicaid Managed Care",
      "memberId": "CM500497",
      "groupNumber": "CMG211"
    },
    "allergies": [],
    "conditions": [
      "type 2 diabetes"
    ],
    "currentMedications": [
      {
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "prescriber": "Dr. Omar Ibrahim",
        "startDate": "2021-10-15",
        "refillsRemaining": 3
      },
      {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "prescriber": "Dr. Teresa Nguyen",
        "startDate": "2023-05-01",
        "refillsRemaining": 5
      },
      {
        "drugName": "30G Lancets 30 gauge Supply",
        "sig": "Use to obtain blood sample four times daily",
        "prescriber": "Dr. Carlos Mendes",
        "startDate": "2023-05-01",
        "refillsRemaining": 5
      }
    ]
  },
  {
    "id": "PT-000043",
    "name": "Zoe42 Ng",
    "dateOfBirth": "1978-04-02",
    "age": 45,
    "gender": "female",
    "phone": "650-555-4066",
    "email": "zoe42.ng42@pharmamax.test",
    "address": "614 3rd Ave, Oakland, CA 94607",
    "insurance": {
      "provider": "MetroPlus Commercial HMO",
      "planType": "Commercial HMO",
      "memberId": "MCH500511",
      "groupNumber": "MCHG213"
    },
    "allergies": [],
    "conditions": [
      "depression"
    ],
    "currentMedications": [
      {
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "prescriber": "Dr. Carlos Mendes",
        "startDate": "2022-06-01",
        "refillsRemaining": 2
      }
    ]
  },
  {
    "id": "PT-000044",
    "name": "Mason43 Foster",
    "dateOfBirth": "1992-10-12",
    "age": 31,
    "gender": "male",
    "phone": "510-555-4139",
    "email": "mason43.foster43@pharmamax.test",
    "address": "631 24th St, Daly City, CA 94014",
    "insurance": {
      "provider": "Golden State Medicare Advantage",
      "planType": "Medicare Part D",
      "memberId": "GSM500525",
      "groupNumber": "GSMG215"
    },
    "allergies": [
      {
        "allergen": "Shellfish",
        "reaction": "hives",
        "severity": "moderate",
        "dateReported": "2015-08-22"
      }
    ],
    "conditions": [
      "chronic pain"
    ],
    "currentMedications": [
      {
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "prescriber": "Dr. Elliot Harper",
        "startDate": "2020-09-10",
        "refillsRemaining": 2
      }
    ]
  },
  {
    "id": "PT-000045",
    "name": "Avery44 Sullivan",
    "dateOfBirth": "2006-04-22",
    "age": 17,
    "gender": "non-binary",
    "phone": "415-555-4212",
    "email": "avery44.sullivan44@pharmamax.test",
    "address": "648 Potrero Ave, San Mateo, CA 94401",
    "insurance": {
      "provider": "Sunrise HMO",
      "planType": "Commercial HMO",
      "memberId": "SH500539",
      "groupNumber": "SHG217"
    },
    "allergies": [],
    "conditions": [
      "migraine"
    ],
    "currentMedications": [
      {
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "prescriber": "Dr. Benjamin Hsu",
        "startDate": "2023-04-20",
        "refillsRemaining": 3
      }
    ],
    "notes": "Participating in medication synchronization program."
  },
  {
    "id": "PT-000046",
    "name": "Isabella45 Reed",
    "dateOfBirth": "1960-10-04",
    "age": 63,
    "gender": "female",
    "phone": "628-555-4285",
    "email": "isabella45.reed45@pharmamax.test",
    "address": "665 Sutter St, San Francisco, CA 94102",
    "insurance": {
      "provider": "PharmaMax Commercial PPO",
      "planType": "Commercial PPO",
      "memberId": "PCP500553",
      "groupNumber": "PCPG219"
    },
    "allergies": [],
    "conditions": [
      "hypothyroidism"
    ],
    "currentMedications": [
      {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "prescriber": "Dr. Noah Patel",
        "startDate": "2019-03-15",
        "refillsRemaining": 4
      }
    ]
  },
  {
    "id": "PT-000047",
    "name": "Logan46 Kim",
    "dateOfBirth": "1974-04-14",
    "age": 49,
    "gender": "male",
    "phone": "650-555-4358",
    "email": "logan46.kim46@pharmamax.test",
    "address": "682 Polk St, San Francisco, CA 94103",
    "insurance": {
      "provider": "CommunityCare Medicaid",
      "planType": "Medicaid Managed Care",
      "memberId": "CM500567",
      "groupNumber": "CMG221"
    },
    "allergies": [],
    "conditions": [
      "type 2 diabetes"
    ],
    "currentMedications": [
      {
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "prescriber": "Dr. Samuel Ortiz",
        "startDate": "2021-10-15",
        "refillsRemaining": 3
      },
      {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "prescriber": "Dr. Priya Nair",
        "startDate": "2023-05-01",
        "refillsRemaining": 5
      },
      {
        "drugName": "30G Lancets 30 gauge Supply",
        "sig": "Use to obtain blood sample four times daily",
        "prescriber": "Dr. Grace Whitman",
        "startDate": "2023-05-01",
        "refillsRemaining": 5
      }
    ]
  },
  {
    "id": "PT-000048",
    "name": "Luna47 Stewart",
    "dateOfBirth": "1988-10-24",
    "age": 35,
    "gender": "female",
    "phone": "510-555-4431",
    "email": "luna47.stewart47@pharmamax.test",
    "address": "699 Fillmore St, San Francisco, CA 94107",
    "insurance": {
      "provider": "MetroPlus Commercial HMO",
      "planType": "Commercial HMO",
      "memberId": "MCH500581",
      "groupNumber": "MCHG223"
    },
    "allergies": [],
    "conditions": [
      "depression"
    ],
    "currentMedications": [
      {
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "prescriber": "Dr. Grace Whitman",
        "startDate": "2022-06-01",
        "refillsRemaining": 2
      }
    ]
  },
  {
    "id": "PT-000049",
    "name": "Ethan48 Torres",
    "dateOfBirth": "2002-04-06",
    "age": 21,
    "gender": "male",
    "phone": "415-555-4504",
    "email": "ethan48.torres48@pharmamax.test",
    "address": "716 Fulton St, San Francisco, CA 94109",
    "insurance": {
      "provider": "Golden State Medicare Advantage",
      "planType": "Medicare Part D",
      "memberId": "GSM500595",
      "groupNumber": "GSMG225"
    },
    "allergies": [
      {
        "allergen": "Shellfish",
        "reaction": "hives",
        "severity": "moderate",
        "dateReported": "2015-08-22"
      }
    ],
    "conditions": [
      "chronic pain"
    ],
    "currentMedications": [
      {
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "prescriber": "Dr. Lauren McKay",
        "startDate": "2020-09-10",
        "refillsRemaining": 2
      }
    ]
  },
  {
    "id": "PT-000050",
    "name": "Sofia49 Ruiz",
    "dateOfBirth": "1956-10-16",
    "age": 67,
    "gender": "female",
    "phone": "628-555-4577",
    "email": "sofia49.ruiz49@pharmamax.test",
    "address": "733 Jackson St, San Francisco, CA 94110",
    "insurance": {
      "provider": "Sunrise HMO",
      "planType": "Commercial HMO",
      "memberId": "SH500609",
      "groupNumber": "SHG227"
    },
    "allergies": [],
    "conditions": [
      "migraine"
    ],
    "currentMedications": [
      {
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "prescriber": "Dr. Fatima Al-Hassan",
        "startDate": "2023-04-20",
        "refillsRemaining": 3
      }
    ]
  },
  {
    "id": "PT-000051",
    "name": "Caleb50 Gibson",
    "dateOfBirth": "1970-04-26",
    "age": 53,
    "gender": "male",
    "phone": "650-555-4650",
    "email": "caleb50.gibson50@pharmamax.test",
    "address": "750 Valencia St, San Francisco, CA 94114",
    "insurance": {
      "provider": "PharmaMax Commercial PPO",
      "planType": "Commercial PPO",
      "memberId": "PCP500623",
      "groupNumber": "PCPG229"
    },
    "allergies": [],
    "conditions": [
      "hypothyroidism"
    ],
    "currentMedications": [
      {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "prescriber": "Dr. Rachel Goldstein",
        "startDate": "2019-03-15",
        "refillsRemaining": 4
      }
    ]
  },
  {
    "id": "PT-000052",
    "name": "Liam51 Bennett",
    "dateOfBirth": "1984-10-08",
    "age": 39,
    "gender": "male",
    "phone": "510-555-4723",
    "email": "liam51.bennett51@pharmamax.test",
    "address": "767 Geary Blvd, Oakland, CA 94607",
    "insurance": {
      "provider": "CommunityCare Medicaid",
      "planType": "Medicaid Managed Care",
      "memberId": "CM500637",
      "groupNumber": "CMG231"
    },
    "allergies": [],
    "conditions": [
      "type 2 diabetes"
    ],
    "currentMedications": [
      {
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "prescriber": "Dr. Teresa Nguyen",
        "startDate": "2021-10-15",
        "refillsRemaining": 3
      },
      {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "prescriber": "Dr. Carlos Mendes",
        "startDate": "2023-05-01",
        "refillsRemaining": 5
      },
      {
        "drugName": "30G Lancets 30 gauge Supply",
        "sig": "Use to obtain blood sample four times daily",
        "prescriber": "Dr. Sofia Martinez",
        "startDate": "2023-05-01",
        "refillsRemaining": 5
      }
    ],
    "notes": "Participating in medication synchronization program."
  },
  {
    "id": "PT-000053",
    "name": "Olivia52 Garcia",
    "dateOfBirth": "1998-04-18",
    "age": 25,
    "gender": "female",
    "phone": "415-555-4796",
    "email": "olivia52.garcia52@pharmamax.test",
    "address": "784 Market St, Daly City, CA 94014",
    "insurance": {
      "provider": "MetroPlus Commercial HMO",
      "planType": "Commercial HMO",
      "memberId": "MCH500651",
      "groupNumber": "MCHG233"
    },
    "allergies": [],
    "conditions": [
      "depression"
    ],
    "currentMedications": [
      {
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "prescriber": "Dr. Sofia Martinez",
        "startDate": "2022-06-01",
        "refillsRemaining": 2
      }
    ]
  },
  {
    "id": "PT-000054",
    "name": "Noah53 Simmons",
    "dateOfBirth": "1952-10-28",
    "age": 71,
    "gender": "male",
    "phone": "628-555-4869",
    "email": "noah53.simmons53@pharmamax.test",
    "address": "801 Mission St, San Mateo, CA 94401",
    "insurance": {
      "provider": "Golden State Medicare Advantage",
      "planType": "Medicare Part D",
      "memberId": "GSM500665",
      "groupNumber": "GSMG235"
    },
    "allergies": [
      {
        "allergen": "Shellfish",
        "reaction": "hives",
        "severity": "moderate",
        "dateReported": "2015-08-22"
      }
    ],
    "conditions": [
      "chronic pain"
    ],
    "currentMedications": [
      {
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "prescriber": "Dr. Alicia Romero",
        "startDate": "2020-09-10",
        "refillsRemaining": 2
      }
    ]
  },
  {
    "id": "PT-000055",
    "name": "Emma54 Lopez",
    "dateOfBirth": "1966-04-10",
    "age": 57,
    "gender": "female",
    "phone": "650-555-4942",
    "email": "emma54.lopez54@pharmamax.test",
    "address": "818 3rd Ave, San Francisco, CA 94102",
    "insurance": {
      "provider": "Sunrise HMO",
      "planType": "Commercial HMO",
      "memberId": "SH500679",
      "groupNumber": "SHG237"
    },
    "allergies": [],
    "conditions": [
      "migraine"
    ],
    "currentMedications": [
      {
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "prescriber": "Dr. Maya Chen",
        "startDate": "2023-04-20",
        "refillsRemaining": 3
      }
    ]
  },
  {
    "id": "PT-000056",
    "name": "Aiden55 Harper",
    "dateOfBirth": "1980-10-20",
    "age": 43,
    "gender": "male",
    "phone": "510-555-5015",
    "email": "aiden55.harper55@pharmamax.test",
    "address": "835 24th St, San Francisco, CA 94103",
    "insurance": {
      "provider": "PharmaMax Commercial PPO",
      "planType": "Commercial PPO",
      "memberId": "PCP500693",
      "groupNumber": "PCPG239"
    },
    "allergies": [],
    "conditions": [
      "hypothyroidism"
    ],
    "currentMedications": [
      {
        "drugName": "Levothyroxine 75 mcg Tablet",
        "sig": "Take 1 tablet by mouth every morning on an empty stomach",
        "prescriber": "Dr. Evelyn Brooks",
        "startDate": "2019-03-15",
        "refillsRemaining": 4
      }
    ]
  },
  {
    "id": "PT-000057",
    "name": "Mia56 Thompson",
    "dateOfBirth": "1994-04-02",
    "age": 29,
    "gender": "female",
    "phone": "415-555-5088",
    "email": "mia56.thompson56@pharmamax.test",
    "address": "852 Potrero Ave, San Francisco, CA 94107",
    "insurance": {
      "provider": "CommunityCare Medicaid",
      "planType": "Medicaid Managed Care",
      "memberId": "CM500707",
      "groupNumber": "CMG241"
    },
    "allergies": [],
    "conditions": [
      "type 2 diabetes"
    ],
    "currentMedications": [
      {
        "drugName": "Metformin 500 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily with meals",
        "prescriber": "Dr. Priya Nair",
        "startDate": "2021-10-15",
        "refillsRemaining": 3
      },
      {
        "drugName": "Blood Glucose Test Strips Standard Supply",
        "sig": "Use to test blood glucose four times daily",
        "prescriber": "Dr. Grace Whitman",
        "startDate": "2023-05-01",
        "refillsRemaining": 5
      },
      {
        "drugName": "30G Lancets 30 gauge Supply",
        "sig": "Use to obtain blood sample four times daily",
        "prescriber": "Dr. Michael Tanaka",
        "startDate": "2023-05-01",
        "refillsRemaining": 5
      }
    ]
  },
  {
    "id": "PT-000058",
    "name": "Jackson57 Lee",
    "dateOfBirth": "1948-10-12",
    "age": 75,
    "gender": "male",
    "phone": "628-555-5161",
    "email": "jackson57.lee57@pharmamax.test",
    "address": "869 Sutter St, San Francisco, CA 94109",
    "insurance": {
      "provider": "MetroPlus Commercial HMO",
      "planType": "Commercial HMO",
      "memberId": "MCH500721",
      "groupNumber": "MCHG243"
    },
    "allergies": [],
    "conditions": [
      "depression"
    ],
    "currentMedications": [
      {
        "drugName": "Sertraline 50 mg Tablet",
        "sig": "Take 1 tablet by mouth once daily",
        "prescriber": "Dr. Michael Tanaka",
        "startDate": "2022-06-01",
        "refillsRemaining": 2
      }
    ]
  },
  {
    "id": "PT-000059",
    "name": "Amelia58 Clark",
    "dateOfBirth": "1962-04-22",
    "age": 61,
    "gender": "female",
    "phone": "650-555-5234",
    "email": "amelia58.clark58@pharmamax.test",
    "address": "886 Polk St, San Francisco, CA 94110",
    "insurance": {
      "provider": "Golden State Medicare Advantage",
      "planType": "Medicare Part D",
      "memberId": "GSM500735",
      "groupNumber": "GSMG245"
    },
    "allergies": [
      {
        "allergen": "Shellfish",
        "reaction": "hives",
        "severity": "moderate",
        "dateReported": "2015-08-22"
      }
    ],
    "conditions": [
      "chronic pain"
    ],
    "currentMedications": [
      {
        "drugName": "Gabapentin 300 mg Capsule",
        "sig": "Take 1 capsule by mouth three times daily",
        "prescriber": "Dr. Henry Caldwell",
        "startDate": "2020-09-10",
        "refillsRemaining": 2
      }
    ],
    "notes": "Participating in medication synchronization program."
  },
  {
    "id": "PT-000060",
    "name": "Lucas59 Morgan",
    "dateOfBirth": "1976-10-04",
    "age": 47,
    "gender": "male",
    "phone": "510-555-5307",
    "email": "lucas59.morgan59@pharmamax.test",
    "address": "403 Fillmore St, San Francisco, CA 94114",
    "insurance": {
      "provider": "Sunrise HMO",
      "planType": "Commercial HMO",
      "memberId": "SH500749",
      "groupNumber": "SHG247"
    },
    "allergies": [],
    "conditions": [
      "migraine"
    ],
    "currentMedications": [
      {
        "drugName": "Metoprolol 25 mg Tablet",
        "sig": "Take 1 tablet by mouth twice daily",
        "prescriber": "Dr. Victor Suarez",
        "startDate": "2023-04-20",
        "refillsRemaining": 3
      }
    ]
  }
] as const;
