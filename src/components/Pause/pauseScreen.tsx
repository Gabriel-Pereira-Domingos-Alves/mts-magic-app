// src/components/PauseScreen.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface PauseScreenProps {
  onResume: () => void;
  onReturn: () => void;
}

const PauseScreen: React.FC<PauseScreenProps> = ({ onResume, onReturn }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onResume} style={styles.resumeButton}>
        <Text style={styles.resumeText}>Resume</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onReturn} style={styles.returnButton}>
        <Text style={styles.returnText}>Return to menu</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fundo preto com transparência
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  resumeButton: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  returnButton: {
    padding: 10,
    backgroundColor: "black",
    borderRadius: 5
  },
  returnText: {
    fontSize: 18,
    color:'white',
  },
  resumeText: {
    fontSize: 18,
    color: 'black',
  },
});

export default PauseScreen;
