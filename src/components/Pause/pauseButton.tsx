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
          source={require('../../../assets/images/pause-button.png')}
          style={styles.button}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50, // Espaçamento a partir do topo
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 50, // Largura do botão
    height: 50, // Altura do botão
  },
});

export default PauseButton;
