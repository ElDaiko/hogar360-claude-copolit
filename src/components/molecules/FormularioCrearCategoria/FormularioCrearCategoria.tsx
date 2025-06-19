import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCategoriaSchema,
  type CreateCategoriaForm,
} from "../../../shared/validations/categoriaSchemas";

interface FormularioCrearCategoriaProps {
  onSubmit: (data: CreateCategoriaForm) => Promise<void>;
  loading?: boolean;
  error?: string | null;
  success?: string | null;
}

export const FormularioCrearCategoria: React.FC<
  FormularioCrearCategoriaProps
> = ({ onSubmit, loading = false, error, success }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCategoriaForm>({
    resolver: zodResolver(createCategoriaSchema),
  });

  const handleFormSubmit = async (data: CreateCategoriaForm) => {
    await onSubmit(data);
    if (!error) {
      reset();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
          <i className="fas fa-tags text-blue-600"></i>
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          Crear Nueva Categoría de Inmueble
        </h2>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          <div className="flex items-center">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {error}
          </div>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg">
          <div className="flex items-center">
            <i className="fas fa-check-circle mr-2"></i>
            {success}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Nombre */}
        <div>
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nombre de la Categoría *
          </label>
          <input
            type="text"
            id="nombre"
            {...register("nombre")}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.nombre ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Ej: Apartamento, Casa, Penthouse..."
            maxLength={50}
            disabled={loading}
          />
          {errors.nombre && (
            <p className="text-red-600 text-sm mt-1 flex items-center">
              <i className="fas fa-exclamation-triangle mr-1"></i>
              {errors.nombre.message}
            </p>
          )}
          <p className="text-gray-500 text-xs mt-1">Máximo 50 caracteres</p>
        </div>

        {/* Descripción */}
        <div>
          <label
            htmlFor="descripcion"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Descripción *
          </label>
          <textarea
            id="descripcion"
            rows={3}
            {...register("descripcion")}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
              errors.descripcion ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Describe las características de esta categoría de inmueble..."
            maxLength={90}
            disabled={loading}
          />
          {errors.descripcion && (
            <p className="text-red-600 text-sm mt-1 flex items-center">
              <i className="fas fa-exclamation-triangle mr-1"></i>
              {errors.descripcion.message}
            </p>
          )}
          <p className="text-gray-500 text-xs mt-1">Máximo 90 caracteres</p>
        </div>

        {/* Botón Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading && (
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 inline"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {loading ? "Creando Categoría..." : "Crear Categoría"}
          </button>
        </div>
      </form>
    </div>
  );
};
