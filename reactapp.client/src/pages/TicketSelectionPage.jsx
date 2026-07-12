import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/ticketSelection.scss';
import BookingHeader from '../components/BookingHeader';
import { ticketTypesApi } from '../api';
import { localizeHall, localizeTicketType } from '../i18n/content';

export default function TicketSelectionPage() {
    const { t } = useTranslation();
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

    if (!selectedSeats?.length) {
        return (
            <div className="ticket-selection-page">
                <BookingHeader step={2} showtimeId={showtimeId} />
                <p className="booking-status">{t('booking.noSeatsChosen')}</p>
            </div>
        );
    }

    return (
        <div className="ticket-selection-page d-flex flex-column">
            <div className="flex-grow-1">
                <BookingHeader step={2} showtimeId={showtimeId} />

                <div className="ticket-selection-content">
                    <h2 className="section-heading">{t('booking.ticketsTitle')}</h2>
                    <p className="ticket-selection-hint">
                        {t('booking.ticketsHint')}
                    </p>

                    <div className="ticket-list">
                        {selectedSeats.map((seat, index) => {
                            const match = seat.match(/R(\d+)S(\d+)/);
                            const currentType = getType(seatTickets[index]);
                            return (
                                <div key={seat} className="ticket-card">
                                    <div className="ticket-seat">
                                        <span className="seat-icon"><i className="bi bi-ticket-perforated"></i></span>
                                        <div>
                                            <div className="seat-place">{t('booking.seatPlace', { row: match?.[1], seat: match?.[2] })}</div>
                                            <div className="seat-hall">{localizeHall(hallName)}</div>
                                        </div>
                                    </div>
                                    <div className="ticket-type-picker">
                                        {ticketTypes.map(t => (
                                            <button
                                                key={t.id}
                                                type="button"
                                                className={seatTickets[index] === t.id ? 'type-pill selected' : 'type-pill'}
                                                onClick={() => updateTicketType(index, t.id)}
                                            >
                                                <span className="type-name">{localizeTicketType(t.name)}</span>
                                                <span className="type-price">{t.price.toFixed(2)} zł</span>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="ticket-price">{currentType?.price.toFixed(2)} zł</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* PASEK PODSUMOWANIA */}
            <div className="booking-bar">
                <div className="booking-bar-inner">
                    <div className="booking-bar-info">
                        <span className="count">
                            {t('booking.tickets', { count: seatTickets.length })}
                            {' · '}
                            <span className="price">{(total + serviceFee).toFixed(2)} zł</span>
                        </span>
                        <span className="hint">{t('booking.serviceFeeIncluded', { amount: serviceFee.toFixed(2) })}</span>
                    </div>
                    <div className="booking-bar-actions">
                        <button className="back-button" onClick={() => navigate(-1)}>{t('common.back')}</button>
                        <button
                            className="submit-button"
                            onClick={() => navigate('/rezerwacja/podsumowanie', {
                                state: { showtimeId, film, kino, data, godzina, hallName, selectedSeats, seatTickets, ticketTypes }
                            })}
                        >
                            {t('common.next')}<i className="bi bi-arrow-right ms-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
