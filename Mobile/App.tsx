/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useRef, useCallback } from 'react';
import {
  StyleSheet,
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
import { join } from "redux-saga/effects";
import { useInjection } from "./src/injection/useInjection";
import { HomeScreen } from "./src/tabs/HomeScreen";
import  MapScreen from "./src/tabs/MapScreen";
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
  
              if (route.name === Localizer.getString(language, StringId.Home_Tab)) {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } else if (route.name === Localizer.getString(language, StringId.Map_Tab)) {
                iconName = focused ? 'navigate-circle' : 'navigate-circle-outline';
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

/**
 <Provider store={reduxStore}>
 
    </Provider>
 */

/*
const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}; */

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
