import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import pl from './pl.json';
import en from './en.json';
import nl from './nl.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            pl: { translation: pl },
            en: { translation: en },
            nl: { translation: nl },
        },
        fallbackLng: 'pl',
        supportedLngs: ['pl', 'en', 'nl'],
        interpolation: { escapeValue: false },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
            lookupLocalStorage: 'cinemabox-lang',
        },
    });

const LOCALES = { pl: 'pl-PL', en: 'en-GB', nl: 'nl-NL' };

/** Locale do formatowania dat zgodne z aktywnym językiem UI. */
export const dateLocale = () => LOCALES[i18n.resolvedLanguage] || 'pl-PL';

i18n.on('languageChanged', (lng) => {
    document.documentElement.lang = lng;
});
document.documentElement.lang = i18n.resolvedLanguage || 'pl';

export default i18n;
