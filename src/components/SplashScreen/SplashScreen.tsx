import React from "react";
import { View, Image, Animated } from "react-native";
import { styles } from "./SplashScreenStyles";

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
