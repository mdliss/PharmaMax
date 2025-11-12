import type { ControlledSubstanceLogEntry } from './syntheticTypes';

export const SYNTHETIC_CONTROLLED_LOGS: ControlledSubstanceLogEntry[] = [
  {
    "id": "CS-000001",
    "timestamp": 1702852200000,
    "patientId": "PT-000003",
    "prescriptionId": "RX-000015",
    "drugName": "Tramadol 50 mg Tablet",
    "deaSchedule": "C-IV",
    "ndc": "54868-1125-01",
    "quantity": 30,
    "prescriber": {
      "name": "Dr. Evelyn Brooks",
      "deaNumber": "EB6390124",
      "npi": "1902745632"
    },
    "dispensedBy": "Jordan Patel",
    "verifiedBy": "Anthony Kim",
    "notes": "Verified in controlled substance log.",
    "pmpReported": false
  },
  {
    "id": "CS-000002",
    "timestamp": 1702153800000,
    "patientId": "PT-000005",
    "prescriptionId": "RX-000023",
    "drugName": "Buprenorphine/Naloxone 8-2 mg Film",
    "deaSchedule": "C-III",
    "ndc": "54868-1148-01",
    "quantity": 42,
    "prescriber": {
      "name": "Dr. Evelyn Brooks",
      "deaNumber": "EB6390124",
      "npi": "1902745632"
    },
    "dispensedBy": "Lisa Hernandez",
    "verifiedBy": "Priyanka Shah",
    "notes": "Verified in controlled substance log.",
    "pmpReported": true,
    "reportedDate": "2023-12-09"
  },
  {
    "id": "CS-000003",
    "timestamp": 1701981000000,
    "patientId": "PT-000005",
    "prescriptionId": "RX-000025",
    "drugName": "Buprenorphine/Naloxone 8-2 mg Film",
    "deaSchedule": "C-III",
    "ndc": "54868-1148-01",
    "quantity": 98,
    "prescriber": {
      "name": "Dr. Evelyn Brooks",
      "deaNumber": "EB6390124",
      "npi": "1902745632"
    },
    "dispensedBy": "Anthony Kim",
    "verifiedBy": "Amelia Johnson",
    "notes": "Verified in controlled substance log.",
    "pmpReported": true,
    "reportedDate": "2023-12-07"
  },
  {
    "id": "CS-000004",
    "timestamp": 1703824200000,
    "patientId": "PT-000005",
    "prescriptionId": "RX-000027",
    "drugName": "Buprenorphine/Naloxone 8-2 mg Film",
    "deaSchedule": "C-III",
    "ndc": "54868-1148-01",
    "quantity": 42,
    "prescriber": {
      "name": "Dr. Evelyn Brooks",
      "deaNumber": "EB6390124",
      "npi": "1902745632"
    },
    "dispensedBy": "Priyanka Shah",
    "verifiedBy": "Jordan Patel",
    "notes": "Hold for prescriber authorization due to early refill request.",
    "pmpReported": true,
    "reportedDate": "2023-12-29",
    "flags": [
      "early-refill"
    ]
  },
  {
    "id": "CS-000005",
    "timestamp": 1701721800000,
    "patientId": "PT-000005",
    "prescriptionId": "RX-000028",
    "drugName": "Buprenorphine/Naloxone 8-2 mg Film",
    "deaSchedule": "C-III",
    "ndc": "54868-1148-01",
    "quantity": 42,
    "prescriber": {
      "name": "Dr. Evelyn Brooks",
      "deaNumber": "EB6390124",
      "npi": "1902745632"
    },
    "dispensedBy": "Amelia Johnson",
    "verifiedBy": "Lisa Hernandez",
    "notes": "Verified in controlled substance log.",
    "pmpReported": false
  },
  {
    "id": "CS-000006",
    "timestamp": 1701545400000,
    "patientId": "PT-000006",
    "prescriptionId": "RX-000030",
    "drugName": "Alprazolam 0.5 mg Tablet",
    "deaSchedule": "C-IV",
    "ndc": "62037-1066-01",
    "quantity": 90,
    "prescriber": {
      "name": "Dr. Priya Nair",
      "deaNumber": "PN5739401",
      "npi": "1093824756"
    },
    "dispensedBy": "Jordan Patel",
    "verifiedBy": "Anthony Kim",
    "notes": "Verified in controlled substance log.",
    "pmpReported": true,
    "reportedDate": "2023-12-02"
  },
  {
    "id": "CS-000007",
    "timestamp": 1700154000000,
    "patientId": "PT-000006",
    "prescriptionId": "RX-000032",
    "drugName": "Alprazolam 0.5 mg Tablet",
    "deaSchedule": "C-IV",
    "ndc": "62037-1066-01",
    "quantity": 90,
    "prescriber": {
      "name": "Dr. Priya Nair",
      "deaNumber": "PN5739401",
      "npi": "1093824756"
    },
    "dispensedBy": "Lisa Hernandez",
    "verifiedBy": "Priyanka Shah",
    "notes": "Verified in controlled substance log.",
    "pmpReported": true,
    "reportedDate": "2023-11-16"
  },
  {
    "id": "CS-000008",
    "timestamp": 1700674200000,
    "patientId": "PT-000008",
    "prescriptionId": "RX-000040",
    "drugName": "Amphetamine/Dextroamphetamine 20 mg Tablet",
    "deaSchedule": "C-II",
    "ndc": "62037-1072-01",
    "quantity": 60,
    "prescriber": {
      "name": "Dr. Grace Whitman",
      "deaNumber": "GW4829301",
      "npi": "1983746502"
    },
    "dispensedBy": "Anthony Kim",
    "verifiedBy": "Amelia Johnson",
    "notes": "Verified in controlled substance log.",
    "pmpReported": true,
    "reportedDate": "2023-11-22",
    "flags": [
      "requires-hard-copy"
    ]
  },
  {
    "id": "CS-000009",
    "timestamp": 1700587800000,
    "patientId": "PT-000008",
    "prescriptionId": "RX-000041",
    "drugName": "Alprazolam 0.25 mg Tablet",
    "deaSchedule": "C-IV",
    "ndc": "54868-1064-01",
    "quantity": 90,
    "prescriber": {
      "name": "Dr. Michael Tanaka",
      "deaNumber": "MT5938204",
      "npi": "1567289034"
    },
    "dispensedBy": "Priyanka Shah",
    "verifiedBy": "Jordan Patel",
    "notes": "Verified in controlled substance log.",
    "pmpReported": false
  },
  {
    "id": "CS-000010",
    "timestamp": 1700501400000,
    "patientId": "PT-000008",
    "prescriptionId": "RX-000042",
    "drugName": "Amphetamine/Dextroamphetamine 20 mg Tablet",
    "deaSchedule": "C-II",
    "ndc": "62037-1072-01",
    "quantity": 180,
    "prescriber": {
      "name": "Dr. Grace Whitman",
      "deaNumber": "GW4829301",
      "npi": "1983746502"
    },
    "dispensedBy": "Amelia Johnson",
    "verifiedBy": "Lisa Hernandez",
    "notes": "Verified in controlled substance log.",
    "pmpReported": true,
    "reportedDate": "2023-11-20",
    "flags": [
      "requires-hard-copy"
    ]
  },
  {
    "id": "CS-000011",
    "timestamp": 1700143200000,
    "patientId": "PT-000008",
    "prescriptionId": "RX-000043",
    "drugName": "Alprazolam 0.25 mg Tablet",
    "deaSchedule": "C-IV",
    "ndc": "54868-1064-01",
    "quantity": 90,
    "prescriber": {
      "name": "Dr. Michael Tanaka",
      "deaNumber": "MT5938204",
      "npi": "1567289034"
    },
    "dispensedBy": "Jordan Patel",
    "verifiedBy": "Anthony Kim",
    "notes": "Verified in controlled substance log.",
    "pmpReported": true,
    "reportedDate": "2023-11-16"
  },
  {
    "id": "CS-000012",
    "timestamp": 1684949400000,
    "patientId": "PT-000008",
    "prescriptionId": "RX-000222",
    "drugName": "Amphetamine/Dextroamphetamine 20 mg Tablet",
    "deaSchedule": "C-II",
    "ndc": "62037-1072-01",
    "quantity": 60,
    "prescriber": {
      "name": "Dr. Grace Whitman",
      "deaNumber": "GW4829301",
      "npi": "1983746502"
    },
    "dispensedBy": "Lisa Hernandez",
    "verifiedBy": "Priyanka Shah",
    "notes": "Verified in controlled substance log.",
    "pmpReported": true,
    "reportedDate": "2023-05-24",
    "flags": [
      "requires-hard-copy"
    ]
  },
  {
    "id": "CS-000013",
    "timestamp": 1684873800000,
    "patientId": "PT-000005",
    "prescriptionId": "RX-000223",
    "drugName": "Oxycodone 10 mg Tablet",
    "deaSchedule": "C-II",
    "ndc": "62037-1129-01",
    "quantity": 60,
    "prescriber": {
      "name": "Dr. Evelyn Brooks",
      "deaNumber": "EB6390124",
      "npi": "1902745632"
    },
    "dispensedBy": "Anthony Kim",
    "verifiedBy": "Amelia Johnson",
    "notes": "Hold for prescriber authorization due to early refill request.",
    "pmpReported": false,
    "flags": [
      "early-refill"
    ]
  }
] as const;
