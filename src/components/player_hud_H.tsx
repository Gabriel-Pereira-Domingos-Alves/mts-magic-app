// src/components/PlayerHud_H.tsx
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import PlayerHud_Center from './player_hud_Center';

interface PlayerHudProps {
  index: number;
  health: number;
  flex: number;
  rotation: string;
  color: string;
}

const PlayerHud_H: React.FC<PlayerHudProps> = ({ index, health, flex, rotation, color }) => {
  const containerStyle: ViewStyle = {
    flex: flex,
    transform: [{ rotate: `${rotation}deg` }],
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: color,
    width: "100%",
  };

  return (
    <View style={containerStyle}>
      <PlayerHud_Center index={index} initialHealth={health}  />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default PlayerHud_H;
