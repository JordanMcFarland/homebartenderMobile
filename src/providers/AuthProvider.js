import React, { useEffect, useState } from "react";
import { Alert, ToastAndroid } from "react-native";
import {
  deleteUserCocktail,
  loginUser,
  postCocktail,
  updateUserCocktail,
  postUserFavorite,
  deleteUserFavorite,
} from "../helpers/homebartenderServer";
import * as SecureStore from "expo-secure-store";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Need to fix error handling
  const handlePostUserCocktail = async (newUserCocktail) => {
    const response = await postCocktail(newUserCocktail);
    ToastAndroid.show(
      `${newUserCocktail.name} has been added to your cocktail list`,
      ToastAndroid.SHORT
    );
    const userCocktails = response.userCocktails.sort((a, b) => {
      return a.name > b.name;
    });
    const userData = { ...user, userCocktails };
    setUser(userData);
  };

  const handleDeleteUserCocktail = async (userCocktail) => {
    let updatedUserCocktails = [];
    const response = await deleteUserCocktail(userCocktail._id);
    ToastAndroid.show(
      `${userCocktail.name} has been removed to your cocktail list`,
      ToastAndroid.SHORT
    );
    updatedUserCocktails = response.userCocktails.sort((a, b) => {
      return a.name > b.name;
    });

    const userData = { ...user, userCocktails: updatedUserCocktails };
    setUser(userData);
  };

  const handleUpdateUserCocktail = async (
    userCocktailId,
    editedUserCocktail
  ) => {
    let updatedUserCocktails = [];
    const response = await updateUserCocktail(
      userCocktailId,
      editedUserCocktail
    );
    console.log(response);
    ToastAndroid.show(
      `${editedUserCocktail.name} has been updated in your cocktail list`,
      ToastAndroid.SHORT
    );
    updatedUserCocktails = response.userCocktails.sort((a, b) => {
      return a.name > b.name;
    });

    const userData = { ...user, userCocktails: updatedUserCocktails };
    setUser(userData);
  };

  const handlePostUserFavorite = async (cocktailInfo) => {
    const response = await postUserFavorite(cocktailInfo);
    const userData = { ...user, userFavorites: response.userFavorites };
    setUser(userData);
  };

  const handleDeleteUserFavorite = async (cocktailInfo) => {
    const response = await deleteUserFavorite(cocktailInfo);
    const userData = { ...user, userFavorites: response.userFavorites };
    setUser(userData);
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
        handleDeleteUserCocktail,
        handleUpdateUserCocktail,
        handlePostUserFavorite,
        handleDeleteUserFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
