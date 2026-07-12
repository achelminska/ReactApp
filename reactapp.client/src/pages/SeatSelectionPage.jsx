import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BookingHeader from '../components/BookingHeader';
import { moviesApi, showtimesApi } from '../api';
import { dateLocale } from '../i18n';
import { localizeHall } from '../i18n/content';
import '../styles/seats.scss';

const DAYS_AHEAD = 7;

function buildDays(t) {
    return Array.from({ length: DAYS_AHEAD }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return {
            iso: date.toISOString().slice(0, 10),
            label: i === 0
                ? t('common.today')
                : date.toLocaleDateString(dateLocale(), { weekday: 'short' }).replace('.', ''),
            dayNumber: date.toLocaleDateString(dateLocale(), { day: '2-digit', month: '2-digit' }),
        };
    });
}

export default function SeatSelectionPage() {
    const { t, i18n } = useTranslation();
    const { state } = useLocation();
    const navigate = useNavigate();

    const [showtimeId, setShowtimeId] = useState(state?.showtimeId);
    const [details, setDetails] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const days = useMemo(() => buildDays(t), [i18n.resolvedLanguage]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [dayTimes, setDayTimes] = useState([]);

    // Rozmiar fotela dobierany tak, by najszerszy rząd mieścił się bez przewijania
    const seatsWrapperRef = useRef(null);
    const [seatSize, setSeatSize] = useState(38);

    useLayoutEffect(() => {
        const compute = () => {
            const el = seatsWrapperRef.current;
            const layout = details?.layout;
            if (!el || !layout?.length) return;
            const cols = Math.max(...layout.map(r => r.length));
            // szerokość rzędu = numer rzędu (~22px) + fotele + odstępy 20% między nimi
            const available = el.clientWidth - 24;
            const size = Math.floor(available / (1.2 * cols + 0.2));
            setSeatSize(Math.max(11, Math.min(38, size)));
        };
        compute();
        window.addEventListener('resize', compute);
        return () => window.removeEventListener('resize', compute);
    }, [details]);

    // Szczegóły seansu: układ sali, zajęte miejsca, dane filmu
    useEffect(() => {
        if (!showtimeId) {
            setError(t('booking.noShowtimeData'));
            setLoading(false);
            return;
        }
        setLoading(true);
        showtimesApi.details(showtimeId)
            .then(d => {
                setDetails(d);
                setSelectedSeats([]);
                if (!selectedDay) setSelectedDay(d.startsAt.slice(0, 10));
            })
            .catch(() => setError(t('booking.hallLoadError')))
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showtimeId]);

    // Godziny seansów filmu dla wybranego dnia (umożliwia zmianę seansu na tej stronie)
    useEffect(() => {
        if (!details || !selectedDay) return;
        moviesApi.showtimes(details.movieId, details.city, selectedDay)
            .then(setDayTimes)
            .catch(() => setDayTimes([]));
    }, [details?.movieId, details?.city, selectedDay]);

    const toggleSeat = (rowIndex, seat) => {
        const seatId = `R${rowIndex + 1}S${seat}`;
        setSelectedSeats(prev =>
            prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
        );
    };

    const startsAt = details ? new Date(details.startsAt) : null;
    const timeLabel = startsAt
        ? startsAt.toLocaleTimeString(dateLocale(), { hour: '2-digit', minute: '2-digit' })
        : state?.godzina;
    const dateLabel = startsAt
        ? startsAt.toLocaleDateString(dateLocale(), { weekday: 'short', day: '2-digit', month: '2-digit' })
        : state?.data;

    const handleSubmit = () => {
        if (selectedSeats.length === 0) return;
        navigate('/rezerwacja/bilety', {
            state: {
                showtimeId,
                kino: details.city,
                data: dateLabel,
                film: details.movieTitle,
                godzina: timeLabel,
                hallName: details.hallName,
                selectedSeats,
            },
        });
    };

    if (loading) return <div className="seat-selection-page"><p className="seats-status">{t('booking.loadingHall')}</p></div>;
    if (error) return <div className="seat-selection-page"><p className="seats-status error">{error}</p></div>;

    return (
        <div className="seat-selection-page">
            {/* NAGŁÓWEK Z FILMEM */}
            <BookingHeader step={1} details={details} />

            <div className="booking-body">
                {/* DZIEŃ I GODZINA */}
                <div className="session-pickers">
                    <div className="picker-group">
                        <span className="picker-label">{t('booking.date')}</span>
                        <div className="picker-pills">
                            {days.map(d => (
                                <button
                                    key={d.iso}
                                    className={selectedDay === d.iso ? 'pill selected' : 'pill'}
                                    onClick={() => setSelectedDay(d.iso)}
                                >
                                    <span className="pill-top">{d.label}</span>
                                    <span className="pill-bottom">{d.dayNumber}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="picker-group">
                        <span className="picker-label">{t('booking.time')}</span>
                        <div className="picker-pills">
                            {dayTimes.length > 0 ? dayTimes.map(t => (
                                <button
                                    key={t.showtimeId}
                                    className={t.showtimeId === showtimeId ? 'pill time selected' : 'pill time'}
                                    onClick={() => setShowtimeId(t.showtimeId)}
                                >
                                    <span className="pill-top">{t.time}</span>
                                    <span className="pill-bottom">{localizeHall(t.hallName)}</span>
                                </button>
                            )) : (
                                <span className="no-times">{t('booking.noTimesThisDay')}</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* EKRAN */}
                <div className="screen-area">
                    <svg className="screen-svg" viewBox="0 0 560 240" aria-hidden="true">
                        <defs>
                            <linearGradient id="screenBeam" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" stopColor="#F5821E" stopOpacity="0.20" />
                                <stop offset="0.5" stopColor="#F5821E" stopOpacity="0.06" />
                                <stop offset="1" stopColor="#F5821E" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="screenLine" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0" stopColor="#F5821E" stopOpacity="0" />
                                <stop offset="0.12" stopColor="#F5821E" stopOpacity="1" />
                                <stop offset="0.88" stopColor="#F5821E" stopOpacity="1" />
                                <stop offset="1" stopColor="#F5821E" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {/* Stożek światła: góra idealnie po łuku ekranu, boki rozchodzą się ku dołowi */}
                        <path d="M40,62 Q280,12 520,62 L560,240 L0,240 Z" fill="url(#screenBeam)" />
                        {/* Linia ekranu */}
                        <path d="M40,60 Q280,10 520,60" fill="none" stroke="url(#screenLine)" strokeWidth="5" strokeLinecap="round" />
                    </svg>
                    <div className="screen-label">{t('booking.screen')}</div>
                </div>

                {/* SALA */}
                <div className="seats-wrapper" ref={seatsWrapperRef}>
                    <div className="seats" style={{ '--seat': `${seatSize}px` }}>
                        {details.layout.map((row, rowIndex) => (
                            <div key={rowIndex} className="seat-row">
                                <div className="row-number">{rowIndex + 1}</div>
                                {row.map((seat, seatIndex) => {
                                    if (seat === null) {
                                        return <div key={seatIndex} className="seat empty" />;
                                    }
                                    const seatId = `R${rowIndex + 1}S${seat}`;
                                    const isSelected = selectedSeats.includes(seatId);
                                    const isOccupied = details.occupiedSeats.includes(seatId);
                                    return (
                                        <div
                                            key={seatId}
                                            className={`seat ${isSelected ? 'selected' : ''} ${isOccupied ? 'occupied' : ''}`}
                                            title={isOccupied ? t('booking.seatOccupied') : t('booking.seatTooltip', { row: rowIndex + 1, seat })}
                                            onClick={() => !isOccupied && toggleSeat(rowIndex, seat)}
                                        >
                                            <span className="seat-num">{seat}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                {/* LEGENDA */}
                <div className="seats-legend">
                    <span><i className="legend-dot free" />{t('booking.legendFree')}</span>
                    <span><i className="legend-dot occupied" />{t('booking.legendOccupied')}</span>
                    <span><i className="legend-dot selected" />{t('booking.legendSelected')}</span>
                </div>
            </div>

            {/* PASEK PODSUMOWANIA */}
            <div className="booking-bar">
                <div className="booking-bar-inner">
                    <div className="booking-bar-info">
                        {selectedSeats.length > 0 ? (
                            <>
                                <span className="count">
                                    {t('booking.seatsSelected', { count: selectedSeats.length })}
                                </span>
                                <div className="seat-chips">
                                    {selectedSeats.map(s => {
                                        const m = s.match(/R(\d+)S(\d+)/);
                                        return (
                                            <span key={s} className="seat-chip" onClick={() =>
                                                setSelectedSeats(prev => prev.filter(x => x !== s))
                                            }>
                                                {t('booking.seatChip', { row: m[1], seat: m[2] })}
                                                <i className="bi bi-x"></i>
                                            </span>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            <span className="hint">{t('booking.chooseSeatsHint')}</span>
                        )}
                    </div>
                    <div className="booking-bar-actions">
                        <button className="back-button" onClick={() => navigate(-1)}>{t('common.back')}</button>
                        <button
                            className="submit-button"
                            disabled={selectedSeats.length === 0}
                            onClick={handleSubmit}
                        >
                            {t('common.next')}<i className="bi bi-arrow-right ms-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
