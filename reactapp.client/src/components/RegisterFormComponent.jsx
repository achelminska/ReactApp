import { useEffect, useRef, useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { cinemasApi } from '../api';
import { PASSWORD_RULES } from '../utils/passwordRules';
import '../styles/auth.scss';

export default function RegisterFormComponent({ onSuccess }) {
    const { t } = useTranslation();
    const { register } = useAuth();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [city, setCity] = useState('');
    const [cities, setCities] = useState([]);
    const [cityOpen, setCityOpen] = useState(false);
    const cityRef = useRef(null);
    const [accepted, setAccepted] = useState(false);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const passwordOk = PASSWORD_RULES.every(r => r.test(pass));

    useEffect(() => {
        cinemasApi.cities().then(setCities).catch(() => {});
    }, []);

    useEffect(() => {
        const onDocClick = (e) => {
            if (cityRef.current && !cityRef.current.contains(e.target)) setCityOpen(false);
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!passwordOk) {
            setError(t('auth.passwordReqError'));
            return;
        }
        if (pass !== confirm) {
            setError(t('auth.passwordsMismatchError'));
            return;
        }
        setSubmitting(true);
        try {
            await register(email, pass, city || null);
            if (onSuccess) onSuccess();
        } catch (err) {
            const details = err.data?.errors;
            setError(Array.isArray(details) ? details.join(' ') : (err.message || t('auth.registerFailed')));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form className="auth-form" onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3" controlId="registerEmail">
                <Form.Label>{t('auth.email')}</Form.Label>
                <div className="input-icon-group">
                    <Form.Control
                        type="email"
                        placeholder={t('auth.emailPlaceholder')}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <i className="bi bi-envelope field-icon"></i>
                </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerPassword">
                <Form.Label>{t('auth.password')}</Form.Label>
                <div className="input-icon-group">
                    <Form.Control
                        type={showPass ? 'text' : 'password'}
                        className="has-toggle"
                        placeholder={t('auth.passwordPlaceholder')}
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                        minLength={8}
                        required
                    />
                    <i className="bi bi-lock field-icon"></i>
                    <button
                        type="button"
                        className="toggle-password"
                        aria-label={showPass ? t('auth.hidePassword') : t('auth.showPassword')}
                        onClick={() => setShowPass(v => !v)}
                    >
                        <i className={showPass ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                    </button>
                </div>
                {pass.length > 0 && !passwordOk && (
                    <ul className="password-rules">
                        {PASSWORD_RULES.map(rule => {
                            const ok = rule.test(pass);
                            return (
                                <li key={rule.id} className={ok ? 'ok' : 'bad'}>
                                    <i className={ok ? 'bi bi-check-lg' : 'bi bi-x-lg'}></i>
                                    {t(rule.labelKey)}
                                </li>
                            );
                        })}
                    </ul>
                )}
                {pass.length > 0 && passwordOk && (
                    <span className="field-feedback ok"><i className="bi bi-shield-check"></i>{t('auth.strongPassword')}</span>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerConfirm">
                <Form.Label>{t('auth.repeatPassword')}</Form.Label>
                <div className="input-icon-group">
                    <Form.Control
                        type={showPass ? 'text' : 'password'}
                        placeholder={t('auth.repeatPassword')}
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                        required
                    />
                    <i className="bi bi-shield-lock field-icon"></i>
                </div>
                {confirm.length > 0 && (
                    confirm === pass ? (
                        <span className="field-feedback ok"><i className="bi bi-check-circle"></i>{t('auth.passwordsMatch')}</span>
                    ) : (
                        <span className="field-feedback bad"><i className="bi bi-exclamation-circle"></i>{t('auth.passwordsDiffer')}</span>
                    )
                )}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>{t('auth.city')} <span className="text-lowercase" style={{ opacity: 0.6, textTransform: 'none' }}>{t('auth.optional')}</span></Form.Label>
                <div className={`auth-city ${cityOpen ? 'open' : ''}`} ref={cityRef}>
                    <button
                        type="button"
                        className="auth-city-toggle"
                        aria-haspopup="listbox"
                        aria-expanded={cityOpen}
                        onClick={() => setCityOpen(o => !o)}
                    >
                        <i className="bi bi-geo-alt field-icon"></i>
                        <span className={city ? '' : 'auth-city-placeholder'}>{city || t('nav.chooseCity')}</span>
                        <i className="bi bi-chevron-down auth-city-caret"></i>
                    </button>
                    {cityOpen && (
                        <ul className="auth-city-menu" role="listbox">
                            {cities.map(c => (
                                <li key={c}>
                                    <button
                                        type="button"
                                        role="option"
                                        aria-selected={c === city}
                                        className={c === city ? 'selected' : ''}
                                        onClick={() => { setCity(c === city ? '' : c); setCityOpen(false); }}
                                    >
                                        {c}
                                        {c === city && <i className="bi bi-check-lg"></i>}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerAccept">
                <Form.Check
                    type="checkbox"
                    id="acceptRules"
                    checked={accepted}
                    onChange={e => setAccepted(e.target.checked)}
                    required
                    label={
                        <span>
                            {t('auth.termsPrefix')} <a href="/regulamin" target="_blank" rel="noopener noreferrer">{t('auth.termsLink')}</a> {t('auth.termsSuffix')}
                        </span>
                    }
                />
            </Form.Group>

            <Button type="submit" className="auth-submit" disabled={submitting}>
                {submitting ? <Spinner size="sm" animation="border" /> : t('auth.registerBtn')}
            </Button>
        </Form>
    );
}
