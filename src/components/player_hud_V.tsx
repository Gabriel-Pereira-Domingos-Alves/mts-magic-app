// src/components/PlayerHud_V.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import PlayerHud_Center from './player_hud_Center';

interface PlayerHudProps {
  index: number;
  health: number;
  rotation: string;
  color: string;
}

const PlayerHud_V: React.FC<PlayerHudProps> = ({ index, health, rotation, color }) => {

  const containerStyle: ViewStyle = {
    flex: 1,
    //transform: [{ rotate: `${rotation}deg` }],
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: color,
    height: "100%",
  };
  const insideViewStyle: ViewStyle = {
    transform: [{rotate: `${rotation}deg`}],
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }

  return (
    <View style={containerStyle}>
      <View style={insideViewStyle}>
      <PlayerHud_Center index={index} initialHealth={health}  />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default PlayerHud_V;
