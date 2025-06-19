import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../shared/hooks/useAuth";
import { useCreateCategoria } from "../shared/hooks/useCreateCategoria";
import { categoriaService } from "../services/categoriaService";
import { Layout } from "../components/templates/Layout";
import { ConfirmDialog } from "../components/molecules/ConfirmDialog";
import {
  createCategoriaSchema,
  type CreateCategoriaForm,
} from "../shared/validations/categoriaSchemas";
import type { CategoriaInmueble } from "../shared/types";

export const CategoriasPage = () => {
  const { user } = useAuth();
  const { createCategoria, loading, error, success, clearMessages } =
    useCreateCategoria();
  const [categorias, setCategorias] = useState<CategoriaInmueble[]>([]);
  const [loadingCategorias, setLoadingCategorias] = useState(false);
  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] =
    useState<CategoriaInmueble | null>(null);
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
  } = useForm<CreateCategoriaForm>({
    resolver: zodResolver(createCategoriaSchema),
  });

  // Watch descripcion for character count
  const descripcion = watch("descripcion", "");

  // Load existing categories
  useEffect(() => {
    const loadCategorias = async () => {
      setLoadingCategorias(true);
      try {
        const response = await categoriaService.getCategorias();
        if (response.success && response.data) {
          setCategorias(response.data);
        }
      } catch {
        // Handle error silently
      } finally {
        setLoadingCategorias(false);
      }
    };

    loadCategorias();
  }, []);

  // Clear messages when component mounts
  useEffect(() => {
    clearMessages();
  }, [clearMessages]);
  const handleCreateCategoria = async (data: CreateCategoriaForm) => {
    const success = await createCategoria(data);
    if (success) {
      reset();
      // Reload categories
      const response = await categoriaService.getCategorias();
      if (response.success && response.data) {
        setCategorias(response.data);
      }
    } else if (error) {
      // Check if error is about duplicate name
      if (
        error.toLowerCase().includes("nombre") &&
        (error.toLowerCase().includes("repetir") ||
          error.toLowerCase().includes("existe") ||
          error.toLowerCase().includes("duplicado"))
      ) {
        setShowDuplicateModal(true);
      } else {
        // Show error modal for other server validation errors
        setErrorMessage(error);
        setShowErrorModal(true);
      }
      clearMessages(); // Clear the error from the hook
    }
  };

  // Handle delete category
  const handleDeleteClick = (categoria: CategoriaInmueble) => {
    setCategoryToDelete(categoria);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;

    setDeleteLoading(true);
    try {
      const response = await categoriaService.deleteCategoria(
        categoryToDelete.id
      );
      if (response.success) {
        // Reload categories
        const categoriesResponse = await categoriaService.getCategorias();
        if (categoriesResponse.success && categoriesResponse.data) {
          setCategorias(categoriesResponse.data);
        }
        setShowDeleteModal(false);
        setCategoryToDelete(null);
      } else {
        setErrorMessage(response.message || "Error al eliminar la categoría");
        setShowErrorModal(true);
      }
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Error al eliminar la categoría";
      setErrorMessage(errorMsg);
      setShowErrorModal(true);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
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
              Solo los administradores pueden gestionar categorías de inmuebles.
            </p>
          </div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-normal text-gray-800">
            Crear Categoría
          </h1>
        </div>
        {/* Create Category Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form
            onSubmit={handleSubmit(handleCreateCategoria)}
            className="space-y-6"
          >
            {" "}
            {/* Success Message */}
            {success && (
              <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                <div className="flex items-center">
                  <i className="fas fa-check-circle mr-2"></i>
                  {success}
                </div>
              </div>
            )}
            {/* Nombre Field */}
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-normal text-gray-700 mb-1"
              >
                Nombre de la Categoría <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nombre"
                {...register("nombre")}
                className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 ${
                  errors.nombre ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Escribe el nombre de la categoría (máximo 50 caracteres)"
                maxLength={50}
                disabled={loading}
              />
              {errors.nombre && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <i className="fas fa-exclamation-triangle mr-1"></i>
                  {errors.nombre.message}
                </p>
              )}
            </div>
            {/* Descripción Field */}
            <div>
              <label
                htmlFor="descripcion"
                className="block text-sm font-normal text-gray-700 mb-1"
              >
                Descripción <span className="text-red-500">*</span>
              </label>
              <div>
                <textarea
                  id="descripcion"
                  rows={4}
                  {...register("descripcion")}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder-gray-400 ${
                    errors.descripcion ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Enter category description"
                  maxLength={90}
                  disabled={loading}
                />
                <div className="flex justify-end mt-1 text-sm text-gray-500">
                  <span>{descripcion?.length || 0}</span>
                  <span>/90</span>
                </div>
              </div>
              {errors.descripcion && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <i className="fas fa-exclamation-triangle mr-1"></i>
                  {errors.descripcion.message}
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
                {loading ? "Creando..." : "Crear"}
              </button>
            </div>
          </form>
        </div>
        {/* Existing Categories Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">
            Categorías existentes
          </h2>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loadingCategorias ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <span className="ml-2 text-gray-500">
                          Cargando categorías...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : categorias.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No hay categorías registradas
                    </td>
                  </tr>
                ) : (
                  categorias.map((categoria, index) => (
                    <tr
                      key={categoria.id}
                      className={index > 0 ? "border-t border-gray-200" : ""}
                    >
                      <td className="px-6 py-4 text-sm text-gray-500">
                        #CAT-{String(categoria.id).padStart(7, "0")}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {categoria.nombre}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {categoria.descripcion}
                      </td>{" "}
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteClick(categoria)}
                          className="text-red-600 hover:text-red-700 transition-colors"
                          title="Eliminar categoría"
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

          {/* Pagination */}
          <div className="flex justify-center space-x-1">
            <button className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium">
              1
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
              2
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
              3
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
              4
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-2 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
              <i className="fas fa-chevron-right text-gray-400"></i>
            </button>{" "}
          </div>
        </div>
        {/* Delete Confirmation Modal */}
        <ConfirmDialog
          isOpen={showDeleteModal}
          onClose={handleModalClose}
          onConfirm={handleDeleteConfirm}
          title="Eliminar Categoría"
          message={`¿Estás seguro de que deseas eliminar la categoría "${categoryToDelete?.nombre}"? Esta acción no se puede deshacer.`}
          confirmText="Eliminar"
          cancelText="Cancelar"
          type="danger"
          loading={deleteLoading}
        />{" "}
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
        {/* Duplicate Name Modal */}
        <ConfirmDialog
          isOpen={showDuplicateModal}
          onClose={handleDuplicateModalClose}
          onConfirm={handleDuplicateModalClose}
          title="Nombre Duplicado"
          message="Ya existe una categoría con este nombre. Por favor, elige un nombre diferente para la categoría."
          confirmText="Entendido"
          type="warning"
        />
      </div>
    </Layout>
  );
};
