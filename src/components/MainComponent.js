import React, { useContext, useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeComponent from "./HomeComponent";
import CocktailDirectoryComponent from "./CocktailDirectoryComponent";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import { AirtableContext } from "../providers/AirtableProvider";
import { fetchCocktails } from "../helpers/airtable";
import CocktailInfoComponent from "./CocktailInfoComponent";

const MainComponent = () => {
  const [err, setErr] = useState(false);
  const [ingredientCategories, setIngredientCategories] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [myBar, setMyBar] = useState([]);

  const { user, login } = useContext(AuthContext);
  const { cocktails, setCocktails } = useContext(AirtableContext);
  const { loading, setLoading } = useContext(AuthContext);

  // Handle User Login
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
        setCocktails(cocktailList);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCocktailAirTable();
  }, []);

  const DirectoryNavigator = () => {
    const DirectoryStack = createNativeStackNavigator();

    return (
      <DirectoryStack.Navigator
        initialRouteName="Directory"
        screenOptions={{ headerShown: false }}
      >
        <DirectoryStack.Screen
          name="Directory"
          component={CocktailDirectoryComponent}
        />
        <DirectoryStack.Screen
          name="CocktailInfo"
          component={CocktailInfoComponent}
        />
      </DirectoryStack.Navigator>
    );
  };

  const Drawer = createDrawerNavigator();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#262626",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#262626",
          },
          headerTitleStyle: {
            color: "#B70D29",
            fontSize: 28,
            justifyContent: "center",
          },
          headerTitleAlign: "center",
          drawerStyle: {
            backgroundColor: "#262626",
          },
          drawerActiveTintColor: "#262626",
          drawerActiveBackgroundColor: "#B70D29",
          drawerInactiveTintColor: "#B70D29",
          drawerLabelStyle: {
            fontSize: 20,
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeComponent}
          options={{ title: "Home Bartender" }}
        />
        <Drawer.Screen
          name="Directory Navigator"
          component={DirectoryNavigator}
          options={{ title: "Cocktails" }}
        />
      </Drawer.Navigator>
    );
  }
};

export default MainComponent;
