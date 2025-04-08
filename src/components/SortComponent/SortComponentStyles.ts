import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

export const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: Colors.WHITE,
    marginRight: 10,
    elevation: 2,
    shadowColor: Colors.SHADOW,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    height: 35,
  },
  activeButton: {
    backgroundColor: Colors.BLUE,
  },
  text: {
    fontSize: 14,
    color: Colors.DARK_GRAY,
    textAlign: "center",
  },
  activeText: {
    color: Colors.WHITE,
  },
});
