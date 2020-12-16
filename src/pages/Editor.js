import React, { useEffect, useState } from "react";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import {
  AsyncStorage,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RectButton, TextInput } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Editor() {
  const [memos, setMemos] = useState([]);
  const [settings, setSettings] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();
  const index = route.params.index;

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
      if (route.params) {
        let memosArray = await AsyncStorage.getItem("memos");

        if (memosArray) {
          memosArray = JSON.parse(memosArray);

          setMemos(memosArray);
        }
      }
    }

    handleInit();
  }, []);

  async function handleCancel() {
    navigation.goBack();
  }

  async function handleEdit() {
    await AsyncStorage.setItem("memos", JSON.stringify(memos));

    navigation.goBack();
  }

  return (
    <View
      style={[styles.container, { backgroundColor: settings.secondaryColor }]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <FontAwesome5 name="times" size={25} color={settings.primaryText} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          autoCapitalize="words"
          autoCorrect={false}
          placeholder="Título"
          placeholderTextColor="#ccc"
          value={memos.length > 0 ? memos[index].title : null}
          onChangeText={(event) => {
            setMemos(
              memos.map((memo, memoIndex) =>
                memoIndex === index ? { ...memo, title: event } : memo
              )
            );
          }}
        />
        <TextInput
          style={styles.longInput}
          autoCapitalize="words"
          autoCorrect={false}
          placeholder="Mensagem"
          multiline={true}
          placeholderTextColor="#ccc"
          value={memos.length > 0 ? memos[index].content : null}
          onChangeText={(event) => {
            setMemos(
              memos.map((memo, memoIndex) =>
                memoIndex === index ? { ...memo, content: event } : memo
              )
            );
          }}
        />
        <RectButton
          style={[styles.btn, { backgroundColor: settings.primaryColor }]}
          onPress={handleEdit}
        >
          <Text style={[styles.btnText, { color: settings.secondaryText }]}>
            Editar
          </Text>
        </RectButton>
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
