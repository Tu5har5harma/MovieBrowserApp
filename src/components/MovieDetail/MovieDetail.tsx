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
        <Text style={styles.date}>Release Date: {movie.release_date}</Text>
        <Text style={styles.rating}>
          Rating: {movie.vote_average.toFixed(1)}
        </Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  backdrop: { width: "100%", height: 250, resizeMode: "cover" },
  content: {
    padding: 15,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 10 },
  date: { fontSize: 16, color: "#666", marginBottom: 5 },
  rating: { fontSize: 16, color: "#666", marginBottom: 15 },
  overview: { fontSize: 16, color: "#333", lineHeight: 24 },
});
