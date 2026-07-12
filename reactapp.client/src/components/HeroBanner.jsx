import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { moviesApi } from '../api';
import { localizeGenre, localizeTags, localizeDescription } from '../i18n/content';
import '../styles/herobanner.scss';

const ROTATE_MS = 8000;
const FEATURED_COUNT = 5;

export default function HeroBanner() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        moviesApi.list('now')
            .then(data => setMovies(data.filter(m => m.description).slice(0, FEATURED_COUNT)))
            .catch(() => setMovies([]));
    }, []);

    useEffect(() => {
        if (movies.length < 2) return;
        const timer = setInterval(() => {
            setIndex(i => (i + 1) % movies.length);
        }, ROTATE_MS);
        return () => clearInterval(timer);
    }, [movies]);

    if (movies.length === 0) return null;

    const movie = movies[index];

    return (
        <section className="hero-banner">
            <div key={movie.id} className="hero-slide">
                <div className="hero-backdrop" style={{ backgroundImage: `url(${movie.posterUrl})` }} />
                <div className="hero-content">
                    <div className="hero-text">
                        <span className="hero-eyebrow">{t('home.nowInCinemas')}</span>
                        <h1 className="hero-title">{movie.title}</h1>
                        <div className="hero-meta">
                            {movie.genre && <span>{localizeGenre(movie.genre)}</span>}
                            <span className="dot" />
                            <span>{movie.durationMinutes} min</span>
                            {movie.tags && (
                                <>
                                    <span className="dot" />
                                    <span>{localizeTags(movie.tags)}</span>
                                </>
                            )}
                        </div>
                        <p className="hero-description">{localizeDescription(movie.title, movie.description)}</p>
                        <div className="hero-actions">
                            <button
                                className="hero-btn-primary"
                                onClick={() => navigate(`/film/${movie.id}`, { state: { scrollTo: 'showtimes' } })}
                            >
                                <i className="bi bi-ticket-perforated me-2"></i>{t('home.buyTicket')}
                            </button>
                            <button
                                className="hero-btn-ghost"
                                onClick={() => navigate(`/film/${movie.id}`)}
                            >
                                <i className="bi bi-info-circle me-2"></i>{t('home.details')}
                            </button>
                        </div>
                    </div>
                    <div className="hero-poster">
                        <img src={movie.posterUrl} alt={movie.title} />
                    </div>
                </div>
            </div>

            <div className="hero-indicators">
                {movies.map((m, i) => (
                    <button
                        key={m.id}
                        className={i === index ? 'active' : ''}
                        aria-label={t('home.show', { title: m.title })}
                        onClick={() => setIndex(i)}
                    />
                ))}
            </div>
        </section>
    );
}
