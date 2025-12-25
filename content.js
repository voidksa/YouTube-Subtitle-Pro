// Load fonts from Google Fonts
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&family=Roboto:wght@400;700;900&display=swap';
document.head.appendChild(fontLink);

// Create style element
const styleTag = document.createElement('style');
document.head.appendChild(styleTag);

// Default variables
const defaultAr = { fontSize: 38, fontColor: '#ffffff', fontFamily: "'Tajawal', sans-serif", shadowIntensity: 4, fontWeight: 700, bottomPos: 10, bgOpacity: 0, strokeColor: '#000000' };
const defaultEn = { fontSize: 32, fontColor: '#ffffff', fontFamily: "'Roboto', sans-serif", shadowIntensity: 4, fontWeight: 700, bottomPos: 10, bgOpacity: 0, strokeColor: '#000000' };

// Variables to cache current settings to avoid repeated storage reads
let cachedSettings = {
    ar: { ...defaultAr },
    en: { ...defaultEn }
};

// Update CSS based on passed settings
function updateCSS(ar, en) {
    // Ensure default value exists if missing (for legacy users)
    if (ar.shadowIntensity === undefined) ar.shadowIntensity = 4;
    if (en.shadowIntensity === undefined) en.shadowIntensity = 4;

    styleTag.innerHTML = `
        /* Hide YouTube options to prevent interference */
        .ytp-settings-menu .ytp-panel-header, .ytp-button[aria-label="Options"] { display: none !important; }

        #ytp-caption-window-container .caption-window {
            position: absolute !important; left: 0 !important; right: 0 !important;
            margin: 0 auto !important; width: 100% !important; text-align: center !important;
            top: auto !important; background: transparent !important; pointer-events: none !important;
        }

        /* Improve general text appearance without forcing display */
        .ytp-caption-segment {
            padding: 2px 10px !important;
            border-radius: 6px !important; 
            box-decoration-break: clone;
            -webkit-box-decoration-break: clone;
        }

        /* Apply Arabic settings */
        .is-arabic .ytp-caption-segment {
            font-family: ${ar.fontFamily} !important;
            font-size: ${ar.fontSize}px !important;
            color: ${ar.fontColor} !important;
            font-weight: ${ar.fontWeight} !important;
            background-color: rgba(0,0,0, ${ar.bgOpacity / 100}) !important;
            -webkit-text-stroke: 1px ${ar.strokeColor} !important;
            text-shadow: 2px 2px ${ar.shadowIntensity}px rgba(0,0,0,0.8) !important;
            paint-order: stroke fill !important;
        }
        .is-arabic.caption-window { bottom: ${ar.bottomPos}% !important; }

        /* Apply English settings */
        .is-english .ytp-caption-segment {
            font-family: ${en.fontFamily} !important;
            font-size: ${en.fontSize}px !important;
            color: ${en.fontColor} !important;
            font-weight: ${en.fontWeight} !important;
            background-color: rgba(0,0,0, ${en.bgOpacity / 100}) !important;
            -webkit-text-stroke: 1px ${en.strokeColor} !important;
            text-shadow: 2px 2px ${en.shadowIntensity}px rgba(0,0,0,0.8) !important;
            paint-order: stroke fill !important;
        }
        .is-english.caption-window { bottom: ${en.bottomPos}% !important; }
    `;
}

// Function to apply styles (reads from storage if no settings passed)
function applyStyles() {
    chrome.storage.sync.get(['ar', 'en'], (res) => {
        cachedSettings.ar = res.ar || defaultAr;
        cachedSettings.en = res.en || defaultEn;
        updateCSS(cachedSettings.ar, cachedSettings.en);
    });
}

// Function to detect language in text
function detectLanguage() {
    const segments = document.querySelectorAll('.ytp-caption-segment');
    if (segments.length === 0) return;

    segments.forEach(seg => {
        const text = seg.innerText;
        const container = seg.closest('.caption-window');
        if (!container) return;

        // Check for Arabic characters
        // Range includes basic and extended Arabic characters
        if (/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(text)) {
            if (!container.classList.contains('is-arabic')) {
                container.classList.add('is-arabic');
                container.classList.remove('is-english');
                container.dir = "rtl";
            }
        } else {
            // If not Arabic, consider it English (or other Latin language)
            if (!container.classList.contains('is-english')) {
                container.classList.add('is-english');
                container.classList.remove('is-arabic');
                container.dir = "ltr";
            }
        }
    });
}

// Page mutation observer (more efficient than setInterval)
const observer = new MutationObserver((mutations) => {
    // Check only if changes relate to subtitles
    let shouldUpdate = false;
    for (const mutation of mutations) {
        if (mutation.target.classList &&
            (mutation.target.classList.contains('ytp-caption-segment') ||
                mutation.target.id === 'ytp-caption-window-container' ||
                mutation.target.classList.contains('caption-window'))) {
            shouldUpdate = true;
            break;
        }
        // Check for text changes inside nodes
        if (mutation.type === 'characterData' || mutation.type === 'childList') {
            shouldUpdate = true; // Simplified check, can be improved
        }
    }

    // Always run detection to ensure because YouTube updates frequently
    detectLanguage();
});

// Start observing
function startObserving() {
    const target = document.getElementById('movie_player') || document.body;
    observer.observe(target, {
        childList: true,
        subtree: true,
        characterData: true
    });
}

// Initial run
applyStyles();
startObserving();

// Listen for update messages from popup
chrome.runtime.onMessage.addListener((m) => {
    if (m.action === "update") {
        applyStyles(); // Read from storage (final save)
    } else if (m.action === "preview") {
        // Instant update from message without reading from storage
        if (m.lang === 'ar') cachedSettings.ar = m.data;
        else if (m.lang === 'en') cachedSettings.en = m.data;
        updateCSS(cachedSettings.ar, cachedSettings.en);
    }
});

// Periodic lightweight check to ensure element isn't lost during navigation
setInterval(() => {
    detectLanguage();
    // If observer stops for some reason or page changes
    const player = document.getElementById('movie_player');
    if (player) {
        // Can re-attach observer if needed, but usually leaving it on body is enough
    }
}, 1000);
