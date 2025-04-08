import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSpring,
} from "react-native-reanimated";
import MovieListScreen from "../MovieListScreen/MovieListScreen";
import SortComponent, {
  SortType,
} from "../../components/SortComponent/SortComponent";
import { styles } from "./SearchScreenStyles";
import { Colors } from "../../constants/Colors";
import { Strings } from "../../constants/Strings";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Movie } from "../../types/movie";

type RootStackParamList = {
  MovieDetail: { movie: Movie };
};

interface SearchScreenProps {}

const SearchScreen: React.FC<SearchScreenProps> = () => {
  const [query, setQuery] = useState<string>("");
  const [sortType, setSortType] = useState<SortType | null>(null);
  const bounce = useSharedValue<number>(0);
  const inputRef = useRef<TextInput>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    bounce.value = 0;
    bounce.value = withRepeat(
      withSpring(1, { damping: 10, stiffness: 100 }),
      -1,
      true
    );
  }, [bounce]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [navigation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + bounce.value * 0.1 }],
  }));

  const focusInput = (): void => inputRef.current?.focus();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
      </View>
      {query ? (
        <MovieListScreen
          route={{
            params: {
              endpoint: `/search/movie?query=${encodeURIComponent(query)}`,
            },
          }}
        />
      ) : (
        <TouchableOpacity
          style={styles.emptyContainer as ViewStyle}
          onPress={focusInput}
        >
          <Animated.View style={animatedStyle}>
            <MaterialIcons name="search" size={64} color={Colors.MEDIUM_GRAY} />
          </Animated.View>
          <Text style={styles.emptyText}>{Strings.SEARCH_PROMPT}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchScreen;
