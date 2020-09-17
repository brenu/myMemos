import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

export default function Landing() {
  const navigation = useNavigation();

  function handleNavigation() {
    navigation.navigate("Main");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>myMemos</Text>
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
