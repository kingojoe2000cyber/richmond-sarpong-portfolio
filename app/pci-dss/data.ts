export const requirementReadiness = [
  { id: 1, title: "Network security controls", status: "Partial", score: 50 },
  { id: 2, title: "Secure configurations", status: "Partial", score: 50 },
  { id: 3, title: "Protect stored account data", status: "Missing", score: 0 },
  { id: 4, title: "Protect data in transit", status: "Partial", score: 50 },
  { id: 5, title: "Protect against malware", status: "Partial", score: 50 },
  { id: 6, title: "Develop and maintain secure systems", status: "Partial", score: 50 },
  { id: 7, title: "Restrict access by business need", status: "Partial", score: 50 },
  { id: 8, title: "Identify users and authenticate access", status: "Partial", score: 50 },
  { id: 9, title: "Restrict physical access", status: "Partial", score: 50 },
  { id: 10, title: "Log and monitor access", status: "Missing", score: 0 },
  { id: 11, title: "Test security systems and processes", status: "Missing", score: 0 },
  { id: 12, title: "Support security with policies and programs", status: "Partial", score: 50 },
] as const;

export const gaps = [
  { id: "G-01", req: "1 / 1.2.4", severity: "High", status: "PIP", observation: "CDE network and data-flow diagrams omit the CI/CD path and one store payment VLAN.", action: "Update diagrams and reconcile them to inventories and firewall rules." },
  { id: "G-02", req: "1", severity: "Medium", status: "PIP", observation: "Two firewall rules allow broad outbound internet access from the application subnet.", action: "Restrict destinations and ports to documented business needs." },
  { id: "G-03", req: "2 / 2.2", severity: "Medium", status: "PIP", observation: "Secure configuration standards are incomplete for Linux hosts, WAF and POS network devices.", action: "Approve hardening baselines and retain configuration-review evidence." },
  { id: "G-04", req: "3", severity: "Critical", status: "NIP", observation: "Sample debug logs contain unmasked PAN from failed checkout transactions.", action: "Stop PAN logging, securely remove retained data and validate masking controls." },
  { id: "G-05", req: "3", severity: "High", status: "PIP", observation: "Automated deletion and quarterly verification of account-data retention are absent.", action: "Implement retention jobs, exception reporting and quarterly deletion verification." },
  { id: "G-06", req: "4 / 4.2", severity: "Medium", status: "PIP", observation: "One legacy POS support connection permits an obsolete TLS configuration.", action: "Disable weak protocols and ciphers and retain endpoint retest evidence." },
  { id: "G-07", req: "5", severity: "High", status: "PIP", observation: "Anti-malware coverage and behavioral monitoring are inconsistent across CDE Linux and admin systems.", action: "Deploy centrally managed protection or documented risk-based controls." },
  { id: "G-08", req: "6 / 6.3.3", severity: "High", status: "NIP", observation: "Two critical web-platform security updates remained open for more than one month.", action: "Apply critical patches and enforce vulnerability-to-patch service levels." },
  { id: "G-09", req: "6", severity: "Medium", status: "PIP", observation: "Secure coding training is not recorded for all developers who change checkout code.", action: "Complete annual role-based training and retain competency evidence." },
  { id: "G-10", req: "6 / 6.4.3", severity: "High", status: "NIP", observation: "Payment-page scripts lack a complete inventory, authorization and integrity justification.", action: "Inventory, authorize and integrity-protect payment-page scripts." },
  { id: "G-11", req: "7 / 7.2.4", severity: "Medium", status: "PIP", observation: "Access reviews exclude service accounts and a third-party support account.", action: "Review all user, service and vendor access and confirm accountable owners." },
  { id: "G-12", req: "8 / 8.4.2", severity: "High", status: "NIP", observation: "MFA is not enforced for all non-console access into the CDE.", action: "Enforce MFA for all applicable CDE access and remove undocumented bypasses." },
  { id: "G-13", req: "9", severity: "Medium", status: "PIP", observation: "Visitor-log completeness and quarterly POS-device inspection evidence are inconsistent at one store.", action: "Standardize visitor records, device inventory and inspection evidence." },
  { id: "G-14", req: "10 / 10.4", severity: "High", status: "PIP", observation: "Application, identity and database security events are not consistently reviewed daily.", action: "Define critical log sources, SIEM use cases and daily review evidence." },
  { id: "G-15", req: "10", severity: "High", status: "NIP", observation: "Only 90 days of readily available audit logs are retained for two CDE systems.", action: "Implement required retention, alteration protection and retrieval testing." },
  { id: "G-16", req: "11", severity: "High", status: "NIP", observation: "External scans were performed by an internal scanner rather than an Approved Scanning Vendor.", action: "Engage an ASV, remediate failures and retain passing quarterly scans." },
  { id: "G-17", req: "11", severity: "Medium", status: "PIP", observation: "Penetration testing does not cover segmentation controls or the store payment network.", action: "Expand testing to CDE boundaries and segmentation and retest findings." },
  { id: "G-18", req: "11 / 11.6.1", severity: "High", status: "NIP", observation: "No automated mechanism detects unauthorized payment-page or security-header changes.", action: "Deploy change/tamper detection and test alert response." },
  { id: "G-19", req: "12 / 12.3.1", severity: "Medium", status: "NIP", observation: "Targeted risk analyses are missing for activities whose frequencies are entity-defined.", action: "Document threat, likelihood, impact and justified control frequencies." },
  { id: "G-20", req: "12", severity: "High", status: "PIP", observation: "The incident response plan has not been tested for payment-data compromise and third-party escalation.", action: "Run a tabletop exercise and track lessons to closure." },
] as const;

