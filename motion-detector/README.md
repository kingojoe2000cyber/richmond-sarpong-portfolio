# Motion Detector V2.2

Browser-based security monitoring dashboard with local motion analysis.

## Features
- Live camera monitoring
- Motion bounding boxes
- Motion event counter and timestamps
- Motion history
- Manual and automatic snapshots
- Downloadable snapshots
- Save Motion Evidence button
- Persistent evidence records using IndexedDB
- Evidence records include timestamp, image, event number, detector mode and motion score
- Clear Snapshots button
- Clear Saved Evidence button
- Optional audible alarm
- Camera selector
- Adjustable sensitivity
- Long Range mode for distant motion detection
- Detector test/health indicator

## 5 metre target
Long Range mode increases analysis resolution and lowers the trigger threshold to improve detection of smaller or more distant movement. Exact physical range depends on camera resolution, field of view, lighting, object size, contrast and camera stability.

Recommended starting configuration: fixed 1080p webcam, good lighting, Long Range enabled, sensitivity between 60 and 80.

## Local run
```bash
python -m http.server 8000
```
Open `http://localhost:8000` and allow camera access.

## GitHub Pages
This folder is designed to run as a static GitHub Pages site. Camera access requires HTTPS or localhost, so GitHub Pages is suitable because it serves the site over HTTPS.
