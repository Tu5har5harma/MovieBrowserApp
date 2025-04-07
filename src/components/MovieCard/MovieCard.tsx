import React, { useRef } from "react";
import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Movie } from "../../types/movie";
import { styles } from "./MovieCardStyles";
import { Colors } from "../../constants/Colors";

interface MovieCardProps {
  movie: Movie;
  onPress: () => void;
}

export default ({ movie, onPress }: MovieCardProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View
        style={[styles.card, { transform: [{ scale: scaleAnim }] }]}
      >
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
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};
