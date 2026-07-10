import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import RegisterFormComponent from './RegisterFormComponent';
import '../styles/auth.scss';

export default function RegisterOffcanvas({ show, onHide, onSwitchToLogin }) {
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
                    <Offcanvas.Title className="auth-title">Załóż konto</Offcanvas.Title>
                    <p className="auth-subtitle">Dołącz do CinemaBox i rezerwuj bilety online</p>
                </div>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <RegisterFormComponent onSuccess={onHide} />
                {onSwitchToLogin && (
                    <div className="auth-switch">
                        Masz już konto?
                        <button type="button" onClick={onSwitchToLogin}>Zaloguj się</button>
                    </div>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
}
