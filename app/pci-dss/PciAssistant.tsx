"use client";

import { FormEvent, useState } from "react";
import "./assistant.css";
import "./assistant-fix.css";

type Message = { from: "assistant" | "user"; text: string };

const quickPrompts = ["What is PCI DSS?", "Explain the readiness score", "What evidence is missing?", "How do connector simulations work?"];

function answerQuestion(input: string) {
  const question = input.toLowerCase();
  if (/acronym|meaning|aoc|cde|mfa|qsa|roc|tpsp/.test(question)) return "Key terms: AOC means Attestation of Compliance; CDE means Cardholder Data Environment; MFA means Multi-Factor Authentication; QSA means Qualified Security Assessor; ROC means Report on Compliance; TPSP means Third-Party Service Provider. Each downloadable document also has its own expanded acronym glossary.";
  if (/readiness|score|percentage/.test(question)) return "The readiness score is a portfolio index calculated from the evidence-readiness percentages across all 12 PCI DSS requirement families. It demonstrates assessment reporting and is not a formal compliance determination.";
  if (/missing|expired|evidence/.test(question)) return "The evidence workspace highlights current, due-soon, expired and missing items. Priority examples include log-retention configuration, payment-page tamper-alert testing, MFA coverage and payment-script approvals. Use the Evidence Lifecycle filters to review them.";
  if (/connector|sync|sharepoint|onedrive|servicenow|jira|aws/.test(question)) return "All five connector simulations are active. Select Run test sync on SharePoint, OneDrive, ServiceNow GRC, Jira or AWS Security Hub; the card will confirm a simulated sync. No external account or real evidence is accessed.";
  if (/risk|heat.?map/.test(question)) return "The risk heat map plots likelihood × impact. Critical scenarios include prohibited PAN exposure, weak authentication, payment-page script compromise and overdue critical vulnerabilities. Each risk also shows its owner and residual-risk target.";
  if (/role|access|rbac|permission/.test(question)) return "The RBAC demonstration includes Program Administrator, Compliance Manager, Control Owner, Independent Assessor and Executive Viewer roles. Role switching changes the displayed permission set, while connector test simulations remain available to every visitor.";
  if (/reminder|notification|due/.test(question)) return "Reminder simulations cover evidence expiry, remediation deadlines, targeted risk-analysis reviews and third-party assurance renewals. Running the cycle demonstrates queued notifications without sending real messages.";
  if (/export|csv|pdf|download/.test(question)) return "Use Controls CSV, Evidence CSV or Export audit CSV for structured downloads. Select Print / save PDF to open the browser print layout and save the dashboard as a PDF.";
  if (/pci dss|what is pci/.test(question)) return "PCI DSS is the Payment Card Industry Data Security Standard. It defines security requirements for organizations that store, process or transmit payment-card account data. This dashboard demonstrates a fictional merchant readiness assessment against PCI DSS v4.0.1.";
  if (/help|what can/.test(question)) return "I can explain PCI DSS terms, the readiness score, evidence status, risks, role permissions, reminders, exports, connector simulations and where to find each dashboard workspace.";
  return "I can help with this PCI DSS portfolio dashboard. Try asking about readiness, evidence, risks, acronyms, roles, reminders, exports or connector simulations.";
}

export default function PciAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ from: "assistant", text: "Hello. I’m the PCI DSS Portfolio Assistant. Ask me about this fictional assessment, its evidence, risks, controls or dashboard features." }]);

  const ask = (question: string) => {
    const cleaned = question.trim();
    if (!cleaned) return;
    setMessages((current) => [...current, { from: "user", text: cleaned }, { from: "assistant", text: answerQuestion(cleaned) }]);
    setInput("");
  };

  const submit = (event: FormEvent) => { event.preventDefault(); ask(input); };

  return <div className={`pci-assistant ${open ? "open" : ""}`}>
    {open && <section className="assistant-panel" role="dialog" aria-label="PCI DSS Portfolio Assistant">
      <header><div><span>AI ASSISTANT</span><strong>PCI DSS Portfolio Guide</strong></div><button onClick={() => setOpen(false)} aria-label="Close assistant">×</button></header>
      <div className="assistant-notice">Built-in portfolio knowledge · no dashboard data leaves this page</div>
      <div className="assistant-messages" aria-live="polite">{messages.map((message, index) => <div className={message.from} key={`${message.from}-${index}`}>{message.text}</div>)}</div>
      <div className="assistant-prompts">{quickPrompts.map((prompt) => <button key={prompt} onClick={() => ask(prompt)}>{prompt}</button>)}</div>
      <form onSubmit={submit}><label className="sr-only" htmlFor="assistant-question">Ask a PCI DSS question</label><input id="assistant-question" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about evidence, risks or controls…" maxLength={240}/><button type="submit">Send</button></form>
      <small>Portfolio guidance only. Not a compliance determination or QSA opinion.</small>
    </section>}
    <button className="assistant-launcher" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-label={open ? "Minimize PCI DSS assistant" : "Open PCI DSS assistant"}><span>AI</span>{open ? "Minimize assistant" : "Ask PCI Assistant"}</button>
  </div>;
}
