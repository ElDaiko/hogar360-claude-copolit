import { useState, useEffect, useCallback } from "react";
import { usuarioService } from "../../services/usuarioService";
import type { User } from "../types";

interface UseUsuariosVendedoresReturn {
  usuarios: User[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  fetchUsuarios: (page?: number, limit?: number) => Promise<void>;
  deleteUsuario: (id: string) => Promise<void>;
  refreshUsuarios: () => Promise<void>;
}

export const useUsuariosVendedores = (): UseUsuariosVendedoresReturn => {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchUsuarios = useCallback(
    async (page: number = 1, limit: number = 10) => {
      setLoading(true);
      setError(null);

      try {
        const response = await usuarioService.getUsuarios(page, limit);

        if (response.success && response.data) {
          setUsuarios(response.data.data);
          setPagination(response.data.pagination);
        } else {
          setError(response.message || "Error al obtener usuarios");
          setUsuarios([]);
          setPagination({
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 0,
          });
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error al obtener usuarios";
        setError(errorMessage);
        setUsuarios([]);
        setPagination({
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        });
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteUsuario = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await usuarioService.deleteUsuario(id);

        if (response.success) {
          // Refrescar la lista después de eliminar
          await fetchUsuarios(pagination.page, pagination.limit);
        } else {
          setError(response.message || "Error al eliminar usuario");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error al eliminar usuario";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [fetchUsuarios, pagination.page, pagination.limit]
  );

  const refreshUsuarios = useCallback(async () => {
    await fetchUsuarios(pagination.page, pagination.limit);
  }, [fetchUsuarios, pagination.page, pagination.limit]);

  // Cargar usuarios al montar el componente
  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  return {
    usuarios,
    loading,
    error,
    pagination,
    fetchUsuarios,
    deleteUsuario,
    refreshUsuarios,
  };
};
