import { Navigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

export default function AdminRoute({ children }) {
    const { user, loading, isAdmin } = useAuth();

    if (loading) {
        return (
            <div className="admin-loading">
                <Spinner animation="border" variant="warning" />
            </div>
        );
    }

    if (!user || !isAdmin) return <Navigate to="/admin/login" replace />;

    return children;
}
