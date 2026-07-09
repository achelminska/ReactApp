import { useState } from 'react';
import { Form, Button, Alert, Spinner, Col, Row } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

export default function RegisterFormComponent({ onSuccess }) {
    const { register } = useAuth();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirm, setConfirm] = useState('');
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
        <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3" controlId="registerEmail">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Wpisz e-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="registerPassword">
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Min. 6 znaków"
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                        minLength={6}
                        required
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="registerConfirm">
                    <Form.Label>Powtórz hasło</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Powtórz hasło"
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                        required
                    />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="registerCity">
                <Form.Label>Miasto (opcjonalnie)</Form.Label>
                <Form.Control
                    placeholder="Twoje miasto"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
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

            <Button variant="primary" type="submit" className="login-btn" disabled={submitting}>
                {submitting ? <Spinner size="sm" animation="border" /> : 'Zarejestruj się'}
            </Button>
        </Form>
    );
}
