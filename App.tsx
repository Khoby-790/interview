import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Text } from "@ui-kitten/components";
import mapping from "./mapping.json";
import { useFonts } from "expo-font";
import Root from "./Root";
import { ThemeContext } from "./context/theme";
import { AuthContext } from "./context/auth";
import { initFirebase } from "./fire";
import Notification from "./components/Notification";

initFirebase();

const App = () => {
  const [theme, setTheme] = useState<string>("light");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loaded, error] = useFonts({
    Roboto: require("./assets/fonts/Roboto/Roboto.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  if (!loaded) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{ theme: theme as unknown as string, toggleTheme }}
    >
      <ApplicationProvider
        {...eva}
        theme={theme === "light" ? eva.dark : eva.light}
        customMapping={{ ...eva.mapping, ...mapping }}
      >
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
          <Notification />
          <Root />
        </AuthContext.Provider>
      </ApplicationProvider>
    </ThemeContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    textAlign: "center",
  },
});
