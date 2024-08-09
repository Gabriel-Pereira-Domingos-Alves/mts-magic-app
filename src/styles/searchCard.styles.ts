import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#1B1B1B",
    borderBottomLeftRadius: 10,
  },
  someContent: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "#1B1B1B",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#1B1B1B",
    borderColor: "#1B1B1B",
    borderRadius: 5,
    borderWidth: 8,
  },
  backButton: {
    padding: 8,  // Adiciona espaço em volta para tornar mais fácil tocar no botão
    marginLeft: 2, // Adiciona uma margem à esquerda para distanciá-lo do lado da tela
  },
  backButtonIcon: {
    color: 'white', // Define a cor do ícone
    fontSize: 30,   // Define o tamanho do ícone
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingLeft: 20,
    borderRadius: 25,
    backgroundColor: "#2F2F2F",
    borderColor: "white",
    color: "white",
    fontSize: 15,
  },
  filterIcon: {
    color: 'white',
    fontSize: 25,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadMoreButton: {
    padding: 10,
    backgroundColor: '#2F2F2F',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 10
  },
  loadMoreButtonText: {
    color: 'white',
    fontSize: 16
  },
  loadingOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Cor semi-transparente
    alignItems: "center", // Centraliza horizontalmente
    justifyContent: "center", // Centraliza verticalmente
    zIndex: 1, // Garante que o overlay esteja sobre outros elementos da tela
  },
  list: {
    flex: 1,
    borderRadius: 15
  },
});
