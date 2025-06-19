import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layout } from "../components/templates/Layout";
import { Modal } from "../components/atoms/Modal";
import { ConfirmDialog } from "../components/molecules/ConfirmDialog";
import { WarningModal } from "../components/molecules/WarningModal";
import {
  useCreateUsuarioVendedor,
  useUsuariosVendedores,
} from "../shared/hooks";
import {
  createUsuarioVendedorSchema,
  type CreateUsuarioVendedorFormData,
} from "../shared/validations/usuarioSchemas";
import type { User } from "../shared/types";

export const UsuariosVendedoresPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  // Estados para la fecha de nacimiento con dropdowns
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(""); // Calcular fechas límite para el calendario
  const today = new Date();
  const currentYear = today.getFullYear();
  const minYear = 1950; // Año mínimo más razonable
  const maxYear = currentYear - 18; // Hace 18 años
  // Generar arrays para los dropdowns con mejor UX
  const generateYearsWithSeparators = () => {
    const yearsList = [];
    const totalYears = maxYear - minYear + 1;

    // Añadir información de rango al inicio
    yearsList.push({
      value: "info",
      label: `📅 ${maxYear} - ${minYear} (18+ años)`,
      disabled: true,
    });

    // Generar años del más reciente al más antiguo
    for (let i = 0; i < totalYears; i++) {
      const year = maxYear - i;

      // Añadir separador cada 10 años para mejor navegación
      if (year % 10 === 0 && year !== maxYear) {
        yearsList.push({
          value: `separator-${year}`,
          label: `--- Años ${year}s ---`,
          disabled: true,
        });
      }

      // Añadir etiquetas especiales para ciertos rangos
      let label = year.toString();
      if (year >= maxYear - 5) {
        label = `${year} (${currentYear - year} años)`;
      } else if (year >= maxYear - 20) {
        label = `${year} (${currentYear - year} años)`;
      }

      yearsList.push({ value: year.toString(), label, disabled: false });
    }

    return yearsList;
  };

  const years = generateYearsWithSeparators();
  const months = [
    { value: "01", label: "Enero" },
    { value: "02", label: "Febrero" },
    { value: "03", label: "Marzo" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Mayo" },
    { value: "06", label: "Junio" },
    { value: "07", label: "Julio" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
  ];

  // Generar días dinámicamente según el mes y año seleccionados
  const getDaysInMonth = (month: string, year: string) => {
    if (!month || !year) {
      return Array.from({ length: 31 }, (_, i) =>
        String(i + 1).padStart(2, "0")
      );
    }

    const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) =>
      String(i + 1).padStart(2, "0")
    );
  };

  const days = getDaysInMonth(selectedMonth, selectedYear);

  const {
    loading: creating,
    error: createError,
    success: createSuccess,
    usuarioCreado,
    createUsuario,
    clearState: clearCreateState,
  } = useCreateUsuarioVendedor();

  const {
    usuarios,
    loading: fetchingUsuarios,
    error: fetchError,
    pagination,
    fetchUsuarios,
    deleteUsuario,
    refreshUsuarios,
  } = useUsuariosVendedores();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<CreateUsuarioVendedorFormData>({
    resolver: zodResolver(createUsuarioVendedorSchema),
  });

  const watchedPassword = watch("clave", "");
  // Función para actualizar la fecha de nacimiento en el formulario
  const updateFechaNacimiento = (day: string, month: string, year: string) => {
    if (day && month && year) {
      const fechaISO = `${year}-${month}-${day}`;
      setValue("fechaNacimiento", fechaISO);
    } else {
      setValue("fechaNacimiento", "");
    }
  };

  // Función para validar y ajustar el día cuando cambie el mes o año
  const validateAndAdjustDay = (day: string, month: string, year: string) => {
    if (day && month && year) {
      const daysInSelectedMonth = new Date(
        parseInt(year),
        parseInt(month),
        0
      ).getDate();
      const dayNum = parseInt(day);

      if (dayNum > daysInSelectedMonth) {
        // Si el día es inválido para el mes/año, ajustar al último día válido
        const adjustedDay = String(daysInSelectedMonth).padStart(2, "0");
        setSelectedDay(adjustedDay);
        updateFechaNacimiento(adjustedDay, month, year);
      } else {
        updateFechaNacimiento(day, month, year);
      }
    } else {
      updateFechaNacimiento(day, month, year);
    }
  };

  // Función para limpiar la fecha cuando se cierre el modal
  const clearDateSelectors = () => {
    setSelectedDay("");
    setSelectedMonth("");
    setSelectedYear("");
  };
  const onSubmit = async (data: CreateUsuarioVendedorFormData) => {
    await createUsuario(data);
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      await deleteUsuario(userToDelete.id);
      setUserToDelete(null);
    }
  };

  const handlePageChange = (page: number) => {
    fetchUsuarios(page, pagination.limit);
  };

  // Calcular fortaleza de contraseña
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(watchedPassword);
  const strengthLabels = [
    "Muy débil",
    "Débil",
    "Regular",
    "Buena",
    "Excelente",
  ];
  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ]; // Efectos para mostrar modales según estado
  useEffect(() => {
    if (createSuccess && usuarioCreado) {
      reset();
      clearDateSelectors();
      clearCreateState();
      setIsCreateModalOpen(false);
      refreshUsuarios();
    }
  }, [createSuccess, usuarioCreado, reset, clearCreateState, refreshUsuarios]);

  useEffect(() => {
    if (createError) {
      setWarningMessage(createError);
      setShowWarning(true);
    }
  }, [createError]);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pb-8">
        {/* Header */}
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h1 className="text-2xl font-medium text-gray-900 mb-2">
                Gestión de Usuarios Vendedores
              </h1>
              <p className="text-gray-600">
                Crea y administra las cuentas de vendedores en la plataforma
              </p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-4 sm:mt-0 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <i className="fas fa-plus"></i>
              Crear Usuario Vendedor
            </button>
          </div>
        </div>
        {/* Users Table */}
        <div className="px-4 sm:px-6 lg:px-8 pb-8">
          {fetchError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              <div className="flex items-center">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                {fetchError}
              </div>
            </div>
          )}

          {/* Desktop Table */}
          <div className="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre Completo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Documento
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Correo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Celular
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha Nacimiento
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fetchingUsuarios ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center">
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                          <span className="ml-2 text-gray-500">
                            Cargando usuarios...
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : usuarios.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        No hay usuarios vendedores registrados
                      </td>
                    </tr>
                  ) : (
                    usuarios.map((usuario) => (
                      <tr
                        key={usuario.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {usuario.nombre} {usuario.apellido}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {usuario.id}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {usuario.documentoIdentidad}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {usuario.correo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {usuario.celular}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(usuario.fechaNacimiento).toLocaleDateString(
                            "es-CO"
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => setUserToDelete(usuario)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                            title="Eliminar usuario"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {fetchingUsuarios ? (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-gray-500">
                    Cargando usuarios...
                  </span>
                </div>
              </div>
            ) : usuarios.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
                No hay usuarios vendedores registrados
              </div>
            ) : (
              usuarios.map((usuario) => (
                <div
                  key={usuario.id}
                  className="bg-white rounded-lg shadow-sm p-5 border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {usuario.nombre} {usuario.apellido}
                      </h3>
                      <p className="text-sm text-gray-600">ID: {usuario.id}</p>
                    </div>
                    <button
                      onClick={() => setUserToDelete(usuario)}
                      className="text-red-600 hover:text-red-900 transition-colors p-2"
                      title="Eliminar usuario"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Documento:
                      </span>
                      <span className="text-sm text-gray-600">
                        {usuario.documentoIdentidad}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Correo:
                      </span>
                      <span className="text-sm text-gray-600">
                        {usuario.correo}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Celular:
                      </span>
                      <span className="text-sm text-gray-600">
                        {usuario.celular}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Nacimiento:
                      </span>
                      <span className="text-sm text-gray-600">
                        {new Date(usuario.fechaNacimiento).toLocaleDateString(
                          "es-CO"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex space-x-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1 || fetchingUsuarios}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>

                {/* Page Numbers */}
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    return (
                      page === 1 ||
                      page === pagination.totalPages ||
                      Math.abs(page - pagination.page) <= 1
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
                          disabled={fetchingUsuarios}
                          className={`px-3 py-2 text-sm font-medium rounded-md disabled:cursor-not-allowed ${
                            page === pagination.page
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
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={
                    pagination.page === pagination.totalPages ||
                    fetchingUsuarios
                  }
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              </nav>
            </div>
          )}
        </div>
        {/* Create User Modal */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false);
            reset();
            clearCreateState();
          }}
          title="Crear Usuario Vendedor"
          size="lg"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Nombre y Apellido */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nombre"
                  {...register("nombre")}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.nombre ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Ingresa el nombre"
                />
                {errors.nombre && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.nombre.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="apellido"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Apellido <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="apellido"
                  {...register("apellido")}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.apellido ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Ingresa el apellido"
                />
                {errors.apellido && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.apellido.message}
                  </p>
                )}
              </div>
            </div>

            {/* Documento y Celular */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="documentoIdentidad"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Documento de Identidad <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="documentoIdentidad"
                  {...register("documentoIdentidad")}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.documentoIdentidad
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                  placeholder="1234567890"
                />
                {errors.documentoIdentidad && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.documentoIdentidad.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="celular"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Celular <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="celular"
                  {...register("celular")}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.celular ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="+573005698325"
                />
                {errors.celular && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.celular.message}
                  </p>
                )}
              </div>
            </div>

            {/* Fecha de Nacimiento y Correo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="fechaNacimiento"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Fecha de Nacimiento <span className="text-red-500">*</span>{" "}
                </label>
                {/* Custom Date Dropdowns */}
                <div className="grid grid-cols-3 gap-2">
                  {/* Día */}
                  <div>
                    <select
                      value={selectedDay}
                      onChange={(e) => {
                        setSelectedDay(e.target.value);
                        updateFechaNacimiento(
                          e.target.value,
                          selectedMonth,
                          selectedYear
                        );
                      }}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.fechaNacimiento
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Día</option>
                      {days.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Mes */}
                  <div>
                    <select
                      value={selectedMonth}
                      onChange={(e) => {
                        setSelectedMonth(e.target.value);
                        validateAndAdjustDay(
                          selectedDay,
                          e.target.value,
                          selectedYear
                        );
                      }}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.fechaNacimiento
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Mes</option>
                      {months.map((month) => (
                        <option key={month.value} value={month.value}>
                          {month.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Año */}
                  <div>
                    <select
                      value={selectedYear}
                      onChange={(e) => {
                        setSelectedYear(e.target.value);
                        validateAndAdjustDay(
                          selectedDay,
                          selectedMonth,
                          e.target.value
                        );
                      }}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.fechaNacimiento
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Año</option>
                      {years.map((yearItem) => (
                        <option
                          key={yearItem.value}
                          value={yearItem.disabled ? "" : yearItem.value}
                          disabled={yearItem.disabled}
                          className={
                            yearItem.disabled
                              ? "font-medium text-gray-400 bg-gray-50"
                              : ""
                          }
                        >
                          {yearItem.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>{" "}
                {/* Hidden input para react-hook-form */}
                <input type="hidden" {...register("fechaNacimiento")} />
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-gray-500">
                    💡 <strong>Tip:</strong> Los años están ordenados de más
                    reciente a más antiguo para facilitar la selección
                  </p>
                  <p className="text-xs text-gray-500">
                    📅 El usuario debe ser mayor de 18 años (nacido antes del{" "}
                    {new Date(maxYear, 11, 31).toLocaleDateString("es-CO")})
                  </p>
                </div>
                {errors.fechaNacimiento && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.fechaNacimiento.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="correo"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Correo Electrónico <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="correo"
                  {...register("correo")}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.correo ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="vendedor@hogar360.com"
                />
                {errors.correo && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.correo.message}
                  </p>
                )}
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label
                htmlFor="clave"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Contraseña <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="clave"
                  {...register("clave")}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.clave ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Mínimo 8 caracteres, mayúscula, minúscula y número"
                />
              </div>

              {/* Password Strength Indicator */}
              {watchedPassword && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500">
                      Fortaleza de contraseña:
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        passwordStrength <= 1
                          ? "text-red-500"
                          : passwordStrength <= 2
                          ? "text-orange-500"
                          : passwordStrength <= 3
                          ? "text-yellow-500"
                          : passwordStrength <= 4
                          ? "text-blue-500"
                          : "text-green-500"
                      }`}
                    >
                      {strengthLabels[Math.max(0, passwordStrength - 1)]}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        strengthColors[Math.max(0, passwordStrength - 1)]
                      }`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {errors.clave && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.clave.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  reset();
                  clearCreateState();
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={creating}
                className={`px-6 py-2 rounded-lg text-white font-medium transition-colors ${
                  creating
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {creating ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creando...
                  </div>
                ) : (
                  "Crear Usuario"
                )}
              </button>
            </div>
          </form>
        </Modal>
        {/* Warning Modal */}
        <WarningModal
          isOpen={showWarning}
          onClose={() => setShowWarning(false)}
          title="Error al crear usuario"
          message={warningMessage}
        />{" "}
        {/* Confirm Delete Modal */}
        <ConfirmDialog
          isOpen={!!userToDelete}
          onClose={() => setUserToDelete(null)}
          onConfirm={handleDeleteUser}
          title="Eliminar Usuario Vendedor"
          message={`¿Estás seguro de que deseas eliminar al usuario "${userToDelete?.nombre} ${userToDelete?.apellido}"? Esta acción no se puede deshacer.`}
          confirmText="Eliminar"
        />
      </div>
    </Layout>
  );
};
