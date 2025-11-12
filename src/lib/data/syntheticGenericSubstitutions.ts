import type { GenericSubstitutionEntry } from './syntheticTypes';

export const SYNTHETIC_GENERIC_SUBSTITUTIONS: GenericSubstitutionEntry[] = [
  {
    "brandName": "Lipitor",
    "genericName": "Atorvastatin",
    "rxcui": "861007",
    "therapeuticEquivalent": true,
    "abRating": "AB",
    "averageCostBrand": 180,
    "averageCostGeneric": 18,
    "potentialSavings": 162,
    "manufacturerOptions": [
      {
        "manufacturer": "EverLife Pharma",
        "ndc": "43112-1011-01",
        "price": 13.44,
        "availability": "in-stock"
      },
      {
        "manufacturer": "Summit Therapeutics",
        "ndc": "67205-1012-02",
        "price": 40.32,
        "availability": "in-stock"
      }
    ]
  },
  {
    "brandName": "Zocor",
    "genericName": "Simvastatin",
    "rxcui": "1984404",
    "therapeuticEquivalent": true,
    "abRating": "AB",
    "averageCostBrand": 140,
    "averageCostGeneric": 16,
    "potentialSavings": 124,
    "manufacturerOptions": [
      {
        "manufacturer": "EverLife Pharma",
        "ndc": "43112-1019-01",
        "price": 10.08,
        "availability": "in-stock"
      },
      {
        "manufacturer": "Summit Therapeutics",
        "ndc": "67205-1020-02",
        "price": 30.24,
        "availability": "in-stock"
      }
    ]
  },
  {
    "brandName": "Norvasc",
    "genericName": "Amlodipine",
    "rxcui": "308135",
    "therapeuticEquivalent": true,
    "abRating": "AB",
    "averageCostBrand": 120,
    "averageCostGeneric": 15,
    "potentialSavings": 105,
    "manufacturerOptions": [
      {
        "manufacturer": "Wellness Generics",
        "ndc": "62037-1029-01",
        "price": 14.7,
        "availability": "in-stock"
      },
      {
        "manufacturer": "EverLife Pharma",
        "ndc": "43112-1030-02",
        "price": 44.1,
        "availability": "in-stock"
      }
    ]
  },
  {
    "brandName": "Synthroid",
    "genericName": "Levothyroxine",
    "rxcui": "966164",
    "therapeuticEquivalent": true,
    "abRating": "AB",
    "averageCostBrand": 95,
    "averageCostGeneric": 12,
    "potentialSavings": 83,
    "manufacturerOptions": [
      {
        "manufacturer": "Summit Therapeutics",
        "ndc": "67205-1094-01",
        "price": 7.98,
        "availability": "in-stock"
      },
      {
        "manufacturer": "Harmony Healthcare",
        "ndc": "50945-1095-02",
        "price": 23.94,
        "availability": "in-stock"
      }
    ]
  },
  {
    "brandName": "Zoloft",
    "genericName": "Sertraline",
    "rxcui": "312944",
    "therapeuticEquivalent": true,
    "abRating": "AB",
    "averageCostBrand": 110,
    "averageCostGeneric": 14,
    "potentialSavings": 96,
    "manufacturerOptions": [
      {
        "manufacturer": "EverLife Pharma",
        "ndc": "43112-1054-01",
        "price": 14.28,
        "availability": "in-stock"
      },
      {
        "manufacturer": "Summit Therapeutics",
        "ndc": "67205-1055-02",
        "price": 42.84,
        "availability": "in-stock"
      }
    ]
  },
  {
    "brandName": "Lexapro",
    "genericName": "Escitalopram",
    "rxcui": "352263",
    "therapeuticEquivalent": true,
    "abRating": "AB",
    "averageCostBrand": 125,
    "averageCostGeneric": 16,
    "potentialSavings": 109,
    "manufacturerOptions": [
      {
        "manufacturer": "Wellness Generics",
        "ndc": "62037-1058-01",
        "price": 13.86,
        "availability": "in-stock"
      },
      {
        "manufacturer": "EverLife Pharma",
        "ndc": "43112-1059-02",
        "price": 41.58,
        "availability": "in-stock"
      }
    ]
  },
  {
    "brandName": "Prozac",
    "genericName": "Fluoxetine",
    "rxcui": "313989",
    "therapeuticEquivalent": true,
    "abRating": "AB",
    "averageCostBrand": 160,
    "averageCostGeneric": 18,
    "potentialSavings": 142,
    "manufacturerOptions": [
      {
        "manufacturer": "Wellness Generics",
        "ndc": "62037-1062-01",
        "price": 13.02,
        "availability": "in-stock"
      },
      {
        "manufacturer": "EverLife Pharma",
        "ndc": "43112-1063-02",
        "price": 39.06,
        "availability": "in-stock"
      }
    ]
  },
  {
    "brandName": "Glucophage",
    "genericName": "Metformin",
    "rxcui": "861008",
    "therapeuticEquivalent": true,
    "abRating": "AB",
    "averageCostBrand": 90,
    "averageCostGeneric": 10,
    "potentialSavings": 80,
    "manufacturerOptions": [
      {
        "manufacturer": "PharmaTrust Labs",
        "ndc": "54868-1039-01",
        "price": 15.12,
        "availability": "in-stock"
      },
      {
        "manufacturer": "Wellness Generics",
        "ndc": "62037-1040-02",
        "price": 45.36,
        "availability": "in-stock"
      }
    ]
  }
] as const;
