import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppNavigator";
import SplashScreen from "./src/components/SplashScreen/SplashScreen";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setAppIsReady(true), 2000);
  }, []);

  return (
    <SafeAreaProvider>
      {appIsReady ? <AppNavigator /> : <SplashScreen />}
    </SafeAreaProvider>
  );
}
