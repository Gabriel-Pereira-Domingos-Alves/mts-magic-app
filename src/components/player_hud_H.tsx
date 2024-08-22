// src/components/PlayerHud_H.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import PlayerHud_Center from './player_hud_Center';

interface PlayerHudProps {
  index: number;
  health: number;
  flex: number;
  color: string;
}

const PlayerHud_H: React.FC<PlayerHudProps> = ({ index, health, flex, color }) => {
  const rotation = index === 1 ? "0" : "180";

  const containerStyleBorder: ViewStyle = {
    flex: flex,
    transform: [{ rotate: `${rotation}deg` }],
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: color,
    width: "100%",
    borderTopColor: "#7c7878",
    borderTopWidth: 9,
  };
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
    <View style={rotation === "0" ? containerStyleBorder : containerStyle}>
      <PlayerHud_Center rotation={rotation} index={index} initialHealth={health} />
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
