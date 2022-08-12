import React, { useContext, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, ScrollView } from "react-native";
import { AirtableContext } from "../providers/AirtableProvider";
import { AuthContext } from "../providers/AuthProvider";
import { Card } from "@rneui/themed";
import { Link } from "@react-navigation/native";

const CocktailDirectoryComponent = ({ navigation }) => {
  const { cocktails } = useContext(AirtableContext);
  const { loading } = useContext(AuthContext);

  const cocktailDirectory = cocktails.map((cocktail) => (
    <Card key={cocktail._id} containerStyle={styles.card}>
      <Link to={{ screen: "CocktailInfo", params: cocktail }}>
        <Text style={styles.text}>{cocktail.name}</Text>
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
  } else
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
      >
        {cocktails ? cocktailDirectory : ""}
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#262626",
  },
  contentContainerStyle: {
    paddingBottom: 15,
  },
  card: {
    backgroundColor: "#B70D29",
    borderColor: "#505050",
    borderRadius: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CocktailDirectoryComponent;
