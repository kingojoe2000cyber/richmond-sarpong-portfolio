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
