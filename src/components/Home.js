import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Dimensions,
  ScrollView,
} from "react-native";
import { Button } from "@rneui/base/dist/Button";
import { AuthContext } from "../providers/AuthProvider";
import g from "../styles/styles";
import * as SecureStore from "expo-secure-store";
import DraggableView from "../shared/DraggableView";
import { AirtableContext } from "../providers/AirtableProvider";
import { Card } from "@rneui/base";

const Home = () => {
  const [randomStockCocktail, setRandomStockCocktail] = useState({});
  const [userMostRecentCocktail, setUserMostRecentCocktail] = useState({});

  const { user } = useContext(AuthContext);
  const { cocktails, cocktailLoading } = useContext(AirtableContext);

  useEffect(() => {
    const randomCocktail = getRandomStockCocktail();
    setRandomStockCocktail(randomCocktail);
    if (user) {
      const userCocktail = getUserMostRecentCocktail();
      setUserMostRecentCocktail(userCocktail);
    }
  }, [user]);
  // DRAGGABLE EXPERIMENT //
  // const [draggableArray, setDraggableArray] = useState([
  //   "blue",
  //   "yellow",
  //   "red",
  // ]);
  // const renderDraggableArray = draggableArray.map((color, index) => {
  //   return <DraggableView key={index} color={color} />;
  // });

  const getRandomStockCocktail = () => {
    const randNum = Math.floor(Math.random() * cocktails.length);
    return cocktails[randNum];
  };

  // Use the date?
  const getUserMostRecentCocktail = () => {
    const recentUserCocktail =
      user.userCocktails[user.userCocktails.length - 1];
    return recentUserCocktail;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>
        {user && `Hello, ${user.username}!`}
      </Text>
      <ScrollView
        contentContainerStyle={styles.recommendationContainer}
        style={{ marginTop: 8 }}
      >
        <View style={styles.insideRecommendationContainer}>
          <Text style={styles.text}>Why not try this cocktail today?</Text>
          <Card containerStyle={styles.card}>
            <Card.Title style={styles.cardTitle}>
              {randomStockCocktail.name}
            </Card.Title>
            <Card.Divider />
            <Text style={styles.cardSubheaderText}>Ingredients:</Text>
            <View style={{ marginTop: 8 }}>
              {randomStockCocktail.requiredIngredients?.map(
                (ingredient, index) => {
                  return (
                    <Text style={styles.cardText} key={index}>
                      - {ingredient}
                    </Text>
                  );
                }
              )}
            </View>
            <Text style={styles.cardSubheaderText}>Recipe:</Text>
            <Text style={{ ...styles.cardText, marginTop: 8 }}>
              {randomStockCocktail.recipe}
            </Text>
          </Card>
        </View>
        {userMostRecentCocktail && user ? (
          <View style={styles.insideRecommendationContainer}>
            <Text style={styles.text}>Your most recent creation.</Text>
            <Card containerStyle={styles.card}>
              <Card.Title style={styles.cardTitle}>
                {userMostRecentCocktail.name}
              </Card.Title>
              <Card.Divider />
              <Text style={styles.cardSubheaderText}>Ingredients:</Text>
              <View style={{ marginTop: 8 }}>
                {userMostRecentCocktail.requiredIngredients?.map(
                  (ingredient, index) => {
                    const ingredientString =
                      `- ${ingredient.amount} ${ingredient.unit} ${ingredient.name}`.replace(
                        /  +/g,
                        " "
                      );
                    return (
                      <Text style={styles.cardText} key={index}>
                        {ingredientString}
                      </Text>
                    );
                  }
                )}
              </View>
              <Text style={styles.cardSubheaderText}>Recipe:</Text>
              <Text style={{ ...styles.cardText, marginTop: 8 }}>
                {userMostRecentCocktail.recipe}
              </Text>
            </Card>
          </View>
        ) : (
          <></>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: g.colors.background,
  },
  greetingText: {
    color: g.colors.primary,
    fontSize: 32,
    marginLeft: "auto",
    paddingRight: 16,
    paddingTop: 16,
  },
  recommendationContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingBottom: 16,
  },
  insideRecommendationContainer: {
    flexDirection: "column",
    marginTop: 16,
    marginHorizontal: 16,
    alignItems: "center",
  },
  text: {
    color: g.colors.secondary,
    fontSize: 24,
    marginHorizontal: 8,
  },
  card: {
    borderRadius: 8,
    marginHorizontal: 16,
    backgroundColor: g.colors.primary,
    borderColor: g.colors.secondary,
    width: 276,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 24,
  },
  cardSubheaderText: {
    fontSize: 20,
    marginTop: 8,
  },
  cardText: {
    fontSize: 16,
  },
});

export default Home;
