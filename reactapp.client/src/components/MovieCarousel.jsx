import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { moviesApi } from '../api';
import { scrollByRef } from '../utils/scroll';
import { localizeGenre } from '../i18n/content';

export default function MovieCarousel({ title, category, excludeId }) {
    const { t } = useTranslation();
    const rowRef = useRef(null);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        moviesApi.list(category)
            .then(data => setMovies(excludeId ? data.filter(m => m.id !== excludeId) : data))
            .catch(() => setMovies([]))
            .finally(() => setLoading(false));
    }, [category, excludeId]);

    const items = movies.length > 0 ? [...movies, ...movies] : [];

    const handleScroll = () => {
        const el = rowRef.current;
        if (!el) return;
        const halfWidth = el.scrollWidth / 2;
        if (el.scrollLeft >= halfWidth) el.scrollLeft -= halfWidth;
        else if (el.scrollLeft <= 0) el.scrollLeft += halfWidth;
    };

    if (loading) return null;
    if (movies.length === 0) return null;

    return (
        <Container fluid className="px-0 mt-5 screen-section">
            <div className="screen-head">
                <h5>{title}</h5>
            </div>
            <button
                className="scroll-btn scroll-btn-left"
                onClick={() => scrollByRef(rowRef, -300)}
                aria-label={t('home.scrollLeft')}
            >
                <i className="bi bi-chevron-left"></i>
            </button>
            <div
                ref={rowRef}
                className="screen-row d-flex overflow-auto px-3"
                onScroll={handleScroll}
            >
                {items.map((movie, idx) => {
                    const sub = [localizeGenre(movie.genre), movie.durationMinutes ? `${movie.durationMinutes} min` : null]
                        .filter(Boolean)
                        .join(' • ');
                    return (
                        <div key={`${movie.id}-${idx}`} className="movie-card">
                            <Link to={`/film/${movie.id}`}>
                                <div className="movie-poster-wrap">
                                    <img src={movie.posterUrl} alt={movie.title} loading="lazy" />
                                    <div className="movie-overlay">
                                        <span className="movie-overlay-cta">
                                            <i className="bi bi-ticket-perforated"></i>
                                            {t('home.details')}
                                        </span>
                                    </div>
                                </div>
                                <p className="movie-title text-white">{movie.title}</p>
                                {sub && <p className="movie-sub">{sub}</p>}
                            </Link>
                        </div>
                    );
                })}
            </div>
            <button
                className="scroll-btn scroll-btn-right"
                onClick={() => scrollByRef(rowRef, 300)}
                aria-label={t('home.scrollRight')}
            >
                <i className="bi bi-chevron-right"></i>
            </button>
        </Container>
    );
}
