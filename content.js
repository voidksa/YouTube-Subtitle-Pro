
/**
 * YouTube Subtitle Pro
 * Copyright (c) 2024. All Rights Reserved.
 * 
 * This extension is provided for personal use only.
 * Redistribution on Chrome Web Store or other extension marketplaces is strictly prohibited.
 * Commercial use is not allowed without prior written permission.
 */

// --- 1. CONFIGURATION & TRANSLATIONS ---

const translations = {
    ar: {
        typography: "الخط والنصوص",
        appearance: "المظهر والألوان",
        position: "الموضع",
        advanced: "متقدم",
        fontSize: "حجم الخط",
        fontColor: "لون النص",
        fontFamily: "نوع الخط",
        shadowIntensity: "قوة الظل",
        fontWeight: "سماكة الخط",
        bottomPos: "الارتفاع",
        bgOpacity: "خلفية النص",
        strokeColor: "لون الحدود",
        strokeWidth: "سماكة الحدود",
        lineHeight: "تباعد الأسطر",
        letterSpacing: "تباعد الحروف",
        padding: "حواف داخلية",
        borderRadius: "انحناء الخلفية",
        textAlign: "محاذاة النص",
        alignCenter: "وسط",
        alignLeft: "يسار",
        alignRight: "يمين",
        presets: "القوالب السريعة",
        presetCinema: "سينمائي",
        presetMinimal: "بسيط",
        presetContrast: "تباين عالي",
        export: "تصدير الإعدادات",
        import: "استيراد",
        reset: "استعادة الافتراضي",
        fullscreenOptions: "خيارات ملء الشاشة",
        fullscreenAssistant: "إظهار علامة التخصيص في ملء الشاشة",
        tabMain: "رئيسي",
        tabStyle: "المظهر",
        tabAdvanced: "متقدم",
        normal: "عادي",
        bold: "عريض",
        black: "عريض جداً",
        tajawal: "Tajawal (العربي الأفضل)",
        roboto: "Roboto (الافتراضي)",
        arial: "Arial",
        cinema: "Cinema Typewriter",
        customTemplates: "القوالب الخاصة",
        templateName: "اسم القالب",
        saveTemplate: "حفظ القالب",
        deleteTemplate: "حذف",
        noTemplates: "لا توجد قوالب محفوظة",
        templateExists: "القالب موجود بالفعل. اضغط مجدداً للتحديث.",
        templateSaved: "تم حفظ القالب بنجاح!",
        updateTemplate: "تحديث القالب",
        applyTemplate: "تطبيق",
        actions: "إجراءات",
        strokeOpacity: "شفافية الحدود",
        bgBlur: "تمويه الخلفية",
        shortcutInfo: "اختصارات: Alt+S (الإعدادات) | Alt+↑/↓ (الحجم)",
        editingTarget: "تعديل إعدادات:",
        targetAr: "الترجمة العربية",
        targetEn: "الترجمة الإنجليزية",
        panelTitle: "YouTube Subtitle Pro",
        closePanel: "إغلاق",
        supportCustomEffects: "دعم التأثيرات المخصصة (ذكي)",
        supportCustomEffectsInfo: "عند التفعيل، سيتم دمج خط الإضافة مع ألوان وتأثيرات صاحب الفيديو. عند التعطيل، سيتم تجاهل الفيديوهات ذات التأثيرات الخاصة.",
        supportUs: "دعم المشروع",
        rateUs: "قيم الإضافة"
    },
    en: {
        typography: "Typography",
        appearance: "Appearance",
        position: "Position",
        advanced: "Advanced",
        fontSize: "Font Size",
        fontColor: "Text Color",
        fontFamily: "Font Family",
        shadowIntensity: "Shadow Intensity",
        fontWeight: "Font Weight",
        bottomPos: "Bottom Position",
        bgOpacity: "Text Background",
        strokeColor: "Stroke Color",
        strokeWidth: "Stroke Width",
        lineHeight: "Line Height",
        letterSpacing: "Letter Spacing",
        padding: "Padding",
        borderRadius: "Border Radius",
        textAlign: "Text Align",
        alignCenter: "Center",
        alignLeft: "Left",
        alignRight: "Right",
        presets: "Quick Presets",
        presetCinema: "Cinema",
        presetMinimal: "Minimal",
        presetContrast: "High Contrast",
        export: "Export Settings",
        import: "Import",
        reset: "Reset to Default",
        fullscreenOptions: "Fullscreen Options",
        fullscreenAssistant: "Show customization icon in fullscreen",
        tabMain: "Main",
        tabStyle: "Style",
        tabAdvanced: "Pro",
        normal: "Normal",
        bold: "Bold",
        black: "Black",
        tajawal: "Tajawal (Best for Arabic)",
        roboto: "Roboto (Default)",
        arial: "Arial",
        cinema: "Cinema Typewriter",
        customTemplates: "Custom Templates",
        templateName: "Template Name",
        saveTemplate: "Save Template",
        deleteTemplate: "Delete",
        noTemplates: "No saved templates",
        templateExists: "Template exists. Click again to update.",
        templateSaved: "Template saved successfully!",
        updateTemplate: "Update Template",
        applyTemplate: "Apply",
        actions: "Actions",
        strokeOpacity: "Stroke Opacity",
        bgBlur: "Background Blur",
        shortcutInfo: "Shortcuts: Alt+S (Settings) | Alt+↑/↓ (Size)",
        editingTarget: "Editing Settings For:",
        targetAr: "Arabic Subtitles",
        targetEn: "English Subtitles",
        panelTitle: "YouTube Subtitle Pro",
        closePanel: "Close",
        supportCustomEffects: "Smart Custom Support",
        supportCustomEffectsInfo: "When enabled, it merges our font with the creator's colors/effects. When disabled, custom subtitles are skipped entirely.",
        supportUs: "Support Project",
        rateUs: "Rate Extension"
    }
};

const defaultAr = { fontSize: 38, fontColor: '#ffffff', fontFamily: "'Tajawal', sans-serif", shadowIntensity: 4, fontWeight: 700, bottomPos: 10, bgOpacity: 0, bgBlur: 0, strokeColor: '#000000', strokeWidth: 1, strokeOpacity: 100, lineHeight: 1.25, letterSpacing: 0, padding: 8, borderRadius: 6, textAlign: 'center', supportCustomEffects: false };
const defaultEn = { fontSize: 32, fontColor: '#ffffff', fontFamily: "'Roboto', sans-serif", shadowIntensity: 4, fontWeight: 700, bottomPos: 10, bgOpacity: 0, bgBlur: 0, strokeColor: '#000000', strokeWidth: 1, strokeOpacity: 100, lineHeight: 1.25, letterSpacing: 0, padding: 8, borderRadius: 6, textAlign: 'center', supportCustomEffects: false };

// --- 2. STATE ---

let cachedSettings = {
    ar: { ...defaultAr },
    en: { ...defaultEn }
};
let uiLang = 'ar';
let editTarget = 'ar'; // 'ar' or 'en'
let showFullscreenAssistant = true;
let customTemplates = [];
let selectedTemplateName = null;
let panelVisible = false;

// --- 3. STYLES (Injected Panel CSS) ---

