import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LoginFormComponent from './LoginFormComponent';
import '../styles/auth.scss';

export default function LoginOffcanvas({ show, onHide, onSwitchToRegister }) {
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
                    <Offcanvas.Title className="auth-title">{t('auth.loginTitle')}</Offcanvas.Title>
                    <p className="auth-subtitle">{t('auth.loginSubtitle')}</p>
                </div>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <LoginFormComponent onSuccess={onHide} />

                <div className="auth-perks">
                    <p className="auth-perks-title">{t('auth.loginPerksTitle')}</p>
                    <ul>
                        <li><i className="bi bi-lightning-charge"></i>{t('auth.perkFast')}</li>
                        <li><i className="bi bi-clock-history"></i>{t('auth.perkHistory')}</li>
                        <li><i className="bi bi-stars"></i>{t('auth.perkOffers')}</li>
                    </ul>
                </div>

                {onSwitchToRegister && (
                    <div className="auth-switch">
                        {t('auth.noAccount')}
                        <button type="button" onClick={onSwitchToRegister}>{t('auth.signUp')}</button>
                    </div>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
}
