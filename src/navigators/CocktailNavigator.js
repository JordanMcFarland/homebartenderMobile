import React from "react";
import { Pressable } from "react-native";
import CocktailDirectory from "../components/CocktailDirectory";
import CocktailInfo from "../components/CocktailInfo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Stack = createNativeStackNavigator();

const CocktailNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="Cocktails"
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
      }}
    >
      <Stack.Screen
        name="Cocktails"
        component={CocktailDirectory}
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
    </Stack.Navigator>
  );
};

export default CocktailNavigator;
