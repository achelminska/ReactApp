import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { adminApi, cinemasApi } from '../../api';
import { dateLocale } from '../../i18n';
import AdminSelect from '../../components/admin/AdminSelect';
import AdminPagination, { usePagination } from '../../components/admin/AdminPagination';

export default function AdminBookingsPage() {
    const { t } = useTranslation();
    const [bookings, setBookings] = useState([]);
    const [cities, setCities] = useState([]);
    const [filters, setFilters] = useState({ city: '', email: '', date: '' });
    const [error, setError] = useState('');
    const { page, setPage, paged: pagedBookings, total, pageSize } = usePagination(bookings);

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
        setPage(1);
    }, [filters]);

    const statusBadge = (status) => {
        const map = {
            Confirmed: ['success', t('admin.bookings.statusConfirmed')],
            Pending: ['info', t('admin.bookings.statusPending')],
            Cancelled: ['danger', t('admin.bookings.statusCancelled')],
        };
        const [variant, label] = map[status] || ['info', status];
        return <span className={`admin-badge ${variant}`}>{label}</span>;
    };

    return (
        <div className="admin-page">
            <header className="admin-page-head">
                <h1>{t('admin.nav.bookings')}</h1>
                <p>{t('admin.bookings.subtitle')}</p>
            </header>
            {error && <p className="text-danger mb-3">{error}</p>}

            <div className="admin-filters">
                <AdminSelect
                    icon="bi-geo-alt"
                    placeholder={t('admin.common.allCities')}
                    value={filters.city}
                    onChange={v => setFilters({ ...filters, city: v })}
                    options={[
                        { value: '', label: t('admin.common.allCities') },
                        ...cities.map(c => ({ value: c, label: c })),
                    ]}
                />
                <input
                    placeholder={t('admin.bookings.emailPlaceholder')}
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
                            <th>{t('admin.common.date')}</th>
                            <th>{t('admin.common.movie')}</th>
                            <th>{t('admin.common.city')}</th>
                            <th>{t('admin.bookings.customer')}</th>
                            <th>{t('admin.bookings.tickets')}</th>
                            <th>{t('admin.bookings.amount')}</th>
                            <th>{t('admin.common.status')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedBookings.map(b => (
                            <tr key={b.id}>
                                <td>{b.id}</td>
                                <td>{new Date(b.createdAt).toLocaleString(dateLocale())}</td>
                                <td>{b.movieTitle}</td>
                                <td>{b.city}</td>
                                <td>{b.customerName} {b.customerSurname}<br /><small>{b.customerEmail}</small></td>
                                <td>{b.seats?.length || 0}</td>
                                <td>{b.totalPrice.toFixed(2)} zł</td>
                                <td>{statusBadge(b.status)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <AdminPagination page={page} total={total} pageSize={pageSize} onChange={setPage} />
        </div>
    );
}
