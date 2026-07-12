import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import BookingHeader from '../components/BookingHeader';
import { bookingsApi } from '../api';
import { useAuth } from '../context/AuthContext';
import '../styles/orderSummary.scss';

function parseSeat(seatId) {
    const match = seatId.match(/R(\d+)S(\d+)/);
    return match ? { row: +match[1], seatNumber: +match[2] } : null;
}

export default function OrderSummaryPage() {
    const { t } = useTranslation();
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

    // Opcjonalne autouzupełnianie danych dla zalogowanych
    const { user } = useAuth();
    const [autofill, setAutofill] = useState(false);
    const [profileData, setProfileData] = useState(null);

    const toggleAutofill = async () => {
        if (autofill) {
            setAutofill(false);
            setFormData(prev => ({ ...prev, name: '', surname: '', email: '', confirmEmail: '', phone: '' }));
            return;
        }

        let data = profileData;
        if (!data) {
            // E-mail z konta + imię/nazwisko/telefon z ostatniej rezerwacji (jeśli jest)
            data = { name: '', surname: '', phone: '', email: user.email };
            try {
                const myBookings = await bookingsApi.my();
                const last = myBookings[0];
                if (last) {
                    data = {
                        name: last.customerName || '',
                        surname: last.customerSurname || '',
                        phone: last.customerPhone || '',
                        email: user.email,
                    };
                }
            } catch { /* brak historii — użyjemy samego e-maila */ }
            setProfileData(data);
        }

        setFormData(prev => ({
            ...prev,
            name: data.name,
            surname: data.surname,
            email: data.email,
            confirmEmail: data.email,
            phone: data.phone,
        }));
        setAutofill(true);
    };

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
            setError(err.message || t('booking.bookingFailed'));
        }
    };

    if (success) {
        return (
            <div className="order-page">
                <div className="order-content text-center">
                    <h2>{t('booking.confirmedTitle')}</h2>
                    <p>
                        <Trans i18nKey="booking.confirmedText" values={{ film, cinema: kino, time: godzina }}>
                            Twoje bilety na <strong>{{ film }}</strong> zostały zarezerwowane.
                        </Trans>
                    </p>
                    <p className="text-muted">{t('booking.confirmedDemo')}</p>
                    <p>{t('booking.confirmationSentTo')} <strong>{formData.email}</strong></p>
                    <button className="back-button mt-3" onClick={() => navigate('/')}>{t('common.home')}</button>
                </div>
            </div>
        );
    }

    return (
        <div className="order-page">
            {showDialog && (
                <div className="payment-dialog">
                    <div className="dialog-content">
                        <p>{t('booking.processing')}</p>
                        <div className="loader"></div>
                    </div>
                </div>
            )}

            <BookingHeader step={3} showtimeId={showtimeId} />

            <div className="order-content">
                <h2>{t('booking.order')}</h2>
                {error && <p className="text-danger">{error}</p>}
                <p><strong>{t('booking.ticketCountLabel')}</strong> {seatTickets?.length || 0}</p>
                <p className="fee">{t('booking.serviceFeeLine', { amount: serviceFee.toFixed(2) })}</p>
                <p><strong>{t('booking.total')}</strong> {totalWithFee.toFixed(2)} zł</p>
                <p className="text-muted" style={{ fontSize: '0.85rem' }}>{t('booking.demoNote')}</p>

                <form className="order-form" onSubmit={e => e.preventDefault()}>
                    {user && (
                        <button
                            type="button"
                            className={`autofill-toggle ${autofill ? 'on' : ''}`}
                            onClick={toggleAutofill}
                            aria-pressed={autofill}
                        >
                            <span className="autofill-switch" aria-hidden="true"></span>
                            <span className="autofill-text">
                                <strong>{t('booking.autofillLabel')}</strong>
                                <small>{t('booking.autofillHint', { email: user.email })}</small>
                            </span>
                            <i className={`bi ${autofill ? 'bi-check-circle-fill' : 'bi-person-vcard'}`}></i>
                        </button>
                    )}
                    <input name="name" value={formData.name} onChange={handleChange} placeholder={t('booking.name')} required />
                    <input name="surname" value={formData.surname} onChange={handleChange} placeholder={t('booking.surname')} required />
                    <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t('auth.email')} required />
                    <input name="confirmEmail" type="email" value={formData.confirmEmail} onChange={handleChange} placeholder={t('booking.confirmEmail')} required />
                    <input name="phone" value={formData.phone} onChange={handleChange} placeholder={t('booking.phoneOptional')} />

                    <label className="accept">
                        <input type="checkbox" name="accepted" checked={formData.accepted} onChange={handleChange} required />
                        {t('booking.acceptPurchase')}
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
                                {method === 'karta' ? t('booking.payCard') : method}
                            </button>
                        ))}
                    </div>
                    <button type="button" className="back-button" onClick={() => navigate(-1)}>{t('booking.backUpper')}</button>
                </form>
            </div>
        </div>
    );
}
