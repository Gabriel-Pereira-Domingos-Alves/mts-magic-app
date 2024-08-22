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

const PlayerHud_V: React.FC<PlayerHudProps> = ({index, health, rotation, color }) => {

  const containerStyleBorder: ViewStyle = {
    flex: 1,
    //transform: [{ rotate: `${rotation}deg` }],
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color,
    borderLeftWidth: 9,
    borderLeftColor: "#7c7878",
    //height: "100%",
  };
  const containerStyle: ViewStyle = {
    flex: 1,
    //transform: [{ rotate: `${rotation}deg` }],
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color,
    //height: "100%",
  };
  const insideViewStyle: ViewStyle = {
    //width: "100%",
    height: "40%",
    width: "150%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: [{rotate: `${rotation}deg`}],
    //transform: [{rotate: "-90deg"}],
  }

  return (
    <View style={rotation === "90" ? containerStyle : containerStyleBorder}>
      <View style={insideViewStyle}>
        <PlayerHud_Center rotation={rotation} index={index} initialHealth={health}/>
      </View>
    </View>
  );
};



export default PlayerHud_V;
