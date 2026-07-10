import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import LoginFormComponent from './LoginFormComponent';
import '../styles/auth.scss';

export default function LoginOffcanvas({ show, onHide, onSwitchToRegister }) {
    return (
        <Offcanvas
            show={show}
            onHide={onHide}
            placement="end"
            className="offcanvas-custom auth-offcanvas"
            scroll
            backdrop
        >
            <Offcanvas.Header closeButton>
                <div className="auth-heading">
                    <Offcanvas.Title className="auth-title">Witaj ponownie</Offcanvas.Title>
                    <p className="auth-subtitle">Zaloguj się, aby zarezerwować bilety</p>
                </div>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <LoginFormComponent onSuccess={onHide} />
                {onSwitchToRegister && (
                    <div className="auth-switch">
                        Nie masz konta?
                        <button type="button" onClick={onSwitchToRegister}>Zarejestruj się</button>
                    </div>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
}
