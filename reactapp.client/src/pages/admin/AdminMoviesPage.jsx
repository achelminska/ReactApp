import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { adminApi } from '../../api';
import AdminPagination, { usePagination } from '../../components/admin/AdminPagination';

const emptyForm = {
    title: '',
    description: '',
    posterUrl: '',
    durationMinutes: 120,
    genre: '',
    tags: '2D | PL (napisy)',
    isCurrentlyShowing: true,
    isUpcoming: false,
    isFamilyFriendly: false,
};

export default function AdminMoviesPage() {
    const { t } = useTranslation();
    const [movies, setMovies] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('active');
    const fileInputRef = useRef(null);

    const filters = [
        { id: 'active', label: t('admin.movies.filterActive') },
        { id: 'now', label: t('admin.movies.nowShowing') },
        { id: 'upcoming', label: t('admin.movies.upcoming') },
        { id: 'family', label: t('admin.movies.family') },
        { id: 'archived', label: t('admin.movies.filterArchived') },
        { id: 'all', label: t('admin.movies.filterAll') },
    ];

    const filteredMovies = useMemo(() => {
        let list = movies;
        switch (filter) {
            case 'active': list = list.filter(m => !m.isArchived); break;
            case 'now': list = list.filter(m => m.isCurrentlyShowing && !m.isArchived); break;
            case 'upcoming': list = list.filter(m => m.isUpcoming && !m.isArchived); break;
            case 'family': list = list.filter(m => m.isFamilyFriendly && !m.isArchived); break;
            case 'archived': list = list.filter(m => m.isArchived); break;
            default: break;
        }
        const q = search.trim().toLowerCase();
        if (!q) return list;
        return list.filter(m =>
            m.title.toLowerCase().includes(q) || (m.genre || '').toLowerCase().includes(q)
        );
    }, [movies, search, filter]);

    const { page, setPage, paged: pagedMovies, total, pageSize } = usePagination(filteredMovies);

    useEffect(() => { setPage(1); }, [search, filter]);

    const load = () => adminApi.movies.list().then(setMovies).catch(err => setError(err.message));
    useEffect(() => { load(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!form.posterUrl) {
            setError(t('admin.movies.posterRequired'));
            return;
        }
        setSaving(true);
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

    const uploadPoster = async (file) => {
        if (!file) return;
        setError('');
        setUploading(true);
        try {
            const { url } = await adminApi.upload(file);
            setForm(f => ({ ...f, posterUrl: url }));
        } catch (err) {
            setError(err.message);
        } finally {
            setUploading(false);
        }
    };

    const handlePosterFile = (e) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        uploadPoster(file);
    };

    const handlePosterDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        if (uploading) return;
        uploadPoster(e.dataTransfer.files?.[0]);
    };

    const handleDelete = async (id) => {
        if (!confirm(t('admin.movies.confirmDelete'))) return;
        try {
            await adminApi.movies.remove(id);
            await load();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleToggleArchive = async (movie) => {
        const msg = movie.isArchived
            ? t('admin.movies.confirmRestore')
            : t('admin.movies.confirmArchive');
        if (!confirm(msg)) return;
        try {
            await adminApi.movies.toggleArchive(movie.id);
            await load();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="admin-page">
            <header className="admin-page-head">
                <h1>{t('admin.nav.movies')}</h1>
                <p>{t('admin.movies.subtitle')}</p>
            </header>
            {error && <p className="text-danger mb-3">{error}</p>}

            <form className="admin-form mb-4" onSubmit={handleSubmit}>
                <h3>{editingId ? t('admin.movies.editMovie') : t('admin.movies.addMovie')}</h3>
                <div className="form-group">
                    <label>{t('admin.movies.title')}</label>
                    <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                </div>
                <div className="form-group">
                    <label>{t('admin.movies.description')}</label>
                    <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>{t('admin.movies.poster')}</label>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        hidden
                        onChange={handlePosterFile}
                    />
                    <div
                        className={`poster-dropzone ${dragOver ? 'drag-over' : ''} ${uploading ? 'busy' : ''}`}
                        role="button"
                        tabIndex={0}
                        aria-label={t('admin.movies.uploadAria')}
                        onClick={() => !uploading && fileInputRef.current?.click()}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInputRef.current?.click(); } }}
                        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={handlePosterDrop}
                    >
                        {uploading ? (
                            <div className="dz-placeholder">
                                <i className="bi bi-arrow-repeat dz-spin"></i>
                                <strong>{t('admin.movies.uploading')}</strong>
                            </div>
                        ) : form.posterUrl ? (
                            <div className="dz-preview">
                                <img
                                    src={form.posterUrl}
                                    alt=""
                                    onError={e => { e.target.style.visibility = 'hidden'; }}
                                    onLoad={e => { e.target.style.visibility = 'visible'; }}
                                />
                                <div className="dz-preview-info">
                                    <strong>{t('admin.movies.posterSet')}</strong>
                                    <span className="dz-url">{form.posterUrl}</span>
                                    <span className="dz-hint">{t('admin.movies.replaceHint')}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="dz-placeholder">
                                <i className="bi bi-cloud-arrow-up"></i>
                                <strong>{t('admin.movies.dropTitle')}</strong>
                                <span>{t('admin.movies.dropSub')}</span>
                                <span className="dz-hint">{t('admin.movies.dropHint')}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="form-group">
                    <label>{t('admin.movies.duration')}</label>
                    <input type="number" value={form.durationMinutes} onChange={e => setForm({ ...form, durationMinutes: +e.target.value })} />
                </div>
                <div className="form-group">
                    <label>{t('admin.movies.genre')}</label>
                    <input value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} placeholder={t('admin.movies.genrePlaceholder')} />
                </div>
                <div className="form-group">
                    <label>{t('admin.movies.tags')}</label>
                    <input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
                </div>
                <div className="checkbox-row">
                    <label><input type="checkbox" checked={form.isCurrentlyShowing} onChange={e => setForm({ ...form, isCurrentlyShowing: e.target.checked })} /> {t('admin.movies.nowShowing')}</label>
                    <label><input type="checkbox" checked={form.isUpcoming} onChange={e => setForm({ ...form, isUpcoming: e.target.checked })} /> {t('admin.movies.upcoming')}</label>
                    <label><input type="checkbox" checked={form.isFamilyFriendly} onChange={e => setForm({ ...form, isFamilyFriendly: e.target.checked })} /> {t('admin.movies.family')}</label>
                </div>
                <div className="admin-actions mt-3">
                    <button type="submit" disabled={saving}>{saving ? t('admin.common.saving') : (editingId ? t('admin.common.save') : t('admin.common.add'))}</button>
                    {editingId && (
                        <button type="button" className="secondary" onClick={() => { setEditingId(null); setForm(emptyForm); }}>
                            {t('admin.common.cancel')}
                        </button>
                    )}
                </div>
            </form>

            <div className="admin-filters">
                <div className="admin-search">
                    <i className="bi bi-search"></i>
                    <input
                        type="search"
                        placeholder={t('admin.movies.searchPlaceholder')}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    {search && (
                        <button type="button" aria-label={t('admin.movies.clearSearch')} onClick={() => setSearch('')}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                    )}
                </div>
                <div className="admin-pills" role="tablist" aria-label={t('admin.movies.filterAria')}>
                    {filters.map(f => (
                        <button
                            key={f.id}
                            type="button"
                            className={`admin-pill ${filter === f.id ? 'active' : ''}`}
                            onClick={() => setFilter(f.id)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>{t('admin.movies.poster')}</th>
                            <th>{t('admin.movies.title')}</th>
                            <th>{t('admin.movies.categories')}</th>
                            <th>{t('admin.common.actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedMovies.length === 0 && (
                            <tr>
                                <td colSpan={4} className="admin-table-empty">
                                    {search
                                        ? t('admin.movies.noSearchResults', { query: search })
                                        : t('admin.movies.noCategoryResults')}
                                </td>
                            </tr>
                        )}
                        {pagedMovies.map(m => (
                            <tr key={m.id} className={m.isArchived ? 'is-archived' : ''}>
                                <td><img src={m.posterUrl} alt="" className="admin-poster-thumb" /></td>
                                <td>{m.title}</td>
                                <td>
                                    {m.isArchived && <span className="admin-badge muted">{t('admin.movies.archivedBadge')}</span>}
                                    {m.isCurrentlyShowing && <span className="admin-badge accent">{t('admin.movies.nowShowing')}</span>}
                                    {m.isUpcoming && <span className="admin-badge info">{t('admin.movies.upcoming')}</span>}
                                    {m.isFamilyFriendly && <span className="admin-badge success">{t('admin.movies.family')}</span>}
                                </td>
                                <td>
                                    <div className="admin-actions">
                                        <button type="button" onClick={() => startEdit(m)}>{t('admin.common.edit')}</button>
                                        <button type="button" className="secondary" onClick={() => handleToggleArchive(m)}>
                                            {m.isArchived ? t('admin.movies.restore') : t('admin.movies.archive')}
                                        </button>
                                        <button type="button" className="danger" onClick={() => handleDelete(m.id)}>{t('admin.common.delete')}</button>
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
