// src/components/PlayerHud_Center.styles.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    parentView: {
        display: "flex",
        borderRadius: 12,
        width: "100%",
        height: "100%",
        borderBottomColor: "blue",
        alignItems: "center",
        justifyContent: "center",
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
        justifyContent: "space-around",
        flexDirection: "row",
        borderRadius: 5,
        gap:5,
        width: "100%",
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
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 5,
        margin: 3,
        gap: 35,
        width: "100%"
      },
      text: {
        fontSize: 80,
        color: "#000000",
        fontWeight: "bold",
        padding: 0,
        margin: 0,
        lineHeight: 90
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
      textTitleNormal: {
        fontSize: 23,
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
      xImage: {
        width: 25,
        height: 25,
      },
      shieldDamage: {
        width: 30,
        height: 30,
      },
      mediumImage: {
        width: 40,
        height: 40,
      },
      imageBig: {
        width: 65,
        height: 65,
      },
      imageSuperBig: {
        width: 125,
        height: 125,
      },
      takeDamageView: {
        backgroundColor: "rgb(255, 255, 255)",
        borderRadius: 12,
        width: "100%",
      },
      takeDamageViewBig: {
        backgroundColor: "rgb(255, 255, 255)",
        borderRadius: 12,
        width: "100%",
        display: "flex",
        height: "82%",
        alignItems: "center",
        justifyContent: "center",
      },
      takeDamageContent: {
        backgroundColor: "rgb(255, 255, 255)",
        borderRadius: 12,
        width: "100%",
        display: "flex",
        height: "100%",
        padding: 10,
        alignItems: "center",
        justifyContent: "space-between",
      },
      dealDamageContent: {
        backgroundColor: "rgb(255, 255, 255)",
        borderRadius: 12,
        width: "100%",
        display: "flex",
        height: "100%",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        gap: 15,
      },
});
