import React, { useContext, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { AirtableContext } from "../providers/AirtableProvider";
import { AuthContext } from "../providers/AuthProvider";
import { Card } from "@rneui/themed";

const CocktailInfoComponent = ({ route }) => {
  //const { cocktails } = useContext(AirtableContext);
  const cocktail = route.params;

  return (
    <View>
      <Card>
        <Text>{cocktail.name}</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CocktailInfoComponent;
