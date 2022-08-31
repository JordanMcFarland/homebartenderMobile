import React from "react";
import { Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyCocktails from "../components/MyCocktails";
import MyCocktailInfo from "../components/MyCocktailInfo";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import CocktailCreator from "../components/CocktailCreator";
import MyCocktailEditor from "../components/MyCocktailEditor";
import BackArrow from "./components/BackArrow";
import g from "../styles/styles";

const Stack = createNativeStackNavigator();

const MyCocktailsNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="My Cocktails"
      screenOptions={{
        headerStyle: g.bg.dark,
        headerTitleStyle: [g.primary, g.h2, { justifyContent: "center" }],
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
              <FontAwesomeIcon icon={faBars} size={24} style={g.primary} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("CocktailCreator")}>
              <FontAwesomeIcon icon={faPlus} size={24} style={g.primary} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="MyCocktailInfo"
        component={MyCocktailInfo}
        options={({ navigation }) => ({
          title: "My Cocktails",
          headerLeft: () => <BackArrow navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="CocktailCreator"
        component={CocktailCreator}
        options={({ navigation }) => ({
          title: "Cocktail Creator",
          headerLeft: () => <BackArrow navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="MyCocktailEditor"
        component={MyCocktailEditor}
        options={({ navigation }) => ({
          title: "Cocktail Editor",
          headerLeft: () => <BackArrow navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default MyCocktailsNavigator;
