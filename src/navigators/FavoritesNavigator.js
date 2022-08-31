import React from "react";
import { Pressable } from "react-native";
import CocktailInfo from "../components/CocktailInfo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Favorites from "../components/Favorites";
import MyCocktailInfo from "../components/MyCocktailInfo";
import MyCocktailEditor from "../components/MyCocktailEditor";
import BackArrow from "./components/BackArrow";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import g from "../styles/styles";

const Stack = createNativeStackNavigator();

const FavoritesNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="My Favorites"
      screenOptions={{
        headerStyle: g.bg.dark,
        headerTitleStyle: [g.primary, g.h2, { justifyContent: "center" }],
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
              <FontAwesomeIcon icon={faBars} size={24} style={g.primary} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="CocktailInfo"
        component={CocktailInfo}
        options={({ navigation }) => ({
          headerLeft: () => <BackArrow navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="MyCocktailInfo"
        component={MyCocktailInfo}
        options={({ navigation }) => ({
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

export default FavoritesNavigator;
