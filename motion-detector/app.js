const $ = (id) => document.getElementById(id);
const video = $("video");
const analysisCanvas = $("analysisCanvas");
const analysisCtx = analysisCanvas.getContext("2d", { willReadFrequently: true });
const overlay = $("overlay");
const overlayCtx = overlay.getContext("2d");
const startBtn = $("startBtn");
const stopBtn = $("stopBtn");
const snapshotBtn = $("snapshotBtn");
const testBtn = $("testBtn");
const saveEvidenceBtn = $("saveEvidenceBtn");
const clearSnapshotsBtn = $("clearSnapshotsBtn");
const clearSnapshotsSideBtn = $("clearSnapshotsSideBtn");
const clearEvidenceBtn = $("clearEvidenceBtn");
const cameraSelect = $("cameraSelect");
const alarmToggle = $("alarmToggle");
const autoSnapshotToggle = $("autoSnapshotToggle");
const longRangeToggle = $("longRangeToggle");
const sensitivity = $("sensitivity");
const sensitivityValue = $("sensitivityValue");

let stream = null, previousFrame = null, animationId = null;
let lastMotionAt = 0, lastEventAt = 0, lastSnapshotAt = 0;
let eventCount = 0, snapshotCount = 0;
let audioContext = null, alarmOscillator = null, evidenceDb = null;

const MODES = {
  standard: { width: 192, height: 144, pixelDiff: 27, minBlobPixels: 14, baseTrigger: 0.018 },
  long: { width: 352, height: 264, pixelDiff: 16, minBlobPixels: 5, baseTrigger: 0.0055 }
};

sensitivity.addEventListener("input", () => { sensitivityValue.value = sensitivity.value; updateCalibrationBar(); });
longRangeToggle.addEventListener("change", () => {
  $("modeText").textContent = longRangeToggle.checked ? "Long Range" : "Standard";
  $("rangeHelp").textContent = longRangeToggle.checked ? "Long Range mode active — optimized for smaller/distant changes." : "Standard mode is active.";
  previousFrame = null; updateCalibrationBar();
});
cameraSelect.addEventListener("change", async () => { if (stream) { await stopCamera(false); await startCamera(); } });
startBtn.addEventListener("click", startCamera);
stopBtn.addEventListener("click", () => stopCamera(true));
snapshotBtn.addEventListener("click", () => takeSnapshot("Manual snapshot"));
saveEvidenceBtn.addEventListener("click", saveMotionEvidence);
clearSnapshotsBtn.addEventListener("click", clearSnapshots);
clearSnapshotsSideBtn.addEventListener("click", clearSnapshots);
clearEvidenceBtn.addEventListener("click", clearSavedEvidence);
testBtn.addEventListener("click", runSystemTest);
$("clearHistoryBtn").addEventListener("click", clearHistory);

async function listCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter(d => d.kind === "videoinput");
    const selected = cameraSelect.value; cameraSelect.innerHTML = "";
    if (!cameras.length) { cameraSelect.innerHTML = '<option value="">Default camera</option>'; return; }
    cameras.forEach((camera, index) => {
      const option = document.createElement("option"); option.value = camera.deviceId;
      option.textContent = camera.label || `Camera ${index + 1}`; cameraSelect.appendChild(option);
    });
    if (selected && cameras.some(c => c.deviceId === selected)) cameraSelect.value = selected;
  } catch (e) { console.warn("Could not enumerate cameras", e); }
}

async function startCamera() {
  try {
    const selectedDevice = cameraSelect.value;
    const constraints = { audio: false, video: { width: { ideal: 1920 }, height: { ideal: 1080 }, frameRate: { ideal: 30 } } };
    if (selectedDevice) constraints.video.deviceId = { exact: selectedDevice };
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream; await video.play();
    $("emptyCamera").classList.add("hidden"); startBtn.disabled = true; stopBtn.disabled = false; snapshotBtn.disabled = false; saveEvidenceBtn.disabled = false;
    const track = stream.getVideoTracks()[0], settings = track.getSettings ? track.getSettings() : {};
    $("cameraInfo").textContent = `${settings.width || video.videoWidth || "?"}×${settings.height || video.videoHeight || "?"} · ${track.label || "Camera active"}`;
    previousFrame = null; setSafeState(); await listCameras(); resizeOverlay(); detectMotion();
  } catch (error) {
    console.error(error); $("statusText").textContent = "Camera unavailable"; $("led").className = "led stopped";
    $("cameraInfo").textContent = "Check browser camera permission"; $("testDot").className = "test-dot fail";
    $("testStatus").textContent = "Camera test failed"; $("testDetails").textContent = "Allow camera access and try again.";
    alert("Camera access is required. Check the browser camera permission, then try again.");
  }
}

