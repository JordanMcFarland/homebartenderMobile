import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@rneui/base";

function HomeComponent({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home Bartender!</Text>
      <Button
        onPress={() => {
          navigation.navigate("Cocktails");
        }}
      >
        Go to cocktails
      </Button>
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
