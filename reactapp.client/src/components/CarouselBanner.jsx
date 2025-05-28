import { Carousel } from 'react-bootstrap';
export default function CarouselBanner() {
    return (
<div className="image-container">
    <Carousel
        className="image-container"
        controls={false}       
        indicators={false}     
        interval={4000}       
        pause={false}          
        slide={true}           
    >
        <Carousel.Item>
            <img
                src="/image/desktop_starwars.jpg"
                alt="Baner 1"
                className="d-block w-100"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
                src="/image/dekstop_grzesznicy.jpg"
                alt="Baner 2"
                className="d-block w-100"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
                src="/image/desktop_oszukacprzeznaczenie.jpg"
                alt="Baner 3"
                className="d-block w-100"
            />
        </Carousel.Item>
    </Carousel>
        </div>
    );
}