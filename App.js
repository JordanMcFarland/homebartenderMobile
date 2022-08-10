import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainComponent from "./src/components/MainComponent";

const Context = React.createContext();

export default function App() {
  return (
    <Context.Provider>
      <NavigationContainer>
        <MainComponent />
      </NavigationContainer>
    </Context.Provider>
  );
}
