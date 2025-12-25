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

let showFullscreenAssistant = true;
let uiLang = 'ar';
let fsButton = null;
let fsMenu = null;
let customTemplates = [];

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
            margin: 0 auto !important; width: 100% !important;
            top: auto !important; background: transparent !important; pointer-events: none !important;
        }

        /* Improve general text appearance without forcing display */
        .ytp-caption-segment {
            box-decoration-break: clone;
            -webkit-box-decoration-break: clone;
            display: inline-block;
        }

        /* Apply Arabic settings */
        .is-arabic .ytp-caption-segment {
            font-family: ${ar.fontFamily} !important;
            font-size: ${ar.fontSize}px !important;
            color: ${ar.fontColor} !important;
            font-weight: ${ar.fontWeight} !important;
            background-color: rgba(0,0,0, ${ar.bgOpacity / 100}) !important;
            -webkit-text-stroke: ${ar.strokeWidth || 1}px ${ar.strokeColor} !important;
            text-shadow: 2px 2px ${ar.shadowIntensity}px rgba(0,0,0,0.8) !important;
            paint-order: stroke fill !important;
            line-height: ${ar.lineHeight || 1.25} !important;
            letter-spacing: ${(ar.letterSpacing || 0)}px !important;
            padding: ${(ar.padding || 8)}px ${(Math.max((ar.padding || 8) + 6, 0))}px !important;
            border-radius: ${(ar.borderRadius || 6)}px !important;
        }
        .is-arabic.caption-window { 
            bottom: ${ar.bottomPos}% !important; 
            text-align: ${ar.textAlign || 'center'} !important;
        }

        /* Apply English settings */
        .is-english .ytp-caption-segment {
            font-family: ${en.fontFamily} !important;
            font-size: ${en.fontSize}px !important;
            color: ${en.fontColor} !important;
            font-weight: ${en.fontWeight} !important;
            background-color: rgba(0,0,0, ${en.bgOpacity / 100}) !important;
            -webkit-text-stroke: ${en.strokeWidth || 1}px ${en.strokeColor} !important;
            text-shadow: 2px 2px ${en.shadowIntensity}px rgba(0,0,0,0.8) !important;
            paint-order: stroke fill !important;
            line-height: ${en.lineHeight || 1.25} !important;
            letter-spacing: ${(en.letterSpacing || 0)}px !important;
            padding: ${(en.padding || 8)}px ${(Math.max((en.padding || 8) + 6, 0))}px !important;
            border-radius: ${(en.borderRadius || 6)}px !important;
        }
        .is-english.caption-window { 
            bottom: ${en.bottomPos}% !important; 
            text-align: ${en.textAlign || 'center'} !important;
        }

        .ysp-fs-assist {
            position: absolute;
            top: 24px;
            right: 24px;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: rgba(255,0,0,0.92);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            z-index: 6000;
            cursor: pointer;
            box-shadow: 0 4px 18px rgba(0,0,0,0.4);
            border: 1px solid rgba(255,255,255,0.15);
        }
        .ysp-fs-menu {
            position: absolute;
            top: 76px;
            right: 24px;
            background: rgba(17,17,17,0.95);
            color: #fff;
            border: 1px solid #333;
            border-radius: 10px;
            padding: 8px;
            z-index: 6001;
            display: none;
            min-width: 160px;
            backdrop-filter: blur(8px);
            max-height: 400px;
            overflow-y: auto;
        }
        .ysp-fs-menu button {
            width: 100%;
            background: #1e1e1e;
            color: #fff;
            border: 1px solid #333;
            border-radius: 8px;
            padding: 8px 10px;
            margin: 4px 0;
            cursor: pointer;
            text-align: left;
            transition: background 0.2s;
            font-family: inherit;
        }
        .ysp-fs-menu button:hover {
            background: #333;
        }
        .ysp-fs-divider {
            height: 1px;
            background: #333;
            margin: 8px 0;
        }
        .ysp-hidden { display: none !important; }
    `;
}

// Function to apply styles (reads from storage if no settings passed)
function applyStyles() {
    chrome.storage.sync.get(['ar', 'en', 'fullscreenAssistant', 'uiLanguage', 'customTemplates'], (res) => {
        cachedSettings.ar = res.ar || defaultAr;
        cachedSettings.en = res.en || defaultEn;
        showFullscreenAssistant = res.fullscreenAssistant === undefined ? true : !!res.fullscreenAssistant;
        uiLang = res.uiLanguage || 'ar';
        customTemplates = res.customTemplates || [];
        updateCSS(cachedSettings.ar, cachedSettings.en);
        updateAssistantVisibility();
        // Rebuild menu to include new templates if needed
        if (fsMenu) {
            fsMenu.remove();
            fsMenu = null;
            fsButton.remove();
            fsButton = null;
            createAssistantUI();
        }
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
    } else if (m.action === "updateSettings") {
        // Bulk update from new popup
        if (m.settings.ar) cachedSettings.ar = m.settings.ar;
        if (m.settings.en) cachedSettings.en = m.settings.en;
        updateCSS(cachedSettings.ar, cachedSettings.en);
    } else if (m.action === "preview") {
        // Instant update from message without reading from storage
        if (m.lang === 'ar') cachedSettings.ar = m.data;
        else if (m.lang === 'en') cachedSettings.en = m.data;
        updateCSS(cachedSettings.ar, cachedSettings.en);
    } else if (m.action === "toggleFullscreenAssistant") {
        applyStyles();
    } else if (m.action === "updateTemplates") {
        applyStyles(); // Reload templates
    }
});

// Periodic lightweight check to ensure element isn't lost during navigation
setInterval(() => {
    detectLanguage();
    // If observer stops for some reason or page changes
    const player = document.getElementById('movie_player');
    if (player) {
        if (fsButton && fsButton.parentNode !== player) {
            player.appendChild(fsButton);
            player.appendChild(fsMenu);
        } else if (!fsButton) {
            updateAssistantVisibility();
        }
    }
}, 1000);

function createAssistantUI() {
    const targetContainer = document.getElementById('movie_player');
    if (!targetContainer) return; // Wait for player to exist

    if (fsButton) {
        if (fsButton.parentNode !== targetContainer) {
            targetContainer.appendChild(fsButton);
            targetContainer.appendChild(fsMenu);
        }
        return;
    }

    fsButton = document.createElement('div');
    fsButton.className = 'ysp-fs-assist';
    fsButton.textContent = '✈';
    fsMenu = document.createElement('div');
    fsMenu.className = 'ysp-fs-menu';

    // Standard Presets
    const btnCinema = document.createElement('button');
    const btnMinimal = document.createElement('button');
    const btnContrast = document.createElement('button');

    btnCinema.id = 'ysp-btn-cinema';
    btnMinimal.id = 'ysp-btn-minimal';
    btnContrast.id = 'ysp-btn-contrast';

    fsMenu.appendChild(btnCinema);
    fsMenu.appendChild(btnMinimal);
    fsMenu.appendChild(btnContrast);

    // Custom Templates
    if (customTemplates && customTemplates.length > 0) {
        const divider = document.createElement('div');
        divider.className = 'ysp-fs-divider';
        fsMenu.appendChild(divider);

        customTemplates.forEach(tmpl => {
            const btn = document.createElement('button');
            btn.textContent = tmpl.name;
            btn.addEventListener('click', () => applyCustomTemplate(tmpl));
            fsMenu.appendChild(btn);
        });
    }

    const divider2 = document.createElement('div');
    divider2.className = 'ysp-fs-divider';
    fsMenu.appendChild(divider2);

    const btnHide = document.createElement('button');
    btnHide.id = 'ysp-btn-hide';
    fsMenu.appendChild(btnHide);

    targetContainer.appendChild(fsButton);
    targetContainer.appendChild(fsMenu);

    rebuildMenuLabels();

    fsButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent affecting player
        fsMenu.style.display = fsMenu.style.display === 'none' || fsMenu.style.display === '' ? 'block' : 'none';
    });

    // Prevent menu clicks from pausing video
    fsMenu.addEventListener('click', (e) => e.stopPropagation());

    btnCinema.addEventListener('click', () => applyPresetFS('cinema'));
    btnMinimal.addEventListener('click', () => applyPresetFS('minimal'));
    btnContrast.addEventListener('click', () => applyPresetFS('contrast'));
    btnHide.addEventListener('click', () => {
        showFullscreenAssistant = false;
        chrome.storage.sync.set({ fullscreenAssistant: false });
        updateAssistantVisibility();
    });
}

function rebuildMenuLabels() {
    if (!fsMenu) return;
    const isAr = uiLang === 'ar';
    const c = fsMenu.querySelector('#ysp-btn-cinema');
    const m = fsMenu.querySelector('#ysp-btn-minimal');
    const h = fsMenu.querySelector('#ysp-btn-hide');
    const x = fsMenu.querySelector('#ysp-btn-contrast');
    if (c) c.textContent = isAr ? 'سينمائي' : 'Cinema';
    if (m) m.textContent = isAr ? 'بسيط' : 'Minimal';
    if (x) x.textContent = isAr ? 'تباين عالي' : 'High Contrast';
    if (h) h.textContent = isAr ? 'إخفاء العلامة' : 'Hide Icon';

    if (fsMenu) {
        fsMenu.style.fontFamily = isAr ? "'Tajawal', sans-serif" : "'Roboto', sans-serif";
    }
}

function applyCustomTemplate(tmpl) {
    cachedSettings.ar = tmpl.ar;
    cachedSettings.en = tmpl.en;
    chrome.storage.sync.set({ ar: tmpl.ar, en: tmpl.en });
    updateCSS(cachedSettings.ar, cachedSettings.en);
    fsMenu.style.display = 'none';
}

function applyPresetFS(p) {
    const mutate = (base) => {
        if (p === 'cinema') {
            base.strokeWidth = 2;
            base.shadowIntensity = 6;
            base.bgOpacity = 12;
            base.padding = 10;
            base.borderRadius = 8;
            base.textAlign = 'center';
            base.fontWeight = 700;
            base.lineHeight = 1.25;
            base.letterSpacing = 0;
        } else if (p === 'minimal') {
            base.strokeWidth = 0;
            base.shadowIntensity = 0;
            base.bgOpacity = 0;
            base.padding = 6;
            base.borderRadius = 0;
            base.textAlign = 'center';
            base.fontWeight = 400;
            base.lineHeight = 1.2;
            base.letterSpacing = 0;
        } else if (p === 'contrast') {
            base.strokeWidth = 3;
            base.shadowIntensity = 0;
            base.bgOpacity = 20;
            base.padding = 12;
            base.borderRadius = 6;
            base.textAlign = 'center';
            base.fontWeight = 900;
            base.lineHeight = 1.3;
            base.letterSpacing = 0.2;
            base.fontColor = '#ffffff';
            base.strokeColor = '#000000';
        }
    };
    const newAr = { ...cachedSettings.ar }; mutate(newAr);
    const newEn = { ...cachedSettings.en }; mutate(newEn);
    cachedSettings.ar = newAr;
    cachedSettings.en = newEn;
    chrome.storage.sync.set({ ar: newAr, en: newEn });
    updateCSS(cachedSettings.ar, cachedSettings.en);
    fsMenu.style.display = 'none';
}

function updateAssistantVisibility() {
    createAssistantUI();
    const isFs = !!document.fullscreenElement;
    const visible = showFullscreenAssistant && isFs;
    if (fsButton) fsButton.classList.toggle('ysp-hidden', !visible);
    if (fsMenu) {
        if (!visible) fsMenu.style.display = 'none';
        fsMenu.classList.toggle('ysp-hidden', !visible);
    }
}

document.addEventListener('fullscreenchange', updateAssistantVisibility);

chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'sync') return;
    if (changes.fullscreenAssistant) {
        showFullscreenAssistant = changes.fullscreenAssistant.newValue === undefined ? true : !!changes.fullscreenAssistant.newValue;
        updateAssistantVisibility();
    }
    if (changes.uiLanguage) {
        uiLang = changes.uiLanguage.newValue || 'ar';
        rebuildMenuLabels();
    }
});