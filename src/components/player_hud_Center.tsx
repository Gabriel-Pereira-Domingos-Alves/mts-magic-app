import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface PlayerHudProps {
  commanderMode: string;
  index: number;
  initialHealth: number;
  commanderAction: (index: number) => void;
}

const PlayerHud_Center: React.FC<PlayerHudProps> = ({
  commanderMode,
  index,
  initialHealth,
  commanderAction,
}) => {
  const [health, setHealth] = useState(initialHealth);

  const decrementHealth = () => {
    setHealth(health - 1);
  };

  const incrementHealth = () => {
    setHealth(health + 1);
  };

  const renderCommanderWrapper = () => {
    const flexViewContent = (
      <>
        <View style={styles.flexView}>
          <TouchableOpacity style={styles.button} onPress={decrementHealth}>
            <Text style={styles.text}>-</Text>
          </TouchableOpacity>
          <Text style={styles.text}>{health}</Text>
          <TouchableOpacity style={styles.button} onPress={incrementHealth}>
            <Text style={styles.text}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flexView}>
          <TouchableOpacity style={styles.button} onPress={() => commanderAction(index)}>
            <Image source={require('../../assets/images/shield.png')} style={styles.image} />
          </TouchableOpacity>
          <Image source={require('../../assets/images/rune.png')} style={styles.image} />
        </View>
      </>
    );

    if (commanderMode === 'deal-damage') {
      return <View style={styles.dealDamageView}>{flexViewContent}</View>;
    } else if (commanderMode === 'take-damage') {
      return <View style={styles.takeDamageView}>{flexViewContent}</View>;
    } else {
      return flexViewContent; // Render flexView directly
    }
  };

  return (
    <View style={styles.parentView}>
      {renderCommanderWrapper()}
    </View>
  );
};

const styles = StyleSheet.create({
  parentView: {
    display: 'flex',
    borderRadius: 12,
    //width: "80%",
  },
  flexView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  text: {
    fontSize: 60,
    color: '#333',
    fontWeight: 'bold',
  },
  button: {
    cursor: 'pointer',
  },
  image: {
    width: 20,
    height: 20,
  },
  dealDamageView: {
    backgroundColor: 'black', // Semitransparent red
    borderRadius: 5,
    margin: 5,
  },
  takeDamageView: {
    backgroundColor: 'rgb(255, 255, 255)', // Semitransparent blue
    borderRadius: 12,
    width: "100%",
  },
});

export default PlayerHud_Center;
