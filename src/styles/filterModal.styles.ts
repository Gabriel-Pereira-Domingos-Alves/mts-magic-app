import { StyleSheet, Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  modalView: {
    marginTop: screenHeight * 0.1, // Posiciona o modal mais abaixo na tela
    marginHorizontal: 20,
    backgroundColor: "#333333",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    color: "white",
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: "#222",
    color: "white",
    borderRadius: 10,
  },
  oracleTextContainer: {
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
  },
  oracleText: {
    color: "white",
  },
  languageButton: {
    backgroundColor: 'darkgreen',
    padding: 10,
    marginBottom: 18,
    borderRadius: 13,
  },
  languageButtonText: {
    color: 'white',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    width: 170,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 13,
  },
  buttonText: {
    color: 'white',
  },
  manaButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 10,
  },
  manaButton: {
      padding: 10,
      marginHorizontal: 5,
      borderRadius: 5,
  },
  manaButtonLabel: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
    alignSelf: 'center',
  }
});
