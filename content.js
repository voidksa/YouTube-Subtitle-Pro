
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
        closePanel: "إغلاق"
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
        closePanel: "Close"
    }
};

const defaultAr = { fontSize: 38, fontColor: '#ffffff', fontFamily: "'Tajawal', sans-serif", shadowIntensity: 4, fontWeight: 700, bottomPos: 10, bgOpacity: 0, bgBlur: 0, strokeColor: '#000000', strokeWidth: 1, strokeOpacity: 100, lineHeight: 1.25, letterSpacing: 0, padding: 8, borderRadius: 6, textAlign: 'center' };
const defaultEn = { fontSize: 32, fontColor: '#ffffff', fontFamily: "'Roboto', sans-serif", shadowIntensity: 4, fontWeight: 700, bottomPos: 10, bgOpacity: 0, bgBlur: 0, strokeColor: '#000000', strokeWidth: 1, strokeOpacity: 100, lineHeight: 1.25, letterSpacing: 0, padding: 8, borderRadius: 6, textAlign: 'center' };

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
    @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&family=Roboto:wght@400;500;700;900&display=swap');

    #ysp-panel-container {
        --ysp-primary: #ff3b30;
        --ysp-primary-hover: #ff5b4d;
        --ysp-bg: #0b0b0f;
        --ysp-surface: #16161a;
        --ysp-surface-hover: #1e1e24;
        --ysp-text: #ffffff;
        --ysp-text-muted: #c5c7d0;
        --ysp-border: #2a2a31;
        --ysp-radius: 12px;
        --ysp-shadow: 0 6px 16px rgba(0, 0, 0, 0.45);
        --ysp-font-ar: 'Tajawal', sans-serif;
        --ysp-font-en: 'Roboto', sans-serif;
        
        position: fixed;
        top: 0;
        right: -420px; /* Hidden by default */
        width: 400px;
        height: 100vh;
        background-color: var(--ysp-bg);
        color: var(--ysp-text);
        z-index: 2147483647; /* Max Z-Index */
        box-shadow: -5px 0 20px rgba(0,0,0,0.5);
        transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        font-family: var(--ysp-font-ar);
        display: flex;
        flex-direction: column;
        direction: rtl; /* Default, will be toggled */
        font-size: 14px;
        line-height: 1.5;
    }

    #ysp-panel-container.ysp-open {
        right: 0;
    }

    #ysp-panel-container * {
        box-sizing: border-box;
        font-family: inherit;
    }

    /* Header */
    .ysp-header {
        background: linear-gradient(180deg, rgba(22, 22, 26, 1) 0%, rgba(18, 18, 22, 0.96) 100%);
        padding: 16px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--ysp-border);
    }

    .ysp-brand {
        font-weight: 800;
        font-size: 16px;
        color: white;
    }
    .ysp-brand span { color: var(--ysp-primary); }

    .ysp-close-btn {
        background: transparent;
        border: none;
        color: var(--ysp-text-muted);
        cursor: pointer;
        font-size: 20px;
        padding: 4px;
        display: flex;
        align-items: center;
    }
    .ysp-close-btn:hover { color: white; }

    /* Lang Toggle (UI Language) */
    .ysp-ui-lang {
        display: flex;
        background: rgba(255, 255, 255, 0.06);
        border-radius: 20px;
        padding: 2px;
        margin-left: 10px;
        margin-right: 10px;
    }
    .ysp-ui-lang-btn {
        padding: 4px 10px;
        font-size: 11px;
        font-weight: 700;
        cursor: pointer;
        border-radius: 16px;
        color: var(--ysp-text-muted);
        transition: 0.2s;
    }
    .ysp-ui-lang-btn.active {
        background: var(--ysp-text);
        color: var(--ysp-bg);
    }

    /* Target Switcher (What are we editing?) */
    .ysp-target-switch {
        background: var(--ysp-surface);
        padding: 12px 20px;
        border-bottom: 1px solid var(--ysp-border);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
    }
    .ysp-target-label {
        font-size: 12px;
        color: var(--ysp-text-muted);
    }
    .ysp-target-select {
        flex: 1;
        background: var(--ysp-surface-hover);
        border: 1px solid var(--ysp-border);
        color: var(--ysp-text);
        padding: 6px;
        border-radius: 6px;
        font-size: 12px;
        outline: none;
        cursor: pointer;
    }

    /* Preview */
    .ysp-preview {
        height: 120px;
        background: #000;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-bottom: 1px solid var(--ysp-border);
        background-image: url('https://raw.githubusercontent.com/voidksa/YouTube-Subtitle-Pro/main/assets/preview_bg.jpg');
        background-size: cover;
    }
    .ysp-preview-overlay {
        position: absolute; inset: 0; background: rgba(0,0,0,0.4);
    }
    .ysp-preview-text {
        z-index: 10;
        max-width: 90%;
        white-space: pre-wrap;
    }

    /* Tabs */
    .ysp-tabs {
        display: flex;
        background: var(--ysp-surface);
        border-bottom: 1px solid var(--ysp-border);
    }
    .ysp-tab {
        flex: 1;
        text-align: center;
        padding: 12px;
        cursor: pointer;
        font-size: 13px;
        color: var(--ysp-text-muted);
        border-bottom: 2px solid transparent;
        transition: 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
    }
    .ysp-tab:hover { color: white; }
    .ysp-tab.active {
        color: var(--ysp-primary);
        border-bottom-color: var(--ysp-primary);
        font-weight: 700;
    }

    /* Content Area */
    .ysp-content {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
    }
    .ysp-tab-content { display: none; animation: yspFadeIn 0.3s; }
    .ysp-tab-content.active { display: block; }

    @keyframes yspFadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

    /* Controls */
    .ysp-section {
        background: var(--ysp-surface);
        border: 1px solid var(--ysp-border);
        border-radius: 8px;
        padding: 12px;
        margin-bottom: 16px;
    }
    .ysp-section-title {
        font-size: 11px;
        text-transform: uppercase;
        color: var(--ysp-text-muted);
        margin-bottom: 12px;
        font-weight: 700;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        padding-bottom: 6px;
    }
    .ysp-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
        gap: 12px;
    }
    .ysp-row:last-child { margin-bottom: 0; }
    
    .ysp-label { font-size: 13px; flex: 1; }
    
    .ysp-input-range {
        flex: 2;
        -webkit-appearance: none;
        height: 6px;
        background: var(--ysp-surface-hover);
        border-radius: 3px;
        outline: none;
    }
    .ysp-input-range::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 16px;
        height: 16px;
        background: var(--ysp-primary);
        border-radius: 50%;
        cursor: pointer;
        transition: transform 0.1s;
    }
    .ysp-input-range::-webkit-slider-thumb:hover { transform: scale(1.2); }

    .ysp-select {
        flex: 2;
        background: var(--ysp-surface-hover);
        border: 1px solid var(--ysp-border);
        color: white;
        padding: 6px;
        border-radius: 4px;
        outline: none;
    }

    .ysp-color-wrap {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid var(--ysp-border);
        position: relative;
    }
    .ysp-color-input {
        position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; cursor: pointer; border: none; padding: 0;
    }

    /* Presets */
    .ysp-presets { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .ysp-preset {
        background: var(--ysp-surface-hover);
        border: 1px solid var(--ysp-border);
        border-radius: 6px;
        padding: 10px 4px;
        text-align: center;
        cursor: pointer;
        transition: 0.2s;
    }
    .ysp-preset:hover { border-color: var(--ysp-text-muted); }
    .ysp-preset.active { border-color: var(--ysp-primary); background: rgba(255, 59, 48, 0.1); }
    .ysp-preset-preview {
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 6px;
        border-radius: 4px;
        font-size: 14px;
    }

    /* Templates */
    .ysp-tmpl-input-group { display: flex; gap: 8px; margin-bottom: 10px; }
    .ysp-input-text { flex: 1; background: var(--ysp-surface-hover); border: 1px solid var(--ysp-border); color: white; padding: 6px; border-radius: 4px; }
    .ysp-btn {
        background: var(--ysp-surface-hover); border: 1px solid var(--ysp-border); color: var(--ysp-text);
        padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; transition: 0.2s;
    }
    .ysp-btn:hover { background: var(--ysp-surface); border-color: white; }
    .ysp-btn-primary { background: var(--ysp-primary); color: white; border: none; }
    .ysp-btn-primary:hover { background: var(--ysp-primary-hover); }
    
    .ysp-tmpl-item {
        display: flex; justify-content: space-between; align-items: center;
        background: var(--ysp-surface-hover); padding: 8px; margin-bottom: 6px; border-radius: 4px;
        border: 1px solid transparent; transition: border-color 0.2s, background 0.2s;
    }
    .ysp-tmpl-item.selected {
        border-color: var(--ysp-primary);
        background: rgba(255, 59, 48, 0.1);
    }
    .ysp-tmpl-name { cursor: pointer; flex: 1; font-size: 13px; }
    .ysp-tmpl-actions { display: flex; gap: 6px; align-items: center; }
    .ysp-tmpl-apply {
        background: var(--ysp-primary); color: white; border: none;
        padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px;
    }
    .ysp-tmpl-apply:hover { background: var(--ysp-primary-hover); }
    .ysp-tmpl-del { color: #ff4444; cursor: pointer; padding: 4px; font-size: 14px; }
    .ysp-tmpl-del:hover { color: #ff6666; }

    /* Switch */
    .ysp-switch { position: relative; display: inline-block; width: 34px; height: 18px; }
    .ysp-switch input { opacity: 0; width: 0; height: 0; }
    .ysp-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: var(--ysp-surface-hover); transition: .4s; border-radius: 34px; }
    .ysp-slider:before { position: absolute; content: ""; height: 12px; width: 12px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
    input:checked + .ysp-slider { background-color: var(--ysp-primary); }
    input:checked + .ysp-slider:before { transform: translateX(16px); }

    /* Scrollbar */
    #ysp-panel-container ::-webkit-scrollbar { width: 5px; }
    #ysp-panel-container ::-webkit-scrollbar-track { background: transparent; }
    #ysp-panel-container ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }

    /* Fullscreen Assistant Button */
    .ysp-fs-assist {
        position: absolute; top: 24px; right: 24px; width: 44px; height: 44px;
        border-radius: 12px; background: linear-gradient(180deg, #ff3b30, #ff5b4d);
        color: #fff; display: flex; align-items: center; justify-content: center;
        font-size: 18px; z-index: 6000; cursor: pointer;
        box-shadow: 0 8px 22px rgba(0,0,0,0.45); border: 1px solid rgba(255,255,255,0.2);
        transition: transform 0.2s ease, filter 0.2s ease;
        backdrop-filter: saturate(1.2);
    }
    .ysp-fs-assist:hover { transform: translateY(-1px); filter: brightness(1.1); }
    .ysp-hidden { display: none !important; }

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
`;

// --- 4. PANEL HTML TEMPLATE ---

const getPanelHTML = () => `
    <div class="ysp-header">
        <div class="ysp-brand"><span>YouTube</span> Subtitle Pro</div>
        <div style="display:flex; align-items:center;">
            <div class="ysp-ui-lang">
                <div class="ysp-ui-lang-btn active" data-lang="ar">AR</div>
                <div class="ysp-ui-lang-btn" data-lang="en">EN</div>
            </div>
            <button class="ysp-close-btn" id="ysp-close">✕</button>
        </div>
    </div>

    <div class="ysp-target-switch">
        <span class="ysp-target-label" data-i18n="editingTarget">Editing Settings For:</span>
        <select class="ysp-target-select" id="ysp-edit-target">
            <option value="ar" data-i18n="targetAr">Arabic Subtitles</option>
            <option value="en" data-i18n="targetEn">English Subtitles</option>
        </select>
    </div>

    <div class="ysp-preview">
        <div class="ysp-preview-overlay"></div>
        <div id="ysp-preview-text" class="ysp-preview-text">Preview Text</div>
    </div>

    <div class="ysp-tabs">
        <div class="ysp-tab active" data-tab="tab-main" data-i18n="tabMain">Main</div>
        <div class="ysp-tab" data-tab="tab-style" data-i18n="tabStyle">Style</div>
        <div class="ysp-tab" data-tab="tab-advanced" data-i18n="tabAdvanced">Advanced</div>
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
                    <input type="range" class="ysp-input-range" id="fontSize" min="15" max="80">
                </div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="bottomPos">Position</label>
                    <input type="range" class="ysp-input-range" id="bottomPos" min="0" max="50">
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
                        <option value="'Roboto', sans-serif" data-i18n="roboto">Roboto</option>
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
                    <input type="range" class="ysp-input-range" id="strokeWidth" min="0" max="6">
                </div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="strokeOpacity">Stroke Opacity</label>
                    <input type="range" class="ysp-input-range" id="strokeOpacity" min="0" max="100">
                </div>
            </div>

            <div class="ysp-section">
                <div class="ysp-section-title" data-i18n="appearance">Effects</div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="shadowIntensity">Shadow</label>
                    <input type="range" class="ysp-input-range" id="shadowIntensity" min="0" max="20">
                </div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="bgOpacity">Background</label>
                    <input type="range" class="ysp-input-range" id="bgOpacity" min="0" max="100">
                </div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="bgBlur">Blur</label>
                    <input type="range" class="ysp-input-range" id="bgBlur" min="0" max="20">
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
                    <label class="ysp-label" data-i18n="lineHeight">Line Height</label>
                    <input type="range" class="ysp-input-range" id="lineHeight" min="1.0" max="2.0" step="0.05">
                </div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="letterSpacing">Spacing</label>
                    <input type="range" class="ysp-input-range" id="letterSpacing" min="-1" max="10" step="0.1">
                </div>
                <div class="ysp-row">
                    <label class="ysp-label" data-i18n="padding">Padding</label>
                    <input type="range" class="ysp-input-range" id="padding" min="0" max="20">
                </div>
                 <div class="ysp-row">
                    <label class="ysp-label" data-i18n="borderRadius">Radius</label>
                    <input type="range" class="ysp-input-range" id="borderRadius" min="0" max="20">
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
`;

// --- 5. LOGIC: PANEL UI ---

function createPanel() {
    if (document.getElementById('ysp-panel-container')) return;

    // Inject CSS
    const styleEl = document.createElement('style');
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
    document.body.appendChild(container);

    bindPanelEvents(container);
    updatePanelTexts(); // Translate
    updatePanelValues(); // Set initial values

    // Default Edit Target to match current detected or fallback
    // We keep editTarget default 'ar' unless changed
}

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
        });
    });

    // Target Toggle (What to edit)
    const targetSelect = panel.querySelector('#ysp-edit-target');
    targetSelect.addEventListener('change', (e) => {
        editTarget = e.target.value;
        updatePanelValues(); // Reload inputs with new target settings
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
    const inputs = ['fontSize', 'bottomPos', 'shadowIntensity', 'bgOpacity', 'bgBlur', 'fontFamily', 'fontWeight', 'fontColor', 'strokeColor', 'strokeWidth', 'strokeOpacity', 'lineHeight', 'letterSpacing', 'padding', 'borderRadius', 'textAlign', 'fullscreenAssistant'];

    inputs.forEach(id => {
        const el = panel.querySelector(`#${id}`);
        if (!el) return;
        el.addEventListener('input', (e) => {
            let val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

            // Number conversion
            if (e.target.type === 'range') {
                val = parseFloat(val);
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

function updatePanelTexts() {
    const panel = document.getElementById('ysp-panel-container');
    if (!panel) return;

    // Direction
    panel.style.direction = uiLang === 'ar' ? 'rtl' : 'ltr';
    panel.querySelector('.ysp-brand').style.textAlign = uiLang === 'ar' ? 'right' : 'left';

    // Translate all data-i18n
    panel.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[uiLang][key]) {
            el.textContent = translations[uiLang][key];
        }
    });

    // Update Preview Text
    const previewText = panel.querySelector('#ysp-preview-text');
    previewText.textContent = uiLang === 'ar' ? 'نص تجريبي' : 'Preview Text';
    previewText.style.direction = uiLang === 'ar' ? 'rtl' : 'ltr';
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
        }
    });

    // Fullscreen Assistant (Global)
    const fa = panel.querySelector('#fullscreenAssistant');
    if (fa) fa.checked = showFullscreenAssistant;

    // Target Select
    const ts = panel.querySelector('#ysp-edit-target');
    if (ts) ts.value = editTarget;

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
    // Safety checks for values
    ar.fontSize = parseInt(ar.fontSize) || 38;
    en.fontSize = parseInt(en.fontSize) || 32;

    // Fallbacks for new properties
    ar.letterSpacing = (parseFloat(ar.letterSpacing) || 0);
    en.letterSpacing = (parseFloat(en.letterSpacing) || 0);
    ar.bgBlur = (parseInt(ar.bgBlur) || 0);
    en.bgBlur = (parseInt(en.bgBlur) || 0);

    // Generate CSS
    const arStroke = hexToRgba(ar.strokeColor, ar.strokeOpacity !== undefined ? ar.strokeOpacity : 100);
    const enStroke = hexToRgba(en.strokeColor, en.strokeOpacity !== undefined ? en.strokeOpacity : 100);

    const css = `
        /* Hide default YouTube settings to avoid conflict */
        .ytp-settings-menu .ytp-panel-header, .ytp-button[aria-label="Options"] { display: none !important; }

        /* General Segment Reset (with Fallbacks) */
        .ytp-caption-segment {
            box-decoration-break: clone; -webkit-box-decoration-break: clone;
            display: inline-block; background-clip: padding-box;
            will-change: transform; transform: translateZ(0);
            mix-blend-mode: normal !important; unicode-bidi: plaintext;
            direction: inherit; white-space: pre-wrap;
            overflow-wrap: anywhere; word-break: normal;
            max-width: 88vw; margin: 0.25em 0.35em;
            transition: none !important; animation: none !important;
            opacity: 1 !important;
            
            /* Fallback visibility */
            color: #ffffff !important;
            font-family: 'Roboto', sans-serif !important;
            font-size: 24px !important;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.8) !important;
        }
        
        /* Caption Window Reset */
        .caption-window, .ytp-caption-window-container {
            position: absolute !important; left: 0 !important; right: 0 !important;
            margin: 0 auto !important; width: 100% !important;
            background: transparent !important; pointer-events: none !important;
            overflow: visible !important;
            animation: none !important; transition: none !important; transform: none !important;
        }

        /* ARABIC STYLES */
        .is-arabic .ytp-caption-segment {
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
            line-height: ${ar.lineHeight} !important;
            letter-spacing: ${ar.letterSpacing}px !important;
            word-spacing: ${ar.letterSpacing}px !important;
            font-variant-ligatures: none !important;
            font-feature-settings: "liga" 0 !important;
            padding: ${ar.padding}px ${ar.padding + 6}px !important;
            border-radius: ${ar.borderRadius}px !important;
        }
        .is-arabic.caption-window, .is-arabic .ytp-caption-window-container {
            bottom: ${ar.bottomPos}% !important;
            text-align: ${ar.textAlign || 'center'} !important;
            direction: rtl !important;
        }

        /* ENGLISH STYLES */
        .is-english .ytp-caption-segment {
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
            line-height: ${en.lineHeight} !important;
            letter-spacing: ${en.letterSpacing}px !important;
            padding: ${en.padding}px ${en.padding + 6}px !important;
            border-radius: ${en.borderRadius}px !important;
        }
        .is-english.caption-window, .is-english .ytp-caption-window-container {
            bottom: ${en.bottomPos}% !important;
            text-align: ${en.textAlign || 'center'} !important;
        }
    `;
    styleTag.innerHTML = css;
}

function detectLanguage() {
    const windows = document.querySelectorAll('.caption-window');
    windows.forEach(win => {
        const segments = win.querySelectorAll('.ytp-caption-segment');
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

// --- 8. SHORTCUTS ---

function initShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (!e.altKey) return;

        // Toggle Panel: Alt + S
        if (e.code === 'KeyS') {
            e.preventDefault();
            togglePanel();
        }

        // Font Size Up: Alt + ArrowUp
        if (e.code === 'ArrowUp') {
            e.preventDefault();
            const s = cachedSettings[editTarget];
            s.fontSize = Math.min(80, (parseInt(s.fontSize) || 30) + 2);
            chrome.storage.local.set({ [editTarget]: s });
            updateSubtitleStyles(cachedSettings.ar, cachedSettings.en);
            updatePanelValues();
        }

        // Font Size Down: Alt + ArrowDown
        if (e.code === 'ArrowDown') {
            e.preventDefault();
            const s = cachedSettings[editTarget];
            s.fontSize = Math.max(10, (parseInt(s.fontSize) || 30) - 2);
            chrome.storage.local.set({ [editTarget]: s });
            updateSubtitleStyles(cachedSettings.ar, cachedSettings.en);
            updatePanelValues();
        }
    });
}

// --- 9. INITIALIZATION ---

function init() {
    // Load Settings local
    chrome.storage.local.get(['ar', 'en', 'uiLanguage', 'fullscreenAssistant', 'customTemplates'], (res) => {
        // Deep merge for AR
        if (res.ar) {
            cachedSettings.ar = { ...defaultAr, ...res.ar };
            // Ensure new properties are set if missing from old storage
            ['letterSpacing', 'strokeOpacity', 'bgBlur', 'textAlign'].forEach(k => {
                if (cachedSettings.ar[k] === undefined) cachedSettings.ar[k] = defaultAr[k];
            });
        }

        // Deep merge for EN
        if (res.en) {
            cachedSettings.en = { ...defaultEn, ...res.en };
            ['letterSpacing', 'strokeOpacity', 'bgBlur', 'textAlign'].forEach(k => {
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
