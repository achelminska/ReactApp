import { Container, Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cinemasApi } from '../api';

const customStyles = {
    control: (base) => ({
        ...base,
        background: 'black',
        borderColor: '#F5821E',
        color: '#fff',
        boxShadow: 'none',
        outline: 'none',
        '&:hover': { borderColor: '#F5821E' },
    }),
    menu: (base) => ({ ...base, margin: 0 }),
    menuList: (base) => ({ ...base, margin: 0, padding: 0 }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? '#F5821E' : '#121212',
        color: state.isFocused ? '#000' : '#fff',
    }),
    singleValue: (base) => ({ ...base, color: '#fff' }),
};

export default function SearchSection() {
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        cinemasApi.cities()
            .then(list => {
                setCities(list);
                if (list.length > 0) setCity(list[0]);
            })
            .catch(() => {});
    }, []);

    const options = cities.map(c => ({ value: c, label: c }));

    const handleShow = () => {
        if (city) navigate('/repertuar', { state: { selectedCity: city } });
    };

    return (
        <Container fluid className="search-section py-4">
            <Row className="justify-content-end justify-content-md-center">
                <Col xs={12} md={8} lg={6} xl={5}>
                    <div className="search-box d-flex flex-column flex-md-row align-items-start align-items-md-center">
                        <span className="search-label mb-2 mb-md-0 me-md-3">
                            SPRAWDŹ CO GRAMY W
                        </span>
                        <div className="d-flex w-100">
                            <div className="flex-grow-1 me-3">
                                <Select
                                    styles={customStyles}
                                    options={options}
                                    value={options.find(o => o.value === city)}
                                    onChange={o => setCity(o?.value || '')}
                                />
                            </div>
                            <Button variant="outline-light" onClick={handleShow}>
                                POKAŻ
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
