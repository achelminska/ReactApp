import { useEffect, useState } from 'react';
import { adminApi, cinemasApi } from '../../api';

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [cities, setCities] = useState([]);
    const [filters, setFilters] = useState({ city: '', email: '', date: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        cinemasApi.cities().then(setCities);
    }, []);

    useEffect(() => {
        const f = {};
        if (filters.city) f.city = filters.city;
        if (filters.email) f.email = filters.email;
        if (filters.date) f.date = filters.date;
        adminApi.bookings.list(f)
            .then(setBookings)
            .catch(err => setError(err.message));
    }, [filters]);

    return (
        <div className="admin-page">
            <h1>Rezerwacje</h1>
            {error && <p className="text-danger mb-3">{error}</p>}

            <div className="admin-filters">
                <select value={filters.city} onChange={e => setFilters({ ...filters, city: e.target.value })}>
                    <option value="">Wszystkie miasta</option>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input
                    placeholder="E-mail klienta"
                    value={filters.email}
                    onChange={e => setFilters({ ...filters, email: e.target.value })}
                />
                <input type="date" value={filters.date} onChange={e => setFilters({ ...filters, date: e.target.value })} />
            </div>

            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data</th>
                            <th>Film</th>
                            <th>Miasto</th>
                            <th>Klient</th>
                            <th>Bilety</th>
                            <th>Kwota</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(b => (
                            <tr key={b.id}>
                                <td>{b.id}</td>
                                <td>{new Date(b.createdAt).toLocaleString('pl-PL')}</td>
                                <td>{b.movieTitle}</td>
                                <td>{b.city}</td>
                                <td>{b.customerName} {b.customerSurname}<br /><small>{b.customerEmail}</small></td>
                                <td>{b.seats?.length || 0}</td>
                                <td>{b.totalPrice.toFixed(2)} zł</td>
                                <td>{b.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
