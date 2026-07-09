const TOKEN_KEY = 'cinemabox_token';

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
    if (token) {
        localStorage.setItem(TOKEN_KEY, token);
    } else {
        localStorage.removeItem(TOKEN_KEY);
    }
}

export class ApiError extends Error {
    constructor(status, data) {
        super(data?.message || `Błąd serwera (${status})`);
        this.status = status;
        this.data = data;
    }
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
