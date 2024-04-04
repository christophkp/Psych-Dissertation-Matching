import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (username, password) => {
    const response = await axios.post(
      "http://localhost:3001/auth/login",
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
    );
    setUser(response.data.userData);
  };

  const logout = async () => {
    await axios.get("http://localhost:3001/auth/logout", {
      withCredentials: true,
    });
    setUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
