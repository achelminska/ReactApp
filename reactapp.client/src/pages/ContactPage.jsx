import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Accordion, Form } from 'react-bootstrap';
import Footer from '../components/Footer';
import '../styles/contactpage.scss';

const faqData = {
    "Repertuar": [
        {
            question: "Kiedy na stronie pojawi się repertuar?",
            answer: "Repertuar aktualizowany jest co tydzień. Pojawia się na naszej stronie we wtorek wieczorem lub w środę rano i obowiązuje na kolejny tydzień repertuarowy trwający od piątku do czwartku. W przypadku wcześniejszej przedsprzedaży na wybrane tytuły, w repertuarze mogą pojawić się seanse na daty wybiegające poza tydzień repertuarowy."
        },
        {
            question: "Jak długo film będzie dostępny w repertuarze?",
            answer: "Nie mamy z góry określonego czasu w jakim dana produkcja będzie znajdować się w repertuarze, jest to zależne m.in od popularności filmu oraz od ilości sal dostępnych w naszych kinach. Jeżeli w repertuarze dostępny jest wyłącznie jeden seans, to może oznaczać, że niebawem film zejdzie z naszych ekranów."
        },
        {
            question: "Gdzie mogę sprawdzić, jakie jest ograniczenie wiekowe dla wybranego filmu?",
            answer: "Ograniczenie wiekowe, o ile zostało określone przez dystrybutora, znajduje się na stronie z opisem filmu."
        },
        {
            question: "Czy mogę zabrać ze sobą dziecko na seans, jeżeli jest młodsze, niż wskazuje na to ograniczenie wiekowe?",
            answer: "Rodzice i opiekunowie prawni ponoszą pełną odpowiedzialność za treści, z którymi podczas seansu spotka się młody widz."
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
            answer: "Nieustannie staramy się dostosować repertuar do wymagań i oczekiwań naszych klientów, jednak jego finalny układ zależny jest od różnych czynników."
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
                    answer: `Możesz dokonać zakupu biletu logując się na swoje konto online za pośrednictwem naszej strony internetowej lub aplikacji. 
                    Jeżeli nie posiadasz konta, zarejestruj się wcześniej na stronie. 
                    Możesz również dokonać zakupu bez rejestracji, jako Gość. 
                    Alternatywnie, możesz udać się do kina i zakupić bilet w kasie – pod warunkiem dostępności repertuaru oraz miejsc na wybrany seans.`
                },
                {
                    question: "Dokonałem zakupu biletów, gdzie mogę je znaleźć?",
                    answer: `Jeżeli transakcja została zakończona pomyślnie, bilety wraz z potwierdzeniem trafią na adres e-mail podany podczas zakupu. 
                    Możesz również zalogować się na swoje konto na naszej stronie internetowej lub w aplikacji mobilnej – w zakładce „Moje Bilety” znajdziesz zakupione bilety, 
                    które możesz okazać w kinie podczas kontroli.`
                },
                {
                    question: "Czy podczas kontroli biletów w kinie mogę okazać bilety na telefonie?",
                    answer: `Tak. Nie ma potrzeby drukowania biletów, możesz okazać je na smartfonie lub innym nośniku elektronicznym.`
                },
                {
                    question: "Nie mam ze sobą biletów internetowych. Czy istnieje możliwość uzyskania w kasie kopii biletów zakupionych online?",
                    answer: `Tak. Możesz poprosić Obsługę kina w barze kinowym o wydrukowanie zakupionych biletów, w tym celu przygotuj dane podane podczas rejestracji, w celu odnalezienia transakcji.`
                },
                {
                    question: "Czy mogę zarezerwować bilety?",
                    answer: `Zarówno w kinie jak i w witrynach możliwy jest wyłącznie zakup biletów, nie ma możliwości rezerwacji. Jeżeli planowane jest wyjście grupowe z placówki, możliwe jest dokonanie 
                    rezerwacji grupowej po kontakcie z Biurem Rezerwacji Grupowych. Dane kontaktowe dostępne są na naszej stronie internetowej w zakładce SZKOŁY.`
                },
                {
                    question: "Jak otrzymać fakturę za zakup biletów?",
                    answer: `Jeżeli dokonałeś zakupu biletów internetowych skontaktuj się z Biurem Obsługi Klienta na adres bok@cinema-city.pl w celu uzyskania faktury, podając dane do faktury oraz numer 
                    zamówienia. W celu otrzymania faktury za bilety zakupione w kinie zgłoś się do obsługi kina wraz z paragonem lub biletem w przypadku zakupu w biletomacie.`
                },
                {
                    question: "Gdzie znajdę cennik biletów?",
                    answer: `Cennik biletów można zweryfikować w kinie lub na naszej stronie internetowej. Należy wybrać ULUBIONE KINO, następnie na dole strony wejść w zakładkę O KINIE.`
                },
                {
                    question: "Czy okulary 3D są zwrotne?",
                    answer: `Nie, okulary 3D nie podlegają zwrotowi. Okulary 3D oraz 3D IMAX możesz zachować celem wykorzystania na kolejne seanse 3D w naszych kinach.`
                },
                {
                    question: "Czy okulary 3D są dostępne w mniejszej wersji dla dzieci?",
                    answer: `Tak. Okulary 3D dostępne są w dwóch wariantach: w wersji standardowej dla dorosłych lub w wersji mniejszej dla dzieci. `
                },

            ],
            "Zwrot biletów": [
                {
                    question: "Czy mogę zwrócić bilet?",
                    answer: "Bilety można zwrócić maksymalnie 2 godziny przed seansem."
                },
                {
                    question: "W jaki sposób mogę zwrócić bilet zakupiony online?",
                    answer: "Zaloguj się na swoje konto na stronie internetowej lub w aplikacji i dokonaj anulacji wybranych biletów. Pamiętaj, że zgodnie z regulaminem anulacja biletów możliwa jest do 2 godzin przed rozpoczęciem seansu. Po upływie tego czasu bilet nie podlega zwrotowi."
                },
                {
                    question: "Czy mogę zwrócić bilety zakupione z użyciem vouchera lub karty podarunkowej?",
                    answer: "Zgodnie z regulaminem, bilet zakupiony przy użyciu vouchera lub karty podarunkowej nie podlega zwrotowi."
                },
                {
                    question: "Czy mogę zwrócić bilety zakupione z użyciem vouchera lub karty podarunkowej?",
                    answer: "Zgodnie z regulaminem, bilet zakupiony przy użyciu vouchera lub karty podarunkowej nie podlega zwrotowi."
                },

            ],
            "Bilety zniżkowe": [
                {
                    question: "Czy mogę zwrócić bilet?",
                    answer: "Bilety można zwrócić maksymalnie 2 godziny przed seansem."
                }
            ],
            "Seanse specjalne": [
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
                                            setActiveSubcategory(null);
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
                                <Accordion defaultActiveKey="0" className="rounded-accordion">
                                    {faqData[activeCategory].map((item, index) => (
                                        <Accordion.Item eventKey={index.toString()} key={index}>
                                            <Accordion.Header>{item.question}</Accordion.Header>
                                            <Accordion.Body>{item.answer}</Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            ) : (
                                activeSubcategory && (
                                        <Accordion defaultActiveKey="0" className="rounded-accordion">
                                        {faqData[activeCategory].subcategories[activeSubcategory].map((item, index) => (
                                            <Accordion.Item eventKey={index.toString()} key={index}>
                                                <Accordion.Header>{item.question}</Accordion.Header>
                                                <Accordion.Body>{item.answer}</Accordion.Body>
                                            </Accordion.Item>
                                        ))}
                                    </Accordion>
                                )
                            )}
                        </Col>
                    </Row>

                    <Row className="mt-5 text-center">
                        <Col>
                            <h4 className="text-white">Nie możesz znaleźć tego, czego potrzebujesz?</h4>
                            <button className="contact-orange-button">
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