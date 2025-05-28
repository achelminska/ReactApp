import React, { useState } from 'react';
import { Container, Row, Col, Button, Accordion, Form } from 'react-bootstrap';
import Footer from '../components/Footer';
import '../styles/contactpage.scss';

const faqData = {
    "Repertuar": [
        {
            question: "Kiedy na stronie pojawi się repertuar?",
            answer: `Repertuar aktualizowany jest co tydzień. Pojawia się na naszej stronie we wtorek wieczorem lub w środę rano i obowiązuje na 
            kolejny tydzień repertuarowy trwający od piątku do czwartku. W przypadku wcześniejszej przedsprzedaży na wybrane tytuły, w repertuarze 
            mogą pojawić się seanse na daty wybiegające poza tydzień repertuarowy.`
        },
        {
            question: "Jak długo film będzie dostępny w repertuarze?",
            answer: `Nie mamy z góry określonego czasu w jakim dana produkcja będzie znajdować się w repertuarze, jest to zależne m.in od popularności 
            filmu oraz od ilości sal dostępnych w naszych kinach. Jeżeli w repertuarze dostępny jest wyłącznie jeden seans, to może oznaczać, że niebawem 
            film zejdzie z naszych ekranów.`
        },
        {
            question: "Gdzie mogę sprawdzić, jakie jest ograniczenie wiekowe dla wybranego filmu?",
            answer: "Ograniczenie wiekowe, o ile zostało określone przez dystrybutora, znajduje się na stronie z opisem filmu."
        },
        {
            question: "Czy mogę zabrać ze sobą dziecko na seans, jeżeli jest młodsze, niż wskazuje na to ograniczenie wiekowe?",
            answer: `Adnotacja dotycząca ograniczenia wiekowego jest wyłącznie kwestią informacyjną, określoną przez dystrybutora filmu. 
            Rodzice i opiekunowie prawni ponoszą pełną odpowiedzialność za treści, z którymi podczas seansu spotka się młody widz. 
            Prosimy opiekunów, by przed podjęciem decyzji o udziale w projekcji młodego widza, uważnie zapoznawali się nie tylko z sugerowaną przez dystrybutora kategorią wiekową, ale również z opisem i zwiastunem filmu.`
        },
        {
            question: "Czy godzina podana w repertuarze jest godziną rozpoczęcia seansu?",
            answer: "Godziny rozpoczęcia seansów określone w repertuarze wskazują czas rozpoczęcia projekcji, której częścią jest blok reklam i zwiastunów filmowych, po zakończeniu którego rozpoczyna się emisja filmu."
        },
        {
            question: "Gdzie mogę sprawdzić, czy film jest z napisami czy z dubbingiem?",
            answer: "Informacje o dostępnych wersjach filmu znajdują się na stronie filmu oraz w repertuarze."
        },
        {
            question: "Dlaczego w moim kinie nie są wyświetlane wszystkie filmy?",
            answer: `Nieustannie staramy się dostosować repertuar do wymagań i oczekiwań naszych klientów, jednak jego finalny układ zależny jest od różnych czynników: rozkład i ilość sal w naszych kinach, 
            popularność filmu, ilość premier wypadających w danym tygodniu repertuarowym.`
        },
        {
            question: "Dlaczego film, którego premiera wypada w piątek, jest wyświetlany już w środę?",
            answer: "Niektóre seanse, zgodnie z decyzją dystrybutora, mogą pojawić się w repertuarze przed dniem premiery, w ramach seansu przedpremierowego."
        },
        {
            question: "Czy seanse przedpremierowe różnią się od seansów wyświetlanych od dnia premiery?",
            answer: "Seanse wyświetlane w ramach przedpremiery nie różnią się od projekcji wyświetlanych od dnia premiery."
        },
        {
            question: "Gdzie znajdę informacje na temat seansów przedpremierowych?",
            answer: "Informacje o dostępnych oraz planowanych przedpremierach lub premierach filmu znajdują się na dole strony oraz mogą pojawić się na naszych kanałach social media."
        }
    ],
    "Bilety i Zwroty": {
        subcategories: {
            "Zakup biletów": [
                {
                    question: "W jaki sposób mogę dokonać zakupu biletu?",
                    answer: "Możesz kupić bilet online, w aplikacji lub w kasie kina."
                }
            ],
            "Zwrot biletów": [
                {
                    question: "Czy mogę zwrócić bilet?",
                    answer: "Bilety można zwrócić maksymalnie 2 godziny przed seansem."
                }
            ]
        }
    },
    "Konto online": {
        subcategories: {
            "Dostęp": [
                {
                    question: "Zapomniałem hasła, co robić?",
                    answer: "Skorzystaj z opcji 'Przypomnij hasło' na stronie logowania."
                }
            ]
        }
    },
    "Inne": {
        subcategories: {
            "Ogólne": [
                {
                    question: "Czy mogę zabrać jedzenie z zewnątrz?",
                    answer: "Nie. Obowiązuje zakaz wnoszenia jedzenia spoza kina."
                }
            ]
        }
    }
};



