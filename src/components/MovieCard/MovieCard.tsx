import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Movie } from "../../types/movie";
import { styles } from "./MovieCardStyles";
import { Colors } from "../../constants/Colors";

interface MovieCardProps {
  movie: Movie & { isFavorite?: boolean };
  onPress: () => void;
  onFavoriteToggle?: (movie: Movie, isFavorite: boolean) => void;
}

export default ({ movie, onPress, onFavoriteToggle }: MovieCardProps) => {
  const [isFavorite, setIsFavorite] = useState(movie.isFavorite || false);
  const cardScale = useSharedValue(1);
  const heartScale = useSharedValue(1);

  useEffect(() => {
    setIsFavorite(movie.isFavorite || false);
  }, [movie.isFavorite]);

  const toggleFavorite = async () => {
    const favorites = await AsyncStorage.getItem("favorites");
    let favList: Movie[] = favorites ? JSON.parse(favorites) : [];
    const newIsFavorite = !isFavorite;
    if (newIsFavorite) {
      favList.push(movie);
    } else {
      favList = favList.filter((fav) => fav.id !== movie.id);
    }
    await AsyncStorage.setItem("favorites", JSON.stringify(favList));
    setIsFavorite(newIsFavorite);
    onFavoriteToggle?.(movie, newIsFavorite);

    heartScale.value = withSequence(
      withTiming(1.3, { duration: 100 }),
      withTiming(1, { duration: 200 })
    );
  };

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const handlePressIn = () => {
    cardScale.value = withTiming(1.05, { duration: 100 });
  };

  const handlePressOut = () => {
    cardScale.value = withTiming(1, { duration: 100 });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View style={[styles.card, cardAnimatedStyle]}>
        <LinearGradient
          colors={[Colors.WHITE, Colors.LIGHT_GRAY]}
          style={styles.gradient}
        >
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
            }}
            style={styles.poster}
          />
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {movie.title}
            </Text>
            <Text style={styles.date}>{movie.release_date}</Text>
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={16} color={Colors.BLUE} />
              <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={toggleFavorite}
          >
            <Animated.View style={[styles.favoriteCircle, heartAnimatedStyle]}>
              <MaterialIcons
                name={isFavorite ? "favorite" : "favorite-border"}
                size={24}
                color={isFavorite ? Colors.RED : Colors.MEDIUM_GRAY}
              />
            </Animated.View>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};
