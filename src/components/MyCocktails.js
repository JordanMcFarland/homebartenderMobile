import { Link } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { Text, ScrollView, StyleSheet } from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import { Card } from "@rneui/base/dist/Card";

const MyCocktails = () => {
  const { user } = useContext(AuthContext);

  const myCocktailDirectory = user.userCocktails.map((cocktail) => (
    <Card key={cocktail._id} containerStyle={styles.card}>
      <Link to={{ screen: "MyCocktailInfo", params: cocktail._id }}>
        <Text style={styles.text}>{cocktail.name}</Text>
      </Link>
    </Card>
  ));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
    >
      {myCocktailDirectory}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#262626",
  },
  contentContainerStyle: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "#B70D29",
    borderColor: "#505050",
    borderRadius: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MyCocktails;
