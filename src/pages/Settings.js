import React, { useEffect, useState } from "react";
import {
  AsyncStorage,
  Dimensions,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { fromHsv, TriangleColorPicker } from "react-native-color-picker";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

export default function Settings() {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [settings, setSettings] = useState({});
  const [option, setOption] = useState(0);
  const [color, setColor] = useState("#ff0000");

  useEffect(() => {
    async function handleInit() {
      let settings = await AsyncStorage.getItem("settings");
      settings = JSON.parse(settings);

      setSettings(settings);
    }

    handleInit();
  }, []);

  useEffect(() => {
    console.log(settings);

    async function handleSettingsUpdate() {
      if (settings !== {}) {
        await AsyncStorage.setItem("settings", JSON.stringify(settings));
      }
    }

    handleSettingsUpdate();
  }, [settings]);

  function handleModalView(option) {
    setOption(option);
    setShowModal((showModal) => !showModal);
  }

  async function handleSettingsChange() {
    console.log(option);

    switch (option) {
      case 1:
        setSettings((settings) => ({
          ...settings,
          primaryColor: fromHsv(color),
        }));
        break;
      case 2:
        setSettings((settings) => ({
          ...settings,
          secondaryColor: fromHsv(color),
        }));
        break;
      case 3:
        setSettings((settings) => ({
          ...settings,
          primaryText: fromHsv(color),
        }));
        break;
      case 4:
        setSettings((settings) => ({
          ...settings,
          secondaryText: fromHsv(color),
        }));
        break;
      default:
    }

    setShowModal((showModal) => !showModal);
  }

  async function handleGoBack() {
    navigation.goBack();
  }

  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <FontAwesome5 name="arrow-left" size={25} color="#7ec0ee" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={[styles.title]}>Configurações</Text>
        <Text style={[styles.label]}>Cor principal</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleModalView(1)}
          >
            <Text style={[styles.btnText]}>Selecionar</Text>
          </TouchableOpacity>
          <View
            style={[
              styles.colorContainer,
              { backgroundColor: settings.primaryColor },
            ]}
          ></View>
        </View>
        <Text style={[styles.label]}>Cor secundária</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleModalView(2)}
          >
            <Text style={[styles.btnText]}>Selecionar</Text>
          </TouchableOpacity>
          <View
            style={[
              styles.colorContainer,
              { backgroundColor: settings.secondaryColor },
            ]}
          ></View>
        </View>
        <Text style={[styles.label]}>Texto principal</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleModalView(3)}
          >
            <Text style={[styles.btnText]}>Selecionar</Text>
          </TouchableOpacity>
          <View
            style={[
              styles.colorContainer,
              { backgroundColor: settings.primaryText },
            ]}
          ></View>
        </View>
        <Text style={[styles.label]}>Texto secundário</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleModalView(4)}
          >
            <Text style={[styles.btnText]}>Selecionar</Text>
          </TouchableOpacity>
          <View
            style={[
              styles.colorContainer,
              { backgroundColor: settings.secondaryText },
            ]}
          ></View>
        </View>
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
                color={color}
                onColorChange={setColor}
                onColorSelected={handleSettingsChange}
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
    backgroundColor: "#7ec0ee",
    alignSelf: "baseline",
    justifyContent: "center",
    alignItems: "stretch",
    borderColor: "#fff",
    marginBottom: 10,
    elevation: 5,
  },
  btnText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    padding: 6,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  colorContainer: {
    backgroundColor: "#f00",
    height: 30,
    width: 30,
    marginBottom: 10,
    marginLeft: 10,
    elevation: 5,
  },
});
