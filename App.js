import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import Routes from "./src/routes";

export default function App() {
  useEffect(() => {
    async function handleInit() {
      await SplashScreen.preventAutoHideAsync();
    }

    handleInit();
  }, []);

  return (
    <>
      <Routes />
      <StatusBar style="auto" />
    </>
  );
}
