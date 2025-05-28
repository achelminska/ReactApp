import { useState } from 'react';
import { Button, Offcanvas, Form } from 'react-bootstrap';
import '../styles/buyticket.scss';

export default function BuyTicketButton() {
    const [showForm, setShowForm] = useState(false);

    return (
        <>
            {/* P³ywaj¹cy przycisk */}
            <div className="floating-zakup-btn" onClick={() => setShowForm(true)}>
                <Button variant="danger" className="button-kupbilet rounded-pill d-flex align-items-center px-4 py-3 gap-2">
                    <i className="bi bi-cart3 fs-4"></i>
                    <span className="fw-bold">KUP BILET</span>
                </Button>
            </div>

            {/* Panel szybkiego zakupu */}
            <Offcanvas
                show={showForm}
                onHide={() => setShowForm(false)}
                placement="end"
                className="offcanvas-custom"
                scroll={true}
                backdrop={true}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="szybkiZakupMobile">Szybki zakup</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Kino</Form.Label>
                            <Form.Select><option>Wybierz kino</option></Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Film</Form.Label>
                            <Form.Select><option>Wybierz film</option></Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Data</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Godzina</Form.Label>
                            <Form.Control type="time" />
                        </Form.Group>
                        <div className="d-flex justify-content-end">
                            <Button variant="outline-secondary" className="me-2">Reset</Button>
                            <Button variant="primary">Szukaj</Button>
                        </div>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}