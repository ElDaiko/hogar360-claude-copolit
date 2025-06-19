import { useAuth } from "../../../shared/hooks/useAuth";

interface UserProfileProps {
  onLogout?: () => void;
  compact?: boolean;
}

export const UserProfile = ({
  onLogout,
  compact = false,
}: UserProfileProps) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    onLogout?.();
  };

  if (!user) return null;

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <i className="fas fa-user text-blue-600"></i>
        </div>
        {!compact && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.nombre} {user.apellido}
            </p>
            <p className="text-xs text-gray-500 capitalize truncate">
              {user.rol}
            </p>
          </div>
        )}
      </div>
      <button
        onClick={handleLogout}
        className="text-gray-400 hover:text-gray-600 transition-colors"
        title="Cerrar sesión"
      >
        <i className="fas fa-sign-out-alt"></i>
      </button>
    </div>
  );
};
