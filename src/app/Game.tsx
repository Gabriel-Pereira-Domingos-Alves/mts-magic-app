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

type GameProps = {
    route: RouteProp<RootStackParamList, 'Game'>;
    navigation: StackNavigationProp<RootStackParamList, 'Game'>;
  };

const Game: React.FC<GameProps> = ({ route, navigation }) => {
  const { playerAmmount, health } = route.params;
  const colors = ['#ff9999', '#99ccff', '#99ff99', '#ffff99'];
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [commanderMode, setCommanderMode] = useState(false);

  const commanderAction = (index: number) => {
    if(commanderMode){
      setCommanderMode(false);
    } else{
      setActiveIndex(index);
      setCommanderMode(true);
    }
  }

  const chooseCommandeState = (index: number) => {
    if(commanderMode && activeIndex === index){
      return "take-damage";
    } else if(commanderMode && activeIndex !== index) {
      return "deal-damage";
    } else{
      return "nil";
    }
  }
  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const returnToMenu = () => {
    navigation.navigate('Home');
  }

  const renderHuds = () => {
    if (playerAmmount === 2) {
      return (
        <>
        <PlayerHud_H commanderMode={chooseCommandeState(2)} index={2} health={health} flex={1} rotation='180' color={colors[0]} commanderAction={commanderAction} />
        <PlayerHud_H commanderMode={chooseCommandeState(1)} index={1} health={health} flex={1} rotation='0' color={colors[1]} commanderAction={commanderAction}/>
      </>
      );
     } else if (playerAmmount === 3) {
      return (
        <>
          <View style={[styles.row, {flex: 1}]}>
            <PlayerHud_V key={3} index={3} health={health} rotation='90' color={colors[0]} commanderAction={commanderAction}/>
            <PlayerHud_V key={2} index={2} health={health} rotation='-90' color={colors[1]} commanderAction={commanderAction}/>
          </View>
        <PlayerHud_H commanderMode={chooseCommandeState(1)} key={1} index={1} health={health} flex={1} rotation='0' color={colors[2]} commanderAction={commanderAction}/>
        </>
      );
    } else if (playerAmmount === 4) {
      return (
        <>
            <View style={[styles.row, {flex: 1}]}>
                <PlayerHud_V key={4} index={4} health={health} rotation='90' color={colors[0]} commanderAction={commanderAction}/>
                <PlayerHud_V key={3} index={3} health={health} rotation='-90' color={colors[1]} commanderAction={commanderAction}/>
            </View>
            <View style={[styles.row, {flex: 1}]}>
                <PlayerHud_V key={2} index={2} health={health} rotation='90' color={colors[2]} commanderAction={commanderAction}/>
                <PlayerHud_V key={1} index={1} health={health} rotation='-90' color={colors[3]} commanderAction={commanderAction}/>
            </View>
        </>
      );
    } // else {
    //   // Pode adicionar mais lógica para mais de 4 jogadores
    //   return null;
    // }
  };

  return (
    <View style={styles.container}>
      {renderHuds()}
      <Dice />
      <PauseButton onPause={handlePause} />
      {isPaused && <PauseScreen onResume={handleResume} onReturn={returnToMenu}/>}
    </View>
  );
};


export default Game;
