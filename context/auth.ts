import React from "react";

export const AuthContext = React.createContext({
  isAuthenticated: false,
  setIsAuthenticated: (prev: boolean) => {},
});

export const useAuth = () => React.useContext(AuthContext);
