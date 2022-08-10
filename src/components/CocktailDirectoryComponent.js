import React, { useContext, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { AirtableContext } from "../providers/AirtableProvider";
import { fetchCocktails } from "../helpers/airtable";
import { AuthContext } from "../providers/AuthProvider";

const CocktailDirectoryComponent = () => {
  const { cocktails } = useContext(AirtableContext);
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  } else
    return (
      <View style={styles.container}>
        <Text>Here are the cocktails!</Text>
        <Text>{cocktails ? cocktails[0].name : ""}</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CocktailDirectoryComponent;
