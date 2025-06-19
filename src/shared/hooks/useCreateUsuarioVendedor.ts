import { useState } from "react";
import { usuarioService } from "../../services/usuarioService";
import type {
  CreateUsuarioVendedorRequest,
  CreateUsuarioVendedorResponse,
} from "../types";

interface UseCreateUsuarioVendedorReturn {
  loading: boolean;
  error: string | null;
  success: boolean;
  usuarioCreado: CreateUsuarioVendedorResponse | null;
  createUsuario: (data: CreateUsuarioVendedorRequest) => Promise<void>;
  clearState: () => void;
}

export const useCreateUsuarioVendedor = (): UseCreateUsuarioVendedorReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [usuarioCreado, setUsuarioCreado] =
    useState<CreateUsuarioVendedorResponse | null>(null);

  const createUsuario = async (data: CreateUsuarioVendedorRequest) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setUsuarioCreado(null);

    try {
      const response = await usuarioService.createUsuarioVendedor(data);

      if (response.success && response.data) {
        setSuccess(true);
        setUsuarioCreado(response.data);
      } else {
        setError(response.message || "Error al crear el usuario vendedor");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error inesperado";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearState = () => {
    setError(null);
    setSuccess(false);
    setUsuarioCreado(null);
    setLoading(false);
  };

  return {
    loading,
    error,
    success,
    usuarioCreado,
    createUsuario,
    clearState,
  };
};
