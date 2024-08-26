import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import initialize from 'react-native-google-mobile-ads';
import HomeScreen from '@/app/Home';
import SearchCards from '@/app/Search';
import Game from '@/app/Game';

export type RootStackParamList = {
  Home: undefined;
  SearchCard: undefined;
  Game: { health: number; playerAmmount: number };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  React.useEffect(() => {
    // Inicializa o AdMob
    initialize();
    console.log('AdMob Initialized');
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SearchCard" component={SearchCards} />
        <Stack.Screen name="Game" component={Game} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
