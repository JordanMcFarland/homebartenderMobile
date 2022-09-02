import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./src/screens/Main";
import { AuthProvider } from "./src/providers/AuthProvider";
import { AirtableProvider } from "./src/providers/AirtableProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <AuthProvider>
      <AirtableProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Main />
          </NavigationContainer>
        </SafeAreaProvider>
      </AirtableProvider>
    </AuthProvider>
  );
}
