import { useState, useCallback, useEffect } from "react";
import { categoriaService } from "../../services/categoriaService";
import type { CategoriaInmueble } from "../types";

interface UseListarCategoriasOptions {
  autoLoad?: boolean;
  pageSize?: number;
}

interface UseListarCategoriasReturn {
  categorias: CategoriaInmueble[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  searchTerm: string;
  selectedCategoria: CategoriaInmueble | null;
  // Actions
  loadCategorias: () => Promise<void>;
  setPage: (page: number) => void;
  setSearchTerm: (term: string) => void;
  selectCategoria: (categoria: CategoriaInmueble | null) => void;
  clearError: () => void;
  refresh: () => Promise<void>;
}

/**
 * Hook for HU#2 - Listar Categoría de inmuebles
 * Implements pagination, search and selection functionality
 * Available for all user roles
 */
export const useListarCategorias = (
  options: UseListarCategoriasOptions = {}
): UseListarCategoriasReturn => {
  const { autoLoad = true, pageSize = 6 } = options;

  // State management
  const [categorias, setCategorias] = useState<CategoriaInmueble[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTermState] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState<CategoriaInmueble | null>(null);

  // Load categories with current filters - HU#2 implementation
  const loadCategorias = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await categoriaService.getCategorias({
        page: currentPage,
        limit: pageSize,
        search: searchTerm.trim() || undefined,
      });

      if (response.success && response.data) {
        setCategorias(response.data);
        if (response.pagination) {
          setTotalPages(response.pagination.totalPages);
          setTotalItems(response.pagination.totalItems);
        }
      } else {
        setError(response.message || "Error al cargar las categorías");
        setCategorias([]);
      }
    } catch {
      setError("Error de conexión al cargar las categorías");
      setCategorias([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, searchTerm]);

  // Page management
  const setPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  // Search management - HU#2 requirement
  const setSearchTerm = useCallback((term: string) => {
    setSearchTermState(term);
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  // Selection management - HU#2 requirement
  const selectCategoria = useCallback((categoria: CategoriaInmueble | null) => {
    setSelectedCategoria(categoria);
  }, []);

  // Error management
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Refresh data
  const refresh = useCallback(async () => {
    await loadCategorias();
  }, [loadCategorias]);

  // Auto-load on mount and dependencies change
  useEffect(() => {
    if (autoLoad) {
      loadCategorias();
    }
  }, [loadCategorias, autoLoad]);

  return {
    // State
    categorias,
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
    searchTerm,
    selectedCategoria,
    // Actions
    loadCategorias,
    setPage,
    setSearchTerm,
    selectCategoria,
    clearError,
    refresh,
  };
};
