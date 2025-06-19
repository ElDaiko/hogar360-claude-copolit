import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layout } from "../components/templates/Layout";
import { WarningModal } from "../components/molecules/WarningModal";
import {
  useCreateCasa,
  useListarCategorias,
  useUbicaciones,
} from "../shared/hooks";
import {
  createCasaSchema,
  type CreateCasaFormData,
} from "../shared/validations/casaSchemas";

export const PublicarCasaPage = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const {
    loading: creating,
    error: createError,
    success: createSuccess,
    casaCreada,
    createCasa,
    clearState: clearCreateState,
  } = useCreateCasa();

  const { categorias, loading: loadingCategorias } = useListarCategorias();
  const { ubicaciones, loading: loadingUbicaciones } = useUbicaciones();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CreateCasaFormData>({
    resolver: zodResolver(createCasaSchema),
    defaultValues: {
      estadoPublicacion: "PUBLICADA",
      cantidadCuartos: 1,
      cantidadBanos: 1,
    },
  });

  const watchedPrice = watch("precio", 0);

  const onSubmit = async (data: CreateCasaFormData) => {
    await createCasa(data);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 1);
    return maxDate.toISOString().split("T")[0];
  };

  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  // Clear states when success changes
  React.useEffect(() => {
    if (createSuccess && casaCreada) {
      const timer = setTimeout(() => {
        clearCreateState();
        reset();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [createSuccess, casaCreada, clearCreateState, reset]);

  // Show error modal when there's an error
  React.useEffect(() => {
    if (createError) {
      setWarningMessage(createError);
      setShowWarning(true);
    }
  }, [createError]);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pb-8">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Publicar Nueva Casa
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Complete el formulario para publicar una nueva propiedad
            </p>
          </div>
        </div>

        {/* Success Message */}
        {createSuccess && casaCreada && (
          <div className="px-4 sm:px-6 lg:px-8 pt-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <i className="fas fa-check-circle text-green-400"></i>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    ¡Casa publicada exitosamente!
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      La casa "{casaCreada.nombre}" ha sido publicada
                      correctamente.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de la propiedad
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("nombre")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: Casa de lujo en zona exclusiva"
                  />
                  {errors.nombre && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.nombre.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      {...register("descripcion")}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Describa las características principales de la propiedad..."
                    />
                  </div>
                  {errors.descripcion && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.descripcion.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    {...register("categoriaInmuebleId")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={loadingCategorias}
                  >
                    <option value="">Seleccionar categoría...</option>
                    {categorias?.map((categoria) => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.categoriaInmuebleId && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.categoriaInmuebleId.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ubicación
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    {...register("ubicacionId")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={loadingUbicaciones}
                  >
                    <option value="">Seleccionar ubicación...</option>
                    {ubicaciones?.map((ubicacion) => (
                      <option key={ubicacion.id} value={ubicacion.id}>
                        {ubicacion.ciudad}, {ubicacion.departamento}
                      </option>
                    ))}
                  </select>
                  {errors.ubicacionId && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.ubicacionId.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cantidad de cuartos
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    {...register("cantidadCuartos", { valueAsNumber: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.cantidadCuartos && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.cantidadCuartos.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cantidad de baños
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    {...register("cantidadBanos", { valueAsNumber: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.cantidadBanos && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.cantidadBanos.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Price and Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio (COP)
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    min="100000"
                    step="100000"
                    {...register("precio", { valueAsNumber: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="500000000"
                  />
                  {errors.precio && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.precio.message}
                    </p>
                  )}
                  {watchedPrice > 0 && (
                    <p className="mt-1 text-sm text-gray-600">
                      Precio: {formatPrice(watchedPrice)}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Área (m²) <span className="text-gray-400">(Opcional)</span>
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="10000"
                    {...register("area", { valueAsNumber: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="120"
                  />
                  {errors.area && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.area.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Publication Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de publicación activa
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="date"
                    min={getTodayDate()}
                    max={getMaxDate()}
                    {...register("fechaPublicacionActiva")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.fechaPublicacionActiva && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.fechaPublicacionActiva.message}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    La fecha debe estar entre hoy y un mes desde ahora
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado de publicación
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    {...register("estadoPublicacion")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="PUBLICADA">Publicada</option>
                    <option value="PUBLICACION_PAUSADA">
                      Publicación Pausada
                    </option>
                    <option value="TRANSACCION_CURSO">
                      Transacción en Curso
                    </option>
                    <option value="TRANSACCION_FINALIZADA">
                      Transacción Finalizada
                    </option>
                  </select>
                  {errors.estadoPublicacion && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.estadoPublicacion.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={creating}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {creating ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Publicando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-plus mr-2"></i>
                      Publicar Casa
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Warning Modal */}
      {showWarning && (
        <WarningModal
          isOpen={showWarning}
          onClose={() => {
            setShowWarning(false);
            clearCreateState();
          }}
          title="Error al publicar casa"
          message={warningMessage}
        />
      )}
    </Layout>
  );
};
