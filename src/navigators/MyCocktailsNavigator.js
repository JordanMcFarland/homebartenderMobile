import React from "react";
import { Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyCocktails from "../components/MyCocktails";
import MyCocktailInfo from "../components/MyCocktailInfo";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars, faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import CocktailCreator from "../components/CocktailCreator";
import MyCocktailEditor from "../components/MyCocktailEditor";

const Stack = createNativeStackNavigator();

const MyCocktailsNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="My Cocktails"
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
        name="My Cocktails"
        component={MyCocktails}
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
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("CocktailCreator")}>
              <FontAwesomeIcon
                icon={faPlus}
                size={24}
                style={{ color: "#B70D29" }}
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="MyCocktailInfo"
        component={MyCocktailInfo}
        options={({ navigation }) => ({
          title: "My Cocktails",
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
        name="CocktailCreator"
        component={CocktailCreator}
        options={({ navigation }) => ({
          title: "Cocktail Creator",
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

export default MyCocktailsNavigator;
