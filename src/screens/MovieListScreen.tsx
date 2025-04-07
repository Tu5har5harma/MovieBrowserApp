import React, { useState, useEffect } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { fetchMovies } from "../api/tmdb";
import MovieCard from "../components/MovieCard/MovieCard";
import { Movie } from "../types/movie";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./ScreenStyles";

interface MovieListScreenProps {
  route: { params: { endpoint: string } };
}

export default ({ route }: MovieListScreenProps) => {
  const { endpoint } = route.params;
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchMovies(endpoint)
      .then((data) => setMovies(data))
      .catch(() => setMovies([]))
      .finally(() => setLoading(false));
  }, [endpoint]);

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
      showsVerticalScrollIndicator={false}
    />
  );
};
