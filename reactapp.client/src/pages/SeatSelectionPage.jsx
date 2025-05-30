import { useLocation } from 'react-router-dom';
import { useState } from 'react';
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
        'R3S2', 'R3S3', 'R4S5', 'R5S10', 'R6S12', 'R8S18', 'R8S17', 'R8S16', 'R12S5'
    ];

    const [selectedSeats, setSelectedSeats] = useState([]);

    const toggleSeat = (rowIndex, seatIndex) => {
        const seatId = `R${rowIndex + 1}S${seatIndex + 1}`;
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
        alert(`Wybrane miejsca: ${selectedSeats.join(', ')}`);
    };

    return (
        <div className="seat-selection-page">
            <div className="details">
                <h2>Wybór miejsc</h2>
                <p><strong>Kino:</strong> {kino}</p>
                <p><strong>Data:</strong> {data}</p>
                <p><strong>Film:</strong> {film}</p>
                <p><strong>Godzina:</strong> {godzina}</p>
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
                            const seatId = `R${rowIndex + 1}S${seatIndex + 1}`;
                            const isSelected = selectedSeats.includes(seatId);
                            const isOccupied = occupiedSeats.includes(seatId);
                            return (
                                <div
                                    key={seatId}
                                    className={`seat ${isSelected ? 'selected' : ''}`}
                                    onClick={() => toggleSeat(rowIndex, seatIndex)}
                                    className={`seat ${isSelected ? 'selected' : ''} ${isOccupied ? 'occupied' : ''}`}
                                    onClick={() => !isOccupied && toggleSeat(rowIndex, seatIndex)}
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
            </div>
        </div>
    );
}