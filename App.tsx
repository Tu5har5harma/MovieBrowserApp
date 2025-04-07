import React, { useEffect, useRef, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Animated } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import SplashScreen from "./src/components/SplashScreen/SplashScreen";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const splashAnim = useRef(new Animated.Value(0)).current;
  const homeAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    setTimeout(() => {
      setAppIsReady(true);
      Animated.parallel([
        Animated.timing(splashAnim, {
          toValue: -1000,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(homeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    }, 2000);
  }, [splashAnim, homeAnim]);

  return (
    <SafeAreaProvider>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10,
          transform: [{ translateY: splashAnim }],
        }}
      >
        <SplashScreen fadeAnim={splashAnim} />
      </Animated.View>
      <Animated.View style={{ flex: 1, transform: [{ translateY: homeAnim }] }}>
        <AppNavigator />
      </Animated.View>
    </SafeAreaProvider>
  );
}
