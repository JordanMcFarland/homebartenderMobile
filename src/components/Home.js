import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@rneui/base/dist/Button";
import { AuthContext } from "../providers/AuthProvider";
import * as SecureStore from "expo-secure-store";

const Home = () => {
  const { user } = useContext(AuthContext);

  const getToken = async () => {
    const token = await SecureStore.getItemAsync("token");
    console.log(token);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {user ? `Hello, ${user.username}!` : "Home Bartender"}
      </Text>
      <Button onPress={() => getToken()}>Press</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#262626",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "red",
  },
});

export default Home;
