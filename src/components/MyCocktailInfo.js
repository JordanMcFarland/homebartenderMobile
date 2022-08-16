import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { Card } from "@rneui/themed";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";

const CocktailInfo = ({ route }) => {
  // Temp state solution
  const [favorite, setFavorite] = useState(false);

  const cocktail = route.params;

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.FeaturedTitle style={styles.title}>
          {cocktail.name}
        </Card.FeaturedTitle>
        <Pressable
          onLongPress={() => {
            setFavorite(!favorite);
          }}
          style={{ position: "absolute", right: 0, top: -5 }}
        >
          <FontAwesomeIcon
            icon={favorite ? faSolidHeart : faHeart}
            size={32}
            style={{
              color: "#262626",
            }}
          />
        </Pressable>
        <Card.Divider />
        <Image
          source={{ uri: cocktail.image }}
          style={{
            width: "75%",
            height: "50%",
            resizeMode: "cover",
            alignSelf: "center",
          }}
        />
        {cocktail.requiredIngredients.map((ingredient, index) => {
          return (
            <Text style={styles.text} key={index}>
              {ingredient}
            </Text>
          );
        })}
        <Text
          style={{
            ...styles.text,
            marginTop: 15,
            marginBottom: 10,
            fontWeight: "bold",
          }}
        >
          Recipe:
        </Text>
        <Text style={styles.text}>{cocktail.recipe}</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#262626",
  },
  card: {
    backgroundColor: "#B70D29",
    borderColor: "#505050",
    borderRadius: 15,
  },
  title: {
    alignSelf: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default CocktailInfo;