import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import { contactApi, cinemasApi, bookingsApi } from '../api';
import { useAuth } from '../context/AuthContext';
import '../styles/contactpage.scss';
import '../styles/contactform.scss';

const CATEGORY_META = [
    { value: 'Zakup biletów', labelKey: 'contact.catTickets', icon: 'bi-ticket-perforated' },
    { value: 'Konto Online', labelKey: 'contact.catAccount', icon: 'bi-person-circle' },
    { value: 'Vouchery', labelKey: 'contact.catVouchers', icon: 'bi-gift' },
    { value: 'Inne', labelKey: 'contact.catOther', icon: 'bi-chat-dots' },
];

// Własny ciemny dropdown miasta — spójny z resztą serwisu
function CitySelect({ cities, value, onChange, placeholder }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const onDocClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, []);

    return (
        <div className={`cf-select ${open ? 'open' : ''}`} ref={ref}>
            <button
                type="button"
                className="cf-select-toggle"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen(o => !o)}
            >
                <span className={value ? '' : 'cf-placeholder'}>{value || placeholder}</span>
                <i className="bi bi-chevron-down"></i>
            </button>
            {open && (
                <ul className="cf-select-menu" role="listbox">
                    {cities.map(city => (
                        <li key={city}>
                            <button
                                type="button"
                                role="option"
                                aria-selected={city === value}
                                className={city === value ? 'selected' : ''}
                                onClick={() => { onChange(city === value ? '' : city); setOpen(false); }}
                            >
                                {city}
                                {city === value && <i className="bi bi-check-lg"></i>}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

const EMPTY_FORM = { name: '', email: '', subject: '', message: '', city: '' };

export default function ContactFormPage() {
    const { t } = useTranslation();
    const [category, setCategory] = useState(null);
    const [categoryError, setCategoryError] = useState(false);
    const [cities, setCities] = useState([]);
    const [form, setForm] = useState(EMPTY_FORM);
    const [sent, setSent] = useState(false);
    const [sentEmail, setSentEmail] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Opcjonalne autouzupełnianie danych dla zalogowanych
    const { user } = useAuth();
    const [autofill, setAutofill] = useState(false);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        cinemasApi.cities().then(setCities).catch(() => {});
    }, []);

    const toggleAutofill = async () => {
        if (autofill) {
            setAutofill(false);
            setForm(prev => ({ ...prev, name: '', email: '', city: '' }));
            return;
        }

        let data = profileData;
        if (!data) {
            // E-mail i miasto z konta + imię/nazwisko z ostatniej rezerwacji (jeśli jest)
            data = { name: '', email: user.email, city: user.city || '' };
            try {
                const myBookings = await bookingsApi.my();
                const last = myBookings[0];
                if (last) {
                    data.name = [last.customerName, last.customerSurname].filter(Boolean).join(' ');
                }
            } catch {
                // brak rezerwacji lub błąd — zostają dane z konta
            }
            setProfileData(data);
        }
        setForm(prev => ({ ...prev, name: data.name, email: data.email, city: data.city }));
        setAutofill(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category) {
            setCategoryError(true);
            return;
        }
        setError('');
        setSubmitting(true);
        try {
            await contactApi.send({
                name: form.name,
                email: form.email,
                category,
                subject: form.subject,
                message: form.message + (form.city ? `\nMiasto: ${form.city}` : ''),
            });
            setSentEmail(form.email);
            setSent(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const resetAll = () => {
        setForm(EMPTY_FORM);
        setCategory(null);
        setCategoryError(false);
        setSent(false);
        setAutofill(false);
    };

    return (
        <div className="contact-form-page">
            <header className="help-header">
                <div className="help-header-inner">
                    <Link to="/" className="help-logo">
                        <img src="/image/logo2.png" alt="CinemaBox" />
                    </Link>
                    <nav className="help-header-actions">
                        <Link to="/kontakt" className="help-link">
                            <i className="bi bi-journal-text"></i>
                            <span>{t('contact.knowledgeBase')}</span>
                        </Link>
                        <Link to="/" className="help-link">
                            <i className="bi bi-arrow-left"></i>
                            <span>{t('common.home')}</span>
                        </Link>
                    </nav>
                </div>
            </header>

            <div className="cf-main">
                {/* Kolumna informacyjna */}
                <aside className="cf-aside">
                    <p className="cf-eyebrow">{t('contact.formEyebrow')}</p>
                    <h1 className="cf-title">{t('contact.formTitle')}</h1>
                    <p className="cf-subtitle">{t('contact.formSubtitle')}</p>

                    <ul className="cf-info">
                        <li>
                            <i className="bi bi-envelope"></i>
                            <div>
                                <span>{t('contact.infoEmailLabel')}</span>
                                <a href="mailto:bok@cinemabox.pl">bok@cinemabox.pl</a>
                            </div>
                        </li>
                        <li>
                            <i className="bi bi-clock"></i>
                            <div>
                                <span>{t('contact.infoHoursLabel')}</span>
                                <strong>{t('contact.infoHours')}</strong>
                            </div>
                        </li>
                        <li>
                            <i className="bi bi-lightning-charge"></i>
                            <div>
                                <span>{t('contact.infoResponseLabel')}</span>
                                <strong>{t('contact.infoResponse')}</strong>
                            </div>
                        </li>
                    </ul>

                    <div className="cf-faq-hint">
                        <p className="cf-faq-hint-title">{t('contact.faqHintTitle')}</p>
                        <p className="cf-faq-hint-text">{t('contact.faqHintText')}</p>
                        <Link to="/kontakt">
                            {t('contact.faqHintLink')}
                            <i className="bi bi-arrow-right"></i>
                        </Link>
                    </div>
                </aside>

                {/* Karta formularza */}
                <section className="cf-card">
                    {sent ? (
                        <div className="cf-success">
                            <span className="cf-success-icon">
                                <i className="bi bi-check-lg"></i>
                            </span>
                            <h2>{t('contact.sentTitle')}</h2>
                            <p>{t('contact.sentText')}</p>
                            <p className="cf-success-email">{t('contact.replyTo', { email: sentEmail })}</p>
                            <button type="button" className="cf-submit" onClick={resetAll}>
                                {t('contact.newMessage')}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate={false}>
                            <fieldset className="cf-categories">
                                <legend>{t('contact.categoryLabel')}</legend>
                                <div className="cf-category-pills">
                                    {CATEGORY_META.map(cat => (
                                        <button
                                            key={cat.value}
                                            type="button"
                                            className={category === cat.value ? 'cf-pill active' : 'cf-pill'}
                                            onClick={() => { setCategory(cat.value); setCategoryError(false); }}
                                        >
                                            <i className={`bi ${cat.icon}`}></i>
                                            {t(cat.labelKey)}
                                        </button>
                                    ))}
                                </div>
                                {categoryError && (
                                    <p className="cf-error-hint">
                                        <i className="bi bi-exclamation-circle"></i>
                                        {t('contact.categoryError')}
                                    </p>
                                )}
                            </fieldset>

                            {error && (
                                <p className="cf-error-hint cf-error-server">
                                    <i className="bi bi-exclamation-triangle"></i>
                                    {error}
                                </p>
                            )}

                            {user && (
                                <button
                                    type="button"
                                    className={`autofill-toggle ${autofill ? 'on' : ''}`}
                                    onClick={toggleAutofill}
                                    aria-pressed={autofill}
                                >
                                    <span className="autofill-switch" aria-hidden="true"></span>
                                    <span className="autofill-text">
                                        <strong>{t('booking.autofillLabel')}</strong>
                                        <small>{t('booking.autofillHint', { email: user.email })}</small>
                                    </span>
                                    <i className={`bi ${autofill ? 'bi-check-circle-fill' : 'bi-person-vcard'}`}></i>
                                </button>
                            )}

                            <div className="cf-row">
                                <div className="cf-field">
                                    <label htmlFor="cf-name">{t('contact.nameLabel')}</label>
                                    <input
                                        id="cf-name"
                                        type="text"
                                        required
                                        placeholder={t('contact.namePlaceholder')}
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                    />
                                </div>
                                <div className="cf-field">
                                    <label htmlFor="cf-email">{t('contact.emailLabel')}</label>
                                    <input
                                        id="cf-email"
                                        type="email"
                                        required
                                        placeholder={t('auth.emailPlaceholder')}
                                        value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="cf-row">
                                <div className="cf-field">
                                    <label>{t('contact.cityLabel')}</label>
                                    <CitySelect
                                        cities={cities}
                                        value={form.city}
                                        onChange={city => setForm({ ...form, city })}
                                        placeholder={t('contact.choose')}
                                    />
                                </div>
                                <div className="cf-field">
                                    <label htmlFor="cf-subject">{t('contact.subjectLabel')}</label>
                                    <input
                                        id="cf-subject"
                                        type="text"
                                        required
                                        placeholder={t('contact.subjectPlaceholder')}
                                        value={form.subject}
                                        onChange={e => setForm({ ...form, subject: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="cf-field">
                                <label htmlFor="cf-message">{t('contact.messageLabel')}</label>
                                <textarea
                                    id="cf-message"
                                    rows="6"
                                    required
                                    placeholder={t('contact.messagePlaceholder')}
                                    value={form.message}
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                />
                            </div>

                            <div className="cf-footer-row">
                                <span className="cf-required-note">{t('contact.requiredNote')}</span>
                                <button type="submit" className="cf-submit" disabled={submitting}>
                                    {submitting ? t('contact.sending') : (
                                        <>
                                            <i className="bi bi-send me-2"></i>
                                            {t('contact.send')}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </section>
            </div>

            <Footer />
        </div>
    );
}
