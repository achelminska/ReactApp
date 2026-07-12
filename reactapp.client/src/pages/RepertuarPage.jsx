import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/repertuar.scss';
import { cinemasApi, moviesApi, showtimesApi } from '../api';
import { dateLocale } from '../i18n';
import { localizeGenre, localizeTags, localizeDescription } from '../i18n/content';

const DAYS_AHEAD = 7;
const HERO_ROTATE_MS = 8000;
const CITY_STORAGE_KEY = 'cinemabox-city';

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

// Netflixowy hero: wyróżniony film z repertuaru + pasek plakatów na dole
function RepertuarHero({ movies, catalog, city, onBuy }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);

    useEffect(() => setIndex(0), [movies]);

    useEffect(() => {
        if (movies.length < 2) return;
        const timer = setInterval(() => setIndex(i => (i + 1) % movies.length), HERO_ROTATE_MS);
        return () => clearInterval(timer);
    }, [movies, index]);

    if (movies.length === 0) return null;

    const featured = movies[Math.min(index, movies.length - 1)];
    const details = catalog[featured.movieId];

    return (
        <section className="rep-hero">
            <div key={featured.movieId} className="rep-hero-slide">
                <div className="rep-hero-backdrop" style={{ backgroundImage: `url(${featured.posterUrl})` }} />
            </div>

            <div className="rep-hero-content">
                <div className="rep-hero-text">
                    <span className="rep-hero-eyebrow">
                        <i className="bi bi-broadcast"></i>
                        {t('repertoire.heroEyebrow', { city })}
                    </span>
                    <h1 className="rep-hero-title">{featured.title}</h1>
                    <div className="rep-hero-meta">
                        {details?.genre && <span>{localizeGenre(details.genre)}</span>}
                        {details?.genre && <span className="dot" />}
                        {details?.durationMinutes && <span>{details.durationMinutes} min</span>}
                        {details?.durationMinutes && <span className="dot" />}
                        <span>{localizeTags(featured.tags || '2D | PL (napisy)')}</span>
                    </div>
                    {details?.description && (
                        <p className="rep-hero-desc">{localizeDescription(featured.title, details.description)}</p>
                    )}
                    <div className="rep-hero-actions">
                        <button className="hero-btn-primary" onClick={() => onBuy(featured)}>
                            <i className="bi bi-ticket-perforated me-2"></i>{t('home.buyTicket')}
                        </button>
                        <button className="hero-btn-ghost" onClick={() => navigate(`/film/${featured.movieId}`)}>
                            <i className="bi bi-info-circle me-2"></i>{t('home.details')}
                        </button>
                    </div>
                </div>
            </div>

            <div className="rep-hero-strip">
                {movies.map((m, i) => (
                    <button
                        key={m.movieId}
                        type="button"
                        className={i === index ? 'strip-item active' : 'strip-item'}
                        onClick={() => setIndex(i)}
                        aria-label={m.title}
                    >
                        <img src={m.posterUrl} alt={m.title} loading="lazy" />
                    </button>
                ))}
            </div>
        </section>
    );
}

