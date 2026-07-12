import './styles/App.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HeroBanner from './components/HeroBanner';
import ScreenNow from './components/ScreenNow';
import ScreenUpcoming from './components/ScreenUpcoming';
import ScreenFamily from './components/ScreenFamily';
import ContactPage from './pages/ContactPage';
import ContactFormPage from './pages/ContactFormPage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import TicketSelectionPage from './pages/TicketSelectionPage';
import OrderSummaryPage from './pages/OrderSummaryPage';
import RepertuarPage from './pages/RepertuarPage';
import SearchPage from './pages/SearchPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import MoviesListPage from './pages/MoviesListPage';
import MyBookingsPage from './pages/MyBookingsPage';
import AccountPage from './pages/AccountPage';
import LegalPage from './pages/LegalPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminRoute from './components/admin/AdminRoute';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminMoviesPage from './pages/admin/AdminMoviesPage';
import AdminShowtimesPage from './pages/admin/AdminShowtimesPage';
import AdminBookingsPage from './pages/admin/AdminBookingsPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminMessagesPage from './pages/admin/AdminMessagesPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout>
                            <>
                                <HeroBanner />
                                <ScreenNow />
                                <ScreenUpcoming />
                                <ScreenFamily />
                            </>
                        </Layout>
                    }
                />
                <Route path="/repertuar" element={<Layout><RepertuarPage /></Layout>} />
                <Route path="/filmy/:category" element={<Layout><MoviesListPage /></Layout>} />
                <Route path="/film/:id" element={<Layout><MovieDetailsPage /></Layout>} />
                <Route path="/moje-bilety" element={<Layout><MyBookingsPage /></Layout>} />
                <Route path="/moje-konto" element={<Layout><AccountPage /></Layout>} />
                <Route path="/szukaj" element={<Layout><SearchPage /></Layout>} />
                <Route path="/regulamin" element={<Layout><LegalPage type="terms" /></Layout>} />
                <Route path="/polityka-prywatnosci" element={<Layout><LegalPage type="privacy" /></Layout>} />
                <Route path="/cookies" element={<Layout><LegalPage type="cookies" /></Layout>} />
                <Route path="/kontakt" element={<ContactPage />} />
                <Route path="/kontakt/formularz" element={<ContactFormPage />} />
                <Route path="/rezerwacja/miejsca" element={<SeatSelectionPage />} />
                <Route path="/rezerwacja/bilety" element={<TicketSelectionPage />} />
                <Route path="/rezerwacja/podsumowanie" element={<OrderSummaryPage />} />

                {/* Przekierowania ze starych ścieżek */}
                <Route path="/wybor-miejsca" element={<Navigate to="/rezerwacja/miejsca" replace />} />
                <Route path="/seat-selection" element={<Navigate to="/rezerwacja/miejsca" replace />} />
                <Route path="/ticket-selection" element={<Navigate to="/rezerwacja/bilety" replace />} />
                <Route path="/order-summary" element={<Navigate to="/rezerwacja/podsumowanie" replace />} />
                <Route path="/kontakt/contactPage" element={<Navigate to="/kontakt" replace />} />
                <Route path="/search" element={<Navigate to="/szukaj" replace />} />

                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                    <Route index element={<AdminDashboardPage />} />
                    <Route path="filmy" element={<AdminMoviesPage />} />
                    <Route path="repertuar" element={<AdminShowtimesPage />} />
                    <Route path="rezerwacje" element={<AdminBookingsPage />} />
                    <Route path="uzytkownicy" element={<AdminUsersPage />} />
                    <Route path="wiadomosci" element={<AdminMessagesPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
