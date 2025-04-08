import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LIGHT_GRAY,
  },
  header: {
    paddingTop: 10,
    backgroundColor: Colors.LIGHT_GRAY,
  },
  input: {
    height: 50,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    marginBottom: 4,
    backgroundColor: Colors.WHITE,
    borderRadius: 25,
    fontSize: 16,
    elevation: 2,
    shadowColor: Colors.SHADOW,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: Colors.MEDIUM_GRAY,
    marginTop: 10,
  },
});
