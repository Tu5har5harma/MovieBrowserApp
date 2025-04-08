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
import SortComponent, {
  SortType,
} from "../../components/SortComponent/SortComponent";
import { Movie } from "../../types/movie";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./MovieListScreenStyles";
import { Colors } from "../../constants/Colors";
import { Strings } from "../../constants/Strings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  MovieDetail: { movie: Movie };
  Favorites: undefined;
};

interface MovieListScreenProps {
  route: { params: { endpoint: string } };
}

const MovieListScreen: React.FC<MovieListScreenProps> = ({ route }) => {
  const { endpoint } = route.params;
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");
  const [sortType, setSortType] = useState<SortType | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const fetchData = async (
    pageNum: number,
    append: boolean = false
  ): Promise<void> => {
    if (isFetchingMore && append) return;
    setLoading(!append);
    setIsFetchingMore(append);
    try {
      const isSearch = endpoint.includes("/search/movie");
      const data = isSearch
        ? await searchMovies(endpoint.split("query=")[1], pageNum)
        : await fetchMovies(endpoint, pageNum);
      const favorites = await AsyncStorage.getItem("favorites");
      const favList = favorites ? JSON.parse(favorites) : [];
      const updatedMovies = data.results.map((movie: Movie) => ({
        ...movie,
        isFavorite: favList.some((fav: Movie) => fav.id === movie.id),
      }));
      setMovies((prev) =>
        append ? [...prev, ...updatedMovies] : updatedMovies
      );
      setTotalPages(data.total_pages);
      applySortAndFilter(
        append ? [...movies, ...updatedMovies] : updatedMovies,
        sortType,
        query
      );
    } catch (error) {
      setMovies(append ? movies : []);
      setFilteredMovies(append ? filteredMovies : []);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchData(1);
    const unsubscribe = navigation.addListener("focus", () => fetchData(1));
    return unsubscribe;
  }, [endpoint, navigation]);

  const applySortAndFilter = (
    movieList: Movie[],
    sort: SortType | null,
    searchQuery: string
  ): void => {
    let result = [...movieList];
    if (searchQuery) {
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (sort) {
      result.sort((a, b) => {
        switch (sort) {
          case "liked":
            if (a.isFavorite !== b.isFavorite) return a.isFavorite ? -1 : 1;
            break;
          case "release":
            return (
              new Date(b.release_date).getTime() -
              new Date(a.release_date).getTime()
            );
          case "rating":
            return b.vote_average - a.vote_average;
        }
        return 0;
      });
    }
    setFilteredMovies(result);
  };

  useEffect(() => {
    applySortAndFilter(movies, sortType, query);
  }, [query, sortType, movies]);

  const handleFavoriteToggle = (
    toggledMovie: Movie,
    isFavorite: boolean
  ): void => {
    setMovies((prev) =>
      prev.map((movie) =>
        movie.id === toggledMovie.id ? { ...movie, isFavorite } : movie
      )
    );
    applySortAndFilter(
      movies.map((movie) =>
        movie.id === toggledMovie.id ? { ...movie, isFavorite } : movie
      ),
      sortType,
      query
    );
  };

  const handleEndReached = (): void => {
    if (
      !endpoint.includes("/search/movie") &&
      page < totalPages &&
      !isFetchingMore
    ) {
      setPage((prev) => {
        const nextPage = prev + 1;
        fetchData(nextPage, true);
        return nextPage;
      });
    }
  };

  const renderFooter = (): JSX.Element | null => {
    if (!isFetchingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={Colors.BLUE} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
        {filteredMovies.length > 0 && (
          <SortComponent sortType={sortType} onSortChange={setSortType} />
        )}
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.BLUE} style={styles.loader} />
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
          style={styles.flatList}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
    </View>
  );
};

export default MovieListScreen;
