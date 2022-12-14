import { Link } from "@react-navigation/native";
import { Card } from "@rneui/base";
import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { AirtableContext } from "../providers/AirtableProvider";
import { AuthContext } from "../providers/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import g from "../styles/styles";

const CraftableCocktails = () => {
  const { user } = useContext(AuthContext);
  const { cocktails } = useContext(AirtableContext);
  const [craftableCocktails, setCraftableCocktails] = useState([]);

  useEffect(() => {
    getCraftableList();
  }, [user]);

  function getCraftableList() {
    const regex = /[0-9]*\.*[0-9]* (ozs|oz|dashes|dash)|\([^)]*\)/g;
    const craftableCocktailList = [];
    const loaerCaseUserBar = [];
    const userBarIngredientCategories = Object.keys(user.userBar);

    // Convert ingredient names to lowercase
    userBarIngredientCategories.forEach((category) =>
      user.userBar[category].forEach((ingredient) => {
        loaerCaseUserBar.push(ingredient.name.toLowerCase());
      })
    );

    // Cycle through stock cocktails
    // Trim measurement from ingredient list and convert ingredient name to lowercase
    // Check if all ingredients are in my bar and if so, add to craftable list
    cocktails.forEach((cocktail) => {
      let trimmedIngredientList = cocktail.requiredIngredients.map(
        (ingredient) => ingredient.replace(regex, "").trim().toLowerCase()
      );
      if (
        trimmedIngredientList.every((ingredient) =>
          loaerCaseUserBar.includes(ingredient)
        )
      ) {
        craftableCocktailList.push(cocktail);
      }
    });

    // Cycle through user cocktails
    // Trim measurement from ingredient list and convert ingredient name to lowercase
    // Check if all ingredients are in my bar and if so, add to craftable list
    user.userCocktails.forEach((userCocktail) => {
      let trimmedIngredientList = userCocktail.requiredIngredients.map(
        (ingredient) => ingredient.name.replace(regex, "").trim().toLowerCase()
      );
      if (
        trimmedIngredientList.every((ingredient) =>
          loaerCaseUserBar.includes(ingredient)
        )
      ) {
        craftableCocktailList.push(userCocktail);
      }
    });

    // Sort cocktails by name
    craftableCocktailList.sort((a, b) => a.name > b.name);

    setCraftableCocktails(craftableCocktailList);
  }

  const renderCraftableCocktails = craftableCocktails.map((cocktail) => {
    return (
      <Card
        key={cocktail._id}
        containerStyle={[g.bg.primary, g.bdc.secondary, g.br3]}
      >
        {cocktail.userId && (
          <FontAwesomeIcon
            icon={faUser}
            style={{ position: "absolute", right: 0 }}
          />
        )}
        <Link
          to={{
            screen: cocktail.userId ? "My Cocktail Info" : "Cocktail Info",
            params: cocktail._id,
          }}
        >
          <Text style={[g.h5, { fontWeight: "bold" }]}>{cocktail.name}</Text>
        </Link>
      </Card>
    );
  });

  return (
    <View style={[g.bg.dark, { flex: 1 }]}>
      <ScrollView>{renderCraftableCocktails}</ScrollView>
    </View>
  );
};

export default CraftableCocktails;
