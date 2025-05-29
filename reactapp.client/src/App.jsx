import './styles/App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CarouselBanner from './components/CarouselBanner';
import ScreenNow from './components/ScreenNow';
import SearchSection from './components/SearchSection';
import ScreenUpcoming from './components/ScreenUpcoming';
import ScreenFamily from './components/ScreenFamily';
import ContactPage from './pages/ContactPage';
import ContactFormPage from './pages/ContactFormPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout>
                            <>
                                <CarouselBanner />
                                <ScreenNow />
                                <ScreenUpcoming />
                                <SearchSection />
                                <ScreenFamily />
                            </>
                        </Layout>
                    }
                />
                <Route path="/kontakt" element={<ContactPage />} />
                <Route path="/kontakt/formularz" element={<ContactFormPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;