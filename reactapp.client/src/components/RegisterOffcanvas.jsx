import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import RegisterFormComponent from './RegisterFormComponent';
import '../styles/auth.scss';

export default function RegisterOffcanvas({ show, onHide, onSwitchToLogin }) {
    const { t } = useTranslation();

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
                    <Offcanvas.Title className="auth-title">{t('auth.registerTitle')}</Offcanvas.Title>
                    <p className="auth-subtitle">{t('auth.registerSubtitle')}</p>
                </div>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <RegisterFormComponent onSuccess={onHide} />

                <div className="auth-perks">
                    <p className="auth-perks-title">{t('auth.registerPerksTitle')}</p>
                    <ul>
                        <li><i className="bi bi-lightning-charge"></i>{t('auth.perkFast')}</li>
                        <li><i className="bi bi-clock-history"></i>{t('auth.perkHistory')}</li>
                        <li><i className="bi bi-stars"></i>{t('auth.perkOffers')}</li>
                    </ul>
                </div>

                {onSwitchToLogin && (
                    <div className="auth-switch">
                        {t('auth.haveAccount')}
                        <button type="button" onClick={onSwitchToLogin}>{t('auth.signIn')}</button>
                    </div>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
}
