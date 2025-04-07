import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

export const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginVertical: 8,
    overflow: "hidden",
    elevation: 4,
    shadowColor: Colors.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  gradient: {
    flexDirection: "row",
    padding: 10,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.DARK_GRAY,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: Colors.MEDIUM_GRAY,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    color: Colors.MEDIUM_GRAY,
    marginLeft: 4,
  },
});
