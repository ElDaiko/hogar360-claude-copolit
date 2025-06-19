import { useState, useEffect, useCallback } from "react";
import {
  ubicacionService,
  type SearchUbicacionesRequest,
} from "../../services/ubicacionService";
import type { Ubicacion } from "../types";

interface UseSearchUbicacionesReturn {
  ubicaciones: Ubicacion[];
  loading: boolean;
  error: string | null;
  searchQuery: string | undefined;
  totalResults: number;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  search: (params: SearchUbicacionesRequest) => Promise<void>;
  clearSearch: () => void;
}

export const useSearchUbicaciones = (): UseSearchUbicacionesReturn => {
  const [ubicaciones, setUbicaciones] = useState<Ubicacion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const search = useCallback(async (params: SearchUbicacionesRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await ubicacionService.searchUbicaciones(params);

      if (response.success && response.data) {
        setUbicaciones(response.data.data);
        setPagination(response.data.pagination);
        setSearchQuery(response.data.searchQuery);
      } else {
        setError(response.message || "Error al buscar ubicaciones");
        setUbicaciones([]);
        setPagination({
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al buscar ubicaciones";
      setError(errorMessage);
      setUbicaciones([]);
      setPagination({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setUbicaciones([]);
    setSearchQuery(undefined);
    setError(null);
    setPagination({
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    });
  }, []);

  // Initialize with empty search (show all)
  useEffect(() => {
    search({});
  }, [search]);

  return {
    ubicaciones,
    loading,
    error,
    searchQuery,
    totalResults: pagination.total,
    pagination,
    search,
    clearSearch,
  };
};
