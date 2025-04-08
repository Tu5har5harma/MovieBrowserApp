import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import MovieListScreen from "../screens/MovieListScreen/MovieListScreen";
import SearchScreen from "../screens/SearchScreen/SearchScreen";
import FavoritesScreen from "../screens/FavoritesScreen/FavoritesScreen";
import MovieDetail from "../components/MovieDetail/MovieDetail";
import { Strings } from "../constants/Strings";
import { Colors } from "../constants/Colors";
import { Movie } from "../types/movie";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

type RootStackParamList = {
  Home: undefined;
  MovieDetail: { movie: Movie };
  Favorites: undefined;
};

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: Colors.BLUE,
      tabBarInactiveTintColor: Colors.MEDIUM_GRAY,
      tabBarStyle: { backgroundColor: Colors.WHITE, paddingBottom: 5 },
      headerShown: false,
    }}
  >
    <Tab.Screen
      name={Strings.TAB_NOW_PLAYING}
      component={MovieListScreen}
      initialParams={{ endpoint: "/movie/now_playing" }}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="play-circle-outline" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name={Strings.TAB_POPULAR}
      component={MovieListScreen}
      initialParams={{ endpoint: "/movie/popular" }}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="star" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name={Strings.TAB_TOP_RATED}
      component={MovieListScreen}
      initialParams={{ endpoint: "/movie/top_rated" }}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="thumb-up" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name={Strings.TAB_UPCOMING}
      component={MovieListScreen}
      initialParams={{ endpoint: "/movie/upcoming" }}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="event" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="search" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Movie Browser",
          headerStyle: { backgroundColor: Colors.WHITE },
          headerTintColor: Colors.DARK_GRAY,
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate("Favorites")}
            >
              <MaterialIcons name="favorite" size={28} color={Colors.RED} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{
          headerShown: true,
          headerTitle: Strings.MOVIE_DETAILS_TITLE,
          headerStyle: { backgroundColor: Colors.WHITE },
          headerTintColor: Colors.DARK_GRAY,
          headerTitleAlign: "center",
          headerBackTitle: "",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          headerShown: true,
          headerTitle: "Favorites",
          headerStyle: { backgroundColor: Colors.WHITE },
          headerTintColor: Colors.DARK_GRAY,
          headerTitleAlign: "center",
          headerBackTitle: "",
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
