import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);


  const loadUser = useCallback(async (token) => {
    try {
      const response = await axios.get("http://localhost:8080/api/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error loading user:", error);
      logout();
    } finally {
      setLoadingAuth(false);
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = sessionStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadUser(storedToken);
      } else {
        setLoadingAuth(false);
      }
    };
    
    initializeAuth();
  }, [loadUser]);


  const login = async (username, password) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Error during authentication");
      }

      const data = await response.json();
      sessionStorage.setItem("token", data.token);
      setToken(data.token);
      await loadUser(data.token); 
      
    } catch (error) {
      console.error("Login error:", error);
      throw error; 
    }
  };

  const logout = useCallback(() => {
    sessionStorage.removeItem("token");
    setUser(null);
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        login, 
        logout,
        loadingAuth 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};