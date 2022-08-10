import React, { useState } from "react";
import { loginUser } from "../helpers/homebartenderServer";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <AuthContext.Provider
      value={{
        user,
        login: async (
          creds = { username: "allgonewrong", password: "password" }
        ) => {
          try {
            const loggedUser = await loginUser(creds);
            setUser(loggedUser);
          } catch (err) {
            console.error(err);
          }
        },
        logout: () => setUser(),
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