const panelCSS = `
    @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=Roboto:wght@400;500;700;900&family=Cairo:wght@400;600;700;900&family=Almarai:wght@300;400;700;800&family=Noto+Kufi+Arabic:wght@400;600;700&family=Open+Sans:wght@400;600;700&family=Montserrat:wght@400;600;700;900&family=Lato:wght@400;700;900&display=swap');

    :root {
        --ysp-bg: #121212;
        --ysp-bg-sec: #1e1e1e;
        --ysp-border: rgba(255, 255, 255, 0.1);
        --ysp-accent: #ff0033;
        --ysp-accent-glow: rgba(255, 0, 51, 0.4);
        --ysp-text: #ffffff;
        --ysp-text-sec: #a0a0a0;
        --ysp-radius: 12px;
        --ysp-font-ar: 'Tajawal', sans-serif;
        --ysp-font-en: 'Roboto', sans-serif;
        --ysp-shadow: 0 8px 32px rgba(0,0,0,0.6);
        --ysp-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    #ysp-panel-container {
        position: fixed !important;
        top: 0 !important;
        right: -420px !important;
        width: 400px !important;
        height: 100vh !important;
        background: var(--ysp-bg) !important;
        border-left: 1px solid var(--ysp-border) !important;
        box-shadow: var(--ysp-shadow) !important;
        z-index: 2147483647 !important;
        transition: right 0.3s cubic-bezier(0.2, 0, 0.2, 1) !important;
        font-family: var(--ysp-font-ar) !important;
        display: flex !important;
        flex-direction: column !important;
        direction: rtl;
        color: var(--ysp-text);
        box-sizing: border-box;
    }

    #ysp-panel-container.ysp-open {
        right: 0 !important;
    }

    #ysp-panel-container * {
        box-sizing: border-box;
        font-family: inherit;
        outline: none;
        user-select: none;
    }

    /* --- HEADER --- */
    .ysp-header {
        padding: 18px 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--ysp-bg);
        border-bottom: 1px solid var(--ysp-border);
    }
    .ysp-brand {
        font-size: 18px;
        font-weight: 800;
        color: var(--ysp-text);
        letter-spacing: 0.5px;
        display: flex; align-items: center; gap: 8px;
        direction: ltr; /* Always LTR for English brand name */
    }
    .ysp-brand span {
        color: var(--ysp-accent);
        text-transform: uppercase;
    }
    .ysp-close-btn {
        width: 32px; height: 32px;
        border-radius: 8px;
        background: transparent;
        border: 1px solid transparent;
        color: var(--ysp-text-sec);
        cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        transition: var(--ysp-transition);
    }
    .ysp-close-btn:hover { background: rgba(255,255,255,0.1); color: white; }
    .ysp-icon { width: 20px; height: 20px; fill: currentColor; }

    /* --- TABS --- */
    .ysp-tabs-wrapper {
        padding: 16px 24px 0;
        background: var(--ysp-bg);
    }
    .ysp-tabs {
        display: flex;
        background: var(--ysp-bg-sec);
        padding: 4px;
        border-radius: var(--ysp-radius);
    }
    .ysp-tab {
        flex: 1;
        text-align: center;
        padding: 8px 0;
        font-size: 13px;
        font-weight: 500;
        color: var(--ysp-text-sec);
        cursor: pointer;
        border-radius: 8px;
        transition: var(--ysp-transition);
    }
    .ysp-tab:hover { color: var(--ysp-text); }
    .ysp-tab.active {
        background: var(--ysp-accent);
        color: white;
        font-weight: 700;
        box-shadow: 0 2px 10px var(--ysp-accent-glow);
    }

    /* --- TARGET BAR --- */
    .ysp-target-bar {
        margin: 16px 24px 0;
        display: flex; gap: 12px;
    }
    .ysp-target-btn {
        flex: 1; padding: 10px;
        text-align: center; font-size: 12px;
        background: transparent;
        border: 1px solid var(--ysp-border);
        border-radius: var(--ysp-radius);
        color: var(--ysp-text-sec);
        cursor: pointer; transition: var(--ysp-transition);
        font-weight: 500;
        display: flex; align-items: center; justify-content: center; gap: 6px;
    }
    .ysp-target-btn:hover { border-color: rgba(255,255,255,0.3); color: white; }
    .ysp-target-btn.active {
        background: rgba(255, 255, 255, 0.05);
        border-color: var(--ysp-accent);
        color: var(--ysp-accent);
        font-weight: 700;
    }

    /* --- PREVIEW --- */
    .ysp-preview-card {
        margin: 20px 24px;
        height: 120px;
        border-radius: var(--ysp-radius);
        overflow: hidden;
        position: relative;
        border: 1px solid var(--ysp-border);
        background: #000;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
    .ysp-preview-card::before {
        content: ""; position: absolute; inset: 0;
        background-image: url('https://raw.githubusercontent.com/voidksa/YouTube-Subtitle-Pro/main/assets/preview_bg.jpg');
        background-size: cover; background-position: center;
        opacity: 0.5;
    }
    .ysp-preview-overlay {
        position: absolute; inset: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
    }
    .ysp-preview-text {
        position: relative; z-index: 2;
        text-align: center; padding: 0 20px;
        font-size: 20px; line-height: 1.4;
        text-shadow: 0 2px 8px rgba(0,0,0,0.8);
    }

    /* --- CONTENT --- */
    .ysp-content {
        flex: 1;
        overflow-y: auto;
        padding: 24px; /* Increased top padding from 0 to 24px */
        min-height: 0; /* Fix for flex scrolling */
    }
    .ysp-tab-content { display: none; }
    .ysp-tab-content.active { display: block; animation: fadeIn 0.3s ease; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

    /* --- CARDS & SECTIONS --- */
    .ysp-card {
        background: var(--ysp-bg-sec);
        border: 1px solid var(--ysp-border);
        border-radius: var(--ysp-radius);
        padding: 20px;
        margin-bottom: 24px; /* Increased from 20px */
    }
    .ysp-section {
        margin-bottom: 32px; /* Increased separation between sections */
    }
    .ysp-section:last-child {
        margin-bottom: 0;
    }
    .ysp-section-title {
        font-size: 14px; /* Increased from 11px */
        text-transform: uppercase;
        color: var(--ysp-text-sec);
        margin-bottom: 20px; /* Increased from 16px */
        font-weight: 700;
        letter-spacing: 1px;
    }

    /* --- CONTROLS --- */
    .ysp-row {
        display: flex; align-items: center; justify-content: space-between;
        margin-bottom: 24px; /* Increased from 18px */
        gap: 16px;
    }
    .ysp-row:last-child { margin-bottom: 0; }
    
    .ysp-label { font-size: 13px; color: var(--ysp-text); flex: 1; font-weight: 500; }
    
    /* Range Slider */
    .ysp-range-wrap { flex: 2; display: flex; align-items: center; }
    .ysp-input-range {
        -webkit-appearance: none; width: 100%; height: 4px;
        background: rgba(255,255,255,0.1); border-radius: 2px;
    }
    .ysp-input-range::-webkit-slider-thumb {
        -webkit-appearance: none; width: 18px; height: 18px;
        background: var(--ysp-accent); border-radius: 50%;
        cursor: pointer; transition: 0.2s; 
        box-shadow: 0 0 10px var(--ysp-accent-glow);
        margin-top: -7px; /* Fix vertical alignment */
    }
    .ysp-input-range::-webkit-slider-runnable-track {
        width: 100%; height: 4px; cursor: pointer;
        background: transparent; border-radius: 2px;
        color: transparent; /* Hide default track */
    }
    .ysp-input-range::-webkit-slider-thumb:hover { transform: scale(1.2); }

    /* Select */
    .ysp-select {
        flex: 2;
        background: var(--ysp-bg);
        border: 1px solid var(--ysp-border);
        color: var(--ysp-text); padding: 10px 12px;
        border-radius: 8px; font-size: 13px;
        cursor: pointer; transition: var(--ysp-transition);
        appearance: none; -webkit-appearance: none;
        background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
        background-repeat: no-repeat;
        background-position: right 12px top 50%;
        background-size: 10px auto;
    }
    .ysp-rtl .ysp-select {
        background-position: left 12px top 50%;
    }
    .ysp-select:hover { border-color: rgba(255,255,255,0.3); }
    .ysp-select:focus { border-color: var(--ysp-accent); }
    .ysp-select option {
        background-color: var(--ysp-bg);
        color: var(--ysp-text);
        padding: 10px;
    }

    /* Color Input */
    .ysp-color-wrap {
        width: 36px; height: 36px; border-radius: 8px;
        overflow: hidden; border: 1px solid var(--ysp-border);
        position: relative; cursor: pointer;
    }
    .ysp-color-input {
        position: absolute; top: -50%; left: -50%;
        width: 200%; height: 200%; border: none; padding: 0; margin: 0; cursor: pointer;
    }

    /* Presets */
    .ysp-presets { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .ysp-preset {
        background: var(--ysp-bg);
        border: 1px solid var(--ysp-border);
        border-radius: var(--ysp-radius);
        padding: 12px; text-align: center;
        cursor: pointer; transition: var(--ysp-transition);
    }
    .ysp-preset:hover { border-color: rgba(255,255,255,0.3); transform: translateY(-2px); }
    .ysp-preset.active { 
        border-color: var(--ysp-accent); 
        background: rgba(255, 0, 51, 0.08);
    }
    .ysp-preset-preview { 
        height: 40px; border-radius: 6px; margin-bottom: 8px; 
        display: flex; align-items: center; justify-content: center; font-size: 16px; 
    }

    /* Switch / Toggle */
    .ysp-switch {
        position: relative; display: inline-block; width: 44px; height: 24px;
    }
    .ysp-switch input { opacity: 0; width: 0; height: 0; }
    .ysp-slider {
        position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
        background-color: rgba(255,255,255,0.1); transition: .4s; border-radius: 24px;
    }
    .ysp-slider:before {
        position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px;
        background-color: white; transition: .4s; border-radius: 50%;
    }
    input:checked + .ysp-slider { background-color: var(--ysp-accent); }
    input:checked + .ysp-slider:before { transform: translateX(20px); }

    /* Templates */
    .ysp-tmpl-input-group { display: flex; gap: 10px; margin-bottom: 16px; }
    .ysp-input-text {
        flex: 1; background: var(--ysp-bg); border: 1px solid var(--ysp-border);
        color: var(--ysp-text); padding: 10px; border-radius: 8px; font-size: 13px;
    }
    .ysp-btn {
        padding: 8px 16px; border-radius: 8px; border: 1px solid var(--ysp-border);
        background: var(--ysp-bg-sec); color: var(--ysp-text); cursor: pointer; font-size: 12px; font-weight: 600;
        transition: var(--ysp-transition);
    }
    .ysp-btn:hover { background: rgba(255,255,255,0.1); }
    .ysp-btn-primary { background: var(--ysp-accent); border-color: var(--ysp-accent); color: white; }
    .ysp-btn-primary:hover { background: #d4002d; }

    .ysp-tmpl-item {
        display: flex; align-items: center; justify-content: space-between;
        background: var(--ysp-bg); border: 1px solid var(--ysp-border);
        border-radius: 8px; padding: 12px; margin-bottom: 8px;
    }
    .ysp-tmpl-item.selected { border-left: 3px solid var(--ysp-accent); background: rgba(255,255,255,0.02); }
    .ysp-tmpl-name { flex: 1; font-size: 13px; }
    .ysp-tmpl-actions { display: flex; gap: 8px; }
    .ysp-tmpl-apply, .ysp-tmpl-del {
        padding: 6px 10px; border-radius: 6px; border: none; cursor: pointer; font-size: 11px; font-weight: 700;
    }
    .ysp-tmpl-apply { background: rgba(255,255,255,0.1); color: white; }
    .ysp-tmpl-del { background: transparent; color: #ff4444; border: 1px solid rgba(255,68,68,0.3); }

    /* UI Lang */
    .ysp-ui-lang { display: flex; border: 1px solid var(--ysp-border); border-radius: 6px; overflow: hidden; margin-left: 12px; }
    .ysp-ui-lang-btn {
        padding: 6px 10px; font-size: 11px; font-weight: 700; color: var(--ysp-text-sec);
        cursor: pointer; background: transparent; transition: var(--ysp-transition);
    }
    .ysp-ui-lang-btn:hover { color: white; }
    .ysp-ui-lang-btn.active { background: rgba(255,255,255,0.1); color: white; }
    
    /* FOOTER */
    .ysp-footer {
        padding: 16px 24px;
        border-top: 1px solid var(--ysp-border);
        background: var(--ysp-bg-sec);
        display: flex; gap: 12px;
    }
    .ysp-footer-btn {
        flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
        padding: 10px; border-radius: 8px;
        text-decoration: none; font-size: 12px; font-weight: 700;
        transition: var(--ysp-transition); border: 1px solid var(--ysp-border);
    }
    .ysp-footer-btn-support { background: rgba(255, 153, 102, 0.1); color: #FF9966; border-color: rgba(255, 153, 102, 0.2); }
    .ysp-footer-btn-support:hover { background: rgba(255, 153, 102, 0.2); transform: translateY(-2px); }
    
    .ysp-footer-btn-rate { background: rgba(79, 172, 254, 0.1); color: #4facfe; border-color: rgba(79, 172, 254, 0.2); }
    .ysp-footer-btn-rate:hover { background: rgba(79, 172, 254, 0.2); transform: translateY(-2px); }

    /* Scrollbar */
    #ysp-panel-container ::-webkit-scrollbar { width: 6px; }
    #ysp-panel-container ::-webkit-scrollbar-track { background: var(--ysp-bg); }
    #ysp-panel-container ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
    #ysp-panel-container ::-webkit-scrollbar-thumb:hover { background: #444; }

    /* Subtitle Overrides */
    .ytp-caption-segment {
        box-decoration-break: clone; -webkit-box-decoration-break: clone;
        display: inline-block; background-clip: padding-box;
        will-change: transform; transform: translateZ(0);
        mix-blend-mode: normal;
        animation: none !important; transition: none !important;
    }
    .caption-window {
        background: transparent !important;
        animation: none !important; transition: none !important;
    }
    /* Hover fix */
    .ytd-video-preview .ytp-caption-segment,
    .ytp-player-content.ytp-video-preview .ytp-caption-segment {
        font-size: 14px !important; padding: 2px 4px !important; bottom: 5% !important;
    }
`;

