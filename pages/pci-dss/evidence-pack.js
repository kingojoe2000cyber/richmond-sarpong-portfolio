const evidenceBundleFiles = [
  ['PCI_DSS_V2_Executive_Report.pdf','evidence-pack/PCI_DSS_V2_Executive_Report.pdf'],
  ['PCI_DSS_V2_Scope_Register.pdf','evidence-pack/PCI_DSS_V2_Scope_Register.pdf'],
  ['PCI_DSS_V2_Gap_Assessment.pdf','evidence-pack/PCI_DSS_V2_Gap_Assessment.pdf'],
  ['PCI_DSS_V2_Evidence_Matrix.pdf','evidence-pack/PCI_DSS_V2_Evidence_Matrix.pdf'],
  ['PCI_DSS_V2_Risk_Register.pdf','evidence-pack/PCI_DSS_V2_Risk_Register.pdf'],
  ['PCI_DSS_V2_Remediation_Plan.pdf','evidence-pack/PCI_DSS_V2_Remediation_Plan.pdf'],
  ['MANIFEST.txt','evidence-pack/MANIFEST.txt']
];

const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const b of bytes) crc = crcTable[(crc ^ b) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function write16(view, offset, value) { view.setUint16(offset, value, true); }
function write32(view, offset, value) { view.setUint32(offset, value >>> 0, true); }

async function buildEvidenceZip() {
  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const [name, path] of evidenceBundleFiles) {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Unable to fetch ${name}`);
    const data = new Uint8Array(await response.arrayBuffer());
    const nameBytes = encoder.encode(name);
    const crc = crc32(data);

    const local = new Uint8Array(30 + nameBytes.length);
    const lv = new DataView(local.buffer);
    write32(lv, 0, 0x04034b50);
    write16(lv, 4, 20);
    write16(lv, 6, 0);
    write16(lv, 8, 0);
    write16(lv, 10, 0);
    write16(lv, 12, 0);
    write32(lv, 14, crc);
    write32(lv, 18, data.length);
    write32(lv, 22, data.length);
    write16(lv, 26, nameBytes.length);
    write16(lv, 28, 0);
    local.set(nameBytes, 30);
    localParts.push(local, data);

    const central = new Uint8Array(46 + nameBytes.length);
    const cv = new DataView(central.buffer);
    write32(cv, 0, 0x02014b50);
    write16(cv, 4, 20);
    write16(cv, 6, 20);
    write16(cv, 8, 0);
    write16(cv, 10, 0);
    write16(cv, 12, 0);
    write16(cv, 14, 0);
    write32(cv, 16, crc);
    write32(cv, 20, data.length);
    write32(cv, 24, data.length);
    write16(cv, 28, nameBytes.length);
    write16(cv, 30, 0);
    write16(cv, 32, 0);
    write16(cv, 34, 0);
    write16(cv, 36, 0);
    write32(cv, 38, 0);
    write32(cv, 42, offset);
    central.set(nameBytes, 46);
    centralParts.push(central);

    offset += local.length + data.length;
  }

  const centralOffset = offset;
  const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
  const end = new Uint8Array(22);
  const ev = new DataView(end.buffer);
  write32(ev, 0, 0x06054b50);
  write16(ev, 4, 0);
  write16(ev, 6, 0);
  write16(ev, 8, evidenceBundleFiles.length);
  write16(ev, 10, evidenceBundleFiles.length);
  write32(ev, 12, centralSize);
  write32(ev, 16, centralOffset);
  write16(ev, 20, 0);

  return new Blob([...localParts, ...centralParts, end], { type: 'application/zip' });
}

async function downloadEvidenceBundle(event) {
  event.preventDefault();
  const buttons = [...document.querySelectorAll('.evidence-bundle-download')];
  const original = buttons.map(button => button.textContent);
  buttons.forEach(button => { button.textContent = 'Preparing evidence pack…'; button.setAttribute('aria-disabled','true'); });
  try {
    const blob = await buildEvidenceZip();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Richmond_Sarpong_PCI_DSS_V2_Evidence_Pack.zip';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  } catch (error) {
    console.error(error);
    alert('The complete ZIP could not be prepared. Please use the individual PDF download links below.');
  } finally {
    buttons.forEach((button, i) => { button.textContent = original[i]; button.removeAttribute('aria-disabled'); });
  }
}

document.querySelectorAll('.evidence-bundle-download').forEach(button => button.addEventListener('click', downloadEvidenceBundle));
