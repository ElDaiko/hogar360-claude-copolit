import { useAuthStore } from "../store/authStore";

/**
 * Obtiene el token de autenticación de manera consistente
 * desde el store de Zustand
 */
export const getAuthToken = (): string | null => {
  const state = useAuthStore.getState();
  return state.token;
};

/**
 * Verifica si el usuario está autenticado
 */
export const isAuthenticated = (): boolean => {
  const state = useAuthStore.getState();
  return state.isAuthenticated && !!state.token;
};

/**
 * Obtiene los headers de autorización para requests HTTP
 */
export const getAuthHeaders = (): Record<string, string> => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
