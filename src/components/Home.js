import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, ToastAndroid } from "react-native";
import { Button } from "@rneui/base/dist/Button";
import { AuthContext } from "../providers/AuthProvider";
import * as SecureStore from "expo-secure-store";
import DraggableView from "../shared/DraggableView";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [draggableArray, setDraggableArray] = useState([
    "blue",
    "yellow",
    "red",
  ]);

  const getToken = async () => {
    const token = await SecureStore.getItemAsync("token");
    console.log(token);
  };

  const renderDraggableArray = draggableArray.map((color, index) => {
    return <DraggableView key={index} color={color} />;
  });

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>
        {user ? `Hello, ${user.username}!` : "Home Bartender"}
      </Text>
      <Button onPress={() => ToastAndroid.show("A Toast!", ToastAndroid.LONG)}>
        Press
      </Button> */}
      {renderDraggableArray}
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
