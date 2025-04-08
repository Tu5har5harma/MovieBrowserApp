import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Movie } from "../../types/movie";
import { styles } from "./MovieDetailStyles";
import { Colors } from "../../constants/Colors";
import { Strings } from "../../constants/Strings";

interface MovieDetailProps {
  route: { params: { movie: Movie } };
}

export default ({ route }: MovieDetailProps) => {
  const { movie } = route.params;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const heartScale = useRef(new Animated.Value(1)).current;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      const favorites = await AsyncStorage.getItem("favorites");
      const favList = favorites ? JSON.parse(favorites) : [];
      setIsFavorite(favList.some((fav: Movie) => fav.id === movie.id));
    };
    checkFavorite();

    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [movie.id, slideAnim, fadeAnim]);

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

    // Trigger heart pop animation
    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(heartScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${
              movie.backdrop_path || movie.poster_path
            }`,
          }}
          style={styles.backdrop}
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={toggleFavorite}
        >
          <Animated.View
            style={[
              styles.favoriteCircle,
              { transform: [{ scale: heartScale }] },
            ]}
          >
            <MaterialIcons
              name={isFavorite ? "favorite" : "favorite-border"}
              size={24}
              color={isFavorite ? Colors.RED : Colors.MEDIUM_GRAY}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[
          styles.content,
          { transform: [{ translateY: slideAnim }], opacity: fadeAnim },
        ]}
      >
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.date}>
          {Strings.RELEASE_DATE_LABEL}
          {movie.release_date}
        </Text>
        <Text style={styles.rating}>
          {Strings.RATING_LABEL}
          {movie.vote_average.toFixed(1)}
        </Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </Animated.View>
    </ScrollView>
  );
};
