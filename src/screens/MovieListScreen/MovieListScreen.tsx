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
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const fetchData = async () => {
    setLoading(true);
    try {
      const isSearch = endpoint.includes("/search/movie");
      const data = isSearch
        ? await searchMovies(endpoint.split("query=")[1])
        : await fetchMovies(endpoint);
      const favorites = await AsyncStorage.getItem("favorites");
      const favList = favorites ? JSON.parse(favorites) : [];
      const updatedMovies = data.map((movie) => ({
        ...movie,
        isFavorite: favList.some((fav: Movie) => fav.id === movie.id),
      }));
      setMovies(updatedMovies);
      setFilteredMovies(
        query
          ? updatedMovies.filter((movie) =>
              movie.title.toLowerCase().includes(query.toLowerCase())
            )
          : updatedMovies
      );
    } catch {
      setMovies([]);
      setFilteredMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const unsubscribe = navigation.addListener("focus", fetchData);
    return unsubscribe;
  }, [endpoint, navigation]);

  useEffect(() => {
    const filtered = query
      ? movies.filter((movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase())
        )
      : movies;
    setFilteredMovies(filtered);
  }, [query, movies]);

  const handleFavoriteToggle = (toggledMovie: Movie, isFavorite: boolean) => {
    setMovies((prev) =>
      prev.map((movie) =>
        movie.id === toggledMovie.id ? { ...movie, isFavorite } : movie
      )
    );
    setFilteredMovies((prev) =>
      query
        ? prev
            .map((movie) =>
              movie.id === toggledMovie.id ? { ...movie, isFavorite } : movie
            )
            .filter((movie) =>
              movie.title.toLowerCase().includes(query.toLowerCase())
            )
        : prev.map((movie) =>
            movie.id === toggledMovie.id ? { ...movie, isFavorite } : movie
          )
    );
  };

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
              onFavoriteToggle={handleFavoriteToggle}
            />
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};
