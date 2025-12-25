const translations = {
    ar: {
        fontSize: "حجم الخط",
        fontColor: "لون النص",
        fontFamily: "الخط (Font Family)",
        shadowIntensity: "قوة الظل",
        fontWeight: "سماكة الخط",
        bottomPos: "الارتفاع عن الأسفل (%)",
        bgOpacity: "الشفافية",
        strokeColor: "لون التحديد",
        normal: "عادي",
        bold: "Bold",
        black: "Black",
        tajawal: "Tajawal (العربي الأفضل)",
        roboto: "Roboto (الافتراضي)",
        arial: "Arial",
        cinema: "Cinema Typewriter"
    },
    en: {
        fontSize: "Font Size",
        fontColor: "Font Color",
        fontFamily: "Font Family",
        shadowIntensity: "Shadow Intensity",
        fontWeight: "Font Weight",
        bottomPos: "Bottom Position (%)",
        bgOpacity: "Opacity",
        strokeColor: "Stroke Color",
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
