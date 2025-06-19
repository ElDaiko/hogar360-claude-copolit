import { useAuth } from "../../../shared/hooks/useAuth";
import { ROUTES } from "../../../shared/constants";
import { Logo } from "../../atoms/Logo";
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
    if (!user) return [];

    const commonItems: MenuItem[] = [
      {
        to: ROUTES.DASHBOARD,
        icon: "fas fa-home",
        label: "Dashboard",
      },
    ];

    const adminItems: MenuItem[] = [
      {
        to: ROUTES.ADMIN_CATEGORIES,
        icon: "fas fa-tags",
        label: "Categorías",
      },
      {
        to: ROUTES.ADMIN_LOCATIONS,
        icon: "fas fa-map-marker-alt",
        label: "Ubicaciones",
      },
      {
        to: ROUTES.ADMIN_USERS,
        icon: "fas fa-users",
        label: "Usuarios",
      },
      {
        to: ROUTES.PROPERTIES,
        icon: "fas fa-building",
        label: "Propiedades",
      },
    ];

    const vendedorItems: MenuItem[] = [
      {
        to: ROUTES.PROPERTIES,
        icon: "fas fa-building",
        label: "Mis Propiedades",
      },
      {
        to: ROUTES.PROPERTY_CREATE,
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
      }`}
    >
      {" "}
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <Logo size="md" showText={!isCollapsed} />
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title={isCollapsed ? "Expandir sidebar" : "Contraer sidebar"}
          >
            <i
              className={`fas ${
                isCollapsed ? "fa-chevron-right" : "fa-chevron-left"
              } text-gray-600`}
            ></i>
          </button>
        </div>
      </div>
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
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
