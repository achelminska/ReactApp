import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { adminApi } from '../../api';
import { dateLocale } from '../../i18n';
import AdminPagination, { usePagination } from '../../components/admin/AdminPagination';

export default function AdminMessagesPage() {
    const { t } = useTranslation();
    const [messages, setMessages] = useState([]);
    const [unreadOnly, setUnreadOnly] = useState(false);
    const [error, setError] = useState('');
    const [loaded, setLoaded] = useState(false);
    const { page, setPage, paged: pagedMessages, total, pageSize } = usePagination(messages);

    const load = () =>
        adminApi.messages.list(unreadOnly)
            .then(data => { setMessages(data); setLoaded(true); })
            .catch(err => setError(err.message));

    useEffect(() => { load(); setPage(1); }, [unreadOnly]);

    const toggleRead = async (id) => {
        try {
            await adminApi.messages.toggleRead(id);
            await load();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm(t('admin.messages.confirmDelete'))) return;
        try {
            await adminApi.messages.remove(id);
            await load();
        } catch (err) {
            setError(err.message);
        }
    };

    const unreadCount = messages.filter(m => !m.isRead).length;

    return (
        <div className="admin-page">
            <header className="admin-page-head">
                <h1>{t('admin.nav.messages')}</h1>
                <p>{t('admin.messages.subtitle')}</p>
            </header>
            {error && <p className="text-danger mb-3">{error}</p>}

            <div className="admin-filters">
                <label className="admin-switch">
                    <input
                        type="checkbox"
                        checked={unreadOnly}
                        onChange={e => setUnreadOnly(e.target.checked)}
                    />
                    {t('admin.messages.unreadOnly')} {unreadCount > 0 && `(${unreadCount})`}
                </label>
            </div>

            {loaded && messages.length === 0 && (
                <div className="admin-empty">
                    <i className="bi bi-envelope-open"></i>
                    <p>{unreadOnly ? t('admin.messages.noUnread') : t('admin.messages.emptyBox')}</p>
                </div>
            )}

            <div className="admin-messages">
                {pagedMessages.map(m => (
                    <article key={m.id} className={`admin-message ${m.isRead ? '' : 'unread'}`}>
                        <header className="msg-head">
                            <div className="msg-sender">
                                {!m.isRead && <span className="msg-dot" title={t('admin.messages.unread')}></span>}
                                <strong>{m.name}</strong>
                                <a href={`mailto:${m.email}`}>{m.email}</a>
                            </div>
                            <div className="msg-meta">
                                {m.category && <span className="admin-badge info">{m.category}</span>}
                                <time>{new Date(m.createdAt).toLocaleString(dateLocale())}</time>
                            </div>
                        </header>
                        {m.subject && <h3 className="msg-subject">{m.subject}</h3>}
                        <p className="msg-body">{m.message}</p>
                        <footer className="admin-actions">
                            <button type="button" className="secondary" onClick={() => toggleRead(m.id)}>
                                {m.isRead ? t('admin.messages.markUnread') : t('admin.messages.markRead')}
                            </button>
                            <button type="button" className="danger" onClick={() => handleDelete(m.id)}>
                                {t('admin.common.delete')}
                            </button>
                        </footer>
                    </article>
                ))}
            </div>
            <AdminPagination page={page} total={total} pageSize={pageSize} onChange={setPage} />
        </div>
    );
}
