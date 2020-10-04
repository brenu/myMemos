import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Landing from "./pages/Landing";
import Main from "./pages/Main";
import Editor from "./pages/Editor";
import NewMemo from "./pages/NewMemo";
import Settings from "./pages/Settings";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="NewMemo" component={NewMemo} />
        <Stack.Screen name="Editor" component={Editor} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
