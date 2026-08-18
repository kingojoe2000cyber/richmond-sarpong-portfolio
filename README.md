# Richmond Kwadwo Sarpong — Professional Portfolio

This is the complete VS Code source package for Richmond Kwadwo Sarpong's professional portfolio. It includes the CyberSecure360 flagship GRC project, instant portfolio chatbox, WhatsApp contact and email contact.

## Requirements

- Visual Studio Code
- Node.js 22.13 or newer
- An internet connection for the first dependency installation

## Run the portfolio in VS Code

1. Extract the ZIP file.
2. Open the extracted `Richmond_Portfolio_VSCode` folder in Visual Studio Code.
3. In VS Code, select **Terminal > New Terminal**.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local address displayed in the terminal, normally `http://localhost:3000` or the Vite address shown.

## Important files

- `app/page.tsx` — main portfolio page and professional content
- `app/CyberSecure360.tsx` — interactive CyberSecure360 project section
- `app/ChatBox.tsx` — instant portfolio assistant
- `app/globals.css` — main site styling
- `app/cybersecure360.css` — CyberSecure360 dashboard styling
- `app/chat.css` — chatbox styling
- `app/WhatsAppButton.tsx` and `app/EmailButton.tsx` — contact buttons

## Production build

```bash
npm run build
```

© 2026 Richmond Kwadwo Sarpong
