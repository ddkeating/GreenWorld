import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ArticlesScreen from "../screens/application-stack/ArticlesScreen";
import ArticleViewScreen from "../screens/application-stack/ArticleViewScreen";

const Stack = createStackNavigator();

const ArticlesNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
      headerStyle: {
        backgroundColor: color.primary,
      },
      headerTintColor: color.white,
    }}
  >
    <Stack.Screen name="Articles" component={ArticlesScreen} />
    <Stack.Screen name="ArticleView" component={ArticleViewScreen} />
  </Stack.Navigator>
);

export default ArticlesNavigator;