// --- 4. PANEL HTML TEMPLATE ---

const getPanelHTML = () => `
    <div class="ysp-header">
        <div class="ysp-brand">
            <svg class="ysp-icon" style="color:var(--ysp-accent);" viewBox="0 0 24 24"><path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.86-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" fill="currentColor"/></svg>
            <span>Subtitle</span> Pro
        </div>
        <div style="display:flex; align-items:center;">
            <div class="ysp-ui-lang">
                <div class="ysp-ui-lang-btn active" data-lang="ar">AR</div>
                <div class="ysp-ui-lang-btn" data-lang="en">EN</div>
            </div>
            <button class="ysp-close-btn" id="ysp-close">
                <svg class="ysp-icon" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/></svg>
            </button>
        </div>
    </div>

    <div class="ysp-target-bar">
        <div class="ysp-target-btn active" data-target="ar" data-i18n="targetAr">
            <svg class="ysp-icon" style="width:16px;height:16px;" viewBox="0 0 24 24"><path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.09-.02.67-.02zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" fill="currentColor"/></svg>
            Arabic
        </div>
        <div class="ysp-target-btn" data-target="en" data-i18n="targetEn">
            <svg class="ysp-icon" style="width:16px;height:16px;" viewBox="0 0 24 24"><path d="M7 13v-2h14v2H7zm0 6v-2h14v2H7zM7 7v2h14V7H7zM3 8V5H2V4h2v4h2V4h1v4h-4zm0 11v-4H2v-1h2v4h2v-4h1v5H3z" fill="currentColor"/></svg>
            English
        </div>
    </div>

    <div class="ysp-preview-card">
        <div class="ysp-preview-overlay"></div>
        <div id="ysp-preview-text" class="ysp-preview-text">Preview Text</div>
    </div>

    <div class="ysp-tabs-wrapper">
        <div class="ysp-tabs">
            <div class="ysp-tab active" data-tab="tab-main" data-i18n="tabMain">Main</div>
            <div class="ysp-tab" data-tab="tab-style" data-i18n="tabStyle">Style</div>
            <div class="ysp-tab" data-tab="tab-advanced" data-i18n="tabAdvanced">Advanced</div>
        </div>
    </div>

    <div class="ysp-content">
        <!-- MAIN TAB -->
        <div id="tab-main" class="ysp-tab-content active">
            <div class="ysp-section">
                <div class="ysp-section-title" data-i18n="presets">Presets</div>
                <div class="ysp-presets">
                    <div class="ysp-preset" data-preset="cinema">
                        <div class="ysp-preset-preview" style="background:rgba(0,0,0,0.6); color:white; text-shadow:0 2px 4px black; font-weight:700;">Aa</div>
                        <span data-i18n="presetCinema">Cinema</span>
                    </div>
                    <div class="ysp-preset" data-preset="minimal">
                        <div class="ysp-preset-preview" style="background:transparent; color:white; border:1px dashed #555;">Aa</div>
                        <span data-i18n="presetMinimal">Minimal</span>
                    </div>
                    <div class="ysp-preset" data-preset="contrast">
                        <div class="ysp-preset-preview" style="background:black; color:#ff0; font-weight:900; border:2px solid #ff0;">Aa</div>
                        <span data-i18n="presetContrast">Contrast</span>
                    </div>
                </div>
            </div>

            <div class="ysp-section">
                <div class="ysp-section-title" data-i18n="typography">Typography</div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="fontSize">Size</label>
                    <input type="range" class="ysp-input-range" id="fontSize" min="15" max="80" step="1">
                </div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="bottomPos">Position</label>
                    <input type="range" class="ysp-input-range" id="bottomPos" min="0" max="50" step="1">
                </div>
            </div>

            <div class="ysp-section">
                <div class="ysp-section-title" data-i18n="fullscreenOptions">Fullscreen</div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="fullscreenAssistant">Assistant Icon</label>
                    <label class="ysp-switch">
                        <input type="checkbox" id="fullscreenAssistant">
                        <span class="ysp-slider"></span>
                    </label>
                </div>
            </div>
        </div>

        <!-- STYLE TAB -->
        <div id="tab-style" class="ysp-tab-content">
            <div class="ysp-section">
                <div class="ysp-section-title" data-i18n="typography">Font</div>
                <div class="ysp-row">
                    <select class="ysp-select" id="fontFamily">
                        <option value="'Tajawal', sans-serif" data-i18n="tajawal">Tajawal</option>
                        <option value="'Cairo', sans-serif">Cairo</option>
                        <option value="'Almarai', sans-serif">Almarai</option>
                        <option value="'Noto Kufi Arabic', sans-serif">Noto Kufi</option>
                        <option value="'Roboto', sans-serif" data-i18n="roboto">Roboto</option>
                        <option value="'Open Sans', sans-serif">Open Sans</option>
                        <option value="'Montserrat', sans-serif">Montserrat</option>
                        <option value="'Lato', sans-serif">Lato</option>
                        <option value="'Arial', sans-serif" data-i18n="arial">Arial</option>
                        <option value="'Courier New', monospace" data-i18n="cinema">Cinema</option>
                    </select>
                </div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="fontWeight">Weight</label>
                    <select class="ysp-select" id="fontWeight">
                        <option value="400" data-i18n="normal">Normal</option>
                        <option value="700" data-i18n="bold">Bold</option>
                        <option value="900" data-i18n="black">Heavy</option>
                    </select>
                </div>
            </div>

            <div class="ysp-section">
                <div class="ysp-section-title" data-i18n="appearance">Colors</div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="fontColor">Text Color</label>
                    <div class="ysp-color-wrap"><input type="color" class="ysp-color-input" id="fontColor"></div>
                </div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="strokeColor">Stroke Color</label>
                    <div class="ysp-color-wrap"><input type="color" class="ysp-color-input" id="strokeColor"></div>
                </div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="strokeWidth">Stroke Width</label>
                    <input type="range" class="ysp-input-range" id="strokeWidth" min="0" max="6" step="0.5">
                </div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="strokeOpacity">Stroke Opacity</label>
                    <input type="range" class="ysp-input-range" id="strokeOpacity" min="0" max="100" step="5">
                </div>
            </div>

            <div class="ysp-section">
                <div class="ysp-section-title" data-i18n="appearance">Effects</div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="shadowIntensity">Shadow</label>
                    <input type="range" class="ysp-input-range" id="shadowIntensity" min="0" max="20" step="1">
                </div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="bgOpacity">Background</label>
                    <input type="range" class="ysp-input-range" id="bgOpacity" min="0" max="100" step="5">
                </div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="bgBlur">Blur</label>
                    <input type="range" class="ysp-input-range" id="bgBlur" min="0" max="20" step="1">
                </div>

            </div>
        </div>

        <!-- ADVANCED TAB -->
        <div id="tab-advanced" class="ysp-tab-content">
             <div class="ysp-section">
                <div class="ysp-section-title" data-i18n="customTemplates">Templates</div>
                <div class="ysp-tmpl-input-group">
                    <input type="text" class="ysp-input-text" id="templateNameInput" placeholder="Template Name">
                    <button class="ysp-btn ysp-btn-primary" id="saveTemplateBtn" data-i18n="saveTemplate">Save</button>
                </div>
                <div id="templateMsg" style="font-size:11px; margin-top:5px; min-height:15px; text-align:center;"></div>
                <div id="customTemplatesList"></div>
            </div>

            <div class="ysp-section">
                <div class="ysp-section-title" data-i18n="advanced">Details</div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="supportCustomEffects">Support Custom Subtitles</label>
                    <label class="ysp-switch">
                        <input type="checkbox" id="supportCustomEffects">
                        <span class="ysp-slider"></span>
                    </label>
                </div>
                <div style="font-size:10px; color:#888; margin-bottom:10px;" data-i18n="supportCustomEffectsInfo">Enabling this might override special effects designed by the creator.</div>
                
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="lineHeight">Line Height</label>
                    <input type="range" class="ysp-input-range" id="lineHeight" min="1.0" max="2.0" step="0.05">
                </div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="letterSpacing">Spacing</label>
                    <input type="range" class="ysp-input-range" id="letterSpacing" min="-1" max="10" step="0.5">
                </div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="padding">Padding</label>
                    <input type="range" class="ysp-input-range" id="padding" min="0" max="20" step="1">
                </div>
                 <div class="ysp-row">
                    <label class="ysp-label" data-i18n="borderRadius">Radius</label>
                    <input type="range" class="ysp-input-range" id="borderRadius" min="0" max="20" step="1">
                </div>
                 <div class="ysp-row">
                    <label class="ysp-label" data-i18n="textAlign">Align</label>
                    <select class="ysp-select" id="textAlign">
                        <option value="center" data-i18n="alignCenter">Center</option>
                        <option value="left" data-i18n="alignLeft">Left</option>
                        <option value="right" data-i18n="alignRight">Right</option>
                    </select>
                </div>
                <div style="margin-top:10px; font-size:11px; color:#888; text-align:center;" data-i18n="shortcutInfo">Shortcuts: Alt+S (Settings)</div>
            </div>
            
            <div class="ysp-section">
                <div class="ysp-section-title" data-i18n="actions">Actions</div>
                <button id="resetBtn" class="ysp-btn" style="width:100%; color:#ff4444; border-color:#ff4444;" data-i18n="reset">Reset Defaults</button>
            </div>
        </div>
    </div>

    <!-- FOOTER -->
    <div class="ysp-footer">
        <a href="#" class="ysp-footer-btn ysp-footer-btn-support" id="link-support" target="_blank">
            <svg class="ysp-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" fill="currentColor"/></svg>
            <span data-i18n="supportUs">Support Project</span>
        </a>
        <a href="https://chromewebstore.google.com/detail/youtube-subtitle-pro-cine/clhoadlllpmdeakgigbbbammfapclcfi" class="ysp-footer-btn ysp-footer-btn-rate" target="_blank">
            <svg class="ysp-icon" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="currentColor"/></svg>
            <span data-i18n="rateUs">Rate Extension</span>
        </a>
    </div>
`;

