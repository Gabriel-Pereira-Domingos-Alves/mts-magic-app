// src/components/PlayerHud_H.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ViewStyle, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface PlayerHudProps {
  index: number;
  initialHealth: number;
}

const PlayerHud_Center: React.FC<PlayerHudProps> = ({ index, initialHealth  }) => {

    const [health, setHealth] = useState(initialHealth);

    const decrementHealth = () => {
      setHealth(health - 1);
    };
  
    const incrementHealth = () => {
      setHealth(health + 1);
    };
  return (
    <View style={styles.parentView}>
        <View style={styles.flexView}>
            {/* <Text style={styles.text}>Jogador {index}</Text> */}
            <TouchableOpacity style={styles.button} onPress={decrementHealth}>
                <Text style={styles.text}>-</Text>
            </TouchableOpacity>
            <Text style={styles.text}>{health}</Text>
            <TouchableOpacity style={styles.button} onPress={incrementHealth}>
                <Text style={styles.text}>+</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.flexView}>
            <Image 
            source={require('../../assets/images/shield.png')} 
            style={styles.image} 
            />
            <Image 
            source={require('../../assets/images/rune.png')} 
            style={styles.image} 
            />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    parentView: {
        display: "flex",
        width: "100%",
        height: "100%",
    },
    flexView: {
        display: "flex",

        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
    },
  text: {
    fontSize: 60,
    color: '#333',
    fontWeight: "bold",
  },
  button: {
    cursor: "pointer",
  },
  image: {
    width: 20,
    height: 20,
  },
});

export default PlayerHud_Center;
