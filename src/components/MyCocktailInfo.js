import React, { useContext, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Vibration,
} from "react-native";
import { Card } from "@rneui/themed";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHeart,
  faTrashCan,
  faEdit,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "@react-navigation/native";

const MyCocktailInfo = ({ route, navigation }) => {
  // Temp state solution
  const [favorite, setFavorite] = useState(false);
  const { handleDeleteUserCocktail } = useContext(AuthContext);

  const cocktail = route.params;

  const onDeleteUserCocktail = async () => {
    try {
      await handleDeleteUserCocktail(cocktail);
      navigation.navigate("My Cocktails");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.FeaturedTitle style={styles.title}>
          {cocktail.name}
        </Card.FeaturedTitle>
        <Pressable
          onPress={() => {
            if (!favorite) {
              Vibration.vibrate(50);
            }
            setFavorite(!favorite);
          }}
          style={{ position: "absolute", right: 10, top: -5 }}
        >
          <FontAwesomeIcon
            icon={favorite ? faSolidHeart : faHeart}
            size={32}
            style={{
              color: "#262626",
            }}
          />
        </Pressable>
        <Link
          to={{ screen: "MyCocktailEditor", params: cocktail }}
          style={{ position: "absolute", right: 64, top: -5 }}
        >
          <FontAwesomeIcon
            icon={faEdit}
            size={32}
            style={{
              color: "#262626",
            }}
          />
        </Link>
        <Card.Divider />
        {cocktail.image && (
          <Image
            source={{ uri: cocktail.image }}
            style={{
              width: "75%",
              height: "50%",
              resizeMode: "cover",
              alignSelf: "center",
            }}
          />
        )}
        {cocktail.requiredIngredients.map((ingredient, index) => {
          const ingredientString =
            `- ${ingredient.amount} ${ingredient.unit} ${ingredient.name}`.replace(
              /  +/g,
              " "
            );
          return (
            <Text style={styles.text} key={index}>
              {ingredientString}
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

export default MyCocktailInfo;