export const evidence = [
  { req: 1, theme: "Network security controls", owner: "Network Lead", readiness: "Partial", evidence: "Network/data-flow diagrams; firewall standards; rule exports; approvals; six-month reviews" },
  { req: 2, theme: "Secure configurations", owner: "Infrastructure Lead", readiness: "Partial", evidence: "Approved baselines; build records; configuration scans; change tickets; default-account review" },
  { req: 3, theme: "Stored account data", owner: "Data Owner", readiness: "Missing", evidence: "Data discovery; retention schedule; deletion logs; PAN masking tests; key-management records" },
  { req: 4, theme: "Transmission protection", owner: "Network Lead", readiness: "Partial", evidence: "TLS reports; certificates; endpoint scans; wireless and remote-access configuration" },
  { req: 5, theme: "Malware protection", owner: "Security Operations", readiness: "Partial", evidence: "Coverage inventory; console health; policy; alert samples; exclusion review" },
  { req: 6, theme: "Secure systems and software", owner: "Engineering Lead", readiness: "Partial", evidence: "Vulnerability reports; patch evidence; SDLC; code review; WAF; script inventory and approvals" },
  { req: 7, theme: "Business-need access", owner: "System Owners", readiness: "Partial", evidence: "Role matrix; access requests; approvals; service-account ownership; periodic access reviews" },
  { req: 8, theme: "Identification and authentication", owner: "IAM Lead", readiness: "Partial", evidence: "User inventory; MFA policy/logs; password settings; vendor access; lifecycle samples" },
  { req: 9, theme: "Physical access", owner: "Facilities / Retail Ops", readiness: "Partial", evidence: "Site access list; visitor logs; CCTV retention; POS inventory; device inspection records" },
  { req: 10, theme: "Logging and monitoring", owner: "Security Operations", readiness: "Missing", evidence: "Log-source inventory; SIEM rules; daily review tickets; time sync; retention and retrieval test" },
  { req: 11, theme: "Security testing", owner: "Security Manager", readiness: "Missing", evidence: "ASV reports; internal scans; penetration/segmentation tests; wireless scans; tamper alerts" },
  { req: 12, theme: "Security program", owner: "Compliance Lead", readiness: "Partial", evidence: "Policies; risk assessment; targeted risk analyses; TPSP AOCs; responsibility matrix; training; IR exercise" },
] as const;

