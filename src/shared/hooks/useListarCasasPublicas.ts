import { useState, useEffect, useCallback } from "react";
import type { Casa, PropertyFilters } from "../types";
import { casaService } from "../../services";

interface UseListarCasasPublicasState {
  casas: Casa[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface UseListarCasasPublicasReturn extends UseListarCasasPublicasState {
  refetch: () => void;
  setPage: (page: number) => void;
  setFilters: (filters: PropertyFilters) => void;
  filters: PropertyFilters;
}

export const useListarCasasPublicas = (
  initialPage: number = 1,
  initialLimit: number = 12,
  initialFilters: PropertyFilters = {}
): UseListarCasasPublicasReturn => {
  const [state, setState] = useState<UseListarCasasPublicasState>({
    casas: [],
    loading: true,
    error: null,
    pagination: {
      page: initialPage,
      limit: initialLimit,
      total: 0,
      totalPages: 0,
    },
  });

  const [filters, setFilters] = useState<PropertyFilters>(initialFilters);
  const [currentPage, setPage] = useState(initialPage);
  const fetchCasas = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await casaService.listarCasasPublicas(
        currentPage,
        state.pagination.limit,
        filters
      );

      if (response.success && response.data) {
        setState((prev) => ({
          ...prev,
          casas: response.data!.data,
          pagination: response.data!.pagination,
          loading: false,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          casas: [],
          loading: false,
          error: response.message || "Error al cargar las casas",
        }));
      }
    } catch (error) {
      console.error("Error fetching public houses:", error);
      setState((prev) => ({
        ...prev,
        casas: [],
        loading: false,
        error: "Error inesperado al cargar las casas",
      }));
    }
  }, [currentPage, filters, state.pagination.limit]);
  // Refetch when page or filters change
  useEffect(() => {
    fetchCasas();
  }, [fetchCasas]);

  const refetch = () => {
    fetchCasas();
  };

  const handleSetFilters = (newFilters: PropertyFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  return {
    ...state,
    filters,
    refetch,
    setPage,
    setFilters: handleSetFilters,
  };
};
