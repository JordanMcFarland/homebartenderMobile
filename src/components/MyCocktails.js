import { Link } from "@react-navigation/native";
import React, { useContext } from "react";
import { Text, ScrollView } from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import { Card } from "@rneui/base/dist/Card";
import g from "../styles/styles";

const MyCocktails = () => {
  const { user } = useContext(AuthContext);

  const myCocktailDirectory = user.userCocktails.map((cocktail) => (
    <Card
      key={cocktail._id}
      containerStyle={[g.bg.primary, g.bdc.secondary, g.br3]}
    >
      <Link to={{ screen: "MyCocktailInfo", params: cocktail._id }}>
        <Text style={[g.h5, { fontWeight: "bold" }]}>{cocktail.name}</Text>
      </Link>
    </Card>
  ));

  return (
    <ScrollView style={[g.bg.dark, { flex: 1 }]} contentContainerStyle={g.pb3}>
      {myCocktailDirectory}
    </ScrollView>
  );
};

export default MyCocktails;
