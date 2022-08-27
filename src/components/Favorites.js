import { Link } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import { AirtableContext } from "../providers/AirtableProvider";
import { Card } from "@rneui/base/dist/Card";

const Favorites = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { cocktails } = useContext(AirtableContext);

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const populatedFavorites = [];
    user.userFavorites.forEach((fav) => {
      if (fav.userId) {
        user.userCocktails.forEach((userCocktail) => {
          if (userCocktail._id === fav._id)
            populatedFavorites.push(userCocktail);
        });
      } else {
        cocktails.forEach((stockCocktail) => {
          if (stockCocktail._id.toString() === fav._id)
            populatedFavorites.push(stockCocktail);
        });
      }
    });
    const sortedFavorites = populatedFavorites.sort((a, b) => a.name > b.name);
    setFavorites(sortedFavorites);
  }, [user]);

  const renderFavorites = favorites.map((fav) => {
    return (
      <Card key={fav._id} containerStyle={styles.card}>
        <Link
          to={
            fav.userId
              ? {
                  screen: "MyCocktailInfo",
                  params: fav,
                }
              : {
                  screen: "CocktailInfo",
                  params: fav,
                }
          }
        >
          <Text style={styles.text}>{fav.name}</Text>
        </Link>
      </Card>
    );
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
    >
      {renderFavorites}
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

export default Favorites;
