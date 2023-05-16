import { useState, useEffect } from "react";
import authService from "../../services/authService";

export default function useAuth(): boolean | null {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    authService.isLoggedIn().then((res) => setIsAuthenticated(res));
  }, []);

  return isAuthenticated;
}
