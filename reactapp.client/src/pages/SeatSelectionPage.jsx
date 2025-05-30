import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import '../styles/seats.scss';

export default function SeatSelectionPage() {
    const { state } = useLocation();
    const { kino, data, film, godzina } = state || {};
    const rows = 10;
    const seatsPerRow = 12;
    const [selectedSeats, setSelectedSeats] = useState([]);

    const toggleSeat = (seatId) => {
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
        // Tu można potem dodać np. przejście dalej z tymi danymi
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
                {[...Array(rows)].map((_, rowIndex) => (
                    <div key={rowIndex} className="seat-row">
                        {[...Array(seatsPerRow)].map((_, seatIndex) => {
                            const seatId = `R${rowIndex + 1}S${seatIndex + 1}`;
                            const isSelected = selectedSeats.includes(seatId);
                            return (
                                <div
                                    key={seatId}
                                    className={`seat ${isSelected ? 'selected' : ''}`}
                                    onClick={() => toggleSeat(seatId)}
                                >
                                    {seatIndex + 1}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <div className="bottom-bar">
                <button onClick={handleSubmit}>Dalej</button>
            </div>
        </div>
    );
}