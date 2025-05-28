import extractDomain from "../utils/featureExtractor";

// API Configuration
const API_ENDPOINT = "http://127.0.0.1:8000"; // Replace with your endpoint
const API_HEALTH_CHECK_INTERVAL = 15; // minutes

// Confidence Thresholds
const CONFIDENCE_LEVELS = {
  HIGH: 0.75,    // Redirect to safety page (definite phishing)
  MEDIUM: 0.55,  // Show ambient warning (suspicious)
  LOW: 0         // No action
};

// Extension state
let phishingUrls: string[] = [];
let totalWebsitesVisited: number = 0;
let flaggedWebsitesCount: number = 0;
let isActive: boolean = true;
let apiIsHealthy: boolean = false;

// Add this helper function at the top or near handleRedirection
function isWhitelistedUrl(url: string): boolean {
  // Chrome internal pages, Edge, Firefox, Opera, etc.
  if (
    url.startsWith('chrome://') ||
    url.startsWith('chrome-extension://') ||
    url.startsWith('edge://') ||
    url.startsWith('about:') ||
    url.startsWith('moz-extension://') ||
    url.startsWith('opera://') ||
    url.startsWith('http://localhost')
  ) return true;

  // PDF files
  if (url.match(/\.pdf(\?|#|$)/i)) return true;

  // Data URLs, file URLs, blob URLs
  if (
    url.startsWith('data:') ||
    url.startsWith('file:') ||
    url.startsWith('blob:')
  ) return true;

  // Add more patterns as needed

  return false;
}

// Show notification
function showNotification(title: string, message: string) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'images/safety-icon-48.png', // Path relative to extension root
    title: title,
    message: message,
    priority: 2
  });
}

// Load phishing URLs from JSON
fetch(chrome.runtime.getURL("phishing_urls.json"))
  .then((response) => response.json())
  .then((data: { phishing_urls: string[] }) => {
    if (data && Array.isArray(data.phishing_urls)) {
      phishingUrls = data.phishing_urls;
      console.log("Phishing URLs loaded:", phishingUrls.length);
    } else {
      console.error("Invalid phishing URLs data format:", data);
    }
  })
  .catch((error) => {
    console.error("Error loading phishing URLs:", error);
  });

