import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="footer-inner">
                <div className="footer-main">
                    <div className="footer-brand">
                        <Link to="/">
                            <img src="/image/logo2.png" alt="CinemaBox" />
                        </Link>
                        <p>{t('footer.tagline')}</p>
                        <div className="footer-social">
                            <a href="https://facebook.com" aria-label="Facebook" rel="noopener noreferrer">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="https://instagram.com" aria-label="Instagram" rel="noopener noreferrer">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="https://youtube.com" aria-label="YouTube" rel="noopener noreferrer">
                                <i className="bi bi-youtube"></i>
                            </a>
                        </div>
                    </div>

                    <div className="footer-columns">
                        <div className="footer-col">
                            <h5>{t('footer.service')}</h5>
                            <ul>
                                <li><Link to="/repertuar">{t('footer.repertoire')}</Link></li>
                                <li><Link to="/filmy/na-ekranie">{t('nav.onScreen')}</Link></li>
                                <li><Link to="/moje-bilety">{t('nav.myTickets')}</Link></li>
                                <li><Link to="/szukaj">{t('footer.searchEngine')}</Link></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h5>{t('footer.aboutUs')}</h5>
                            <ul>
                                <li><Link to="/kontakt">{t('footer.cinemaboxPoland')}</Link></li>
                                <li><Link to="/kontakt/formularz">{t('footer.contact')}</Link></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h5>{t('footer.help')}</h5>
                            <ul>
                                <li><Link to="/kontakt">{t('footer.helpCenter')}</Link></li>
                                <li><Link to="/kontakt/formularz">{t('footer.contactForm')}</Link></li>
                                <li><a href="mailto:bok@cinemabox.pl">bok@cinemabox.pl</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <small>{t('footer.copyright', { year })}</small>
                    <div className="footer-legal">
                        <Link to="/regulamin">{t('footer.terms')}</Link>
                        <Link to="/polityka-prywatnosci">{t('footer.privacy')}</Link>
                        <Link to="/cookies">{t('footer.cookies')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
