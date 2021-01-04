import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Landing from "./pages/Landing";
import Main from "./pages/Main";
import Editor from "./pages/Editor";
import NewMemo from "./pages/NewMemo";
import Settings from "./pages/Settings";
import { AsyncStorage } from "react-native";
import * as SplashScreen from "expo-splash-screen";

const Stack = createStackNavigator();

export default function Routes() {
  const [hasSettings, setHasSettings] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function handleInit() {
      await SplashScreen.preventAutoHideAsync();
      let settings = await AsyncStorage.getItem("mymemos@settings");

      if (settings) {
        settings = JSON.parse(settings);
        const addedProps = {
          cardRadius: 5,
        };

        for (let prop in addedProps) {
          if (!settings[prop] && settings[prop] !== 0) {
            settings[prop] = addedProps[prop];
          }
        }

        await AsyncStorage.setItem(
          "mymemos@settings",
          JSON.stringify(settings)
        );
        setHasSettings(true);
      } else {
        settings = {
          primaryColor: "#7ec0ee",
          secondaryColor: "#F2F2F2",
          primaryText: "#7ec0ee",
          secondaryText: "#ffffff",
          cardColor: "#fff",
          cardTitleColor: "#777",
          cardContentColor: "#777",
          buttonColor: "#4bb543",
          cardRadius: 5,
        };

        await AsyncStorage.setItem(
          "mymemos@settings",
          JSON.stringify(settings)
        );
      }

      setIsLoaded(true);
    }

    handleInit();
  }, []);

  useEffect(() => {
    async function handleSplashHiding() {
      await SplashScreen.hideAsync();
    }

    if (isLoaded) {
      handleSplashHiding();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return <></>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!hasSettings && <Stack.Screen name="Landing" component={Landing} />}
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="NewMemo" component={NewMemo} />
        <Stack.Screen name="Editor" component={Editor} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
