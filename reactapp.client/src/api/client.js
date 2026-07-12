const TOKEN_KEY = 'cinemabox_token';

export function getToken() {
    return localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY);
}

// Czy aktualny token jest zapamiętany na stałe (localStorage), czy tylko na sesję
export function isTokenRemembered() {
    return localStorage.getItem(TOKEN_KEY) !== null;
}

// remember=false: token żyje tylko do zamknięcia przeglądarki (sessionStorage)
export function setToken(token, remember = true) {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    if (token) {
        (remember ? localStorage : sessionStorage).setItem(TOKEN_KEY, token);
    }
}

export class ApiError extends Error {
    constructor(status, data) {
        super(data?.message || `Błąd serwera (${status})`);
        this.status = status;
        this.data = data;
    }
}

async function parseResponse(response) {
    let data = null;
    const text = await response.text();
    if (text) {
        try {
            data = JSON.parse(text);
        } catch {
            data = { message: text };
        }
    }

    if (!response.ok) {
        throw new ApiError(response.status, data);
    }
    return data;
}

export async function apiFetch(path, { method = 'GET', body, ...options } = {}) {
    const headers = { ...options.headers };
    if (body !== undefined) headers['Content-Type'] = 'application/json';

    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(path, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
        ...options,
    });

    return parseResponse(response);
}

// Wysyłka pliku przez multipart/form-data — Content-Type ustawia przeglądarka
export async function apiUpload(path, file) {
    const formData = new FormData();
    formData.append('file', file);

    const headers = {};
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(path, { method: 'POST', headers, body: formData });
    return parseResponse(response);
}