// --- 5. LOGIC: PANEL UI ---

function createPanel() {
    const getIdealParent = () => {
        // If in fullscreen, must append to the fullscreen element to be visible
        if (document.fullscreenElement) return document.fullscreenElement;
        // Otherwise, always append to body to avoid player transforms/clipping
        return document.body;
    };

    if (document.getElementById('ysp-panel-container')) {
        const panel = document.getElementById('ysp-panel-container');
        const idealParent = getIdealParent();
        if (panel.parentElement !== idealParent) {
            idealParent.appendChild(panel);
        }
        return;
    }

    // Inject CSS
    const styleEl = document.createElement('style');
    styleEl.id = 'ysp-panel-styles';
    styleEl.textContent = panelCSS;
    document.head.appendChild(styleEl);

    // Inject Font Link
    if (!document.querySelector('link[href*="fonts.googleapis.com/css2?family=Tajawal"]')) {
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&family=Roboto:wght@400;500;700;900&display=swap';
        document.head.appendChild(fontLink);
    }

    // Inject HTML
    const container = document.createElement('div');
    container.id = 'ysp-panel-container';
    container.innerHTML = getPanelHTML();

    const idealParent = getIdealParent();
    idealParent.appendChild(container);

    bindPanelEvents(container);
    updatePanelTexts(); // Translate
    updatePanelValues(); // Set initial values
}

