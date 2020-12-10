import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  AsyncStorage,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

export default function Landing() {
  const [settings, setSettings] = useState({});
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

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
          cardColor: "#fff",
          cardTitleColor: "#777",
          cardContentColor: "#777",
          buttonColor: "#4bb543",
        };

        await AsyncStorage.setItem("settings", JSON.stringify(settings));
      } else {
        navigation.navigate("Main");
      }

      setSettings(settings);
      setTimeout(() => fadeIn(), 700);
    }

    handleInit();
  }, []);

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
      <Animated.View style={[styles.btnContainer, { opacity: fadeAnim }]}>
        <RectButton
          style={[styles.btn, { backgroundColor: settings.buttonColor }]}
          onPress={handleNavigation}
        >
          <Feather name="edit" size={30} color="#fff" />
        </RectButton>
      </Animated.View>
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
    borderWidth: 0,
    borderRadius: 5,
  },
});
