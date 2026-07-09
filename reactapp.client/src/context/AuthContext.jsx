import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authApi } from '../api';
import { getToken, setToken } from '../api/client';

const AuthContext = createContext(null);

function normalizeUser(user) {
    if (!user) return null;
    return { ...user, roles: user.roles ?? user.Roles ?? [] };
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!getToken()) {
            setLoading(false);
            return;
        }
        authApi.me()
            .then(data => setUser(normalizeUser(data)))
            .catch(() => setToken(null))
            .finally(() => setLoading(false));
    }, []);

    const login = useCallback(async (email, password) => {
        const { token, user: loggedUser } = await authApi.login(email, password);
        setToken(token);
        setUser(normalizeUser(loggedUser));
        return normalizeUser(loggedUser);
    }, []);

    const register = useCallback(async (email, password, city) => {
        const { token, user: newUser } = await authApi.register(email, password, city);
        setToken(token);
        setUser(normalizeUser(newUser));
        return normalizeUser(newUser);
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
    }, []);

    const isAdmin = !!user?.roles?.includes('Admin');

    return (
        <AuthContext.Provider value={{ user, loading, isAdmin, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth musi być użyty wewnątrz AuthProvider');
    return context;
}
