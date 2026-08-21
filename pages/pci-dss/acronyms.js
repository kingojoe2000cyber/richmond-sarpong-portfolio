const documentAcronyms = [
  [['AOC','Attestation of Compliance'],['CDE','Cardholder Data Environment'],['MFA','Multi-Factor Authentication'],['PCI DSS','Payment Card Industry Data Security Standard'],['QSA','Qualified Security Assessor'],['ROC','Report on Compliance']],
  [['CDE','Cardholder Data Environment'],['CHD','Cardholder Data'],['P2PE','Point-to-Point Encryption'],['PAN','Primary Account Number'],['POS','Point of Sale'],['SAD','Sensitive Authentication Data'],['TPSP','Third-Party Service Provider']],
  [['ASV','Approved Scanning Vendor'],['MFA','Multi-Factor Authentication'],['NTP','Network Time Protocol'],['POA&M','Plan of Action and Milestones'],['RBAC','Role-Based Access Control'],['SAQ','Self-Assessment Questionnaire']],
  [['ASV','Approved Scanning Vendor'],['CDE','Cardholder Data Environment'],['NTP','Network Time Protocol'],['RACI','Responsible, Accountable, Consulted and Informed'],['SIEM','Security Information and Event Management'],['TPSP','Third-Party Service Provider']],
  [['CDE','Cardholder Data Environment'],['MFA','Multi-Factor Authentication'],['PAN','Primary Account Number'],['RTO','Recovery Time Objective'],['SPOF','Single Point of Failure'],['TSP','Third-Party Service Provider']],
  [['ASV','Approved Scanning Vendor'],['MFA','Multi-Factor Authentication'],['POA&M','Plan of Action and Milestones'],['RACI','Responsible, Accountable, Consulted and Informed'],['SIEM','Security Information and Event Management'],['SLA','Service-Level Agreement']]
];

if (typeof document !== 'undefined') {
  document.querySelectorAll('.evidence-doc').forEach((card, index) => {
    const details = document.createElement('details');
    details.className = 'doc-glossary';
    const rows = documentAcronyms[index].map(([term, meaning]) => `<div><dt>${term}</dt><dd>${meaning}</dd></div>`).join('');
    details.innerHTML = `<summary>Acronyms and full meanings</summary><dl>${rows}</dl><small>The PDF includes an expanded glossary with plain-language explanations.</small>`;
    card.appendChild(details);
  });
}
