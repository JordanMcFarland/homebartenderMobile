import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import MainNavigator from "../navigators/MainNavigator";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import { AirtableContext } from "../providers/AirtableProvider";

const Main = () => {
  const { cocktailsLoading, ingredientsLoading } = useContext(AirtableContext);
  const { loading, setLoading, login } = useContext(AuthContext);

  // Check if we have stored user info and login
  useEffect(() => {
    const getStoredUser = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync("user");
        const parsedUser = await JSON.parse(storedUser);
        if (storedUser) {
          await login(parsedUser);
        }
        setLoading(false);
      } catch (err) {
        alert(err);
      }
    };

    getStoredUser();
  }, []);

  if (loading || cocktailsLoading || ingredientsLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#262626",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#262626" }}>
        <MainNavigator />
      </SafeAreaView>
    );
  }
};

export default Main;
