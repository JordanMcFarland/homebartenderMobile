import React, { useContext } from "react";
import { ActivityIndicator, Text, ScrollView } from "react-native";
import { AirtableContext } from "../providers/AirtableProvider";
import { AuthContext } from "../providers/AuthProvider";
import { Card } from "@rneui/themed";
import { Link } from "@react-navigation/native";
import g from "../styles/styles";

const CocktailDirectory = () => {
  const { cocktails } = useContext(AirtableContext);
  const { loading } = useContext(AuthContext);

  const cocktailDirectory = cocktails.map((cocktail) => (
    <Card
      key={cocktail._id}
      containerStyle={[g.bg.primary, g.bdc.secondary, g.br3]}
    >
      <Link to={{ screen: "CocktailInfo", params: cocktail._id }}>
        <Text style={[g.h5, { fontWeight: "bold" }]}>{cocktail.name}</Text>
      </Link>
    </Card>
  ));

  if (loading) {
    return (
      <View
        style={[
          g.bg.white,
          { flex: 1, alignItems: "center", justifyContent: "center" },
        ]}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  } else
    return (
      <ScrollView
        style={[g.bg.dark, { flex: 1 }]}
        contentContainerStyle={g.pb3}
      >
        {cocktails ? cocktailDirectory : ""}
      </ScrollView>
    );
};

export default CocktailDirectory;