export const risks = [
  { id: "R-01", scenario: "PAN exposure through application debug logs", likelihood: 5, impact: 5, score: 25, rating: "Critical", owner: "CISO / App Owner", target: 5 },
  { id: "R-02", scenario: "Unauthorized CDE access because MFA is incomplete", likelihood: 4, impact: 5, score: 20, rating: "Critical", owner: "IAM Lead", target: 8 },
  { id: "R-03", scenario: "E-skimming through unauthorized payment-page scripts", likelihood: 4, impact: 5, score: 20, rating: "Critical", owner: "Engineering Lead", target: 8 },
  { id: "R-04", scenario: "Exploitation of overdue critical vulnerabilities", likelihood: 4, impact: 5, score: 20, rating: "Critical", owner: "Infrastructure Lead", target: 5 },
  { id: "R-05", scenario: "Lateral movement through broad network access", likelihood: 3, impact: 5, score: 15, rating: "High", owner: "Network Lead", target: 6 },
  { id: "R-06", scenario: "Delayed detection because key logs are not reviewed", likelihood: 4, impact: 4, score: 16, rating: "High", owner: "SOC Lead", target: 8 },
  { id: "R-07", scenario: "Third-party control failure remains unidentified", likelihood: 3, impact: 4, score: 12, rating: "High", owner: "Compliance Lead", target: 6 },
  { id: "R-08", scenario: "POS device substitution or tampering", likelihood: 3, impact: 4, score: 12, rating: "High", owner: "Retail Ops", target: 4 },
  { id: "R-09", scenario: "Card data interception through weak transport settings", likelihood: 3, impact: 4, score: 12, rating: "High", owner: "Network Lead", target: 4 },
  { id: "R-10", scenario: "Ineffective response to a payment-data incident", likelihood: 3, impact: 5, score: 15, rating: "High", owner: "CISO", target: 6 },
] as const;

export const remediation = [
  { window: "0-7 days", action: "Contain PAN logging and securely remove prohibited data", mapping: "G-04 / R-01", owner: "CISO + App Owner", priority: "Critical", success: "Validated log samples show no PAN; deletion approval retained" },
  { window: "0-14 days", action: "Enforce MFA for all applicable CDE access", mapping: "G-12 / R-02", owner: "IAM Lead", priority: "High", success: "100% applicable accounts protected; authentication tests pass" },
  { window: "0-30 days", action: "Patch critical vulnerabilities and disable obsolete TLS", mapping: "G-06, G-08 / R-04, R-09", owner: "Infrastructure Lead", priority: "High", success: "Passing rescans; zero unapproved exceptions" },
  { window: "0-30 days", action: "Inventory payment-page scripts and deploy tamper monitoring", mapping: "G-10, G-18 / R-03", owner: "Engineering Lead", priority: "High", success: "All scripts justified; alerts tested; change workflow approved" },
  { window: "0-30 days", action: "Restrict broad CDE firewall access and update diagrams", mapping: "G-01, G-02 / R-05", owner: "Network Lead", priority: "High", success: "Approved rules; diagrams reconciled; connectivity tests pass" },
  { window: "31-60 days", action: "Complete malware coverage and centralize critical logging", mapping: "G-07, G-14, G-15 / R-06", owner: "SOC Lead", priority: "High", success: "100% coverage/log inventory; daily review tickets retained" },
  { window: "31-60 days", action: "Complete access recertification for users, services and vendors", mapping: "G-11 / R-02", owner: "System Owners", priority: "Medium", success: "All access approved or removed; exceptions have owner and expiry" },
  { window: "31-60 days", action: "Obtain TPSP AOCs and complete responsibility matrix", mapping: "G-20 / R-07", owner: "Compliance Lead", priority: "Medium", success: "Critical services mapped to current assurance and responsibilities" },
  { window: "31-90 days", action: "Run passing ASV scans and expanded penetration/segmentation tests", mapping: "G-16, G-17 / R-05", owner: "Security Manager", priority: "High", success: "Passing reports and verified closure of findings" },
  { window: "31-90 days", action: "Automate retention/deletion and verify POS inspections", mapping: "G-05, G-13 / R-08", owner: "Data Owner + Retail Ops", priority: "Medium", success: "Deletion and inspection evidence complete for review period" },
  { window: "61-90 days", action: "Complete targeted risk analyses, developer training and IR tabletop", mapping: "G-09, G-19, G-20 / R-10", owner: "Compliance Lead", priority: "High", success: "Approved analyses, training completion and lessons tracked to closure" },
  { window: "91-180 days", action: "Establish continuous control monitoring and quarterly readiness reporting", mapping: "All", owner: "CISO + Compliance", priority: "Medium", success: "Dashboard shows evidence freshness, exceptions, risk and remediation" },
] as const;

