import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { moviesApi } from '../api';

export default function SearchPage() {
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
                <h2 className="cinema-title">WYNIKI WYSZUKIWANIA: „{query}"</h2>
                {loading ? (
                    <p style={{ color: 'white' }}>Szukam...</p>
                ) : movies.length > 0 ? (
                    <div className="movies-list">
                        {movies.map(m => (
                            <div className="movie-item" key={m.id}>
                                <img src={m.posterUrl} alt={m.title} className="movie-poster" />
                                <div className="movie-info">
                                    <h4>{m.title}</h4>
                                    <div className="tags">🎬 {m.tags}</div>
                                    {m.description && <p style={{ color: '#ccc', fontSize: '0.9rem' }}>{m.description}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p style={{ color: 'white' }}>Nie znaleziono filmów pasujących do zapytania.</p>
                )}
            </div>
        </div>
    );
}
