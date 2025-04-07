import React, { useState, useEffect } from "react";
import { FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { fetchMovies } from "../api/tmdb";
import MovieCard from "../components/MovieCard/MovieCard";
import { Movie } from "../types/movie";
import { useNavigation } from "@react-navigation/native";

export default () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchMovies("/movie/top_rated")
      .then(setMovies)
      .catch(() => setMovies([]))
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
  ) : (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <MovieCard
          movie={item}
          onPress={() => navigation.navigate("MovieDetail", { movie: item })}
        />
      )}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  list: { padding: 10 },
});
