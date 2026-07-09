import { useEffect, useState } from 'react';
import { adminApi } from '../../api';

export default function AdminDashboardPage() {
    const [stats, setStats] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        adminApi.stats()
            .then(setStats)
            .catch(err => setError(err.message));
    }, []);

    if (error) return <div className="admin-page"><p className="text-danger">{error}</p></div>;
    if (!stats) return <div className="admin-page"><p>Ładowanie...</p></div>;

    const maxCount = Math.max(...stats.bookingsPerDay.map(d => d.count), 1);

    return (
        <div className="admin-page">
            <h1>Dashboard</h1>
            <div className="admin-stats-grid">
                <div className="admin-stat-card">
                    <div className="label">Przychód</div>
                    <div className="value">{stats.totalRevenue.toFixed(2)} zł</div>
                </div>
                <div className="admin-stat-card">
                    <div className="label">Rezerwacje</div>
                    <div className="value">{stats.totalBookings}</div>
                </div>
                <div className="admin-stat-card">
                    <div className="label">Sprzedane bilety</div>
                    <div className="value">{stats.totalTickets}</div>
                </div>
                <div className="admin-stat-card">
                    <div className="label">Użytkownicy</div>
                    <div className="value">{stats.totalUsers}</div>
                </div>
                <div className="admin-stat-card">
                    <div className="label">Filmy</div>
                    <div className="value">{stats.totalMovies}</div>
                </div>
                <div className="admin-stat-card">
                    <div className="label">Nieprzeczytane wiadomości</div>
                    <div className="value">{stats.unreadMessages}</div>
                </div>
            </div>

            <div className="admin-chart">
                <h3>Rezerwacje (ostatnie 14 dni)</h3>
                {stats.bookingsPerDay.map(day => (
                    <div key={day.date} className="bar-row">
                        <span className="date">{day.date.slice(5)}</span>
                        <div className="bar">
                            <div
                                className="fill"
                                style={{ width: `${(day.count / maxCount) * 100}%` }}
                            />
                        </div>
                        <span className="count">{day.count}</span>
                    </div>
                ))}
            </div>

            {stats.topMovies?.length > 0 && (
                <div className="admin-table-wrap" style={{ marginTop: '1.5rem' }}>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Popularne filmy</th>
                                <th>Bilety</th>
                                <th>Przychód</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.topMovies.map(m => (
                                <tr key={m.title}>
                                    <td>{m.title}</td>
                                    <td>{m.tickets}</td>
                                    <td>{m.revenue.toFixed(2)} zł</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
