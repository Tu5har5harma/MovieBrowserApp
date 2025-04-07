import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Animated,
  StyleSheet,
} from "react-native";
import { Movie } from "../../types/movie";
import { Strings } from "../../constants/Strings";
import { Colors } from "../../constants/Colors";

interface MovieDetailProps {
  route: { params: { movie: Movie } };
}

export default ({ route }: MovieDetailProps) => {
  const { movie } = route.params;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
  }, [slideAnim, fadeAnim]);

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${
            movie.backdrop_path || movie.poster_path
          }`,
        }}
        style={styles.backdrop}
      />
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.WHITE },
  backdrop: { width: "100%", height: 250, resizeMode: "cover" },
  content: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.DARK_GRAY,
    marginBottom: 10,
  },
  date: { fontSize: 16, color: Colors.MEDIUM_GRAY, marginBottom: 5 },
  rating: { fontSize: 16, color: Colors.MEDIUM_GRAY, marginBottom: 15 },
  overview: { fontSize: 16, color: Colors.DARK_GRAY, lineHeight: 24 },
});
