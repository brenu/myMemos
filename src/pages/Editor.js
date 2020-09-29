import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { AsyncStorage, StyleSheet, Text, View } from "react-native";
import { RectButton, TextInput } from "react-native-gesture-handler";

export default function Editor() {
  const [memos, setMemos] = useState([]);

  const route = useRoute();
  const index = route.params.index;

  useEffect(() => {
    async function handleInit() {
      if (route.params) {
        let memosArray = await AsyncStorage.getItem("memos");
        memosArray = JSON.parse(memosArray);

        setMemos(memosArray);
      }
    }

    handleInit();
  }, []);

  async function handleEdit() {
    await AsyncStorage.setItem("memos", JSON.stringify(memos));

    console.log(memos);
  }

  return (
    <View style={styles.container}>
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
      <RectButton style={styles.btn} onPress={handleEdit}>
        <Text style={styles.btnText}>Editar</Text>
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