export const checkpoints = [
  { day: "Day 7", decision: "Has prohibited PAN logging stopped and affected data been handled through an approved process?", evidence: "Validated log samples, deletion approval and incident decision record" },
  { day: "Day 30", decision: "Are urgent identity, patching, transport, script and firewall gaps closed?", evidence: "Passing technical tests, approved rule changes and MFA coverage report" },
  { day: "Day 60", decision: "Are control owners producing repeatable access, logging, malware and third-party evidence?", evidence: "Evidence tracker, review tickets, coverage reports and current TPSP assurance" },
  { day: "Day 90", decision: "Have independent scans, penetration/segmentation tests and the IR exercise confirmed effectiveness?", evidence: "Passing ASV result, retest reports and approved exercise lessons" },
  { day: "Day 180", decision: "Is PCI readiness operating as a continuous governance process?", evidence: "Quarterly dashboard, exception register, risk acceptance and management review" },
] as const;

export const assessmentControls = [
  { ref: "1.2.4", family: 1, control: "Network and data-flow diagrams", applicability: "Applicable", procedure: "Inspect current diagrams and trace sampled payment flows", owner: "Network Lead", status: "Partial", evidence: "EV-001", assessor: "CI/CD path and Store 03 VLAN absent", finding: "High", due: "2026-09-15" },
  { ref: "1.3.1", family: 1, control: "Inbound CDE traffic restrictions", applicability: "Applicable", procedure: "Review firewall rules and test permitted connections", owner: "Network Lead", status: "Implemented", evidence: "EV-002", assessor: "Sampled inbound rules are justified", finding: "None", due: "-" },
  { ref: "2.2.1", family: 2, control: "Secure configuration standards", applicability: "Applicable", procedure: "Compare system builds to approved hardening baselines", owner: "Infrastructure Lead", status: "Partial", evidence: "EV-003", assessor: "WAF and POS baselines incomplete", finding: "Medium", due: "2026-10-01" },
  { ref: "2.2.2", family: 2, control: "Vendor defaults removed", applicability: "Applicable", procedure: "Inspect account and configuration samples", owner: "Infrastructure Lead", status: "Implemented", evidence: "EV-004", assessor: "No active vendor defaults identified", finding: "None", due: "-" },
  { ref: "3.2.1", family: 3, control: "Account-data retention minimized", applicability: "Applicable", procedure: "Inspect retention schedule, stores and deletion evidence", owner: "Data Owner", status: "Missing", evidence: "EV-005", assessor: "Automated deletion evidence unavailable", finding: "High", due: "2026-09-30" },
  { ref: "3.4.1", family: 3, control: "PAN rendered unreadable", applicability: "Applicable", procedure: "Sample databases, logs and displays for PAN protection", owner: "Application Owner", status: "Missing", evidence: "EV-006", assessor: "Unmasked PAN observed in debug logs", finding: "Critical", due: "2026-08-28" },
  { ref: "4.2.1", family: 4, control: "Strong cryptography in transit", applicability: "Applicable", procedure: "Inspect certificates and scan sampled endpoints", owner: "Network Lead", status: "Partial", evidence: "EV-007", assessor: "Legacy support endpoint needs remediation", finding: "Medium", due: "2026-09-15" },
  { ref: "4.2.2", family: 4, control: "PAN secured in messaging", applicability: "Not applicable", procedure: "Confirm PAN is prohibited in end-user messaging", owner: "Compliance Lead", status: "Verified N/A", evidence: "EV-008", assessor: "Policy and sample review support exclusion", finding: "None", due: "-" },
  { ref: "5.2.1", family: 5, control: "Anti-malware coverage", applicability: "Applicable", procedure: "Reconcile CDE inventory to protection console", owner: "SOC Lead", status: "Partial", evidence: "EV-009", assessor: "Two Linux workloads lack coverage decision", finding: "High", due: "2026-09-30" },
  { ref: "5.3.3", family: 5, control: "Anti-malware mechanisms active", applicability: "Applicable", procedure: "Inspect policy and attempted-disable alerts", owner: "SOC Lead", status: "Implemented", evidence: "EV-010", assessor: "Protection is centrally enforced", finding: "None", due: "-" },
  { ref: "6.3.3", family: 6, control: "Critical security patches", applicability: "Applicable", procedure: "Sample critical vulnerabilities and installation dates", owner: "Infrastructure Lead", status: "Missing", evidence: "EV-011", assessor: "Two critical patches exceeded one month", finding: "High", due: "2026-08-31" },
  { ref: "6.4.3", family: 6, control: "Payment-page script management", applicability: "Applicable", procedure: "Inspect inventory, authorization and integrity method", owner: "Engineering Lead", status: "Partial", evidence: "EV-012", assessor: "Two third-party scripts lack approval", finding: "High", due: "2026-09-10" },
  { ref: "7.2.4", family: 7, control: "Access assignment review", applicability: "Applicable", procedure: "Sample roles, approvals and least-privilege decisions", owner: "System Owners", status: "Partial", evidence: "EV-013", assessor: "Service accounts omitted from review", finding: "Medium", due: "2026-09-30" },
  { ref: "7.3.1", family: 7, control: "Access-control system enforcement", applicability: "Applicable", procedure: "Inspect RBAC configuration and denial tests", owner: "IAM Lead", status: "Implemented", evidence: "EV-014", assessor: "Role restrictions operated as expected", finding: "None", due: "-" },
  { ref: "8.4.2", family: 8, control: "MFA for CDE access", applicability: "Applicable", procedure: "Test console and non-console access paths", owner: "IAM Lead", status: "Missing", evidence: "EV-015", assessor: "Vendor path permits single-factor access", finding: "High", due: "2026-08-31" },
  { ref: "8.6.1", family: 8, control: "System-account governance", applicability: "Applicable", procedure: "Inspect ownership and interactive-use controls", owner: "IAM Lead", status: "Partial", evidence: "EV-016", assessor: "Two accounts lack named owners", finding: "Medium", due: "2026-09-30" },
  { ref: "9.5.1.2", family: 9, control: "POI device inspection", applicability: "Applicable", procedure: "Inspect device list, inspection records and training", owner: "Retail Operations", status: "Partial", evidence: "EV-017", assessor: "Store 03 missed quarterly inspection", finding: "Medium", due: "2026-09-15" },
  { ref: "9.4.1", family: 9, control: "Physical media controls", applicability: "Applicable", procedure: "Observe storage and inspect access records", owner: "Facilities Lead", status: "Implemented", evidence: "EV-018", assessor: "Sampled controls operating effectively", finding: "None", due: "-" },
  { ref: "10.4.1", family: 10, control: "Daily security-event review", applicability: "Applicable", procedure: "Sample daily review tickets and escalation records", owner: "SOC Lead", status: "Partial", evidence: "EV-019", assessor: "Database events not consistently reviewed", finding: "High", due: "2026-09-15" },
  { ref: "10.5.1", family: 10, control: "Audit-log retention", applicability: "Applicable", procedure: "Inspect retention settings and retrieval test", owner: "SOC Lead", status: "Missing", evidence: "EV-020", assessor: "Two systems retain only 90 days online", finding: "High", due: "2026-09-30" },
  { ref: "11.3.1", family: 11, control: "Internal vulnerability scans", applicability: "Applicable", procedure: "Inspect quarterly and post-change scans", owner: "Security Manager", status: "Partial", evidence: "EV-021", assessor: "Post-change rescan evidence incomplete", finding: "Medium", due: "2026-09-30" },
  { ref: "11.6.1", family: 11, control: "Payment-page change detection", applicability: "Applicable", procedure: "Inspect monitoring configuration and alert tests", owner: "Engineering Lead", status: "Missing", evidence: "EV-022", assessor: "Tamper-detection capability not deployed", finding: "High", due: "2026-09-10" },
  { ref: "12.3.1", family: 12, control: "Targeted risk analysis", applicability: "Applicable", procedure: "Inspect activity-frequency TRA records and approvals", owner: "Compliance Lead", status: "Partial", evidence: "EV-023", assessor: "Two frequency decisions await approval", finding: "Medium", due: "2026-09-30" },
  { ref: "12.8.5", family: 12, control: "TPSP responsibility mapping", applicability: "Applicable", procedure: "Inspect AOCs and responsibility matrices", owner: "Vendor Risk Lead", status: "Partial", evidence: "EV-024", assessor: "One provider matrix is incomplete", finding: "High", due: "2026-09-15" },
] as const;

