import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/molecules/LoginForm";
import { useAuth } from "../shared/hooks/useAuth";
import { ROUTES } from "../shared/constants";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return <LoginForm />;
};
