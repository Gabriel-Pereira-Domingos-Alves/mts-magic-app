// src/components/PlayerHud_H.tsx
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import PlayerHud_Center from './player_hud_Center';

interface PlayerHudProps {
  commanderMode: string;
  index: number;
  health: number;
  flex: number;
  rotation: string;
  color: string;
  commanderAction: (index: number) => void;
}

const PlayerHud_H: React.FC<PlayerHudProps> = ({ commanderMode, index, health, flex, rotation, color, commanderAction }) => {
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
      <PlayerHud_Center commanderMode={commanderMode} index={index} initialHealth={health} commanderAction={commanderAction} />
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
