import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  imageContainer: {
    position: "relative",
  },
  backdrop: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  favoriteCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.WHITE,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: Colors.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  content: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    elevation: 5,
    shadowColor: Colors.SHADOW,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.DARK_GRAY,
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: Colors.MEDIUM_GRAY,
    marginBottom: 5,
  },
  rating: {
    fontSize: 16,
    color: Colors.MEDIUM_GRAY,
    marginBottom: 15,
  },
  overview: {
    fontSize: 16,
    color: Colors.DARK_GRAY,
    lineHeight: 24,
  },
});
