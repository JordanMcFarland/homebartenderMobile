import React, { useEffect, useState } from "react";
import { Alert, ToastAndroid } from "react-native";
import { loginUser, postCocktail } from "../helpers/homebartenderServer";
import * as SecureStore from "expo-secure-store";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Need to fix error handling
  const handlePostUserCocktail = async (newUserCocktail) => {
    try {
      const response = await postCocktail(newUserCocktail);
      Alert.alert(`${newUserCocktail.name} added to your list`);
      const userCocktails = response.userCocktails.sort((a, b) => {
        return a.name > b.name;
      });
      const userData = { ...user, userCocktails };
      setUser(userData);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: async (creds) => {
          try {
            const loggedUser = await loginUser(creds);
            if (loggedUser) {
              setUser(loggedUser);
              SecureStore.setItemAsync("user", JSON.stringify(creds));
            } else Alert.alert("Username and/or password do not match.");
          } catch (err) {
            console.error(err);
          }
        },
        logout: () => {
          SecureStore.deleteItemAsync("token");
          SecureStore.deleteItemAsync("user");
          setUser();
        },
        loading,
        setLoading,
        handlePostUserCocktail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
