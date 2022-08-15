import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../providers/AuthProvider";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {user ? `Hello, ${user.username}!` : "Home Bartender"}
      </Text>
    </View>
  );
}

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
