import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyBar from "../components/MyBar";
import MyBarEditor from "../components/MyBarEditor";
import CraftableCocktails from "../components/CraftableCocktails";
import CocktailInfo from "../components/CocktailInfo";
import MyCocktailInfo from "../components/MyCocktailInfo";
import MyCocktailEditor from "../components/MyCocktailEditor";
import { Pressable, Text } from "react-native";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AuthContext } from "../providers/AuthProvider";
import BackArrow from "./components/BackArrow";
import g from "../styles/styles";

const Stack = createNativeStackNavigator();

const MyBarNavigator = ({ navigation }) => {
  const { handleUpdateUserBar } = useContext(AuthContext);
  return (
    <Stack.Navigator
      initialRouteName="My Bar"
      screenOptions={{
        headerStyle: g.bg.dark,
        headerTitleStyle: [g.primary, g.h2, { justifyContent: "center" }],
        headerTitleAlign: "center",
        animation: "none",
      }}
    >
      <Stack.Screen
        name="My Bar"
        component={MyBar}
        options={{
          headerLeft: () => (
            <Pressable onPress={() => navigation.toggleDrawer()}>
              <FontAwesomeIcon icon={faBars} size={24} style={g.primary} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("My Bar Editor")}>
              <FontAwesomeIcon icon={faEdit} size={24} style={g.primary} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="My Bar Editor"
        component={MyBarEditor}
        options={({ navigation }) => ({
          headerLeft: () => <BackArrow navigation={navigation} />,
          headerRight: () => (
            <Pressable
              style={g.p3}
              onPress={() => {
                handleUpdateUserBar();
                navigation.pop();
              }}
            >
              <Text style={[g.primary, g.h5]}>Save</Text>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="Craftable Cocktails"
        component={CraftableCocktails}
        options={({ navigation }) => ({
          headerLeft: () => <BackArrow navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="Cocktail Info"
        component={CocktailInfo}
        options={({ navigation }) => ({
          headerLeft: () => <BackArrow navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="My Cocktail Info"
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

export default MyBarNavigator;
