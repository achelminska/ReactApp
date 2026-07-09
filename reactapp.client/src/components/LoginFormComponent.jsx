import { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

export default function LoginFormComponent({ onSuccess }) {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
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
        <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group controlId="loginEmail" className="mb-3">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Wpisz e-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="loginPass" className="mb-3">
                <Form.Label>Hasło</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Wpisz hasło"
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit" className="login-btn" disabled={submitting}>
                {submitting ? <Spinner size="sm" animation="border" /> : 'Zaloguj'}
            </Button>
        </Form>
    );
}
