import React, { useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AsyncStorage, StatusBar, StyleSheet, Text, View } from "react-native";
import {
  RectButton,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";

import { FontAwesome5 } from "@expo/vector-icons";

export default function NewMemo() {
  const [memos, setMemos] = useState([]);
  const [memosLength, setMemosLength] = useState(0);
  const [settings, setSettings] = useState({});

  const navigation = useNavigation();

  useEffect(() => {
    async function handleInit() {
      let settings = await AsyncStorage.getItem("mymemos@settings");
      settings = JSON.parse(settings);

      setSettings(settings);
    }

    handleInit();
  }, []);

  useEffect(() => {
    async function handleInit() {
      let memosArray = await AsyncStorage.getItem("memos");

      if (memosArray) {
        memosArray = JSON.parse(memosArray);

        memosArray.push({ title: "", content: "" });
      } else {
        memosArray = [];
        memosArray.push({ title: "", content: "" });
      }

      setMemos(memosArray);
      setMemosLength(Number(memosArray.length));
    }

    handleInit();
  }, []);

  async function handleGoBack() {
    navigation.goBack();
  }

  async function handleSubmit() {
    await AsyncStorage.setItem("memos", JSON.stringify(memos));

    navigation.goBack();
  }

  return (
    <View
      style={[styles.container, { backgroundColor: settings.secondaryColor }]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <FontAwesome5
            name="arrow-left"
            size={25}
            color={settings.primaryText}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          autoCapitalize="words"
          autoCorrect={false}
          placeholder="Título"
          placeholderTextColor="#ccc"
          value={memosLength > 0 ? memos[memosLength - 1].title : null}
          onChangeText={(event) => {
            setMemos(
              memos.map((memo, memoIndex) =>
                memoIndex === memosLength - 1 ? { ...memo, title: event } : memo
              )
            );
          }}
        />
        <TextInput
          style={styles.longInput}
          autoCapitalize="sentences"
          autoCorrect={false}
          placeholder="Mensagem"
          multiline={true}
          placeholderTextColor="#ccc"
          value={memosLength > 0 ? memos[memosLength - 1].content : null}
          onChangeText={(event) => {
            setMemos(
              memos.map((memo, memoIndex) =>
                memoIndex === memosLength - 1
                  ? { ...memo, content: event }
                  : memo
              )
            );
          }}
        />
        <RectButton
          style={[styles.btn, { backgroundColor: settings.primaryColor }]}
          onPress={handleSubmit}
        >
          <Text style={[styles.btnText, { color: settings.secondaryText }]}>
            Criar Nota
          </Text>
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  input: {
    alignSelf: "stretch",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    color: "#777",
  },
  longInput: {
    alignSelf: "stretch",
    padding: 5,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    color: "#777",
  },
  btn: {
    marginTop: 10,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#7ec0ee",
    borderRadius: 2,
  },
  btnText: {
    fontSize: 16,
    color: "#fff",
  },
});
