import React, { useContext, useEffect, useState } from "react";
import { Pressable, Text, View, Image, Vibration } from "react-native";
import { Card } from "@rneui/themed";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart, faEdit } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "@react-navigation/native";
import g from "../styles/styles";

const MyCocktailInfo = ({ route }) => {
  const [favorite, setFavorite] = useState(false);
  const [cocktail, setCocktail] = useState({});
  const { user, handlePostUserFavorite, handleDeleteUserFavorite } =
    useContext(AuthContext);

  useEffect(() => {
    getCocktail();
  }, [user]);

  const getCocktail = () => {
    const cocktailId = route.params;
    const currentCocktail = user.userCocktails.filter(
      (userCocktail) => userCocktail._id === cocktailId
    )[0];

    setCocktail(currentCocktail);

    const isFavorite = user.userFavorites.some(
      (fav) => fav._id === currentCocktail?._id
    );
    setFavorite(isFavorite);
  };

  const toggleFavorite = () => {
    try {
      if (
        user.userFavorites.some((favorite) => favorite._id === cocktail._id)
      ) {
        handleDeleteUserFavorite({
          _id: cocktail._id,
          userId: cocktail.userId,
        });
      } else
        handlePostUserFavorite({ _id: cocktail._id, userId: cocktail.userId });
    } catch (err) {
      alert(err);
    }
  };

  return (
    cocktail && (
      <View style={[g.bg.dark, { flex: 1 }]}>
        <Card containerStyle={[g.bg.primary, g.bdc.secondary, g.br3]}>
          <Card.FeaturedTitle style={[g.mb2, { alignSelf: "center" }]}>
            {cocktail.name}
          </Card.FeaturedTitle>
          <Pressable
            onPress={() => {
              if (!favorite) {
                Vibration.vibrate(50);
              }
              toggleFavorite();
            }}
            style={{ position: "absolute", right: 8, top: -4 }}
          >
            <FontAwesomeIcon
              icon={favorite ? faSolidHeart : faHeart}
              size={32}
              style={g.dark}
            />
          </Pressable>
          <Link
            to={{ screen: "MyCocktailEditor", params: cocktail }}
            style={{ position: "absolute", right: 64, top: -8 }}
          >
            <FontAwesomeIcon icon={faEdit} size={32} style={g.dark} />
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
          <Text style={[g.h5, g.mv3, { fontWeight: "bold" }]}>
            Ingredients:
          </Text>
          {cocktail.requiredIngredients?.map((ingredient, index) => {
            const ingredientString =
              `- ${ingredient.amount} ${ingredient.unit} ${ingredient.name}`.replace(
                /  +/g,
                " "
              );
            return (
              <Text style={g.h5} key={index}>
                {ingredientString}
              </Text>
            );
          })}
          <Text style={[g.h5, g.mv3, { fontWeight: "bold" }]}>Recipe:</Text>
          <Text style={g.h5}>{cocktail.recipe}</Text>
        </Card>
      </View>
    )
  );
};

export default MyCocktailInfo;
