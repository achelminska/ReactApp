import { useEffect, useRef, useState } from 'react';
import { Offcanvas, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cinemasApi, moviesApi, showtimesApi } from '../api';
import { dateLocale } from '../i18n';
import '../styles/buyticket.scss';

// Własny dropdown zamiast natywnego <select> — systemowa lista nie daje się
// ostylować na ciemno (na macOS ignoruje color-scheme).
function CityDropdown({ cities, value, onChange, loading }) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const onDocClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, []);

    return (
        <div className={`qb-city-dd ${open ? 'open' : ''}`} ref={ref}>
            <button
                type="button"
                className="qb-city-toggle"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen(o => !o)}
            >
                <i className="bi bi-geo-alt-fill qb-city-pin"></i>
                <span className={value ? 'qb-city-value' : 'qb-city-value empty'}>
                    {value || t('quickbuy.chooseCity')}
                </span>
                {loading
                    ? <Spinner animation="border" size="sm" className="qb-spinner" />
                    : <i className="bi bi-chevron-down qb-caret"></i>}
            </button>
            {open && (
                <ul className="qb-city-menu" role="listbox">
                    {cities.map(c => (
                        <li key={c}>
                            <button
                                type="button"
                                role="option"
                                aria-selected={c === value}
                                className={c === value ? 'selected' : ''}
                                onClick={() => { onChange(c); setOpen(false); }}
                            >
                                {c}
                                {c === value && <i className="bi bi-check-lg"></i>}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default function BuyTicketButton() {
    const { t } = useTranslation();
    const [showForm, setShowForm] = useState(false);
    const [cities, setCities] = useState([]);
    const [posters, setPosters] = useState({});
    const [options, setOptions] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedFilm, setSelectedFilm] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedShowtimeId, setSelectedShowtimeId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        cinemasApi.cities().then(setCities).catch(() => {});
        moviesApi.list()
            .then(movies => setPosters(Object.fromEntries(movies.map(m => [m.title, m.posterUrl]))))
            .catch(() => {});
    }, []);

    useEffect(() => {
        if (!selectedCity) {
            setOptions({});
            return;
        }
        setLoading(true);
        showtimesApi.options(selectedCity)
            .then(setOptions)
            .catch(() => setOptions({}))
            .finally(() => setLoading(false));
    }, [selectedCity]);

    const dates = Object.keys(options).sort();
    const films = selectedDate && options[selectedDate] ? Object.keys(options[selectedDate]).sort() : [];
    const times = selectedDate && selectedFilm && options[selectedDate]?.[selectedFilm]
        ? options[selectedDate][selectedFilm]
        : [];

    const resetSelections = () => {
        setSelectedDate('');
        setSelectedFilm('');
        setSelectedTime('');
        setSelectedShowtimeId(null);
    };

    const resetAll = () => {
        setSelectedCity('');
        resetSelections();
    };

    const formatDateLong = (isoDate) => {
        const d = new Date(isoDate + 'T12:00:00');
        return d.toLocaleDateString(dateLocale(), { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const dayPill = (isoDate) => {
        const d = new Date(isoDate + 'T12:00:00');
        const today = new Date();
        const isToday = d.toDateString() === today.toDateString();
        return {
            top: isToday ? t('common.today') : d.toLocaleDateString(dateLocale(), { weekday: 'short' }).replace('.', ''),
            bottom: d.toLocaleDateString(dateLocale(), { day: '2-digit', month: '2-digit' }),
        };
    };

    const ready = selectedCity && selectedFilm && selectedDate && selectedTime && selectedShowtimeId;

    return (
        <>
            <button type="button" className="floating-buy-btn" onClick={() => setShowForm(true)}>
                <span className="fb-icon">
                    <i className="bi bi-ticket-perforated-fill"></i>
                </span>
                <span className="fb-label">{t('quickbuy.buyTicket')}</span>
                <i className="bi bi-chevron-right fb-chevron"></i>
            </button>

            <Offcanvas show={showForm} onHide={() => setShowForm(false)} placement="end" className="offcanvas-custom quick-buy" scroll backdrop>
                <Offcanvas.Header closeButton>
                    <div className="quick-buy-heading">
                        <Offcanvas.Title className="quick-buy-title">{t('quickbuy.title')}</Offcanvas.Title>
                        <p className="quick-buy-subtitle">{t('quickbuy.subtitle')}</p>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body className="quick-buy-body">
                    <div className="quick-buy-steps">
                        {/* KINO */}
                        <div className="qb-section">
                            <span className="qb-label"><span className="qb-num">1</span>{t('quickbuy.cinema')}</span>
                            <CityDropdown
                                cities={cities}
                                value={selectedCity}
                                loading={loading}
                                onChange={(city) => { setSelectedCity(city); resetSelections(); }}
                            />
                        </div>

                        {/* DATA */}
                        {selectedCity && dates.length > 0 && (
                            <div className="qb-section">
                                <span className="qb-label"><span className="qb-num">2</span>{t('quickbuy.date')}</span>
                                <div className="qb-pills">
                                    {dates.map(d => {
                                        const p = dayPill(d);
                                        return (
                                            <button
                                                key={d}
                                                type="button"
                                                className={selectedDate === d ? 'qb-pill selected' : 'qb-pill'}
                                                onClick={() => {
                                                    setSelectedDate(d);
                                                    setSelectedFilm('');
                                                    setSelectedTime('');
                                                    setSelectedShowtimeId(null);
                                                }}
                                            >
                                                <span className="qb-pill-top">{p.top}</span>
                                                <span className="qb-pill-bottom">{p.bottom}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* FILM */}
                        {selectedDate && films.length > 0 && (
                            <div className="qb-section">
                                <span className="qb-label"><span className="qb-num">3</span>{t('quickbuy.film')}</span>
                                <div className="qb-films">
                                    {films.map(f => (
                                        <button
                                            key={f}
                                            type="button"
                                            className={selectedFilm === f ? 'qb-film selected' : 'qb-film'}
                                            onClick={() => {
                                                setSelectedFilm(f);
                                                setSelectedTime('');
                                                setSelectedShowtimeId(null);
                                            }}
                                        >
                                            {posters[f] && <img src={posters[f]} alt="" />}
                                            <span className="qb-film-title">{f}</span>
                                            {selectedFilm === f && <i className="bi bi-check-circle-fill qb-film-check"></i>}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* GODZINA */}
                        {selectedFilm && times.length > 0 && (
                            <div className="qb-section">
                                <span className="qb-label"><span className="qb-num">4</span>{t('quickbuy.time')}</span>
                                <div className="qb-pills">
                                    {times.map(t => (
                                        <button
                                            key={t.showtimeId}
                                            type="button"
                                            className={selectedShowtimeId === t.showtimeId ? 'qb-pill time selected' : 'qb-pill time'}
                                            onClick={() => {
                                                setSelectedTime(t.time);
                                                setSelectedShowtimeId(t.showtimeId);
                                            }}
                                        >
                                            {t.time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* PODSUMOWANIE I AKCJE */}
                    <div className="quick-buy-footer">
                        {ready && (
                            <p className="qb-summary">
                                <i className="bi bi-ticket-perforated me-2"></i>
                                {selectedFilm} · {selectedCity} · {formatDateLong(selectedDate)}, {selectedTime}
                            </p>
                        )}
                        <div className="qb-actions">
                            <button type="button" className="qb-reset" onClick={resetAll}>
                                <i className="bi bi-arrow-counterclockwise me-1"></i>{t('quickbuy.reset')}
                            </button>
                            <button
                                type="button"
                                className="qb-submit"
                                disabled={!ready}
                                onClick={() => {
                                    setShowForm(false);
                                    navigate('/rezerwacja/miejsca', {
                                        state: {
                                            showtimeId: selectedShowtimeId,
                                            kino: selectedCity,
                                            data: formatDateLong(selectedDate),
                                            film: selectedFilm,
                                            godzina: selectedTime,
                                        }
                                    });
                                }}
                            >
                                {t('quickbuy.chooseSeats')}<i className="bi bi-arrow-right ms-2"></i>
                            </button>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
