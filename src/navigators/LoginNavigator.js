import React from "react";
import Login from "../components/Login";
import CreateUser from "../components/CreateUser";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const Tab = createBottomTabNavigator();

const LoginNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
        },
        tabBarActiveBackgroundColor: "#B70D29",
        tabBarInactiveBackgroundColor: "#262626",
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarLabelStyle: {
          fontSize: 16,
          paddingBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarIcon: () => (
            <FontAwesomeIcon icon={faRightToBracket} size={28} color="white" />
          ),
        }}
      />
      <Tab.Screen
        name="Create User"
        component={CreateUser}
        options={{
          tabBarIcon: () => (
            <FontAwesomeIcon icon={faUserPlus} size={28} color="white" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default LoginNavigator;
