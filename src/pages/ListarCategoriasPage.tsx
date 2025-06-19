import React from "react";
import { Layout } from "../components/templates/Layout";
import { Pagination } from "../components/atoms/Pagination";
import { Button } from "../components/atoms/Button";
import { useListarCategorias } from "../shared/hooks/useListarCategorias";
import type { CategoriaInmueble } from "../shared/types";

interface ListarCategoriasPageProps {
  onSelectCategoria?: (categoria: CategoriaInmueble) => void;
  showSelection?: boolean;
}

export const ListarCategoriasPage: React.FC<ListarCategoriasPageProps> = ({
  onSelectCategoria,
  showSelection = false,
}) => {
  const {
    categorias,
    loading,
    error,
    currentPage,
    totalPages,
    searchTerm,
    selectedCategoria,
    setPage,
    setSearchTerm,
    selectCategoria,
    clearError,
  } = useListarCategorias();

  const handleSelectCategoria = (categoria: CategoriaInmueble) => {
    selectCategoria(categoria);
    if (onSelectCategoria) {
      onSelectCategoria(categoria);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Layout>
      <div className="px-8 py-6 space-y-6">
        {/* Header */}
        <div className="px-8">
          <h1 className="text-2xl font-normal text-gray-800">
            Categorías de Inmuebles
          </h1>
          <p className="text-gray-600 mt-1">
            Explora y selecciona las categorías de propiedades disponibles
          </p>
        </div>

        {/* Search and Filters */}
        <div className="px-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <label
                  htmlFor="search"
                  className="block text-sm font-normal text-gray-700 mb-1"
                >
                  Buscar categorías
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-search text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    id="search"
                    placeholder="Buscar por nombre o descripción..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  />
                </div>
              </div>

              {searchTerm && (
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm("")}
                  className="whitespace-nowrap"
                >
                  <i className="fas fa-times mr-2"></i>
                  Limpiar búsqueda
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="px-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex">
                  <i className="fas fa-exclamation-triangle text-red-400 mr-2 mt-0.5"></i>
                  <p className="text-red-700">{error}</p>
                </div>
                <button
                  onClick={clearError}
                  className="text-red-400 hover:text-red-600 transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Selected Category Info */}
        {selectedCategoria && showSelection && (
          <div className="px-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <i className="fas fa-check-circle text-blue-500"></i>
                </div>
                <div className="flex-1">
                  <p className="text-blue-900 font-medium">
                    Categoría seleccionada: {selectedCategoria.nombre}
                  </p>
                  <p className="text-blue-700 text-sm mt-1">
                    {selectedCategoria.descripcion}
                  </p>
                  <div className="mt-2 text-xs text-blue-600">
                    ID: {selectedCategoria.id} • Creada:{" "}
                    {new Date(selectedCategoria.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <button
                  onClick={() => selectCategoria(null)}
                  className="text-blue-400 hover:text-blue-600 transition-colors"
                  title="Deseleccionar"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Categories Content */}
        <div className="px-8">
          <div className="bg-white rounded-lg shadow-sm">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">
                  Cargando categorías...
                </span>
              </div>
            ) : categorias.length === 0 ? (
              /* Empty State */
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-search text-gray-400 text-2xl"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No se encontraron categorías
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm ? (
                    <>
                      No hay categorías que coincidan con "
                      <strong>{searchTerm}</strong>".
                      <br />
                      Intenta con diferentes términos de búsqueda.
                    </>
                  ) : (
                    "No hay categorías disponibles en este momento"
                  )}
                </p>
              </div>
            ) : (
              /* Categories Grid */
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {categorias.map((categoria) => (
                    <div
                      key={categoria.id}
                      className={`relative bg-white rounded-lg border-2 transition-all duration-200 hover:shadow-md cursor-pointer group ${
                        selectedCategoria?.id === categoria.id
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleSelectCategoria(categoria)}
                    >
                      {/* Selection Indicator */}
                      {selectedCategoria?.id === categoria.id && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center z-10">
                          <i className="fas fa-check text-white text-xs"></i>
                        </div>
                      )}

                      <div className="p-6">
                        {/* Category Header */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <i className="fas fa-tag text-blue-600"></i>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {categoria.nombre}
                            </h3>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {categoria.descripcion}
                          </p>
                        </div>

                        {/* Category Info */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span className="flex items-center">
                              <i className="fas fa-hashtag mr-1"></i>
                              ID: {categoria.id}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                              <i className="fas fa-home mr-1"></i>
                              Inmueble
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span className="flex items-center">
                              <i className="fas fa-calendar mr-1"></i>
                              {new Date(
                                categoria.createdAt
                              ).toLocaleDateString()}
                            </span>
                          </div>

                          {/* Action Button */}
                          {showSelection && (
                            <div className="pt-3 border-t border-gray-100">
                              <Button
                                variant={
                                  selectedCategoria?.id === categoria.id
                                    ? "primary"
                                    : "outline"
                                }
                                size="sm"
                                className="w-full"
                                onClick={(e: React.MouseEvent) => {
                                  e.stopPropagation();
                                  handleSelectCategoria(categoria);
                                }}
                              >
                                {selectedCategoria?.id === categoria.id ? (
                                  <>
                                    <i className="fas fa-check mr-2"></i>
                                    Seleccionado
                                  </>
                                ) : (
                                  <>
                                    <i className="fas fa-plus mr-2"></i>
                                    Seleccionar
                                  </>
                                )}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-8">
            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
