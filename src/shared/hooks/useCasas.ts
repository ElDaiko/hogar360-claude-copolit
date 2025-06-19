import { useState, useEffect } from "react";
import { casaService } from "../../services";
import type { Casa, EstadoPublicacion } from "../types";

export const useCasas = () => {
  const [casas, setCasas] = useState<Casa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [initialized, setInitialized] = useState(false);

  const fetchCasas = async (page: number = 1, vendedorId?: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await casaService.getCasas(page, 10, vendedorId);

      if (response.success && response.data) {
        setCasas(response.data.data);
        setPagination(response.data.pagination);
      } else {
        setError(response.message || "Error al obtener las casas");
        setCasas([]);
      }
    } catch (err) {
      console.error("Error in fetchCasas hook:", err);
      setError(
        "Error de conexión. Por favor, verifica tu conexión a internet."
      );
      setCasas([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteCasa = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await casaService.deleteCasa(id);

      if (response.success) {
        // Actualizar la lista local removiendo la casa eliminada
        setCasas((prevCasas) => prevCasas.filter((casa) => casa.id !== id));

        // Si la página actual queda vacía y no es la primera, ir a la página anterior
        const remainingCasas = casas.length - 1;
        if (remainingCasas === 0 && pagination.page > 1) {
          await fetchCasas(pagination.page - 1);
        } else if (remainingCasas > 0) {
          // Refrescar la página actual
          await fetchCasas(pagination.page);
        }
      } else {
        setError(response.message || "Error al eliminar la casa");
      }
    } catch (err) {
      console.error("Error in deleteCasa hook:", err);
      setError(
        "Error de conexión. Por favor, verifica tu conexión a internet."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateEstadoCasa = async (
    id: string,
    nuevoEstado: EstadoPublicacion
  ) => {
    try {
      setLoading(true);
      setError(null);

      const response = await casaService.updateEstadoCasa(id, nuevoEstado);

      if (response.success && response.data) {
        // Actualizar la casa en la lista local
        setCasas((prevCasas) =>
          prevCasas.map((casa) =>
            casa.id === id ? { ...casa, estadoPublicacion: nuevoEstado } : casa
          )
        );
      } else {
        setError(
          response.message || "Error al actualizar el estado de la casa"
        );
      }
    } catch (err) {
      console.error("Error in updateEstadoCasa hook:", err);
      setError(
        "Error de conexión. Por favor, verifica tu conexión a internet."
      );
    } finally {
      setLoading(false);
    }
  };

  const refreshCasas = async () => {
    await fetchCasas(pagination.page);
  };

  // Cargar casas iniciales solo una vez
  useEffect(() => {
    if (!initialized) {
      fetchCasas(1);
      setInitialized(true);
    }
  }, [initialized]);

  return {
    casas,
    loading,
    error,
    pagination,
    fetchCasas,
    deleteCasa,
    updateEstadoCasa,
    refreshCasas,
  };
};
