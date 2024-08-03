import React from 'react';
import { View } from 'react-native';
import PlayerHud_H from '@/components/player_hud_H';
import PlayerHud_V from '@/components/player_hud_V';
import styles from '@/styles/game.styles';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
type GameProps = {
    route: RouteProp<RootStackParamList, 'Game'>;
  };

const Game: React.FC<GameProps> = ({ route }) => {
  const { playerAmmount, health } = route.params;
const colors = ['#ff9999', '#99ccff', '#99ff99', '#ffff99'];
  const renderHuds = () => {
    if (playerAmmount === 2) {
      return (
        <>
        <PlayerHud_H key={2} index={2} health={health} flex={1} rotation='180' color={colors[0]} />
        <PlayerHud_H key={1} index={1} health={health} flex={1} rotation='0' color={colors[1]}/>
      </>
      );
     } else if (playerAmmount === 3) {
      return (
        <>
          <View style={[styles.row, {flex: 1}]}>
            <PlayerHud_V key={3} index={3} health={health} rotation='90' color={colors[0]} />
            <PlayerHud_V key={2} index={2} health={health} rotation='-90' color={colors[1]} />
          </View>
        <PlayerHud_H key={1} index={1} health={health} flex={1} rotation='0' color={colors[2]}/>
        </>
      );
    } else if (playerAmmount === 4) {
      return (
        <>
            <View style={[styles.row, {flex: 1}]}>
                <PlayerHud_V key={4} index={4} health={health} rotation='90' color={colors[0]} />
                <PlayerHud_V key={3} index={3} health={health} rotation='-90' color={colors[1]} />
            </View>
            <View style={[styles.row, {flex: 1}]}>
                <PlayerHud_V key={2} index={2} health={health} rotation='90' color={colors[2]} />
                <PlayerHud_V key={1} index={1} health={health} rotation='-90' color={colors[3]} />
            </View>
        </>
      );
    } // else {
    //   // Pode adicionar mais lógica para mais de 4 jogadores
    //   return null;
    // }
  };

  return <View style={styles.container}>{renderHuds()}</View>;
};


export default Game;
