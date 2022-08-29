import React, { useContext } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import Home from "../components/Home";
import { Pressable, Text } from "react-native";
import CocktailNavigator from "./CocktailNavigator";
import MyCocktailsNavigator from "./MyCocktailsNavigator";
import LoginNavigator from "./LoginNavigator";
import MyBarNavigator from "./MyBarNavigator";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../providers/AuthProvider";
import FavoritesNavigator from "./FavoritesNavigator";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {user ? (
        <DrawerItem
          label={() => (
            <Text style={{ color: "#B70D29", fontSize: 20, fontWeight: "500" }}>
              Logout
            </Text>
          )}
          onPress={() => logout()}
        />
      ) : (
        <></>
      )}
    </DrawerContentScrollView>
  );
};

const MainNavigator = () => {
  const { user } = useContext(AuthContext);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName={user ? "Home" : "Login"}
      screenOptions={({ navigation }) => ({
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
        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
        headerLeft: () => (
          <Pressable onPress={() => navigation.toggleDrawer()}>
            <FontAwesomeIcon
              icon={faBars}
              size={24}
              style={{ color: "#B70D29" }}
            />
          </Pressable>
        ),
      })}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ title: "Home Bartender" }}
      />
      <Drawer.Screen
        name="Cocktail Navigator"
        component={CocktailNavigator}
        options={{ title: "Cocktails", headerShown: false }}
      />
      {!user ? (
        <Drawer.Screen
          name="LoginNavigator"
          component={LoginNavigator}
          options={{ title: "Login" }}
        />
      ) : (
        <>
          <Drawer.Screen
            name="MyCocktailsNavigator"
            component={MyCocktailsNavigator}
            options={{ title: "My Cocktails", headerShown: false }}
          />
          <Drawer.Screen
            name="FavoritesNavigator"
            component={FavoritesNavigator}
            options={{ title: "My Favorites", headerShown: false }}
          />
          <Drawer.Screen
            name="MyBarNavigator"
            component={MyBarNavigator}
            options={{ title: "My Bar", headerShown: false }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default MainNavigator;