export const targetedRiskAnalyses = [
  { id: "TRA-01", requirement: "12.3.1 / 10.4.2.1", decision: "Weekly review of lower-risk system logs", threat: "Malicious activity remains undetected between reviews", likelihood: 3, impact: 4, controls: "SIEM correlation, 24/7 critical alerts and weekly documented review", residual: 6, approval: "Approved", reviewer: "CISO", reviewDate: "2027-03-31" },
  { id: "TRA-02", requirement: "12.3.1 / 11.3.1.1", decision: "Monthly authenticated internal scans", threat: "Vulnerabilities persist between scans", likelihood: 3, impact: 5, controls: "Continuous agent telemetry plus monthly authenticated scans", residual: 6, approval: "Pending", reviewer: "Security Manager", reviewDate: "2026-09-30" },
  { id: "TRA-03", requirement: "12.3.1 / 5.2.3.1", decision: "Quarterly evaluation of low-risk systems", threat: "A system becomes malware-susceptible after evaluation", likelihood: 2, impact: 3, controls: "Threat intelligence review, EDR telemetry and change-triggered reassessment", residual: 4, approval: "Approved", reviewer: "Risk Committee", reviewDate: "2027-06-30" },
  { id: "TRA-04", requirement: "Customized approach / 8.3.6", decision: "Passwordless privileged authentication", threat: "Authentication control fails to provide equivalent protection", likelihood: 2, impact: 5, controls: "Phishing-resistant FIDO2, device trust, conditional access and session monitoring", residual: 5, approval: "Draft", reviewer: "QSA consultation required", reviewDate: "2026-10-15" },
] as const;

