import { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.scss';

export default function LoginFormComponent({ onSuccess }) {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            await login(email, pass);
            if (onSuccess) onSuccess();
        } catch (err) {
            setError(err.message || 'Nie udało się zalogować.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form className="auth-form" onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group controlId="loginEmail" className="mb-3">
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
            <Form.Group controlId="loginPass" className="mb-3">
                <Form.Label>Hasło</Form.Label>
                <div className="input-icon-group">
                    <Form.Control
                        type={showPass ? 'text' : 'password'}
                        className="has-toggle"
                        placeholder="Twoje hasło"
                        value={pass}
                        onChange={e => setPass(e.target.value)}
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
            <Button type="submit" className="auth-submit" disabled={submitting}>
                {submitting ? <Spinner size="sm" animation="border" /> : 'Zaloguj się'}
            </Button>
        </Form>
    );
}
