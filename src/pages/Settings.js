import React, { useEffect, useState } from "react";
import {
  AsyncStorage,
  BackHandler,
  Dimensions,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { fromHsv, TriangleColorPicker } from "react-native-color-picker";
import {
  RectButton,
  ScrollView,
  TextInput,
} from "react-native-gesture-handler";

import { Restart } from "fiction-expo-restart";

export default function Settings() {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [settings, setSettings] = useState({});
  const [option, setOption] = useState(0);
  const [color, setColor] = useState("#ff0000");
  const [isRestartReady, setIsRestartReady] = useState(false);
  const [showRestartModal, setShowRestartModal] = useState(false);
  const [temporaryInputValue, setTemporaryInputValue] = useState("");

  useEffect(() => {
    async function handleInit() {
      let settings = await AsyncStorage.getItem("mymemos@settings");
      settings = JSON.parse(settings);

      setSettings(settings);
    }

    handleInit();
    setTimeout(() => setIsRestartReady(true), 3100);
  }, []);

  useEffect(() => {
    async function handleSettingsUpdate() {
      if (settings !== {}) {
        await AsyncStorage.setItem(
          "mymemos@settings",
          JSON.stringify({
            ...settings,
            cardRadius: Number(settings.cardRadius),
          })
        );
      }
    }

    handleSettingsUpdate();
  }, [settings]);

  function handleModalView(option) {
    setOption(option);
    setShowModal((showModal) => !showModal);
  }

  async function handleSettingsChange() {
    switch (option) {
      case 0:
        setSettings((settings) => ({
          ...settings,
          buttonColor: fromHsv(color),
        }));
        break;
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
      case 5:
        setSettings((settings) => ({
          ...settings,
          cardColor: fromHsv(color),
        }));
        break;
      case 6:
        setSettings((settings) => ({
          ...settings,
          cardTitleColor: fromHsv(color),
        }));
        break;
      case 7:
        setSettings((settings) => ({
          ...settings,
          cardContentColor: fromHsv(color),
        }));
        break;
      default:
        break;
    }

    setShowModal((showModal) => false);
  }

  function handleInputsChange(text) {
    switch (option) {
      case 1:
        setSettings((settings) => ({
          ...settings,
          cardRadius: Number(text.replace(/[^0-9]/g, "")),
        }));
        break;
      default:
        break;
    }
  }

  function handleCancel() {
    setShowModal(false);
    setShowRestartModal(false);
  }

  function handleRestart() {
    Restart();
  }

  function handleGoBackButton() {
    if (isRestartReady) {
      setShowModal(true);
      setShowRestartModal(true);
    }
  }

  BackHandler.addEventListener("hardwareBackPress", () => {
    if (isRestartReady) {
      setShowModal(true);
      setShowRestartModal(true);
    }

    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBackButton}>
          <FontAwesome5 name="arrow-left" size={25} color="#7ec0ee" />
        </TouchableOpacity>
      </View>
      {settings !== {} && (
        <ScrollView style={styles.content}>
          <Text style={[styles.title]}>Configurações</Text>
          <View style={styles.settingsGrid}>
            <View style={styles.colorsContainer}>
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
              <Text style={[styles.label]}>Cor do card</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => handleModalView(5)}
                >
                  <Text style={[styles.btnText]}>Selecionar</Text>
                </TouchableOpacity>
                <View
                  style={[
                    styles.colorContainer,
                    { backgroundColor: settings.cardColor },
                  ]}
                ></View>
              </View>
              <Text style={[styles.label]}>Título do card</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => handleModalView(6)}
                >
                  <Text style={[styles.btnText]}>Selecionar</Text>
                </TouchableOpacity>
                <View
                  style={[
                    styles.colorContainer,
                    { backgroundColor: settings.cardTitleColor },
                  ]}
                ></View>
              </View>
              <Text style={[styles.label]}>Conteúdo do card</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => handleModalView(7)}
                >
                  <Text style={[styles.btnText]}>Selecionar</Text>
                </TouchableOpacity>
                <View
                  style={[
                    styles.colorContainer,
                    { backgroundColor: settings.cardContentColor },
                  ]}
                ></View>
              </View>
            </View>
            <View style={styles.numbersContainer}>
              <Text style={[styles.label]}>Borda do card</Text>
              <TextInput
                style={styles.optionInput}
                keyboardType="number-pad"
                value={String(settings.cardRadius)}
                onChangeText={(text) => {
                  setOption(1);
                  handleInputsChange(text);
                }}
              />
            </View>
          </View>
          <View style={styles.screensContainer}>
            <View
              style={[
                styles.screenContainer,
                { backgroundColor: settings.primaryColor },
              ]}
            >
              <View style={[styles.exampleHeader]}>
                <FontAwesome5
                  name="cog"
                  size={25}
                  color={settings.secondaryText}
                />

                <FontAwesome5
                  name="plus"
                  size={25}
                  color={settings.secondaryText}
                />
              </View>
              <View
                style={[
                  styles.card,
                  {
                    backgroundColor: settings.cardColor,
                    borderRadius: settings.cardRadius,
                  },
                ]}
              >
                <Text
                  style={[styles.cardTitle, { color: settings.cardTitleColor }]}
                >
                  Test title
                </Text>
                <Text
                  style={[
                    styles.cardContent,
                    { color: settings.cardContentColor },
                  ]}
                >
                  Sample description
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.screenContainer,
                { backgroundColor: settings.secondaryColor },
              ]}
            >
              <View style={styles.exampleHeader}>
                <FontAwesome5
                  name="arrow-left"
                  size={25}
                  color={settings.primaryText}
                />
              </View>
              <View style={styles.exampleContent}>
                <View
                  style={[
                    styles.exampleInput,
                    {
                      borderTopLeftRadius: settings.cardRadius,
                      borderTopRightRadius: settings.cardRadius,
                    },
                  ]}
                >
                  <Text style={styles.inputText}>Example</Text>
                </View>
                <View
                  style={[
                    styles.exampleLongInput,
                    {
                      borderBottomLeftRadius: settings.cardRadius,
                      borderBottomRightRadius: settings.cardRadius,
                    },
                  ]}
                >
                  <Text style={styles.inputText}>Blah blah</Text>
                </View>
                <View
                  style={[
                    styles.exampleBtn,
                    { backgroundColor: settings.primaryColor },
                  ]}
                >
                  <Text
                    style={[
                      styles.exampleBtnText,
                      { color: settings.secondaryText },
                    ]}
                  >
                    Criar Nota
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <Modal
            animated={true}
            animationType="slide"
            visible={showModal}
            transparent={true}
          >
            <View style={styles.modal}>
              {!showRestartModal ? (
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
              ) : (
                <View style={[styles.modalCard, { flex: 0.2 }]}>
                  <Text
                    style={{ fontSize: 18, color: "#777", textAlign: "center" }}
                  >
                    Será necessário reiniciar o aplicativo, tem certeza?
                  </Text>
                  <View style={styles.confirmContainer}>
                    <TouchableOpacity
                      style={styles.cancelBtn}
                      onPress={handleCancel}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Não
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.confirmBtn}
                      onPress={handleRestart}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Sim
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </Modal>
        </ScrollView>
      )}
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
    height: 34,
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
    alignSelf: "flex-start",
    backgroundColor: "#f00",
    height: 34,
    width: 34,
    marginBottom: 10,
    marginLeft: 10,
    elevation: 5,
  },
  screensContainer: {
    flexDirection: "row",
    alignSelf: "stretch",
    marginBottom: 20,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  screenContainer: {
    height: 200,
    width: 150,
    borderRadius: 8,
    elevation: 5,
  },
  card: {
    alignSelf: "stretch",
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#777",
  },
  cardContent: {
    marginTop: 5,
    fontSize: 10,
    color: "#777",
  },
  confirmBtn: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#4bb543",
    borderRadius: 5,
  },
  cancelBtn: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f55",
    borderRadius: 5,
  },
  confirmContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "stretch",
    marginTop: 30,
  },
  exampleHeader: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  exampleContent: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  exampleInput: {
    alignSelf: "stretch",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: "#fff",
    color: "#777",
  },
  exampleLongInput: {
    alignSelf: "stretch",
    padding: 5,
    backgroundColor: "#fff",
    color: "#777",
  },
  inputText: {
    color: "#ccc",
    fontSize: 10,
  },
  exampleBtn: {
    marginTop: 10,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    backgroundColor: "#7ec0ee",
    borderRadius: 2,
  },
  exampleBtnText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  settingsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  optionInput: {
    height: 34,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#7ec0ee",
    textAlign: "center",
    color: "#aaa",
    fontWeight: "bold",
  },
});
