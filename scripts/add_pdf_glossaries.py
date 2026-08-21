#!/usr/bin/env python3
"""Append document-specific acronym glossaries to the PCI DSS evidence PDFs."""

from io import BytesIO
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile
import hashlib

from pypdf import PdfReader, PdfWriter
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


PACK = Path(__file__).resolve().parents[1] / "public" / "pci-dss" / "evidence-pack"

COMMON = {
    "AOC": ("Attestation of Compliance", "A formal declaration that applicable PCI DSS requirements have been assessed."),
    "CDE": ("Cardholder Data Environment", "The people, processes and technologies that store, process or transmit cardholder data, or can affect its security."),
    "CHD": ("Cardholder Data", "At minimum, the primary account number; it may also include the cardholder name, expiration date or service code."),
    "PCI DSS": ("Payment Card Industry Data Security Standard", "The global security standard for protecting payment account data."),
    "QSA": ("Qualified Security Assessor", "A PCI SSC-qualified organization or individual that performs PCI DSS assessments."),
    "ROC": ("Report on Compliance", "A detailed report documenting the results of a PCI DSS assessment."),
    "SAQ": ("Self-Assessment Questionnaire", "A validation tool for eligible entities to document PCI DSS self-assessment results."),
    "TPSP": ("Third-Party Service Provider", "An external provider whose services store, process, transmit or can affect the security of account data."),
}

DOCS = {
    "PCI_DSS_V2_Executive_Report.pdf": {
        **COMMON,
        "ASV": ("Approved Scanning Vendor", "A company approved by the PCI SSC to perform external vulnerability scanning services."),
        "MFA": ("Multi-Factor Authentication", "Authentication using at least two different factor types before access is granted."),
        "PAN": ("Primary Account Number", "The payment card number that identifies the issuer and cardholder account."),
        "PCI SSC": ("Payment Card Industry Security Standards Council", "The body that maintains PCI security standards and supporting programs."),
        "RACI": ("Responsible, Accountable, Consulted and Informed", "A matrix used to clarify roles and decision ownership."),
    },
    "PCI_DSS_V2_Scope_Register.pdf": {
        **COMMON,
        "DMZ": ("Demilitarized Zone", "A segmented network area that separates externally accessible services from internal systems."),
        "PAN": ("Primary Account Number", "The payment card number that identifies the issuer and cardholder account."),
        "P2PE": ("Point-to-Point Encryption", "A PCI-validated solution that encrypts payment data from the point of interaction to the secure decryption environment."),
        "POS": ("Point of Sale", "The system or device used to accept and process customer payments."),
        "SAD": ("Sensitive Authentication Data", "Security-related data used to authenticate cardholders or authorize transactions; storage is restricted after authorization."),
        "VLAN": ("Virtual Local Area Network", "A logical network segment used to separate systems and traffic."),
    },
    "PCI_DSS_V2_Gap_Assessment.pdf": {
        **COMMON,
        "ASV": ("Approved Scanning Vendor", "A company approved by the PCI SSC to perform external vulnerability scanning services."),
        "MFA": ("Multi-Factor Authentication", "Authentication using at least two different factor types before access is granted."),
        "NTP": ("Network Time Protocol", "A protocol used to synchronize system clocks for reliable logs and investigations."),
        "PAN": ("Primary Account Number", "The payment card number that identifies the issuer and cardholder account."),
        "POA&M": ("Plan of Action and Milestones", "A tracked plan describing corrective actions, ownership, deadlines and closure evidence."),
        "RBAC": ("Role-Based Access Control", "Access permissions assigned according to approved job roles and responsibilities."),
    },
    "PCI_DSS_V2_Evidence_Matrix.pdf": {
        **COMMON,
        "ASV": ("Approved Scanning Vendor", "A company approved by the PCI SSC to perform external vulnerability scanning services."),
        "MFA": ("Multi-Factor Authentication", "Authentication using at least two different factor types before access is granted."),
        "NTP": ("Network Time Protocol", "A protocol used to synchronize system clocks for reliable logs and investigations."),
        "PAN": ("Primary Account Number", "The payment card number that identifies the issuer and cardholder account."),
        "RACI": ("Responsible, Accountable, Consulted and Informed", "A matrix used to clarify roles and decision ownership."),
        "SIEM": ("Security Information and Event Management", "Technology that centralizes and analyzes security logs and alerts."),
    },
    "PCI_DSS_V2_Risk_Register.pdf": {
        **COMMON,
        "MFA": ("Multi-Factor Authentication", "Authentication using at least two different factor types before access is granted."),
        "PAN": ("Primary Account Number", "The payment card number that identifies the issuer and cardholder account."),
        "RTO": ("Recovery Time Objective", "The target time for restoring a service after disruption."),
        "SPOF": ("Single Point of Failure", "A component whose failure could interrupt an entire service or control process."),
        "TSP": ("Third-Party Service Provider", "An external organization providing a service that may affect the security of payment account data."),
    },
    "PCI_DSS_V2_Remediation_Plan.pdf": {
        **COMMON,
        "ASV": ("Approved Scanning Vendor", "A company approved by the PCI SSC to perform external vulnerability scanning services."),
        "MFA": ("Multi-Factor Authentication", "Authentication using at least two different factor types before access is granted."),
        "POA&M": ("Plan of Action and Milestones", "A tracked plan describing corrective actions, ownership, deadlines and closure evidence."),
        "RACI": ("Responsible, Accountable, Consulted and Informed", "A matrix used to clarify roles and decision ownership."),
        "SIEM": ("Security Information and Event Management", "Technology that centralizes and analyzes security logs and alerts."),
        "SLA": ("Service-Level Agreement", "A documented commitment defining service performance, responsibilities and response expectations."),
    },
}


