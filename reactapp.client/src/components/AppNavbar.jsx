import { useEffect, useState } from 'react';
import { Container, Navbar, Nav, Button, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SearchInput from '../components/SearchInput';
import LoginOffcanvas from '../components/LoginOffcanvas';
import RegisterOffcanvas from '../components/RegisterOffcanvas';
import LoginFormComponent from '../components/LoginFormComponent';
import RegisterFormComponent from '../components/RegisterFormComponent';
import { cinemasApi } from '../api';
import { useAuth } from '../context/AuthContext';
import '../styles/useroffcanvas.scss';

export default function AppNavbar() {
    const { user, isAdmin, logout } = useAuth();
    const [showMobileUserOff, setShowMobileUserOff] = useState(false);
    const [mobileTab, setMobileTab] = useState('login');
    const [showLoginOff, setShowLoginOff] = useState(false);
    const [showRegisterOff, setShowRegisterOff] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        cinemasApi.cities().then(setCities).catch(() => {});
    }, []);

    const handleSearch = (query) => {
        navigate(`/szukaj?query=${encodeURIComponent(query)}`);
    };

    const [showScroll, setShowScroll] = useState(false);
    useEffect(() => {
        const handleScroll = () => setShowScroll(window.pageYOffset > 300);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const goRepertuar = () => {
        if (selectedCity) navigate('/repertuar', { state: { selectedCity } });
        else alert('Wybierz miasto najpierw!');
    };

    return (
        <>
            <Navbar expand="lg" bg="black" variant="dark" fixed="top" className="firstNavbar">
                <Container fluid className="d-flex align-items-center justify-content-between justify-content-lg-center">
                    <Navbar.Brand as={Link} to="/" className="d-lg-none">
                        <img src="/image/logo2.png" alt="CinemaBox" style={{ height: '60px', width: 'auto' }} className="d-inline-block align-top" />
                    </Navbar.Brand>
                    <div className="d-flex align-items-center gap-3 d-lg-none">
                        {showScroll && (
                            <div className="icon-scroll-top-mobile" role="button" title="Do góry" onClick={scrollToTop}>
                                <i className="bi bi-arrow-up"></i>
                            </div>
                        )}
                        <div className="icon-loginMobile" role="button" title="Konto" onClick={() => { setMobileTab('login'); setShowMobileUserOff(true); }}>
                            <i className="bi bi-person"></i>
                        </div>
                        <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    </div>

                    <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end" className="offcanvas-custom d-lg-none" scroll backdrop>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title><img src="/image/logo2.png" alt="CinemaBox" style={{ height: '60px' }} /></Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="d-flex flex-column justify-content-center align-items-center text-center h-100 gap-4">
                                <Nav.Link as={Link} to="/repertuar" onClick={goRepertuar}>Repertuar</Nav.Link>
                                <Nav.Link as={Link} to="/kontakt">Kontakt</Nav.Link>
                                {isAdmin && <Nav.Link as={Link} to="/admin">Panel admina</Nav.Link>}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>

                    <Offcanvas show={showMobileUserOff} onHide={() => setShowMobileUserOff(false)} placement="end" className="offcanvas-custom user-offcanvas d-lg-none" scroll backdrop>
                        <Offcanvas.Header closeButton />
                        {user ? (
                            <Offcanvas.Body>
                                <p className="text-white px-3">Zalogowano: {user.email}</p>
                                {isAdmin && <Button variant="warning" className="mx-3 mb-2" onClick={() => { setShowMobileUserOff(false); navigate('/admin'); }}>Panel admina</Button>}
                                <Button variant="outline-light" className="mx-3" onClick={() => { logout(); setShowMobileUserOff(false); }}>Wyloguj</Button>
                            </Offcanvas.Body>
                        ) : (
                            <>
                                <Tabs id="mobile-account-tabs" activeKey={mobileTab} onSelect={k => setMobileTab(k)} className="mb-3 px-3">
                                    <Tab eventKey="login" title="Logowanie" />
                                    <Tab eventKey="register" title="Rejestracja" />
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
                        <div className="city-selector position-relative">
                            <div className="city-selector-trigger" role="button" onClick={() => setShowCityDropdown(!showCityDropdown)}>
                                <i className="bi bi-geo-alt-fill me-2"></i>
                                {selectedCity || 'Wybierz miasto'}
                                <i className="bi bi-chevron-down ms-2" />
                            </div>
                            {showCityDropdown && (
                                <ul className="city-dropdown">
                                    {cities.map(city => (
                                        <li key={city} onClick={() => { setSelectedCity(city); setShowCityDropdown(false); }}>{city}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <Nav className="align-items-center ms-auto gap-2">
                            <SearchInput onSearch={handleSearch} />
                            {user ? (
                                <>
                                    <Nav.Link className="linksMenuDesktop text-truncate" style={{ maxWidth: 180 }} title={user.email}>
                                        <i className="bi bi-person-check me-2"></i>{user.email}
                                    </Nav.Link>
                                    {isAdmin && (
                                        <Nav.Link as={Link} to="/admin" className="linksMenuDesktop text-warning">Admin</Nav.Link>
                                    )}
                                    <button className="btn-navbar-cta" onClick={logout}>Wyloguj</button>
                                </>
                            ) : (
                                <>
                                    <Nav.Link className="linksMenuDesktop" role="button" onClick={() => setShowLoginOff(true)}>
                                        Logowanie
                                    </Nav.Link>
                                    <button className="btn-navbar-cta" onClick={() => setShowRegisterOff(true)}>Załóż konto</button>
                                </>
                            )}
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
                        <Nav.Link className="linksMenuDesktop2" role="button" onClick={goRepertuar}>Repertuar</Nav.Link>
                        <div className="vertical-divider2 d-none d-lg-block"></div>
                        <Nav.Link as={Link} to="/" className="linksMenuDesktop2" onClick={() => setTimeout(() => document.getElementById('screen-now')?.scrollIntoView({ behavior: 'smooth' }), 100)}>Na ekranie</Nav.Link>
                        <div className="vertical-divider2 d-none d-lg-block"></div>
                        <Nav.Link as={Link} to="/" className="linksMenuDesktop2" onClick={() => setTimeout(() => document.getElementById('screen-upcoming')?.scrollIntoView({ behavior: 'smooth' }), 100)}>Wkrótce</Nav.Link>
                        <div className="vertical-divider2 d-none d-lg-block"></div>
                        <Nav.Link as={Link} to="/" className="linksMenuDesktop2" onClick={() => setTimeout(() => document.getElementById('screen-family')?.scrollIntoView({ behavior: 'smooth' }), 100)}>Rodziny</Nav.Link>
                        <div className="vertical-divider2 d-none d-lg-block"></div>
                        <Nav.Link as={Link} to="/kontakt" className="linksMenuDesktop2">Kontakt</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
