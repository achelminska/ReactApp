import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Accordion, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/contactpage.scss';
import faqData from '../content/faqData';

export default function ContactPage() {
    const [activeCategory, setActiveCategory] = useState('Repertuar');
    const [activeSubcategory, setActiveSubcategory] = useState(null);

    useEffect(() => {
        if (!Array.isArray(faqData[activeCategory])) {
            const firstSub = Object.keys(faqData[activeCategory].subcategories)[0];
            setActiveSubcategory(firstSub);
        }
    }, [activeCategory]);

    return (
        <div className="contact-page d-flex flex-column">
            <div className="flex-grow-1">
                <div className="section-with-line">
                    <div className="contact-header d-flex justify-content-between align-items-center px-5 py-3">
                        <Link to="/">
                            <img src="/image/logo2.png" alt="Logo" style={{ height: '50px' }} />
                        </Link>
                        <div>
                            <Button variant="outline-light" className="me-2 btn-knowledge">Baza wiedzy</Button>
                            <Button as={Link} to="/kontakt/formularz" className="contact-orange-button">
                                Skontaktuj się z nami
                            </Button>
                        </div>
                    </div>
                </div>

                <Container fluid className="contact-body">
                    <h2 className="text-white text-center mt-5">Cześć, jak możemy Ci pomóc?</h2>
                    <Row className="justify-content-center">
                        <Col md={8} className="my-4">
                            <Form.Control type="text" placeholder="Tutaj wprowadź wyszukiwany termin..." className="search-input" />
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col md={3} className="faq-sidebar">
                            {Object.keys(faqData).map(category => (
                                <div key={category}>
                                    <Button
                                        className={`w-100 mb-2 sidebar-btn ${category === activeCategory ? 'btn-warning' : 'btn-secondary'}`}
                                        onClick={() => { setActiveCategory(category); setActiveSubcategory(null); }}
                                    >
                                        {category}
                                    </Button>
                                    {category === activeCategory && !Array.isArray(faqData[category]) && (
                                        <div className="submenu bg-dark rounded p-2 mb-2">
                                            {Object.keys(faqData[category].subcategories).map((sub, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`text-white px-3 py-1 ${sub === activeSubcategory ? 'fw-bold' : ''}`}
                                                    role="button"
                                                    onClick={() => setActiveSubcategory(sub)}
                                                >
                                                    {sub}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </Col>

                        <Col md={9} className="faq-content">
                            {Array.isArray(faqData[activeCategory]) ? (
                                <Accordion className="rounded-accordion">
                                    {faqData[activeCategory].map((item, index) => (
                                        <Accordion.Item eventKey={index.toString()} key={index}>
                                            <Accordion.Header>{item.question}</Accordion.Header>
                                            <Accordion.Body>
                                                {item.answer.split('\n').map((line, i) => (
                                                    <span key={i}>{line}<br /></span>
                                                ))}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            ) : activeSubcategory && (
                                <Accordion className="rounded-accordion">
                                    {faqData[activeCategory].subcategories[activeSubcategory].map((item, index) => (
                                        <Accordion.Item eventKey={index.toString()} key={index}>
                                            <Accordion.Header>{item.question}</Accordion.Header>
                                            <Accordion.Body>
                                                {item.answer.split('\n').map((line, idx) => (
                                                    <span key={idx}>{line}<br /></span>
                                                ))}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            )}
                        </Col>
                    </Row>

                    <Row className="mt-5 text-center">
                        <Col>
                            <h4 className="text-white">Nie możesz znaleźć tego, czego potrzebujesz?</h4>
                            <Link to="/kontakt/formularz" className="contact-orange-button mt-4">
                                Skontaktuj się z nami
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    );
}
