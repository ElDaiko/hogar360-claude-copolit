import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../shared/hooks/useAuth";
import { useCreateUbicacion } from "../shared/hooks/useCreateUbicacion";
import { ubicacionService } from "../services/ubicacionService";
import { Layout } from "../components/templates/Layout";
import { ConfirmDialog } from "../components/molecules/ConfirmDialog";
import { WarningModal } from "../components/molecules/WarningModal";
import {
  createUbicacionSchema,
  type CreateUbicacionForm,
} from "../shared/validations/ubicacionSchemas";
import type { Ubicacion } from "../shared/types";

export const UbicacionesPage = () => {
  const { user } = useAuth();
  const { createUbicacion, loading, error, success, clearMessages } =
    useCreateUbicacion();
  const [ubicaciones, setUbicaciones] = useState<Ubicacion[]>([]);
  const [loadingUbicaciones, setLoadingUbicaciones] = useState(false);

  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [ubicacionToDelete, setUbicacionToDelete] = useState<Ubicacion | null>(
    null
  );
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CreateUbicacionForm>({
    resolver: zodResolver(createUbicacionSchema),
  });

  // Watch descriptions for character count
  const descripcionCiudad = watch("descripcionCiudad", "");
  const descripcionDepartamento = watch("descripcionDepartamento", "");

  // Load existing locations
  useEffect(() => {
    const loadUbicaciones = async () => {
      setLoadingUbicaciones(true);
      try {
        const response = await ubicacionService.getUbicaciones(1, 50);
        if (response.success && response.data) {
          setUbicaciones(response.data.data);
        }
      } catch (err) {
        console.error("Error al cargar ubicaciones:", err);
      } finally {
        setLoadingUbicaciones(false);
      }
    };

    loadUbicaciones();
  }, []);

  // Handle form submission
  const handleCreateUbicacion = async (data: CreateUbicacionForm) => {
    try {
      await createUbicacion(data);

      // If successful, reload locations and reset form
      if (!error) {
        const response = await ubicacionService.getUbicaciones(1, 50);
        if (response.success && response.data) {
          setUbicaciones(response.data.data);
        }
        reset();
      }

      // Check if it's a duplicate department error
      if (error && error.toLowerCase().includes("ya existe")) {
        setShowDuplicateModal(true);
      } else if (error) {
        setErrorMessage(error);
        setShowErrorModal(true);
      }
      clearMessages();
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Error al crear la ubicación";
      setErrorMessage(errorMsg);
      setShowErrorModal(true);
      clearMessages();
    }
  };

  // Handle delete location
  const handleDeleteClick = (ubicacion: Ubicacion) => {
    setUbicacionToDelete(ubicacion);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!ubicacionToDelete) return;

    setDeleteLoading(true);
    try {
      const response = await ubicacionService.deleteUbicacion(
        ubicacionToDelete.id
      );
      if (response.success) {
        // Reload locations
        const ubicacionesResponse = await ubicacionService.getUbicaciones(
          1,
          50
        );
        if (ubicacionesResponse.success && ubicacionesResponse.data) {
          setUbicaciones(ubicacionesResponse.data.data);
        }
        setShowDeleteModal(false);
        setUbicacionToDelete(null);
      } else {
        setErrorMessage(response.message || "Error al eliminar la ubicación");
        setShowErrorModal(true);
      }
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Error al eliminar la ubicación";
      setErrorMessage(errorMsg);
      setShowErrorModal(true);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowDeleteModal(false);
    setUbicacionToDelete(null);
    setDeleteLoading(false);
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  const handleDuplicateModalClose = () => {
    setShowDuplicateModal(false);
  };

  // Only admin can access this page
  if (user?.rol !== "admin") {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-lock text-red-600 text-2xl"></i>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Acceso Denegado
            </h2>
            <p className="text-gray-600">
              Solo los administradores pueden gestionar ubicaciones.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-8 py-6 space-y-6">
        {/* Header */}
        <div className="px-8">
          <h1 className="text-2xl font-normal text-gray-800">
            Crear Ubicación
          </h1>
        </div>

        {/* Create Location Form */}
        <div className="px-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <form
              onSubmit={handleSubmit(handleCreateUbicacion)}
              className="space-y-6"
            >
              {/* Success Message */}
              {success && (
                <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                  <div className="flex items-center">
                    <i className="fas fa-check-circle mr-2"></i>
                    {success}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ciudad Field */}
                <div>
                  <label
                    htmlFor="ciudad"
                    className="block text-sm font-normal text-gray-700 mb-1"
                  >
                    Nombre de la Ciudad <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="ciudad"
                    {...register("ciudad")}
                    className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 ${
                      errors.ciudad ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Escribe el nombre de la ciudad (máximo 50 caracteres)"
                    maxLength={50}
                    disabled={loading}
                  />
                  {errors.ciudad && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <i className="fas fa-exclamation-triangle mr-1"></i>
                      {errors.ciudad.message}
                    </p>
                  )}
                </div>

                {/* Departamento Field */}
                <div>
                  <label
                    htmlFor="departamento"
                    className="block text-sm font-normal text-gray-700 mb-1"
                  >
                    Nombre del Departamento{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="departamento"
                    {...register("departamento")}
                    className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 ${
                      errors.departamento ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Escribe el nombre del departamento (máximo 50 caracteres)"
                    maxLength={50}
                    disabled={loading}
                  />
                  {errors.departamento && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <i className="fas fa-exclamation-triangle mr-1"></i>
                      {errors.departamento.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Descripción Ciudad Field */}
              <div>
                <label
                  htmlFor="descripcionCiudad"
                  className="block text-sm font-normal text-gray-700 mb-1"
                >
                  Descripción de la Ciudad{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div>
                  <textarea
                    id="descripcionCiudad"
                    rows={3}
                    {...register("descripcionCiudad")}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder-gray-400 ${
                      errors.descripcionCiudad
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    placeholder="Describe las características de la ciudad"
                    maxLength={120}
                    disabled={loading}
                  />
                  <div className="flex justify-end mt-1 text-sm text-gray-500">
                    <span>{descripcionCiudad?.length || 0}</span>
                    <span>/120</span>
                  </div>
                </div>
                {errors.descripcionCiudad && (
                  <p className="text-red-600 text-sm mt-1 flex items-center">
                    <i className="fas fa-exclamation-triangle mr-1"></i>
                    {errors.descripcionCiudad.message}
                  </p>
                )}
              </div>

              {/* Descripción Departamento Field */}
              <div>
                <label
                  htmlFor="descripcionDepartamento"
                  className="block text-sm font-normal text-gray-700 mb-1"
                >
                  Descripción del Departamento{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div>
                  <textarea
                    id="descripcionDepartamento"
                    rows={3}
                    {...register("descripcionDepartamento")}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder-gray-400 ${
                      errors.descripcionDepartamento
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    placeholder="Describe las características del departamento"
                    maxLength={120}
                    disabled={loading}
                  />
                  <div className="flex justify-end mt-1 text-sm text-gray-500">
                    <span>{descripcionDepartamento?.length || 0}</span>
                    <span>/120</span>
                  </div>
                </div>
                {errors.descripcionDepartamento && (
                  <p className="text-red-600 text-sm mt-1 flex items-center">
                    <i className="fas fa-exclamation-triangle mr-1"></i>
                    {errors.descripcionDepartamento.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-normal py-2 px-6 rounded-lg transition-colors"
                >
                  {loading ? "Creando..." : "Crear Ubicación"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Existing Locations Section */}
        <div className="px-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Ubicaciones existentes
          </h2>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ciudad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Departamento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción Ciudad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción Departamento
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loadingUbicaciones ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <span className="ml-2 text-gray-500">
                          Cargando ubicaciones...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : ubicaciones.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No hay ubicaciones registradas
                    </td>
                  </tr>
                ) : (
                  ubicaciones.map((ubicacion, index) => (
                    <tr
                      key={ubicacion.id}
                      className={index > 0 ? "border-t border-gray-200" : ""}
                    >
                      <td className="px-6 py-4 text-sm text-gray-500">
                        #UBI-{String(ubicacion.id).padStart(7, "0")}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {ubicacion.ciudad}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {ubicacion.departamento}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {ubicacion.descripcionCiudad}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {ubicacion.descripcionDepartamento}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteClick(ubicacion)}
                          className="text-red-600 hover:text-red-700 transition-colors"
                          title="Eliminar ubicación"
                        >
                          <i className="fas fa-trash text-sm"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <ConfirmDialog
          isOpen={showDeleteModal}
          onClose={handleModalClose}
          onConfirm={handleDeleteConfirm}
          title="Eliminar Ubicación"
          message={`¿Estás seguro de que deseas eliminar la ubicación "${ubicacionToDelete?.ciudad}, ${ubicacionToDelete?.departamento}"? Esta acción no se puede deshacer.`}
          confirmText="Eliminar"
          cancelText="Cancelar"
          type="danger"
          loading={deleteLoading}
        />

        {/* Error Modal */}
        <ConfirmDialog
          isOpen={showErrorModal}
          onClose={handleErrorModalClose}
          onConfirm={handleErrorModalClose}
          title="Error"
          message={errorMessage}
          confirmText="Entendido"
          cancelText="Cerrar"
          type="warning"
        />

        {/* Duplicate Department Modal */}
        <WarningModal
          isOpen={showDuplicateModal}
          onClose={handleDuplicateModalClose}
          title="⚠️ Departamento Duplicado"
          message="Ya existe una ubicación con este departamento. Por favor, elige un departamento diferente para crear una nueva ubicación."
          confirmText="Entendido"
        />
      </div>
    </Layout>
  );
};
