// src/components/PlayerHud_V.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import PlayerHud_Center from './player_hud_Center';

interface PlayerHudProps {
  index: number;
  health: number;
  rotation: string;
  color: string;
  commanderAction: (index: number) => void;
}

const PlayerHud_V: React.FC<PlayerHudProps> = ({ index, health, rotation, color, commanderAction }) => {

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
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: [{rotate: `${rotation}deg`}],
    //transform: [{rotate: "-90deg"}],
  }

  return (
    <View style={containerStyle}>
      <View style={insideViewStyle}>
        <PlayerHud_Center index={index} initialHealth={health} commanderAction={commanderAction}/>
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
