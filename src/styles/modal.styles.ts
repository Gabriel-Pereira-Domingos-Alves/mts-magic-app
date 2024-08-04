import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        backgroundColor: '#1B1B1B', // Um fundo escuro
        padding: 20,
        borderColor: '#444', // Uma borda sutil
        borderWidth: 1,
        borderRadius: 10, // Bordas levemente arredondadas
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    cardImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginBottom: 20,
      },
  modalText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Body Base', // Mudar para a fonte que deseja usar
    padding: 10,
    textAlign: 'center', // Centraliza o texto
  },
  manaCost: {
    flexDirection: 'row', 
    marginTop: 3, 
    paddingBottom: 3,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  oracleText: {
    color: 'white',
    fontSize: 14,
    flexWrap: 'wrap',
    alignItems: 'baseline',
    textAlign: 'center',
    fontFamily: 'Body Base',
    paddingBottom: 40,
  },
  comboImages: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  comboImage: {
    width: 60,
    height: 80,
    margin: 5,
  },
});

export default styles;
