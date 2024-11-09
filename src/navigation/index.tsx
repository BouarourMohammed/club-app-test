// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import ClubDetailsScreen from "../screens/ClubDetailsScreen";
import AddClubScreen from "../screens/AddClubScreen";
import { store } from "../store";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ClubDetails" component={ClubDetailsScreen} />
          <Stack.Screen
            name="AddClub"
            component={AddClubScreen}
            options={{ presentation: "formSheet" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default RootNavigator;
