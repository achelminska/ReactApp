import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/contactform.scss';

const options = [
    'Zakup biletów',
    'Karta Unlimited',
    'Konto Online',
    'Vouchery i Karty Podarunkowe'
];

export default function ContactFormPage() {
    const [selected, setSelected] = useState('');

    return (
        <div className="contact-form-page">
            <div className="contact-form-content">
            {/* Nagłówek z logo i przyciskami */}
            <div className="section-with-line">
                <div className="contact-header d-flex justify-content-between align-items-center px-5 py-3">
                    <img src="/image/logo2.png" alt="Logo" style={{ height: '50px' }} />
                    <div>
                        <Button variant="outline-light" className="me-2 btn-knowledge">Baza wiedzy</Button>
                        <Button
                            as={Link}
                            to="/kontakt/formularz"
                            className="contact-orange-button"
                        >
                            Skontaktuj się z nami
                        </Button>
                    </div>
                </div>
            </div>

            <h2 className="text-center mt-4">Skontaktuj się z nami</h2>
            <div className="dropdown-container text-center">
                <select
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    className="dropdown-select"
                >
                    <option value="">Wybierz kategorię...</option>
                    {options.map((option, idx) => (
                        <option key={idx} value={option}>{option}</option>
                    ))}
                </select>
            </div>

            {selected && (
                <div className="form-wrapper">
                    <form>
                        <label>Powód zgłoszenia*</label>
                        <select><option>Wybierz...</option></select>

                        <label>Numer transakcji</label>
                        <input type="text" />

                        <label>Tytuł seansu*</label>
                        <input type="text" />

                        <label>Data seansu*</label>
                        <input type="date" />

                        <label>Godzina seansu*</label>
                        <input type="time" />

                        <label>Lokalizacja kina*</label>
                        <select><option>Wybierz...</option></select>

                        <label>Imię*</label>
                        <input type="text" />

                        <label>Nazwisko*</label>
                        <input type="text" />

                        <label>Adres e-mail*</label>
                        <input type="email" />

                        <label>Numer telefonu</label>
                        <input type="tel" />

                        <label>Temat*</label>
                        <input type="text" />

                        <label>Treść wiadomości*</label>
                        <textarea rows="5"></textarea>

                        <button type="submit" className="submit-button">Wyślij</button>
                    </form>
                </div>
            )}
            </div>
            <Footer />
        </div>
    );
}