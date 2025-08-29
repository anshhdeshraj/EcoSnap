import React, { useState } from 'react';
import { View, StatusBar, Platform, Text } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import PreviewScreen from './screens/PreviewScreen';
import ProcessingScreen from './screens/ProcessingScreen';
import ResultsScreen from './screens/ResultsScreen'; 

// SafeAreaView component
const SafeAreaView = ({ children, style }) => {
  const statusBarHeight = Platform.OS === 'ios' ? Constants.statusBarHeight : (StatusBar.currentHeight || 0);

  return (
    <View style={[{
      flex: 1,
      paddingTop: statusBarHeight,
      backgroundColor: '#000000'
    }, style]}>
      {children}
    </View>
  );
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [screenParams, setScreenParams] = useState({});

  const navigate = (screen, params = {}) => {
    console.log('Navigating to:', screen, params); // Debug log
    setScreenParams(params);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    console.log('Going back to Home'); // Debug log
    setCurrentScreen('Home');
    setScreenParams({});
  };

  const renderScreen = () => {
    const navigation = { navigate, goBack };
    const route = { params: screenParams };

    console.log('Rendering screen:', currentScreen); // Debug log

    try {
      switch (currentScreen) {
        case 'Home':
          return <HomeScreen navigation={navigation} route={route} />;
        case 'Camera':
          return <CameraScreen navigation={navigation} route={route} />;
        case 'Preview':
          return <PreviewScreen navigation={navigation} route={route} />;
        case 'Processing':
          return <ProcessingScreen navigation={navigation} route={route} />;
        case 'Results': // Add this case
          return <ResultsScreen navigation={navigation} route={route} />;
        default:
          return <HomeScreen navigation={navigation} route={route} />;
      }
    } catch (error) {
      console.error('Error rendering screen:', error);
      // Fallback UI
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
          <Text style={{ color: '#fff', fontSize: 16 }}>Error loading screen</Text>
          <Text style={{ color: '#fff', fontSize: 12, marginTop: 10 }}>{error.message}</Text>
        </View>
      );
    }
  };

  console.log('App rendering, current screen:', currentScreen); // Debug log

  return (
    <SafeAreaView>
      <ExpoStatusBar style="light" backgroundColor="#000000" />
      {renderScreen()}
    </SafeAreaView>
  );
}