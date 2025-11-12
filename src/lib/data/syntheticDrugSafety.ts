import type { DrugSafetyRecord } from './syntheticTypes';

export const SYNTHETIC_DRUG_SAFETY: DrugSafetyRecord[] = [
  {
    "drugName": "Warfarin 5 mg Tablet",
    "rxcui": "855332",
    "alerts": [
      {
        "type": "monitoring-required",
        "severity": "critical",
        "title": "Requires regular INR monitoring",
        "description": "Warfarin has a narrow therapeutic index and interacts with many foods and medications.",
        "recommendation": "Check INR within 3 days of any medication change and every 4 weeks when stable.",
        "source": "Clinical Guidelines"
      },
      {
        "type": "pregnancy-warning",
        "severity": "warning",
        "title": "Contraindicated in pregnancy",
        "description": "Warfarin crosses the placenta and can cause fetal harm.",
        "recommendation": "Use LMWH instead when anticoagulation is required during pregnancy.",
        "source": "FDA"
      }
    ],
    "interactions": [
      {
        "interactingDrug": "Azithromycin 250 mg Tablet",
        "severity": "major",
        "effect": "May increase INR and bleeding risk.",
        "recommendation": "Monitor INR closely and adjust warfarin dose as needed."
      },
      {
        "interactingDrug": "Ibuprofen 600 mg Tablet",
        "severity": "moderate",
        "effect": "Increased bleeding risk due to platelet inhibition.",
        "recommendation": "Use acetaminophen for pain when possible."
      }
    ]
  },
  {
    "drugName": "Apixaban 5 mg Tablet",
    "rxcui": "1364430",
    "alerts": [
      {
        "type": "renal-adjustment",
        "severity": "warning",
        "title": "Dose adjustment in renal impairment",
        "description": "Reduce dose to 2.5 mg twice daily if serum creatinine ≥1.5 mg/dL and age ≥80 years or weight ≤60 kg.",
        "recommendation": "Assess renal function at least annually.",
        "source": "Clinical Guidelines"
      }
    ],
    "interactions": [
      {
        "interactingDrug": "Azithromycin 250 mg Tablet",
        "severity": "moderate",
        "effect": "P-gp inhibitors may increase apixaban plasma levels.",
        "recommendation": "Monitor for bleeding and consider temporary dose adjustment."
      }
    ]
  },
  {
    "drugName": "Metformin 1000 mg Tablet",
    "rxcui": "860976",
    "alerts": [
      {
        "type": "renal-adjustment",
        "severity": "critical",
        "title": "Contraindicated in severe renal impairment",
        "description": "Risk of lactic acidosis increases with declining renal function.",
        "recommendation": "Avoid if eGFR <30 mL/min/1.73m² and reassess dosing if eGFR 30-45.",
        "source": "FDA"
      }
    ],
    "interactions": [
      {
        "interactingDrug": "Gabapentin 600 mg Capsule",
        "severity": "minor",
        "effect": "Both can cause dizziness; counsel patient on fall risk.",
        "recommendation": "Monitor for additive CNS effects."
      }
    ]
  },
  {
    "drugName": "Insulin Glargine 100 units/mL Solution",
    "rxcui": "847232",
    "alerts": [
      {
        "type": "monitoring-required",
        "severity": "critical",
        "title": "Risk of severe hypoglycemia",
        "description": "Basal insulin may cause severe hypoglycemia if meals are skipped or dosing errors occur.",
        "recommendation": "Educate patients on glucose monitoring and hypoglycemia management.",
        "source": "Clinical Guidelines"
      }
    ],
    "interactions": [
      {
        "interactingDrug": "Tramadol 50 mg Tablet",
        "severity": "moderate",
        "effect": "May mask hypoglycemia symptoms due to CNS depression.",
        "recommendation": "Counsel patient to monitor glucose closely."
      }
    ]
  },
  {
    "drugName": "Gabapentin 600 mg Capsule",
    "rxcui": "310800",
    "alerts": [
      {
        "type": "age-restriction",
        "severity": "warning",
        "title": "Increased fall risk in older adults",
        "description": "Gabapentin may cause dizziness and sedation, increasing fall risk.",
        "recommendation": "Start at lower doses in elderly patients; monitor gait and balance.",
        "source": "Beers Criteria"
      }
    ],
    "interactions": [
      {
        "interactingDrug": "Naloxone Nasal Spray",
        "severity": "minor",
        "effect": "No clinically significant interaction; ensure availability for opioid therapy.",
        "recommendation": "Document naloxone counseling."
      }
    ]
  },
  {
    "drugName": "Lisinopril 20 mg Tablet",
    "rxcui": "197361",
    "alerts": [
      {
        "type": "pregnancy-warning",
        "severity": "critical",
        "title": "Contraindicated in pregnancy",
        "description": "ACE inhibitors can cause injury and death to the developing fetus.",
        "recommendation": "Discontinue immediately if pregnancy is detected.",
        "source": "FDA"
      },
      {
        "type": "renal-adjustment",
        "severity": "warning",
        "title": "Monitor renal function and potassium",
        "description": "ACE inhibitors may cause hyperkalemia and reduced renal function.",
        "recommendation": "Check serum creatinine and potassium within 1-2 weeks of initiation.",
        "source": "Clinical Guidelines"
      }
    ],
    "interactions": [
      {
        "interactingDrug": "Ibuprofen 800 mg Tablet",
        "severity": "moderate",
        "effect": "NSAIDs may diminish antihypertensive effect and impair renal function.",
        "recommendation": "Limit NSAID use and monitor blood pressure and renal function."
      }
    ]
  },
  {
    "drugName": "Prednisone 20 mg Tablet",
    "rxcui": "312133",
    "alerts": [
      {
        "type": "monitoring-required",
        "severity": "warning",
        "title": "Risk of immunosuppression",
        "description": "Systemic corticosteroids can increase infection risk and blood glucose.",
        "recommendation": "Monitor blood glucose in diabetic patients and counsel on infection precautions.",
        "source": "Clinical Guidelines"
      }
    ],
    "interactions": [
      {
        "interactingDrug": "Metformin 500 mg Tablet",
        "severity": "moderate",
        "effect": "Prednisone may increase blood glucose, reducing metformin effectiveness.",
        "recommendation": "Monitor blood glucose more frequently during steroid therapy."
      }
    ]
  },
  {
    "drugName": "Amphetamine/Dextroamphetamine 20 mg Tablet",
    "rxcui": "861014",
    "alerts": [
      {
        "type": "black-box-warning",
        "severity": "critical",
        "title": "Potential for abuse and dependence",
        "description": "CNS stimulants have a high potential for abuse and misuse.",
        "recommendation": "Assess abuse risk prior to prescribing and monitor for misuse.",
        "source": "FDA"
      },
      {
        "type": "monitoring-required",
        "severity": "warning",
        "title": "Monitor cardiovascular status",
        "description": "Stimulants can increase blood pressure and heart rate.",
        "recommendation": "Assess baseline cardiovascular history and monitor periodically.",
        "source": "Clinical Guidelines"
      }
    ],
    "interactions": [
      {
        "interactingDrug": "Escitalopram 20 mg Tablet",
        "severity": "moderate",
        "effect": "May increase risk of serotonin syndrome.",
        "recommendation": "Monitor for agitation, confusion, or tachycardia."
      }
    ]
  },
  {
    "drugName": "Oxycodone 10 mg Tablet",
    "rxcui": "1049628",
    "alerts": [
      {
        "type": "black-box-warning",
        "severity": "critical",
        "title": "Risk of addiction, abuse, and misuse",
        "description": "Opioids expose patients and users to risks of addiction and overdose.",
        "recommendation": "Use lowest effective dose for shortest duration; monitor for misuse.",
        "source": "FDA"
      },
      {
        "type": "pregnancy-warning",
        "severity": "warning",
        "title": "Neonatal opioid withdrawal syndrome",
        "description": "Prolonged use during pregnancy can result in neonatal withdrawal.",
        "recommendation": "Counsel pregnant patients on risks; coordinate with obstetrics.",
        "source": "FDA"
      }
    ],
    "interactions": [
      {
        "interactingDrug": "Alprazolam 0.5 mg Tablet",
        "severity": "major",
        "effect": "Additive CNS depression and respiratory depression.",
        "recommendation": "Avoid co-prescribing when possible; monitor closely if necessary."
      }
    ]
  },
  {
    "drugName": "Buprenorphine/Naloxone 8-2 mg Film",
    "rxcui": "1010607",
    "alerts": [
      {
        "type": "black-box-warning",
        "severity": "warning",
        "title": "Risk of misuse and diversion",
        "description": "Buprenorphine combination products can be diverted for misuse.",
        "recommendation": "Use medication agreements and monitor PDMP reports.",
        "source": "FDA"
      }
    ],
    "interactions": [
      {
        "interactingDrug": "Naloxone Nasal Spray",
        "severity": "minor",
        "effect": "No interaction; naloxone is recommended for emergency use.",
        "recommendation": "Ensure patient and family know how to administer naloxone."
      }
    ]
  },
  {
    "drugName": "Isotretinoin 40 mg Capsule",
    "rxcui": "40265",
    "alerts": [
      {
        "type": "black-box-warning",
        "severity": "critical",
        "title": "Pregnancy Category X",
        "description": "Isotretinoin is teratogenic and contraindicated in pregnancy.",
        "recommendation": "Enroll patient in iPLEDGE program; require two forms of contraception.",
        "source": "FDA"
      }
    ],
    "interactions": [
      {
        "interactingDrug": "Prednisone 10 mg Tablet",
        "severity": "moderate",
        "effect": "Corticosteroids may increase risk of pseudotumor cerebri.",
        "recommendation": "Avoid combination if possible; monitor for headache/visual changes."
      }
    ]
  },
  {
    "drugName": "Hydrocodone/Acetaminophen 10-325 mg Tablet",
    "rxcui": "857001",
    "alerts": [
      {
        "type": "black-box-warning",
        "severity": "critical",
        "title": "Risk of hepatotoxicity",
        "description": "Acetaminophen doses above 4 grams daily can cause severe liver injury.",
        "recommendation": "Ensure total acetaminophen from all sources is <4 g/day.",
        "source": "FDA"
      }
    ],
    "interactions": [
      {
        "interactingDrug": "Alcohol",
        "severity": "major",
        "effect": "Increased CNS depression and hepatotoxicity risk.",
        "recommendation": "Advise patient to avoid alcohol while taking this medication."
      }
    ]
  },
  {
    "drugName": "Naloxone 4 mg/0.1 mL Spray",
    "rxcui": "1729615",
    "alerts": [
      {
        "type": "monitoring-required",
        "severity": "info",
        "title": "Short duration of action",
        "description": "Naloxone may wear off before opioids; repeat dosing may be necessary.",
        "recommendation": "Call emergency services after administration and monitor patient.",
        "source": "Clinical Guidelines"
      }
    ],
    "interactions": []
  },
  {
    "drugName": "Levofloxacin 500 mg Tablet",
    "rxcui": "211861",
    "alerts": [
      {
        "type": "age-restriction",
        "severity": "warning",
        "title": "Use with caution in pediatric patients",
        "description": "Fluoroquinolones associated with musculoskeletal adverse events in pediatrics.",
        "recommendation": "Reserve for situations with no alternative treatment.",
        "source": "FDA"
      },
      {
        "type": "black-box-warning",
        "severity": "warning",
        "title": "Risk of tendon rupture",
        "description": "Fluoroquinolones increase risk of tendonitis and rupture, especially in elderly.",
        "recommendation": "Discontinue at first sign of tendon pain or inflammation.",
        "source": "FDA"
      }
    ],
    "interactions": [
      {
        "interactingDrug": "Warfarin 5 mg Tablet",
        "severity": "major",
        "effect": "May enhance anticoagulant effect leading to bleeding.",
        "recommendation": "Monitor INR closely during therapy."
      }
    ]
  },
  {
    "drugName": "Sertraline 100 mg Tablet",
    "rxcui": "312944",
    "alerts": [
      {
        "type": "monitoring-required",
        "severity": "warning",
        "title": "Risk of serotonin syndrome",
        "description": "Serotonergic agents taken together can precipitate serotonin syndrome.",
        "recommendation": "Monitor for agitation, tachycardia, and hyperreflexia when combined with other serotonergic drugs.",
        "source": "Clinical Guidelines"
      }
    ],
    "interactions": [
      {
        "interactingDrug": "Amphetamine/Dextroamphetamine 20 mg Tablet",
        "severity": "moderate",
        "effect": "Increased risk of serotonin syndrome.",
        "recommendation": "Use lowest effective doses and monitor closely."
      }
    ]
  },
  {
    "drugName": "Omeprazole 40 mg Capsule",
    "rxcui": "198211",
    "alerts": [
      {
        "type": "monitoring-required",
        "severity": "info",
        "title": "Risk of nutrient malabsorption",
        "description": "Long-term PPI therapy can cause vitamin B12 and magnesium deficiency.",
        "recommendation": "Consider periodic monitoring for patients on long-term therapy.",
        "source": "Clinical Guidelines"
      }
    ],
    "interactions": [
      {
        "interactingDrug": "Levothyroxine 75 mcg Tablet",
        "severity": "minor",
        "effect": "Reduced absorption of levothyroxine if taken together.",
        "recommendation": "Separate administration by at least 4 hours."
      }
    ]
  },
  {
    "drugName": "Amlodipine 10 mg Tablet",
    "rxcui": "308135",
    "alerts": [
      {
        "type": "monitoring-required",
        "severity": "info",
        "title": "Risk of peripheral edema",
        "description": "Calcium channel blockers commonly cause dose-related edema.",
        "recommendation": "Monitor for swelling and consider adding ACE inhibitor if edema develops.",
        "source": "Clinical Guidelines"
      }
    ],
    "interactions": [
      {
        "interactingDrug": "Metoprolol 50 mg Tablet",
        "severity": "minor",
        "effect": "Additive hypotensive effects.",
        "recommendation": "Monitor blood pressure and adjust doses as needed."
      }
    ]
  },
  {
    "drugName": "Montelukast 10 mg Tablet",
    "rxcui": "200224",
    "alerts": [
      {
        "type": "black-box-warning",
        "severity": "warning",
        "title": "Neuropsychiatric events",
        "description": "Serious behavior and mood changes have been reported.",
        "recommendation": "Counsel patients to report agitation, depression, or suicidal thoughts.",
        "source": "FDA"
      }
    ],
    "interactions": []
  },
  {
    "drugName": "Fluticasone 110 mcg/actuation Inhaler",
    "rxcui": "1991476",
    "alerts": [
      {
        "type": "monitoring-required",
        "severity": "info",
        "title": "Rinse mouth after use",
        "description": "Inhaled corticosteroids can cause oral candidiasis.",
        "recommendation": "Advise patients to rinse and spit after each use.",
        "source": "Clinical Guidelines"
      }
    ],
    "interactions": []
  },
  {
    "drugName": "Hydrocodone/Acetaminophen 5-325 mg Tablet",
    "rxcui": "857004",
    "alerts": [
      {
        "type": "black-box-warning",
        "severity": "critical",
        "title": "Addiction, abuse, and misuse risk",
        "description": "Combination opioid products carry high risk of misuse.",
        "recommendation": "Limit quantity dispensed and review PDMP before refills.",
        "source": "FDA"
      }
    ],
    "interactions": [
      {
        "interactingDrug": "Diazepam 5 mg Tablet",
        "severity": "major",
        "effect": "Enhanced respiratory depression.",
        "recommendation": "Avoid combination if possible; monitor closely for sedation."
      }
    ]
  }
] as const;