export default function ContactPage() {
    const [activeCategory, setActiveCategory] = useState('Repertuar');
    const [activeSubcategory, setActiveSubcategory] = useState(null);

    return (
        <div className="contact-page d-flex flex-column">
            <div className="flex-grow-1">
                <div className="section-with-line">
                    <div className="contact-header d-flex justify-content-between align-items-center px-5 py-3">
                        <img src="/image/logo2.png" alt="Logo" style={{ height: '50px' }} />
                        <div>
                            <Button variant="outline-light" className="me-2">Baza wiedzy</Button>
                            <Button variant="warning">Skontaktuj się z nami</Button>
                        </div>
                    </div>
                </div>

                <Container fluid className="contact-body">
                    <h2 className="text-white text-center mt-5">Cześć, jak możemy Ci pomóc?</h2>
                    <Row className="justify-content-center">
                        <Col md={8} className="my-4">
                            <Form.Control
                                type="text"
                                placeholder="Tutaj wprowadź wyszukiwany termin..."
                                className="search-input"
                            />
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col md={3} className="faq-sidebar">
                            {Object.keys(faqData).map(category => (
                                <div key={category}>
                                    <Button
                                        className={`w-100 mb-2 sidebar-btn ${category === activeCategory ? 'btn-warning' : 'btn-secondary'}`}
                                        onClick={() => {
                                            setActiveCategory(category);
                                            setActiveSubcategory(null); // wyczyść podkategorię jeśli zmieniasz kategorię
                                        }}
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
                                // 🔸 Repertuar – bez podkategorii
                                <Accordion defaultActiveKey="0">
                                    {faqData[activeCategory].map((item, index) => (
                                        <Accordion.Item eventKey={index.toString()} key={index}>
                                            <Accordion.Header>{item.question}</Accordion.Header>
                                            <Accordion.Body>{item.answer}</Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            ) : (
                                // 🔸 Kategoria z subkategoriami – np. „Bilety i Zwroty”
                                <>
                                   

                                    {activeSubcategory && (
                                        <>
                                            <h4 className="text-white mb-4">{activeSubcategory}</h4>
                                            <Accordion defaultActiveKey="0">
                                                {faqData[activeCategory].subcategories[activeSubcategory].map((item, index) => (
                                                    <Accordion.Item eventKey={index.toString()} key={index}>
                                                        <Accordion.Header>{item.question}</Accordion.Header>
                                                        <Accordion.Body>{item.answer}</Accordion.Body>
                                                    </Accordion.Item>
                                                ))}
                                            </Accordion>
                                        </>
                                    )}
                                </>
                            )}
                        </Col>
                    </Row>

                    <Row className="mt-5 text-center">
                        <Col>
                            <h4 className="text-white">Nie możesz znaleźć tego, czego potrzebujesz?</h4>
                            <button class="contact-orange-button">
                                Skontaktuj się z nami
                            </button>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Footer />
        </div>
    );
}