def glossary_pdf(entries: dict[str, tuple[str, str]], title: str) -> bytes:
    buffer = BytesIO()
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle("GlossaryTitle", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=22, leading=27, textColor=colors.HexColor("#0B2740"), alignment=TA_CENTER, spaceAfter=8)
    intro_style = ParagraphStyle("Intro", parent=styles["BodyText"], fontSize=9.5, leading=14, textColor=colors.HexColor("#526675"), alignment=TA_CENTER, spaceAfter=14)
    cell = ParagraphStyle("Cell", parent=styles["BodyText"], fontSize=8.6, leading=11.5, textColor=colors.HexColor("#203544"))
    acronym = ParagraphStyle("Acronym", parent=cell, fontName="Helvetica-Bold", textColor=colors.HexColor("#007F9B"))
    doc = SimpleDocTemplate(buffer, pagesize=A4, rightMargin=17*mm, leftMargin=17*mm, topMargin=17*mm, bottomMargin=17*mm, title=f"{title} - Acronyms and Definitions", author="Richmond Kwadwo Sarpong")
    story = [Paragraph("Acronyms and Definitions", title_style), Paragraph(f"Document-specific reference glossary for <b>{title}</b>. Definitions are written in plain language for recruiters, reviewers and non-specialist readers.", intro_style), Spacer(1, 3*mm)]
    rows = [[Paragraph("Acronym", acronym), Paragraph("Full meaning and explanation", acronym)]]
    for key, (meaning, explanation) in sorted(entries.items()):
        rows.append([Paragraph(key, acronym), Paragraph(f"<b>{meaning}</b><br/>{explanation}", cell)])
    table = Table(rows, colWidths=[36*mm, 125*mm], repeatRows=1, hAlign="CENTER")
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#DDF4F8")),
        ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#B9CED9")),
        ("INNERGRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#D7E3E9")),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F7FAFC")]),
    ]))
    story.extend([table, Spacer(1, 7*mm), Paragraph("Portfolio note: This glossary supports a fictional PCI DSS v4.0.1 readiness case study and does not represent a formal compliance determination.", cell)])
    doc.build(story)
    return buffer.getvalue()


def append_glossary(path: Path, entries: dict[str, tuple[str, str]]) -> None:
    reader = PdfReader(path)
    # Idempotency: replace a previously appended glossary instead of duplicating it.
    keep = len(reader.pages)
    for index, page in enumerate(reader.pages):
        if "Acronyms and Definitions" in (page.extract_text() or ""):
            keep = index
            break
    glossary = PdfReader(BytesIO(glossary_pdf(entries, path.stem.replace("PCI_DSS_V2_", "").replace("_", " "))))
    writer = PdfWriter()
    for page in list(reader.pages)[:keep]:
        writer.add_page(page)
    for page in glossary.pages:
        writer.add_page(page)
    writer.add_metadata({"/Title": reader.metadata.title or path.stem, "/Author": "Richmond Kwadwo Sarpong", "/Subject": "PCI DSS v4.0.1 fictional portfolio evidence with acronym glossary"})
    temp = path.with_suffix(".tmp.pdf")
    with temp.open("wb") as stream:
        writer.write(stream)
    temp.replace(path)


def rebuild_bundle() -> None:
    readme = PACK / "README.txt"
    lines = [
        "RICHMOND KWADWO SARPONG - PCI DSS v4.0.1 EVIDENCE PACK V2",
        "",
        "Each PDF includes a document-specific Acronyms and Definitions section.",
        "All content supports the fictional Akwaaba Retail & Online Ltd. portfolio case study.",
        "",
        "FILES",
    ]
    for name in DOCS:
        lines.append(f"- {name}")
    readme.write_text("\n".join(lines) + "\n", encoding="utf-8")

    manifest = PACK / "MANIFEST.txt"
    manifest_lines = ["PCI DSS v4.0.1 Evidence Pack V2 - SHA-256 Manifest", ""]
    for name in DOCS:
        digest = hashlib.sha256((PACK / name).read_bytes()).hexdigest()
        manifest_lines.append(f"{digest}  {name}")
    digest = hashlib.sha256(readme.read_bytes()).hexdigest()
    manifest_lines.append(f"{digest}  README.txt")
    manifest.write_text("\n".join(manifest_lines) + "\n", encoding="utf-8")

    bundle = PACK / "Richmond_Sarpong_PCI_DSS_V2_Evidence_Pack.zip"
    with ZipFile(bundle, "w", ZIP_DEFLATED) as archive:
        for name in [*DOCS, "README.txt", "MANIFEST.txt"]:
            archive.write(PACK / name, arcname=name)


if __name__ == "__main__":
    for filename, entries in DOCS.items():
        append_glossary(PACK / filename, entries)
    rebuild_bundle()
    print(f"Updated {len(DOCS)} PDFs and rebuilt the evidence bundle.")
