import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="site-footer py-5">
            <Container>
                <Row className="justify-content-center">
                    <Col xs={6} md={3} className="mb-4 text-center">
                        <h5>O NAS</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/kontakt">CinemaBox Poland</Link></li>
                            <li><Link to="/kontakt/formularz">Kontakt</Link></li>
                        </ul>
                    </Col>
                    <Col xs={6} md={3} className="mb-4 text-center">
                        <h5>SERWIS</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/repertuar">Repertuar</Link></li>
                            <li><Link to="/kontakt">Baza wiedzy</Link></li>
                        </ul>
                    </Col>
                    <Col xs={6} md={3} className="mb-4 text-center">
                        <h5>INFORMACJE</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/kontakt">Regulamin</Link></li>
                            <li><Link to="/kontakt">Polityka prywatności</Link></li>
                        </ul>
                    </Col>
                    <Col xs={6} md={3} className="mb-4 text-center">
                        <h5>OBSERWUJ NAS</h5>
                        <div className="d-flex justify-content-center gap-3">
                            <a href="https://facebook.com" aria-label="Facebook" rel="noopener noreferrer"><i className="bi bi-facebook fs-4"></i></a>
                            <a href="https://instagram.com" aria-label="Instagram" rel="noopener noreferrer"><i className="bi bi-instagram fs-4"></i></a>
                            <a href="https://youtube.com" aria-label="YouTube" rel="noopener noreferrer"><i className="bi bi-youtube fs-4"></i></a>
                        </div>
                    </Col>
                </Row>
                <div className="text-center mt-4">
                    <small>© CinemaBox 2025 — projekt demonstracyjny</small>
                </div>
            </Container>
        </footer>
    );
}
