import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSearchUbicaciones } from "../shared/hooks/useSearchUbicaciones";
import { Layout } from "../components/templates/Layout";
import type { SearchUbicacionesRequest } from "../services/ubicacionService";

interface SearchForm {
  query: string;
  orderBy: "ciudad" | "departamento";
  orderDirection: "asc" | "desc";
}

export const BuscarUbicacionesPage = () => {
  const {
    ubicaciones,
    loading,
    error,
    searchQuery,
    totalResults,
    pagination,
    search,
  } = useSearchUbicaciones();
  const [currentPage, setCurrentPage] = useState(1);

  const { register, watch, reset } = useForm<SearchForm>({
    defaultValues: {
      query: "",
      orderBy: "ciudad",
      orderDirection: "asc",
    },
  });

  const watchedValues = watch();

  // Debounced search function to avoid too many API calls
  const debouncedSearch = useCallback(
    (searchParams: SearchUbicacionesRequest) => {
      const timer = setTimeout(() => {
        search(searchParams);
        setCurrentPage(1);
      }, 300); // 300ms delay

      return () => clearTimeout(timer);
    },
    [search]
  );

  // Effect to trigger search whenever form values change
  useEffect(() => {
    const searchParams: SearchUbicacionesRequest = {
      query: watchedValues.query,
      orderBy: watchedValues.orderBy,
      orderDirection: watchedValues.orderDirection,
      page: 1,
      limit: 10,
    };

    const cleanup = debouncedSearch(searchParams);
    return cleanup;
  }, [
    watchedValues.query,
    watchedValues.orderBy,
    watchedValues.orderDirection,
    debouncedSearch,
  ]);

  const handlePageChange = async (page: number) => {
    const searchParams: SearchUbicacionesRequest = {
      query: watchedValues.query,
      orderBy: watchedValues.orderBy,
      orderDirection: watchedValues.orderDirection,
      page,
      limit: 10,
    };

    await search(searchParams);
    setCurrentPage(page);
  };

  const handleClearSearch = () => {
    reset();
    search({});
    setCurrentPage(1);
  };
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pb-8">
        {/* Header */}
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-medium text-gray-900 mb-2">
            Buscar Ubicaciones
          </h1>
          <p className="text-gray-600">
            Encuentra ubicaciones por ciudad o departamento en tiempo real
          </p>
        </div>
        {/* Search Form */}
        <div className="px-4 sm:px-6 lg:px-8 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="space-y-4">
              {/* Search Input Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Search Query */}
                <div className="lg:col-span-1">
                  <label
                    htmlFor="query"
                    className="block text-sm font-normal text-gray-700 mb-2"
                  >
                    Buscar por ciudad o departamento
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="query"
                      {...register("query")}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-colors"
                      placeholder="Escribe aquí para buscar..."
                      disabled={loading}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-search text-gray-400"></i>
                    </div>
                    {loading && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order By */}
                <div>
                  <label
                    htmlFor="orderBy"
                    className="block text-sm font-normal text-gray-700 mb-2"
                  >
                    Ordenar por
                  </label>
                  <select
                    id="orderBy"
                    {...register("orderBy")}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    disabled={loading}
                  >
                    <option value="ciudad">Ciudad</option>
                    <option value="departamento">Departamento</option>
                  </select>
                </div>

                {/* Order Direction */}
                <div>
                  <label
                    htmlFor="orderDirection"
                    className="block text-sm font-normal text-gray-700 mb-2"
                  >
                    Orden
                  </label>
                  <select
                    id="orderDirection"
                    {...register("orderDirection")}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    disabled={loading}
                  >
                    <option value="asc">Ascendente (A-Z)</option>
                    <option value="desc">Descendente (Z-A)</option>
                  </select>
                </div>
              </div>

              {/* Clear Search Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={loading}
                >
                  <i className="fas fa-times mr-2"></i>
                  Limpiar búsqueda
                </button>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* Results Section */}
        <div className="px-4 sm:px-6 lg:px-8 pb-8">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Resultados de búsqueda
              </h2>
              {searchQuery && (
                <p className="text-sm text-gray-600 mt-1">
                  Búsqueda: "{searchQuery}" • {totalResults} resultado
                  {totalResults !== 1 ? "s" : ""}
                </p>
              )}
              {!searchQuery && totalResults > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  Mostrando todas las ubicaciones • {totalResults} resultado
                  {totalResults !== 1 ? "s" : ""}
                </p>
              )}
            </div>
            {/* Search status indicator */}
            {watchedValues.query && (
              <div className="flex items-center text-sm text-gray-500">
                <i className="fas fa-search mr-1"></i>
                Búsqueda en tiempo real
              </div>
            )}
          </div>
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              <div className="flex items-center">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                {error}
              </div>
            </div>
          )}{" "}
          {/* Results Table - Desktop */}
          <div className="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center">
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                          <span className="ml-2 text-gray-500">
                            Buscando ubicaciones...
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : ubicaciones.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        {searchQuery
                          ? `No se encontraron ubicaciones que coincidan con "${searchQuery}"`
                          : "No hay ubicaciones disponibles"}
                      </td>
                    </tr>
                  ) : (
                    ubicaciones.map((ubicacion) => (
                      <tr
                        key={ubicacion.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {ubicacion.ciudad}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {ubicacion.departamento}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                          <div className="line-clamp-2">
                            {ubicacion.descripcionCiudad}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                          <div className="line-clamp-2">
                            {ubicacion.descripcionDepartamento}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* Results Cards - Mobile */}
          <div className="lg:hidden space-y-4">
            {loading ? (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-gray-500">
                    Buscando ubicaciones...
                  </span>
                </div>
              </div>
            ) : ubicaciones.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
                {searchQuery
                  ? `No se encontraron ubicaciones que coincidan con "${searchQuery}"`
                  : "No hay ubicaciones disponibles"}
              </div>
            ) : (
              ubicaciones.map((ubicacion) => (
                <div
                  key={ubicacion.id}
                  className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {ubicacion.ciudad}
                      </h3>
                      <p className="text-sm font-medium text-gray-600">
                        {ubicacion.departamento}
                      </p>
                    </div>
                    <div className="text-right">
                      <i className="fas fa-map-marker-alt text-blue-500"></i>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">
                        Descripción de la Ciudad
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {ubicacion.descripcionCiudad}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">
                        Descripción del Departamento
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {ubicacion.descripcionDepartamento}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>{" "}
          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex space-x-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || loading}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>

                {/* Page Numbers */}
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    // Show first, last, current, and adjacent pages
                    return (
                      page === 1 ||
                      page === pagination.totalPages ||
                      Math.abs(page - currentPage) <= 1
                    );
                  })
                  .map((page, index, array) => {
                    const prevPage = array[index - 1];
                    const showEllipsis = prevPage && page - prevPage > 1;

                    return (
                      <div key={page} className="flex items-center">
                        {showEllipsis && (
                          <span className="px-2 text-gray-500">...</span>
                        )}
                        <button
                          onClick={() => handlePageChange(page)}
                          disabled={loading}
                          className={`px-3 py-2 text-sm font-medium rounded-md disabled:cursor-not-allowed ${
                            page === currentPage
                              ? "bg-blue-600 text-white"
                              : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      </div>
                    );
                  })}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pagination.totalPages || loading}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
