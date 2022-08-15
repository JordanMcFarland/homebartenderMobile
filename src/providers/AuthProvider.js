import React, { useState } from "react";
import { Alert } from "react-native";
import { loginUser } from "../helpers/homebartenderServer";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <AuthContext.Provider
      value={{
        user,
        login: async (creds) => {
          console.log(creds);
          try {
            const loggedUser = await loginUser(creds);
            if (loggedUser) {
              setUser(loggedUser);
            } else Alert.alert("Username and/or password do not match.");
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
