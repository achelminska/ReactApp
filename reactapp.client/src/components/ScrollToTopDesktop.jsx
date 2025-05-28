import { useEffect, useState } from 'react';

export default function ScrollToTopDesktop() {
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
        <>
            {showButton && (
                <div
                    className="scroll-to-top-desktop"
                    onClick={scrollToTop}
                    title="Do góry"
                    role="button"
                >
                    <i className="bi bi-arrow-up"></i>
                </div>
            )}
        </>
    );
}
