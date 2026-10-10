import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { useUiStore } from "../store/uiStore";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3001",
    withCredentials: true,
});

// Hébergement gratuit : l'API se met en veille et met jusqu'à ~50 s à se réveiller.
// Si une requête dure plus de 3 s, on affiche un message pour prévenir le joueur.
let pendingRequests = 0;
let slowTimer: ReturnType<typeof setTimeout> | undefined;

function requestDone() {
    pendingRequests = Math.max(0, pendingRequests - 1);
    if (pendingRequests === 0) {
        clearTimeout(slowTimer);
        useUiStore.getState().setServerWaking(false);
    }
}

api.interceptors.request.use((config) => {
    pendingRequests++;
    if (pendingRequests === 1) {
        slowTimer = setTimeout(
            () => useUiStore.getState().setServerWaking(true),
            3000,
        );
    }
    return config;
});

api.interceptors.response.use(
    (response) => {
        requestDone();
        return response;
    },
    (error) => {
        requestDone();
        return Promise.reject(error);
    },
);

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
}> = [];

function processQueue(error: unknown) {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) reject(error);
        else resolve(null);
    });
    failedQueue = [];
}

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(() => api(originalRequest));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const { data } = await axios.post(
                    `${import.meta.env.VITE_API_URL ?? "http://localhost:3001"}/auth/refresh`,
                    {},
                    { withCredentials: true },
                );
                useAuthStore.getState().setAccessToken(data.accessToken);
                processQueue(null);
                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError);
                useAuthStore.getState().clearAuth();
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    },
);

export default api;
