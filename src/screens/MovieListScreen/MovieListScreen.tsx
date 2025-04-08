import React, { useState, useEffect } from "react";
import {
  FlatList,
  ActivityIndicator,
  View,
  TextInput,
  Text,
} from "react-native";
import { fetchMovies, searchMovies } from "../../api/tmdb";
import MovieCard from "../../components/MovieCard/MovieCard";
import { Movie } from "../../types/movie";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./MovieListScreenStyles";
import { Colors } from "../../constants/Colors";
import { Strings } from "../../constants/Strings";

interface MovieListScreenProps {
  route: { params: { endpoint: string } };
}

export default ({ route }: MovieListScreenProps) => {
  const { endpoint } = route.params;
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const isSearch = endpoint.includes("/search/movie");
        const data = isSearch
          ? await searchMovies(endpoint.split("query=")[1])
          : await fetchMovies(endpoint);
        setMovies(data);
        setFilteredMovies(data);
      } catch {
        setMovies([]);
        setFilteredMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  useEffect(() => {
    const filtered = query
      ? movies.filter((movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase())
        )
      : movies;
    setFilteredMovies(filtered);
  }, [query, movies]);

  return (
    <View style={styles.container}>
      {!endpoint.includes("/search/movie") && (
        <TextInput
          style={styles.input}
          placeholder={Strings.CATEGORY_SEARCH_PLACEHOLDER}
          placeholderTextColor={Colors.DARK_GRAY}
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          returnKeyType="search"
        />
      )}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : filteredMovies.length === 0 ? (
        <Text style={styles.noMoviesText}>{Strings.NO_MOVIES_FOUND}</Text>
      ) : (
        <FlatList
          data={filteredMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onPress={() =>
                navigation.navigate("MovieDetail", { movie: item })
              }
            />
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};
