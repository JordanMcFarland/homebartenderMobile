import React from "react";
import { Pressable } from "react-native";
import CocktailInfo from "../components/CocktailInfo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Favorites from "../components/Favorites";
import MyCocktailInfo from "../components/MyCocktailInfo";
import MyCocktailEditor from "../components/MyCocktailEditor";

const Stack = createNativeStackNavigator();

const FavoritesNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="My Favorites"
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
        animation: "none",
      }}
    >
      <Stack.Screen
        name="My Favorites"
        component={Favorites}
        options={{
          headerLeft: () => (
            <Pressable onPress={() => navigation.toggleDrawer()}>
              <FontAwesomeIcon
                icon={faBars}
                size={24}
                style={{ color: "#B70D29" }}
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="CocktailInfo"
        component={CocktailInfo}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Pressable onPress={() => navigation.pop()}>
              <FontAwesomeIcon
                icon={faArrowLeft}
                size={24}
                style={{ color: "#B70D29" }}
              />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="MyCocktailInfo"
        component={MyCocktailInfo}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Pressable onPress={() => navigation.pop()}>
              <FontAwesomeIcon
                icon={faArrowLeft}
                size={24}
                style={{ color: "#B70D29" }}
              />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="MyCocktailEditor"
        component={MyCocktailEditor}
        options={({ navigation }) => ({
          title: "Cocktail Editor",
          headerLeft: () => (
            <Pressable onPress={() => navigation.pop()}>
              <FontAwesomeIcon
                icon={faArrowLeft}
                size={24}
                style={{ color: "#B70D29" }}
              />
            </Pressable>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default FavoritesNavigator;
