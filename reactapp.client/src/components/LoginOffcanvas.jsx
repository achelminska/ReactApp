import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import LoginFormComponent from './LoginFormComponent';
import '../styles/loginoffcanvas.scss';

export default function LoginOffcanvas({ show, onHide }) {
    return (
        <Offcanvas
            show={show}
            onHide={onHide}
            placement="end"
            className="offcanvas-custom login-offcanvas"
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className="title">Zaloguj się</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <LoginFormComponent onSuccess={onHide} />
            </Offcanvas.Body>
        </Offcanvas>
    );
}