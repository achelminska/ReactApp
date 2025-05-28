import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import Col from 'react-bootstrap/Col';

import Row from 'react-bootstrap/Row';
export default function RegisterFormComponent({ onSuccess }) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirm, setConfirm] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (pass !== confirm) {
            alert('Hasła się nie zgadzają');
            return;
        }
      
        console.log('rejestruję', { email, pass });
        if (onSuccess) onSuccess();
    };

    return (
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Adres</Form.Label>
                <Form.Control placeholder="1234 Main St" />
            </Form.Group>

            

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control />
                </Form.Group>

               

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Kod pocztowy</Form.Label>
                    <Form.Control />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check
                    type="checkbox"
                    id="acceptRules"
                    label={
                        <span>
                            Przeczytałem/am <a href="/regulamin" target="_blank" rel="noopener noreferrer">regulamin</a> i go akceptuję
                        </span>
                    }
                />
            </Form.Group>

            <Button variant="primary" type="submit" className="login-btn">
                Submit
            </Button>
        </Form>
    );
}