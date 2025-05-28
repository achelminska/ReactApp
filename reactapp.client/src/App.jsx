import './styles/App.scss';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import CarouselBanner from './components/CarouselBanner';
import ScreenNow from './components/ScreenNow';
import SearchSection from './components/SearchSection';
import ScreenUpcoming from './components/ScreenUpcoming';
import ScreenFamily from './components/ScreenFamily';


function App() {
    return (
        <BrowserRouter>
            <Layout>
                <CarouselBanner />
                <ScreenNow />
                <ScreenUpcoming />
                <SearchSection />
                <ScreenFamily />
            </Layout>
        </BrowserRouter>
    );
}

export default App;