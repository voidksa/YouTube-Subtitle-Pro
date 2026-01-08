/**
 * YouTube Subtitle Pro
 * Copyright (c) 2024. All Rights Reserved.
 * 
 * Redistribution on Chrome Web Store is strictly prohibited.
 */

// Initialize i18n
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations('ar'); // Default popup language
    loadSettings();
    loadCustomTemplates(); // Initial load of templates
});

let currentLang = 'ar'; // The language currently being EDITED (not the popup UI lang)
const defaultAr = { fontSize: 38, fontColor: '#ffffff', fontFamily: "'Tajawal', sans-serif", shadowIntensity: 4, fontWeight: 700, bottomPos: 10, bgOpacity: 0, strokeColor: '#000000', strokeWidth: 1, lineHeight: 1.25, letterSpacing: 0, padding: 8, borderRadius: 6, textAlign: 'center' };
const defaultEn = { fontSize: 32, fontColor: '#ffffff', fontFamily: "'Roboto', sans-serif", shadowIntensity: 4, fontWeight: 700, bottomPos: 10, bgOpacity: 0, strokeColor: '#000000', strokeWidth: 1, lineHeight: 1.25, letterSpacing: 0, padding: 8, borderRadius: 6, textAlign: 'center' };

let cachedSettings = {
    ar: { ...defaultAr },
    en: { ...defaultEn }
};

// UI Elements
const langSwitcher = document.getElementById('langSwitcher');
const langOptions = document.querySelectorAll('.lang-btn'); // Updated selector
const previewText = document.getElementById('previewText');

// Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

const inputs = {
    fontSize: document.getElementById('fontSize'),
    fontColor: document.getElementById('fontColor'),
    fontFamily: document.getElementById('fontFamily'),
    shadowIntensity: document.getElementById('shadowIntensity'),
    fontWeight: document.getElementById('fontWeight'),
    bottomPos: document.getElementById('bottomPos'),
    bgOpacity: document.getElementById('bgOpacity'),
    strokeColor: document.getElementById('strokeColor'),
    strokeWidth: document.getElementById('strokeWidth'),
    lineHeight: document.getElementById('lineHeight'),
    letterSpacing: document.getElementById('letterSpacing'),
    padding: document.getElementById('padding'),
    borderRadius: document.getElementById('borderRadius'),
    textAlign: document.getElementById('textAlign')
};

function clearActivePresets() {
    document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));
}

// --- Tab Switching Logic ---
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// --- Language Switching Logic ---
langOptions.forEach(option => {
    option.addEventListener('click', () => {
        // 1. Visual Update
        langOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');

        const selectedLang = option.dataset.lang;

        // 2. Logic Update
        currentLang = selectedLang;
        updateUIValues(currentLang);
        updatePreview();

        // 3. Update UI Text Direction & Language
        document.documentElement.setAttribute('dir', selectedLang === 'ar' ? 'rtl' : 'ltr');
        applyTranslations(selectedLang);

        // 4. Update Preview Text Content
        previewText.textContent = selectedLang === 'ar' ? 'نص تجريبي' : 'Preview Text';
        previewText.style.direction = selectedLang === 'ar' ? 'rtl' : 'ltr';

        // 5. Save UI Language Preference
        chrome.storage.local.set({ uiLanguage: selectedLang });
        loadCustomTemplates();
    });
});

// --- Settings Handling ---

