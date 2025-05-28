import { Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { upcoming } from '../data/upcoming';
import { scrollByRef } from '../utils/scroll';

export default function ScreenUpcoming() {
    const upRef = useRef(null);
    const items = [...upcoming, ...upcoming];

    const handleScroll = () => {
        const el = upRef.current;
        if (!el) return;
        const halfWidth = el.scrollWidth / 2;
        if (el.scrollLeft >= halfWidth) {
            el.scrollLeft -= halfWidth;
        } else if (el.scrollLeft <= 0) {
            el.scrollLeft += halfWidth;
        }
    };
    return (
        <Container fluid className="px-0 mt-5 screen-section">
            <h5 className="text-center mb-4">NADCHODZACE HITY</h5>
            <button
                className="scroll-btn scroll-btn-left"
                onClick={() => scrollByRef(upRef, -300)}
                aria-label="Przewiñ w lewo"
            >
                <i className="bi bi-chevron-left"></i>
            </button>
            <div
                ref={upRef}
                className="screen-row d-flex overflow-auto px-3"
                onScroll={handleScroll}
            >
                {items.map((upcoming, idx) => (
                    <div key={idx} className="movie-card text-center me-3">
                        <Nav.Link as={Link} to="/sciezka-docelowa" className="p-0">
                            <img
                                src={upcoming.src}
                                alt={upcoming.alt}
                                className="movie-img"
                            />
                            <p className="movie-title text-white mt-2">{upcoming.alt}</p>
                        </Nav.Link>
                    </div>
                ))}
            </div>
            <button
                className="scroll-btn scroll-btn-right"
                onClick={() => scrollByRef(upRef, 300)}
                aria-label="Przewiñ w prawo"
            >
                <i className="bi bi-chevron-right"></i>
            </button>
        </Container>
    );
}