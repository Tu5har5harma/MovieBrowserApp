import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.LIGHT_GRAY },
  header: {
    paddingTop: 10,
    backgroundColor: Colors.LIGHT_GRAY,
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  flatList: {
    flex: 1,
  },
  noFavoritesText: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    color: Colors.MEDIUM_GRAY,
    paddingTop: 20,
  },
});
