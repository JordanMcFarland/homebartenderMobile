import { Link } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Text, ScrollView } from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import { AirtableContext } from "../providers/AirtableProvider";
import { Card } from "@rneui/base/dist/Card";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import g from "../styles/styles";

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
      <Card
        key={fav._id}
        containerStyle={[g.bg.primary, g.bdc.secondary, g.br3]}
      >
        {fav.userId && (
          <FontAwesomeIcon
            icon={faUser}
            style={{ position: "absolute", right: 0 }}
          />
        )}
        <Link
          to={
            fav.userId
              ? {
                  screen: "MyCocktailInfo",
                  params: fav._id,
                }
              : {
                  screen: "CocktailInfo",
                  params: fav._id,
                }
          }
        >
          <Text style={[g.h5, { fontWeight: "bold" }]}>{fav.name}</Text>
        </Link>
      </Card>
    );
  });

  return (
    <ScrollView style={[g.bg.dark, { flex: 1 }]} contentContainerStyle={g.pb3}>
      {renderFavorites}
    </ScrollView>
  );
};

export default Favorites;
