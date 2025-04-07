import React from "react";
import { View, Image, Animated, StyleSheet } from "react-native";

interface SplashScreenProps {
  fadeAnim: Animated.Value;
}

export default ({ fadeAnim }: SplashScreenProps) => (
  <Animated.View
    style={[styles.container, { transform: [{ translateY: fadeAnim }] }]}
  >
    <Image
      source={require("../../../assets/splash.gif")}
      style={styles.image}
    />
  </Animated.View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: { width: "100%", height: "100%", resizeMode: "contain" },
});
