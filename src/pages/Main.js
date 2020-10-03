import React, { useEffect, useState } from "react";
import {
  Animated,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  RectButton,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import OptionsView from "../components/Options";

export default function Main() {
  const [memos, setMemos] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedMemo, setSelectedMemo] = useState(0);
  const navigation = useNavigation();

  useFocusEffect(() => {
    async function handleUpdateMemos() {
      let temporaryMemos = await AsyncStorage.getItem("memos");

      if (temporaryMemos) {
        temporaryMemos = JSON.parse(temporaryMemos);
        setMemos(temporaryMemos);
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

  async function handleDelete() {
    const newArray = [];
    const index = selectedMemo;
    Promise.all(
      memos.map((memo, memoIndex) => {
        if (memoIndex !== index) {
          newArray.push(memo);
        }
      })
    );

    await AsyncStorage.setItem("memos", JSON.stringify(newArray));
    setShowOptions(false);
  }

  function handleOptions(index) {
    setSelectedMemo(index);
    setShowOptions(true);
  }

  return (
    <View style={styles.container}>
      {showOptions && (
        <OptionsView>
          <TouchableOpacity
            onPress={() => setShowOptions((showOptions) => !showOptions)}
          >
            <FontAwesome5 name="times" size={25} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <FontAwesome5 name="trash" size={25} color="#fff" />
          </TouchableOpacity>
        </OptionsView>
      )}
      <View style={showOptions ? styles.headerForOptions : styles.header}>
        <TouchableOpacity onPress={handleNewMemo}>
          <FontAwesome5 name="plus" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
      {memos.length > 0 ? (
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {memos.map((card, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => handleEdit(index)}
              onLongPress={() => handleOptions(index)}
            >
              <RectButton style={styles.card}>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardContent}>{card.content}</Text>
              </RectButton>
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
    marginTop: StatusBar.currentHeight,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerForOptions: {
    alignSelf: "stretch",
    justifyContent: "flex-end",
    alignItems: "flex-end",
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
