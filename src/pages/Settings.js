import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TriangleColorPicker } from "react-native-color-picker";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

export default function Settings() {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);

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
        <Text style={styles.label}>Cor principal</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setShowModal((showModal) => !showModal)}
        >
          <Text style={styles.btnText}>Selecionar</Text>
        </TouchableOpacity>
        <Modal
          animated={true}
          animationType="slide"
          visible={showModal}
          transparent={true}
        >
          <View style={styles.modal}>
            <View style={styles.modalCard}>
              <Text style={styles.title}>
                Toque na cor resultante para selecionar
              </Text>
              <TriangleColorPicker
                onColorSelected={() => setShowModal((showModal) => !showModal)}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </Modal>
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
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "normal",
    color: "#7ec0ee",
  },
  input: {
    height: 50,
    padding: 5,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#7ec0ee",
  },
  modal: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
  modalCard: {
    flex: 0.6,
    margin: 10,
    padding: 20,
    borderRadius: 5,
    elevation: 5,
    backgroundColor: "#fff",
  },
  btn: {
    alignItems: "stretch",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    backgroundColor: "#7ec0ee",
  },
  btnText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
});
