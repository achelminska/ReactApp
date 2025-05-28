import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import RegisterFormComponent from './RegisterFormComponent';
import '../styles/registeroffcanvas.scss';

export default function RegisterOffcanvas({ show, onHide }) {
    return (
        <Offcanvas
            show={show}
            onHide={onHide}
            placement="end"
            className="offcanvas-custom register-offcanvas"
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className="title">Zarejestruj się</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <RegisterFormComponent onSuccess={onHide} />
            </Offcanvas.Body>
        </Offcanvas>
    );
}