import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import LanguageSwitcher from '../LanguageSwitcher';
import '../../styles/admin.scss';

const navItems = [
    { to: '/admin', key: 'dashboard', icon: 'bi-speedometer2', end: true },
    { to: '/admin/filmy', key: 'movies', icon: 'bi-film' },
    { to: '/admin/repertuar', key: 'showtimes', icon: 'bi-calendar3' },
    { to: '/admin/rezerwacje', key: 'bookings', icon: 'bi-ticket-perforated' },
    { to: '/admin/uzytkownicy', key: 'users', icon: 'bi-people' },
    { to: '/admin/wiadomosci', key: 'messages', icon: 'bi-envelope' },
];

export default function AdminLayout() {
    const { t } = useTranslation();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-brand">
                    <img src="/image/logo2.png" alt="CinemaBox" />
                    <span className="admin-brand-badge">Admin</span>
                </div>
                <nav className="admin-nav">
                    {navItems.map(item => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <i className={`bi ${item.icon}`}></i>
                            <span>{t(`admin.nav.${item.key}`)}</span>
                        </NavLink>
                    ))}
                </nav>
                <div className="admin-sidebar-footer">
                    <div className="admin-user">
                        <span className="admin-user-avatar" aria-hidden="true">
                            {user?.email?.[0]?.toUpperCase() || 'A'}
                        </span>
                        <div className="admin-user-id">
                            <span className="admin-user-role">{t('admin.layout.role')}</span>
                            <span className="admin-user-email">{user?.email}</span>
                        </div>
                    </div>
                    <div className="admin-lang">
                        <LanguageSwitcher />
                    </div>
                    <div className="admin-footer-actions">
                        <button type="button" className="secondary" onClick={() => navigate('/')}>
                            <i className="bi bi-house"></i>
                            {t('admin.layout.home')}
                        </button>
                        <button type="button" onClick={() => { logout(); navigate('/'); }}>
                            <i className="bi bi-box-arrow-right"></i>
                            {t('admin.layout.logout')}
                        </button>
                    </div>
                </div>
            </aside>
            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    );
}
