import { useState } from "react";
import { ubicacionService } from "../../services/ubicacionService";
import type { CreateUbicacionForm } from "../validations/ubicacionSchemas";

export const useCreateUbicacion = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const createUbicacion = async (data: CreateUbicacionForm) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await ubicacionService.createUbicacion(data);

      if (response.success) {
        setSuccess(response.message || "Ubicación creada exitosamente");
        return response.data;
      } else {
        setError(response.message || "Error al crear la ubicación");
        throw new Error(response.message);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al crear la ubicación";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  return {
    createUbicacion,
    loading,
    error,
    success,
    clearMessages,
  };
};
