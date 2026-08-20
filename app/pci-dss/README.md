# PCI DSS v4.0.1 Merchant Readiness Assessment — Version 2

Interactive portfolio dashboard for **Akwaaba Retail & Online Ltd.**, a fictional Ghana-based omnichannel merchant.

> **Portfolio disclaimer:** This project is an independent fictional readiness exercise. It is not a Report on Compliance (ROC), Attestation of Compliance (AOC), QSA assessment, or evidence of work performed for a real merchant.

## What Version 2 adds

- Executive compliance dashboard
- 12-requirement evidence-readiness scorecard
- Interactive evidence tracker with readiness filters
- Full 20-item representative gap register
- 5×5 likelihood/impact risk heat map
- 10-risk register with inherent and residual targets
- Prioritized 180-day remediation roadmap
- Day 7, 30, 60, 90 and 180 governance checkpoints
- Responsive UI suitable for portfolio demonstration

## Assessment snapshot

- **20 representative gaps:** 1 Critical, 11 High, 8 Medium
- **10 risk scenarios:** 4 Critical, 6 High inherent risks
- **Evidence areas marked Missing:** Requirements 3, 10 and 11
- **Merchant scenario:** three retail stores plus e-commerce
- **Payment channels:** e-commerce checkout and attended P2PE-enabled POS terminals

## Route

When the portfolio application is running, open:

```text
/pci-dss
```

## Local development

From the repository root:

```bash
npm install
npm run dev
```

Then open the local URL shown by the development server and navigate to `/pci-dss`.

## Validation

```bash
npm run build
npm test
npm run lint
```

## Project structure

```text
app/
└── pci-dss/
    ├── page.tsx        # interactive dashboard
    ├── data.ts         # assessment, evidence, risk and roadmap data
    ├── pci-dss.css     # dashboard styling
    └── README.md       # project documentation
```

## Demonstrated capabilities

PCI scoping · cardholder-data flow analysis · control-gap assessment · evidence planning · risk scoring · remediation governance · executive reporting · PCI DSS v4.0.1 readiness analysis

---

Prepared by **Richmond Kwadwo Sarpong** — Chartered Accountant · ISO Lead Auditor · IT GRC & Security Compliance Professional
