import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { bookingsApi } from '../api';
import '../styles/orderSummary.scss';

function parseSeat(seatId) {
    const match = seatId.match(/R(\d+)S(\d+)/);
    return match ? { row: +match[1], seatNumber: +match[2] } : null;
}

export default function OrderSummaryPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { showtimeId, film, kino, data, godzina, selectedSeats, seatTickets, ticketTypes } = state || {};

    const total = seatTickets?.reduce((sum, id) => {
        const t = ticketTypes?.find(tt => tt.id === id);
        return sum + (t?.price || 0);
    }, 0) || 0;
    const serviceFee = seatTickets?.length * 2 || 0;
    const totalWithFee = total + serviceFee;

    const [formData, setFormData] = useState({ name: '', surname: '', email: '', confirmEmail: '', phone: '', accepted: false });
    const [selectedMethod, setSelectedMethod] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const { name, surname, email, confirmEmail, accepted } = formData;
        setFormValid(!!(name && surname && email && confirmEmail && accepted && email === confirmEmail));
    }, [formData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handlePaymentSelect = async (method) => {
        if (!formValid || !showtimeId) return;
        setSelectedMethod(method);
        setShowDialog(true);
        setError('');

        const seats = selectedSeats.map((seatId, i) => {
            const parsed = parseSeat(seatId);
            return { row: parsed.row, seatNumber: parsed.seatNumber, ticketTypeId: seatTickets[i] };
        });

        try {
            await bookingsApi.create({
                showtimeId,
                customerName: formData.name,
                customerSurname: formData.surname,
                customerEmail: formData.email,
                customerPhone: formData.phone || null,
                paymentMethod: method,
                seats,
            });
            setTimeout(() => {
                setShowDialog(false);
                setSuccess(true);
            }, 2000);
        } catch (err) {
            setShowDialog(false);
            setError(err.message || 'Nie udało się złożyć rezerwacji.');
        }
    };

    if (success) {
        return (
            <div className="order-page">
                <div className="order-content text-center">
                    <h2>Rezerwacja potwierdzona!</h2>
                    <p>Twoje bilety na <strong>{film}</strong> ({kino}, {godzina}) zostały zarezerwowane.</p>
                    <p className="text-muted">Płatność jest symulowana — to wersja demonstracyjna serwisu.</p>
                    <p>Potwierdzenie wysłano na: <strong>{formData.email}</strong></p>
                    <button className="back-button mt-3" onClick={() => navigate('/')}>Strona główna</button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="order-page">
            {showDialog && (
                <div className="payment-dialog">
                    <div className="dialog-content">
                        <p>Przetwarzanie płatności (symulacja)...</p>
                        <div className="loader"></div>
                    </div>
                </div>
            )}

            <div className="booking-header">
                <div className="top-header">
                    <div className="logo-container"><img src="/image/logo2.png" alt="Logo" /></div>
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
                {error && <p className="text-danger">{error}</p>}
                <p><strong>Liczba biletów:</strong> {seatTickets?.length || 0}</p>
                <p className="fee">w tym opłata serwisowa: {serviceFee.toFixed(2)} zł</p>
                <p><strong>Razem:</strong> {totalWithFee.toFixed(2)} zł</p>
                <p className="text-muted" style={{ fontSize: '0.85rem' }}>Płatność jest symulowana — wersja demonstracyjna.</p>

                <form className="order-form" onSubmit={e => e.preventDefault()}>
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Imię" required />
                    <input name="surname" value={formData.surname} onChange={handleChange} placeholder="Nazwisko" required />
                    <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="E-Mail" required />
                    <input name="confirmEmail" type="email" value={formData.confirmEmail} onChange={handleChange} placeholder="Potwierdź e-mail" required />
                    <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Numer telefonu (opcjonalnie)" />

                    <label className="accept">
                        <input type="checkbox" name="accepted" checked={formData.accepted} onChange={handleChange} required />
                        Przeczytałam(em) i akceptuję regulamin zakupu oraz politykę prywatności CinemaBox.
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