// Add observer for fullscreen changes to move the panel
document.addEventListener('fullscreenchange', () => {
    const panel = document.getElementById('ysp-panel-container');
    if (panel) {
        // Just call createPanel to trigger parent re-evaluation
        createPanel();
    }
});

function togglePanel() {
    createPanel(); // Ensure exists
    const panel = document.getElementById('ysp-panel-container');
    panelVisible = !panelVisible;
    if (panelVisible) {
        panel.classList.add('ysp-open');

        // Auto-detect current language to set editTarget
        const arWin = document.querySelector('.caption-window.is-arabic');
        const enWin = document.querySelector('.caption-window.is-english');

        if (arWin) editTarget = 'ar';
        else if (enWin) editTarget = 'en';
        // If neither, keep previous or default

        updatePanelValues(); // Refresh with correct target
    } else {
        panel.classList.remove('ysp-open');
    }
}

function closePanel() {
    const panel = document.getElementById('ysp-panel-container');
    if (panel) {
        panelVisible = false;
        panel.classList.remove('ysp-open');
    }
}

function bindPanelEvents(panel) {
    // Prevent YouTube keyboard shortcuts when typing in inputs
    const preventShortcuts = (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
    };
    panel.addEventListener('keydown', preventShortcuts, true);
    panel.addEventListener('keyup', preventShortcuts, true);
    panel.addEventListener('keypress', preventShortcuts, true);

    // Close Button
    panel.querySelector('#ysp-close').addEventListener('click', closePanel);

    // Language Toggle (UI)
    panel.querySelectorAll('.ysp-ui-lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            panel.querySelectorAll('.ysp-ui-lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            uiLang = btn.dataset.lang;
            chrome.storage.local.set({ uiLanguage: uiLang });
            updatePanelTexts();
            updateAllRangeBackgrounds();
            loadCustomTemplates();
        });
    });

    // Target Toggle (What to edit) - NEW BUTTONS
    panel.querySelectorAll('.ysp-target-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            editTarget = btn.dataset.target;
            updatePanelValues(); // Reload inputs
        });
    });

    // Tabs
    panel.querySelectorAll('.ysp-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            panel.querySelectorAll('.ysp-tab').forEach(t => t.classList.remove('active'));
            panel.querySelectorAll('.ysp-tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            panel.querySelector(`#${tab.dataset.tab}`).classList.add('active');
        });
    });

    // Inputs
    const inputs = ['fontSize', 'bottomPos', 'shadowIntensity', 'bgOpacity', 'bgBlur', 'fontFamily', 'fontWeight', 'fontColor', 'strokeColor', 'strokeWidth', 'strokeOpacity', 'lineHeight', 'letterSpacing', 'padding', 'borderRadius', 'textAlign', 'fullscreenAssistant', 'supportCustomEffects'];

    inputs.forEach(id => {
        const el = panel.querySelector(`#${id}`);
        if (!el) return;
        el.addEventListener('input', (e) => {
            let val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

            // Number conversion
            if (e.target.type === 'range') {
                val = parseFloat(val);
                updateRangeBackground(e.target);
            }

            // Special case: Fullscreen Assistant is Global, not per-language
            if (id === 'fullscreenAssistant') {
                showFullscreenAssistant = val;
                chrome.storage.local.set({ fullscreenAssistant: val });
                updateAssistantVisibility();
                return;
            }

            // Save to Cache
            cachedSettings[editTarget][id] = val;

            // Save to Storage (Local for speed/persistence)
            chrome.storage.local.set({ [editTarget]: cachedSettings[editTarget] });

            // Update Realtime
            updateSubtitleStyles(cachedSettings.ar, cachedSettings.en);
            updatePreview();
        });
    });

    // Presets
    panel.querySelectorAll('.ysp-preset').forEach(p => {
        p.addEventListener('click', () => applyPreset(p.dataset.preset));
    });

    // Reset
    panel.querySelector('#resetBtn').addEventListener('click', () => {
        cachedSettings[editTarget] = editTarget === 'ar' ? { ...defaultAr } : { ...defaultEn };
        chrome.storage.local.set({ [editTarget]: cachedSettings[editTarget] });
        updatePanelValues();
        updateSubtitleStyles(cachedSettings.ar, cachedSettings.en);
    });

    // Template Save
    panel.querySelector('#saveTemplateBtn').addEventListener('click', saveCustomTemplate);

    // Template Input Listener for Update State
    const tmplInput = panel.querySelector('#templateNameInput');
    if (tmplInput) {
        tmplInput.addEventListener('input', () => {
            updateSaveButtonState();
        });
    }
}

function updateRangeBackground(el) {
    if (!el || el.type !== 'range') return;
    const min = parseFloat(el.min) || 0;
    const max = parseFloat(el.max) || 100;
    const val = parseFloat(el.value) || 0;
    const percentage = ((val - min) / (max - min)) * 100;

    // Check direction (RTL or LTR)
    // If the panel is in RTL mode, we fill from Right to Left.
    // However, if the slider itself FLIPS (min on right), then 0% is right.
    // Standard CSS linear-gradient(to right, color X%, transparent X%) fills from Left.
    // In RTL (min=right), we want to fill from Right.
    // linear-gradient(to left, color X%, transparent X%) fills from Right.

    const isRTL = uiLang === 'ar';
    const direction = isRTL ? 'to left' : 'to right';

    el.style.background = `linear-gradient(${direction}, var(--ysp-accent) ${percentage}%, rgba(255,255,255,0.1) ${percentage}%)`;
}

function updateAllRangeBackgrounds() {
    const panel = document.getElementById('ysp-panel-container');
    if (!panel) return;
    panel.querySelectorAll('input[type="range"]').forEach(el => {
        updateRangeBackground(el);
    });
}

function updatePanelTexts() {
    const panel = document.getElementById('ysp-panel-container');
    if (!panel) return;

    // Direction
    panel.style.direction = uiLang === 'ar' ? 'rtl' : 'ltr';
    panel.classList.toggle('ysp-rtl', uiLang === 'ar');
    panel.classList.toggle('ysp-ltr', uiLang !== 'ar');
    panel.querySelector('.ysp-brand').style.textAlign = uiLang === 'ar' ? 'right' : 'left';

    // Translate all data-i18n
    panel.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[uiLang][key]) {
            el.textContent = translations[uiLang][key];
        }
    });

    // Update Support Link
    const supportLink = panel.querySelector('#link-support');
    if (supportLink) {
        supportLink.href = uiLang === 'ar' ? 'https://creators.sa/voidksa' : 'https://creators.sa/en/voidksa';
    }

    // Update Preview Text
    const previewText = panel.querySelector('#ysp-preview-text');
    previewText.textContent = uiLang === 'ar' ? 'نص تجريبي' : 'Preview Text';
    previewText.style.direction = uiLang === 'ar' ? 'rtl' : 'ltr';

    // Update Template Input Placeholder
    const tmplInput = panel.querySelector('#templateNameInput');
    if (tmplInput) {
        tmplInput.placeholder = translations[uiLang].templateName;
    }
}

