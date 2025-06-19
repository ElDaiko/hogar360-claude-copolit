import { useAuth } from "../shared/hooks/useAuth";
import { Layout } from "../components/templates/Layout";

export const DashboardPage = () => {
  const { user } = useAuth();
  const getDashboardCards = () => {
    switch (user?.rol) {
      case "admin":
        return [
          {
            title: "Propiedades",
            value: "1,247",
            icon: "fas fa-building",
            description: "Total de propiedades registradas",
            trend: "+12%",
          },
          {
            title: "Usuarios",
            value: "328",
            icon: "fas fa-users",
            description: "Usuarios activos en la plataforma",
            trend: "+8%",
          },
          {
            title: "Ventas del Mes",
            value: "$2.4M",
            icon: "fas fa-chart-line",
            description: "Ingresos generados este mes",
            trend: "+15%",
          },
          {
            title: "Visitas Programadas",
            value: "89",
            icon: "fas fa-calendar-check",
            description: "Visitas agendadas para esta semana",
            trend: "+5%",
          },
        ];
      case "vendedor":
        return [
          {
            title: "Mis Propiedades",
            value: "23",
            icon: "fas fa-home",
            description: "Propiedades bajo mi gestión",
            trend: "+3",
          },
          {
            title: "Visitas Hoy",
            value: "5",
            icon: "fas fa-calendar-day",
            description: "Visitas programadas para hoy",
            trend: "2 completadas",
          },
          {
            title: "Leads Activos",
            value: "12",
            icon: "fas fa-user-friends",
            description: "Clientes potenciales en seguimiento",
            trend: "+4 nuevos",
          },
          {
            title: "Comisiones",
            value: "$12,850",
            icon: "fas fa-dollar-sign",
            description: "Comisiones del mes actual",
            trend: "+18%",
          },
        ];
      default:
        return [
          {
            title: "Propiedades Guardadas",
            value: "8",
            icon: "fas fa-heart",
            description: "Propiedades en tu lista de favoritos",
            trend: "+2 nuevas",
          },
          {
            title: "Búsquedas Guardadas",
            value: "3",
            icon: "fas fa-search",
            description: "Alertas de búsqueda configuradas",
            trend: "12 nuevas coincidencias",
          },
          {
            title: "Visitas Agendadas",
            value: "2",
            icon: "fas fa-calendar-alt",
            description: "Próximas visitas programadas",
            trend: "1 mañana",
          },
          {
            title: "Mensajes",
            value: "4",
            icon: "fas fa-envelope",
            description: "Mensajes pendientes de respuesta",
            trend: "2 no leídos",
          },
        ];
    }
  };
  const cards = getDashboardCards();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            ¡Bienvenido, {user?.nombre}!
          </h1>
          <p className="text-gray-600">
            Has iniciado sesión exitosamente como{" "}
            <span className="capitalize font-medium">{user?.rol}</span>. Aquí
            puedes gestionar todas las funcionalidades de la plataforma.
          </p>
        </div>
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className={`${card.icon} text-blue-600`}></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      {card.title}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900">
                      {card.value}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{card.description}</p>
              <div className="flex items-center text-sm">
                <span className="text-green-600 font-medium">{card.trend}</span>
                <span className="text-gray-500 ml-1">
                  desde el período anterior
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* Quick Actions */}{" "}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Acciones Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {user?.rol === "admin" && (
              <>
                <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-users text-blue-600"></i>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">
                      Gestionar Usuarios
                    </p>
                    <p className="text-sm text-gray-500">
                      Crear y administrar usuarios
                    </p>
                  </div>
                </button>
                <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-building text-blue-600"></i>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Ver Propiedades</p>
                    <p className="text-sm text-gray-500">
                      Administrar todas las propiedades
                    </p>
                  </div>
                </button>
                <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-chart-bar text-blue-600"></i>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Ver Reportes</p>
                    <p className="text-sm text-gray-500">
                      Analytics y estadísticas
                    </p>
                  </div>
                </button>
              </>
            )}
            {user?.rol === "vendedor" && (
              <>
                <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-plus text-blue-600"></i>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Nueva Propiedad</p>
                    <p className="text-sm text-gray-500">
                      Publicar una nueva propiedad
                    </p>
                  </div>
                </button>
                <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-calendar text-blue-600"></i>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Mis Horarios</p>
                    <p className="text-sm text-gray-500">
                      Gestionar disponibilidad
                    </p>
                  </div>
                </button>
                <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-user-friends text-blue-600"></i>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Mis Clientes</p>
                    <p className="text-sm text-gray-500">
                      Ver leads y contactos
                    </p>
                  </div>
                </button>
              </>
            )}
            {user?.rol === "comprador" && (
              <>
                <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-search text-blue-600"></i>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">
                      Buscar Propiedades
                    </p>
                    <p className="text-sm text-gray-500">
                      Encuentra tu hogar ideal
                    </p>
                  </div>
                </button>
                <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-heart text-blue-600"></i>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Mis Favoritos</p>
                    <p className="text-sm text-gray-500">
                      Propiedades guardadas
                    </p>
                  </div>
                </button>
                <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-calendar-check text-blue-600"></i>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Mis Visitas</p>
                    <p className="text-sm text-gray-500">Visitas programadas</p>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
