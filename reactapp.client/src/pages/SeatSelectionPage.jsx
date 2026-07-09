import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { showtimesApi } from '../api';
import '../styles/seats.scss';

export default function SeatSelectionPage() {
    const { state } = useLocation();
    const { showtimeId, kino, data, film, godzina } = state || {};
    const navigate = useNavigate();

    const [layout, setLayout] = useState([]);
    const [occupiedSeats, setOccupiedSeats] = useState([]);
    const [hallName, setHallName] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!showtimeId) {
            setError('Brak danych seansu. Wróć do repertuaru.');
            setLoading(false);
            return;
        }
        showtimesApi.details(showtimeId)
            .then(details => {
                setLayout(details.layout);
                setOccupiedSeats(details.occupiedSeats);
                setHallName(details.hallName);
            })
            .catch(() => setError('Nie udało się załadować planu sali.'))
            .finally(() => setLoading(false));
    }, [showtimeId]);

    const toggleSeat = (rowIndex, seat) => {
        const seatId = `R${rowIndex + 1}S${seat}`;
        setSelectedSeats(prev =>
            prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
        );
    };

    const handleSubmit = () => {
        if (selectedSeats.length === 0) {
            alert('Wybierz przynajmniej jedno miejsce!');
            return;
        }
        navigate('/rezerwacja/bilety', {
            state: { showtimeId, kino, data, film, godzina, hallName, selectedSeats }
        });
    };

    if (loading) return <div className="seat-selection-page"><p className="text-white text-center p-5">Ładowanie sali...</p></div>;
    if (error) return <div className="seat-selection-page"><p className="text-danger text-center p-5">{error}</p></div>;

    return (
        <div className="seat-selection-page">
            <div className="booking-header">
                <div className="top-header">
                    <div className="logo-container">
                        <img src="/image/logo2.png" alt="Logo" />
                    </div>
                    <div className="top-bar">
                        <div className="step active">1<br />Wybór miejsc</div>
                        <div className="step">2<br />Wybór biletów</div>
                        <div className="step">3<br />Zamówienie</div>
                    </div>
                </div>
                <div className="movie-bar">
                    <div className="movie-info">
                        <strong>{film}</strong> – {kino} | {hallName} | {data} | {godzina}
                    </div>
                </div>
            </div>

            <div className="screen-css" />
            <div className="screen-label">EKRAN</div>

            <div className="seats-wrapper">
                <div className="seats">
                    {layout.map((row, rowIndex) => (
                        <div key={rowIndex} className="seat-row">
                            <div className="row-number">{rowIndex + 1}</div>
                            {row.map((seat, seatIndex) => {
                                if (seat === null) {
                                    return <div key={seatIndex} className="seat empty" />;
                                }
                                const seatId = `R${rowIndex + 1}S${seat}`;
                                const isSelected = selectedSeats.includes(seatId);
                                const isOccupied = occupiedSeats.includes(seatId);
                                return (
                                    <div
                                        key={seatId}
                                        className={`seat ${isSelected ? 'selected' : ''} ${isOccupied ? 'occupied' : ''}`}
                                        onClick={() => !isOccupied && toggleSeat(rowIndex, seat)}
                                    >
                                        {seat}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bottom-bar">
                <button
                    onClick={handleSubmit}
                    disabled={selectedSeats.length === 0}
                    className={`submit-button ${selectedSeats.length === 0 ? 'disabled' : ''}`}
                >
                    <span className="main-label">Dalej</span>
                    {selectedSeats.length > 0 && (
                        <span className="sub-label">
                            {selectedSeats.length === 1
                                ? 'Wybrano jedno miejsce'
                                : `Wybrano miejsc: ${selectedSeats.length}`}
                        </span>
                    )}
                </button>
                <button className="back-button" onClick={() => navigate('/repertuar')}>Wróć</button>
            </div>
            <Footer />
        </div>
    );
}