function updatePanelValues() {
    const panel = document.getElementById('ysp-panel-container');
    if (!panel) return;

    const s = cachedSettings[editTarget];

    // Update all inputs
    Object.keys(s).forEach(key => {
        const el = panel.querySelector(`#${key}`);
        if (el) {
            if (el.type === 'checkbox') el.checked = s[key];
            else el.value = s[key];

            // Update range background
            if (el.type === 'range') {
                updateRangeBackground(el);
            }
        }
    });

    // Fullscreen Assistant (Global)
    const fa = panel.querySelector('#fullscreenAssistant');
    if (fa) fa.checked = showFullscreenAssistant;

    // Target Select (Update Active Button)
    panel.querySelectorAll('.ysp-target-btn').forEach(btn => {
        if (btn.dataset.target === editTarget) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    updatePreview();
    loadCustomTemplates(); // Refresh templates list
}

function updatePreview() {
    const panel = document.getElementById('ysp-panel-container');
    if (!panel) return;
    const pt = panel.querySelector('#ysp-preview-text');
    const s = cachedSettings[editTarget];

    pt.style.fontFamily = s.fontFamily.replace(/'/g, "");
    pt.style.fontSize = (s.fontSize * 0.6) + "px"; // Scale for preview
    pt.style.color = s.fontColor;
    pt.style.webkitTextFillColor = s.fontColor;
    pt.style.fontWeight = s.fontWeight;
    const strokeRgba = hexToRgba(s.strokeColor, s.strokeOpacity !== undefined ? s.strokeOpacity : 100);
    pt.style.webkitTextStroke = `${s.strokeWidth}px ${strokeRgba}`;
    pt.style.paintOrder = "stroke fill"; pt.style.webkitPaintOrder = "stroke fill";
    pt.style.textShadow = `0px 0px ${s.shadowIntensity}px rgba(0,0,0,0.8)`;
    pt.style.backgroundColor = `rgba(0,0,0, ${s.bgOpacity / 100})`;
    pt.style.backdropFilter = `blur(${s.bgBlur}px)`; pt.style.webkitBackdropFilter = `blur(${s.bgBlur}px)`;
    pt.style.borderRadius = s.borderRadius + "px";
    pt.style.letterSpacing = (s.letterSpacing || 0) + "px";
    pt.style.lineHeight = s.lineHeight;
}

function applyPreset(type) {
    const base = cachedSettings[editTarget];
    if (type === 'cinema') {
        Object.assign(base, { strokeWidth: 2, shadowIntensity: 6, bgOpacity: 12, fontWeight: 700, borderRadius: 8 });
    } else if (type === 'minimal') {
        Object.assign(base, { strokeWidth: 0, shadowIntensity: 0, bgOpacity: 0, fontWeight: 400 });
    } else if (type === 'contrast') {
        Object.assign(base, { strokeWidth: 3, shadowIntensity: 0, bgOpacity: 100, fontWeight: 900, fontColor: '#ffff00', strokeColor: '#000000' });
    }
    chrome.storage.local.set({ [editTarget]: base });
    updatePanelValues();
    updateSubtitleStyles(cachedSettings.ar, cachedSettings.en);
}

// --- 6. LOGIC: CUSTOM TEMPLATES ---

function loadCustomTemplates() {
    const list = document.getElementById('customTemplatesList');
    if (!list) return;
    list.innerHTML = '';

    if (customTemplates.length === 0) {
        list.innerHTML = `<div style="font-size:12px; color:#666; padding:10px; text-align:center;">${translations[uiLang].noTemplates}</div>`;
        return;
    }

    customTemplates.forEach((tmpl, idx) => {
        const item = document.createElement('div');
        item.className = 'ysp-tmpl-item';
        if (selectedTemplateName === tmpl.name) {
            item.classList.add('selected');
        }

        item.innerHTML = `
            <span class="ysp-tmpl-name">${tmpl.name}</span>
            <div class="ysp-tmpl-actions">
                <button class="ysp-tmpl-apply" title="${translations[uiLang].applyTemplate}">${translations[uiLang].applyTemplate}</button>
                <span class="ysp-tmpl-del" title="${translations[uiLang].deleteTemplate}">✕</span>
            </div>
        `;

        // Select (Click Name)
        item.querySelector('.ysp-tmpl-name').addEventListener('click', () => {
            selectTemplate(tmpl.name);
        });

        // Apply
        item.querySelector('.ysp-tmpl-apply').addEventListener('click', (e) => {
            e.stopPropagation();
            applyTemplate(tmpl);
        });

        // Delete
        item.querySelector('.ysp-tmpl-del').addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm(`${translations[uiLang].deleteTemplate}?`)) {
                deleteTemplate(idx);
            }
        });

        list.appendChild(item);
    });
}

function selectTemplate(name) {
    const tmpl = customTemplates.find(t => t.name === name);
    if (!tmpl) return;

    selectedTemplateName = name;
    cachedSettings.ar = { ...tmpl.ar };
    cachedSettings.en = { ...tmpl.en };

    // Update inputs and preview ONLY (do not save to storage yet)
    // Pass 'skipListUpdate' to avoid recursion if we were calling it inside loadCustomTemplates, 
    // but here we are calling it from event, so it's fine.
    updatePanelValues();

    // Highlight UI is handled by updatePanelValues -> loadCustomTemplates re-render

    // Fill Name Input
    const nameInput = document.getElementById('templateNameInput');
    if (nameInput) nameInput.value = name;

    updateSaveButtonState();
}

function applyTemplate(tmpl) {
    cachedSettings.ar = { ...tmpl.ar };
    cachedSettings.en = { ...tmpl.en };

    // Save and Apply
    chrome.storage.local.set({ ar: cachedSettings.ar, en: cachedSettings.en });

    // Select it as well
    selectedTemplateName = tmpl.name;

    updatePanelValues();
    updateSubtitleStyles(cachedSettings.ar, cachedSettings.en);
    updateSaveButtonState();
}

function deleteTemplate(idx) {
    const deletedName = customTemplates[idx].name;
    customTemplates.splice(idx, 1);
    chrome.storage.local.set({ customTemplates });

    if (selectedTemplateName === deletedName) {
        selectedTemplateName = null;
        const input = document.getElementById('templateNameInput');
        if (input) input.value = '';
        updateSaveButtonState();
    }
    loadCustomTemplates();
}

function updateSaveButtonState() {
    const btn = document.getElementById('saveTemplateBtn');
    const input = document.getElementById('templateNameInput');
    if (!btn || !input) return;

    // Use current input value to check against selected template
    // If input matches selected template name, it's an update
    if (selectedTemplateName && input.value.trim() === selectedTemplateName) {
        btn.textContent = translations[uiLang].updateTemplate;
        btn.classList.add('ysp-btn-primary');
    } else {
        btn.textContent = translations[uiLang].saveTemplate;
        // Keep primary style for save as well, or toggle? 
        // Original was primary. Let's keep it primary.
        btn.classList.add('ysp-btn-primary');
    }
}

let pendingOverwrite = null;

function saveCustomTemplate() {
    const input = document.getElementById('templateNameInput');
    const msg = document.getElementById('templateMsg');
    const name = input.value.trim();

    if (!name) return;

    // Check if we are updating the CURRENTLY SELECTED template
    if (selectedTemplateName && name === selectedTemplateName) {
        const idx = customTemplates.findIndex(t => t.name === name);
        if (idx !== -1) {
            customTemplates[idx] = {
                name: name,
                ar: { ...cachedSettings.ar },
                en: { ...cachedSettings.en }
            };
            chrome.storage.local.set({ customTemplates }, () => {
                msg.textContent = translations[uiLang].templateSaved;
                msg.style.color = '#4caf50';
                loadCustomTemplates();
                setTimeout(() => { if (msg) msg.textContent = ''; }, 3000);
            });
            return;
        }
    }

    // New or Overwrite different name
    const existingIdx = customTemplates.findIndex(t => t.name === name);

    if (existingIdx !== -1) {
        if (pendingOverwrite !== name) {
            msg.textContent = translations[uiLang].templateExists;
            msg.style.color = '#ffcc00';
            pendingOverwrite = name;
            return;
        }
        customTemplates[existingIdx] = {
            name: name,
            ar: { ...cachedSettings.ar },
            en: { ...cachedSettings.en }
        };
    } else {
        customTemplates.push({
            name: name,
            ar: { ...cachedSettings.ar },
            en: { ...cachedSettings.en }
        });
    }

    chrome.storage.local.set({ customTemplates }, () => {
        // If we just saved a new one, select it
        selectedTemplateName = name;

        // Don't clear input if we want to stay in "Update" mode for this template
        // But user might want to create another.
        // Usually save -> clear. But here user said "Update method is hard".
        // If I keep the name, they can keep updating.
        // Let's keep the name in input so they can update immediately if they tweak.
        // input.value = ''; 

        msg.textContent = translations[uiLang].templateSaved;
        msg.style.color = '#4caf50';
        pendingOverwrite = null;

        updateSaveButtonState();
        loadCustomTemplates();

        setTimeout(() => { if (msg) msg.textContent = ''; }, 3000);
    });
}

// --- 7. LOGIC: SUBTITLES (CORE) ---

const styleTag = document.createElement('style');
document.head.appendChild(styleTag);

