import React, { useRef, useEffect } from "react";
import { Animated, StatusBar, StyleSheet, Text, View } from "react-native";

export default function OptionsView(props) {
  const marginAnim = useRef(new Animated.Value(-55)).current;

  useEffect(() => {
    Animated.timing(marginAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [marginAnim]);

  return (
    <Animated.View style={[styles.options, { translateY: marginAnim }]}>
      {props.children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  options: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: "#ffffff44",
    paddingVertical: 10,
    paddingTop: StatusBar.currentHeight + 1,
    paddingHorizontal: 20,
  },
});
