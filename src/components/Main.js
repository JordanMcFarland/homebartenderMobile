import React, { useContext, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import MainNavigator from "../navigators/MainNavigator";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";

const Main = () => {
  const { login } = useContext(AuthContext);
  const { loading, setLoading } = useContext(AuthContext);

  // Check if we have stored user info and login
  useEffect(() => {
    const getStoredUser = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync("user");
        console.log(JSON.parse(storedUser));
        const parsedUser = await JSON.parse(storedUser);
        if (storedUser) {
          await login(parsedUser);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getStoredUser();
  }, []);

  if (loading) {
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
