"use client";

import { useMemo, useState } from "react";
import { assessmentControls, checkpoints, evidence, evidenceLifecycle, gaps, paymentScripts, remediation, requirementReadiness, risks, targetedRiskAnalyses, thirdPartyProviders } from "./data";
import "./pci-dss.css";
import "./evidence-pack.css";
import "./acronyms.css";
import "./v3.css";

const severityOrder: Record<string, number> = { Critical: 4, High: 3, Medium: 2, Low: 1 };

const evidencePackDocuments = [
  { no: "01", title: "Executive Readiness Report", copy: "Management-level summary of scope, readiness result, priority exposures, governance expectations and immediate actions.", file: "PCI_DSS_V2_Executive_Report.pdf", acronyms: [["AOC", "Attestation of Compliance"], ["CDE", "Cardholder Data Environment"], ["MFA", "Multi-Factor Authentication"], ["PCI DSS", "Payment Card Industry Data Security Standard"], ["QSA", "Qualified Security Assessor"], ["ROC", "Report on Compliance"]] },
  { no: "02", title: "PCI DSS Scope Register", copy: "Defined CDE, connected-to systems, reduced-scope assets, owners, third-party dependencies and card-data flow context.", file: "PCI_DSS_V2_Scope_Register.pdf", acronyms: [["CDE", "Cardholder Data Environment"], ["CHD", "Cardholder Data"], ["P2PE", "Point-to-Point Encryption"], ["PAN", "Primary Account Number"], ["POS", "Point of Sale"], ["SAD", "Sensitive Authentication Data"], ["TPSP", "Third-Party Service Provider"]] },
  { no: "03", title: "PCI DSS Gap Assessment", copy: "Twenty representative simulated findings mapped to requirement references, readiness status, severity and recommended action.", file: "PCI_DSS_V2_Gap_Assessment.pdf", acronyms: [["ASV", "Approved Scanning Vendor"], ["MFA", "Multi-Factor Authentication"], ["NTP", "Network Time Protocol"], ["POA&M", "Plan of Action and Milestones"], ["RBAC", "Role-Based Access Control"], ["SAQ", "Self-Assessment Questionnaire"]] },
  { no: "04", title: "PCI DSS Evidence Matrix", copy: "Audit-ready evidence expectations, accountable owners and readiness status across all twelve PCI DSS requirement families.", file: "PCI_DSS_V2_Evidence_Matrix.pdf", acronyms: [["ASV", "Approved Scanning Vendor"], ["CDE", "Cardholder Data Environment"], ["NTP", "Network Time Protocol"], ["RACI", "Responsible, Accountable, Consulted and Informed"], ["SIEM", "Security Information and Event Management"], ["TPSP", "Third-Party Service Provider"]] },
  { no: "05", title: "PCI DSS Risk Register", copy: "Prioritized payment-security risks with likelihood, impact, inherent score, accountable owner and residual target.", file: "PCI_DSS_V2_Risk_Register.pdf", acronyms: [["CDE", "Cardholder Data Environment"], ["MFA", "Multi-Factor Authentication"], ["PAN", "Primary Account Number"], ["RTO", "Recovery Time Objective"], ["SPOF", "Single Point of Failure"], ["TSP", "Third-Party Service Provider"]] },
  { no: "06", title: "PCI DSS Remediation Plan", copy: "A structured 180-day treatment roadmap with owners, priorities, mapped findings, closure evidence and executive checkpoints.", file: "PCI_DSS_V2_Remediation_Plan.pdf", acronyms: [["ASV", "Approved Scanning Vendor"], ["MFA", "Multi-Factor Authentication"], ["POA&M", "Plan of Action and Milestones"], ["RACI", "Responsible, Accountable, Consulted and Informed"], ["SIEM", "Security Information and Event Management"], ["SLA", "Service-Level Agreement"]] },
] as const;

