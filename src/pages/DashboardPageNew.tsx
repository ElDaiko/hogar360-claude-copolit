import { useAuth } from "../shared/hooks/useAuth";
import { Layout } from "../components/templates/Layout";

export const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Welcome Card */}
            <div className="col-span-1 md:col-span-3 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Bienvenido, {user?.nombre}!
              </h2>
              <p className="text-gray-600">
                Has iniciado sesión exitosamente como {user?.rol}. Aquí puedes
                gestionar todas las funcionalidades de la plataforma.
              </p>
            </div>

            {/* Role-specific Cards */}
            {user?.rol === "admin" && (
              <>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Categorías
                    </h3>
                    <i className="fas fa-tags text-blue-600 text-xl"></i>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Gestiona las categorías de inmuebles
                  </p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg">
                    Gestionar Categorías
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Ubicaciones
                    </h3>
                    <i className="fas fa-map-marker-alt text-blue-600 text-xl"></i>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Administra ciudades y departamentos
                  </p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg">
                    Gestionar Ubicaciones
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Usuarios
                    </h3>
                    <i className="fas fa-users text-blue-600 text-xl"></i>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Crea y gestiona usuarios vendedores
                  </p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg">
                    Gestionar Usuarios
                  </button>
                </div>
              </>
            )}

            {user?.rol === "vendedor" && (
              <>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Mis Propiedades
                    </h3>
                    <i className="fas fa-home text-blue-600 text-xl"></i>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Gestiona tus propiedades publicadas
                  </p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg">
                    Ver Propiedades
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Publicar Casa
                    </h3>
                    <i className="fas fa-plus text-blue-600 text-xl"></i>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Publica una nueva propiedad
                  </p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg">
                    Publicar
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Horarios
                    </h3>
                    <i className="fas fa-calendar text-blue-600 text-xl"></i>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Gestiona horarios de visitas
                  </p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg">
                    Gestionar Horarios
                  </button>
                </div>
              </>
            )}

            {user?.rol === "comprador" && (
              <>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Buscar Propiedades
                    </h3>
                    <i className="fas fa-search text-blue-600 text-xl"></i>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Encuentra tu hogar ideal
                  </p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg">
                    Buscar
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Mis Visitas
                    </h3>
                    <i className="fas fa-calendar-check text-blue-600 text-xl"></i>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Gestiona tus visitas agendadas
                  </p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg">
                    Ver Visitas
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Agendar Visita
                    </h3>
                    <i className="fas fa-plus text-blue-600 text-xl"></i>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Agenda una nueva visita
                  </p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg">
                    Agendar
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Session Info */}
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Información de Sesión
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Email:</span>
                <span className="ml-2 text-gray-600">{user?.correo}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Rol:</span>
                <span className="ml-2 text-gray-600 capitalize">
                  {user?.rol}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Documento:</span>
                <span className="ml-2 text-gray-600">
                  {user?.documentoIdentidad}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Celular:</span>
                <span className="ml-2 text-gray-600">{user?.celular}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
