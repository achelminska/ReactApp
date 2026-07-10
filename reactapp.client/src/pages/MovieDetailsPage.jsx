import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { cinemasApi, moviesApi } from '../api';
import MovieCarousel from '../components/MovieCarousel';
import '../styles/moviedetails.scss';

const DAYS_AHEAD = 7;

function buildDays() {
    const labels = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'];
    return Array.from({ length: DAYS_AHEAD }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return {
            iso: date.toISOString().slice(0, 10),
            label: i === 0 ? 'Dziś' : i === 1 ? 'Jutro' : labels[date.getDay()],
            dayNumber: date.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' }),
        };
    });
}

export default function MovieDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const showtimesRef = useRef(null);

    const [movie, setMovie] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('Warszawa');
    const days = useMemo(buildDays, []);
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

    if (notFound) {
        return (
            <div className="movie-details-page">
                <div className="movie-not-found">
                    <i className="bi bi-film"></i>
                    <h2>Nie znaleziono filmu</h2>
                    <p>Film mógł zostać wycofany z repertuaru.</p>
                    <Link to="/" className="btn-back-home">Wróć na stronę główną</Link>
                </div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="movie-details-page">
                <div className="movie-details-loading">Ładowanie...</div>
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
                            {movie.isCurrentlyShowing && <span className="movie-badge now">Na ekranie</span>}
                            {movie.isUpcoming && <span className="movie-badge upcoming">Wkrótce</span>}
                            {movie.isFamilyFriendly && <span className="movie-badge family">Dla rodzin</span>}
                        </div>
                        <h1 className="movie-hero-title">{movie.title}</h1>
                        <div className="movie-meta">
                            {movie.genre && (
                                <span className="meta-item">
                                    <i className="bi bi-tag"></i>{movie.genre}
                                </span>
                            )}
                            <span className="meta-item">
                                <i className="bi bi-clock"></i>{movie.durationMinutes} min
                            </span>
                            {movie.tags && (
                                <span className="meta-item">
                                    <i className="bi bi-badge-hd"></i>{movie.tags}
                                </span>
                            )}
                        </div>
                        {movie.description && <p className="movie-description">{movie.description}</p>}
                        {movie.isCurrentlyShowing || movie.isFamilyFriendly ? (
                            <button className="btn-show-times" onClick={scrollToShowtimes}>
                                <i className="bi bi-ticket-perforated me-2"></i>Zobacz seanse
                            </button>
                        ) : (
                            <div className="upcoming-note">
                                <i className="bi bi-hourglass-split me-2"></i>Wkrótce w kinach CinemaBox
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* SEANSE */}
            {(movie.isCurrentlyShowing || movie.isFamilyFriendly) && (
                <div className="movie-showtimes" ref={showtimesRef}>
                    <h2 className="section-heading">Kup bilet</h2>

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
                                    <span className="day-name">{d.label}</span>
                                    <span className="day-date">{d.dayNumber}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="showtimes-grid">
                        {loadingShowtimes ? (
                            <p className="showtimes-empty">Ładowanie seansów...</p>
                        ) : showtimes.length > 0 ? (
                            showtimes.map(st => (
                                <button key={st.showtimeId} className="showtime-slot" onClick={() => goToSeats(st)}>
                                    <span className="slot-time">{st.time}</span>
                                    <span className="slot-hall">{st.hallName}</span>
                                </button>
                            ))
                        ) : (
                            <p className="showtimes-empty">
                                Brak seansów w tym dniu w mieście {city}. Wybierz inny dzień lub miasto.
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* PODOBNE FILMY */}
            <div className="movie-similar">
                <MovieCarousel title="ZOBACZ RÓWNIEŻ" category={similarCategory} excludeId={movie.id} />
            </div>
        </div>
    );
}
