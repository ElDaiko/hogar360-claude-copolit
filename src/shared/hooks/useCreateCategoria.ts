import { useState } from "react";
import { categoriaService } from "../../services/categoriaService";
import type { CreateCategoriaInmueble } from "../types";

export const useCreateCategoria = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Create new category - HU#1
  const createCategoria = async (
    data: CreateCategoriaInmueble
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await categoriaService.createCategoria(data);

      if (response.success) {
        setSuccess(response.message || "Categoría creada exitosamente");
        return true;
      } else {
        setError(response.message || "Error al crear la categoría");
        return false;
      }
    } catch {
      setError("Error al crear la categoría");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createCategoria,
    loading,
    error,
    success,
    clearMessages: () => {
      setError(null);
      setSuccess(null);
    },
  };
};
