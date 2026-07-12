import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/account.scss';
import { cinemasApi, authApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { PASSWORD_RULES } from '../utils/passwordRules';

// Dropdown miasta w stylu reszty serwisu
function CityDropdown({ cities, value, onChange, placeholder }) {
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
        <div className={`acc-city ${open ? 'open' : ''}`} ref={ref}>
            <button
                type="button"
                className="acc-city-toggle"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen(o => !o)}
            >
                <i className="bi bi-geo-alt"></i>
                <span className={value ? '' : 'acc-placeholder'}>{value || placeholder}</span>
                <i className="bi bi-chevron-down acc-city-caret"></i>
            </button>
            {open && (
                <ul className="acc-city-menu" role="listbox">
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

function Feedback({ type, children }) {
    return (
        <p className={`acc-feedback ${type}`}>
            <i className={`bi ${type === 'ok' ? 'bi-check-circle' : 'bi-exclamation-circle'}`}></i>
            {children}
        </p>
    );
}

export default function AccountPage() {
    const { t } = useTranslation();
    const { user, loading: authLoading, updateProfile, changeEmail } = useAuth();

    // --- Dane konta ---
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('');
    const [profileMsg, setProfileMsg] = useState(null);
    const [savingProfile, setSavingProfile] = useState(false);

    // --- Zmiana e-maila ---
    const [newEmail, setNewEmail] = useState('');
    const [emailPass, setEmailPass] = useState('');
    const [emailMsg, setEmailMsg] = useState(null);
    const [savingEmail, setSavingEmail] = useState(false);

    // --- Zmiana hasła ---
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [passMsg, setPassMsg] = useState(null);
    const [savingPass, setSavingPass] = useState(false);

    const newPassOk = PASSWORD_RULES.every(r => r.test(newPass));

    useEffect(() => {
        cinemasApi.cities().then(setCities).catch(() => {});
    }, []);

    useEffect(() => {
        if (user) setCity(user.city || '');
    }, [user]);

    const saveProfile = async (e) => {
        e.preventDefault();
        setProfileMsg(null);
        setSavingProfile(true);
        try {
            await updateProfile(city || null);
            setProfileMsg({ type: 'ok', text: t('account.saved') });
        } catch (err) {
            setProfileMsg({ type: 'bad', text: err.message || t('account.saveFailed') });
        } finally {
            setSavingProfile(false);
        }
    };

    const submitEmailChange = async (e) => {
        e.preventDefault();
        setEmailMsg(null);
        setSavingEmail(true);
        try {
            await changeEmail(newEmail.trim(), emailPass);
            setEmailMsg({ type: 'ok', text: t('account.emailChanged') });
            setNewEmail('');
            setEmailPass('');
        } catch (err) {
            const details = err.data?.errors;
            setEmailMsg({
                type: 'bad',
                text: Array.isArray(details) ? details.join(' ') : (err.message || t('account.emailChangeFailed')),
            });
        } finally {
            setSavingEmail(false);
        }
    };

    const changePassword = async (e) => {
        e.preventDefault();
        setPassMsg(null);
        if (!newPassOk) {
            setPassMsg({ type: 'bad', text: t('auth.passwordReqError') });
            return;
        }
        if (newPass !== confirmPass) {
            setPassMsg({ type: 'bad', text: t('auth.passwordsMismatchError') });
            return;
        }
        setSavingPass(true);
        try {
            await authApi.changePassword(currentPass, newPass);
            setPassMsg({ type: 'ok', text: t('account.passwordChanged') });
            setCurrentPass('');
            setNewPass('');
            setConfirmPass('');
        } catch (err) {
            const details = err.data?.errors;
            setPassMsg({
                type: 'bad',
                text: Array.isArray(details) ? details.join(' ') : (err.message || t('account.passwordChangeFailed')),
            });
        } finally {
            setSavingPass(false);
        }
    };

    return (
        <div className="account-page">
            <div className="account-container">
                <header className="acc-head">
                    <p className="acc-eyebrow">{t('myTickets.eyebrow')}</p>
                    <h2 className="acc-title">{t('account.title')}</h2>
                </header>

                {authLoading ? (
                    <p className="acc-status">{t('common.loading')}</p>
                ) : !user ? (
                    <div className="acc-empty">
                        <i className="bi bi-person-lock"></i>
                        <p className="acc-empty-title">{t('account.loginTitle')}</p>
                        <p className="acc-empty-hint">{t('myTickets.loginHint')}</p>
                    </div>
                ) : (
                    <div className="acc-grid">
                        {/* DANE KONTA */}
                        <section className="acc-card">
                            <h3><i className="bi bi-person-vcard"></i>{t('account.profileTitle')}</h3>

                            <form onSubmit={saveProfile}>
                                <div className="acc-field">
                                    <label>{t('account.emailLabel')}</label>
                                    <div className="acc-readonly">
                                        <i className="bi bi-envelope"></i>
                                        <span>{user.email}</span>
                                    </div>
                                    <small className="acc-note">{t('account.emailReadonly')}</small>
                                </div>

                                <div className="acc-field">
                                    <label>{t('account.cityLabel')}</label>
                                    <CityDropdown
                                        cities={cities}
                                        value={city}
                                        onChange={setCity}
                                        placeholder={t('nav.chooseCity')}
                                    />
                                    <small className="acc-note">{t('account.cityHint')}</small>
                                </div>

                                {profileMsg && <Feedback type={profileMsg.type}>{profileMsg.text}</Feedback>}

                                <button type="submit" className="acc-submit" disabled={savingProfile}>
                                    {savingProfile ? t('account.saving') : t('account.save')}
                                </button>
                            </form>
                        </section>

                        {/* ZMIANA E-MAILA */}
                        <section className="acc-card">
                            <h3><i className="bi bi-envelope-at"></i>{t('account.emailTitle')}</h3>

                            <form onSubmit={submitEmailChange}>
                                <div className="acc-field">
                                    <label htmlFor="acc-new-email">{t('account.newEmail')}</label>
                                    <input
                                        id="acc-new-email"
                                        type="email"
                                        autoComplete="email"
                                        value={newEmail}
                                        onChange={e => setNewEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="acc-field">
                                    <label htmlFor="acc-email-pass">{t('account.currentPassword')}</label>
                                    <input
                                        id="acc-email-pass"
                                        type="password"
                                        autoComplete="current-password"
                                        value={emailPass}
                                        onChange={e => setEmailPass(e.target.value)}
                                        required
                                    />
                                    <small className="acc-note">{t('account.emailPasswordHint')}</small>
                                </div>

                                {emailMsg && <Feedback type={emailMsg.type}>{emailMsg.text}</Feedback>}

                                <button type="submit" className="acc-submit" disabled={savingEmail}>
                                    {savingEmail ? t('account.saving') : t('account.changeEmail')}
                                </button>
                            </form>
                        </section>

                        {/* ZMIANA HASŁA */}
                        <section className="acc-card">
                            <h3><i className="bi bi-shield-lock"></i>{t('account.passwordTitle')}</h3>

                            <form onSubmit={changePassword}>
                                <div className="acc-field">
                                    <label htmlFor="acc-current">{t('account.currentPassword')}</label>
                                    <div className="acc-pass-wrap">
                                        <input
                                            id="acc-current"
                                            type={showPass ? 'text' : 'password'}
                                            autoComplete="current-password"
                                            value={currentPass}
                                            onChange={e => setCurrentPass(e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="acc-eye"
                                            aria-label={showPass ? t('auth.hidePassword') : t('auth.showPassword')}
                                            onClick={() => setShowPass(v => !v)}
                                        >
                                            <i className={showPass ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="acc-field">
                                    <label htmlFor="acc-new">{t('account.newPassword')}</label>
                                    <input
                                        id="acc-new"
                                        type={showPass ? 'text' : 'password'}
                                        autoComplete="new-password"
                                        value={newPass}
                                        onChange={e => setNewPass(e.target.value)}
                                        minLength={8}
                                        required
                                    />
                                    {newPass.length > 0 && !newPassOk && (
                                        <ul className="acc-pass-rules">
                                            {PASSWORD_RULES.map(rule => {
                                                const ok = rule.test(newPass);
                                                return (
                                                    <li key={rule.id} className={ok ? 'ok' : 'bad'}>
                                                        <i className={ok ? 'bi bi-check-lg' : 'bi bi-x-lg'}></i>
                                                        {t(rule.labelKey)}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                    {newPass.length > 0 && newPassOk && (
                                        <Feedback type="ok">{t('auth.strongPassword')}</Feedback>
                                    )}
                                </div>

                                <div className="acc-field">
                                    <label htmlFor="acc-confirm">{t('account.repeatNewPassword')}</label>
                                    <input
                                        id="acc-confirm"
                                        type={showPass ? 'text' : 'password'}
                                        autoComplete="new-password"
                                        value={confirmPass}
                                        onChange={e => setConfirmPass(e.target.value)}
                                        required
                                    />
                                    {confirmPass.length > 0 && (
                                        confirmPass === newPass
                                            ? <Feedback type="ok">{t('auth.passwordsMatch')}</Feedback>
                                            : <Feedback type="bad">{t('auth.passwordsDiffer')}</Feedback>
                                    )}
                                </div>

                                {passMsg && <Feedback type={passMsg.type}>{passMsg.text}</Feedback>}

                                <button type="submit" className="acc-submit" disabled={savingPass}>
                                    {savingPass ? t('account.saving') : t('account.changePassword')}
                                </button>
                            </form>
                        </section>

                        {/* SKRÓT DO BILETÓW */}
                        <Link to="/moje-bilety" className="acc-tickets-link">
                            <i className="bi bi-ticket-perforated"></i>
                            <span>{t('nav.myTickets')}</span>
                            <i className="bi bi-arrow-right"></i>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
