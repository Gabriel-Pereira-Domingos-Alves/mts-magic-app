import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1B1B1B'

  },
  scrollView: {
      alignItems: 'center',  // Centraliza o conteúdo horizontalmente
      padding: 20,  // Adiciona padding para o conteúdo interno
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#1B1B1B", // Um fundo escuro
    padding: 20,
    borderColor: "#444", // Uma borda sutil
    borderTopWidth: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingTop: 30,
    paddingLeft: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  cardImage: {
    width: "100%",
    height: 390,
    resizeMode: "contain",
    marginBottom: 20,
  },
  modalCardName: {
    color: "#FFF",
    fontSize: 22,
    fontFamily: "Body Base", // Mudar para a fonte que deseja usar
    padding: 12,
    textAlign: "center", // Centraliza o texto
    fontWeight: 'bold',

    },
  modalTypeLine: {
    fontWeight: 'bold',
    textAlign: "center",
    padding: 10,
    color: "#FFF",
    fontFamily: "Body Base",
    fontSize: 18
  },
  modalText: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "Body Base", // Mudar para a fonte que deseja usar
    padding: 15,
    textAlign: "center", // Centraliza o texto
    marginBottom: 20
  },
  manaCost: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  oracleText: {
    color: "white",
    flexWrap: "wrap",
    alignItems: "baseline",
    fontFamily: "Body Base",
    paddingBottom: 40,
    fontSize: 16,
  },
  comboImages: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
  },
  comboImage: {
    width: 140,
    height: 200,
    margin: 5,
  },
  modalComboFeature: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Body Base", // Mudar para a fonte que deseja usar
    padding: 15,
    textAlign: "center", // Centraliza o texto
  },
});

export default styles;
