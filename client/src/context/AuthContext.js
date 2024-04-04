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
    try {
      await axios.post("http://localhost:3001/auth/logout");
      //setUser(null);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
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