// Check API health status
async function checkAPIHealth(): Promise<void> {
  try {
    const response = await fetch(`${API_ENDPOINT}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    apiIsHealthy = response.ok;
    console.log("API health status:", apiIsHealthy);
  } catch (error) {
    apiIsHealthy = false;
    console.error("API health check failed:", error);
  }
}

// Function to handle redirection based on confidence level
async function handleRedirection(url: string): Promise<void> {
  if (isWhitelistedUrl(url)) return;

  // Increment total websites visited
  totalWebsitesVisited++;
  chrome.storage.sync.set({ totalWebsitesVisited });

  // --- Check against phishingUrls list first ---
  const urlDomain = extractDomain(url).domain;
  if (phishingUrls.some(phishUrl => {
    try {
      // Compare domains for flexibility
      return extractDomain(phishUrl).domain === urlDomain;
    } catch {
      return false;
    }
  })) {
    flaggedWebsitesCount++;
    chrome.storage.sync.set({ flaggedWebsitesCount });
    chrome.tabs.update({ url: chrome.runtime.getURL("warning.html") });
    showNotification(
      "Phishing Site Blocked",
      "We've blocked this dangerous phishing site"
    );
    return; // Stop further checks
  }

  try {
    const { isPhishing, confidence } = await checkUrlWithAPI(url);

    if (isPhishing) {
      // Increment flagged websites count
      flaggedWebsitesCount++;
      chrome.storage.sync.set({ flaggedWebsitesCount });

      if (confidence >= CONFIDENCE_LEVELS.HIGH) {
        chrome.tabs.update({ url: chrome.runtime.getURL("warning.html") });
        showNotification(
          "Phishing Site Blocked",
          "We've blocked this dangerous phishing site"
        );
      } else if (confidence >= CONFIDENCE_LEVELS.MEDIUM) {
        chrome.tabs.update({ url: chrome.runtime.getURL("caution.html") });
        showNotification(
          "Suspicious Site Detected",
          "This site shows suspicious characteristics"
        );
      }
    }
  } catch (error) {
    console.error("Error handling redirection:", error);
  }
}

// Listen for tab updates to check URLs
chrome.tabs.onUpdated.addListener((_tabId, changeInfo) => {
  if (changeInfo.url && isActive) {
    if (isWhitelistedUrl(changeInfo.url)) return; // <-- Skip whitelisted URLs
    handleRedirection(changeInfo.url);
  }
});

// Initialize extension state
chrome.storage.sync.get(
  ["totalWebsitesVisited", "flaggedWebsitesCount", "isActive"],
  (data: { totalWebsitesVisited?: number; flaggedWebsitesCount?: number; isActive?: boolean }) => {
    totalWebsitesVisited = data.totalWebsitesVisited || 0;
    flaggedWebsitesCount = data.flaggedWebsitesCount || 0;
    isActive = data.isActive !== undefined ? data.isActive : true;

    checkAPIHealth();
    setInterval(checkAPIHealth, API_HEALTH_CHECK_INTERVAL * 60 * 1000);
  }
);

// Feature extraction (TypeScript implementation)
function extractFeatures(url: string): Record<string, number> | null {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname;
    const pathname = parsed.pathname;

    const countRegex = (pattern: string, text: string): number => {
      const regex = new RegExp(pattern, 'gi');
      return (text.match(regex) || []).length;
    };

    const isIp = (addr: string): number => {
      const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
      return ipv4Pattern.test(addr) || ipv6Pattern.test(addr) ? 1 : 0;
    };

    const countWords = (text: string): number => {
      const words = text.match(/\b\w+\b/g);
      return words ? words.length : 0;
    };

    const avgWordLength = (text: string): number => {
      const words = text.match(/\b\w+\b/g);
      if (!words || words.length === 0) return 0;
      const total = words.reduce((sum, word) => sum + word.length, 0);
      return total / words.length;
    };

    const { domain, subdomain, publicSuffix } = extractDomain(url);

    const features: Record<string, number> = {
      length_url: url.length,
      length_hostname: hostname.length,
      ip: isIp(hostname),
      nb_dots: (url.match(/\./g) || []).length,
      nb_hyphens: (url.match(/-/g) || []).length,
      nb_at: (url.match(/@/g) || []).length,
      nb_qm: (url.match(/\?/g) || []).length,
      nb_and: (url.match(/&/g) || []).length,
      nb_or: (url.match(/\|/g) || []).length,
      nb_eq: (url.match(/=/g) || []).length,
      nb_underscore: (url.match(/_/g) || []).length,
      nb_tilde: (url.match(/~/g) || []).length,
      nb_percent: (url.match(/%/g) || []).length,
      nb_slash: (url.match(/\//g) || []).length,
      nb_star: (url.match(/\*/g) || []).length,
      nb_colon: (url.match(/:/g) || []).length,
      nb_comma: (url.match(/,/g) || []).length,
      nb_semicolumn: (url.match(/;/g) || []).length,
      nb_dollar: (url.match(/\$/g) || []).length,
      nb_space: (url.match(/ /g) || []).length,
      nb_www: hostname.startsWith('www.') ? 1 : 0,
      nb_com: publicSuffix === 'com' ? 1 : 0,
      tld_in_path: pathname.includes(publicSuffix) ? 1 : 0,
      tld_in_subdomain: subdomain.includes(publicSuffix) ? 1 : 0,
      abnormal_subdomain: subdomain.split('.').length > 3 ? 1 : 0,
      nb_subdomains: subdomain ? subdomain.split('.').length : 0,
      suspecious_tld: ['tk', 'gq', 'ml', 'cf'].includes(publicSuffix) ? 1 : 0,
      nb_dslash: (url.match(/\/\//g) || []).length,
      http_in_path: pathname.includes('http') ? 1 : 0,
      https_token: parsed.protocol === 'https:' ? 1 : 0,
      ratio_digits_url: (url.match(/\d/g) || []).length / url.length || 0,
      ratio_digits_host: (hostname.match(/\d/g) || []).length / hostname.length || 0,
      punycode: hostname.includes('xn--') ? 1 : 0,
      port: parsed.port ? 1 : 0,
      prefix_suffix: domain.includes('-') ? 1 : 0,
      random_domain: /^[a-z0-9]{8,}$/.test(domain.split('.')[0]) ? 1 : 0,
      shortening_service: ['bit.ly', 'goo.gl', 'tinyurl'].some(s => hostname.includes(s)) ? 1 : 0,
      path_extension: pathname.includes('.') ? 1 : 0,
      length_words_raw: countWords(url),
      avg_words_raw: avgWordLength(url),
      phish_hints: countRegex('login|signin|secure|account|update', url),
      domain_in_brand: ['paypal', 'amazon', 'ebay'].some(b => url.includes(b)) ? 1 : 0,
      brand_in_subdomain: ['paypal', 'amazon'].some(b => subdomain.includes(b)) ? 1 : 0,
      brand_in_path: ['paypal', 'amazon'].some(b => pathname.includes(b)) ? 1 : 0
    };

    return features;
  } catch (error) {
    console.error("Feature extraction failed:", error);
    return null;
  }
}

// API prediction with confidence
async function checkUrlWithAPI(url: string): Promise<{ isPhishing: boolean; confidence: number }> {
  try {
    const features = extractFeatures(url);
    if (!features) return { isPhishing: false, confidence: 0 };

    const response = await fetch(`${API_ENDPOINT}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, features })
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const result = await response.json();
    return {
      isPhishing: result.is_phishing,
      confidence: result.confidence || 0
    };
  } catch (error) {
    console.error("API request failed:", error);
    return { isPhishing: false, confidence: 0 };
  }
}

// Handle messages from popup
chrome.runtime.onMessage.addListener((request: { action: string }, _sender, sendResponse) => {
  switch (request.action) {
    case "activate":
      isActive = true;
      chrome.storage.sync.set({ isActive });
      sendResponse({
        status: "activated",
        apiStatus: apiIsHealthy
      });
      break;

    case "deactivate":
      isActive = false;
      chrome.storage.sync.set({ isActive });
      sendResponse({ status: "deactivated" });
      break;

    case "getCounts":
      sendResponse({
        total: totalWebsitesVisited,
        flagged: flaggedWebsitesCount
      });
      break;

    case "getState":
      chrome.storage.local.get(['phishingStats'], (result) => {
        sendResponse({
          isActive,
          apiStatus: apiIsHealthy,
          stats: result.phishingStats || {},
          lastUpdated: new Date().toISOString()
        });
      });
      return true;

    default:
      sendResponse({ error: "Unknown action" });
  }
});