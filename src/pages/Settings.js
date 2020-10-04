import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Settings() {
  const navigation = useNavigation();

  async function handleGoBack() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <FontAwesome5 name="arrow-left" size={25} color="#7ec0ee" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Configurações</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignSelf: "stretch",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    marginTop: StatusBar.currentHeight + 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    alignSelf: "stretch",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7ec0ee",
  },
});
