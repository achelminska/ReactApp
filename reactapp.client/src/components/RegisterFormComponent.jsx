import { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.scss';

export default function RegisterFormComponent({ onSuccess }) {
    const { register } = useAuth();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [city, setCity] = useState('');
    const [accepted, setAccepted] = useState(false);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (pass !== confirm) {
            setError('Hasła się nie zgadzają.');
            return;
        }
        setSubmitting(true);
        try {
            await register(email, pass, city || null);
            if (onSuccess) onSuccess();
        } catch (err) {
            const details = err.data?.errors;
            setError(Array.isArray(details) ? details.join(' ') : (err.message || 'Nie udało się zarejestrować.'));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form className="auth-form" onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3" controlId="registerEmail">
                <Form.Label>E-mail</Form.Label>
                <div className="input-icon-group">
                    <Form.Control
                        type="email"
                        placeholder="twoj@email.pl"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <i className="bi bi-envelope field-icon"></i>
                </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerPassword">
                <Form.Label>Hasło</Form.Label>
                <div className="input-icon-group">
                    <Form.Control
                        type={showPass ? 'text' : 'password'}
                        className="has-toggle"
                        placeholder="Min. 6 znaków"
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                        minLength={6}
                        required
                    />
                    <i className="bi bi-lock field-icon"></i>
                    <button
                        type="button"
                        className="toggle-password"
                        aria-label={showPass ? 'Ukryj hasło' : 'Pokaż hasło'}
                        onClick={() => setShowPass(v => !v)}
                    >
                        <i className={showPass ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                    </button>
                </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerConfirm">
                <Form.Label>Powtórz hasło</Form.Label>
                <div className="input-icon-group">
                    <Form.Control
                        type={showPass ? 'text' : 'password'}
                        placeholder="Powtórz hasło"
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                        required
                    />
                    <i className="bi bi-shield-lock field-icon"></i>
                </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerCity">
                <Form.Label>Miasto <span className="text-lowercase" style={{ opacity: 0.6, textTransform: 'none' }}>(opcjonalnie)</span></Form.Label>
                <div className="input-icon-group">
                    <Form.Control
                        placeholder="Twoje miasto"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                    <i className="bi bi-geo-alt field-icon"></i>
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
                            Przeczytałem/am <a href="/regulamin" target="_blank" rel="noopener noreferrer">regulamin</a> i go akceptuję
                        </span>
                    }
                />
            </Form.Group>

            <Button type="submit" className="auth-submit" disabled={submitting}>
                {submitting ? <Spinner size="sm" animation="border" /> : 'Załóż konto'}
            </Button>
        </Form>
    );
}
