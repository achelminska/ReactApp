import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Ciemny dropdown w stylu serwisu — zamiennik natywnego <select> w panelu admina.
// Przy dłuższych listach (miasta, sale, filmy) pokazuje pole wyszukiwania.
export default function AdminSelect({ options, value, onChange, placeholder, icon }) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const ref = useRef(null);
    const searchable = options.length > 8;

    useEffect(() => {
        const onDocClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        const onKey = (e) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('mousedown', onDocClick);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onDocClick);
            document.removeEventListener('keydown', onKey);
        };
    }, []);

    useEffect(() => {
        if (!open) setQuery('');
    }, [open]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return options;
        return options.filter(o => o.label.toLowerCase().includes(q));
    }, [options, query]);

    const selected = options.find(o => String(o.value) === String(value));

    const pick = (val) => {
        onChange(val);
        setOpen(false);
    };

    return (
        <div className={`admin-select ${open ? 'open' : ''}`} ref={ref}>
            <button
                type="button"
                className="admin-select-toggle"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen(o => !o)}
            >
                {icon && <i className={`bi ${icon} admin-select-icon`}></i>}
                <span className={selected ? '' : 'admin-select-placeholder'}>
                    {selected ? selected.label : (placeholder ?? t('admin.common.select'))}
                </span>
                <i className="bi bi-chevron-down admin-select-caret"></i>
            </button>
            {open && (
                <div className="admin-select-menu">
                    {searchable && (
                        <div className="admin-select-search">
                            <i className="bi bi-search"></i>
                            <input
                                autoFocus
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                placeholder={t('admin.common.search')}
                            />
                        </div>
                    )}
                    <ul role="listbox">
                        {filtered.map(o => (
                            <li key={o.value}>
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={String(o.value) === String(value)}
                                    className={String(o.value) === String(value) ? 'selected' : ''}
                                    onClick={() => pick(o.value)}
                                >
                                    {o.label}
                                    {String(o.value) === String(value) && <i className="bi bi-check-lg"></i>}
                                </button>
                            </li>
                        ))}
                        {filtered.length === 0 && (
                            <li className="admin-select-empty">{t('admin.common.noResults')}</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
