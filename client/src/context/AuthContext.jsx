import { createContext, useContext, useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";

// @ts-ignore
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { getToken } = useAuth();
  const { user } = useUser();

  const logToken = async () => {
    try {
      const fetchedToken = await getToken();
      console.log(fetchedToken)
    } catch (err) {
      console.error("Error getting token:", err);
    }
  };

  useEffect(() => {
    if (user) {
      logToken();
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);