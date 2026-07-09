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
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    const renderSeatRow = (seat, index) => {
        const match = seat.match(/R(\d+)S(\d+)/);
        const currentType = getType(seatTickets[index]);

        const selectEl = (
            <select
                value={seatTickets[index]}
                onChange={e => updateTicketType(index, e.target.value)}
                style={{
                    backgroundColor: '#333', color: '#fff', border: 'none',
                    padding: '0.5rem 1rem', margin: '0 1rem', borderRadius: '5px',
                    cursor: 'pointer', fontWeight: 'bold', textAlign: 'center'
                }}
            >
                {ticketTypes.map(t => (
                    <option key={t.id} value={t.id}>{t.name} – {t.price.toFixed(2)} zł</option>
                ))}
            </select>
        );

        const info = (
            <div style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span role="img" aria-label="ticket">🎟️</span>
                    <strong>{currentType?.name}</strong> – {currentType?.price.toFixed(2)} zł
                </div>
                {match && (
                    <div style={{ fontSize: '0.9rem', marginTop: '0.3rem' }}>
                        {hallName} | rząd {match[1]}, miejsce {match[2]}
                    </div>
                )}
            </div>
        );

        return isMobile ? (
            <div key={seat} className="ticket-row">{info}{selectEl}</div>
        ) : (
            <div key={seat} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '0.7rem 0' }}>
                {info}{selectEl}
            </div>
        );
    };

    return (
        <div className="seat-selection-page d-flex flex-column">
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

                <div style={{ background: '#000', padding: '2rem', textAlign: 'center', color: 'white' }}>
                    <h2>WYBIERZ BILETY</h2>
                    <p style={{ color: 'black', fontWeight: 'bold' }}>
                        {selectedSeats?.length === 1
                            ? 'Wybrano jedno miejsce, wybierz typ biletu:'
                            : `Wybrano ${selectedSeats?.length || 0} miejsca, wybierz typ biletu:`}
                    </p>

                    <div style={{ color: 'black', background: '#fff', display: 'inline-block', padding: '1rem 2rem', borderRadius: '10px' }}>
                        {selectedSeats?.map(renderSeatRow)}

                        <div style={{ textAlign: 'left', marginTop: '1.5rem' }}>
                            <p><strong>Liczba biletów</strong>: {seatTickets.length}</p>
                            <p><strong>Razem</strong>: {(total + serviceFee).toFixed(2)} zł</p>
                            <p style={{ fontSize: '0.9rem' }}>w tym opłata serwisowa {serviceFee.toFixed(2)} zł</p>
                        </div>

                        <div style={{ marginTop: '1.5rem' }}>
                            <button
                                onClick={() => navigate('/rezerwacja/podsumowanie', {
                                    state: { showtimeId, film, kino, data, godzina, hallName, selectedSeats, seatTickets, ticketTypes }
                                })}
                                style={{
                                    padding: '0.9rem 2rem', backgroundColor: '#f5821e', border: 'none',
                                    borderRadius: '5px', fontWeight: 'bold', color: 'black', cursor: 'pointer',
                                    display: 'block', width: '100%'
                                }}
                            >
                                DALEJ
                                <div style={{ fontSize: '0.85rem', marginTop: '3px' }}>
                                    {seatTickets.length} bilet/ów - {(total + serviceFee).toFixed(2)} zł
                                </div>
                            </button>
                            <button onClick={() => navigate(-1)} style={{
                                marginTop: '0.7rem', padding: '0.9rem 2rem', backgroundColor: '#333',
                                color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold',
                                cursor: 'pointer', width: '100%'
                            }}>WRÓĆ</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
