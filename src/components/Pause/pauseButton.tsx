// src/components/PauseButton.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

interface PauseButtonProps {
    onPause: () => void;
  }

const PauseButton: React.FC<PauseButtonProps> = ({ onPause }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPause}>
        <ImageBackground
          source={require('../../../assets/images/config.png')}
          style={styles.button}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 30,
    //right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: "box-none",
  },
  button: {
    width: 35, // Largura do botão
    height: 35, // Altura do botão
  },
});

export default PauseButton;
