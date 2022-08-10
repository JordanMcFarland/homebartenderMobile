import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainComponent from "./src/components/MainComponent";
import { AuthProvider } from "./src/providers/AuthProvider";
import { AirtableProvider } from "./src/providers/AirtableProvider";

export default function App() {
  return (
    <AuthProvider>
      <AirtableProvider>
        <NavigationContainer>
          <MainComponent />
        </NavigationContainer>
      </AirtableProvider>
    </AuthProvider>
  );
}
