import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/ticketSelection.scss';
import Footer from '../components/Footer';
import { ticketTypesApi } from '../api';

export default function TicketSelectionPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { showtimeId, kino, data, film, godzina, hallName, selectedSeats } = state || {};

    const [ticketTypes, setTicketTypes] = useState([]);
    const [seatTickets, setSeatTickets] = useState([]);

    useEffect(() => {
        ticketTypesApi.list()
            .then(types => {
                setTicketTypes(types);
                const defaultType = types[0]?.id;
                setSeatTickets(selectedSeats?.map(() => defaultType) || []);
            })
            .catch(() => {});
    }, [selectedSeats]);

    const updateTicketType = (index, typeId) => {
        const updated = [...seatTickets];
        updated[index] = +typeId;
        setSeatTickets(updated);
    };

    const getType = (id) => ticketTypes.find(t => t.id === id);
    const total = seatTickets.reduce((sum, id) => sum + (getType(id)?.price || 0), 0);
    const serviceFee = seatTickets.length * 2;

    return (
        <div className="seat-selection-page ticket-selection d-flex flex-column">
            <div className="flex-grow-1">
                <div className="booking-header">
                    <div className="top-header">
                        <div className="logo-container"><img src="/image/logo2.png" alt="Logo" /></div>
                        <div className="top-bar">
                            <div className="step">1<br />Wybór miejsc</div>
                            <div className="step active">2<br />Wybór biletów</div>
                            <div className="step">3<br />Zamówienie</div>
                        </div>
                    </div>
                    <div className="movie-bar">
                        <div className="movie-info">
                            <strong>{film}</strong> – {kino} | {data} | {godzina}
                        </div>
                    </div>
                </div>

                <div className="ticket-selection-content">
                    <h2>WYBIERZ BILETY</h2>
                    <p className="ticket-selection-hint">
                        {selectedSeats?.length === 1
                            ? 'Wybrano jedno miejsce, wybierz typ biletu:'
                            : `Wybrano ${selectedSeats?.length || 0} miejsca, wybierz typ biletu:`}
                    </p>

                    <div className="ticket-box">
                        {selectedSeats?.map((seat, index) => {
                            const match = seat.match(/R(\d+)S(\d+)/);
                            const currentType = getType(seatTickets[index]);
                            return (
                                <div key={seat} className="ticket-row">
                                    <div className="ticket-info">
                                        <div className="ticket-type">
                                            <span role="img" aria-label="ticket">🎟️</span>
                                            <strong>{currentType?.name}</strong> – {currentType?.price.toFixed(2)} zł
                                        </div>
                                        {match && (
                                            <div className="seat-details">
                                                {hallName} | rząd {match[1]}, miejsce {match[2]}
                                            </div>
                                        )}
                                    </div>
                                    <select
                                        value={seatTickets[index]}
                                        onChange={e => updateTicketType(index, e.target.value)}
                                    >
                                        {ticketTypes.map(t => (
                                            <option key={t.id} value={t.id}>{t.name} – {t.price.toFixed(2)} zł</option>
                                        ))}
                                    </select>
                                </div>
                            );
                        })}

                        <div className="ticket-summary">
                            <p><strong>Liczba biletów</strong>: {seatTickets.length}</p>
                            <p className="total"><strong>Razem</strong>: {(total + serviceFee).toFixed(2)} zł</p>
                            <p className="fee-note">w tym opłata serwisowa {serviceFee.toFixed(2)} zł</p>
                        </div>

                        <div className="ticket-actions">
                            <button
                                className="btn-next"
                                onClick={() => navigate('/rezerwacja/podsumowanie', {
                                    state: { showtimeId, film, kino, data, godzina, hallName, selectedSeats, seatTickets, ticketTypes }
                                })}
                            >
                                DALEJ
                                <span className="sub-price">
                                    {seatTickets.length} bilet/ów - {(total + serviceFee).toFixed(2)} zł
                                </span>
                            </button>
                            <button className="btn-back" onClick={() => navigate(-1)}>WRÓĆ</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
