import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Movie } from "../../types/movie";
import { styles } from "./MovieCardStyles";

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
