import { useEffect, useState } from 'react';
import { Container, Navbar, Nav, Button, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SearchInput from '../components/SearchInput';
import { useNavigate } from 'react-router-dom';
import LoginOffcanvas from '../components/LoginOffcanvas';
import RegisterOffcanvas from '../components/RegisterOffcanvas';
import LoginFormComponent from '../components/LoginFormComponent';
import RegisterFormComponent from '../components/RegisterFormComponent';
import { cities } from '../data/cities';
import '../styles/useroffcanvas.scss';

export default function AppNavbar() {
    const [showMobileUserOff, setShowMobileUserOff] = useState(false);
    const [mobileTab, setMobileTab] = useState('login');
    const [showLoginOff, setShowLoginOff] = useState(false);
    const [showRegisterOff, setShowRegisterOff] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const navigate = useNavigate();
    const handleSearch = (query) => {
        navigate(`/search?query=${encodeURIComponent(query)}`);
    };

    const [showScroll, setShowScroll] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setShowScroll(window.pageYOffset > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <>
        <Navbar expand="lg" bg="black" variant="dark" fixed="top" className="firstNavbar">
                <Container fluid className="d-flex align-items-center justify-content-between justify-content-lg-center">
                    <Navbar.Brand href="#home" className="d-lg-none">
                        <img
                            src="/image/logo2.png"
                            alt="KinoLogo"
                            style={{ height: '60px', width: 'auto' }}
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <div className="d-flex align-items-center gap-3 d-lg-none">
                        {showScroll && (
                            <div
                                className="icon-scroll-top-mobile"
                                role="button"
                                title="Do góry"
                                onClick={scrollToTop}
                            >
                                <i className="bi bi-arrow-up"></i>
                            </div>
                        )}
                        {/* Ikona użytkownika */}
                        <div
                            className="icon-loginMobile"
                            role="button"
                            title="Konto"
                            onClick={() => {
                                setMobileTab('login');         
                                setShowMobileUserOff(true);   
                            }}
                        >
                            <i className="bi bi-person icon-loginMobile"></i>
                        </div>

                        {/* Hamburger */}
                        <Navbar.Toggle aria-controls="offcanvasNavbar" />

                    </div>
                    {/* Offcanvas dla małych ekranów */}
                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end"
                        className="offcanvas-custom d-lg-none"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel"><img
                                src="/image/logo2.png"
                                alt="KinoLogo"
                                style={{ height: '60px', width: 'auto' }}
                                className="d-inline-block align-top"
                            /></Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="d-flex flex-column justify-content-center align-items-center text-center h-100 gap-5">
                                
                                <Nav.Link href="#action1">Repertuar</Nav.Link>
                                <Nav.Link href="#action2">Zwiastuny</Nav.Link>
                                <Nav.Link href="#action3">Wkrotce</Nav.Link>
                                <Nav.Link href="#action4">Rodziny</Nav.Link>
                                <Nav.Link href="#action4">Wybierz miasto</Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                    
                    <Offcanvas
                        show={showMobileUserOff}
                        onHide={() => setShowMobileUserOff(false)}
                        placement="end"
                        className="offcanvas-custom user-offcanvas d-lg-none"
                    >
                        <Offcanvas.Header closeButton />

                        <Tabs
                            id="mobile-account-tabs"
                            activeKey={mobileTab}
                            onSelect={k => setMobileTab(k)}
                            className="mb-3 px-3"
                        >
                            <Tab eventKey="login" title="Logowanie" />
                            <Tab eventKey="register" title="Rejestracja" />
                        </Tabs>

                        <Offcanvas.Body>
                            {mobileTab === 'login'
                                ? <LoginFormComponent onSuccess={() => setShowMobileUserOff(false)} />
                                : <RegisterFormComponent onSuccess={() => setShowMobileUserOff(false)} />}
                        </Offcanvas.Body>
                    </Offcanvas>
                    
                    {/* Klasyczne menu dla dużych ekranów */}
                    <Navbar.Collapse id="navbarNavDropdown" className="d-none d-lg-flex justify-content-center">
                        <Nav className="align-items-center mx-auto">
                            <Navbar.Brand href="#home" className="d-none d-lg-block me-4">
                                <img
                                    src="/image/logo2.png"
                                    alt="KinoLogo"
                                    style={{ height: '60px', width: 'auto' }}
                                    className="d-inline-block align-top"
                                />
                            </Navbar.Brand>
                            <div className="city-selector position-relative">
                                <div
                                    className="linksMenuDesktop city-selector"
                                    role="button"
                                    onClick={() => setShowCityDropdown(!showCityDropdown)}
                                >
                                    <i className="bi bi-geo-alt-fill me-2" style={{ fontSize: '1rem' }}></i>
                                    {selectedCity || 'Wybierz miasto'}
                                    <i className="bi bi-chevron-down ms-2" />
                                </div>

                                {showCityDropdown && (
                                    <ul className="city-dropdown">
                                        {cities.map(city => (
                                            <li
                                                key={city}
                                                onClick={() => {
                                                    setSelectedCity(city);
                                                    setShowCityDropdown(false);
                                                }}
                                            >
                                                {city}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="vertical-divider d-none d-lg-block"></div>
                            <Nav.Link className="linksMenuDesktop" role="button" onClick={() => setShowLoginOff(true)}><i className="bi bi-person me-2" style={{ fontSize: '1rem' }}></i>Logowanie</Nav.Link>
                            <div className="vertical-divider d-none d-lg-block"></div>
                            <Nav.Link className="linksMenuDesktop" role="button" onClick={() => setShowRegisterOff(true)}>Rejestracja</Nav.Link>
                            <SearchInput onSearch={handleSearch} />
                        </Nav>

                        <LoginOffcanvas
                            show={showLoginOff}
                            onHide={() => setShowLoginOff(false)}
                        />
                        <RegisterOffcanvas
                            show={showRegisterOff}
                            onHide={() => setShowRegisterOff(false)}
                        />
                      
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Navbar expand="lg" fixed="top" className="secondNavbarDesktop d-none d-lg-flex">
                

                {/* DRUGI RZĄD - widoczny tylko na dużych ekranach */}
                <Container className="d-none d-lg-flex justify-content-center">
                    <Nav className="gap-3 align-items-center">
                        <Nav.Link href="#action1" className="linksMenuDesktop2">Repertuar</Nav.Link>
                        <div className="vertical-divider2 d-none d-lg-block"></div>
                        <Nav.Link href="#action2" className="linksMenuDesktop2">Zwiastuny</Nav.Link>
                        <div className="vertical-divider2 d-none d-lg-block"></div>
                        <Nav.Link href="#action3" className="linksMenuDesktop2">Wkrotce</Nav.Link>
                        <div className="vertical-divider2 d-none d-lg-block"></div>
                        <Nav.Link href="#action4" className="linksMenuDesktop2">Rodziny</Nav.Link>
                        <div className="vertical-divider2 d-none d-lg-block"></div>
                        <Nav.Link href="#action5" className="linksMenuDesktop2">O nas</Nav.Link>
                        <div className="vertical-divider2 d-none d-lg-block"></div>
                        <Nav.Link as={Link} to="/kontakt" className="linksMenuDesktop2">Kontakt</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}