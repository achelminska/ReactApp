import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/repertuar.scss';
import CarouselBanner from '../components/CarouselBanner';
import { showtimesApi } from '../api';

const shortDayLabels = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'];

function getDayOffset(key) {
    if (key === 'dzis') return 0;
    const today = new Date().getDay();
    const dayMap = { nd: 0, pn: 1, wt: 2, sr: 3, cz: 4, pt: 5, so: 6 };
    const target = dayMap[key];
    let diff = target - today;
    if (diff <= 0) diff += 7;
    return diff;
}

export default function RepertuarPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedCity = location.state?.selectedCity || 'Warszawa';

    const todayIndex = new Date().getDay();
    const fullDayKeys = ['nd', 'pn', 'wt', 'sr', 'cz', 'pt', 'so'];
    const rotatedKeys = [...fullDayKeys.slice(todayIndex), ...fullDayKeys.slice(0, todayIndex)];
    const rotatedLabels = [...shortDayLabels.slice(todayIndex), ...shortDayLabels.slice(0, todayIndex)];
    const dayKeys = ['dzis', ...rotatedKeys.slice(1, 7)];
    const dayLabels = ['Dziś', ...rotatedLabels.slice(1, 7)];

    const [selectedDay, setSelectedDay] = useState('dzis');
    const [selectedFilm, setSelectedFilm] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const today = new Date().toLocaleDateString('pl-PL', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });

    useEffect(() => {
        const offset = getDayOffset(selectedDay);
        const date = new Date();
        date.setDate(date.getDate() + offset);
        const isoDate = date.toISOString().slice(0, 10);

        setLoading(true);
        showtimesApi.repertoire(selectedCity, isoDate)
            .then(setMovies)
            .catch(() => setMovies([]))
            .finally(() => setLoading(false));
    }, [selectedCity, selectedDay]);

    const filteredMovies = selectedFilm
        ? movies.filter(m => m.title === selectedFilm)
        : movies;

    return (
        <div className="repertuar-page">
            <CarouselBanner />
            <div className="repertuar-container">
                <h2 className="cinema-title">REPERTUAR CINEMABOX {selectedCity.toUpperCase()}</h2>

                <div className="date-selector">
                    {dayLabels.map((label, idx) => (
                        <span
                            key={dayKeys[idx]}
                            className={selectedDay === dayKeys[idx] ? 'selected' : ''}
                            onClick={() => { setSelectedDay(dayKeys[idx]); setSelectedFilm(''); }}
                            style={{ cursor: 'pointer' }}
                        >
                            {label}
                        </span>
                    ))}
                    <div className="current-date">{today}</div>
                </div>

                <div className="filter-bar">
                    <select value={selectedFilm} onChange={e => setSelectedFilm(e.target.value)}>
                        <option value="">Wybierz film</option>
                        {movies.map(movie => (
                            <option key={movie.movieId} value={movie.title}>{movie.title}</option>
                        ))}
                    </select>
                </div>

                <div className="movies-list">
                    {loading ? (
                        <p style={{ color: 'white' }}>Ładowanie repertuaru...</p>
                    ) : filteredMovies.length > 0 ? filteredMovies.map(movie => (
                        <div className="movie-item" key={movie.movieId}>
                            <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
                            <div className="movie-info">
                                <h4>{movie.title}</h4>
                                <div className="tags">🎬 {movie.tags || '2D | PL (napisy)'}</div>
                                <div className="showtimes">
                                    {movie.showtimes.map(st => (
                                        <span
                                            key={st.showtimeId}
                                            className="time-slot"
                                            onClick={() => navigate('/rezerwacja/miejsca', {
                                                state: {
                                                    showtimeId: st.showtimeId,
                                                    kino: selectedCity,
                                                    data: `${dayLabels[dayKeys.indexOf(selectedDay)]} ${today}`,
                                                    film: movie.title,
                                                    godzina: st.time,
                                                }
                                            })}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {st.time}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p style={{ color: 'white' }}>Brak seansów tego dnia.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
