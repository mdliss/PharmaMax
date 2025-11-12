import type { AuditLogEntry } from './syntheticTypes';

export const SYNTHETIC_AUDIT_LOGS: AuditLogEntry[] = [
  {
    "id": "AUD-000001",
    "timestamp": 1704067200000,
    "userId": "EMP-001",
    "action": "login",
    "resource": "auth",
    "changes": {},
    "ipAddress": "192.168.1.10",
    "success": true
  },
  {
    "id": "AUD-000002",
    "timestamp": 1704063600000,
    "userId": "EMP-002",
    "action": "update-prescription",
    "resource": "prescription",
    "changes": {
      "prescriptionId": "RX-000002",
      "field": "status",
      "value": "filled"
    },
    "ipAddress": "192.168.1.11",
    "success": true
  },
  {
    "id": "AUD-000003",
    "timestamp": 1704060000000,
    "userId": "EMP-003",
    "action": "override-alert",
    "resource": "inventory",
    "changes": {},
    "ipAddress": "192.168.1.12",
    "success": true
  },
  {
    "id": "AUD-000004",
    "timestamp": 1704056400000,
    "userId": "EMP-004",
    "action": "verify-controlled",
    "resource": "pmp",
    "changes": {
      "originalPrescriptionId": "RX-000057",
      "verification": "completed"
    },
    "ipAddress": "192.168.1.13",
    "success": true
  },
  {
    "id": "AUD-000005",
    "timestamp": 1704052800000,
    "userId": "EMP-005",
    "action": "print-label",
    "resource": "batch-job",
    "changes": {},
    "ipAddress": "192.168.1.14",
    "success": true
  },
  {
    "id": "AUD-000006",
    "timestamp": 1704049200000,
    "userId": "EMP-006",
    "action": "submit-pmp",
    "resource": "auth",
    "changes": {},
    "ipAddress": "192.168.1.15",
    "success": true
  },
  {
    "id": "AUD-000007",
    "timestamp": 1704045600000,
    "userId": "EMP-007",
    "action": "login",
    "resource": "prescription",
    "changes": {},
    "ipAddress": "192.168.1.16",
    "success": true
  },
  {
    "id": "AUD-000008",
    "timestamp": 1704042000000,
    "userId": "EMP-008",
    "action": "update-prescription",
    "resource": "inventory",
    "changes": {
      "prescriptionId": "RX-000008",
      "field": "status",
      "value": "filled"
    },
    "ipAddress": "192.168.1.17",
    "success": true
  },
  {
    "id": "AUD-000009",
    "timestamp": 1704038400000,
    "userId": "EMP-009",
    "action": "override-alert",
    "resource": "pmp",
    "changes": {},
    "ipAddress": "192.168.1.18",
    "success": true
  },
  {
    "id": "AUD-000010",
    "timestamp": 1704034800000,
    "userId": "EMP-010",
    "action": "verify-controlled",
    "resource": "batch-job",
    "changes": {
      "originalPrescriptionId": "RX-000156",
      "verification": "completed"
    },
    "ipAddress": "192.168.1.19",
    "success": true
  },
  {
    "id": "AUD-000011",
    "timestamp": 1704031200000,
    "userId": "EMP-011",
    "action": "print-label",
    "resource": "auth",
    "changes": {},
    "ipAddress": "192.168.1.20",
    "success": true
  },
  {
    "id": "AUD-000012",
    "timestamp": 1704027600000,
    "userId": "EMP-012",
    "action": "submit-pmp",
    "resource": "prescription",
    "changes": {},
    "ipAddress": "192.168.1.21",
    "success": true
  },
  {
    "id": "AUD-000013",
    "timestamp": 1704024000000,
    "userId": "EMP-001",
    "action": "login",
    "resource": "inventory",
    "changes": {},
    "ipAddress": "192.168.1.22",
    "success": true
  },
  {
    "id": "AUD-000014",
    "timestamp": 1704020400000,
    "userId": "EMP-002",
    "action": "update-prescription",
    "resource": "pmp",
    "changes": {
      "prescriptionId": "RX-000014",
      "field": "status",
      "value": "filled"
    },
    "ipAddress": "192.168.1.23",
    "success": true
  },
  {
    "id": "AUD-000015",
    "timestamp": 1704016800000,
    "userId": "EMP-003",
    "action": "override-alert",
    "resource": "batch-job",
    "changes": {},
    "ipAddress": "192.168.1.24",
    "success": true
  },
  {
    "id": "AUD-000016",
    "timestamp": 1704013200000,
    "userId": "EMP-004",
    "action": "verify-controlled",
    "resource": "auth",
    "changes": {
      "originalPrescriptionId": "RX-000028",
      "verification": "completed"
    },
    "ipAddress": "192.168.1.25",
    "success": true
  },
  {
    "id": "AUD-000017",
    "timestamp": 1704009600000,
    "userId": "EMP-005",
    "action": "print-label",
    "resource": "prescription",
    "changes": {},
    "ipAddress": "192.168.1.26",
    "success": true
  },
  {
    "id": "AUD-000018",
    "timestamp": 1704006000000,
    "userId": "EMP-006",
    "action": "submit-pmp",
    "resource": "inventory",
    "changes": {},
    "ipAddress": "192.168.1.27",
    "success": true
  },
  {
    "id": "AUD-000019",
    "timestamp": 1704002400000,
    "userId": "EMP-007",
    "action": "login",
    "resource": "pmp",
    "changes": {},
    "ipAddress": "192.168.1.28",
    "success": true
  },
  {
    "id": "AUD-000020",
    "timestamp": 1703998800000,
    "userId": "EMP-008",
    "action": "update-prescription",
    "resource": "batch-job",
    "changes": {
      "prescriptionId": "RX-000020",
      "field": "status",
      "value": "filled"
    },
    "ipAddress": "192.168.1.29",
    "success": true
  },
  {
    "id": "AUD-000021",
    "timestamp": 1703995200000,
    "userId": "EMP-009",
    "action": "override-alert",
    "resource": "auth",
    "changes": {},
    "ipAddress": "192.168.1.30",
    "success": false,
    "errorMessage": "Override denied by supervising pharmacist."
  },
  {
    "id": "AUD-000022",
    "timestamp": 1703991600000,
    "userId": "EMP-010",
    "action": "verify-controlled",
    "resource": "prescription",
    "changes": {
      "originalPrescriptionId": "RX-000123",
      "verification": "completed"
    },
    "ipAddress": "192.168.1.31",
    "success": true
  },
  {
    "id": "AUD-000023",
    "timestamp": 1703988000000,
    "userId": "EMP-011",
    "action": "print-label",
    "resource": "inventory",
    "changes": {},
    "ipAddress": "192.168.1.32",
    "success": true
  },
  {
    "id": "AUD-000024",
    "timestamp": 1703984400000,
    "userId": "EMP-012",
    "action": "submit-pmp",
    "resource": "pmp",
    "changes": {},
    "ipAddress": "192.168.1.33",
    "success": true
  },
  {
    "id": "AUD-000025",
    "timestamp": 1703980800000,
    "userId": "EMP-001",
    "action": "login",
    "resource": "batch-job",
    "changes": {},
    "ipAddress": "192.168.1.34",
    "success": true
  },
  {
    "id": "AUD-000026",
    "timestamp": 1703977200000,
    "userId": "EMP-002",
    "action": "update-prescription",
    "resource": "auth",
    "changes": {
      "prescriptionId": "RX-000026",
      "field": "status",
      "value": "filled"
    },
    "ipAddress": "192.168.1.35",
    "success": true
  },
  {
    "id": "AUD-000027",
    "timestamp": 1703973600000,
    "userId": "EMP-003",
    "action": "override-alert",
    "resource": "prescription",
    "changes": {},
    "ipAddress": "192.168.1.36",
    "success": true
  },
  {
    "id": "AUD-000028",
    "timestamp": 1703970000000,
    "userId": "EMP-004",
    "action": "verify-controlled",
    "resource": "inventory",
    "changes": {
      "originalPrescriptionId": "RX-000222",
      "verification": "completed"
    },
    "ipAddress": "192.168.1.37",
    "success": true
  },
  {
    "id": "AUD-000029",
    "timestamp": 1703966400000,
    "userId": "EMP-005",
    "action": "print-label",
    "resource": "pmp",
    "changes": {},
    "ipAddress": "192.168.1.38",
    "success": true
  },
  {
    "id": "AUD-000030",
    "timestamp": 1703962800000,
    "userId": "EMP-006",
    "action": "submit-pmp",
    "resource": "batch-job",
    "changes": {},
    "ipAddress": "192.168.1.39",
    "success": true
  },
  {
    "id": "AUD-000031",
    "timestamp": 1703959200000,
    "userId": "EMP-007",
    "action": "login",
    "resource": "auth",
    "changes": {},
    "ipAddress": "192.168.1.40",
    "success": true
  },
  {
    "id": "AUD-000032",
    "timestamp": 1703955600000,
    "userId": "EMP-008",
    "action": "update-prescription",
    "resource": "prescription",
    "changes": {
      "prescriptionId": "RX-000032",
      "field": "status",
      "value": "filled"
    },
    "ipAddress": "192.168.1.41",
    "success": true
  },
  {
    "id": "AUD-000033",
    "timestamp": 1703952000000,
    "userId": "EMP-009",
    "action": "override-alert",
    "resource": "inventory",
    "changes": {},
    "ipAddress": "192.168.1.42",
    "success": true
  },
  {
    "id": "AUD-000034",
    "timestamp": 1703948400000,
    "userId": "EMP-010",
    "action": "verify-controlled",
    "resource": "pmp",
    "changes": {
      "originalPrescriptionId": "RX-000090",
      "verification": "completed"
    },
    "ipAddress": "192.168.1.43",
    "success": true
  },
  {
    "id": "AUD-000035",
    "timestamp": 1703944800000,
    "userId": "EMP-011",
    "action": "print-label",
    "resource": "batch-job",
    "changes": {},
    "ipAddress": "192.168.1.44",
    "success": true
  },
  {
    "id": "AUD-000036",
    "timestamp": 1703941200000,
    "userId": "EMP-012",
    "action": "submit-pmp",
    "resource": "auth",
    "changes": {},
    "ipAddress": "192.168.1.45",
    "success": true
  },
  {
    "id": "AUD-000037",
    "timestamp": 1703937600000,
    "userId": "EMP-001",
    "action": "login",
    "resource": "prescription",
    "changes": {},
    "ipAddress": "192.168.1.46",
    "success": true
  },
  {
    "id": "AUD-000038",
    "timestamp": 1703934000000,
    "userId": "EMP-002",
    "action": "update-prescription",
    "resource": "inventory",
    "changes": {
      "prescriptionId": "RX-000038",
      "field": "status",
      "value": "filled"
    },
    "ipAddress": "192.168.1.47",
    "success": true
  },
  {
    "id": "AUD-000039",
    "timestamp": 1703930400000,
    "userId": "EMP-003",
    "action": "override-alert",
    "resource": "pmp",
    "changes": {},
    "ipAddress": "192.168.1.48",
    "success": true
  },
  {
    "id": "AUD-000040",
    "timestamp": 1703926800000,
    "userId": "EMP-004",
    "action": "verify-controlled",
    "resource": "batch-job",
    "changes": {
      "originalPrescriptionId": "RX-000189",
      "verification": "completed"
    },
    "ipAddress": "192.168.1.49",
    "success": true
  },
  {
    "id": "AUD-000041",
    "timestamp": 1703923200000,
    "userId": "EMP-005",
    "action": "print-label",
    "resource": "auth",
    "changes": {},
    "ipAddress": "192.168.1.50",
    "success": true
  },
  {
    "id": "AUD-000042",
    "timestamp": 1703919600000,
    "userId": "EMP-006",
    "action": "submit-pmp",
    "resource": "prescription",
    "changes": {},
    "ipAddress": "192.168.1.51",
    "success": true
  },
  {
    "id": "AUD-000043",
    "timestamp": 1703916000000,
    "userId": "EMP-007",
    "action": "login",
    "resource": "inventory",
    "changes": {},
    "ipAddress": "192.168.1.52",
    "success": true
  },
  {
    "id": "AUD-000044",
    "timestamp": 1703912400000,
    "userId": "EMP-008",
    "action": "update-prescription",
    "resource": "pmp",
    "changes": {
      "prescriptionId": "RX-000044",
      "field": "status",
      "value": "filled"
    },
    "ipAddress": "192.168.1.53",
    "success": true
  },
  {
    "id": "AUD-000045",
    "timestamp": 1703908800000,
    "userId": "EMP-009",
    "action": "override-alert",
    "resource": "batch-job",
    "changes": {},
    "ipAddress": "192.168.1.54",
    "success": true
  },
  {
    "id": "AUD-000046",
    "timestamp": 1703905200000,
    "userId": "EMP-010",
    "action": "verify-controlled",
    "resource": "auth",
    "changes": {
      "originalPrescriptionId": "RX-000057",
      "verification": "completed"
    },
    "ipAddress": "192.168.1.55",
    "success": true
  },
  {
    "id": "AUD-000047",
    "timestamp": 1703901600000,
    "userId": "EMP-011",
    "action": "print-label",
    "resource": "prescription",
    "changes": {},
    "ipAddress": "192.168.1.56",
    "success": true
  },
  {
    "id": "AUD-000048",
    "timestamp": 1703898000000,
    "userId": "EMP-012",
    "action": "submit-pmp",
    "resource": "inventory",
    "changes": {},
    "ipAddress": "192.168.1.57",
    "success": true
  },
  {
    "id": "AUD-000049",
    "timestamp": 1703894400000,
    "userId": "EMP-001",
    "action": "login",
    "resource": "pmp",
    "changes": {},
    "ipAddress": "192.168.1.58",
    "success": true
  },
  {
    "id": "AUD-000050",
    "timestamp": 1703890800000,
    "userId": "EMP-002",
    "action": "update-prescription",
    "resource": "batch-job",
    "changes": {
      "prescriptionId": "RX-000050",
      "field": "status",
      "value": "filled"
    },
    "ipAddress": "192.168.1.59",
    "success": true
  },
  {
    "id": "AUD-000051",
    "timestamp": 1703887200000,
    "userId": "EMP-003",
    "action": "override-alert",
    "resource": "auth",
    "changes": {},
    "ipAddress": "192.168.1.60",
    "success": false,
    "errorMessage": "Override denied by supervising pharmacist."
  },
  {
    "id": "AUD-000052",
    "timestamp": 1703883600000,
    "userId": "EMP-004",
    "action": "verify-controlled",
    "resource": "prescription",
    "changes": {
      "originalPrescriptionId": "RX-000156",
      "verification": "completed"
    },
    "ipAddress": "192.168.1.61",
    "success": true
  },
  {
    "id": "AUD-000053",
    "timestamp": 1703880000000,
    "userId": "EMP-005",
    "action": "print-label",
    "resource": "inventory",
    "changes": {},
    "ipAddress": "192.168.1.62",
    "success": true
  },
  {
    "id": "AUD-000054",
    "timestamp": 1703876400000,
    "userId": "EMP-006",
    "action": "submit-pmp",
    "resource": "pmp",
    "changes": {},
    "ipAddress": "192.168.1.63",
    "success": true
  },
  {
    "id": "AUD-000055",
    "timestamp": 1703872800000,
    "userId": "EMP-007",
    "action": "login",
    "resource": "batch-job",
    "changes": {},
    "ipAddress": "192.168.1.64",
    "success": true
  },
  {
    "id": "AUD-000056",
    "timestamp": 1703869200000,
    "userId": "EMP-008",
    "action": "update-prescription",
    "resource": "auth",
    "changes": {
      "prescriptionId": "RX-000056",
      "field": "status",
      "value": "pending"
    },
    "ipAddress": "192.168.1.65",
    "success": true
  },
  {
    "id": "AUD-000057",
    "timestamp": 1703865600000,
    "userId": "EMP-009",
    "action": "override-alert",
    "resource": "prescription",
    "changes": {},
    "ipAddress": "192.168.1.66",
    "success": true
  },
  {
    "id": "AUD-000058",
    "timestamp": 1703862000000,
    "userId": "EMP-010",
    "action": "verify-controlled",
    "resource": "inventory",
    "changes": {
      "originalPrescriptionId": "RX-000028",
      "verification": "completed"
    },
    "ipAddress": "192.168.1.67",
    "success": true
  },
  {
    "id": "AUD-000059",
    "timestamp": 1703858400000,
    "userId": "EMP-011",
    "action": "print-label",
    "resource": "pmp",
    "changes": {},
    "ipAddress": "192.168.1.68",
    "success": true
  },
  {
    "id": "AUD-000060",
    "timestamp": 1703854800000,
    "userId": "EMP-012",
    "action": "submit-pmp",
    "resource": "batch-job",
    "changes": {},
    "ipAddress": "192.168.1.69",
    "success": true
  },
  {
    "id": "AUD-000061",
    "timestamp": 1703851200000,
    "userId": "EMP-001",
    "action": "login",
    "resource": "auth",
    "changes": {},
    "ipAddress": "192.168.1.70",
    "success": true
  },
  {
    "id": "AUD-000062",
    "timestamp": 1703847600000,
    "userId": "EMP-002",
    "action": "update-prescription",
    "resource": "prescription",
    "changes": {
      "prescriptionId": "RX-000062",
      "field": "status",
      "value": "filled"
    },
    "ipAddress": "192.168.1.71",
    "success": true
  },
  {
    "id": "AUD-000063",
    "timestamp": 1703844000000,
    "userId": "EMP-003",
    "action": "override-alert",
    "resource": "inventory",
    "changes": {},
    "ipAddress": "192.168.1.72",
    "success": true
  },
  {
    "id": "AUD-000064",
    "timestamp": 1703840400000,
    "userId": "EMP-004",
    "action": "verify-controlled",
    "resource": "pmp",
    "changes": {
      "originalPrescriptionId": "RX-000123",
      "verification": "completed"
    },
    "ipAddress": "192.168.1.73",
    "success": true
  },
  {
    "id": "AUD-000065",
    "timestamp": 1703836800000,
    "userId": "EMP-005",
    "action": "print-label",
    "resource": "batch-job",
    "changes": {},
    "ipAddress": "192.168.1.74",
    "success": true
  },
  {
    "id": "AUD-000066",
    "timestamp": 1703833200000,
    "userId": "EMP-006",
    "action": "submit-pmp",
    "resource": "auth",
    "changes": {},
    "ipAddress": "192.168.1.75",
    "success": true
  },
  {
    "id": "AUD-000067",
    "timestamp": 1703829600000,
    "userId": "EMP-007",
    "action": "login",
    "resource": "prescription",
    "changes": {},
    "ipAddress": "192.168.1.76",
    "success": true
  },
  {
    "id": "AUD-000068",
    "timestamp": 1703826000000,
    "userId": "EMP-008",
    "action": "update-prescription",
    "resource": "inventory",
    "changes": {
      "prescriptionId": "RX-000068",
      "field": "status",
      "value": "filled"
    },
    "ipAddress": "192.168.1.77",
    "success": true
  },
  {
    "id": "AUD-000069",
    "timestamp": 1703822400000,
    "userId": "EMP-009",
    "action": "override-alert",
    "resource": "pmp",
    "changes": {},
    "ipAddress": "192.168.1.78",
    "success": true
  },
  {
    "id": "AUD-000070",
    "timestamp": 1703818800000,
    "userId": "EMP-010",
    "action": "verify-controlled",
    "resource": "batch-job",
    "changes": {
      "originalPrescriptionId": "RX-000222",
      "verification": "completed"
    },
    "ipAddress": "192.168.1.79",
    "success": true
  },
  {
    "id": "AUD-000071",
    "timestamp": 1703815200000,
    "userId": "EMP-011",
    "action": "print-label",
    "resource": "auth",
    "changes": {},
    "ipAddress": "192.168.1.80",
    "success": true
  },
  {
    "id": "AUD-000072",
    "timestamp": 1703811600000,
    "userId": "EMP-012",
    "action": "submit-pmp",
    "resource": "prescription",
    "changes": {},
    "ipAddress": "192.168.1.81",
    "success": true
  },
  {
    "id": "AUD-000073",
    "timestamp": 1703808000000,
    "userId": "EMP-001",
    "action": "login",
    "resource": "inventory",
    "changes": {},
    "ipAddress": "192.168.1.82",
    "success": true
  },
  {
    "id": "AUD-000074",
    "timestamp": 1703804400000,
    "userId": "EMP-002",
    "action": "update-prescription",
    "resource": "pmp",
    "changes": {
      "prescriptionId": "RX-000074",
      "field": "status",
      "value": "filled"
    },
    "ipAddress": "192.168.1.83",
    "success": true
  },
  {
    "id": "AUD-000075",
    "timestamp": 1703800800000,
    "userId": "EMP-003",
    "action": "override-alert",
    "resource": "batch-job",
    "changes": {},
    "ipAddress": "192.168.1.84",
    "success": true
  },
  {
    "id": "AUD-000076",
    "timestamp": 1703797200000,
    "userId": "EMP-004",
    "action": "verify-controlled",
    "resource": "auth",
    "changes": {
      "originalPrescriptionId": "RX-000090",
      "verification": "completed"
    },
    "ipAddress": "192.168.1.85",
    "success": true
  },
  {
    "id": "AUD-000077",
    "timestamp": 1703793600000,
    "userId": "EMP-005",
    "action": "print-label",
    "resource": "prescription",
    "changes": {},
    "ipAddress": "192.168.1.86",
    "success": true
  },
  {
    "id": "AUD-000078",
    "timestamp": 1703790000000,
    "userId": "EMP-006",
    "action": "submit-pmp",
    "resource": "inventory",
    "changes": {},
    "ipAddress": "192.168.1.87",
    "success": true
  },
  {
    "id": "AUD-000079",
    "timestamp": 1703786400000,
    "userId": "EMP-007",
    "action": "login",
    "resource": "pmp",
    "changes": {},
    "ipAddress": "192.168.1.88",
    "success": true
  },
  {
    "id": "AUD-000080",
    "timestamp": 1703782800000,
    "userId": "EMP-008",
    "action": "update-prescription",
    "resource": "batch-job",
    "changes": {
      "prescriptionId": "RX-000080",
      "field": "status",
      "value": "filled"
    },
    "ipAddress": "192.168.1.89",
    "success": true
  }
] as const;
