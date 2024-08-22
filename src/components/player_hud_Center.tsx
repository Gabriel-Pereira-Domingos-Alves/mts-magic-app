import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useCommander } from "./commanderContext";

interface PlayerHudProps {
  index: number;
  initialHealth: number;
  rotation: string;
}

const PlayerHud_Center: React.FC<PlayerHudProps> = ({
  index,
  initialHealth,
  rotation
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
  const [poisonMode, setPoisonMode] = useState(false);
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
        const existingDamage =
          commanderActionDamage.find(
            (entry) =>
              entry.sourceId === index && entry.targetId === triggeredIndex
          )?.damage || 0;

        const existing =
          commanderActionDamage.find(
            (entry) =>
              entry.sourceId === index && entry.targetId === triggeredIndex
          )?.damage || "nao encontrado";
        console.log("EXISTING:", existing, " meu INDEX é ", index);

        if (
          existingDamage !== 0 ||
          (existingDamage === 0 && triggeredIndex !== lastCommanderIndex)
        ) {
          console.log("Updating current damage: ", existingDamage);

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
        updateCommanderActionDamage(
          index,
          triggeredIndex,
          currentCommanderDamage
        );
        console.log("updating commander damage: ", currentCommanderDamage);
      }
      finishProcessing();
    });
  }, [
    index,
    commanderActionDamage,
    currentCommanderDamage,
    lastCommanderIndex,
  ]);

  useEffect(() => {
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
  }, [commanderDamage, poisonDamage]);

  const handleCommander = () => {
    if (commander) {
      sendEvent("end-commander", index);
    } else {
      setCommander(true);
      sendEvent("start-commander", index);
    }
  };

  const handlePoison = () => {
    setPoisonMode(!poisonMode);
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
  };
  const handlePoisonDamage = (value: number) => {
    setPoisonDamage(poisonDamage + value);
  }

  const renderCommanderWrapper = () => {
    const flexViewContent = (
      <>
        <View style={styles.addDamageView}>
          <TouchableOpacity style={styles.button} onPress={decrementHealth}>
            <Text style={styles.textSignals}>-</Text>
          </TouchableOpacity>
          <Text style={rotation === "0" || rotation === "180" ? styles.textBig : styles.text}>{shownHealth}</Text>
          <TouchableOpacity style={styles.button} onPress={incrementHealth}>
            <Text style={styles.textSignals}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsView}>
          <TouchableOpacity style={styles.button} onPress={handleCommander}>
            <Image
              source={require("../../assets/images/shield.png")}
              style={rotation === "0" || rotation === "180" ? styles.imageBig : styles.mediumImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePoison}>
            <Image
              source={require("../../assets/images/rune.png")}
              style={rotation === "0" || rotation === "180" ? styles.imageBig : styles.mediumImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </>
    );
    const dealDamageContent = (
      <>
        <View style={styles.addDamageView}>
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
        <View style={styles.addDamageView}>
          <Image
            source={require("../../assets/images/shield.png")}
            style={styles.image}
            resizeMode="contain"
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
            resizeMode="contain"
          />
        </View>
        <View style={styles.flexView}>
          <TouchableOpacity style={styles.button} onPress={handleCommander}>
            <Image
              style={styles.image}
              source={require("../../assets/images/Red_X.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </>
    );
    const poisonView = (
      <>
      <View style={styles.topXView}>
        <TouchableOpacity onPress={handlePoison}>
          <Image style={styles.tinyImg} source={require("../../assets/images/Red_X.png")}></Image>
        </TouchableOpacity>
      </View>
        <View style={styles.poisonView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePoisonDamage(-1)}
          >
            <Text style={styles.textSignals}>-</Text>
          </TouchableOpacity>
          <Text style={styles.text}>{poisonDamage}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePoisonDamage(1)}
          >
            <Text style={styles.textSignals}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flexView}>
          <Image
            source={require("../../assets/images/rune.png")}
            style={styles.mediumImage}
            resizeMode="contain"
          />
        </View>
      </>
    );

    if (commanderMode === "deal-damage") {
      return <View style={styles.takeDamageView}>{dealDamageContent}</View>;
    } else if (commanderMode === "take-damage") {
      return <View style={styles.takeDamageView}>{takeDamageContent}</View>;
    } else if(poisonMode){
      return <View style={styles.takeDamageView}>{poisonView}</View>
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
    width: "100%",
    borderBottomColor: "blue",
  },
  fullWidth: {
    width: "100%",
    height: "100%",
  },
  flexView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    borderRadius: 5,
  },
  topXView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    borderRadius: 5,
  },
  poisonView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    borderRadius: 5,
    gap:5,
  },
  addDamageView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    borderRadius: 5,
    margin: 3,
    gap:55,
  },
  buttonsView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    borderRadius: 5,
    margin: 3,
  },
  text: {
    fontSize: 80,
    color: "#000000",
    fontWeight: "bold",
  },
  textSignals: {
    fontSize: 45,
    color: "#000000",
    fontWeight: "bold",
  },
  textSmall: {
    fontSize: 15,
    color: "#afafaf",
  },
  textBig: {
    fontSize: 115,
    color: "#000000",
    fontWeight: "bold",
  },
  button: {
    cursor: "pointer",
  },
  tinyImg: {
    width: 18,
    height: 18,
  },
  image: {
    width: 17,
    height: 17,
  },
  mediumImage: {
    width: 40,
    height: 40,
  },
  imageBig: {
    width: 65,
    height: 65,
  },
  takeDamageView: {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 12,
    width: "100%",
  },
});

export default PlayerHud_Center;
