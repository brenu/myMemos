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
  const [settings, setSettings] = useState({});
  const [showOptions, setShowOptions] = useState(false);
  const [selectedMemo, setSelectedMemo] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    async function handleInit() {
      let settings = await AsyncStorage.getItem("mymemos@settings");
      settings = JSON.parse(settings);

      setSettings(settings);
    }

    handleInit();
  }, []);

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

  function handleNavigation(option) {
    switch (option) {
      case 1:
        navigation.navigate("Settings");
        break;
      case 2:
        navigation.navigate("NewMemo");
        break;
      default:
        break;
    }
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
    <View
      style={[styles.container, { backgroundColor: settings.primaryColor }]}
    >
      {showOptions && (
        <OptionsView>
          <TouchableOpacity
            onPress={() => setShowOptions((showOptions) => !showOptions)}
          >
            <FontAwesome5
              name="times"
              size={25}
              color={settings.secondaryText}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <FontAwesome5
              name="trash"
              size={25}
              color={settings.secondaryText}
            />
          </TouchableOpacity>
        </OptionsView>
      )}
      <View
        style={[styles.header, showOptions ? styles.headerForOptions : null]}
      >
        <TouchableOpacity onPress={() => handleNavigation(1)}>
          <FontAwesome5 name="cog" size={25} color={settings.secondaryText} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation(2)}>
          <FontAwesome5 name="plus" size={25} color={settings.secondaryText} />
        </TouchableOpacity>
      </View>
      {memos.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {memos.map((card, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => handleEdit(index)}
              onLongPress={() => handleOptions(index)}
            >
              <RectButton
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
                  {card.title}
                </Text>
                <Text
                  style={[
                    styles.cardContent,
                    { color: settings.cardContentColor },
                  ]}
                >
                  {card.content}
                </Text>
              </RectButton>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
      ) : (
        <Text style={[styles.noContentText, { color: settings.secondaryText }]}>
          Crie uma nota :)
        </Text>
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
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: StatusBar.currentHeight,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerForOptions: {
    marginTop: 0,
  },
  content: {
    alignSelf: "stretch",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 30,
  },
  card: {
    alignSelf: "stretch",
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    marginHorizontal: 20,
    padding: 30,
    elevation: 2,
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
  },
});
