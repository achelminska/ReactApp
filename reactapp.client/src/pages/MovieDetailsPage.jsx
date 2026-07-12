import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cinemasApi, moviesApi } from '../api';
import MovieCarousel from '../components/MovieCarousel';
import { dateLocale } from '../i18n';
import { localizeGenre, localizeTags, localizeDescription, localizeHall } from '../i18n/content';
import '../styles/moviedetails.scss';

const DAYS_AHEAD = 7;

function buildDays(t) {
    return Array.from({ length: DAYS_AHEAD }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const weekday = date.toLocaleDateString(dateLocale(), { weekday: 'short' }).replace('.', '');
        return {
            iso: date.toISOString().slice(0, 10),
            label: i === 0
                ? t('common.today')
                : i === 1
                    ? t('common.tomorrow')
                    : weekday,
            // Na wąskich ekranach "Tomorrow"/"Vandaag" nie mieszczą się w pigułce
            labelShort: weekday,
            dayNumber: date.toLocaleDateString(dateLocale(), { day: '2-digit', month: '2-digit' }),
        };
    });
}

export default function MovieDetailsPage() {
    const { t, i18n } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const showtimesRef = useRef(null);

    const [movie, setMovie] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('Warszawa');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const days = useMemo(() => buildDays(t), [i18n.resolvedLanguage]);
    const [selectedDay, setSelectedDay] = useState(days[0].iso);
    const [showtimes, setShowtimes] = useState([]);
    const [loadingShowtimes, setLoadingShowtimes] = useState(true);

    useEffect(() => {
        setMovie(null);
        setNotFound(false);
        window.scrollTo({ top: 0 });
        moviesApi.get(id)
            .then(setMovie)
            .catch(() => setNotFound(true));
    }, [id]);

    useEffect(() => {
        cinemasApi.cities().then(setCities).catch(() => {});
    }, []);

    useEffect(() => {
        setLoadingShowtimes(true);
        moviesApi.showtimes(id, city, selectedDay)
            .then(setShowtimes)
            .catch(() => setShowtimes([]))
            .finally(() => setLoadingShowtimes(false));
    }, [id, city, selectedDay]);

    // Przejście z "Kup bilet" na banerze — zjedź od razu do sekcji seansów
    useEffect(() => {
        if (movie && location.state?.scrollTo === 'showtimes') {
            setTimeout(() => showtimesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
        }
    }, [movie, location.state]);

    if (notFound) {
        return (
            <div className="movie-details-page">
                <div className="movie-not-found">
                    <i className="bi bi-film"></i>
                    <h2>{t('movie.notFoundTitle')}</h2>
                    <p>{t('movie.notFoundText')}</p>
                    <Link to="/" className="btn-back-home">{t('movie.backHome')}</Link>
                </div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="movie-details-page">
                <div className="movie-details-loading">{t('common.loading')}</div>
            </div>
        );
    }

    const selectedDayMeta = days.find(d => d.iso === selectedDay);
    const similarCategory = movie.isFamilyFriendly ? 'family' : movie.isUpcoming ? 'upcoming' : 'now';

    const scrollToShowtimes = () =>
        showtimesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const goToSeats = (st) => {
        navigate('/rezerwacja/miejsca', {
            state: {
                showtimeId: st.showtimeId,
                kino: city,
                data: `${selectedDayMeta.label} ${selectedDayMeta.dayNumber}`,
                film: movie.title,
                godzina: st.time,
            },
        });
    };

    return (
        <div className="movie-details-page">
            {/* HERO */}
            <div className="movie-hero">
                <div className="movie-hero-backdrop" style={{ backgroundImage: `url(${movie.posterUrl})` }} />
                <div className="movie-hero-content">
                    <div className="movie-hero-poster">
                        <img src={movie.posterUrl} alt={movie.title} />
                    </div>
                    <div className="movie-hero-info">
                        <div className="movie-badges">
                            {movie.isCurrentlyShowing && <span className="movie-badge now">{t('movie.badgeNow')}</span>}
                            {movie.isUpcoming && <span className="movie-badge upcoming">{t('movie.badgeUpcoming')}</span>}
                            {movie.isFamilyFriendly && <span className="movie-badge family">{t('movie.badgeFamily')}</span>}
                        </div>
                        <h1 className="movie-hero-title">{movie.title}</h1>
                        <div className="movie-meta">
                            {movie.genre && (
                                <span className="meta-item">
                                    <i className="bi bi-tag"></i>{localizeGenre(movie.genre)}
                                </span>
                            )}
                            <span className="meta-item">
                                <i className="bi bi-clock"></i>{movie.durationMinutes} min
                            </span>
                            {movie.tags && (
                                <span className="meta-item">
                                    <i className="bi bi-badge-hd"></i>{localizeTags(movie.tags)}
                                </span>
                            )}
                        </div>
                        {movie.description && <p className="movie-description">{localizeDescription(movie.title, movie.description)}</p>}
                        {movie.isCurrentlyShowing || movie.isFamilyFriendly ? (
                            <button className="btn-show-times" onClick={scrollToShowtimes}>
                                <i className="bi bi-ticket-perforated me-2"></i>{t('movie.seeShowtimes')}
                            </button>
                        ) : (
                            <div className="upcoming-note">
                                <i className="bi bi-hourglass-split me-2"></i>{t('movie.soonInCinemas')}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* SEANSE */}
            {(movie.isCurrentlyShowing || movie.isFamilyFriendly) && (
                <div className="movie-showtimes" ref={showtimesRef}>
                    <h2 className="section-heading">{t('movie.buyTicket')}</h2>

                    <div className="showtimes-controls">
                        <div className="city-picker">
                            <i className="bi bi-geo-alt-fill"></i>
                            <select value={city} onChange={e => setCity(e.target.value)}>
                                {cities.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="day-picker">
                            {days.map(d => (
                                <button
                                    key={d.iso}
                                    className={selectedDay === d.iso ? 'day-pill selected' : 'day-pill'}
                                    onClick={() => setSelectedDay(d.iso)}
                                >
                                    <span className="day-name day-name-full">{d.label}</span>
                                    <span className="day-name day-name-short">{d.labelShort}</span>
                                    <span className="day-date">{d.dayNumber}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="showtimes-grid">
                        {loadingShowtimes ? (
                            <p className="showtimes-empty">{t('movie.loadingShowtimes')}</p>
                        ) : showtimes.length > 0 ? (
                            showtimes.map(st => (
                                <button key={st.showtimeId} className="showtime-slot" onClick={() => goToSeats(st)}>
                                    <span className="slot-time">{st.time}</span>
                                    <span className="slot-hall">{localizeHall(st.hallName)}</span>
                                </button>
                            ))
                        ) : (
                            <p className="showtimes-empty">
                                {t('movie.noShowtimesCity', { city })}
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* PODOBNE FILMY */}
            <div className="movie-similar">
                <MovieCarousel title={t('movie.seeAlso')} category={similarCategory} excludeId={movie.id} />
            </div>
        </div>
    );
}