async function stopCamera(updateUi = true) {
  if (animationId) cancelAnimationFrame(animationId); animationId = null;
  if (stream) stream.getTracks().forEach(track => track.stop()); stream = null; video.srcObject = null; previousFrame = null; stopAlarm(); clearOverlay();
  if (updateUi) {
    startBtn.disabled = false; stopBtn.disabled = true; snapshotBtn.disabled = true; saveEvidenceBtn.disabled = true;
    $("led").className = "led stopped"; $("statusText").textContent = "Camera stopped"; $("motionScore").textContent = "Motion score: 0.00%";
    $("motionBadge").textContent = "NO MOTION"; $("motionBadge").className = "badge"; $("cameraInfo").textContent = "Waiting for camera"; $("emptyCamera").classList.remove("hidden");
  }
}

function getMode() { return longRangeToggle.checked ? MODES.long : MODES.standard; }
function detectMotion() {
  if (!stream) return; const mode = getMode();
  if (analysisCanvas.width !== mode.width || analysisCanvas.height !== mode.height) { analysisCanvas.width = mode.width; analysisCanvas.height = mode.height; previousFrame = null; }
  analysisCtx.drawImage(video, 0, 0, mode.width, mode.height); const currentFrame = analysisCtx.getImageData(0, 0, mode.width, mode.height);
  if (previousFrame) {
    const mask = new Uint8Array(mode.width * mode.height); let changedPixels = 0;
    for (let p = 0, i = 0; p < mask.length; p++, i += 4) {
      const currentBrightness = (currentFrame.data[i] + currentFrame.data[i+1] + currentFrame.data[i+2]) / 3;
      const previousBrightness = (previousFrame.data[i] + previousFrame.data[i+1] + previousFrame.data[i+2]) / 3;
      if (Math.abs(currentBrightness - previousBrightness) > mode.pixelDiff) { mask[p] = 1; changedPixels++; }
    }
    const motionRatio = changedPixels / mask.length; $("motionScore").textContent = `Motion score: ${(motionRatio * 100).toFixed(2)}%`;
    const sensitivityValueNum = Number(sensitivity.value) / 100; const trigger = mode.baseTrigger * (1.30 - sensitivityValueNum * 0.82);
    const boxes = findMotionBoxes(mask, mode.width, mode.height, mode.minBlobPixels); drawMotionBoxes(boxes, mode.width, mode.height);
    const detected = motionRatio >= trigger && boxes.length > 0;
    if (detected) {
      const now = performance.now(); lastMotionAt = now; setMotionState();
      if (now - lastEventAt > 1200) {
        logMotionEvent(motionRatio, boxes.length); lastEventAt = now;
        if (autoSnapshotToggle.checked && now - lastSnapshotAt > 3000) { takeSnapshot("Auto motion snapshot"); lastSnapshotAt = now; }
        if (alarmToggle.checked) playAlarmPulse();
      }
    } else if (performance.now() - lastMotionAt > 700) { setSafeState(); stopAlarm(); }
  }
  previousFrame = currentFrame; animationId = requestAnimationFrame(detectMotion);
}

function findMotionBoxes(mask, width, height, minBlobPixels) {
  const visited = new Uint8Array(mask.length), boxes = [], neighbors = [[1,0],[-1,0],[0,1],[0,-1]];
  for (let y = 1; y < height - 1; y += 2) for (let x = 1; x < width - 1; x += 2) {
    const idx = y * width + x; if (!mask[idx] || visited[idx]) continue;
    const stack = [[x,y]]; visited[idx] = 1; let minX=x,maxX=x,minY=y,maxY=y,area=0;
    while (stack.length) {
      const [cx,cy] = stack.pop(); area++; minX=Math.min(minX,cx); maxX=Math.max(maxX,cx); minY=Math.min(minY,cy); maxY=Math.max(maxY,cy);
      for (const [dx,dy] of neighbors) { const nx=cx+dx, ny=cy+dy; if(nx<0||ny<0||nx>=width||ny>=height) continue; const nidx=ny*width+nx; if(mask[nidx]&&!visited[nidx]){visited[nidx]=1;stack.push([nx,ny]);} }
    }
    const boxW=maxX-minX+1, boxH=maxY-minY+1; if(area>=minBlobPixels&&boxW>=3&&boxH>=3) boxes.push({x:minX,y:minY,w:boxW,h:boxH,area});
  }
  return boxes.sort((a,b)=>b.area-a.area).slice(0,8);
}

