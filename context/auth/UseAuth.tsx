import { AuthContext } from "./AuthContext";
import { useContext } from "react";

export function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return auth;
}
