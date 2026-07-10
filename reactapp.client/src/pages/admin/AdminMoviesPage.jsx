import { useEffect, useState } from 'react';
import { adminApi } from '../../api';

const emptyForm = {
    title: '',
    description: '',
    posterUrl: '/image/logo2.png',
    durationMinutes: 120,
    genre: '',
    tags: '2D | PL (napisy)',
    isCurrentlyShowing: true,
    isUpcoming: false,
    isFamilyFriendly: false,
};

export default function AdminMoviesPage() {
    const [movies, setMovies] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    const load = () => adminApi.movies.list().then(setMovies).catch(err => setError(err.message));
    useEffect(() => { load(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        try {
            if (editingId) {
                await adminApi.movies.update(editingId, form);
            } else {
                await adminApi.movies.create(form);
            }
            setForm(emptyForm);
            setEditingId(null);
            await load();
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const startEdit = (movie) => {
        setEditingId(movie.id);
        setForm({
            title: movie.title,
            description: movie.description || '',
            posterUrl: movie.posterUrl,
            durationMinutes: movie.durationMinutes,
            genre: movie.genre || '',
            tags: movie.tags,
            isCurrentlyShowing: movie.isCurrentlyShowing,
            isUpcoming: movie.isUpcoming,
            isFamilyFriendly: movie.isFamilyFriendly,
        });
    };

    const handleDelete = async (id) => {
        if (!confirm('Usunąć ten film?')) return;
        try {
            await adminApi.movies.remove(id);
            await load();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="admin-page">
            <h1>Filmy</h1>
            {error && <p className="text-danger mb-3">{error}</p>}

            <form className="admin-form mb-4" onSubmit={handleSubmit}>
                <h3>{editingId ? 'Edytuj film' : 'Dodaj film'}</h3>
                <div className="form-group">
                    <label>Tytuł</label>
                    <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                </div>
                <div className="form-group">
                    <label>Opis</label>
                    <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>URL plakatu</label>
                    <input value={form.posterUrl} onChange={e => setForm({ ...form, posterUrl: e.target.value })} required />
                </div>
                <div className="form-group">
                    <label>Czas trwania (min)</label>
                    <input type="number" value={form.durationMinutes} onChange={e => setForm({ ...form, durationMinutes: +e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Gatunek</label>
                    <input value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} placeholder="np. Dramat / Komedia" />
                </div>
                <div className="form-group">
                    <label>Tagi</label>
                    <input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
                </div>
                <div className="checkbox-row">
                    <label><input type="checkbox" checked={form.isCurrentlyShowing} onChange={e => setForm({ ...form, isCurrentlyShowing: e.target.checked })} /> Na ekranie</label>
                    <label><input type="checkbox" checked={form.isUpcoming} onChange={e => setForm({ ...form, isUpcoming: e.target.checked })} /> Nadchodzące</label>
                    <label><input type="checkbox" checked={form.isFamilyFriendly} onChange={e => setForm({ ...form, isFamilyFriendly: e.target.checked })} /> Rodzinne</label>
                </div>
                <div className="admin-actions mt-3">
                    <button type="submit" disabled={saving}>{saving ? 'Zapisywanie...' : (editingId ? 'Zapisz' : 'Dodaj')}</button>
                    {editingId && (
                        <button type="button" className="secondary" onClick={() => { setEditingId(null); setForm(emptyForm); }}>
                            Anuluj
                        </button>
                    )}
                </div>
            </form>

            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Plakat</th>
                            <th>Tytuł</th>
                            <th>Kategorie</th>
                            <th>Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map(m => (
                            <tr key={m.id}>
                                <td><img src={m.posterUrl} alt="" style={{ height: 50 }} /></td>
                                <td>{m.title}</td>
                                <td>
                                    {m.isCurrentlyShowing && <span className="badge bg-warning text-dark me-1">Na ekranie</span>}
                                    {m.isUpcoming && <span className="badge bg-info me-1">Nadchodzące</span>}
                                    {m.isFamilyFriendly && <span className="badge bg-success">Rodzinne</span>}
                                </td>
                                <td className="admin-actions">
                                    <button type="button" onClick={() => startEdit(m)}>Edytuj</button>
                                    <button type="button" className="danger" onClick={() => handleDelete(m.id)}>Usuń</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
