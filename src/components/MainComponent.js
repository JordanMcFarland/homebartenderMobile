import React, { useContext, useEffect, useState } from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeComponent from "./HomeComponent";
import CocktailDirectoryComponent from "./CocktailDirectoryComponent";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import { AirtableContext } from "../providers/AirtableProvider";
import { fetchCocktails } from "../helpers/airtable";

const MainComponent = () => {
  const [err, setErr] = useState(false);
  const [ingredientCategories, setIngredientCategories] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [myBar, setMyBar] = useState([]);

  const { user, login } = useContext(AuthContext);
  const { cocktails, setCocktails } = useContext(AirtableContext);
  const { loading, setLoading } = useContext(AuthContext);

  useEffect(() => {
    const loginUser = async () => {
      try {
        await login();
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    loginUser();
  }, []);

  //Maybe move this back to the airtable provider?
  useEffect(() => {
    const fetchCocktailAirTable = async () => {
      try {
        setLoading(true);
        const list = await fetchCocktails();
        const cocktailList = list.records
          .map((record) => {
            const { _id, name, requiredIngredients, recipe, image } =
              record.fields;
            const ingredientsArr = requiredIngredients.split(",");
            return {
              _id,
              name,
              requiredIngredients: ingredientsArr.map((item) => item.trim()),
              recipe,
              image,
            };
          })
          .sort((a, b) => (a.name > b.name ? 1 : -1));
        setCocktails((prevState) => [...prevState, ...cocktailList]);
        console.log(cocktailList[0].name);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCocktailAirTable();
  }, []);

  const Drawer = createDrawerNavigator();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={HomeComponent}
          options={{ title: "Home Bartender" }}
        />
        <Drawer.Screen
          name="Cocktails"
          component={CocktailDirectoryComponent}
        />
      </Drawer.Navigator>
    );
  }
};

export default MainComponent;
