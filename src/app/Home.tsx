import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import styles from '@/styles/homeStyle';
// Tipos para as propriedades de navegação
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Game: { health: number; playerAmmount: number };
  SearchCard: undefined; 
};

type HomeProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeProps) {
  const [playerCount, setPlayerCount] = useState(2);
  const [initialLife, setInitialLife] = useState(20);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.counterWrapper}>
          <Text style={styles.label}>Player QTY: {playerCount}</Text>
          <TouchableOpacity onPress={() => setPlayerCount(Math.max(1, playerCount - 1))} style={styles.buttonLess}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPlayerCount(playerCount + 1)} style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.counterWrapper}>
        <Text style={styles.label}>Initial Life:</Text>
        <Text style={styles.count}>{initialLife}</Text>
        <TouchableOpacity onPress={() => setInitialLife(Math.max(1, initialLife - 1))} style={styles.buttonLess}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setInitialLife(initialLife + 1)} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Game', { health: initialLife, playerAmmount: playerCount })} style={styles.startButton}>
        <Text style={styles.startButtonText}>Start Game</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SearchCard')} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search Card</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
