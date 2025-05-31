# WebShield Guardian – Anti-Phishing Browser Extension

WebShield Guardian is a browser extension that provides real-time protection against phishing attacks. It uses a combination of a local phishing URL blocklist and a machine learning API to detect and block malicious websites before they can compromise your security.

## Features

- **Real-Time Phishing Detection:**  
  Monitors every website you visit and checks it against a maintained phishing URL list and a remote ML-based phishing detection API.

- **Automatic Blocking:**  
  - **High Confidence:** If a site is confirmed as phishing, you are redirected to a warning page and notified.
  - **Medium Confidence:** If a site is suspicious, you are shown a caution page with the option to proceed.
  - **Low Confidence:** No action is taken.

- **Session Whitelisting:**  
  If you choose to proceed to a suspicious site, it is whitelisted for your session, and you will not be warned again for that URL.

- **Statistics:**  
  Tracks the number of websites visited and threats blocked, visible in the extension popup.

- **Notifications:**  
  Shows browser notifications when a phishing or suspicious site is detected.

- **API Health Monitoring:**  
  Periodically checks the health of the phishing detection API.

## How It Works

1. **URL Monitoring:**  
   The extension listens for tab updates. When a new URL is loaded, it checks if the extension is active and if the URL is not whitelisted or internal.

2. **Phishing URL Blocklist:**  
   Loads a list of known phishing URLs from `phishing_urls.json` and blocks any matches immediately.

3. **Machine Learning API:**  
   If the URL is not in the blocklist, the extension extracts features from the URL and sends them to a remote API for phishing prediction.

4. **Redirection & Notification:**  
   - If the API returns a high-confidence phishing result, the user is redirected to a warning page.
   - For medium confidence, a caution page is shown.
   - Notifications are displayed for both cases.

5. **User Actions:**  
   Users can activate/deactivate the extension, view statistics, and allow specific URLs for the session.

## Development

### Prerequisites

- Node.js
- Chrome or Chromium-based browser

### Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Run in development mode:**
   ```sh
   npm run dev
   ```

3. **Build for production:**
   ```sh
   npm run build
   ```

4. **Load the extension:**
   - Build the project.
   - Go to `chrome://extensions` and enable "Developer mode".
   - Click "Load unpacked" and select the `dist` folder.

### Configuration

- **Phishing API Endpoint:**  
  Set the API endpoint in [`src/background/background.ts`](src/background/background.ts) via the `API_ENDPOINT` constant.

- **Phishing URL List:**  
  Update `phishing_urls.json` in the project root to maintain the blocklist.

## File Structure

- [`src/background/background.ts`](src/background/background.ts): Main background script with detection logic.
- [`phishing_urls.json`](phishing_urls.json): List of known phishing URLs.
- [`src/pages/`](src/pages/): React components for popup, warning, caution, and educational pages.
- [`public/manifest.json`](public/manifest.json): Chrome extension manifest.
