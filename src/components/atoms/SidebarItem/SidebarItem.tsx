import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
  to: string;
  icon: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const SidebarItem = ({
  to,
  icon,
  label,
  isActive,
  onClick,
}: SidebarItemProps) => {
  const location = useLocation();
  const isCurrentPath = isActive || location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
        isCurrentPath
          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <i
        className={`${icon} w-5 text-center mr-3 ${
          isCurrentPath ? "text-blue-700" : "text-gray-400"
        }`}
      ></i>
      <span>{label}</span>
    </Link>
  );
};