// Własny dropdown filtra filmów (natywny select nie daje się ostylować na ciemno)
function FilmDropdown({ movies, value, onChange }) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const onDocClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, []);

    return (
        <div className={`rep-filter ${open ? 'open' : ''}`} ref={ref}>
            <button
                type="button"
                className="rep-filter-toggle"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen(o => !o)}
            >
                <i className="bi bi-funnel"></i>
                <span className={value ? 'rep-filter-value' : 'rep-filter-value empty'}>
                    {value || t('repertoire.allMovies')}
                </span>
                <i className="bi bi-chevron-down rep-filter-caret"></i>
            </button>
            {open && (
                <ul className="rep-filter-menu" role="listbox">
                    <li>
                        <button
                            type="button"
                            role="option"
                            aria-selected={!value}
                            className={!value ? 'selected' : ''}
                            onClick={() => { onChange(''); setOpen(false); }}
                        >
                            {t('repertoire.allMovies')}
                            {!value && <i className="bi bi-check-lg"></i>}
                        </button>
                    </li>
                    {movies.map(movie => (
                        <li key={movie.movieId}>
                            <button
                                type="button"
                                role="option"
                                aria-selected={movie.title === value}
                                className={movie.title === value ? 'selected' : ''}
                                onClick={() => { onChange(movie.title); setOpen(false); }}
                            >
                                {movie.title}
                                {movie.title === value && <i className="bi bi-check-lg"></i>}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

// Wybór miasta wbudowany w nagłówek strony
function CityDropdown({ cities, value, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const onDocClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, []);

    return (
        <span className={`rep-city ${open ? 'open' : ''}`} ref={ref}>
            <button
                type="button"
                className="rep-city-toggle"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen(o => !o)}
            >
                {value}
                <i className="bi bi-chevron-down"></i>
            </button>
            {open && (
                <ul className="rep-city-menu" role="listbox">
                    {cities.map(city => (
                        <li key={city}>
                            <button
                                type="button"
                                role="option"
                                aria-selected={city === value}
                                className={city === value ? 'selected' : ''}
                                onClick={() => { onChange(city); setOpen(false); }}
                            >
                                {city}
                                {city === value && <i className="bi bi-check-lg"></i>}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </span>
    );
}

export default function RepertuarPage() {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedCity, setSelectedCity] = useState(() =>
        location.state?.selectedCity || localStorage.getItem(CITY_STORAGE_KEY) || 'Warszawa');
    const [cities, setCities] = useState([]);

    useEffect(() => {
        cinemasApi.cities().then(setCities).catch(() => {});
    }, []);

    // Zmiana miasta z poziomu navbara podczas pobytu na stronie
    useEffect(() => {
        if (location.state?.selectedCity) setSelectedCity(location.state.selectedCity);
    }, [location.state?.selectedCity]);

    const changeCity = (city) => {
        setSelectedCity(city);
        localStorage.setItem(CITY_STORAGE_KEY, city);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const days = useMemo(() => buildDays(t), [i18n.resolvedLanguage]);
    const [selectedDay, setSelectedDay] = useState(days[0].iso);
    const [selectedFilm, setSelectedFilm] = useState('');
    const [movies, setMovies] = useState([]);
    const [catalog, setCatalog] = useState({});
    const [loading, setLoading] = useState(true);

    const selectedDayMeta = days.find(d => d.iso === selectedDay) || days[0];
    const selectedDateLong = new Date(selectedDay + 'T12:00:00')
        .toLocaleDateString(dateLocale(), { weekday: 'long', day: '2-digit', month: 'long' });

    // Pełny katalog filmów (gatunek, opis, czas trwania) — do wzbogacenia hero
    useEffect(() => {
        moviesApi.list()
            .then(list => setCatalog(Object.fromEntries(list.map(m => [m.id, m]))))
            .catch(() => {});
    }, []);

    useEffect(() => {
        setLoading(true);
        showtimesApi.repertoire(selectedCity, selectedDay)
            .then(setMovies)
            .catch(() => setMovies([]))
            .finally(() => setLoading(false));
    }, [selectedCity, selectedDay]);

    const filteredMovies = selectedFilm
        ? movies.filter(m => m.title === selectedFilm)
        : movies;

    const goToSeats = (movie, st) => {
        navigate('/rezerwacja/miejsca', {
            state: {
                showtimeId: st.showtimeId,
                kino: selectedCity,
                data: `${selectedDayMeta.label} ${selectedDayMeta.dayNumber}`,
                film: movie.title,
                godzina: st.time,
            },
        });
    };

    return (
        <div className="repertuar-page">
            <RepertuarHero
                movies={movies}
                catalog={catalog}
                city={selectedCity}
                onBuy={(movie) => movie.showtimes[0] && goToSeats(movie, movie.showtimes[0])}
            />

            <div className="repertuar-container">
                {/* NAGŁÓWEK */}
                <header className="rep-head">
                    <div className="rep-head-text">
                        <p className="rep-eyebrow">{t('repertoire.eyebrow')}</p>
                        <h2 className="rep-title">
                            CinemaBox <CityDropdown cities={cities} value={selectedCity} onChange={changeCity} />
                        </h2>
                    </div>
                    <div className="rep-date">
                        <i className="bi bi-calendar3"></i>
                        {selectedDateLong}
                    </div>
                </header>

                {/* PASEK NARZĘDZI */}
                <div className="rep-toolbar">
                    <div className="rep-days">
                        {days.map(d => (
                            <button
                                key={d.iso}
                                type="button"
                                className={selectedDay === d.iso ? 'rep-pill selected' : 'rep-pill'}
                                onClick={() => { setSelectedDay(d.iso); setSelectedFilm(''); }}
                            >
                                <span className="pill-top pill-top-full">{d.label}</span>
                                <span className="pill-top pill-top-short">{d.labelShort}</span>
                                <span className="pill-bottom">{d.dayNumber}</span>
                            </button>
                        ))}
                    </div>
                    <FilmDropdown movies={movies} value={selectedFilm} onChange={setSelectedFilm} />
                </div>

                {/* LISTA FILMÓW */}
                <div className="movies-list">
                    {loading ? (
                        <p className="rep-status">{t('repertoire.loading')}</p>
                    ) : filteredMovies.length > 0 ? filteredMovies.map(movie => (
                        <div className="movie-item" key={movie.movieId}>
                            <Link to={`/film/${movie.movieId}`} className="movie-poster-link">
                                <img src={movie.posterUrl} alt={movie.title} className="movie-poster" loading="lazy" />
                            </Link>
                            <div className="movie-info">
                                <h4>
                                    <Link to={`/film/${movie.movieId}`}>{movie.title}</Link>
                                </h4>
                                <div className="movie-chips">
                                    {localizeTags(movie.tags || '2D | PL (napisy)')
                                        .split('|')
                                        .map(chip => chip.trim())
                                        .filter(Boolean)
                                        .map(chip => (
                                            <span key={chip} className="chip">{chip}</span>
                                        ))}
                                </div>
                                <div className="showtimes">
                                    {movie.showtimes.map(st => (
                                        <button
                                            key={st.showtimeId}
                                            type="button"
                                            className="time-slot"
                                            onClick={() => goToSeats(movie, st)}
                                        >
                                            {st.time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <Link to={`/film/${movie.movieId}`} className="movie-more" aria-label={movie.title}>
                                <i className="bi bi-chevron-right"></i>
                            </Link>
                        </div>
                    )) : (
                        <div className="rep-empty">
                            <i className="bi bi-camera-reels"></i>
                            <p className="rep-empty-title">{t('repertoire.noShowtimes')}</p>
                            <p className="rep-empty-hint">{t('repertoire.noShowtimesHint')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
