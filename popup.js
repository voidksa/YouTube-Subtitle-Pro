// Initialize i18n
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations('ar'); // Default popup language
    loadSettings();
});

let currentLang = 'ar'; // The language currently being EDITED (not the popup UI lang)
const defaultAr = { fontSize: 38, fontColor: '#ffffff', fontFamily: "'Tajawal', sans-serif", shadowIntensity: 4, fontWeight: 700, bottomPos: 10, bgOpacity: 0, strokeColor: '#000000' };
const defaultEn = { fontSize: 32, fontColor: '#ffffff', fontFamily: "'Roboto', sans-serif", shadowIntensity: 4, fontWeight: 700, bottomPos: 10, bgOpacity: 0, strokeColor: '#000000' };

let cachedSettings = {
    ar: { ...defaultAr },
    en: { ...defaultEn }
};

// UI Elements
const langSwitcher = document.getElementById('langSwitcher');
const langOptions = document.querySelectorAll('.lang-option');
const previewText = document.getElementById('previewText');
const inputs = {
    fontSize: document.getElementById('fontSize'),
    fontColor: document.getElementById('fontColor'),
    fontFamily: document.getElementById('fontFamily'),
    shadowIntensity: document.getElementById('shadowIntensity'),
    fontWeight: document.getElementById('fontWeight'),
    bottomPos: document.getElementById('bottomPos'),
    bgOpacity: document.getElementById('bgOpacity'),
    strokeColor: document.getElementById('strokeColor')
};

// --- Language Switching Logic ---
langOptions.forEach(option => {
    option.addEventListener('click', () => {
        // 1. Visual Update
        langOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');

        const selectedLang = option.dataset.lang;

        // 2. Handle Slider Animation (CSS Class based)
        if (selectedLang === 'en') {
            langSwitcher.classList.add('en-active');
        } else {
            langSwitcher.classList.remove('en-active');
        }

        // 3. Logic Update
        currentLang = selectedLang;
        updateUIValues(currentLang);
        updatePreview();

        // 4. Update UI Text Direction & Language
        document.documentElement.setAttribute('dir', selectedLang === 'ar' ? 'rtl' : 'ltr');
        applyTranslations(selectedLang);

        // 5. Update Preview Text Content
        previewText.textContent = selectedLang === 'ar' ? 'نص تجريبي' : 'Preview Text';
        previewText.style.direction = selectedLang === 'ar' ? 'rtl' : 'ltr';

        // 6. Save UI Language Preference
        chrome.storage.local.set({ uiLanguage: selectedLang });
    });
});

// --- Settings Handling ---

function loadSettings() {
    chrome.storage.local.get(['ar', 'en', 'uiLanguage'], (result) => {
        if (result.ar) cachedSettings.ar = { ...defaultAr, ...result.ar };
        if (result.en) cachedSettings.en = { ...defaultEn, ...result.en };

        // Restore UI Language
        if (result.uiLanguage) {
            currentLang = result.uiLanguage;
            
            // Trigger click on saved language to update UI/Slider
            const savedOption = document.querySelector(`.lang-option[data-lang="${currentLang}"]`);
            if (savedOption) {
                savedOption.click();
            }
        } else {
            // Default Fallback
            applyTranslations('ar');
            updateUIValues('ar');
            updatePreview();
        }
    });
}

function updateUIValues(lang) {
    const settings = cachedSettings[lang];
    Object.keys(inputs).forEach(key => {
        if (inputs[key] && settings[key] !== undefined) {
            inputs[key].value = settings[key];
        }
    });
}

function saveSetting(key, value) {
    // Update Cache
    cachedSettings[currentLang][key] = value;

    // Save to Storage
    chrome.storage.local.set({ [currentLang]: cachedSettings[currentLang] });

    // Update Preview
    updatePreview();

    // Notify Content Script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "updateSettings",
                settings: cachedSettings
            });
        }
    });
}

// --- Live Preview Logic ---
function updatePreview() {
    const s = cachedSettings[currentLang];

    previewText.style.fontFamily = s.fontFamily.replace(/'/g, ""); // Remove quotes for style
    previewText.style.fontSize = (s.fontSize * 0.8) + "px"; // Scale down slightly for preview box
    previewText.style.color = s.fontColor;
    previewText.style.fontWeight = s.fontWeight;

    // Simulate Text Shadow / Stroke
    const shadow = s.shadowIntensity;
    const stroke = s.strokeColor;

    // Complex shadow to match the content script's cinema look
    previewText.style.textShadow = `
        ${stroke} 1px 0px 0px, ${stroke} -1px 0px 0px, 
        ${stroke} 0px 1px 0px, ${stroke} 0px -1px 0px, 
        0px 0px ${shadow}px #000
    `;

    // Background Opacity
    const opacity = s.bgOpacity / 100;
    previewText.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
}

// --- Event Listeners ---
Object.keys(inputs).forEach(key => {
    inputs[key].addEventListener('input', (e) => {
        let value = e.target.value;
        // Convert numbers
        if (e.target.type === 'range') value = parseInt(value);
        saveSetting(key, value);
    });
});

document.getElementById('resetBtn').addEventListener('click', () => {
    const defaults = currentLang === 'ar' ? defaultAr : defaultEn;
    cachedSettings[currentLang] = { ...defaults };
    chrome.storage.local.set({ [currentLang]: defaults });
    updateUIValues(currentLang);
    updatePreview();

    // Notify Content Script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "updateSettings",
                settings: cachedSettings
            });
        }
    });
});

function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key, lang);
    });
}
