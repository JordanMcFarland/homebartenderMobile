import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

function CocktailDirectoryComponent() {
  return (
    <View style={styles.container}>
      <Text>Here are the cocktails!</Text>
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

export default CocktailDirectoryComponent;
