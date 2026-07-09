import { useEffect, useState } from 'react';
import { Button, Offcanvas, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { cinemasApi, showtimesApi } from '../api';
import '../styles/buyticket.scss';

export default function BuyTicketButton() {
    const [showForm, setShowForm] = useState(false);
    const [cities, setCities] = useState([]);
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
    const films = selectedDate && options[selectedDate] ? Object.keys(options[selectedDate]) : [];
    const times = selectedDate && selectedFilm && options[selectedDate]?.[selectedFilm]
        ? options[selectedDate][selectedFilm]
        : [];

    const resetSelections = () => {
        setSelectedDate('');
        setSelectedFilm('');
        setSelectedTime('');
        setSelectedShowtimeId(null);
    };

    const formatDate = (isoDate) => {
        const d = new Date(isoDate + 'T12:00:00');
        return d.toLocaleDateString('pl-PL', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    return (
        <>
            <div className="floating-zakup-btn" onClick={() => setShowForm(true)}>
                <Button variant="danger" className="button-kupbilet rounded-pill d-flex align-items-center px-4 py-3 gap-2">
                    <i className="bi bi-cart3 fs-4"></i>
                    <span className="fw-bold">KUP BILET</span>
                </Button>
            </div>

            <Offcanvas show={showForm} onHide={() => setShowForm(false)} placement="end" className="offcanvas-custom" scroll backdrop>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="szybkiZakupMobile">Szybki zakup</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {loading && <Spinner animation="border" size="sm" className="mb-3" />}
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Kino</Form.Label>
                            <Form.Select value={selectedCity} onChange={(e) => {
                                setSelectedCity(e.target.value);
                                resetSelections();
                            }}>
                                <option value="">Wybierz kino</option>
                                {cities.map(c => <option key={c} value={c}>{c}</option>)}
                            </Form.Select>
                        </Form.Group>

                        {selectedCity && dates.length > 0 && (
                            <Form.Group className="mb-3">
                                <Form.Label>Data</Form.Label>
                                <Form.Select value={selectedDate} onChange={(e) => {
                                    setSelectedDate(e.target.value);
                                    setSelectedFilm('');
                                    setSelectedTime('');
                                    setSelectedShowtimeId(null);
                                }}>
                                    <option value="">Wybierz datę</option>
                                    {dates.map(d => <option key={d} value={d}>{formatDate(d)}</option>)}
                                </Form.Select>
                            </Form.Group>
                        )}

                        {selectedDate && films.length > 0 && (
                            <Form.Group className="mb-3">
                                <Form.Label>Film</Form.Label>
                                <Form.Select value={selectedFilm} onChange={(e) => {
                                    setSelectedFilm(e.target.value);
                                    setSelectedTime('');
                                    setSelectedShowtimeId(null);
                                }}>
                                    <option value="">Wybierz film</option>
                                    {films.map(f => <option key={f} value={f}>{f}</option>)}
                                </Form.Select>
                            </Form.Group>
                        )}

                        {selectedFilm && times.length > 0 && (
                            <Form.Group className="mb-3">
                                <Form.Label>Godzina</Form.Label>
                                <Form.Select value={selectedTime} onChange={(e) => {
                                    const entry = times.find(t => t.time === e.target.value);
                                    setSelectedTime(e.target.value);
                                    setSelectedShowtimeId(entry?.showtimeId ?? null);
                                }}>
                                    <option value="">Wybierz godzinę</option>
                                    {times.map(t => <option key={t.showtimeId} value={t.time}>{t.time}</option>)}
                                </Form.Select>
                            </Form.Group>
                        )}

                        <div className="d-flex justify-content-end">
                            <Button variant="outline-secondary" className="me-2" onClick={() => {
                                setSelectedCity('');
                                resetSelections();
                            }}>Reset</Button>
                            <Button
                                variant="primary"
                                disabled={!(selectedCity && selectedFilm && selectedDate && selectedTime && selectedShowtimeId)}
                                onClick={() => {
                                    setShowForm(false);
                                    navigate('/rezerwacja/miejsca', {
                                        state: {
                                            showtimeId: selectedShowtimeId,
                                            kino: selectedCity,
                                            data: formatDate(selectedDate),
                                            film: selectedFilm,
                                            godzina: selectedTime,
                                        }
                                    });
                                }}
                            >
                                Dalej
                            </Button>
                        </div>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
