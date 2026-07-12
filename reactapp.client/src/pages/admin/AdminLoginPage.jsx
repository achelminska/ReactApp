import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import '../../styles/admin.scss';

export default function AdminLoginPage() {
    const { t } = useTranslation();
    const { user, isAdmin, loading, login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('admin@cinemabox.pl');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!loading && user && isAdmin) {
            navigate('/admin', { replace: true });
        }
    }, [loading, user, isAdmin, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            const loggedUser = await login(email, password);
            if (loggedUser.roles?.includes('Admin')) {
                navigate('/admin', { replace: true });
            } else {
                setError(t('admin.login.notAdminRole', { email: 'admin@cinemabox.pl' }));
            }
        } catch (err) {
            setError(err.message || t('admin.login.loginFailed'));
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="admin-login-page">
                <Spinner animation="border" variant="warning" />
            </div>
        );
    }

    return (
        <div className="admin-login-page">
            <div className="admin-login-card">
                <img src="/image/logo2.png" alt="CinemaBox" className="admin-login-logo" />
                <h1>{t('admin.login.title')}</h1>
                <p className="admin-login-hint">
                    {t('admin.login.hint')} <strong>admin@cinemabox.pl</strong>
                </p>

                {user && !isAdmin && (
                    <Alert variant="warning">
                        {t('admin.login.loggedNotAdmin', { email: user.email })}
                    </Alert>
                )}

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('admin.login.email')}</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('admin.login.password')}</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button type="submit" variant="warning" className="w-100 fw-bold" disabled={submitting}>
                        {submitting ? <Spinner size="sm" animation="border" /> : t('admin.login.submit')}
                    </Button>
                </Form>

                <Link to="/" className="admin-login-back">{t('admin.login.back')}</Link>
            </div>
        </div>
    );
}
