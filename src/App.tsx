import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { CategoriasPage } from "./pages/CategoriasPage";
import { ListarCategoriasPage } from "./pages/ListarCategoriasPage";
import { UbicacionesPage } from "./pages/UbicacionesPage";
import { BuscarUbicacionesPage } from "./pages/BuscarUbicacionesPage";
import { ProtectedRoute } from "./components/atoms/ProtectedRoute";
import { ROUTES } from "./shared/constants";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        {/* Protected Routes */}
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />{" "}
        {/* HU#2 - List Categories (All Roles) */}
        <Route
          path={ROUTES.CATEGORIES}
          element={
            <ProtectedRoute>
              <ListarCategoriasPage />
            </ProtectedRoute>
          }
        />
        {/* HU#4 - Search Locations (All Roles) */}
        <Route
          path={ROUTES.SEARCH_LOCATIONS}
          element={
            <ProtectedRoute>
              <BuscarUbicacionesPage />
            </ProtectedRoute>
          }
        />
        {/* Admin Routes - HU#1 */}
        <Route
          path={ROUTES.ADMIN_CATEGORIES}
          element={
            <ProtectedRoute requiredRoles={["admin"]}>
              <CategoriasPage />
            </ProtectedRoute>
          }
        />{" "}
        {/* Admin Routes - HU#3 */}
        <Route
          path={ROUTES.ADMIN_LOCATIONS}
          element={
            <ProtectedRoute requiredRoles={["admin"]}>
              <UbicacionesPage />
            </ProtectedRoute>
          }
        />
        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
