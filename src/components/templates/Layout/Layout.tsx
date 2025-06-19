import { useState } from "react";
import { SidebarNavigation } from "../../organisms/SidebarNavigation";
import { useAuth } from "../../../shared/hooks/useAuth";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}{" "}
      {/* Top Header - Full Width */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-14">
        <div className="h-full px-3 flex items-center justify-between">
          {/* Left side - Logo and mobile menu */}
          <div className="flex items-center">
            <button
              onClick={toggleMobileSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden mr-2"
            >
              <i className="fas fa-bars text-gray-600"></i>
            </button>

            {/* Logo - Always visible */}
            <div className="flex items-center">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center mr-2">
                <i className="fas fa-home text-white text-xs"></i>
              </div>
              <h1 className="text-sm font-normal text-black">Hogar 360</h1>
            </div>
          </div>

          {/* Right side - User section */}
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 hidden sm:block">
              Bienvenido, {user?.nombre || "Admin"}
            </span>
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-white text-sm"></i>
                </div>
                <span className="text-sm font-medium text-gray-900 hidden md:block">
                  {user?.rol === "admin" ? "Admin" : user?.rol}
                </span>
                <i className="fas fa-chevron-down text-gray-400 text-xs hidden md:block"></i>
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <>
                  {/* Overlay to close menu when clicking outside */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.nombre} {user?.apellido}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {user?.rol}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
                    >
                      <i className="fas fa-sign-out-alt text-gray-400 mr-3"></i>
                      Cerrar sesión
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>{" "}
      {/* Layout Container */}
      <div className="pt-14 flex">
        {/* Sidebar */}
        <div
          className={`fixed top-14 inset-y-0 left-0 z-40 lg:relative lg:flex lg:flex-shrink-0 lg:top-0 transition-transform duration-300 ${
            isMobileSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <SidebarNavigation
            isCollapsed={isSidebarCollapsed}
            onToggle={toggleSidebar}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <main className="min-h-screen overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};
