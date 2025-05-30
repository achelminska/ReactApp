import React, { useState } from 'react';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/contactform.scss';

const options = [
    { value: 'Zakup biletów', label: 'Zakup biletów' },
    { value: 'Karta Unlimited', label: 'Karta Unlimited' },
    { value: 'Konto Online', label: 'Konto Online' },
    { value: 'Vouchery i Karty Podarunkowe', label: 'Vouchery i Karty Podarunkowe' }
];

const selectOptionsMap = {
    'Zakup biletów': [
        { value: 'potwierdzenie', label: 'Brak potwierdzenia zakupu biletów' },
        { value: 'zamowienie', label: 'Problem ze zwrotem biletów' },
        { value: 'firmy', label: 'Problem z zakupem biletów' },
    ],
    'Karta Unlimited': [
        { value: 'potwierdzenie', label: 'Rozwiązanie umowy' },
        { value: 'zamowienie', label: 'Przedłużenie umowy' },
        { value: 'firmy', label: 'Zaległa płatność' },
    ],
    'Konto Online': [
        { value: 'potwierdzenie', label: 'Problem z logowaniem' },
        { value: 'zamowienie', label: 'Problem ze zmianą hasła' },
        { value: 'firmy', label: 'Zmiana danych' },
    ],
    'Vouchery i Karty Podarunkowe': [
        { value: 'voucher', label: 'Problem z realizacją vouchera / karty podarunkowej' },
        { value: 'zamowienie', label: 'Problem z zamówieniem' },
        { value: 'firmy', label: 'Zakup dla firm' },
    ]
};

const cinemaLocations = [
    'Warszawa', 'Kraków', 'Poznań', 'Wrocław', 'Łódź', 'Katowice', 'Lublin', 'Częstochowa', 'Toruń',
    'Bydgoszcz', 'Zielona Góra', 'Wałbrzych', 'Gliwice', 'Sosnowiec', 'Ruda Śląska', 'Rybnik',
    'Bytom', 'Bielsko-Biała', 'Starogard Gdański', 'Cieszyn', 'Elbląg'
].map(city => ({ value: city, label: city }));

const customSelectStyles = {
    control: (base) => ({
        ...base,
        backgroundColor: '#000',
        color: '#fff',
        borderRadius: '20px',
        border: '1px solid #666',
        padding: '10px 4px 0px 4px',
        textAlign: 'left',
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: '#000',
        borderRadius: '20px',
        border: '1px solid #666',
        overflow: 'hidden',
    }),
    option: (base, { isFocused }) => ({
        ...base,
        backgroundColor: isFocused ? '#333' : '#000',
        color: '#fff',
        cursor: 'pointer',
    }),
    singleValue: (base) => ({
        ...base,
        color: '#fff',
    }),
};

export default function ContactFormPage() {
    const [selected, setSelected] = useState(null);
    const [reason, setReason] = useState(null);
    const [location, setLocation] = useState(null);

    const renderForm = () => {
        if (!selected) return null;

        const reasonOptions = selectOptionsMap[selected.value];

        return (
            <form>
                <label>Powód zgłoszenia*</label>
                <Select
                    options={reasonOptions}
                    styles={customSelectStyles}
                    placeholder="Wybierz..."
                    value={reason}
                    onChange={setReason}
                />

                {selected.value === 'Karta Unlimited' && (
                    <>
                        <label>Numer karty Unlimited*</label>
                        <input type="text" />
                    </>
                )}

                {selected.value === 'Zakup biletów' && (
                    <>
                        <label>Numer transakcji (jeśli dotyczy)</label>
                        <input type="text" />

                        <label>Tytuł seansu*</label>
                        <input type="text" />

                        <label>Data seansu*</label>
                        <input type="date" />

                        <label>Godzina seansu*</label>
                        <input type="time" />
                    </>
                )}

                {selected.value === 'Vouchery i Karty Podarunkowe' && (
                    <>
                        <label>Numer vouchera (jeśli dotyczy)</label>
                        <input type="text" />
                    </>
                )}

                {(selected.value === 'Zakup biletów' || selected.value === 'Vouchery i Karty Podarunkowe') && (
                    <>
                        <label>Lokalizacja kina*</label>
                        <Select
                            options={cinemaLocations}
                            styles={customSelectStyles}
                            placeholder="Wybierz..."
                            value={location}
                            onChange={setLocation}
                        />
                    </>
                )}

                <label>Imię*</label>
                <input type="text" />

                <label>Nazwisko*</label>
                <input type="text" />

                <label>Adres e-mail*</label>
                <input type="email" />

                <label>Numer telefonu{selected.value === 'Karta Unlimited' ? '*' : ''}</label>
                <input type="tel" />

                <label>Temat*</label>
                <input type="text" />

                <label>Treść wiadomości*</label>
                <textarea rows="5"></textarea>

                <button type="submit" className="submit-button">Wyślij</button>
            </form>
        );
    };

    return (
        <div className="contact-form-page">
            <div className="contact-form-content">
                <div className="section-with-line">
                    <div className="contact-header d-flex justify-content-between align-items-center px-5 py-3">
                        <Link to="/">
                            <img src="/image/logo2.png" alt="Logo" style={{ height: '50px' }} />
                        </Link>
                        <div>
                            <Button
                                as={Link}
                                to="/kontakt/contactPage"
                                variant="outline-light"
                                className="me-2 btn-knowledge"
                            >
                                Baza wiedzy
                            </Button>
                            <Button as={Link} to="/kontakt/formularz" className="contact-orange-button">Skontaktuj się z nami</Button>
                        </div>
                    </div>
                </div>

                <h2 className="text-center mt-4">Skontaktuj się z nami</h2>
                <div className="dropdown-container text-center" style={{ width: '50%', margin: '0 auto' }}>
                    <Select
                        options={options}
                        styles={customSelectStyles}
                        placeholder="Wybierz kategorię..."
                        value={selected}
                        onChange={(option) => {
                            setSelected(option);
                            setReason(null);
                            setLocation(null);
                        }}
                    />
                </div>

                {selected && <div className="form-wrapper">{renderForm()}</div>}
            </div>

            <Footer />
        </div>
    );
}
