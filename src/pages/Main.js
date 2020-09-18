import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Main() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Texto de teste aqui</Text>
        <Text style={styles.cardContent}>
          O leão-marinho é um mamífero semiaquático, de que há várias espécies,
          da subfamília Otariinae da família Otariidae, que vive em regiões de
          baixas temperaturas e alimenta-se principalmente de peixes (como o
          cherne e o arenque) e de moluscos.
        </Text>
      </View>
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
