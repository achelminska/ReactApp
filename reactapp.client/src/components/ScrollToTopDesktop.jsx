import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ScrollToTopDesktop() {
    const { t } = useTranslation();
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.pageYOffset > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            type="button"
            className={`scroll-to-top-desktop ${showButton ? 'visible' : ''}`}
            onClick={scrollToTop}
            title={t('scroll.backToTop')}
            aria-label={t('scroll.backToTop')}
            tabIndex={showButton ? 0 : -1}
        >
            <i className="bi bi-arrow-up"></i>
        </button>
    );
}