export const evidenceLifecycle = [
  { id: "EV-001", requirement: "1.2.4", description: "Approved CDE network and data-flow diagrams", owner: "Network Lead", collected: "2026-08-15", expires: "2027-02-15", freshness: "Current", review: "Changes requested", version: "v2.1", hash: "8e42…91af" },
  { id: "EV-006", requirement: "3.4.1", description: "PAN masking and log-sampling test results", owner: "Application Owner", collected: "2026-08-20", expires: "2026-11-20", freshness: "Current", review: "Rejected", version: "v1.0", hash: "b139…72ce" },
  { id: "EV-012", requirement: "6.4.3", description: "Payment-page script inventory and approvals", owner: "Engineering Lead", collected: "2026-07-01", expires: "2026-10-01", freshness: "Due soon", review: "Partial", version: "v1.4", hash: "61d7…a0c2" },
  { id: "EV-015", requirement: "8.4.2", description: "MFA coverage export and access-path tests", owner: "IAM Lead", collected: "2026-06-30", expires: "2026-09-30", freshness: "Due soon", review: "Partial", version: "v3.0", hash: "9c20…41b8" },
  { id: "EV-019", requirement: "10.4.1", description: "Daily security-event review tickets", owner: "SOC Lead", collected: "2026-08-21", expires: "2026-09-21", freshness: "Current", review: "Approved", version: "v1.8", hash: "34fa…c772" },
  { id: "EV-020", requirement: "10.5.1", description: "Log-retention configuration and retrieval test", owner: "SOC Lead", collected: "2026-03-31", expires: "2026-06-30", freshness: "Expired", review: "Missing", version: "v0.9", hash: "-" },
  { id: "EV-022", requirement: "11.6.1", description: "Payment-page tamper-alert test", owner: "Engineering Lead", collected: "Not collected", expires: "-", freshness: "Missing", review: "Missing", version: "-", hash: "-" },
  { id: "EV-024", requirement: "12.8.5", description: "TPSP AOCs and responsibility matrices", owner: "Vendor Risk Lead", collected: "2026-08-01", expires: "2027-07-31", freshness: "Current", review: "Changes requested", version: "v2.0", hash: "f091…54de" },
] as const;

