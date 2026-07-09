import { useEffect, useState } from 'react';
import { adminApi, cinemasApi, moviesApi } from '../../api';

const emptyForm = { movieId: '', hallId: '', startsAt: '' };

export default function AdminShowtimesPage() {
    const [showtimes, setShowtimes] = useState([]);
    const [cinemas, setCinemas] = useState([]);
    const [movies, setMovies] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [filters, setFilters] = useState({ city: '', date: '' });
    const [error, setError] = useState('');

    const halls = cinemas.flatMap(c =>
        c.halls.map(h => ({ ...h, city: c.city, label: `${c.city} — ${h.name}` }))
    );

    const reload = () => {
        const f = {};
        if (filters.city) f.city = filters.city;
        if (filters.date) f.date = filters.date;
        return adminApi.showtimes.list(f).then(setShowtimes).catch(err => setError(err.message));
    };

    useEffect(() => {
        cinemasApi.list().then(setCinemas);
        moviesApi.list().then(setMovies);
    }, []);

    useEffect(() => { reload(); }, [filters.city, filters.date]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const payload = {
            movieId: +form.movieId,
            hallId: +form.hallId,
            startsAt: new Date(form.startsAt).toISOString(),
        };
        try {
            if (editingId) await adminApi.showtimes.update(editingId, payload);
            else await adminApi.showtimes.create(payload);
            setForm(emptyForm);
            setEditingId(null);
            await reload();
        } catch (err) {
            setError(err.message);
        }
    };

    const startEdit = (s) => {
        setEditingId(s.id);
        const local = new Date(s.startsAt);
        const pad = n => String(n).padStart(2, '0');
        const localStr = `${local.getFullYear()}-${pad(local.getMonth() + 1)}-${pad(local.getDate())}T${pad(local.getHours())}:${pad(local.getMinutes())}`;
        const hall = halls.find(h => h.name === s.hallName && h.city === s.city);
        setForm({
            movieId: String(s.movie.id),
            hallId: hall ? String(hall.id) : '',
            startsAt: localStr,
        });
    };

    const handleDelete = async (id) => {
        if (!confirm('Usunąć ten seans?')) return;
        try {
            await adminApi.showtimes.remove(id);
            await reload();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="admin-page">
            <h1>Repertuar</h1>
            {error && <p className="text-danger mb-3">{error}</p>}

            <form className="admin-form mb-4" onSubmit={handleSubmit}>
                <h3>{editingId ? 'Edytuj seans' : 'Dodaj seans'}</h3>
                <div className="form-group">
                    <label>Film</label>
                    <select value={form.movieId} onChange={e => setForm({ ...form, movieId: e.target.value })} required>
                        <option value="">Wybierz film</option>
                        {movies.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Sala</label>
                    <select value={form.hallId} onChange={e => setForm({ ...form, hallId: e.target.value })} required>
                        <option value="">Wybierz salę</option>
                        {halls.map(h => <option key={h.id} value={h.id}>{h.label}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Data i godzina</label>
                    <input type="datetime-local" value={form.startsAt} onChange={e => setForm({ ...form, startsAt: e.target.value })} required />
                </div>
                <div className="admin-actions mt-3">
                    <button type="submit">{editingId ? 'Zapisz' : 'Dodaj'}</button>
                    {editingId && (
                        <button type="button" className="secondary" onClick={() => { setEditingId(null); setForm(emptyForm); }}>Anuluj</button>
                    )}
                </div>
            </form>

            <div className="admin-filters">
                <select value={filters.city} onChange={e => setFilters({ ...filters, city: e.target.value })}>
                    <option value="">Wszystkie miasta</option>
                    {cinemas.map(c => <option key={c.id} value={c.city}>{c.city}</option>)}
                </select>
                <input type="date" value={filters.date} onChange={e => setFilters({ ...filters, date: e.target.value })} />
            </div>

            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Film</th>
                            <th>Miasto</th>
                            <th>Sala</th>
                            <th>Data</th>
                            <th>Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showtimes.map(s => (
                            <tr key={s.id}>
                                <td>{s.movie.title}</td>
                                <td>{s.city}</td>
                                <td>{s.hallName}</td>
                                <td>{new Date(s.startsAt).toLocaleString('pl-PL')}</td>
                                <td className="admin-actions">
                                    <button type="button" onClick={() => startEdit(s)}>Edytuj</button>
                                    <button type="button" className="danger" onClick={() => handleDelete(s.id)}>Usuń</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
