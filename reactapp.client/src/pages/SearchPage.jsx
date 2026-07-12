import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { moviesApi } from '../api';
import { localizeTags, localizeDescription } from '../i18n/content';
import '../styles/repertuar.scss';

export default function SearchPage() {
    const { t } = useTranslation();
    const [params] = useSearchParams();
    const query = params.get('query') || '';
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!query) { setMovies([]); setLoading(false); return; }
        moviesApi.list(null, query)
            .then(setMovies)
            .catch(() => setMovies([]))
            .finally(() => setLoading(false));
    }, [query]);

    return (
        <div className="repertuar-page">
            <div className="repertuar-container">
                <header className="rep-head">
                    <div className="rep-head-text">
                        <p className="rep-eyebrow">{t('nav.search').replace('...', '')}</p>
                        <h2 className="rep-title">„{query}”</h2>
                    </div>
                </header>
                {loading ? (
                    <p className="rep-status">{t('searchPage.searching')}</p>
                ) : movies.length > 0 ? (
                    <div className="movies-list">
                        {movies.map(m => (
                            <div className="movie-item" key={m.id}>
                                <Link to={`/film/${m.id}`} className="movie-poster-link">
                                    <img src={m.posterUrl} alt={m.title} className="movie-poster" loading="lazy" />
                                </Link>
                                <div className="movie-info">
                                    <h4><Link to={`/film/${m.id}`}>{m.title}</Link></h4>
                                    <div className="movie-chips">
                                        {localizeTags(m.tags || '')
                                            .split('|')
                                            .map(chip => chip.trim())
                                            .filter(Boolean)
                                            .map(chip => (
                                                <span key={chip} className="chip">{chip}</span>
                                            ))}
                                    </div>
                                    {m.description && (
                                        <p className="movie-desc">{localizeDescription(m.title, m.description)}</p>
                                    )}
                                </div>
                                <Link to={`/film/${m.id}`} className="movie-more" aria-label={m.title}>
                                    <i className="bi bi-chevron-right"></i>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rep-empty">
                        <i className="bi bi-binoculars"></i>
                        <p className="rep-empty-title">{t('searchPage.noResults')}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
