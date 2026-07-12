import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { adminApi, cinemasApi, moviesApi } from '../../api';
import { dateLocale } from '../../i18n';
import AdminSelect from '../../components/admin/AdminSelect';
import AdminPagination, { usePagination } from '../../components/admin/AdminPagination';

const emptyForm = { movieId: '', hallId: '', startsAt: '' };

export default function AdminShowtimesPage() {
    const { t } = useTranslation();
    const [showtimes, setShowtimes] = useState([]);
    const [cinemas, setCinemas] = useState([]);
    const [movies, setMovies] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [filters, setFilters] = useState({ city: '', date: '' });
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState({ key: 'startsAt', dir: 'asc' });
    const [error, setError] = useState('');

    const visibleShowtimes = useMemo(() => {
        let list = showtimes;
        const q = search.trim().toLowerCase();
        if (q) {
            list = list.filter(s =>
                s.movie.title.toLowerCase().includes(q) ||
                s.hallName.toLowerCase().includes(q) ||
                s.city.toLowerCase().includes(q)
            );
        }
        const dir = sort.dir === 'asc' ? 1 : -1;
        const value = s => {
            switch (sort.key) {
                case 'title': return s.movie.title;
                case 'city': return s.city;
                case 'hall': return s.hallName;
                default: return new Date(s.startsAt).getTime();
            }
        };
        return [...list].sort((a, b) => {
            const va = value(a);
            const vb = value(b);
            if (typeof va === 'number') return (va - vb) * dir;
            return va.localeCompare(vb, 'pl') * dir;
        });
    }, [showtimes, search, sort]);

    const { page, setPage, paged: pagedShowtimes, total, pageSize } = usePagination(visibleShowtimes);

    useEffect(() => { setPage(1); }, [search, sort]);

    const toggleSort = (key) => {
        setSort(prev => prev.key === key
            ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
            : { key, dir: 'asc' });
    };

    const SortableTh = ({ colKey, children }) => (
        <th
            className={`sortable ${sort.key === colKey ? 'sorted' : ''}`}
            aria-sort={sort.key === colKey ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
        >
            <button type="button" onClick={() => toggleSort(colKey)}>
                {children}
                <i className={`bi ${sort.key === colKey
                    ? (sort.dir === 'asc' ? 'bi-caret-up-fill' : 'bi-caret-down-fill')
                    : 'bi-arrow-down-up'}`}></i>
            </button>
        </th>
    );

    const halls = cinemas.flatMap(c =>
        c.halls.map(h => ({ ...h, city: c.city, label: `${c.city} — ${h.name}` }))
    );

    const selectedMovie = movies.find(m => String(m.id) === form.movieId);

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

    useEffect(() => { reload(); setPage(1); }, [filters.city, filters.date]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!form.movieId || !form.hallId) {
            setError(t('admin.showtimes.movieHallRequired'));
            return;
        }
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        if (!confirm(t('admin.showtimes.confirmDelete'))) return;
        try {
            await adminApi.showtimes.remove(id);
            await reload();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="admin-page">
            <header className="admin-page-head">
                <h1>{t('admin.nav.showtimes')}</h1>
                <p>{t('admin.showtimes.subtitle')}</p>
            </header>
            {error && <p className="text-danger mb-3">{error}</p>}

            <form className="admin-form has-preview mb-4" onSubmit={handleSubmit}>
                <h3>{editingId ? t('admin.showtimes.editShowtime') : t('admin.showtimes.addShowtime')}</h3>
                <div className="admin-form-split">
                    <div className="admin-form-fields">
                        <div className="form-group">
                            <label>{t('admin.common.movie')}</label>
                            <AdminSelect
                                icon="bi-film"
                                placeholder={t('admin.showtimes.selectMovie')}
                                value={form.movieId}
                                onChange={v => setForm({ ...form, movieId: String(v) })}
                                options={movies.filter(m => !m.isArchived).map(m => ({ value: String(m.id), label: m.title }))}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t('admin.common.hall')}</label>
                            <AdminSelect
                                icon="bi-door-open"
                                placeholder={t('admin.showtimes.selectHall')}
                                value={form.hallId}
                                onChange={v => setForm({ ...form, hallId: String(v) })}
                                options={halls.map(h => ({ value: String(h.id), label: h.label }))}
                            />
                        </div>
                        <div className="form-group">
                            <label>{t('admin.showtimes.dateTime')}</label>
                            <input type="datetime-local" value={form.startsAt} onChange={e => setForm({ ...form, startsAt: e.target.value })} required />
                        </div>
                        <div className="admin-actions mt-3">
                            <button type="submit">{editingId ? t('admin.common.save') : t('admin.common.add')}</button>
                            {editingId && (
                                <button type="button" className="secondary" onClick={() => { setEditingId(null); setForm(emptyForm); }}>{t('admin.common.cancel')}</button>
                            )}
                        </div>
                    </div>
                    <aside className="showtime-poster" aria-hidden={!selectedMovie}>
                        {selectedMovie ? (
                            <>
                                <img key={selectedMovie.id} src={selectedMovie.posterUrl} alt={selectedMovie.title} />
                                <span className="showtime-poster-title">{selectedMovie.title}</span>
                            </>
                        ) : (
                            <div className="showtime-poster-empty">
                                <i className="bi bi-film"></i>
                                <span>{t('admin.showtimes.posterHint')}</span>
                            </div>
                        )}
                    </aside>
                </div>
            </form>

            <div className="admin-filters">
                <div className="admin-search">
                    <i className="bi bi-search"></i>
                    <input
                        type="search"
                        placeholder={t('admin.showtimes.searchPlaceholder')}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    {search && (
                        <button type="button" aria-label={t('admin.showtimes.clearSearch')} onClick={() => setSearch('')}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                    )}
                </div>
                <AdminSelect
                    icon="bi-geo-alt"
                    placeholder={t('admin.common.allCities')}
                    value={filters.city}
                    onChange={v => setFilters({ ...filters, city: v })}
                    options={[
                        { value: '', label: t('admin.common.allCities') },
                        ...cinemas.map(c => ({ value: c.city, label: c.city })),
                    ]}
                />
                <input type="date" value={filters.date} onChange={e => setFilters({ ...filters, date: e.target.value })} />
            </div>

            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <SortableTh colKey="title">{t('admin.common.movie')}</SortableTh>
                            <SortableTh colKey="city">{t('admin.common.city')}</SortableTh>
                            <SortableTh colKey="hall">{t('admin.common.hall')}</SortableTh>
                            <SortableTh colKey="startsAt">{t('admin.common.date')}</SortableTh>
                            <th>{t('admin.common.actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedShowtimes.length === 0 && (
                            <tr>
                                <td colSpan={5} className="admin-table-empty">
                                    {search
                                        ? t('admin.showtimes.noSearchResults', { query: search })
                                        : t('admin.showtimes.noFilterResults')}
                                </td>
                            </tr>
                        )}
                        {pagedShowtimes.map(s => (
                            <tr key={s.id}>
                                <td>{s.movie.title}</td>
                                <td>{s.city}</td>
                                <td>{s.hallName}</td>
                                <td>{new Date(s.startsAt).toLocaleString(dateLocale())}</td>
                                <td>
                                    <div className="admin-actions">
                                        <button type="button" onClick={() => startEdit(s)}>{t('admin.common.edit')}</button>
                                        <button type="button" className="danger" onClick={() => handleDelete(s.id)}>{t('admin.common.delete')}</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <AdminPagination page={page} total={total} pageSize={pageSize} onChange={setPage} />
        </div>
    );
}
