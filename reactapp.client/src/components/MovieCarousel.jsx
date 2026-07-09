import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { moviesApi } from '../api';
import { scrollByRef } from '../utils/scroll';

export default function MovieCarousel({ title, category }) {
    const rowRef = useRef(null);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        moviesApi.list(category)
            .then(setMovies)
            .catch(() => setMovies([]))
            .finally(() => setLoading(false));
    }, [category]);

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
            <h5 className="text-center mb-4">{title}</h5>
            <button
                className="scroll-btn scroll-btn-left"
                onClick={() => scrollByRef(rowRef, -300)}
                aria-label="Przewiń w lewo"
            >
                <i className="bi bi-chevron-left"></i>
            </button>
            <div
                ref={rowRef}
                className="screen-row d-flex overflow-auto px-3"
                onScroll={handleScroll}
            >
                {items.map((movie, idx) => (
                    <div key={`${movie.id}-${idx}`} className="movie-card text-center me-3">
                        <Link to="/repertuar" className="p-0 text-decoration-none">
                            <img src={movie.posterUrl} alt={movie.title} className="movie-img" />
                            <p className="movie-title text-white mt-2">{movie.title}</p>
                        </Link>
                    </div>
                ))}
            </div>
            <button
                className="scroll-btn scroll-btn-right"
                onClick={() => scrollByRef(rowRef, 300)}
                aria-label="Przewiń w prawo"
            >
                <i className="bi bi-chevron-right"></i>
            </button>
        </Container>
    );
}
