import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function LoginFormComponent({ onSuccess }) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        console.log('loguję', { email, pass });
        if (onSuccess) onSuccess();
    };

    return (
        <Form onSubmit={handleSubmit}>
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
            <Button variant="primary" type="submit" className="login-btn">
                Zaloguj
            </Button>
        </Form>
    );
}