import { useState, useEffect, useCallback } from "react";
import { ubicacionService } from "../../services/ubicacionService";
import type { Ubicacion } from "../types";

interface UseUbicacionesReturn {
  ubicaciones: Ubicacion[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const useUbicaciones = (page: number = 1, limit: number = 10): UseUbicacionesReturn => {
  const [ubicaciones, setUbicaciones] = useState<Ubicacion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchUbicaciones = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await ubicacionService.getUbicaciones(page, limit);
      
      if (response.success && response.data) {
        setUbicaciones(response.data.data);
        setPagination(response.data.pagination);
      } else {
        setError(response.message || "Error al cargar las ubicaciones");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al cargar las ubicaciones";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchUbicaciones();
  }, [fetchUbicaciones]);

  return {
    ubicaciones,
    loading,
    error,
    refetch: fetchUbicaciones,
    pagination,
  };
};
