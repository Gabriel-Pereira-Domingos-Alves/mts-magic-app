import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0B0B0B',
      alignItems: 'center',
      justifyContent: 'center',
    },
    counterWrapper: {
      backgroundColor: '#2f2f2f', // Cor de fundo cinza escuro
      borderRadius: 10, // Borda arredondada
      padding: 10, // Espaçamento interno
      width: 300, // Largura do contêiner
      alignItems: 'center', // Alinha itens ao centro horizontalmente
      marginBottom: 20, // Margem abaixo do contêiner
      flexDirection: 'row',
      justifyContent: 'center',
    },
    label: {
      color: '#fff',
      fontSize: 18,
      marginRight: 10,
    },
    button: {
      borderRadius: 5,
      backgroundColor: 'green',
      padding: 10,
      marginHorizontal: 5,
    },
    buttonLess: {
      borderRadius: 5,
      backgroundColor: 'red',
      padding: 10,
      marginHorizontal: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
    count: {
      color: '#fff',
      fontSize: 18,
    },
    startButton: {
      backgroundColor: 'green',
      padding: 15,
      width: 200,
      alignItems: 'center',
      marginBottom: 10,
      borderRadius: 10,
    },
    startButtonText: {
      color: '#fff',
      fontSize: 18,
    },
    searchButton: {
      backgroundColor: 'green',
      padding: 15,
      width: 200,
      alignItems: 'center',
      borderRadius: 10,
    },
    searchButtonText: {
      color: '#fff',
      fontSize: 18,
    },
  });