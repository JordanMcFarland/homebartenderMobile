import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../providers/AuthProvider";

function HomeComponent({ navigation }) {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>{user ? `Hello, ${user.username}!` : "Home Bartender"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeComponent;
