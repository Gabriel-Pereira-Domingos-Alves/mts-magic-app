import React, { useState } from 'react';
import { View } from 'react-native';
import PlayerHud_H from '@/components/player_hud_H';
import PlayerHud_V from '@/components/player_hud_V';
import styles from '@/styles/game.styles';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import Dice from '@/components/dice';
import PauseButton from '@/components/Pause/pauseButton';
import PauseScreen from '@/components/Pause/pauseScreen';
import { CommanderProvider } from '@/components/commanderContext';

type GameProps = {
    route: RouteProp<RootStackParamList, 'Game'>;
    navigation: StackNavigationProp<RootStackParamList, 'Game'>;
  };

const Game: React.FC<GameProps> = ({ route, navigation }) => {
  const { playerAmmount, health } = route.params;
  const colors = ['#ff9999', '#8699D8', '#86D8BE', '#CFC980'];
  const [isPaused, setIsPaused] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const returnToMenu = () => {
    navigation.navigate('Home');
  }
  const resetGame = () => {
    setResetKey(prevKey => prevKey + 1);
  }

  const renderHuds = () => {
    if (playerAmmount === 2) {
      return (
        <>
        <PlayerHud_H index={2} health={health} flex={1} color={colors[2]}/>
        <PlayerHud_H index={1} health={health} flex={1} color={colors[0]}/>
      </>
      );
     } else if (playerAmmount === 3) {
      return (
        <>
          <View style={[styles.row, {flex: 1}]}>
            <PlayerHud_V key={3} index={3} health={health} rotation='90' color={colors[3]}/>
            <PlayerHud_V key={2} index={2} health={health} rotation='-90' color={colors[2]}/>
          </View>
        <PlayerHud_H key={1} index={1} health={health} flex={1} color={colors[0]}/>
        </>
      );
    } else if (playerAmmount === 4) {
      return (
        <>
            <View style={[styles.row, {flex: 1}]}>
                <PlayerHud_V key={4} index={4} health={health} rotation='90' color={colors[3]}/>
                <PlayerHud_V key={3} index={3} health={health} rotation='-90' color={colors[2]}/>
            </View>
            <View style={[styles.row, {flex: 1}]}>
                <PlayerHud_V key={2} index={2} health={health} rotation='90' color={colors[0]}/>
                <PlayerHud_V key={1} index={1} health={health} rotation='-90' color={colors[1]}/>
            </View>
        </>
      );
    } // else {
    //   // Pode adicionar mais lógica para mais de 4 jogadores
    //   return null;
    // }
  };

  return (
    <View style={styles.container} key={resetKey}>
      <CommanderProvider>
        {renderHuds()}
      </CommanderProvider>
      <Dice />
      <PauseButton onPause={handlePause} />
      {isPaused && <PauseScreen onResume={handleResume} onReturn={returnToMenu} onReload={resetGame}/>}
    </View>
  );
};


export default Game;
