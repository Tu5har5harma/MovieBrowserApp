import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import NowPlayingScreen from "../screens/NowPlayingScreen";
import PopularScreen from "../screens/PopularScreen";
import TopRatedScreen from "../screens/TopRatedScreen";
import UpcomingScreen from "../screens/UpcomingScreen";
import MovieDetail from "../components/MovieDetail/MovieDetail";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Now Playing" component={NowPlayingScreen} />
    <Tab.Screen name="Popular" component={PopularScreen} />
    <Tab.Screen name="Top Rated" component={TopRatedScreen} />
    <Tab.Screen name="Upcoming" component={UpcomingScreen} />
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
        options={{ title: "Movie Details" }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
