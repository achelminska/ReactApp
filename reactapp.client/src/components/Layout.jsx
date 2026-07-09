import AppNavbar from './AppNavbar';
import Footer from './Footer';
import ScrollToTopDesktop from './ScrollToTopDesktop';
import BuyTicketButton from './BuyTicketButton';

export default function Layout({ children }) {
    return (
       <>
            <AppNavbar />

            <div className="main-container ">
                {children}
            </div>

            <BuyTicketButton />   

            <Footer />
            <ScrollToTopDesktop />
       </>
    );
}