export default function PciDssDashboard() {
  const [severity, setSeverity] = useState("All");
  const [evidenceFilter, setEvidenceFilter] = useState("All");
  const [assessmentFamily, setAssessmentFamily] = useState("All");
  const [assessmentStatus, setAssessmentStatus] = useState("All");
  const [lifecycleFilter, setLifecycleFilter] = useState("All");

  const filteredGaps = useMemo(() => {
    if (severity === "All") return gaps;
    return gaps.filter((gap) => gap.severity === severity);
  }, [severity]);

  const filteredEvidence = useMemo(() => {
    if (evidenceFilter === "All") return evidence;
    return evidence.filter((item) => item.readiness === evidenceFilter);
  }, [evidenceFilter]);

  const filteredControls = useMemo(() => assessmentControls.filter((item) =>
    (assessmentFamily === "All" || item.family === Number(assessmentFamily)) &&
    (assessmentStatus === "All" || item.status === assessmentStatus),
  ), [assessmentFamily, assessmentStatus]);

  const filteredLifecycle = useMemo(() => lifecycleFilter === "All"
    ? evidenceLifecycle
    : evidenceLifecycle.filter((item) => item.freshness === lifecycleFilter), [lifecycleFilter]);

  const readinessScore = Math.round(
    requirementReadiness.reduce((sum, item) => sum + item.score, 0) / requirementReadiness.length,
  );

  const missingEvidence = evidence.filter((item) => item.readiness === "Missing").length;
  const criticalRiskCount = risks.filter((risk) => risk.rating === "Critical").length;
  const highRiskCount = risks.filter((risk) => risk.rating === "High").length;

  return (
    <main className="pci-page">
      <section className="pci-hero">
        <div className="pci-shell pci-hero-grid">
          <div>
            <p className="pci-kicker">PCI DSS v4.0.1 · Advanced Version 3</p>
            <h1>Merchant Assurance Command Center</h1>
            <p className="pci-lead">
              Interactive portfolio dashboard for Akwaaba Retail &amp; Online Ltd. (fictional), translating PCI scope,
              requirement testing, targeted risk analysis, evidence lifecycle, payment-page security, third-party assurance,
              control gaps and remediation into an executive view.
            </p>
            <div className="pci-hero-actions">
              <a className="pci-btn primary" href="#scorecard">Open scorecard</a>
              <a className="pci-btn ghost" href="#v3-workspaces">Explore V3 modules</a>
              <a className="pci-btn ghost pack-action" href="#evidence-pack">Download evidence pack</a>
              <a className="pci-btn ghost" href="../">Back to portfolio</a>
              <a
                className="pci-btn ghost"
                href="https://github.com/kingojoe2000cyber/richmond-sarpong-portfolio"
                target="_blank"
                rel="noreferrer"
              >
                View GitHub ↗
              </a>
            </div>
          </div>
          <aside className="pci-disclaimer">
            <span>Portfolio disclaimer</span>
            <strong>Independent fictional readiness assessment</strong>
            <p>
              This dashboard is not a Report on Compliance, Attestation of Compliance, QSA assessment or evidence of a
              real merchant engagement. All operational data shown here is simulated for portfolio demonstration.
            </p>
          </aside>
        </div>
      </section>

      <section className="pci-shell pci-summary" aria-label="Assessment summary">
        <article><span>Readiness score</span><strong>{readinessScore}%</strong><small>Evidence-based portfolio index</small></article>
        <article><span>Representative gaps</span><strong>20</strong><small>1 Critical · 11 High · 8 Medium</small></article>
        <article><span>Risk register</span><strong>10</strong><small>{criticalRiskCount} Critical · {highRiskCount} High</small></article>
        <article><span>Missing evidence areas</span><strong>{missingEvidence}</strong><small>Requirements 3, 10 and 11</small></article>
        <article><span>Remediation horizon</span><strong>180d</strong><small>Five executive checkpoints</small></article>
      </section>

      <nav className="pci-shell v3-module-nav" id="v3-workspaces" aria-label="Version 3 workspaces">
        <span>V3 WORKSPACES</span>
        <a href="#assessment-workspace">Requirement testing</a>
        <a href="#targeted-risk-analysis">Targeted risk analysis</a>
        <a href="#evidence-lifecycle">Evidence lifecycle</a>
        <a href="#script-security">Script security</a>
        <a href="#third-party-governance">Third-party governance</a>
      </nav>

      <section className="evidence-pack-section" id="evidence-pack">
        <div className="pci-shell">
          <div className="evidence-pack-header">
            <div>
              <p className="pci-kicker">PROFESSIONAL PCI DSS EVIDENCE PACK</p>
              <h2>Audit-ready documentation recruiters can inspect and download</h2>
              <p>
                Six professional portfolio documents demonstrate how the assessment moves from executive reporting and scoping
                through gap analysis, evidence planning, risk treatment and accountable remediation.
              </p>
            </div>
            <aside className="evidence-pack-bundle">
              <span>Complete bundle</span>
              <strong>Download all six documents</strong>
              <a className="pci-btn" href="./evidence-pack/Richmond_Sarpong_PCI_DSS_V2_Evidence_Pack.zip" download>
                Download ZIP ↓
              </a>
            </aside>
          </div>

          <div className="evidence-doc-grid">
            {evidencePackDocuments.map((doc) => (
              <article className="evidence-doc" key={doc.no}>
                <span className="doc-no">DOCUMENT {doc.no}</span>
                <h3>{doc.title}</h3>
                <p>{doc.copy}</p>
                <a href={`./evidence-pack/${doc.file}`} target="_blank" rel="noreferrer">Open / download PDF ↗</a>
                <details className="doc-glossary">
                  <summary>Acronyms and full meanings</summary>
                  <dl>{doc.acronyms.map(([term, meaning]) => <div key={term}><dt>{term}</dt><dd>{meaning}</dd></div>)}</dl>
                  <small>The PDF includes an expanded glossary with plain-language explanations.</small>
                </details>
              </article>
            ))}
          </div>

          <div className="evidence-pack-note">
            <strong>Portfolio integrity note:</strong> These files support the fictional Akwaaba Retail &amp; Online Ltd. case study.
            They are not a ROC, AOC, QSA assessment or evidence of services delivered to a real merchant.
          </div>
        </div>
      </section>

      <section className="pci-section pci-shell" id="scorecard">
        <div className="pci-heading">
          <div><p>01 / COMPLIANCE SCORECARD</p><h2>Readiness across all 12 requirement families</h2></div>
          <div className="pci-score-ring" style={{ "--score": `${readinessScore * 3.6}deg` } as React.CSSProperties}>
            <span>{readinessScore}%</span><small>portfolio readiness</small>
          </div>
        </div>
        <div className="requirement-grid">
          {requirementReadiness.map((item) => (
            <article key={item.id} className={`requirement-card ${item.status.toLowerCase()}`}>
              <div><span>REQ {item.id}</span><b>{item.status}</b></div>
              <h3>{item.title}</h3>
              <div className="progress"><i style={{ width: `${item.score}%` }} /></div>
              <small>{item.score}% evidence readiness</small>
            </article>
          ))}
        </div>
      </section>

      <section className="pci-section pci-soft" id="assessment-workspace">
        <div className="pci-shell">
          <div className="pci-heading">
            <div><p>02 / REQUIREMENT-LEVEL ASSESSMENT</p><h2>Control testing across all 12 requirement families</h2><span className="v3-caption">24 representative sub-requirements · testing procedures · evidence · assessor conclusions</span></div>
            <div className="assessment-filter-stack">
              <label>Requirement family<select value={assessmentFamily} onChange={(event) => setAssessmentFamily(event.target.value)}><option>All</option>{requirementReadiness.map((item) => <option key={item.id} value={item.id}>Requirement {item.id}</option>)}</select></label>
              <label>Implementation<select value={assessmentStatus} onChange={(event) => setAssessmentStatus(event.target.value)}><option>All</option><option>Implemented</option><option>Partial</option><option>Missing</option><option>Verified N/A</option></select></label>
            </div>
          </div>
          <div className="assessment-stats">
            <article><strong>{assessmentControls.length}</strong><span>controls tested</span></article>
            <article><strong>{assessmentControls.filter((item) => item.status === "Implemented" || item.status === "Verified N/A").length}</strong><span>effective / verified</span></article>
            <article><strong>{assessmentControls.filter((item) => item.finding === "Critical" || item.finding === "High").length}</strong><span>priority findings</span></article>
            <article><strong>{assessmentControls.filter((item) => item.due !== "-").length}</strong><span>actions tracked</span></article>
          </div>
          <div className="v3-table-wrap">
            <table className="v3-table assessment-table">
              <thead><tr><th>Requirement</th><th>Control and applicability</th><th>Testing procedure</th><th>Owner</th><th>Status</th><th>Evidence</th><th>Assessor note</th><th>Finding / due</th></tr></thead>
              <tbody>{filteredControls.map((item) => <tr key={item.ref}><td><b>{item.ref}</b><small>Family {item.family}</small></td><td><strong>{item.control}</strong><small>{item.applicability}</small></td><td>{item.procedure}</td><td>{item.owner}</td><td><span className={`v3-status ${item.status.toLowerCase().replaceAll(" ", "-")}`}>{item.status}</span></td><td><a href="#evidence-lifecycle">{item.evidence}</a></td><td>{item.assessor}</td><td><span className={`pill ${item.finding.toLowerCase()}`}>{item.finding}</span><small>{item.due === "-" ? "No action" : `Due ${item.due}`}</small></td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="pci-section pci-ink" id="targeted-risk-analysis">
        <div className="pci-shell">
          <div className="pci-heading inverse"><div><p>03 / TARGETED RISK ANALYSIS</p><h2>Frequency decisions and customized controls</h2><span className="v3-caption inverse">Threat-led analysis with residual risk, approval and review accountability</span></div></div>
          <div className="tra-grid">{targetedRiskAnalyses.map((item) => <article key={item.id} className="tra-card"><div><span>{item.id}</span><b className={`approval ${item.approval.toLowerCase()}`}>{item.approval}</b></div><h3>{item.decision}</h3><p className="tra-ref">Requirement {item.requirement}</p><dl><div><dt>Threat</dt><dd>{item.threat}</dd></div><div><dt>Control design</dt><dd>{item.controls}</dd></div><div><dt>Risk analysis</dt><dd>Likelihood {item.likelihood} × Impact {item.impact} · Residual score {item.residual}</dd></div><div><dt>Governance</dt><dd>{item.reviewer} · Review {item.reviewDate}</dd></div></dl></article>)}</div>
        </div>
      </section>

      <section className="pci-section pci-shell" id="evidence-lifecycle">
        <div className="pci-heading"><div><p>04 / EVIDENCE LIFECYCLE MANAGEMENT</p><h2>Fresh, attributable and reviewable audit evidence</h2><span className="v3-caption">Collection · expiry · review decision · version · SHA-256 traceability</span></div><div className="filter-group" aria-label="Evidence freshness filters">{["All", "Current", "Due soon", "Expired", "Missing"].map((option) => <button key={option} onClick={() => setLifecycleFilter(option)} className={lifecycleFilter === option ? "active" : ""}>{option}</button>)}</div></div>
        <div className="evidence-health"><div><strong>{evidenceLifecycle.filter((item) => item.freshness === "Current").length}</strong><span>Current</span></div><div><strong>{evidenceLifecycle.filter((item) => item.freshness === "Due soon").length}</strong><span>Due soon</span></div><div><strong>{evidenceLifecycle.filter((item) => item.freshness === "Expired").length}</strong><span>Expired</span></div><div><strong>{evidenceLifecycle.filter((item) => item.freshness === "Missing").length}</strong><span>Missing</span></div></div>
        <div className="v3-table-wrap"><table className="v3-table"><thead><tr><th>Evidence</th><th>Requirement</th><th>Description</th><th>Owner</th><th>Collected / expires</th><th>Freshness</th><th>Review</th><th>Version / SHA-256</th></tr></thead><tbody>{filteredLifecycle.map((item) => <tr key={item.id}><td><b>{item.id}</b></td><td>{item.requirement}</td><td>{item.description}</td><td>{item.owner}</td><td>{item.collected}<small>{item.expires === "-" ? "No expiry" : `Expires ${item.expires}`}</small></td><td><span className={`freshness ${item.freshness.toLowerCase().replace(" ", "-")}`}>{item.freshness}</span></td><td>{item.review}</td><td><b>{item.version}</b><small>{item.hash}</small></td></tr>)}</tbody></table></div>
      </section>

      <section className="pci-section pci-soft" id="script-security">
        <div className="pci-shell"><div className="pci-heading"><div><p>05 / E-COMMERCE SCRIPT SECURITY</p><h2>Payment-page authorization, integrity and tamper monitoring</h2><span className="v3-caption">PCI DSS 6.4.3 and 11.6.1 control register</span></div><div className="script-score"><strong>{paymentScripts.filter((item) => item.result === "Pass").length}/{paymentScripts.length}</strong><span>scripts passing</span></div></div>
          <div className="script-grid">{paymentScripts.map((item) => <article key={item.id} className={`script-card ${item.result.toLowerCase()}`}><div><span>{item.id}</span><b>{item.result}</b></div><h3>{item.name}</h3><p>{item.source} · {item.purpose}</p><dl><div><dt>Owner</dt><dd>{item.owner}</dd></div><div><dt>Authorization</dt><dd>{item.authorization}</dd></div><div><dt>Integrity</dt><dd>{item.integrity}</dd></div><div><dt>HTTP headers</dt><dd>{item.headers}</dd></div><div><dt>Monitoring</dt><dd>{item.monitoring}</dd></div></dl></article>)}</div>
        </div>
      </section>

      <section className="pci-section pci-shell" id="third-party-governance">
        <div className="pci-heading"><div><p>06 / THIRD-PARTY SERVICE PROVIDER GOVERNANCE</p><h2>Shared responsibility, assurance and contingency</h2><span className="v3-caption">AOC status · contractual duties · monitoring · exit readiness</span></div></div>
        <div className="tpsp-grid">{thirdPartyProviders.map((item) => <article className="tpsp-card" key={item.id}><div className="tpsp-head"><span>{item.id}</span><b className={`risk-band ${item.status.toLowerCase()}`}>{item.status} risk</b></div><h3>{item.provider}</h3><p>{item.service}</p><dl><div><dt>PCI scope</dt><dd>{item.scope}</dd></div><div><dt>Responsibility</dt><dd>{item.responsibility}</dd></div><div><dt>Assurance</dt><dd>{item.aoc} · assessed {item.assessment}</dd></div><div><dt>Renewal</dt><dd>{item.renewal}</dd></div><div><dt>Contract</dt><dd>{item.contract}</dd></div><div><dt>Monitoring</dt><dd>{item.monitoring}</dd></div><div><dt>Contingency</dt><dd>{item.contingency}</dd></div></dl></article>)}</div>
      </section>

      <section className="pci-section pci-ink" id="risk-heatmap">
        <div className="pci-shell">
          <div className="pci-heading inverse">
            <div><p>07 / RISK HEAT MAP</p><h2>Inherent PCI risk concentration</h2></div>
            <p className="pci-subcopy">Likelihood × impact. Hover or focus on a risk card to review ownership and residual target.</p>
          </div>
          <div className="heatmap-layout">
            <div className="heatmap" aria-label="5 by 5 risk heat map">
              {[5,4,3,2,1].map((impact) =>
                [1,2,3,4,5].map((likelihood) => {
                  const cellRisks = risks.filter((risk) => risk.impact === impact && risk.likelihood === likelihood);
                  const score = likelihood * impact;
                  const band = score >= 20 ? "critical" : score >= 12 ? "high" : score >= 6 ? "medium" : "low";
                  return (
                    <div className={`heat-cell ${band}`} key={`${impact}-${likelihood}`}>
                      <span>{score}</span>
                      <div>{cellRisks.map((risk) => <b key={risk.id} title={risk.scenario}>{risk.id}</b>)}</div>
                    </div>
                  );
                }),
              )}
              <div className="heat-axis x">Likelihood →</div>
              <div className="heat-axis y">Impact →</div>
            </div>
            <div className="risk-list">
              {[...risks].sort((a,b) => severityOrder[b.rating] - severityOrder[a.rating] || b.score - a.score).map((risk) => (
                <article key={risk.id}>
                  <div><b>{risk.id}</b><span className={`pill ${risk.rating.toLowerCase()}`}>{risk.rating} · {risk.score}</span></div>
                  <h3>{risk.scenario}</h3>
                  <p>{risk.owner} · residual target {risk.target}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pci-section pci-shell" id="evidence">
        <div className="pci-heading">
          <div><p>08 / EVIDENCE EXPECTATION MATRIX</p><h2>What an independent reviewer would expect to see</h2></div>
          <div className="filter-group" aria-label="Evidence filters">
            {["All", "Partial", "Missing"].map((option) => (
              <button key={option} onClick={() => setEvidenceFilter(option)} className={evidenceFilter === option ? "active" : ""}>{option}</button>
            ))}
          </div>
        </div>
        <div className="evidence-table-wrap">
          <table className="evidence-table">
            <thead><tr><th>Req.</th><th>Control theme</th><th>Expected evidence</th><th>Owner</th><th>Readiness</th></tr></thead>
            <tbody>
              {filteredEvidence.map((item) => (
                <tr key={item.req}>
                  <td><b>{item.req}</b></td><td>{item.theme}</td><td>{item.evidence}</td><td>{item.owner}</td>
                  <td><span className={`pill ${item.readiness.toLowerCase()}`}>{item.readiness}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="pci-section pci-soft" id="gaps">
        <div className="pci-shell">
          <div className="pci-heading">
            <div><p>09 / GAP REGISTER</p><h2>Representative control gaps and recommended action</h2></div>
            <div className="filter-group" aria-label="Gap severity filters">
              {["All", "Critical", "High", "Medium"].map((option) => (
                <button key={option} onClick={() => setSeverity(option)} className={severity === option ? "active" : ""}>{option}</button>
              ))}
            </div>
          </div>
          <div className="gap-grid">
            {filteredGaps.map((gap) => (
              <article className="gap-card" key={gap.id}>
                <div className="gap-meta"><b>{gap.id}</b><span>Req. {gap.req}</span><span className={`pill ${gap.severity.toLowerCase()}`}>{gap.severity}</span><em>{gap.status}</em></div>
                <h3>{gap.observation}</h3>
                <p><strong>Recommended action:</strong> {gap.action}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pci-section pci-shell" id="remediation">
        <div className="pci-heading"><div><p>10 / REMEDIATION ROADMAP</p><h2>Prioritized 180-day closure plan</h2></div></div>
        <div className="roadmap">
          {remediation.map((item) => (
            <article key={`${item.window}-${item.action}`}>
              <div className="roadmap-time"><strong>{item.window}</strong><span className={`pill ${item.priority.toLowerCase()}`}>{item.priority}</span></div>
              <div><h3>{item.action}</h3><p>{item.mapping} · {item.owner}</p><small>Closure evidence: {item.success}</small></div>
            </article>
          ))}
        </div>
      </section>

      <section className="pci-section pci-ink" id="governance">
        <div className="pci-shell">
          <div className="pci-heading inverse"><div><p>11 / EXECUTIVE GOVERNANCE</p><h2>Decision gates that prove the program is maturing</h2></div></div>
          <div className="checkpoint-grid">
            {checkpoints.map((checkpoint) => (
              <article key={checkpoint.day}><span>{checkpoint.day}</span><h3>{checkpoint.decision}</h3><p>{checkpoint.evidence}</p></article>
            ))}
          </div>
          <div className="closure-note">
            <b>Closure principle</b>
            <p>Remediation is complete only when the control is implemented, independently checked, technically retested where applicable and supported by durable, attributable evidence.</p>
          </div>
        </div>
      </section>

      <footer className="pci-footer">
        <div className="pci-shell"><span>© 2026 Richmond Kwadwo Sarpong · PCI DSS v4.0.1 Portfolio V3</span><a href="#scorecard">Back to scorecard ↑</a></div>
      </footer>
    </main>
  );
}
