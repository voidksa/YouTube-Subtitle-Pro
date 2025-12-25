// تحميل الخطوط من Google Fonts
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&family=Roboto:wght@400;700;900&display=swap';
document.head.appendChild(fontLink);

// إنشاء عنصر الستايل
const styleTag = document.createElement('style');
document.head.appendChild(styleTag);

// المتغيرات الافتراضية
const defaultAr = { fontSize: 38, fontColor: '#ffffff', fontFamily: "'Tajawal', sans-serif", shadowIntensity: 4, fontWeight: 700, bottomPos: 10, bgOpacity: 0, strokeColor: '#000000' };
const defaultEn = { fontSize: 32, fontColor: '#ffffff', fontFamily: "'Roboto', sans-serif", shadowIntensity: 4, fontWeight: 700, bottomPos: 10, bgOpacity: 0, strokeColor: '#000000' };

// متغيرات لتخزين الإعدادات الحالية لتجنب القراءة المتكررة من التخزين
let cachedSettings = {
    ar: { ...defaultAr },
    en: { ...defaultEn }
};

// تحديث الـ CSS بناءً على الإعدادات الممررة
function updateCSS(ar, en) {
    // التأكد من وجود قيمة افتراضية في حال كانت غير موجودة (للمستخدمين القدامى)
    if (ar.shadowIntensity === undefined) ar.shadowIntensity = 4;
    if (en.shadowIntensity === undefined) en.shadowIntensity = 4;

    styleTag.innerHTML = `
        /* حجب خيارات يوتيوب لمنع التداخل */
        .ytp-settings-menu .ytp-panel-header, .ytp-button[aria-label="Options"] { display: none !important; }

        #ytp-caption-window-container .caption-window {
            position: absolute !important; left: 0 !important; right: 0 !important;
            margin: 0 auto !important; width: 100% !important; text-align: center !important;
            top: auto !important; background: transparent !important; pointer-events: none !important;
        }

        /* تحسين مظهر النص العام دون إجبار العرض */
        .ytp-caption-segment {
            padding: 2px 10px !important;
            border-radius: 6px !important; 
            box-decoration-break: clone;
            -webkit-box-decoration-break: clone;
        }

        /* تطبيق إعدادات العربي */
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

        /* تطبيق إعدادات الإنجليزي */
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

// دالة لتطبيق الستايلات (تقرأ من التخزين إذا لم يتم تمرير إعدادات)
function applyStyles() {
    chrome.storage.sync.get(['ar', 'en'], (res) => {
        cachedSettings.ar = res.ar || defaultAr;
        cachedSettings.en = res.en || defaultEn;
        updateCSS(cachedSettings.ar, cachedSettings.en);
    });
}

// دالة لاكتشاف اللغة في النص
function detectLanguage() {
    const segments = document.querySelectorAll('.ytp-caption-segment');
    if (segments.length === 0) return;

    segments.forEach(seg => {
        const text = seg.innerText;
        const container = seg.closest('.caption-window');
        if (!container) return;

        // التحقق من وجود حروف عربية
        // النطاق يشمل الحروف العربية الأساسية والممتدة
        if (/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(text)) {
            if (!container.classList.contains('is-arabic')) {
                container.classList.add('is-arabic');
                container.classList.remove('is-english');
                container.dir = "rtl";
            }
        } else {
            // إذا لم يكن عربي، نعتبره إنجليزي (أو لغة لاتينية أخرى)
            if (!container.classList.contains('is-english')) {
                container.classList.add('is-english');
                container.classList.remove('is-arabic');
                container.dir = "ltr";
            }
        }
    });
}

// مراقب التغييرات في الصفحة (أكثر كفاءة من setInterval)
const observer = new MutationObserver((mutations) => {
    // نتحقق فقط إذا كانت التغييرات تتعلق بالترجمة
    let shouldUpdate = false;
    for (const mutation of mutations) {
        if (mutation.target.classList &&
            (mutation.target.classList.contains('ytp-caption-segment') ||
                mutation.target.id === 'ytp-caption-window-container' ||
                mutation.target.classList.contains('caption-window'))) {
            shouldUpdate = true;
            break;
        }
        // التحقق من تغيير النص داخل العقد
        if (mutation.type === 'characterData' || mutation.type === 'childList') {
            shouldUpdate = true; // تبسيط للتحقق، يمكن تحسينه
        }
    }

    // تشغيل الكشف دائمًا للتأكد لأن يوتيوب يقوم بتحديثات كثيرة
    detectLanguage();
});

// بدء المراقبة
function startObserving() {
    const target = document.getElementById('movie_player') || document.body;
    observer.observe(target, {
        childList: true,
        subtree: true,
        characterData: true
    });
}

// التشغيل الأولي
applyStyles();
startObserving();

// الاستماع لرسائل التحديث من النافذة المنبثقة
chrome.runtime.onMessage.addListener((m) => {
    if (m.action === "update") {
        applyStyles(); // قراءة من التخزين (حفظ نهائي)
    } else if (m.action === "preview") {
        // تحديث لحظي من الرسالة دون القراءة من التخزين
        if (m.lang === 'ar') cachedSettings.ar = m.data;
        else if (m.lang === 'en') cachedSettings.en = m.data;
        updateCSS(cachedSettings.ar, cachedSettings.en);
    }
});

// إعادة تشغيل المراقبة بشكل دوري خفيف للتأكد من عدم فقدان العنصر عند التنقل
setInterval(() => {
    detectLanguage();
    // إذا توقف المراقب لسبب ما أو تغيرت الصفحة
    const player = document.getElementById('movie_player');
    if (player) {
        // يمكن إعادة ربط المراقب إذا لزم الأمر، لكن عادة يكفي تركه يعمل على body
    }
}, 1000);
