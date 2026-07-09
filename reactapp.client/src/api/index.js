import { apiFetch } from './client';

export const authApi = {
    login: (email, password) =>
        apiFetch('/api/auth/login', { method: 'POST', body: { email, password } }),
    register: (email, password, city) =>
        apiFetch('/api/auth/register', { method: 'POST', body: { email, password, city } }),
    me: () => apiFetch('/api/auth/me'),
};

export const moviesApi = {
    list: (category, search) => {
        const params = new URLSearchParams();
        if (category) params.set('category', category);
        if (search) params.set('search', search);
        const qs = params.toString();
        return apiFetch(`/api/movies${qs ? `?${qs}` : ''}`);
    },
    get: (id) => apiFetch(`/api/movies/${id}`),
};

export const cinemasApi = {
    list: () => apiFetch('/api/cinemas'),
    cities: () => apiFetch('/api/cinemas/cities'),
};

export const showtimesApi = {
    repertoire: (city, date) => {
        const params = new URLSearchParams({ city });
        if (date) params.set('date', date);
        return apiFetch(`/api/showtimes/repertoire?${params}`);
    },
    details: (id) => apiFetch(`/api/showtimes/${id}`),
    options: (city) => apiFetch(`/api/showtimes/options?${new URLSearchParams({ city })}`),
};

export const ticketTypesApi = {
    list: () => apiFetch('/api/ticket-types'),
};

export const bookingsApi = {
    create: (booking) => apiFetch('/api/bookings', { method: 'POST', body: booking }),
    my: () => apiFetch('/api/bookings/my'),
};

export const contactApi = {
    send: (message) => apiFetch('/api/contact', { method: 'POST', body: message }),
};

export const adminApi = {
    stats: () => apiFetch('/api/admin/stats'),
    movies: {
        list: () => apiFetch('/api/admin/movies'),
        create: (movie) => apiFetch('/api/admin/movies', { method: 'POST', body: movie }),
        update: (id, movie) => apiFetch(`/api/admin/movies/${id}`, { method: 'PUT', body: movie }),
        remove: (id) => apiFetch(`/api/admin/movies/${id}`, { method: 'DELETE' }),
    },
    showtimes: {
        list: (filters = {}) => {
            const params = new URLSearchParams();
            if (filters.city) params.set('city', filters.city);
            if (filters.date) params.set('date', filters.date);
            if (filters.movieId) params.set('movieId', filters.movieId);
            const qs = params.toString();
            return apiFetch(`/api/admin/showtimes${qs ? `?${qs}` : ''}`);
        },
        create: (showtime) => apiFetch('/api/admin/showtimes', { method: 'POST', body: showtime }),
        update: (id, showtime) => apiFetch(`/api/admin/showtimes/${id}`, { method: 'PUT', body: showtime }),
        remove: (id) => apiFetch(`/api/admin/showtimes/${id}`, { method: 'DELETE' }),
    },
    bookings: {
        list: (filters = {}) => {
            const params = new URLSearchParams();
            if (filters.city) params.set('city', filters.city);
            if (filters.email) params.set('email', filters.email);
            if (filters.date) params.set('date', filters.date);
            const qs = params.toString();
            return apiFetch(`/api/admin/bookings${qs ? `?${qs}` : ''}`);
        },
    },
    users: {
        list: () => apiFetch('/api/admin/users'),
        toggleAdmin: (id) => apiFetch(`/api/admin/users/${id}/toggle-admin`, { method: 'POST' }),
        toggleBlock: (id) => apiFetch(`/api/admin/users/${id}/toggle-block`, { method: 'POST' }),
    },
};
