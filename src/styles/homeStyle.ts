import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      backgroundColor: '#0B0B0B',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
      alignItems: 'center',    },
    content: {
      ...StyleSheet.absoluteFillObject, // Isso garante que a sobreposição cubra o background completamente
      backgroundColor: 'rgba(0, 0, 0, 0.87)', // Ajuste a transparência aqui
      alignItems: 'center',
      opacity: 1
    },
    header: {
      paddingTop: 20, // Espaçamento interno
      width: '100%', // Largura do contêiner
      alignItems: 'center', // Alinha itens ao centro horizontalmente
      marginBottom: 90,
    },
    logo: {
      width: 60, // Largura do logo
      height: 55, // Altura do logo
    },
    counterWrapper: {
      backgroundColor: '#2f2f2f', // Cor de fundo cinza escuro
      borderRadius: 20, // Borda arredondada
      padding: 10, // Espaçamento interno
      width: 300, // Largura do contêiner
      alignItems: 'center', // Alinha itens ao centro horizontalmente
      marginBottom: 20, // Margem abaixo do contêiner
      flexDirection: 'row',
      justifyContent: 'center',
    },
    label: {
      color: '#fff',
      fontSize: 25,
      marginRight: 10,
      fontWeight: "bold",
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
      fontSize: 20,
    },
    count: {
      color: '#fff',
      fontSize: 25,
      fontWeight: "bold"
    },
    startButton: {
      backgroundColor: 'green',
      opacity: 0.9,
      padding: 15,
      width: 200,
      alignItems: 'center',
      marginBottom: 20,
      borderRadius: 10,
    },
    startButtonText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: "bold",
      fontFamily: "Body Base",
    },
    searchButton: {
      backgroundColor: 'green',
      padding: 15,
      width: 200,
      alignItems: 'center',
      borderRadius: 10,
      fontFamily: "Body Base",
      opacity: 0.9,
    },
    searchButtonText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: "bold",
      fontFamily: "Body Base",
    },
  });
