import React, { useContext, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, ScrollView } from "react-native";
import { AirtableContext } from "../providers/AirtableProvider";
import { AuthContext } from "../providers/AuthProvider";
import { Card } from "@rneui/themed";
import { Link } from "@react-navigation/native";

const CocktailDirectoryComponent = () => {
  const { cocktails } = useContext(AirtableContext);
  const { loading } = useContext(AuthContext);

  const cocktailDirectory = cocktails.map((cocktail) => (
    <Card key={cocktail._id}>
      <Link to={{ screen: "CocktailInfo", params: cocktail }}>
        <Text>{cocktail.name}</Text>
      </Link>
    </Card>
  ));

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
  } else return <ScrollView>{cocktails ? cocktailDirectory : ""}</ScrollView>;
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