function resizeOverlay(){ const rect=$("videoStage").getBoundingClientRect(),dpr=window.devicePixelRatio||1; overlay.width=Math.max(1,Math.floor(rect.width*dpr)); overlay.height=Math.max(1,Math.floor(rect.height*dpr)); overlayCtx.setTransform(dpr,0,0,dpr,0,0); }
function clearOverlay(){ const rect=$("videoStage").getBoundingClientRect(); overlayCtx.clearRect(0,0,rect.width,rect.height); }
function drawMotionBoxes(boxes,analysisWidth,analysisHeight){ resizeOverlay(); const rect=$("videoStage").getBoundingClientRect(); overlayCtx.clearRect(0,0,rect.width,rect.height); const scaleX=rect.width/analysisWidth,scaleY=rect.height/analysisHeight; overlayCtx.lineWidth=3; overlayCtx.strokeStyle="#ff4058"; overlayCtx.fillStyle="rgba(255,64,88,.12)"; overlayCtx.font="700 12px system-ui"; boxes.forEach((box,index)=>{const x=box.x*scaleX,y=box.y*scaleY,w=box.w*scaleX,h=box.h*scaleY;overlayCtx.strokeRect(x,y,w,h);overlayCtx.fillRect(x,y,w,h);overlayCtx.fillStyle="#ff4058";overlayCtx.fillText(`Motion ${index+1}`,x+5,Math.max(14,y-5));overlayCtx.fillStyle="rgba(255,64,88,.12)";}); }

function logMotionEvent(score,regionCount){ eventCount++; $("eventCount").textContent=eventCount; const now=new Date(); $("lastMotion").textContent=now.toLocaleTimeString(); if($("historyList").querySelector(".empty")) $("historyList").innerHTML=""; const item=document.createElement("div"); item.className="history-item"; item.innerHTML=`<strong>Motion event #${eventCount}</strong><small>${now.toLocaleString()} · ${(score*100).toFixed(2)}% · ${regionCount} region(s)</small>`; $("historyList").prepend(item); while($("historyList").children.length>50) $("historyList").removeChild($("historyList").lastChild); }
function clearHistory(){ eventCount=0; $("eventCount").textContent="0"; $("lastMotion").textContent="—"; $("historyList").innerHTML='<p class="empty">No motion events yet.</p>'; }

function takeSnapshot(label){ if(!stream||!video.videoWidth)return null; const snap=document.createElement("canvas"); snap.width=video.videoWidth;snap.height=video.videoHeight;snap.getContext("2d").drawImage(video,0,0,snap.width,snap.height); const dataUrl=snap.toDataURL("image/jpeg",0.88),now=new Date(); snapshotCount++;$("snapshotCount").textContent=snapshotCount;if($("snapshotList").querySelector(".empty"))$("snapshotList").innerHTML="";const card=document.createElement("div");card.className="snapshot-card";const safeTime=now.toISOString().replace(/[:.]/g,"-");card.innerHTML=`<img src="${dataUrl}" alt="${label}"><div class="snapshot-meta"><small>${label}<br>${now.toLocaleString()}</small><a href="${dataUrl}" download="motion-${safeTime}.jpg">Download</a></div>`;$("snapshotList").prepend(card);while($("snapshotList").children.length>12)$("snapshotList").removeChild($("snapshotList").lastChild);return{dataUrl,time:now,label}; }
function clearSnapshots(){ snapshotCount=0;$("snapshotCount").textContent="0";$("snapshotList").innerHTML='<p class="empty">No snapshots yet.</p>'; }

