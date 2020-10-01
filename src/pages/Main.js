import React, { useEffect, useState } from "react";
import { AsyncStorage, StatusBar, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Main() {
  const [cards, setCards] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(() => {
    async function handleUpdateMemos() {
      let memos = await AsyncStorage.getItem("memos");

      if (memos) {
        memos = JSON.parse(memos);
        setCards(memos);
      }
    }

    handleUpdateMemos();
  });

  function handleNewMemo() {
    navigation.navigate("NewMemo");
  }

  function handleEdit(index) {
    navigation.navigate("Editor", { index });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleNewMemo}>
          <FontAwesome5 name="plus" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
      {cards.length > 0 ? (
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {cards.map((card, index) => (
            <TouchableWithoutFeedback
              key={index}
              style={styles.card}
              onPress={() => handleEdit(index)}
            >
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardContent}>{card.content}</Text>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noContentText}>Crie uma nota :)</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7ec0ee",
    justifyContent: "flex-start",
  },
  header: {
    alignSelf: "stretch",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: StatusBar.currentHeight + 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  content: {
    alignSelf: "stretch",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  card: {
    alignSelf: "stretch",
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    padding: 30,
    borderRadius: 5,
    elevation: 5,
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#777",
  },
  cardContent: {
    marginTop: 10,
    fontSize: 14,
    color: "#777",
  },
  noContentText: {
    flex: 1,
    alignSelf: "center",
    textAlignVertical: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
