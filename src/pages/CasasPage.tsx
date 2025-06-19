import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/templates/Layout";
import { ConfirmDialog } from "../components/molecules/ConfirmDialog";
import { WarningModal } from "../components/molecules/WarningModal";
import { useCasas } from "../shared/hooks";
import type { Casa, EstadoPublicacion } from "../shared/types";
import { ROUTES } from "../shared/constants";

export const CasasPage = () => {
  const [casaToDelete, setCasaToDelete] = useState<Casa | null>(null);
  const [casaToChangeStatus, setCasaToChangeStatus] = useState<{
    casa: Casa;
    newStatus: EstadoPublicacion;
  } | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const {
    casas,
    loading: fetchingCasas,
    error: fetchError,
    pagination,
    fetchCasas,
    deleteCasa,
    updateEstadoCasa,
  } = useCasas();

  // Mostrar errores cuando fallan las operaciones
  useEffect(() => {
    if (fetchError) {
      setWarningMessage(fetchError);
      setShowWarning(true);
    }
  }, [fetchError]);

  const handlePageChange = (page: number) => {
    fetchCasas(page);
  };

  const handleDeleteCasa = async () => {
    if (casaToDelete) {
      await deleteCasa(casaToDelete.id);
      setCasaToDelete(null);
    }
  };

  const handleChangeStatus = async () => {
    if (casaToChangeStatus) {
      await updateEstadoCasa(
        casaToChangeStatus.casa.id,
        casaToChangeStatus.newStatus
      );
      setCasaToChangeStatus(null);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: EstadoPublicacion) => {
    switch (status) {
      case "PUBLICADA":
        return "bg-green-100 text-green-800";
      case "PUBLICACION_PAUSADA":
        return "bg-yellow-100 text-yellow-800";
      case "TRANSACCION_CURSO":
        return "bg-blue-100 text-blue-800";
      case "TRANSACCION_FINALIZADA":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: EstadoPublicacion) => {
    switch (status) {
      case "PUBLICADA":
        return "Publicada";
      case "PUBLICACION_PAUSADA":
        return "Pausada";
      case "TRANSACCION_CURSO":
        return "En Transacción";
      case "TRANSACCION_FINALIZADA":
        return "Finalizada";
      default:
        return status;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pb-8">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Mis Propiedades
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  Gestiona tus propiedades publicadas
                </p>
              </div>
              <Link
                to={ROUTES.VENDEDOR_PUBLICAR_CASA}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
              >
                <i className="fas fa-plus mr-2"></i>
                Publicar Nueva Casa
              </Link>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {fetchError && (
          <div className="px-4 sm:px-6 lg:px-8 pt-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <i className="fas fa-exclamation-circle text-red-400"></i>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Error al cargar las propiedades
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{fetchError}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Properties List */}
        <div className="px-4 sm:px-6 lg:px-8 pt-8">
          {fetchingCasas ? (
            <div className="text-center py-12">
              <i className="fas fa-spinner fa-spin text-4xl text-gray-400 mb-4"></i>
              <p className="text-gray-600">Cargando propiedades...</p>
            </div>
          ) : casas && casas.length > 0 ? (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Propiedad
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ubicación
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Precio
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {casas.map((casa) => (
                      <tr key={casa.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {casa.nombre}
                            </div>
                            <div className="text-sm text-gray-500">
                              {casa.categoriaInmueble.nombre} •{" "}
                              {casa.cantidadCuartos} cuartos •{" "}
                              {casa.cantidadBanos} baños
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {casa.ubicacion.ciudad}, {casa.ubicacion.departamento}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {formatPrice(casa.precio)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              casa.estadoPublicacion
                            )}`}
                          >
                            {getStatusText(casa.estadoPublicacion)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <div className="relative group">
                              <button className="text-gray-400 hover:text-gray-600">
                                <i className="fas fa-ellipsis-v"></i>
                              </button>
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                <div className="py-1">
                                  <button
                                    onClick={() =>
                                      setCasaToChangeStatus({
                                        casa,
                                        newStatus: "PUBLICACION_PAUSADA",
                                      })
                                    }
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    Pausar publicación
                                  </button>
                                  <button
                                    onClick={() =>
                                      setCasaToChangeStatus({
                                        casa,
                                        newStatus: "TRANSACCION_CURSO",
                                      })
                                    }
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    Marcar en transacción
                                  </button>
                                  <button
                                    onClick={() => setCasaToDelete(casa)}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {casas.map((casa) => (
                  <div
                    key={casa.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {casa.nombre}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {casa.categoriaInmueble.nombre}
                        </p>
                      </div>
                      <span
                        className={`ml-3 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          casa.estadoPublicacion
                        )}`}
                      >
                        {getStatusText(casa.estadoPublicacion)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
                      <div>
                        <i className="fas fa-map-marker-alt text-gray-400 mr-1"></i>
                        {casa.ubicacion.ciudad}
                      </div>
                      <div>
                        <i className="fas fa-bed text-gray-400 mr-1"></i>
                        {casa.cantidadCuartos} cuartos
                      </div>
                      <div>
                        <i className="fas fa-bath text-gray-400 mr-1"></i>
                        {casa.cantidadBanos} baños
                      </div>
                      <div className="font-medium text-gray-900">
                        {formatPrice(casa.precio)}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
                      <button
                        onClick={() =>
                          setCasaToChangeStatus({
                            casa,
                            newStatus: "PUBLICACION_PAUSADA",
                          })
                        }
                        className="px-3 py-1 text-xs text-yellow-700 bg-yellow-100 rounded-full hover:bg-yellow-200"
                      >
                        Pausar
                      </button>
                      <button
                        onClick={() => setCasaToDelete(casa)}
                        className="px-3 py-1 text-xs text-red-700 bg-red-100 rounded-full hover:bg-red-200"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                  <nav className="flex space-x-2">
                    {Array.from(
                      { length: pagination.totalPages },
                      (_, i) => i + 1
                    ).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg ${
                          pagination.page === page
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
              <i className="fas fa-home text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No tienes propiedades publicadas
              </h3>
              <p className="text-gray-600 mb-6">
                Comienza publicando tu primera propiedad para comenzar a recibir
                visitas.
              </p>
              <Link
                to={ROUTES.VENDEDOR_PUBLICAR_CASA}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <i className="fas fa-plus mr-2"></i>
                Publicar Primera Casa
              </Link>
            </div>
          )}
        </div>
      </div>{" "}
      {/* Delete Confirmation Dialog */}
      {casaToDelete && (
        <ConfirmDialog
          isOpen={!!casaToDelete}
          onClose={() => setCasaToDelete(null)}
          onConfirm={handleDeleteCasa}
          title="Eliminar Propiedad"
          message={`¿Estás seguro de que deseas eliminar la propiedad "${casaToDelete.nombre}"? Esta acción no se puede deshacer.`}
        />
      )}
      {/* Change Status Confirmation Dialog */}
      {casaToChangeStatus && (
        <ConfirmDialog
          isOpen={!!casaToChangeStatus}
          onClose={() => setCasaToChangeStatus(null)}
          onConfirm={handleChangeStatus}
          title="Cambiar Estado"
          message={`¿Deseas cambiar el estado de "${
            casaToChangeStatus.casa.nombre
          }" a "${getStatusText(casaToChangeStatus.newStatus)}"?`}
        />
      )}{" "}
      {/* Warning Modal */}
      {showWarning && (
        <WarningModal
          isOpen={showWarning}
          onClose={() => {
            setShowWarning(false);
            setWarningMessage("");
          }}
          title="Error"
          message={warningMessage}
        />
      )}
    </Layout>
  );
};