function loadSettings() {
    chrome.storage.local.get(['ar', 'en', 'uiLanguage', 'fullscreenAssistant'], (result) => {
        if (result.ar) cachedSettings.ar = { ...defaultAr, ...result.ar };
        if (result.en) cachedSettings.en = { ...defaultEn, ...result.en };

        // Restore UI Language
        if (result.uiLanguage) {
            currentLang = result.uiLanguage;

            // Trigger click on saved language to update UI/Slider
            const savedOption = document.querySelector(`.lang-btn[data-lang="${currentLang}"]`);
            if (savedOption) {
                savedOption.click();
            }
        } else {
            // Default Fallback
            applyTranslations('ar');
            updateUIValues('ar');
            updatePreview();
        }

        if (fullscreenAssistantToggle) {
            const val = result.fullscreenAssistant === undefined ? true : !!result.fullscreenAssistant;
            fullscreenAssistantToggle.checked = val;
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
    clearActivePresets();
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
    previewText.style.lineHeight = s.lineHeight;
    previewText.style.letterSpacing = s.letterSpacing + "px";

    // Match content.js: Apply word-spacing for Arabic and disable ligatures
    if (currentLang === 'ar') {
        previewText.style.wordSpacing = s.letterSpacing + "px";
        previewText.style.fontVariantLigatures = "none";
        previewText.style.fontFeatureSettings = '"liga" 0';
    } else {
        previewText.style.wordSpacing = "normal";
        previewText.style.fontVariantLigatures = "normal";
        previewText.style.fontFeatureSettings = "normal";
    }

    previewText.style.padding = (s.padding * 0.6) + "px";
    previewText.style.borderRadius = s.borderRadius + "px";
    previewText.style.textAlign = s.textAlign;
    previewText.style.webkitTextStroke = `${s.strokeWidth}px ${s.strokeColor}`;
    previewText.style.paintOrder = 'stroke fill';

    // Match content.js shadow style
    const shadow = s.shadowIntensity;
    previewText.style.textShadow = `2px 2px ${shadow}px rgba(0,0,0,0.8)`;

    // Background Opacity
    const opacity = s.bgOpacity / 100;
    previewText.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
}

// --- Event Listeners ---
Object.keys(inputs).forEach(key => {
    inputs[key].addEventListener('input', (e) => {
        let value = e.target.value;
        // Convert numbers
        if (e.target.type === 'range') {
            if (e.target.step && e.target.step !== '1') {
                value = parseFloat(value);
            } else {
                value = parseInt(value);
            }
        }
        saveSetting(key, value);
    });
});

document.getElementById('resetBtn').addEventListener('click', () => {
    clearActivePresets();
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

    // Translate placeholder manually
    const tmplInput = document.getElementById('templateNameInput');
    if (tmplInput) {
        tmplInput.placeholder = currentLang === 'ar' ? 'اسم القالب' : 'Template Name';
    }
}

// --- Presets ---
const presetCinema = document.getElementById('presetCinema');
const presetMinimal = document.getElementById('presetMinimal');
const presetContrast = document.getElementById('presetContrast');

function applyPreset(p) {
    const base = { ...cachedSettings[currentLang] };
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
    cachedSettings[currentLang] = base;
    chrome.storage.local.set({ [currentLang]: base });
    updateUIValues(currentLang);
    updatePreview();

    // Add visual feedback to preset cards
    document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));
    if (p === 'cinema') presetCinema.classList.add('active');
    if (p === 'minimal') presetMinimal.classList.add('active');
    if (p === 'contrast') presetContrast.classList.add('active');

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

if (presetCinema) presetCinema.addEventListener('click', () => applyPreset('cinema'));
if (presetMinimal) presetMinimal.addEventListener('click', () => applyPreset('minimal'));
if (presetContrast) presetContrast.addEventListener('click', () => applyPreset('contrast'));

// --- Export / Import ---
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importFile = document.getElementById('importFile');
const fullscreenAssistantToggle = document.getElementById('fullscreenAssistant');

if (exportBtn) {
    exportBtn.addEventListener('click', () => {
        const data = {
            ar: cachedSettings.ar,
            en: cachedSettings.en,
            uiLanguage: currentLang,
            version: chrome.runtime.getManifest().version
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'youtube-subtitle-pro-settings.json';
        a.click();
        URL.revokeObjectURL(url);
    });
}

if (importBtn && importFile) {
    importBtn.addEventListener('click', () => importFile.click());
    importFile.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const parsed = JSON.parse(reader.result);
                if (parsed.ar && parsed.en) {
                    cachedSettings.ar = { ...defaultAr, ...parsed.ar };
                    cachedSettings.en = { ...defaultEn, ...parsed.en };
                    currentLang = parsed.uiLanguage || currentLang;
                    chrome.storage.local.set({ ar: cachedSettings.ar, en: cachedSettings.en, uiLanguage: currentLang });
                    updateUIValues(currentLang);
                    updatePreview();
                    const opt = document.querySelector(`.lang-btn[data-lang="${currentLang}"]`);
                    if (opt) opt.click();
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
            } catch (err) {
                console.error('Invalid settings file', err);
            }
        };
        reader.readAsText(file);
    });
}

if (fullscreenAssistantToggle) {
    fullscreenAssistantToggle.addEventListener('change', (e) => {
        const enabled = !!e.target.checked;
        chrome.storage.local.set({ fullscreenAssistant: enabled });
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.id) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "toggleFullscreenAssistant" });
            }
        });
    });
}

// --- Custom Templates Logic ---

const saveTemplateBtn = document.getElementById('saveTemplateBtn');
const templateNameInput = document.getElementById('templateNameInput');
const customTemplatesList = document.getElementById('customTemplatesList');

function loadCustomTemplates() {
    chrome.storage.local.get(['customTemplates'], (result) => {
        const templates = result.customTemplates || [];
        renderTemplates(templates);
    });
}

function renderTemplates(templates) {
    if (!customTemplatesList) return;
    customTemplatesList.innerHTML = '';

    templates.forEach((tmpl, index) => {
        const div = document.createElement('div');
        div.className = 'template-item';

        const nameSpan = document.createElement('span');
        nameSpan.textContent = tmpl.name;
        nameSpan.className = 'template-name';
        nameSpan.addEventListener('click', () => applyCustomTemplate(tmpl));

        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = '✕';
        deleteBtn.className = 'template-delete';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTemplate(index);
        });

        div.appendChild(nameSpan);
        div.appendChild(deleteBtn);
        customTemplatesList.appendChild(div);
    });
}

function saveCustomTemplate() {
    const name = templateNameInput.value.trim() || (currentLang === 'ar' ? 'قالب مخصص' : 'Custom Template');

    chrome.storage.local.get(['customTemplates'], (result) => {
        const templates = result.customTemplates || [];
        templates.push({
            name: name,
            ar: cachedSettings.ar,
            en: cachedSettings.en
        });

        chrome.storage.local.set({ customTemplates: templates }, () => {
            renderTemplates(templates);
            templateNameInput.value = ''; // Clear input
        });
    });
}

function deleteTemplate(index) {
    chrome.storage.local.get(['customTemplates'], (result) => {
        const templates = result.customTemplates || [];
        if (index >= 0 && index < templates.length) {
            templates.splice(index, 1);
            chrome.storage.local.set({ customTemplates: templates }, () => {
                renderTemplates(templates);
            });
        }
    });
}

function applyCustomTemplate(tmpl) {
    clearActivePresets();
    if (tmpl.ar) cachedSettings.ar = { ...tmpl.ar };
    if (tmpl.en) cachedSettings.en = { ...tmpl.en };

    chrome.storage.local.set({ ar: cachedSettings.ar, en: cachedSettings.en });
    updateUIValues(currentLang);
    updatePreview();

    // Notify Content Script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "updateSettings",
                settings: cachedSettings
            });
            // Also force update templates list in content if needed
            chrome.tabs.sendMessage(tabs[0].id, { action: "updateTemplates" });
        }
    });
}

if (saveTemplateBtn) {
    saveTemplateBtn.addEventListener('click', saveCustomTemplate);
}
