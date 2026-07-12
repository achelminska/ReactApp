import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { adminApi } from '../../api';

export default function AdminDashboardPage() {
    const { t } = useTranslation();
    const [stats, setStats] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        adminApi.stats()
            .then(setStats)
            .catch(err => setError(err.message));
    }, []);

    if (error) return <div className="admin-page"><p className="text-danger">{error}</p></div>;
    if (!stats) return <div className="admin-page"><p>{t('admin.common.loading')}</p></div>;

    const maxCount = Math.max(...stats.bookingsPerDay.map(d => d.count), 1);

    const cards = [
        { icon: 'bi-cash-stack', label: t('admin.dashboard.revenue'), value: `${stats.totalRevenue.toFixed(2)} zł`, to: '/admin/rezerwacje' },
        { icon: 'bi-ticket-perforated', label: t('admin.dashboard.bookings'), value: stats.totalBookings, to: '/admin/rezerwacje' },
        { icon: 'bi-tags', label: t('admin.dashboard.ticketsSold'), value: stats.totalTickets, to: '/admin/rezerwacje' },
        { icon: 'bi-people', label: t('admin.dashboard.users'), value: stats.totalUsers, to: '/admin/uzytkownicy' },
        { icon: 'bi-film', label: t('admin.dashboard.movies'), value: stats.totalMovies, to: '/admin/filmy' },
        { icon: 'bi-envelope-exclamation', label: t('admin.dashboard.unreadMessages'), value: stats.unreadMessages, to: '/admin/wiadomosci' },
    ];

    return (
        <div className="admin-page">
            <header className="admin-page-head">
                <h1>{t('admin.nav.dashboard')}</h1>
                <p>{t('admin.dashboard.subtitle')}</p>
            </header>
            <div className="admin-stats-grid">
                {cards.map(card => {
                    const Tag = card.to ? Link : 'div';
                    return (
                        <Tag key={card.label} to={card.to} className="admin-stat-card">
                            <span className="stat-icon"><i className={`bi ${card.icon}`}></i></span>
                            <div className="stat-body">
                                <div className="label">{card.label}</div>
                                <div className="value">{card.value}</div>
                            </div>
                        </Tag>
                    );
                })}
            </div>

            <div className="admin-chart">
                <h3>{t('admin.dashboard.chart')}</h3>
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
                                <th>{t('admin.dashboard.topMovies')}</th>
                                <th>{t('admin.dashboard.tickets')}</th>
                                <th>{t('admin.dashboard.revenue')}</th>
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
