import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { contactApi, cinemasApi } from '../api';
import '../styles/contactform.scss';

const options = [
    { value: 'Zakup biletów', label: 'Zakup biletów' },
    { value: 'Konto Online', label: 'Konto Online' },
    { value: 'Vouchery', label: 'Vouchery i Karty Podarunkowe' },
    { value: 'Inne', label: 'Inne' },
];

const customSelectStyles = {
    control: (base) => ({ ...base, backgroundColor: '#000', color: '#fff', borderRadius: '20px', border: '1px solid #666', padding: '10px 4px 0px 4px', textAlign: 'left' }),
    menu: (base) => ({ ...base, backgroundColor: '#000', borderRadius: '20px', border: '1px solid #666', overflow: 'hidden' }),
    option: (base, { isFocused }) => ({ ...base, backgroundColor: isFocused ? '#333' : '#000', color: '#fff', cursor: 'pointer' }),
    singleValue: (base) => ({ ...base, color: '#fff' }),
};

export default function ContactFormPage() {
    const [selected, setSelected] = useState(null);
    const [cities, setCities] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', city: '' });
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        cinemasApi.cities().then(list => setCities(list.map(c => ({ value: c, label: c })))).catch(() => {});
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            await contactApi.send({
                name: form.name,
                email: form.email,
                category: selected?.value || 'Inne',
                subject: form.subject,
                message: form.message + (form.city ? `\nMiasto: ${form.city}` : ''),
            });
            setShowModal(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="contact-form-page">
            <div className="contact-form-content">
                <div className="section-with-line">
                    <div className="contact-header d-flex justify-content-between align-items-center px-5 py-3">
                        <Link to="/"><img src="/image/logo2.png" alt="Logo" style={{ height: '50px' }} /></Link>
                        <div>
                            <Button as={Link} to="/kontakt" variant="outline-light" className="me-2 btn-knowledge">Baza wiedzy</Button>
                            <Button as={Link} to="/kontakt/formularz" className="contact-orange-button">Skontaktuj się z nami</Button>
                        </div>
                    </div>
                </div>

                <h2 className="text-center mt-4">Skontaktuj się z nami</h2>
                <div className="dropdown-container text-center" style={{ width: window.innerWidth <= 768 ? '80%' : '50%', margin: '0 auto' }}>
                    <Select options={options} styles={customSelectStyles} placeholder="Wybierz kategorię..." value={selected} onChange={setSelected} />
                </div>

                {selected && (
                    <div className="form-wrapper">
                        <form onSubmit={handleSubmit}>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <label>Imię i nazwisko*</label>
                            <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                            <label>Adres e-mail*</label>
                            <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                            <label>Miasto (opcjonalnie)</label>
                            <Select options={cities} styles={customSelectStyles} placeholder="Wybierz..." onChange={o => setForm({ ...form, city: o?.value || '' })} />
                            <label>Temat*</label>
                            <input type="text" required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
                            <label>Treść wiadomości*</label>
                            <textarea rows="5" required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                            <button type="submit" className="submit-button" disabled={submitting}>
                                {submitting ? 'Wysyłanie...' : 'Wyślij'}
                            </button>
                            {showModal && (
                                <div className="modal-overlay">
                                    <div className="modal-content">
                                        <p>Twoje zapytanie zostało wysłane.<br />Odpowiemy na adres: {form.email}</p>
                                        <button type="button" onClick={() => { setShowModal(false); setForm({ name: '', email: '', subject: '', message: '', city: '' }); setSelected(null); }}>Zamknij</button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
