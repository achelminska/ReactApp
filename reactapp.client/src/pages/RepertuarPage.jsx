import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/repertuar.scss';
import CarouselBanner from '../components/CarouselBanner';
import { weeklyMovies } from '../data/weeklyMovies';

const dayKeys = ['dzis', 'so', 'nd', 'pn', 'wt', 'sr', 'cz'];
const dayLabels = ['Dziś', 'So', 'Nd', 'Pn', 'Wt', 'Śr', 'Cz'];

export default function RepertuarPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedCity = location.state?.selectedCity || 'Nieznane miasto';
    const today = new Date().toLocaleDateString('pl-PL', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });

    const [selectedDay, setSelectedDay] = useState('dzis');
    const [selectedFilm, setSelectedFilm] = useState('');

    const movies = weeklyMovies[selectedDay] || [];
    const filteredMovies = selectedFilm ? movies.filter(m => m.title === selectedFilm) : movies;

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
                            onClick={() => {
                                setSelectedDay(dayKeys[idx]);
                                setSelectedFilm('');
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            {label}
                        </span>
                    ))}
                    <div className="current-date">PIĄTEK {today}</div>
                </div>

                <div className="filter-bar">
                    <select
                        value={selectedFilm}
                        onChange={e => setSelectedFilm(e.target.value)}
                    >
                        <option value="">Wybierz film</option>
                        {movies.map((movie, idx) => (
                            <option key={idx} value={movie.title}>{movie.title}</option>
                        ))}
                    </select>
                </div>

                <div className="movies-list">
                    {filteredMovies.length > 0 ? filteredMovies.map((movie, idx) => (
                        <div className="movie-item" key={idx}>
                            <img src={movie.src} alt={movie.title} className="movie-poster" />
                            <div className="movie-info">
                                <h4>{movie.title}</h4>
                                <div className="tags">🎬 {movie.tags || '2D | EN (napisy)'}</div>
                                <div className="showtimes">
                                    {movie.times.map((t, i) => (
                                        <span
                                            key={i}
                                            className="time-slot"
                                            onClick={() => navigate('/seat-selection', {
                                                state: {
                                                    kino: selectedCity,
                                                    data: `${dayLabels[dayKeys.indexOf(selectedDay)]} ${today}`,
                                                    film: movie.title,
                                                    godzina: t
                                                }
                                            })}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )) : <p style={{ color: 'white' }}>Brak seansów tego dnia.</p>}
                </div>
            </div>
        </div>
    );
}