import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/seats.scss';

export default function SeatSelectionPage() {
    const { state } = useLocation();
    const { kino, data, film, godzina } = state || {};

    // Każdy rząd podzielony: [lewa część, odstęp (null), prawa część]
    const layout = [
        [16, 15, 14, 13, 12, 11, 10, 9, null, null, null,  8, 7, 6, 5, 4, 3, 2, 1],
        [16, 15, 14, 13, 12, 11, 10, 9, null, null, null,  8, 7, 6, 5, 4, 3, 2, 1],
        [16, 15, 14, 13, 12, 11, 10, 9, null, null, null,  8, 7, 6, 5, 4, 3, 2, 1],
        [16, 15, 14, 13, 12, 11, 10, 9, null, null, null, 8, 7, 6, 5, 4, 3, 2, 1],
        [16, 15, 14, 13, 12, 11, 10, 9, null, null, null, 8, 7, 6, 5, 4, 3, 2, 1],
        [16, 15, 14, 13, 12, 11, 10, 9, null, null, null, 8, 7, 6, 5, 4, 3, 2, 1],
        [16, 15, 14, 13, 12, 11, 10, 9, null, null, null, 8, 7, 6, 5, 4, 3, 2, 1],
        [16, 15, 14, 13, 12, 11, 10, 9, null, null, null, 8, 7, 6, 5, 4, 3, 2, 1],
        [16, 15, 14, 13, 12, 11, 10, 9, null, null, null, 8, 7, 6, 5, 4, 3, 2, 1],
        [16, 15, 14, 13, 12, 11, 10, 9, null, null, null, 8, 7, 6, 5, 4, 3, 2, 1],
        [16, 15, 14, 13, 12, 11, 10, 9, null, null, null, 8, 7, 6, 5, 4, 3, 2, 1],
        [18 ,17 ,16, 15, 14, 13, 12, 11, 10, null, null, null,9, 8, 7, 6, 5, 4, 3, 2, 1],
        [22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    ];
    const occupiedSeats = [
        'R3S2', 'R3S3', 'R3S4', 'R4S5', 'R5S10', 'R6S12', 'R6S13', 'R8S18', 'R8S17', 'R8S16', 'R12S5'
    ];
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/');
    };

    const [selectedSeats, setSelectedSeats] = useState([]);

    const toggleSeat = (rowIndex, seat) => {
        const seatId = `R${rowIndex + 1}S${seat}`;
        setSelectedSeats((prev) =>
            prev.includes(seatId)
                ? prev.filter((s) => s !== seatId)
                : [...prev, seatId]
        );
    };

    const handleSubmit = () => {
        if (selectedSeats.length === 0) {
            alert("Wybierz przynajmniej jedno miejsce!");
            return;
        }

       
        navigate('/ticket-selection', {
            state: {
                kino,
                data,
                film,
                godzina,
                selectedSeats
            }
        });
    };

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
                        <strong>{film}</strong> – {kino} | {data} | {godzina}
                    </div>
                </div>
            </div>
           

            <div className="screen-css" />
            <div className="screen-label">EKRAN</div>

            <div className="seats">
                {layout.map((row, rowIndex) => (
                    <div key={rowIndex} className="seat-row">
                        <div className="row-number">{rowIndex + 1}</div>
                        {row.map((seat, seatIndex) => {
                            if (seat === null) {
                                return <div key={seatIndex} className="seat empty"></div>;
                            }
                            const seatId = `R${rowIndex + 1}S${seat}`;
                            const isSelected = selectedSeats.includes(seatId);
                            const isOccupied = occupiedSeats.includes(seatId);
                            return (
                                <div
                                    key={seatId}
                                    className={`seat ${isSelected ? 'selected' : ''}`}
                                    onClick={() => toggleSeat(rowIndex, seatIndex)}
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
                <button className="back-button" onClick={handleBack}>Wróć</button>
            </div>
        </div>
    );
}