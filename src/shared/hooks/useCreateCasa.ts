import { useState } from "react";
import { casaService } from "../../services";
import type { CreateCasaRequest, CreateCasaResponse } from "../types";

export const useCreateCasa = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [casaCreada, setCasaCreada] = useState<CreateCasaResponse | null>(null);

  const createCasa = async (data: CreateCasaRequest) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      setCasaCreada(null);

      const response = await casaService.createCasa(data);

      if (response.success && response.data) {
        setSuccess(true);
        setCasaCreada(response.data);
      } else {
        setError(response.message || "Error al crear la casa");
      }
    } catch (err) {
      console.error("Error in createCasa hook:", err);
      setError(
        "Error de conexión. Por favor, verifica tu conexión a internet."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearState = () => {
    setError(null);
    setSuccess(false);
    setCasaCreada(null);
  };

  return {
    loading,
    error,
    success,
    casaCreada,
    createCasa,
    clearState,
  };
};
