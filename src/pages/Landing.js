import React, { useEffect, useState } from "react";
import {
  AsyncStorage,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

export default function Landing() {
  const [settings, setSettings] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    async function handleInit() {
      let settings = await AsyncStorage.getItem("settings");
      settings = JSON.parse(settings);

      if (!settings) {
        settings = {
          primaryColor: "#7ec0ee",
          secondaryColor: "#F2F2F2",
          primaryText: "#7ec0ee",
          secondaryText: "#ffffff",
        };

        await AsyncStorage.setItem("settings", JSON.stringify(settings));
      }

      setSettings(settings);
    }

    handleInit();
  }, []);

  useEffect(() => {
    console.log(settings);
  }, [settings]);

  function handleNavigation() {
    navigation.navigate("Main");
  }

  return (
    <View
      style={[styles.container, { backgroundColor: settings.secondaryColor }]}
    >
      <Text style={[styles.title, { color: settings.primaryText }]}>
        myMemos
      </Text>
      <RectButton style={styles.btn} onPress={handleNavigation}>
        <Feather name="edit" size={30} color="#fff" />
      </RectButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#7ec0ee",
    elevation: 5,
  },
  btn: {
    marginTop: 20,
    alignSelf: "center",
    padding: 10,
    paddingHorizontal: 30,
    backgroundColor: "#4BB543",
    borderRadius: 5,
    elevation: 2,
  },
});
