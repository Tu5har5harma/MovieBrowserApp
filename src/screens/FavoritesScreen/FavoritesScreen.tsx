import React, { useState, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MovieCard from "../../components/MovieCard/MovieCard";
import { Movie } from "../../types/movie";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./FavoritesScreenStyles";
import { Strings } from "../../constants/Strings";

export default () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadFavorites = async () => {
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

  const handleFavoriteToggle = (toggledMovie: Movie, isFavorite: boolean) => {
    setFavorites((prev) =>
      isFavorite
        ? [...prev, { ...toggledMovie, isFavorite }]
        : prev.filter((fav) => fav.id !== toggledMovie.id)
    );
  };

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.noFavoritesText}>{Strings.NO_MOVIES_FOUND}</Text>
      ) : (
        <FlatList
          data={favorites}
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
