import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/movieslist.scss';
import { moviesApi } from '../api';
import { localizeGenre } from '../i18n/content';

const CATEGORIES = {
    'na-ekranie': { api: 'now', titleKey: 'moviesPage.titleNow', descKey: 'moviesPage.descNow', icon: 'bi-film' },
    'wkrotce': { api: 'upcoming', titleKey: 'moviesPage.titleUpcoming', descKey: 'moviesPage.descUpcoming', icon: 'bi-hourglass-split' },
    'dla-rodzin': { api: 'family', titleKey: 'moviesPage.titleFamily', descKey: 'moviesPage.descFamily', icon: 'bi-balloon-heart' },
};

export default function MoviesListPage() {
    const { t } = useTranslation();
    const { category } = useParams();
    const config = CATEGORIES[category];

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!config) return;
        setLoading(true);
        moviesApi.list(config.api)
            .then(setMovies)
            .catch(() => setMovies([]))
            .finally(() => setLoading(false));
        window.scrollTo({ top: 0 });
    }, [config]);

    if (!config) return <Navigate to="/filmy/na-ekranie" replace />;

    return (
        <div className="movies-page">
            <div className="movies-page-container">
                <header className="mp-head">
                    <div className="mp-head-text">
                        <p className="mp-eyebrow">{t('moviesPage.eyebrow')}</p>
                        <h2 className="mp-title">{t(config.titleKey)}</h2>
                        <p className="mp-desc">{t(config.descKey)}</p>
                    </div>
                    {!loading && movies.length > 0 && (
                        <span className="mp-count">
                            <i className="bi bi-collection-play"></i>
                            {t('moviesPage.count', { count: movies.length })}
                        </span>
                    )}
                </header>

                <nav className="mp-tabs" aria-label={t('moviesPage.eyebrow')}>
                    {Object.entries(CATEGORIES).map(([slug, cat]) => (
                        <Link
                            key={slug}
                            to={`/filmy/${slug}`}
                            className={slug === category ? 'mp-tab active' : 'mp-tab'}
                        >
                            <i className={`bi ${cat.icon}`}></i>
                            {t(cat.titleKey)}
                        </Link>
                    ))}
                </nav>

                {loading ? (
                    <p className="mp-status">{t('moviesPage.loading')}</p>
                ) : movies.length === 0 ? (
                    <div className="mp-empty">
                        <i className="bi bi-camera-reels"></i>
                        <p>{t('moviesPage.empty')}</p>
                    </div>
                ) : (
                    <div className="mp-grid">
                        {movies.map(movie => {
                            const sub = [localizeGenre(movie.genre), movie.durationMinutes ? `${movie.durationMinutes} min` : null]
                                .filter(Boolean)
                                .join(' • ');
                            return (
                                <div key={movie.id} className="movie-card">
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
                )}
            </div>
        </div>
    );
}