export const paymentScripts = [
  { id: "SCR-01", name: "Hosted checkout iframe", source: "PayWave Ghana", purpose: "Card-data capture", owner: "Payments Lead", authorization: "Approved", integrity: "Provider-hosted iframe + CSP", headers: "CSP frame-src allowlist", monitoring: "15-minute change detection", result: "Pass" },
  { id: "SCR-02", name: "fraud-device.js", source: "FraudShield", purpose: "Device-risk telemetry", owner: "Fraud Lead", authorization: "Approved", integrity: "SRI hash pinned", headers: "CSP script-src hash", monitoring: "Deployment diff + browser monitor", result: "Pass" },
  { id: "SCR-03", name: "analytics.js", source: "Metrics Cloud", purpose: "Checkout analytics", owner: "Digital Lead", authorization: "Pending", integrity: "No SRI", headers: "CSP domain allowlist", monitoring: "Daily inventory comparison", result: "Fail" },
  { id: "SCR-04", name: "chat-widget.js", source: "SupportNow", purpose: "Customer assistance", owner: "Customer Service", authorization: "Rejected", integrity: "Not established", headers: "Blocked on payment route", monitoring: "CSP violation alerts", result: "Removed" },
  { id: "SCR-05", name: "consent-manager.js", source: "PrivacyHub", purpose: "Cookie consent", owner: "Privacy Lead", authorization: "Approved", integrity: "Version-pinned URL", headers: "CSP nonce", monitoring: "Release webhook + integrity check", result: "Pass" },
  { id: "SCR-06", name: "checkout-app.js", source: "Akwaaba Engineering", purpose: "Checkout orchestration", owner: "Engineering Lead", authorization: "Approved", integrity: "Signed release + CSP hash", headers: "CSP nonce; HSTS; no-sniff", monitoring: "CI/CD attestation + tamper alert", result: "Pass" },
] as const;

export const thirdPartyProviders = [
  { id: "TPSP-01", provider: "PayWave Ghana", service: "Hosted payment gateway", scope: "Req. 3, 4, 6, 8, 10, 11, 12", responsibility: "Shared", aoc: "Current", assessment: "2026-06-30", renewal: "2027-06-30", contract: "PCI status notification within 10 days", monitoring: "Quarterly", contingency: "Switch to approved secondary gateway", status: "Low" },
  { id: "TPSP-02", provider: "CloudHarbour Africa", service: "CDE cloud hosting", scope: "Req. 1-12 shared controls", responsibility: "Shared matrix v3.2", aoc: "Current", assessment: "2026-04-15", renewal: "2027-04-15", contract: "Incident notice within 24 hours", monitoring: "Monthly", contingency: "Cross-region recovery and export runbook", status: "Medium" },
  { id: "TPSP-03", provider: "FraudShield", service: "Fraud detection scripts", scope: "Req. 6.4.3 and 11.6.1", responsibility: "Provider script; merchant authorization", aoc: "Current", assessment: "2026-02-28", renewal: "2027-02-28", contract: "Secure change notification", monitoring: "Quarterly", contingency: "Disable script without blocking checkout", status: "Low" },
  { id: "TPSP-04", provider: "RetailTech Support", service: "Remote POS maintenance", scope: "Req. 7, 8, 10 and 12", responsibility: "Remote access shared", aoc: "Expiring", assessment: "2025-10-01", renewal: "2026-10-01", contract: "MFA and session logging required", monitoring: "Monthly", contingency: "Suspend account; internal break-fix team", status: "High" },
  { id: "TPSP-05", provider: "SecureScan ASV", service: "External vulnerability scanning", scope: "Req. 11.3.2", responsibility: "ASV performs; merchant remediates", aoc: "N/A - ASV listing checked", assessment: "2026-08-01", renewal: "2027-08-01", contract: "Quarterly scan and rescan SLA", monitoring: "Quarterly", contingency: "Alternate approved ASV", status: "Low" },
] as const;
