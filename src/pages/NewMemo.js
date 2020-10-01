import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AsyncStorage, StyleSheet, Text, View } from "react-native";
import { RectButton, TextInput } from "react-native-gesture-handler";

export default function NewMemo() {
  const [memos, setMemos] = useState([]);
  const [memosLength, setMemosLength] = useState(0);

  const navigation = useNavigation();

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

  async function handleSubmit() {
    await AsyncStorage.setItem("memos", JSON.stringify(memos));

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
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
        autoCapitalize="words"
        autoCorrect={false}
        placeholder="Mensagem"
        multiline={true}
        placeholderTextColor="#ccc"
        value={memosLength > 0 ? memos[memosLength - 1].content : null}
        onChangeText={(event) => {
          setMemos(
            memos.map((memo, memoIndex) =>
              memoIndex === memosLength - 1 ? { ...memo, content: event } : memo
            )
          );
        }}
      />
      <RectButton style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>Criar Nota</Text>
      </RectButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
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
    elevation: 5,
  },
  btnText: {
    fontSize: 16,
    color: "#fff",
  },
});
