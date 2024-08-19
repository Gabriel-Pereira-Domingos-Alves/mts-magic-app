import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useCommander } from "./commanderContext";

interface PlayerHudProps {
  index: number;
  initialHealth: number;
}

const PlayerHud_Center: React.FC<PlayerHudProps> = ({
  index,
  initialHealth,
}) => {
  const {
    sendEvent,
    onEvent,
    updateCommanderActionDamage,
    commanderActionDamage,
    resetCommanderActionDamage,
    startProcessing,
    finishProcessing,
    processingCount, // Acessa o contador
  } = useCommander();
  const [health, setHealth] = useState(initialHealth); // define a vida base do player
  const [shownHealth, setShownHealth] = useState(initialHealth); // define a vida do player calculada com ajustes, poison e commander damage
  const [poisonDamage, setPoisonDamage] = useState(0); // define o quanto de dano poison este player recebeu
  const [commanderDamage, setCommanderDamage] = useState(0); // define o quanto de dano commander este player recebeu
  const [commander, setCommander] = useState(false); // define se este player é o commander
  const [commanderMode, setCommanderMode] = useState("nil"); // define se este player recebe dano ou causa dano
  const [currentCommanderDamage, setCurrentCommanderDamage] = useState(0);
  const [lastCommanderIndex, setLastCommanderIndex] = useState(0);

  useEffect(() => {
    onEvent("start-commander", (triggeredIndex: number) => {
      if (triggeredIndex !== index) {
        setCommanderMode("deal-damage");
        const existingDamage = commanderActionDamage.find(
          (entry) => entry.sourceId === index && entry.targetId === triggeredIndex
        )?.damage || 0;

        const existing = commanderActionDamage.find(
          (entry) => entry.sourceId === index && entry.targetId === triggeredIndex
        )?.damage || 'nao encontrado';
        console.log('EXISTING:', existing, ' meu INDEX é ', index);
        
        if(existingDamage !== 0 || (existingDamage === 0 && triggeredIndex !== lastCommanderIndex)) {
          console.log('Updating current damage: ', existingDamage);
          
          setCurrentCommanderDamage(existingDamage);
        }
        
        setLastCommanderIndex(triggeredIndex);
        // console.log(`I AM INDEX ${index} AND I SHOULD DAMAGE ${triggeredIndex}`);
        // console.log('current commander damage: ', existingDamage);

      } else {
        setCommanderMode("take-damage");
      }
    });

    onEvent("end-commander", (triggeredIndex: number) => {
      startProcessing();
      setCommanderMode("nil");
      if (triggeredIndex !== index) {
        updateCommanderActionDamage(index, triggeredIndex, currentCommanderDamage);
        console.log('updating commander damage: ',currentCommanderDamage);
      }
      finishProcessing();
    });
  }, [index, commanderActionDamage, currentCommanderDamage, lastCommanderIndex]);

  useEffect(() => {
    console.log(processingCount);
    console.log(commander);
    if (commander && processingCount === 0) {
      setCommander(false);
      const totalDamage = commanderActionDamage
        .filter((entry) => entry.targetId === index)
        .reduce((acc, entry) => acc + entry.damage, 0);

      console.log(`Im commander ${index} and I will receive: ${totalDamage}`);
      setCommanderDamage(totalDamage);
      //resetCommanderActionDamage(); // Reseta os danos acumulados
    }
  }, [commanderActionDamage, processingCount]);

  useEffect(() => {
    setShownHealth(health - commanderDamage - poisonDamage);
    console.log(
      "Updating health to: ",
      health - commanderDamage - poisonDamage
    );
  }, [commanderDamage, poisonDamage]);

  const handleCommander = () => {
    if (commander) {
      sendEvent("end-commander", index);
    } else {
      setCommander(true);
      sendEvent("start-commander", index);
    }
  };

  const decrementHealth = () => {
    setShownHealth(health - 1 - commanderDamage - poisonDamage);
    setHealth(health - 1);
  };

  const incrementHealth = () => {
    setShownHealth(health + 1 - commanderDamage - poisonDamage);
    setHealth(health + 1);
  };
  const handleCommanderDamage = (value: number) => {
    setCurrentCommanderDamage(currentCommanderDamage + value);
  }

  const renderCommanderWrapper = () => {
    const flexViewContent = (
      <>
        <View style={styles.flexView}>
          <TouchableOpacity style={styles.button} onPress={decrementHealth}>
            <Text style={styles.text}>-</Text>
          </TouchableOpacity>
          <Text style={styles.text}>{shownHealth}</Text>
          <TouchableOpacity style={styles.button} onPress={incrementHealth}>
            <Text style={styles.text}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flexView}>
          <TouchableOpacity style={styles.button} onPress={handleCommander}>
            <Image
              source={require("../../assets/images/shield.png")}
              style={styles.image}
            />
          </TouchableOpacity>
          <Image
            source={require("../../assets/images/rune.png")}
            style={styles.image}
          />
        </View>
      </>
    );
    const dealDamageContent = (
      <>
        <View style={styles.flexView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleCommanderDamage(-1)}
          >
            <Text style={styles.text}>-</Text>
          </TouchableOpacity>
          <Text style={styles.text}>{currentCommanderDamage}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleCommanderDamage(1)}
          >
            <Text style={styles.text}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flexView}>
          <Image
            source={require("../../assets/images/shield.png")}
            style={styles.image}
          />
        </View>
      </>
    );
    const takeDamageContent = (
      <>
        <View style={styles.flexView}>
          <Text style={styles.textSmall}> commander damage</Text>
        </View>
        <View style={styles.flexView}>
          <Image
            style={styles.imageBig}
            source={require("../../assets/images/shield.png")}
          />
        </View>
        <View style={styles.flexView}>
          <TouchableOpacity style={styles.button} onPress={handleCommander}>
            <Image
              style={styles.image}
              source={require("../../assets/images/Red_X.png")}
            />
          </TouchableOpacity>
        </View>
      </>
    );

    if (commanderMode === "deal-damage") {
      return <View style={styles.dealDamageView}>{dealDamageContent}</View>;
    } else if (commanderMode === "take-damage") {
      return <View style={styles.takeDamageView}>{takeDamageContent}</View>;
    } else {
      return flexViewContent; // Render flexView directly
    }
  };

  return <View style={styles.parentView}>{renderCommanderWrapper()}</View>;
};

const styles = StyleSheet.create({
  parentView: {
    display: "flex",
    borderRadius: 12,
    //width: "80%",
  },
  flexView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  text: {
    fontSize: 60,
    color: "#333",
    fontWeight: "bold",
  },
  textSmall: {
    fontSize: 20,
    color: "#afafaf",
  },
  button: {
    cursor: "pointer",
  },
  image: {
    width: 20,
    height: 20,
  },
  imageBig: {
    width: 60,
    height: 60,
  },
  dealDamageView: {
    backgroundColor: "white",
    borderRadius: 5,
    margin: 5,
  },
  takeDamageView: {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 12,
    width: "100%",
  },
});

export default PlayerHud_Center;
