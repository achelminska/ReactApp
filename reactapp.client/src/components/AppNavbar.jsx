import { useEffect, useRef, useState } from 'react';
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useTranslation } from 'react-i18next';
import SearchInput from '../components/SearchInput';
import LoginOffcanvas from '../components/LoginOffcanvas';
import RegisterOffcanvas from '../components/RegisterOffcanvas';
import LoginFormComponent from '../components/LoginFormComponent';
import RegisterFormComponent from '../components/RegisterFormComponent';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { cinemasApi } from '../api';
import { useAuth } from '../context/AuthContext';
import '../styles/useroffcanvas.scss';

const CITY_STORAGE_KEY = 'cinemabox-city';

export default function AppNavbar() {
    const { t } = useTranslation();
    const { user, isAdmin, logout } = useAuth();
    const [showMobileUserOff, setShowMobileUserOff] = useState(false);
    const [navExpanded, setNavExpanded] = useState(false);
    const [mobileTab, setMobileTab] = useState('login');
    const [showLoginOff, setShowLoginOff] = useState(false);
    const [showRegisterOff, setShowRegisterOff] = useState(false);
    const [selectedCity, setSelectedCity] = useState(() => localStorage.getItem(CITY_STORAGE_KEY) || null);
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const [cities, setCities] = useState([]);
    const cityRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        cinemasApi.cities().then(setCities).catch(() => {});
    }, []);

    // Zamknij listę miast po kliknięciu poza nią
    useEffect(() => {
        const onDocClick = (e) => {
            if (cityRef.current && !cityRef.current.contains(e.target)) setShowCityDropdown(false);
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, []);

    const handleSearch = (query) => {
        navigate(`/szukaj?query=${encodeURIComponent(query)}`);
    };

    const chooseCity = (city) => {
        setSelectedCity(city);
        localStorage.setItem(CITY_STORAGE_KEY, city);
        setShowCityDropdown(false);
    };

    const repertuarState = selectedCity ? { selectedCity } : undefined;

    return (
        <>
            <Navbar expand="lg" bg="black" variant="dark" fixed="top" className="firstNavbar" expanded={navExpanded} onToggle={setNavExpanded}>
                <Container fluid className="d-flex align-items-center justify-content-between justify-content-lg-center">
                    <Navbar.Brand as={Link} to="/" className="d-lg-none">
                        <img src="/image/logo2.png" alt="CinemaBox" className="navbar-logo d-inline-block align-middle" />
                    </Navbar.Brand>
                    <div className="d-flex align-items-center gap-2 d-lg-none mobile-nav-actions">
                        <button
                            type="button"
                            className={`mobile-icon-btn ${user ? 'is-user' : ''}`}
                            title={t('nav.account')}
                            onClick={() => { setMobileTab('login'); setShowMobileUserOff(true); }}
                        >
                            {user
                                ? <span className="mobile-avatar" aria-hidden="true">{user.email[0].toUpperCase()}</span>
                                : <i className="bi bi-person"></i>}
                        </button>
                        <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    </div>

                    <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end" className="offcanvas-custom d-lg-none" scroll backdrop>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title><img src="/image/logo2.png" alt="CinemaBox" style={{ height: '44px' }} /></Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className="mobile-nav-panel">
                            <nav className="panel-menu">
                                {[
                                    { to: '/repertuar', state: repertuarState, icon: 'bi-calendar3', label: t('nav.repertoire') },
                                    { to: '/filmy/na-ekranie', icon: 'bi-film', label: t('nav.onScreen') },
                                    { to: '/filmy/wkrotce', icon: 'bi-hourglass-split', label: t('nav.comingSoon') },
                                    { to: '/filmy/dla-rodzin', icon: 'bi-balloon-heart', label: t('nav.families') },
                                    { to: '/kontakt', icon: 'bi-chat-dots', label: t('nav.contact') },
                                    ...(user ? [{ to: '/moje-bilety', icon: 'bi-ticket-perforated', label: t('nav.myTickets') }] : []),
                                    ...(isAdmin ? [{ to: '/admin', icon: 'bi-speedometer2', label: t('nav.adminPanel') }] : []),
                                ].map(item => (
                                    <Link
                                        key={item.to}
                                        to={item.to}
                                        state={item.state}
                                        className="panel-tile"
                                        onClick={() => setNavExpanded(false)}
                                    >
                                        <i className={`bi ${item.icon}`}></i>
                                        <span>{item.label}</span>
                                        <i className="bi bi-chevron-right chev"></i>
                                    </Link>
                                ))}
                            </nav>
                            <div className="mobile-nav-footer">
                                <LanguageSwitcher />
                            </div>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>

                    <Offcanvas show={showMobileUserOff} onHide={() => setShowMobileUserOff(false)} placement="end" className="offcanvas-custom user-offcanvas d-lg-none" scroll backdrop>
                        <Offcanvas.Header closeButton />
                        {user ? (
                            <Offcanvas.Body className="user-panel">
                                <div className="user-panel-head">
                                    <span className="user-avatar" aria-hidden="true">{user.email[0].toUpperCase()}</span>
                                    <div className="user-panel-id">
                                        <span className="user-panel-label">{t('nav.signedInLabel')}</span>
                                        <strong className="user-panel-email">{user.email}</strong>
                                    </div>
                                </div>

                                <nav className="panel-menu">
                                    <button type="button" className="panel-tile" onClick={() => { setShowMobileUserOff(false); navigate('/moje-konto'); }}>
                                        <i className="bi bi-person-gear"></i>
                                        <span>{t('nav.myAccount')}</span>
                                        <i className="bi bi-chevron-right chev"></i>
                                    </button>
                                    <button type="button" className="panel-tile" onClick={() => { setShowMobileUserOff(false); navigate('/moje-bilety'); }}>
                                        <i className="bi bi-ticket-perforated"></i>
                                        <span>{t('nav.myTickets')}</span>
                                        <i className="bi bi-chevron-right chev"></i>
                                    </button>
                                    {isAdmin && (
                                        <button type="button" className="panel-tile" onClick={() => { setShowMobileUserOff(false); navigate('/admin'); }}>
                                            <i className="bi bi-speedometer2"></i>
                                            <span>{t('nav.adminPanel')}</span>
                                            <i className="bi bi-chevron-right chev"></i>
                                        </button>
                                    )}
                                </nav>

                                <button type="button" className="user-panel-logout" onClick={() => { logout(); setShowMobileUserOff(false); }}>
                                    <i className="bi bi-box-arrow-right"></i>
                                    {t('nav.logout')}
                                </button>
                            </Offcanvas.Body>
                        ) : (
                            <>
                                <Tabs id="mobile-account-tabs" activeKey={mobileTab} onSelect={k => setMobileTab(k)} className="mb-3 px-3">
                                    <Tab eventKey="login" title={t('nav.login')} />
                                    <Tab eventKey="register" title={t('nav.registerTab')} />
                                </Tabs>
                                <Offcanvas.Body>
                                    {mobileTab === 'login'
                                        ? <LoginFormComponent onSuccess={() => setShowMobileUserOff(false)} />
                                        : <RegisterFormComponent onSuccess={() => setShowMobileUserOff(false)} />}
                                </Offcanvas.Body>
                            </>
                        )}
                    </Offcanvas>

                    <Navbar.Collapse id="navbarNavDropdown" className="d-none d-lg-flex align-items-center">
                        <Navbar.Brand as={Link} to="/" className="me-4 py-0">
                            <img src="/image/logo2.png" alt="CinemaBox" className="navbar-logo d-inline-block align-middle" />
                        </Navbar.Brand>
                        <div className={`city-selector position-relative ${showCityDropdown ? 'open' : ''}`} ref={cityRef}>
                            <button
                                type="button"
                                className="city-selector-trigger"
                                aria-haspopup="listbox"
                                aria-expanded={showCityDropdown}
                                onClick={() => setShowCityDropdown(!showCityDropdown)}
                            >
                                <i className="bi bi-geo-alt-fill me-2"></i>
                                {selectedCity || t('nav.chooseCity')}
                                <i className="bi bi-chevron-down ms-2" />
                            </button>
                            {showCityDropdown && (
                                <ul className="city-dropdown" role="listbox">
                                    {cities.map(city => (
                                        <li key={city}>
                                            <button
                                                type="button"
                                                role="option"
                                                aria-selected={city === selectedCity}
                                                className={city === selectedCity ? 'selected' : ''}
                                                onClick={() => chooseCity(city)}
                                            >
                                                {city}
                                                {city === selectedCity && <i className="bi bi-check-lg"></i>}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <Nav className="align-items-center ms-auto gap-2">
                            <SearchInput onSearch={handleSearch} />
                            {user ? (
                                <>
                                    <Nav.Link
                                        as={Link}
                                        to="/moje-konto"
                                        className="linksMenuDesktop text-truncate"
                                        style={{ maxWidth: 180 }}
                                        title={t('nav.myAccount')}
                                    >
                                        <i className="bi bi-person-check me-2"></i>{user.email}
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/moje-bilety" className="linksMenuDesktop">
                                        <i className="bi bi-ticket-perforated me-2"></i>{t('nav.myTickets')}
                                    </Nav.Link>
                                    {isAdmin && (
                                        <Nav.Link as={Link} to="/admin" className="linksMenuDesktop text-warning">{t('nav.admin')}</Nav.Link>
                                    )}
                                    <button className="btn-navbar-cta" onClick={logout}>{t('nav.logout')}</button>
                                </>
                            ) : (
                                <>
                                    <Nav.Link className="linksMenuDesktop" role="button" onClick={() => setShowLoginOff(true)}>
                                        {t('nav.login')}
                                    </Nav.Link>
                                    <button className="btn-navbar-cta" onClick={() => setShowRegisterOff(true)}>{t('nav.register')}</button>
                                </>
                            )}
                            <LanguageSwitcher />
                        </Nav>
                        <LoginOffcanvas
                            show={showLoginOff}
                            onHide={() => setShowLoginOff(false)}
                            onSwitchToRegister={() => { setShowLoginOff(false); setShowRegisterOff(true); }}
                        />
                        <RegisterOffcanvas
                            show={showRegisterOff}
                            onHide={() => setShowRegisterOff(false)}
                            onSwitchToLogin={() => { setShowRegisterOff(false); setShowLoginOff(true); }}
                        />
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Navbar expand="lg" fixed="top" className="secondNavbarDesktop d-none d-lg-flex">
                <Container className="d-none d-lg-flex justify-content-center">
                    <Nav className="gap-3 align-items-center">
                        <Nav.Link as={Link} to="/repertuar" state={repertuarState} className="linksMenuDesktop2">{t('nav.repertoire')}</Nav.Link>
                        <div className="vertical-divider2 d-none d-lg-block"></div>
                        <Nav.Link as={Link} to="/filmy/na-ekranie" className="linksMenuDesktop2">{t('nav.onScreen')}</Nav.Link>
                        <div className="vertical-divider2 d-none d-lg-block"></div>
                        <Nav.Link as={Link} to="/filmy/wkrotce" className="linksMenuDesktop2">{t('nav.comingSoon')}</Nav.Link>
                        <div className="vertical-divider2 d-none d-lg-block"></div>
                        <Nav.Link as={Link} to="/filmy/dla-rodzin" className="linksMenuDesktop2">{t('nav.families')}</Nav.Link>
                        <div className="vertical-divider2 d-none d-lg-block"></div>
                        <Nav.Link as={Link} to="/kontakt" className="linksMenuDesktop2">{t('nav.contact')}</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
