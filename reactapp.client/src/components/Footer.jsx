import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
    return (
        <footer className="site-footer py-5">
            <Container>
                <Row className="justify-content-center">
                    <Col xs={6} md={3} className="mb-4 text-center">
                        <h5>O NAS</h5>
                        <ul className="list-unstyled">
                            <li><a href="/o-nas">CinemaBox Poland</a></li>
                            <li><a href="/kariera">Pracuj z nami</a></li>
                            <li><a href="/newsletter">Newsletter</a></li>
                            <li><a href="/kontakt">Kontakt</a></li>
                        </ul>
                    </Col>
                    <Col xs={6} md={3} className="mb-4 text-center">
                        <h5>LINKI</h5>
                        <ul className="list-unstyled">
                            <li><a href="/reklama">Reklama w kinach</a></li>
                            <li><a href="/forum">Forum Film Poland</a></li>
                        </ul>
                    </Col>
                    <Col xs={6} md={3} className="mb-4 text-center">
                        <h5>INFORMACJE</h5>
                        <ul className="list-unstyled">
                            <li><a href="/regulamin">Regulacje</a></li>
                            <li><a href="/polityka">Polityka prywatnosci</a></li>
                            <li><a href="/cookies">Polityka cookies</a></li>
                        </ul>
                    </Col>
                    <Col xs={6} md={3} className="mb-4 text-center">
                        <h5>OBSERWUJ NAS</h5>
                        <div className="d-flex justify-content-center gap-3">
                            <a href="https://facebook.com" aria-label="Facebook"><i className="bi bi-facebook fs-4"></i></a>
                            <a href="https://instagram.com" aria-label="Instagram"><i className="bi bi-instagram fs-4"></i></a>
                            <a href="https://youtube.com" aria-label="YouTube"><i className="bi bi-youtube fs-4"></i></a>
                            <a href="https://linkedin.com" aria-label="LinkedIn"><i className="bi bi-linkedin fs-4"></i></a>
                        </div>
                    </Col>
                </Row>
                <div className="text-center mt-4">
                    <small>© CinemaBox 2025</small>
                </div>
            </Container>
        </footer>
    );
}