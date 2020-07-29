/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StatusBar,
} from 'react-native';
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from "react-native-safe-area-context";


import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { Provider, useSelector } from "react-redux";

import { InjectionProvider } from './src/injection/InjectionProvider';
import { UnhcrContainer } from './src/injection/container';
import { initStore } from './src/redux/store';
import { HomeScreen } from "./src/tabs/HomeScreen";
import  MapScreen from "./src/tabs/MapScreen";
import { OrgTableScreen } from './src/tabs/OrgTableScreen';
import { Localizer, SupportedLanguage } from './src/localization/Localizer';
import { StringId } from './src/localization/stringIds';
import { getLanguage } from './src/localization/selectors';

const reduxStore = initStore();
const Tab = createBottomTabNavigator();

const AppContent = () => {
  const language = useSelector(getLanguage);

  return(
    <>
    <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              switch (route.name) {
                case Localizer.getString(language, StringId.Map_Tab):
                  iconName = focused ? 'navigate-circle' : 'navigate-circle-outline';
                  break;
                case Localizer.getString(language, StringId.Service_Tab):
                  iconName = focused ? 'list' : 'list-outline';
                  break;
                case Localizer.getString(language, StringId.Home_Tab):
                default:
                  iconName = focused ? 'home' : 'home-outline';
               }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name={Localizer.getString(language, StringId.Home_Tab)} component={HomeScreen} />
          <Tab.Screen name={Localizer.getString(language, StringId.Map_Tab)} component={MapScreen} />
          <Tab.Screen name={Localizer.getString(language, StringId.Service_Tab)} component={OrgTableScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const App = React.memo(() => (
  <InjectionProvider container={UnhcrContainer}>
    <Provider store={reduxStore}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  </InjectionProvider>
));
App.displayName = "App";

export default App;
