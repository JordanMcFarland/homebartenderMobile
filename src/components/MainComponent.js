import React, { useContext, useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeComponent from "./HomeComponent";
import CocktailDirectoryComponent from "./CocktailDirectoryComponent";
import { ActivityIndicator, Pressable, View } from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import CocktailInfoComponent from "./CocktailInfoComponent";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const MainComponent = () => {
  const { user, login } = useContext(AuthContext);
  const { loading, setLoading } = useContext(AuthContext);

  const Drawer = createDrawerNavigator();
  const DirectoryStack = createNativeStackNavigator();

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

  const DirectoryNavigator = ({ navigation }) => {
    return (
      <DirectoryStack.Navigator
        initialRouteName="Directory"
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
        <DirectoryStack.Screen
          name="Directory"
          component={CocktailDirectoryComponent}
          options={{
            title: "Cocktails",
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
        <DirectoryStack.Screen
          name="CocktailInfo"
          component={CocktailInfoComponent}
        />
      </DirectoryStack.Navigator>
    );
  };

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
      // Want to style the nav toggler! Cannot access toggleDrawer() for some reason
      <Drawer.Navigator
        initialRouteName="Home"
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
          component={HomeComponent}
          options={{ title: "Home Bartender" }}
        />
        <Drawer.Screen
          name="Directory Navigator"
          component={DirectoryNavigator}
          options={{ title: "Cocktails", headerShown: false }}
        />
      </Drawer.Navigator>
    );
  }
};

export default MainComponent;
