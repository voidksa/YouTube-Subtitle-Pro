let currentLang = 'ar';
const fields = ['fontSize', 'fontColor', 'fontFamily', 'shadowIntensity', 'fontWeight', 'bottomPos', 'bgOpacity', 'strokeColor'];

// التبديل بين التبويبات
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelector('.tab.active').classList.remove('active');
        tab.classList.add('active');
        currentLang = tab.dataset.lang;
        loadSettings();
    });
});

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

// إرسال تحديث لحظي (معاينة) دون حفظ في التخزين لتجنب تجاوز الحد المسموح
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

// حفظ الإعدادات في التخزين (يتم استدعاؤها فقط عند الانتهاء من التعديل)
function saveSettings() {
    const config = getConfig();
    chrome.storage.sync.set({ [currentLang]: config }, () => {
        // نرسل رسالة تحديث نهائية للتأكيد
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) chrome.tabs.sendMessage(tabs[0].id, { action: "update" });
        });
    });
}

// ربط الأحداث
fields.forEach(id => {
    const el = document.getElementById(id);
    // عند التحريك أو الكتابة: معاينة فورية
    el.addEventListener('input', previewSettings);
    // عند ترك الماوس أو الانتهاء: حفظ في التخزين
    el.addEventListener('change', saveSettings);
});

loadSettings();
