import React, { useContext, useEffect, useState } from "react";
import { Pressable, Text, View, Image, Vibration } from "react-native";
import { Card } from "@rneui/themed";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../providers/AuthProvider";
import { AirtableContext } from "../providers/AirtableProvider";
import g from "../styles/styles";

const CocktailInfo = ({ route }) => {
  // Temp state solution
  const [favorite, setFavorite] = useState(false);
  const [cocktail, setCocktail] = useState({});
  const { user, handlePostUserFavorite, handleDeleteUserFavorite } =
    useContext(AuthContext);
  const { cocktails } = useContext(AirtableContext);

  useEffect(() => {
    getCocktail();
    // const isFavorite = user.userFavorites.some(
    //   (fav) => fav._id === cocktail._id.toString()
    // );
    // setFavorite(isFavorite);
  }, [user]);

  const getCocktail = () => {
    const cocktailId = route.params;
    const currentCocktail = cocktails.filter(
      (stockCocktail) => stockCocktail._id === cocktailId
    )[0];

    setCocktail(currentCocktail);

    const isFavorite = user.userFavorites.some(
      (fav) => fav._id === currentCocktail._id.toString()
    );
    setFavorite(isFavorite);
  };

  const toggleFavorite = (cocktail) => {
    try {
      if (
        user.userFavorites.some(
          (favorite) => favorite._id === cocktail._id.toString()
        )
      ) {
        handleDeleteUserFavorite({ _id: cocktail._id });
      } else handlePostUserFavorite({ _id: cocktail._id });
    } catch (err) {
      alert(err);
    }
  };

  return (
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
            toggleFavorite(cocktail);
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
        <Text style={[g.h5, g.mt3, g.mb2, { fontWeight: "bold" }]}>
          Ingredients:
        </Text>
        {cocktail.requiredIngredients?.map((ingredient, index) => {
          return (
            <Text style={g.h5} key={index}>
              {ingredient}
            </Text>
          );
        })}
        <Text style={[g.h5, g.mt3, g.mb2, { fontWeight: "bold" }]}>
          Recipe:
        </Text>
        <Text style={g.h5}>{cocktail.recipe}</Text>
      </Card>
    </View>
  );
};

export default CocktailInfo;
