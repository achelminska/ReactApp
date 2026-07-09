import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/admin.scss';

const navItems = [
    { to: '/admin', label: 'Dashboard', end: true },
    { to: '/admin/filmy', label: 'Filmy' },
    { to: '/admin/repertuar', label: 'Repertuar' },
    { to: '/admin/rezerwacje', label: 'Rezerwacje' },
    { to: '/admin/uzytkownicy', label: 'Użytkownicy' },
];

export default function AdminLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-brand">
                    <img src="/image/logo2.png" alt="CinemaBox" />
                    <span>Panel admina</span>
                </div>
                <nav className="admin-nav">
                    {navItems.map(item => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
                <div className="admin-sidebar-footer">
                    <small>{user?.email}</small>
                    <button type="button" onClick={() => { logout(); navigate('/'); }}>
                        Wyloguj
                    </button>
                    <button type="button" className="secondary" onClick={() => navigate('/')}>
                        Strona główna
                    </button>
                </div>
            </aside>
            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    );
}
