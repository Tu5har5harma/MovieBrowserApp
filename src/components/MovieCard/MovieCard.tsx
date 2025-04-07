import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Movie } from "../../types/movie";

interface MovieCardProps {
  movie: Movie;
  onPress: () => void;
}

export default ({ movie, onPress }: MovieCardProps) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image
      source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
      style={styles.poster}
    />
    <View style={styles.info}>
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.date}>{movie.release_date}</Text>
      <Text style={styles.rating}>Rating: {movie.vote_average.toFixed(1)}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 8,
  },
  poster: { width: 100, height: 150, borderRadius: 5 },
  info: { flex: 1, paddingLeft: 10 },
  title: { fontSize: 16, fontWeight: "bold", color: "#333" },
  date: { fontSize: 14, color: "#666" },
  rating: { fontSize: 14, color: "#666" },
});
