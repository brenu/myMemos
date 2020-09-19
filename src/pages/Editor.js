import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton, TextInput } from "react-native-gesture-handler";

export default function Editor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        autoCapitalize="words"
        autoCorrect={false}
        placeholder="Título"
        placeholderTextColor="#ccc"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.longInput}
        autoCapitalize="words"
        autoCorrect={false}
        placeholder="Mensagem"
        multiline={true}
        placeholderTextColor="#ccc"
        value={content}
        onChangeText={setContent}
      />
      <RectButton style={styles.btn}>
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
    borderBottomColor: "#ccc",
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
