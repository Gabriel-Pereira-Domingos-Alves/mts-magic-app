import React, { useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import styles from '@/styles/homeStyle';
import { StackNavigationProp } from '@react-navigation/stack';

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

  const handlePlayerCountChange = (value: number) => {
    setPlayerCount(prevCount => {
      const newCount = prevCount + value;
      return Math.min(Math.max(newCount, 2), 4);
    })
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('@/assets/image_Back.png')} style={styles.background} resizeMode='cover'>
        <View style={styles.content}>
          <View style={styles.header}>
            <Image source={require('@/assets/Logo.png')} style={styles.logo} />
          </View>
          <View style={styles.counterWrapper}>
              <Text style={styles.label}>Player QTY: {playerCount}</Text>
              <TouchableOpacity onPress={() => handlePlayerCountChange(-1)} style={styles.buttonLess}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePlayerCountChange(1)} style={styles.button}>
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
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
