import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
    { code: 'pl', label: 'Polski', short: 'PL' },
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'nl', label: 'Nederlands', short: 'NL' },
];

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const onDocClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, []);

    const current = LANGUAGES.find(l => l.code === i18n.resolvedLanguage) || LANGUAGES[0];

    return (
        <div className={`lang-switcher ${open ? 'open' : ''}`} ref={ref}>
            <button
                type="button"
                className="lang-toggle"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen(o => !o)}
            >
                <i className="bi bi-globe2"></i>
                <span>{current.short}</span>
                <i className="bi bi-chevron-down lang-caret"></i>
            </button>
            {open && (
                <ul className="lang-menu" role="listbox">
                    {LANGUAGES.map(lang => (
                        <li key={lang.code}>
                            <button
                                type="button"
                                role="option"
                                aria-selected={lang.code === current.code}
                                className={lang.code === current.code ? 'selected' : ''}
                                onClick={() => { i18n.changeLanguage(lang.code); setOpen(false); }}
                            >
                                {lang.label}
                                {lang.code === current.code && <i className="bi bi-check-lg"></i>}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
