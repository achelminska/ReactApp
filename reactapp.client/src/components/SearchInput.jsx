import React, { useState, useRef, useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import '../styles/searchinput.scss';

export default function SearchInput({ onSearch }) {
    const [open, setOpen] = useState(false);
    const inputRef = useRef(null);

    const toggleOpen = () => setOpen(prev => !prev);

    
    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = inputRef.current.value.trim();
        if (value && onSearch) onSearch(value);
        setOpen(false);
    };

    return (
        <div className="search-input-wrapper d-flex align-items-center">
            <div className="search-icon" onClick={toggleOpen} role="button" aria-label="Otwórz wyszukiwanie">
                <i className="bi bi-search"></i>
            </div>
            <Form className={open ? 'd-flex search-form show' : 'd-flex search-form'} onSubmit={handleSubmit}>
                <InputGroup>
                    <Form.Control
                        ref={inputRef}
                        type="text"
                        placeholder="Szukaj..."
                        className="search-input"
                        onBlur={() => setOpen(false)}
                    />
                </InputGroup>
            </Form>
        </div>
    );
}