import react from 'react';
import { StatusBar } from 'react-native';

import Progress from './screens/Progress';
import LeaderBoard from './screens/LeaderBoard';

import { NavigationContainer } from '@react-navigation/native';
import AuthStackNav from './navigation/AuthStackNav';
import { useFonts } from 'expo-font';
import TabNav from './navigation/TabNav';
import UserProvider from './utils/providers/UserProvider';


export default function App() {
  const [fontsLoaded] = useFonts({
    'Pacman': require('./assets/pacman.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <UserProvider>
      <NavigationContainer>
        <AuthStackNav />
        {/* <TabNav /> */}
        {/* <StatusBar /> */}
      </NavigationContainer>
    </UserProvider>
  );
}