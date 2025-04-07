import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import NowPlayingScreen from "../screens/NowPlayingScreen";
import PopularScreen from "../screens/PopularScreen";
import TopRatedScreen from "../screens/TopRatedScreen";
import UpcomingScreen from "../screens/UpcomingScreen";
import MovieDetail from "../components/MovieDetail/MovieDetail";
import { Strings } from "../constants/Strings";
import { Colors } from "../constants/Colors";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: Colors.BLUE,
      tabBarInactiveTintColor: Colors.MEDIUM_GRAY,
      tabBarStyle: { backgroundColor: Colors.WHITE, paddingBottom: 5 },
    }}
  >
    <Tab.Screen
      name={Strings.TAB_NOW_PLAYING}
      component={NowPlayingScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="play-circle-outline" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name={Strings.TAB_POPULAR}
      component={PopularScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="star" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name={Strings.TAB_TOP_RATED}
      component={TopRatedScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="thumb-up" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name={Strings.TAB_UPCOMING}
      component={UpcomingScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="event" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{ title: Strings.MOVIE_DETAILS_TITLE }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
