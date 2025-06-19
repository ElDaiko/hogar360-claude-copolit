import { useAuth } from "../../../shared/hooks/useAuth";
import { ROUTES } from "../../../shared/constants";
import { SidebarItem } from "../../atoms/SidebarItem";

interface SidebarNavigationProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

interface MenuItem {
  to: string;
  icon: string;
  label: string;
}

export const SidebarNavigation = ({
  isCollapsed = false,
  onToggle,
}: SidebarNavigationProps) => {
  const { user, hasRole } = useAuth();
  // Menu items based on user role
  const getMenuItems = (): MenuItem[] => {
    if (!user) return [];    const commonItems: MenuItem[] = [
      {
        to: ROUTES.DASHBOARD,
        icon: "fas fa-home",
        label: "Dashboard",
      },
      {
        to: ROUTES.BUSCAR_CASAS,
        icon: "fas fa-search",
        label: "Buscar Casas",
      },
      {
        to: ROUTES.CATEGORIES,
        icon: "fas fa-tags",
        label: "Ver Categorías",
      },
      {
        to: ROUTES.SEARCH_LOCATIONS,
        icon: "fas fa-search-location",
        label: "Buscar Ubicaciones",
      },
    ];
    const adminItems: MenuItem[] = [
      {
        to: ROUTES.ADMIN_CATEGORIES,
        icon: "fas fa-cog",
        label: "Gestionar Categorías",
      },
      {
        to: ROUTES.ADMIN_LOCATIONS,
        icon: "fas fa-map-marker-alt",
        label: "Ubicaciones",
      },
      {
        to: ROUTES.ADMIN_VENDEDORES,
        icon: "fas fa-user-tie",
        label: "Usuarios Vendedores",
      },
      {
        to: ROUTES.PROPERTIES,
        icon: "fas fa-building",
        label: "Propiedades",
      },
    ];
    const vendedorItems: MenuItem[] = [
      {
        to: ROUTES.VENDEDOR_CASAS,
        icon: "fas fa-building",
        label: "Mis Propiedades",
      },
      {
        to: ROUTES.VENDEDOR_PUBLICAR_CASA,
        icon: "fas fa-plus-circle",
        label: "Publicar Casa",
      },
      {
        to: ROUTES.VISITS,
        icon: "fas fa-calendar",
        label: "Horarios",
      },
    ];

    const compradorItems: MenuItem[] = [
      {
        to: ROUTES.PROPERTIES,
        icon: "fas fa-search",
        label: "Buscar Propiedades",
      },
      {
        to: ROUTES.VISITS,
        icon: "fas fa-calendar-check",
        label: "Mis Visitas",
      },
    ];

    let menuItems: MenuItem[] = [...commonItems];

    if (hasRole("admin")) {
      menuItems = [...menuItems, ...adminItems];
    } else if (hasRole("vendedor")) {
      menuItems = [...menuItems, ...vendedorItems];
    } else if (hasRole("comprador")) {
      menuItems = [...menuItems, ...compradorItems];
    }

    return menuItems;
  };

  const menuItems = getMenuItems();
  return (
    <div
      className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } h-full`}
    >
      {/* Toggle Button - At the top, subtle */}
      <div className="p-3 border-b border-gray-100">
        <button
          onClick={onToggle}
          className="w-full p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
          title={isCollapsed ? "Expandir sidebar" : "Contraer sidebar"}
        >
          <i
            className={`fas ${
              isCollapsed ? "fa-chevron-right" : "fa-chevron-left"
            } text-gray-400 text-sm`}
          ></i>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 pt-5 space-y-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={isCollapsed ? "" : item.label}
          />
        ))}
      </nav>
    </div>
  );
};
