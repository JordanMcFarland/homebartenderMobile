import React from "react";
import Login from "../screens/Login";
import CreateUser from "../screens/CreateUser";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import g from "../styles/styles";

const Tab = createBottomTabNavigator();

const LoginNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
        },
        tabBarActiveBackgroundColor: g.primary.color,
        tabBarInactiveBackgroundColor: g.dark.color,
        tabBarActiveTintColor: g.white.color,
        tabBarInactiveTintColor: g.white.color,
        tabBarLabelStyle: [g.h5, g.pb1],
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
