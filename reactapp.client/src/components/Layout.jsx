import AppNavbar from './AppNavbar';
import Footer from './Footer';
import { useState } from 'react';
import { Button, Offcanvas, Form } from 'react-bootstrap';
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