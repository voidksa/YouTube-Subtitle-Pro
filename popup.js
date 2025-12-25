let currentLang = 'ar';
const fields = ['fontSize', 'fontColor', 'fontFamily', 'shadowIntensity', 'fontWeight', 'bottomPos', 'bgOpacity', 'strokeColor'];

// Switch tabs
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelector('.tab.active').classList.remove('active');
        tab.classList.add('active');
        currentLang = tab.dataset.lang;
        updateUI(); // Update UI language and direction
        loadSettings();
    });
});

function updateUI() {
    // Update direction
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key, currentLang);
    });
}

function loadSettings() {
    chrome.storage.sync.get(currentLang, (res) => {
        const data = res[currentLang] || {};
        fields.forEach(f => {
            if (data[f] !== undefined) document.getElementById(f).value = data[f];
        });
    });
}

function getConfig() {
    let config = {};
    fields.forEach(f => config[f] = document.getElementById(f).value);
    return config;
}

// Send instant update (preview) without saving to storage to avoid quota limits
function previewSettings() {
    const config = getConfig();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "preview",
                lang: currentLang,
                data: config
            });
        }
    });
}

// Save settings to storage (called only when editing is finished)
function saveSettings() {
    const config = getConfig();
    chrome.storage.sync.set({ [currentLang]: config }, () => {
        // Send final update message to confirm
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) chrome.tabs.sendMessage(tabs[0].id, { action: "update" });
        });
    });
}

// Bind events
fields.forEach(id => {
    const el = document.getElementById(id);
    // On input/slide: instant preview
    el.addEventListener('input', previewSettings);
    // On mouse leave or change: save to storage
    el.addEventListener('change', saveSettings);
});

updateUI();
loadSettings();
