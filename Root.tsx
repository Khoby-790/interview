import React, { useEffect } from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Blog from "./screens/Blog";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { useAppTheme } from "./context/theme";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuth } from "./context/auth";

export type StackParamList = {
  Login: { blog: any };
  Home: undefined;
  Blog: { blog: any };
};

const Stack = createSharedElementStackNavigator<StackParamList>();

const Root = () => {
  const { theme } = useAppTheme();
  const { isAuthenticated } = useAuth();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme === "light" ? "#1A2237" : "#fff",
      }}
    >
      <NavigationContainer>
        <StatusBar style={theme === "light" ? "light" : "dark"} />
        <Stack.Navigator
          screenOptions={
            {
              // headerShown: true,
              // presentation: "slide",
            }
          }
          initialRouteName="Home"
        >
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Login"
            component={Login}
          />
          <>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Home"
              component={Home}
            />
            <Stack.Screen
              name="Blog"
              component={Blog}
              sharedElements={(route, otherRoute, showing) => {
                return [`item.${route?.params?.blog?.title}`];
              }}
            />
          </>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Root;
