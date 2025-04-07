import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { Movie } from "../../types/movie";

interface MovieDetailProps {
  route: { params: { movie: Movie } };
}

export default ({ route }: MovieDetailProps) => {
  const { movie } = route.params;
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
      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.date}>Release Date: {movie.release_date}</Text>
        <Text style={styles.rating}>
          Rating: {movie.vote_average.toFixed(1)}
        </Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  backdrop: { width: "100%", height: 250 },
  content: { padding: 15 },
  title: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 10 },
  date: { fontSize: 16, color: "#666", marginBottom: 5 },
  rating: { fontSize: 16, color: "#666", marginBottom: 15 },
  overview: { fontSize: 16, color: "#333", lineHeight: 24 },
});