function hexToRgba(hex, alpha) {
    if (!hex) return 'transparent';
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`;
}

function updateSubtitleStyles(ar, en) {
    // Check if we should skip custom subtitles (videos with special effects)
    // If the user disabled supportCustomEffects and we detect a video with special styling, we skip.
    // However, the request is: "It should work even with custom texts... and can be enabled/disabled".
    // This means if ENABLED, we force our styles. If DISABLED, we let YouTube's custom styles stay.

    // Generate CSS
    const arStroke = hexToRgba(ar.strokeColor, ar.strokeOpacity !== undefined ? ar.strokeOpacity : 100);
    const enStroke = hexToRgba(en.strokeColor, en.strokeOpacity !== undefined ? en.strokeOpacity : 100);

    const css = `
        /* Hide default YouTube settings to avoid conflict */
        .ytp-settings-menu .ytp-panel-header, .ytp-button[aria-label="Options"] { display: none !important; }

        /* General Segment Reset (with Fallbacks) */
        .ytp-caption-segment {
            box-decoration-break: clone; -webkit-box-decoration-break: clone;
            display: inline !important; background-clip: padding-box;
            will-change: transform; transform: translateZ(0);
            mix-blend-mode: normal !important; unicode-bidi: plaintext;
            direction: inherit; white-space: pre-wrap;
            overflow-wrap: anywhere; word-break: normal;
            max-width: 88vw; margin: 0 !important;
            transition: none !important; animation: none !important;
            opacity: 1 !important;
        }

        /* YouTube Preview Fix (Hover Thumbnails) - STRICT OVERRIDE */
        .ytp-inline-preview-ui .ytp-caption-segment,
        .ytp-video-preview .ytp-caption-segment,
        .ytd-video-preview .ytp-caption-segment,
        .ytp-inline-preview-ui .caption-window .ytp-caption-segment,
        .ytp-video-preview .caption-window .ytp-caption-segment {
            font-size: 12px !important;
            line-height: 1.2 !important;
            font-family: Roboto, Arial, sans-serif !important;
            font-weight: 500 !important;
            color: #fff !important;
            -webkit-text-fill-color: #fff !important;
            text-shadow: 0 0 4px rgba(0,0,0,0.8) !important;
            background: rgba(0,0,0,0.6) !important;
            backdrop-filter: none !important; -webkit-backdrop-filter: none !important;
            padding: 2px 6px !important;
            border-radius: 4px !important;
            margin: 0 !important;
            text-stroke: 0 !important; -webkit-text-stroke: 0 !important;
            letter-spacing: 0 !important;
            transform: none !important;
            bottom: auto !important;
            white-space: pre-wrap !important;
        }

        /* Smart Merge: Apply Font & Size to custom segments ONLY if they are active and support is enabled */
        /* Standard segments are handled below by :not(.ytp-custom-active) */
        ${ar.supportCustomEffects ? `
        .is-arabic .ytp-caption-segment.ytp-custom-active {
            font-family: ${ar.fontFamily} !important;
            font-size: ${ar.fontSize}px !important;
            font-weight: ${ar.fontWeight} !important;
            line-height: ${ar.lineHeight} !important;
        }
        ` : ''}
        ${en.supportCustomEffects ? `
        .is-english .ytp-caption-segment.ytp-custom-active {
            font-family: ${en.fontFamily} !important;
            font-size: ${en.fontSize}px !important;
            font-weight: ${en.fontWeight} !important;
            line-height: ${en.lineHeight} !important;
        }
        ` : ''}
        
        /* Caption Window Reset */
        .caption-window, .ytp-caption-window-container, .ytp-caption-window {
            position: absolute !important;
            left: 0 !important;
            right: 0 !important;
            margin: 0 auto !important;
            width: 100% !important;
            background: transparent !important; 
            pointer-events: none !important;
            overflow: visible !important;
        }

        /* Ensure Bottom Position works - only for standard subtitles to avoid breaking creator layouts */
        .is-arabic.caption-window:not(.has-custom-subtitles), 
        .is-arabic.ytp-caption-window-container:not(.has-custom-subtitles), 
        .is-arabic.ytp-caption-window:not(.has-custom-subtitles) {
            bottom: ${ar.bottomPos}% !important;
            top: auto !important;
        }
        .is-arabic.caption-window, .is-arabic.ytp-caption-window-container, .is-arabic.ytp-caption-window {
            text-align: ${ar.textAlign || 'center'} !important;
            direction: rtl !important;
        }

        .is-english.caption-window:not(.has-custom-subtitles), 
        .is-english.ytp-caption-window-container:not(.has-custom-subtitles), 
        .is-english.ytp-caption-window:not(.has-custom-subtitles) {
            bottom: ${en.bottomPos}% !important;
            top: auto !important;
        }
        .is-english.caption-window, .is-english.ytp-caption-window-container, .is-english.ytp-caption-window {
            text-align: ${en.textAlign || 'center'} !important;
        }

        /* Segment Styling */
        .ytp-caption-segment {
            display: inline !important;
            margin: 0 !important;
        }

        /* Animation Keyframes - REMOVED */

        /* Standard Subtitles (Apply always if not custom or if custom support is off) */
        .is-arabic .ytp-caption-segment:not(.ytp-custom-active) {
            font-family: ${ar.fontFamily} !important;
            font-size: ${ar.fontSize}px !important;
            color: ${ar.fontColor} !important;
            -webkit-text-fill-color: ${ar.fontColor} !important;
            font-weight: ${ar.fontWeight} !important;
            background-color: rgba(0,0,0, ${ar.bgOpacity / 100}) !important;
            backdrop-filter: blur(${ar.bgBlur}px) !important; -webkit-backdrop-filter: blur(${ar.bgBlur}px) !important;
            -webkit-text-stroke: ${ar.strokeWidth}px ${arStroke} !important;
            -webkit-paint-order: stroke fill !important; paint-order: stroke fill !important;
            text-shadow: 0px 0px ${ar.shadowIntensity}px rgba(0,0,0,0.8) !important;
            line-height: calc(${ar.lineHeight}em + ${ar.padding}px) !important;
            letter-spacing: ${ar.letterSpacing}px !important;
            word-spacing: ${ar.letterSpacing}px !important;
            font-variant-ligatures: none !important;
            font-feature-settings: "liga" 0 !important;
            padding: ${ar.padding}px 0px !important;
            border-radius: ${ar.borderRadius}px !important;
            transform: none !important;
        }

        .is-english .ytp-caption-segment:not(.ytp-custom-active) {
            font-family: ${en.fontFamily} !important;
            font-size: ${en.fontSize}px !important;
            color: ${en.fontColor} !important;
            -webkit-text-fill-color: ${en.fontColor} !important;
            font-weight: ${en.fontWeight} !important;
            background-color: rgba(0,0,0, ${en.bgOpacity / 100}) !important;
            backdrop-filter: blur(${en.bgBlur}px) !important; -webkit-backdrop-filter: blur(${en.bgBlur}px) !important;
            -webkit-text-stroke: ${en.strokeWidth}px ${enStroke} !important;
            -webkit-paint-order: stroke fill !important; paint-order: stroke fill !important;
            text-shadow: 0px 0px ${en.shadowIntensity}px rgba(0,0,0,0.8) !important;
            line-height: calc(${en.lineHeight}em + ${en.padding}px) !important;
            letter-spacing: ${en.letterSpacing}px !important;
            padding: ${en.padding}px 0px !important;
            border-radius: ${en.borderRadius}px !important;
            transform: none !important;
        }

        /* Smart Merge for Custom Subtitles (Only if enabled) */
        ${ar.supportCustomEffects ? `
        .is-arabic .ytp-caption-segment.ytp-custom-active {
            font-family: ${ar.fontFamily} !important;
            font-size: ${ar.fontSize}px !important;
            font-weight: ${ar.fontWeight} !important;
            line-height: calc(${ar.lineHeight}em + ${ar.padding}px) !important;
            letter-spacing: ${ar.letterSpacing}px !important;
            padding: ${ar.padding}px 0px !important;
        }
        ` : ''}
        ${en.supportCustomEffects ? `
        .is-english .ytp-caption-segment.ytp-custom-active {
            font-family: ${en.fontFamily} !important;
            font-size: ${en.fontSize}px !important;
            font-weight: ${en.fontWeight} !important;
            line-height: calc(${en.lineHeight}em + ${en.padding}px) !important;
            letter-spacing: ${en.letterSpacing}px !important;
            padding: ${en.padding}px 0px !important;
        }
        ` : ''}

        /* YouTube Preview Fix (Hover Thumbnails) - STRICT OVERRIDE */
        /* Must be LAST to override specific language settings */
        .ytp-inline-preview-ui .ytp-caption-segment,
        .ytp-video-preview .ytp-caption-segment,
        .ytd-video-preview .ytp-caption-segment,
        .ytp-inline-preview-ui .caption-window .ytp-caption-segment,
        .ytp-video-preview .caption-window .ytp-caption-segment,
        .ytp-tooltip .ytp-caption-segment,
        .ytp-storyboard .ytp-caption-segment {
            font-size: 11px !important;
            line-height: 1.2 !important;
            font-family: Roboto, Arial, sans-serif !important;
            font-weight: 500 !important;
            color: #fff !important;
            -webkit-text-fill-color: #fff !important;
            text-shadow: 0 0 4px rgba(0,0,0,0.8) !important;
            background: rgba(0,0,0,0.6) !important;
            backdrop-filter: none !important; -webkit-backdrop-filter: none !important;
            padding: 2px 6px !important;
            border-radius: 4px !important;
            margin: 0 !important;
            text-stroke: 0 !important; -webkit-text-stroke: 0 !important;
            letter-spacing: 0 !important;
            transform: none !important;
            bottom: auto !important;
            white-space: pre-wrap !important;
            width: auto !important;
            position: relative !important;
            left: auto !important;
        }
    `;
    styleTag.innerHTML = css;
}

function detectLanguage() {
    const windows = document.querySelectorAll('.caption-window, .ytp-caption-window-container, .ytp-caption-window');
    windows.forEach(win => {
        const segments = win.querySelectorAll('.ytp-caption-segment');

        // Detect if subtitles have custom creator-made styles
        let hasCustomStyles = false;
        segments.forEach(s => {
            const style = s.getAttribute('style');
            if (style) {
                // Look for things that AREN'T default YouTube styles
                // Default styles usually have white text (255,255,255) and blackish bg (8,8,8)
                const isCustomColor = style.includes('color') && !style.includes('255, 255, 255') && !style.includes('white');
                const isCustomBg = style.includes('background') && !style.includes('rgba(8, 8, 8') && !style.includes('rgba(0, 0, 0');
                const hasShadow = style.includes('text-shadow');
                const hasCustomFont = style.includes('font-family') && !style.includes('Roboto') && !style.includes('YouTube Noto');
                const hasPosition = style.includes('left:') || style.includes('top:');

                if (isCustomColor || isCustomBg || hasShadow || hasCustomFont || hasPosition) {
                    hasCustomStyles = true;
                    s.classList.add('ytp-custom-active');
                } else {
                    s.classList.remove('ytp-custom-active');
                }
            } else {
                s.classList.remove('ytp-custom-active');
            }
        });

        if (hasCustomStyles) {
            win.classList.add('has-custom-subtitles');
        } else {
            win.classList.remove('has-custom-subtitles');
        }

        let fullText = "";
        segments.forEach(s => fullText += s.innerText + " ");
        if (segments.length === 0) fullText = win.innerText;

        const hasArabic = /[\u0600-\u06FF]/.test(fullText);
        const hasEnglish = /[a-zA-Z]/.test(fullText);

        if (hasArabic) {
            if (!win.classList.contains('is-arabic')) {
                win.classList.add('is-arabic');
                win.classList.remove('is-english');
                win.dir = "rtl";
            }
        } else if (hasEnglish) {
            if (!win.classList.contains('is-english')) {
                win.classList.add('is-english');
                win.classList.remove('is-arabic');
                win.dir = "ltr";
            }
        } else {
            // Neutral (Numbers/Symbols)
            if (!win.classList.contains('is-arabic') && !win.classList.contains('is-english')) {
                if (editTarget === 'ar') {
                    win.classList.add('is-arabic');
                    win.dir = "rtl";
                } else {
                    win.classList.add('is-english');
                    win.dir = "ltr";
                }
            }
        }
    });
}

const observer = new MutationObserver(() => detectLanguage());

function changeFontSize(delta) {
    const s = cachedSettings[editTarget];
    const newSize = (parseInt(s.fontSize) || 30) + delta;
    s.fontSize = Math.max(10, Math.min(80, newSize));
    chrome.storage.local.set({ [editTarget]: s });
    updateSubtitleStyles(cachedSettings.ar, cachedSettings.en);
    updatePanelValues();
}

// --- 8. SHORTCUTS ---

function initShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (!e.altKey) return;

        // Toggle Panel: Alt + S
        if (e.code === 'KeyS') {
            e.preventDefault();
            e.stopPropagation(); // Prevent other extensions from capturing this
            togglePanel();
        }

        // Font Size Up: Alt + ArrowUp
        if (e.code === 'ArrowUp') {
            e.preventDefault();
            e.stopPropagation();
            changeFontSize(2);
        }

        // Font Size Down: Alt + ArrowDown
        if (e.code === 'ArrowDown') {
            e.preventDefault();
            e.stopPropagation();
            changeFontSize(-2);
        }
    }, true); // Use capture phase to intercept before other extensions
}



// --- 9. INITIALIZATION ---

function init() {
    // Load Settings local
    chrome.storage.local.get(['ar', 'en', 'uiLanguage', 'fullscreenAssistant', 'customTemplates'], (res) => {
        // Deep merge for AR
        if (res.ar) {
            cachedSettings.ar = { ...defaultAr, ...res.ar };
            // Ensure new properties are set if missing from old storage
            ['letterSpacing', 'strokeOpacity', 'bgBlur', 'textAlign', 'supportCustomEffects'].forEach(k => {
                if (cachedSettings.ar[k] === undefined) cachedSettings.ar[k] = defaultAr[k];
            });
        }

        // Deep merge for EN
        if (res.en) {
            cachedSettings.en = { ...defaultEn, ...res.en };
            ['letterSpacing', 'strokeOpacity', 'bgBlur', 'textAlign', 'supportCustomEffects'].forEach(k => {
                if (cachedSettings.en[k] === undefined) cachedSettings.en[k] = defaultEn[k];
            });
        }

        if (res.uiLanguage) uiLang = res.uiLanguage;
        if (res.customTemplates) customTemplates = res.customTemplates;
        if (res.fullscreenAssistant !== undefined) showFullscreenAssistant = res.fullscreenAssistant;

        updateSubtitleStyles(cachedSettings.ar, cachedSettings.en);
        updateAssistantVisibility();

        // If panel is already open (rare on reload), update it
        if (document.getElementById('ysp-panel-container')) {
            updatePanelValues();
            updatePanelTexts();
        }
    });

    initShortcuts();

    // Start Observer
    const target = document.getElementById('movie_player') || document.body;
    observer.observe(target, { childList: true, subtree: true, characterData: true });

    // Listen for Background Messages
    chrome.runtime.onMessage.addListener((msg) => {
        if (msg.action === "togglePanel") togglePanel();
        if (msg.action === "fontSizeUp") changeFontSize(2);
        if (msg.action === "fontSizeDown") changeFontSize(-2);
    });

    // Auto-Close on Play
    const video = document.querySelector('video');
    if (video) {
        video.addEventListener('play', () => {
            if (panelVisible) closePanel();
        });
    }
}

// --- 9. FULLSCREEN ASSISTANT (Mini Button) ---
let fsButton = null;

function createAssistantUI() {
    if (fsButton) return;
    const player = document.getElementById('movie_player');
    if (!player) return;

    fsButton = document.createElement('div');
    fsButton.className = 'ysp-fs-assist ysp-hidden';
    fsButton.textContent = '🎬';
    fsButton.title = 'Open Subtitle Pro Settings';
    fsButton.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePanel();
    });
    player.appendChild(fsButton);
}

function updateAssistantVisibility() {
    createAssistantUI();
    const isFs = !!document.fullscreenElement;
    if (fsButton) {
        if (showFullscreenAssistant && isFs) fsButton.classList.remove('ysp-hidden');
        else fsButton.classList.add('ysp-hidden');
    }
}

document.addEventListener('fullscreenchange', updateAssistantVisibility);

// Run Init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
