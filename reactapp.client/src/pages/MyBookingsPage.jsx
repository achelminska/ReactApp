import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/mytickets.scss';
import { bookingsApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { dateLocale } from '../i18n';
import { localizeHall, localizeTicketType } from '../i18n/content';

function formatShowDate(iso) {
    const date = new Date(iso);
    return {
        day: date.toLocaleDateString(dateLocale(), { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }),
        time: date.toLocaleTimeString(dateLocale(), { hour: '2-digit', minute: '2-digit' }),
    };
}

function BookingCard({ booking, past }) {
    const { t } = useTranslation();
    const { day, time } = formatShowDate(booking.showtimeStartsAt);
    const cancelled = booking.status === 'Cancelled';
    const statusKey = cancelled ? 'statusCancelled' : 'statusConfirmed';

    return (
        <article className={`ticket-item ${past || cancelled ? 'muted' : ''}`}>
            {booking.posterUrl && (
                <Link to={`/film/${booking.movieId}`} className="ticket-poster">
                    <img src={booking.posterUrl} alt={booking.movieTitle} loading="lazy" />
                </Link>
            )}

            <div className="ticket-body">
                <div className="ticket-top">
                    <h4>
                        <Link to={`/film/${booking.movieId}`}>{booking.movieTitle}</Link>
                    </h4>
                    <span className={`ticket-status ${cancelled ? 'cancelled' : 'confirmed'}`}>
                        <i className={`bi ${cancelled ? 'bi-x-circle' : 'bi-check-circle'}`}></i>
                        {t(`myTickets.${statusKey}`)}
                    </span>
                </div>

                <div className="ticket-meta">
                    <span><i className="bi bi-geo-alt"></i>CinemaBox {booking.city}</span>
                    <span><i className="bi bi-door-open"></i>{localizeHall(booking.hallName)}</span>
                    <span><i className="bi bi-calendar3"></i>{day}</span>
                    <span><i className="bi bi-clock"></i>{time}</span>
                </div>

                <div className="ticket-seats">
                    {booking.seats.map((seat, i) => (
                        <span key={i} className="ticket-seat-chip">
                            <i className="bi bi-person-fill"></i>
                            {t('booking.seatChip', { row: seat.row, seat: seat.seatNumber })}
                            <em>{localizeTicketType(seat.ticketTypeName)}</em>
                        </span>
                    ))}
                </div>

                <div className="ticket-bottom">
                    <span className="ticket-no">{t('myTickets.bookingNo', { id: booking.id })}</span>
                    <span className="ticket-total">
                        {t('myTickets.total')} <strong>{booking.totalPrice.toFixed(2)} zł</strong>
                    </span>
                </div>
            </div>
        </article>
    );
}

export default function MyBookingsPage() {
    const { t } = useTranslation();
    const { user, loading: authLoading } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!user) return;
        setLoading(true);
        bookingsApi.my()
            .then(setBookings)
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [user]);

    const now = Date.now();
    const upcoming = bookings.filter(b => new Date(b.showtimeStartsAt).getTime() >= now && b.status !== 'Cancelled');
    const past = bookings.filter(b => new Date(b.showtimeStartsAt).getTime() < now || b.status === 'Cancelled');

    return (
        <div className="mytickets-page">
            <div className="mytickets-container">
                <header className="mt-head">
                    <p className="mt-eyebrow">{t('myTickets.eyebrow')}</p>
                    <h2 className="mt-title">{t('myTickets.title')}</h2>
                </header>

                {authLoading ? (
                    <p className="mt-status">{t('common.loading')}</p>
                ) : !user ? (
                    <div className="mt-empty">
                        <i className="bi bi-person-lock"></i>
                        <p className="mt-empty-title">{t('myTickets.loginTitle')}</p>
                        <p className="mt-empty-hint">{t('myTickets.loginHint')}</p>
                    </div>
                ) : loading ? (
                    <p className="mt-status">{t('myTickets.loading')}</p>
                ) : error ? (
                    <p className="mt-status">{t('myTickets.loadError')}</p>
                ) : bookings.length === 0 ? (
                    <div className="mt-empty">
                        <i className="bi bi-ticket-perforated"></i>
                        <p className="mt-empty-title">{t('myTickets.empty')}</p>
                        <p className="mt-empty-hint">{t('myTickets.emptyHint')}</p>
                        <Link to="/repertuar" className="mt-browse-btn">
                            <i className="bi bi-collection-play me-2"></i>{t('myTickets.browse')}
                        </Link>
                    </div>
                ) : (
                    <>
                        {upcoming.length > 0 && (
                            <section className="mt-section">
                                <h3><i className="bi bi-lightning-charge"></i>{t('myTickets.upcoming')}</h3>
                                {upcoming.map(b => <BookingCard key={b.id} booking={b} />)}
                            </section>
                        )}
                        {past.length > 0 && (
                            <section className="mt-section">
                                <h3><i className="bi bi-clock-history"></i>{t('myTickets.past')}</h3>
                                {past.map(b => <BookingCard key={b.id} booking={b} past />)}
                            </section>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
