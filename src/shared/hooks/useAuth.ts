import { useState } from "react";
import { useAuthStore } from "../store";
import { authService } from "../../services/authService";
import type { LoginCredentials, RegisterVendedorData } from "../types";

export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login: loginStore,
    logout: logoutStore,
    setLoading,
    setError,
    clearError,
    hasRole,
    hasAnyRole,
  } = useAuthStore();

  const [loginAttempts, setLoginAttempts] = useState(0);
  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      clearError();

      const response = await authService.login(credentials);
      if (response.success && response.data) {
        loginStore(response.data.user, response.data.token);
      } else {
        throw new Error(response.message || "Error de inicio de sesión");
      }

      setLoginAttempts(0); // Reset attempts on successful login
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error de inicio de sesión";
      setError(errorMessage);
      setLoginAttempts((prev) => prev + 1);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const register = async (userData: RegisterVendedorData) => {
    try {
      setLoading(true);
      clearError();

      const response = await authService.register(userData);
      if (response.success && response.data) {
        loginStore(response.data.user, response.data.token);
      } else {
        throw new Error(response.message || "Error de registro");
      }

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error de registro";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      logoutStore();
      setLoginAttempts(0);
    } catch (error) {
      console.error("Logout error:", error);
      // Force logout even if service fails
      logoutStore();
    } finally {
      setLoading(false);
    }
  };

  const validateSession = async () => {
    if (!token) return false;

    try {
      setLoading(true);
      await authService.getProfile(token);
      return true;
    } catch (error) {
      console.error("Session validation failed:", error);
      logoutStore();
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Permission checks
  const canCreateCategories = () => hasRole("admin");
  const canCreateLocations = () => hasRole("admin");
  const canCreateVendedor = () => hasRole("admin");
  const canPublishProperty = () => hasRole("vendedor");
  const canManageProperties = () => hasAnyRole(["admin", "vendedor"]);
  const canScheduleVisits = () => hasAnyRole(["comprador"]);
  const canManageVisits = () => hasAnyRole(["vendedor"]);

  return {
    // State
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    loginAttempts,

    // Actions
    login,
    register,
    logout,
    validateSession,
    clearError,

    // Permission checks
    hasRole,
    hasAnyRole,
    canCreateCategories,
    canCreateLocations,
    canCreateVendedor,
    canPublishProperty,
    canManageProperties,
    canScheduleVisits,
    canManageVisits,
  };
};
