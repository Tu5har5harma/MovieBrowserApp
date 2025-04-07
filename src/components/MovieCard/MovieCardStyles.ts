import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: Colors.WHITE,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
    shadowColor: Colors.SHADOW,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  info: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.DARK_GRAY,
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: Colors.MEDIUM_GRAY,
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    color: Colors.MEDIUM_GRAY,
  },
});
