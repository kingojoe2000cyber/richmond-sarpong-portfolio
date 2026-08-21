(() => {
  const controls = [
    ["1.2.7","1","Network security configuration reviews","Compare firewall standards, rules and six-month review records.","Network Security","Implemented","Approved rule-set and review minutes","No open finding"],
    ["2.2.1","2","Secure configuration standards","Sample system builds against approved hardening baselines.","Infrastructure","Partial","Baseline and exception register","Close two expired exceptions"],
    ["3.5.1","3","Stored account-data protection","Inspect encryption, key custody and retention controls.","Data Protection","Implemented","KMS report and retention schedule","No open finding"],
    ["4.2.1","4","Strong cryptography in transit","Validate TLS configuration and certificate inventory.","Platform Engineering","Implemented","TLS scan and certificate register","No open finding"],
    ["5.3.2","5","Malware prevention","Sample endpoint coverage and alert-response records.","Security Operations","Partial","EDR console export","Add two legacy hosts"],
    ["6.4.3","6","Payment-page script management","Reconcile authorized inventory with production scripts.","Application Security","Partial","Script inventory and CSP report","Remove unauthorized tag"],
    ["7.2.5","7","Access review","Sample role assignment and quarterly recertification.","Identity & Access","Implemented","Access review export","No open finding"],
    ["8.4.2","8","Multi-factor authentication","Test MFA enforcement for CDE access paths.","Identity & Access","Implemented","Policy and authentication logs","No open finding"],
    ["9.4.1","9","Media controls","Inspect storage, transport and destruction records.","Facilities","Missing","Destruction log","Formalize media log"],
    ["10.4.1","10","Security event review","Trace critical events through triage and escalation.","Security Operations","Partial","SIEM review report","Document weekend coverage"],
    ["11.6.1","11","Change-and-tamper detection","Verify payment-page header and script monitoring.","Application Security","Partial","Tamper alerts and test results","Tune false positives"],
    ["12.8.5","12","Third-party responsibility","Review agreements, AOCs and responsibility matrix.","GRC","Implemented","TPSP register and AOCs","No open finding"]
  ].map(([ref,family,control,procedure,owner,status,evidence,finding]) => ({ref,family,control,procedure,owner,status,evidence,finding}));
  const tras = [
    {id:"TRA-01",title:"Malware scan frequency",ref:"5.2.3.1",owner:"Security Operations",frequency:"Weekly authenticated scan",rationale:"Threat exposure and change volume",approval:"Approved",review:"2026-12-15"},
    {id:"TRA-02",title:"Critical log review",ref:"10.4.2.1",owner:"SOC Manager",frequency:"Daily with weekend escalation",rationale:"CDE criticality and alert density",approval:"Approved",review:"2026-11-30"},
    {id:"TRA-03",title:"POI inspection frequency",ref:"9.5.1.2.1",owner:"Retail Operations",frequency:"Before each staffed shift",rationale:"Device exposure and site access",approval:"Pending",review:"2026-09-30"},
    {id:"TRA-04",title:"Tokenization control design",ref:"Customized approach",owner:"Security Architecture",frequency:"Continuous control plus quarterly test",rationale:"Equivalent protection for account data",approval:"Draft",review:"2026-10-31"}
  ];
  const evidence = [
    ["EV-001","Firewall review pack","1.2.7","Network Security","2026-07-15","2027-01-15","Current","v3 · SHA-256"],
    ["EV-002","Hardening exception register","2.2.1","Infrastructure","2026-05-01","2026-09-01","Due Soon","v5 · SHA-256"],
    ["EV-003","Key-custodian acknowledgement","3.6.1","Data Protection","2026-06-20","2027-06-20","Current","v2 · SHA-256"],
    ["EV-004","Endpoint coverage export","5.3.2","Security Operations","2026-08-01","2026-09-01","Current","v7 · SHA-256"],
    ["EV-005","Payment script authorization","6.4.3","Application Security","2026-04-10","2026-07-10","Expired","v4 · SHA-256"],
    ["EV-006","Quarterly access review","7.2.5","Identity & Access","2026-07-31","2026-10-31","Current","v3 · SHA-256"],
    ["EV-007","CDE alert review sample","10.4.1","Security Operations","2026-08-18","2026-09-18","Current","v9 · SHA-256"],
    ["EV-008","TPSP AOC register","12.8.5","GRC","2026-06-30","2026-09-30","Due Soon","v6 · SHA-256"]
  ].map(([id,name,ref,owner,collected,due,freshness,integrity]) => ({id,name,ref,owner,collected,due,freshness,integrity}));
  const scripts = [
    ["SCR-01","Hosted payment fields","Payment processor","Payment capture","Authorized","SRI + CSP","Pass"],
    ["SCR-02","Consent manager","Privacy platform","Consent controls","Authorized","CSP allowlist","Pass"],
    ["SCR-03","Fraud telemetry","Fraud provider","Risk signals","Authorized","Nonce + CSP","Pass"],
    ["SCR-04","Analytics tag","Analytics vendor","Journey metrics","Review","CSP report-only","Fail"],
    ["SCR-05","Support widget","Service platform","Customer support","Authorized","CSP allowlist","Pass"],
    ["SCR-06","Legacy marketing tag","Unknown","Campaign tracking","Removed","Blocked","Removed"]
  ].map(([id,name,source,purpose,authorization,integrity,result]) => ({id,name,source,purpose,authorization,integrity,result}));
  const providers = [
    ["TPSP-01","Payment gateway","Payment processing","Shared matrix approved","AOC current","Quarterly","Low"],
    ["TPSP-02","Cloud hosting","CDE infrastructure","Shared matrix approved","AOC current","Monthly","Medium"],
    ["TPSP-03","Managed SOC","Log monitoring","Contract mapped","AOC current","Monthly","Low"],
    ["TPSP-04","Support platform","Customer support","Scope review open","AOC due","Quarterly","High"],
    ["TPSP-05","Backup provider","Encrypted recovery","Shared matrix approved","AOC current","Semiannual","Medium"]
  ].map(([id,name,scope,responsibility,aoc,monitoring,risk]) => ({id,name,scope,responsibility,aoc,monitoring,risk}));
  const esc = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const slug = value => value.toLowerCase().replaceAll(" ","-").replaceAll("/","-");
  function renderControls(){
    const family=document.querySelector("#controlFamily").value,status=document.querySelector("#controlStatus").value;
    const rows=controls.filter(c=>(family==="All"||c.family===family)&&(status==="All"||c.status===status));
    const counts={Implemented:0,Partial:0,Missing:0}; controls.forEach(c=>counts[c.status]++);
    document.querySelector("#assessmentStats").innerHTML=`<article><strong>${controls.length}</strong><span>controls tracked</span></article><article><strong>${counts.Implemented}</strong><span>implemented</span></article><article><strong>${counts.Partial}</strong><span>partial</span></article><article><strong>${counts.Missing}</strong><span>missing</span></article>`;
    document.querySelector("#controlBody").innerHTML=rows.map(c=>`<tr><td><b>${esc(c.ref)}</b><small>Family ${c.family}</small></td><td>${esc(c.control)}</td><td>${esc(c.procedure)}</td><td>${esc(c.owner)}</td><td><span class="v3-status ${slug(c.status)}">${c.status}</span></td><td>${esc(c.evidence)}</td><td>${esc(c.finding)}</td></tr>`).join("");
  }
  function renderEvidence(filter="All"){
    const rows=evidence.filter(e=>filter==="All"||e.freshness===filter); const counts={Current:0,"Due Soon":0,Expired:0}; evidence.forEach(e=>counts[e.freshness]++);
    document.querySelector("#evidenceHealth").innerHTML=`<div><strong>${evidence.length}</strong><span>evidence objects</span></div><div><strong>${counts.Current}</strong><span>current</span></div><div><strong>${counts["Due Soon"]}</strong><span>due soon</span></div><div><strong>${counts.Expired}</strong><span>expired</span></div>`;
    document.querySelector("#lifecycleBody").innerHTML=rows.map(e=>`<tr><td><b>${e.id}</b><small>${esc(e.name)}</small></td><td>${e.ref}</td><td>${esc(e.owner)}</td><td>${e.collected}</td><td>${e.due}</td><td><span class="freshness ${slug(e.freshness)}">${e.freshness}</span></td><td>${esc(e.integrity)}</td></tr>`).join("");
  }
  document.querySelector("#controlFamily").insertAdjacentHTML("beforeend",Array.from({length:12},(_,i)=>`<option value="${i+1}">Requirement ${i+1}</option>`).join(""));
  document.querySelector("#controlFamily").addEventListener("change",renderControls); document.querySelector("#controlStatus").addEventListener("change",renderControls); renderControls();
  document.querySelector("#traGrid").innerHTML=tras.map(t=>`<article class="tra-card"><div><span>${t.id}</span><b class="approval ${slug(t.approval)}">${t.approval}</b></div><h3>${esc(t.title)}</h3><p class="tra-ref">PCI DSS ${esc(t.ref)}</p><dl><div><dt>Owner</dt><dd>${esc(t.owner)}</dd></div><div><dt>Frequency</dt><dd>${esc(t.frequency)}</dd></div><div><dt>Rationale</dt><dd>${esc(t.rationale)}</dd></div><div><dt>Next review</dt><dd>${t.review}</dd></div></dl></article>`).join("");
  document.querySelectorAll("#freshnessFilters button").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll("#freshnessFilters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderEvidence(b.dataset.filter)})); renderEvidence();
  const passing=scripts.filter(s=>s.result==="Pass").length; document.querySelector("#scriptScore").innerHTML=`<strong>${passing}/${scripts.length}</strong><span>scripts passing control checks</span>`;
  document.querySelector("#scriptGrid").innerHTML=scripts.map(s=>`<article class="script-card ${slug(s.result)}"><div><span>${s.id}</span><b>${s.result}</b></div><h3>${esc(s.name)}</h3><p>${esc(s.purpose)}</p><dl><div><dt>Source</dt><dd>${esc(s.source)}</dd></div><div><dt>Authorization</dt><dd>${esc(s.authorization)}</dd></div><div><dt>Integrity</dt><dd>${esc(s.integrity)}</dd></div></dl></article>`).join("");
  document.querySelector("#tpspGrid").innerHTML=providers.map(p=>`<article class="tpsp-card"><div class="tpsp-head"><span>${p.id}</span><b class="risk-band ${slug(p.risk)}">${p.risk} risk</b></div><h3>${esc(p.name)}</h3><p>${esc(p.scope)}</p><dl><div><dt>Responsibility</dt><dd>${esc(p.responsibility)}</dd></div><div><dt>Assurance</dt><dd>${esc(p.aoc)}</dd></div><div><dt>Monitoring</dt><dd>${esc(p.monitoring)}</dd></div></dl></article>`).join("");
})();
