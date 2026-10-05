import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("busgo_token");
    const savedUser = localStorage.getItem("busgo_user");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to restore authentication:", error);
        localStorage.removeItem("busgo_token");
        localStorage.removeItem("busgo_user");
      }
    }
  }, []);

  const login = (userData, accessToken) => {
    localStorage.setItem("busgo_token", accessToken);
    localStorage.setItem("busgo_user", JSON.stringify(userData));

    setToken(accessToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("busgo_token");
    localStorage.removeItem("busgo_user");

    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token && user),
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

export default AuthProvider;