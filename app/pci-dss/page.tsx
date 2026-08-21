"use client";

import { useMemo, useState } from "react";
import { checkpoints, evidence, gaps, remediation, requirementReadiness, risks } from "./data";
import "./pci-dss.css";
import "./evidence-pack.css";

const severityOrder: Record<string, number> = { Critical: 4, High: 3, Medium: 2, Low: 1 };

const evidencePackDocuments = [
  { no: "01", title: "Executive Readiness Report", copy: "Management-level summary of scope, readiness result, priority exposures, governance expectations and immediate actions.", file: "PCI_DSS_V2_Executive_Report.pdf" },
  { no: "02", title: "PCI DSS Scope Register", copy: "Defined CDE, connected-to systems, reduced-scope assets, owners, third-party dependencies and card-data flow context.", file: "PCI_DSS_V2_Scope_Register.pdf" },
  { no: "03", title: "PCI DSS Gap Assessment", copy: "Twenty representative simulated findings mapped to requirement references, readiness status, severity and recommended action.", file: "PCI_DSS_V2_Gap_Assessment.pdf" },
  { no: "04", title: "PCI DSS Evidence Matrix", copy: "Audit-ready evidence expectations, accountable owners and readiness status across all twelve PCI DSS requirement families.", file: "PCI_DSS_V2_Evidence_Matrix.pdf" },
  { no: "05", title: "PCI DSS Risk Register", copy: "Prioritized payment-security risks with likelihood, impact, inherent score, accountable owner and residual target.", file: "PCI_DSS_V2_Risk_Register.pdf" },
  { no: "06", title: "PCI DSS Remediation Plan", copy: "A structured 180-day treatment roadmap with owners, priorities, mapped findings, closure evidence and executive checkpoints.", file: "PCI_DSS_V2_Remediation_Plan.pdf" },
] as const;

export default function PciDssDashboard() {
  const [severity, setSeverity] = useState("All");
  const [evidenceFilter, setEvidenceFilter] = useState("All");

  const filteredGaps = useMemo(() => {
    if (severity === "All") return gaps;
    return gaps.filter((gap) => gap.severity === severity);
  }, [severity]);

  const filteredEvidence = useMemo(() => {
    if (evidenceFilter === "All") return evidence;
    return evidence.filter((item) => item.readiness === evidenceFilter);
  }, [evidenceFilter]);

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
            <p className="pci-kicker">PCI DSS v4.0.1 · Version 2</p>
            <h1>Merchant Readiness Command Center</h1>
            <p className="pci-lead">
              Interactive portfolio dashboard for Akwaaba Retail &amp; Online Ltd. (fictional), translating PCI scope,
              control gaps, evidence readiness, risk and remediation into an executive view.
            </p>
            <div className="pci-hero-actions">
              <a className="pci-btn primary" href="#scorecard">Open scorecard</a>
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

      <section className="pci-section pci-ink" id="risk-heatmap">
        <div className="pci-shell">
          <div className="pci-heading inverse">
            <div><p>02 / RISK HEAT MAP</p><h2>Inherent PCI risk concentration</h2></div>
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
          <div><p>03 / EVIDENCE TRACKER</p><h2>What an independent reviewer would expect to see</h2></div>
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
            <div><p>04 / GAP REGISTER</p><h2>Representative control gaps and recommended action</h2></div>
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
        <div className="pci-heading"><div><p>05 / REMEDIATION ROADMAP</p><h2>Prioritized 180-day closure plan</h2></div></div>
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
          <div className="pci-heading inverse"><div><p>06 / EXECUTIVE GOVERNANCE</p><h2>Decision gates that prove the program is maturing</h2></div></div>
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
        <div className="pci-shell"><span>© 2026 Richmond Kwadwo Sarpong · PCI DSS v4.0.1 Portfolio V2</span><a href="#scorecard">Back to scorecard ↑</a></div>
      </footer>
    </main>
  );
}
