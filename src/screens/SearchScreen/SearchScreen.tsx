import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSpring,
} from "react-native-reanimated";
import MovieListScreen from "../MovieListScreen/MovieListScreen";
import { styles } from "./SearchScreenStyles";
import { Colors } from "../../constants/Colors";
import { Strings } from "../../constants/Strings";

export default () => {
  const [query, setQuery] = useState("");
  const bounce = useSharedValue(0);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    bounce.value = withRepeat(
      withSpring(1, { damping: 10, stiffness: 100 }),
      -1,
      true
    );
  }, [bounce]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bounce.value ? 1 + bounce.value * 0.1 : 1 }],
  }));

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder={Strings.SEARCH_PLACEHOLDER}
        placeholderTextColor={Colors.DARK_GRAY}
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
        returnKeyType="search"
      />
      {query ? (
        <MovieListScreen
          route={{
            params: {
              endpoint: `/search/movie?query=${encodeURIComponent(query)}`,
            },
          }}
        />
      ) : (
        <TouchableOpacity style={styles.emptyContainer} onPress={focusInput}>
          <Animated.View style={animatedStyle}>
            <MaterialIcons name="search" size={64} color={Colors.MEDIUM_GRAY} />
          </Animated.View>
          <Text style={styles.emptyText}>{Strings.SEARCH_PROMPT}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
