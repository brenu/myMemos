import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function Main() {
  const [cards, setCards] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function handleInit() {
      setCards([
        {
          title: "Sample title here",
          content:
            "O leão-marinho é um mamífero semiaquático, de que há várias espécies, da subfamília Otariinae da família Otariidae, que vive em regiões de baixas temperaturas e alimenta-se principalmente de peixes (como o cherne e o arenque) e de moluscos.",
        },
      ]);
    }

    handleInit();
  }, []);

  function handleEdit() {
    navigation.navigate("Editor");
  }

  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <TouchableWithoutFeedback
          key={index}
          style={styles.card}
          onPress={handleEdit}
        >
          <Text style={styles.cardTitle}>{card.title}</Text>
          <Text style={styles.cardContent}>{card.content}</Text>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7ec0ee",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  card: {
    alignSelf: "stretch",
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    padding: 30,
    borderRadius: 5,
    elevation: 5,
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
});
