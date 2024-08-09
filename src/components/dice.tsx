// src/components/PlayerHud_H.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Calcular o valor em pixels para 1rem (1rem = 16px geralmente, mas pode variar)
const remToPixels = (rem: number) => rem * 16;

// Pegar as dimensões da tela
const { width, height } = Dimensions.get('window');


const Dice: React.FC = () => {
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);

  const generateRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    setCurrentNumber(randomNumber);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={generateRandomNumber} style={styles.dice}>
        <ImageBackground style={styles.dice} source={require('../../assets/images/dice.png')}>
            <Text style={styles.numberText}>
            {currentNumber !== null ? currentNumber : 'Roll'}
            </Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dice: {
    width: remToPixels(6), // 10rem de largura
    height: remToPixels(6), // 10rem de altura
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: remToPixels(1),
    color: '#fff',
    fontWeight: "bold"
  },
});

export default Dice;
