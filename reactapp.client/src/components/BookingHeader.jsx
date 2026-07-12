import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { showtimesApi } from '../api';
import { dateLocale } from '../i18n';
import { localizeGenre, localizeHall } from '../i18n/content';
import '../styles/booking.scss';

/**
 * Wspólny nagłówek kroków rezerwacji.
 * Podaj `details` (jeśli strona już je ma) albo `showtimeId` — wtedy pobierze je sam.
 */
export default function BookingHeader({ step, showtimeId, details: detailsProp }) {
    const { t } = useTranslation();
    const STEPS = [t('booking.stepSeats'), t('booking.stepTickets'), t('booking.stepSummary')];
    const [fetched, setFetched] = useState(null);
    const details = detailsProp || fetched;

    useEffect(() => {
        if (detailsProp || !showtimeId) return;
        showtimesApi.details(showtimeId).then(setFetched).catch(() => {});
    }, [showtimeId, detailsProp]);

    const startsAt = details ? new Date(details.startsAt) : null;

    return (
        <div className="booking-hero">
            {details && (
                <div className="booking-hero-backdrop" style={{ backgroundImage: `url(${details.posterUrl})` }} />
            )}
            <div className="booking-hero-top">
                <Link to="/" className="booking-logo">
                    <img src="/image/logo2.png" alt="CinemaBox" />
                </Link>
                <div className="booking-steps">
                    {STEPS.map((label, i) => (
                        <div
                            key={label}
                            className={`step ${i + 1 === step ? 'active' : ''} ${i + 1 < step ? 'done' : ''}`}
                        >
                            <span className="num">{i + 1 < step ? <i className="bi bi-check"></i> : i + 1}</span>
                            {label}
                        </div>
                    ))}
                </div>
            </div>
            {details && (
                <div className="booking-hero-movie">
                    <img className="booking-poster" src={details.posterUrl} alt={details.movieTitle} />
                    <div className="booking-movie-info">
                        <h1>{details.movieTitle}</h1>
                        <div className="booking-meta">
                            {details.genre && <span className="chip">{localizeGenre(details.genre)}</span>}
                            <span className="chip">{details.durationMinutes} min</span>
                            <span className="chip"><i className="bi bi-geo-alt-fill"></i>{details.city}</span>
                            <span className="chip"><i className="bi bi-door-open"></i>{localizeHall(details.hallName)}</span>
                            {startsAt && (
                                <span className="chip">
                                    <i className="bi bi-calendar3"></i>
                                    {startsAt.toLocaleDateString(dateLocale(), { weekday: 'short', day: '2-digit', month: '2-digit' })}
                                    {', '}
                                    {startsAt.toLocaleTimeString(dateLocale(), { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
