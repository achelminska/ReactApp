import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/orderSummary.scss';

export default function OrderSummaryPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { film, kino, data, godzina, ticketTypes } = state || {};
    const total = ticketTypes?.reduce((sum, t) => sum + (t === 'Ulgowy' ? 26.90 : 29.90), 0) || 0;
    const serviceFee = ticketTypes?.length * 2 || 0;
    const totalWithFee = total + serviceFee;

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        confirmEmail: '',
        phone: '',
        accepted: false
    });
    const [selectedMethod, setSelectedMethod] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        const { name, surname, email, confirmEmail, accepted } = formData;
        const allFilled = name && surname && email && confirmEmail && accepted;
        const emailsMatch = email === confirmEmail;
        setFormValid(allFilled && emailsMatch);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handlePaymentSelect = (method) => {
        if (formValid) {
            setSelectedMethod(method);
            setShowDialog(true);
            setTimeout(() => {
                // Tu możesz dodać nawigację lub przekierowanie np. do bramki płatności
                console.log("Przekierowanie do płatności:", method);
            }, 3000);
        }
    };

    return (
        <div className="order-page">
            {showDialog && (
                <div className="payment-dialog">
                    <div className="dialog-content">
                        <p>Przekierowywanie do płatności...</p>
                        <div className="loader"></div>
                    </div>
                </div>
            )}

            <div className="booking-header">
                <div className="top-header">
                    <div className="logo-container">
                        <img src="/image/logo2.png" alt="Logo" />
                    </div>
                    <div className="top-bar">
                        <div className="step">1<br />Wybór miejsc</div>
                        <div className="step">2<br />Wybór biletów</div>
                        <div className="step active">3<br />Zamówienie</div>
                    </div>
                </div>

                <div className="movie-bar">
                    <div className="movie-info">
                        <strong>{film}</strong> – {kino} | {data} | {godzina}
                    </div>
                </div>
            </div>

            <div className="order-content">
                <h2>ZAMÓWIENIE</h2>
                <p><strong>Liczba biletów:</strong> {ticketTypes?.length || 0}</p>
                <p className="fee">w tym opłata serwisowa: {serviceFee.toFixed(2)} zł</p>
                <p><strong>Razem:</strong> {totalWithFee.toFixed(2)} zł</p>

                <form className="order-form">
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Imię" required />
                    <input name="surname" value={formData.surname} onChange={handleChange} placeholder="Nazwisko" required />
                    <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="E-Mail" required />
                    <input name="confirmEmail" type="email" value={formData.confirmEmail} onChange={handleChange} placeholder="Potwierdź e-mail" required />
                    <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Numer telefonu (opcjonalnie)" />

                    <label className="accept">
                        <input type="checkbox" name="accepted" checked={formData.accepted} onChange={handleChange} required />
                        Przeczytałam(em) i akceptuję <a href="#">Regulamin zakupu przez Internet</a> oraz <a href="#">Politykę Prywatności</a>.
                    </label>

                    <div className="payment-methods">
                        {['karta', 'PayU', 'Klarna', 'Blik', 'PayPal'].map(method => (
                            <button
                                key={method}
                                type="button"
                                className={`pay-button ${selectedMethod === method ? 'selected' : ''}`}
                                onClick={() => handlePaymentSelect(method)}
                                disabled={!formValid}
                            >
                                {method === 'karta' ? 'użyj karty kredytowej/płatniczej' : method}
                            </button>
                        ))}
                    </div>
                    <button type="button" className="back-button" onClick={() => navigate(-1)}>WRÓĆ</button>
                </form>
            </div>

            <Footer />
        </div>
    );
}
