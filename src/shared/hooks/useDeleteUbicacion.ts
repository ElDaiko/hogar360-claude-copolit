import { useState } from "react";
import { ubicacionService } from "../../services/ubicacionService";

interface UseDeleteUbicacionReturn {
  deleteUbicacion: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
  clearMessages: () => void;
}

export const useDeleteUbicacion = (): UseDeleteUbicacionReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const deleteUbicacion = async (id: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await ubicacionService.deleteUbicacion(id);
      
      if (response.success) {
        setSuccess(true);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al eliminar la ubicación";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    deleteUbicacion,
    loading,
    error,
    success,
    clearMessages,
  };
};
