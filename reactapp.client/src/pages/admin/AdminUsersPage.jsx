import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { adminApi } from '../../api';
import { dateLocale } from '../../i18n';
import AdminPagination, { usePagination } from '../../components/admin/AdminPagination';

export default function AdminUsersPage() {
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const { page, setPage, paged: pagedUsers, total, pageSize } = usePagination(users);

    const load = () => adminApi.users.list().then(setUsers).catch(err => setError(err.message));
    useEffect(() => { load(); }, []);

    const toggleAdmin = async (id) => {
        try {
            await adminApi.users.toggleAdmin(id);
            await load();
        } catch (err) {
            setError(err.message);
        }
    };

    const toggleBlock = async (id) => {
        try {
            await adminApi.users.toggleBlock(id);
            await load();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="admin-page">
            <header className="admin-page-head">
                <h1>{t('admin.nav.users')}</h1>
                <p>{t('admin.users.subtitle')}</p>
            </header>
            {error && <p className="text-danger mb-3">{error}</p>}

            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>{t('admin.common.email')}</th>
                            <th>{t('admin.common.city')}</th>
                            <th>{t('admin.users.roles')}</th>
                            <th>{t('admin.common.status')}</th>
                            <th>{t('admin.users.registered')}</th>
                            <th>{t('admin.common.actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedUsers.map(u => (
                            <tr key={u.id}>
                                <td>{u.email}</td>
                                <td>{u.city || '—'}</td>
                                <td>
                                    {u.roles?.includes('Admin')
                                        ? <span className="admin-badge accent">Admin</span>
                                        : <span className="admin-badge info">User</span>}
                                </td>
                                <td>
                                    {u.isBlocked
                                        ? <span className="admin-badge danger">{t('admin.users.blocked')}</span>
                                        : <span className="admin-badge success">{t('admin.users.active')}</span>}
                                </td>
                                <td>{new Date(u.createdAt).toLocaleDateString(dateLocale())}</td>
                                <td>
                                    <div className="admin-actions">
                                        <button type="button" onClick={() => toggleAdmin(u.id)}>
                                            {u.roles?.includes('Admin') ? t('admin.users.revokeAdmin') : t('admin.users.grantAdmin')}
                                        </button>
                                        <button type="button" className={u.isBlocked ? 'secondary' : 'danger'} onClick={() => toggleBlock(u.id)}>
                                            {u.isBlocked ? t('admin.users.unblock') : t('admin.users.block')}
                                        </button>
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