function openEvidenceDb(){ return new Promise((resolve,reject)=>{const request=indexedDB.open("motionDetectorEvidence",1);request.onupgradeneeded=()=>{const db=request.result;if(!db.objectStoreNames.contains("evidence"))db.createObjectStore("evidence",{keyPath:"id",autoIncrement:true});};request.onsuccess=()=>{evidenceDb=request.result;resolve(evidenceDb);};request.onerror=()=>reject(request.error);}); }
async function saveMotionEvidence(){ if(!stream||!video.videoWidth){alert("Start the camera before saving evidence.");return;} const capture=takeSnapshot("Saved motion evidence");if(!capture)return;try{const db=evidenceDb||await openEvidenceDb();const record={timestamp:capture.time.toISOString(),displayTime:capture.time.toLocaleString(),image:capture.dataUrl,eventNumber:eventCount,motionScore:$("motionScore").textContent,mode:longRangeToggle.checked?"Long Range":"Standard"};await new Promise((resolve,reject)=>{const tx=db.transaction("evidence","readwrite");tx.objectStore("evidence").add(record);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});await loadSavedEvidence();}catch(error){console.error(error);alert("The browser could not save this evidence record.");} }
async function loadSavedEvidence(){ try{const db=evidenceDb||await openEvidenceDb();const records=await new Promise((resolve,reject)=>{const tx=db.transaction("evidence","readonly"),req=tx.objectStore("evidence").getAll();req.onsuccess=()=>resolve(req.result||[]);req.onerror=()=>reject(req.error);});const list=$("evidenceList");if(!records.length){list.innerHTML='<p class="empty">No saved evidence yet.</p>';return;}list.innerHTML="";records.sort((a,b)=>b.id-a.id).forEach(record=>{const safeTime=record.timestamp.replace(/[:.]/g,"-"),card=document.createElement("div");card.className="evidence-card";card.innerHTML=`<img src="${record.image}" alt="Saved motion evidence"><div class="evidence-meta"><strong>${record.displayTime}</strong><small>${record.mode} · Event #${record.eventNumber} · ${record.motionScore}</small><div class="evidence-actions"><a href="${record.image}" download="evidence-${safeTime}.jpg">Download image</a></div></div>`;list.appendChild(card);});}catch(error){console.error("Could not load evidence",error);} }
async function clearSavedEvidence(){ try{const db=evidenceDb||await openEvidenceDb();await new Promise((resolve,reject)=>{const tx=db.transaction("evidence","readwrite");tx.objectStore("evidence").clear();tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});$("evidenceList").innerHTML='<p class="empty">No saved evidence yet.</p>';}catch(error){console.error(error);} }

function setMotionState(){ $("led").className="led motion";$("statusText").textContent="Motion detected";$("motionBadge").textContent="MOTION DETECTED";$("motionBadge").className="badge active"; }
function setSafeState(){ $("led").className="led safe";$("statusText").textContent="Monitoring — no motion";$("motionBadge").textContent="NO MOTION";$("motionBadge").className="badge"; }
function updateCalibrationBar(){ const value=Number(sensitivity.value),boost=longRangeToggle.checked?15:0,width=Math.min(100,Math.max(12,value+boost));$("scaleFill").style.width=`${width}%`; }
function playAlarmPulse(){ if(!alarmToggle.checked||alarmOscillator)return;audioContext=audioContext||new(window.AudioContext||window.webkitAudioContext)();alarmOscillator=audioContext.createOscillator();const gain=audioContext.createGain();alarmOscillator.type="square";alarmOscillator.frequency.value=880;gain.gain.value=.035;alarmOscillator.connect(gain);gain.connect(audioContext.destination);alarmOscillator.start();setTimeout(stopAlarm,220); }
function stopAlarm(){ if(alarmOscillator){try{alarmOscillator.stop();}catch(_){}try{alarmOscillator.disconnect();}catch(_){}alarmOscillator=null;} }
async function runSystemTest(){ const dot=$("testDot"),status=$("testStatus"),details=$("testDetails");if(!stream||video.readyState<2){dot.className="test-dot fail";status.textContent="System test failed";details.textContent="Camera is not running. Click Start Camera first.";return;}const checks=[video.videoWidth>0&&video.videoHeight>0,typeof requestAnimationFrame==="function",analysisCanvas.getContext("2d")!==null,overlay.getContext("2d")!==null];if(checks.every(Boolean)){dot.className="test-dot pass";status.textContent="Detector ready";details.textContent=`Camera ${video.videoWidth}×${video.videoHeight}; frame analysis and overlay are operational.`;}else{dot.className="test-dot fail";status.textContent="Detector needs attention";details.textContent="One or more browser components did not initialize correctly.";} }

window.addEventListener("resize",resizeOverlay);window.addEventListener("beforeunload",()=>stopCamera(false));updateCalibrationBar();listCameras();loadSavedEvidence();