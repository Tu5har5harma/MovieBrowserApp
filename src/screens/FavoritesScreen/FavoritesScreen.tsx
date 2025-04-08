import React, { useState, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MovieCard from "../../components/MovieCard/MovieCard";
import SortComponent, {
  SortType,
} from "../../components/SortComponent/SortComponent";
import { Movie } from "../../types/movie";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./FavoritesScreenStyles";
import { Strings } from "../../constants/Strings";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  MovieDetail: { movie: Movie };
};

interface FavoritesScreenProps {}

const FavoritesScreen: React.FC<FavoritesScreenProps> = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [sortType, setSortType] = useState<SortType | null>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const loadFavorites = async (): Promise<void> => {
      const stored = await AsyncStorage.getItem("favorites");
      const favList = stored ? JSON.parse(stored) : [];
      setFavorites(
        favList.map((movie: Movie) => ({ ...movie, isFavorite: true }))
      );
    };
    loadFavorites();

    const unsubscribe = navigation.addListener("focus", loadFavorites);
    return unsubscribe;
  }, [navigation]);

  const handleFavoriteToggle = (
    toggledMovie: Movie,
    isFavorite: boolean
  ): void => {
    setFavorites((prev) =>
      isFavorite
        ? [...prev, { ...toggledMovie, isFavorite }]
        : prev.filter((fav) => fav.id !== toggledMovie.id)
    );
  };

  const sortedFavorites = [...favorites].sort((a, b) => {
    if (!sortType) return 0;
    switch (sortType) {
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {sortedFavorites.length > 0 && (
          <SortComponent
            sortType={sortType}
            onSortChange={setSortType}
            excludeSorts={["liked"]}
          />
        )}
      </View>
      {sortedFavorites.length === 0 ? (
        <Text style={styles.noFavoritesText}>{Strings.NO_MOVIES_FOUND}</Text>
      ) : (
        <FlatList
          data={sortedFavorites}
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
        />
      )}
    </View>
  );
};

export default FavoritesScreen;
