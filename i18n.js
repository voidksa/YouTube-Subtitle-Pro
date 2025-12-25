const translations = {
    ar: {
        typography: "الخط والنصوص",
        appearance: "المظهر والألوان",
        position: "الموضع",
        fontSize: "حجم الخط",
        fontColor: "لون النص",
        fontFamily: "نوع الخط",
        shadowIntensity: "قوة الظل",
        fontWeight: "سماكة الخط",
        bottomPos: "الارتفاع",
        bgOpacity: "خلفية النص",
        strokeColor: "لون الحدود",
        reset: "استعادة الافتراضي",
        
        // Values
        normal: "عادي",
        bold: "عريض",
        black: "عريض جداً",
        tajawal: "Tajawal (العربي الأفضل)",
        roboto: "Roboto (الافتراضي)",
        arial: "Arial",
        cinema: "Cinema Typewriter"
    },
    en: {
        typography: "Typography",
        appearance: "Appearance",
        position: "Position",
        fontSize: "Font Size",
        fontColor: "Text Color",
        fontFamily: "Font Family",
        shadowIntensity: "Shadow Intensity",
        fontWeight: "Font Weight",
        bottomPos: "Bottom Position",
        bgOpacity: "Text Background",
        strokeColor: "Stroke Color",
        reset: "Reset to Default",

        // Values
        normal: "Normal",
        bold: "Bold",
        black: "Black",
        tajawal: "Tajawal (Best for Arabic)",
        roboto: "Roboto (Default)",
        arial: "Arial",
        cinema: "Cinema Typewriter"
    }
};

function t(key, lang) {
    return translations[lang][key] || key;
}
