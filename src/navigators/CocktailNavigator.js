import React from "react";
import { Pressable } from "react-native";
import CocktailDirectory from "../components/CocktailDirectory";
import CocktailInfo from "../components/CocktailInfo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import BackArrow from "./components/BackArrow";
import g from "../styles/styles";

const Stack = createNativeStackNavigator();

const CocktailNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="Cocktails"
      screenOptions={{
        headerStyle: g.bg.dark,
        headerTitleStyle: [g.primary, g.h2, { justifyContent: "center" }],
        headerTitleAlign: "center",
        animation: "none",
      }}
    >
      <Stack.Screen
        name="Cocktails"
        component={CocktailDirectory}
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
    </Stack.Navigator>
  );
};

export default CocktailNavigator;
