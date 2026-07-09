import { useEffect, useState } from 'react';
import { adminApi } from '../../api';

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

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
            <h1>Użytkownicy</h1>
            {error && <p className="text-danger mb-3">{error}</p>}

            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>E-mail</th>
                            <th>Miasto</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Rejestracja</th>
                            <th>Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id}>
                                <td>{u.email}</td>
                                <td>{u.city || '—'}</td>
                                <td>{u.roles?.join(', ') || 'User'}</td>
                                <td>{u.isBlocked ? 'Zablokowany' : 'Aktywny'}</td>
                                <td>{new Date(u.createdAt).toLocaleDateString('pl-PL')}</td>
                                <td className="admin-actions">
                                    <button type="button" onClick={() => toggleAdmin(u.id)}>
                                        {u.roles?.includes('Admin') ? 'Odbierz admina' : 'Nadaj admina'}
                                    </button>
                                    <button type="button" className={u.isBlocked ? 'secondary' : 'danger'} onClick={() => toggleBlock(u.id)}>
                                        {u.isBlocked ? 'Odblokuj' : 'Zablokuj'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
