import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: '#0F0F0F'
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#2F2F2F',
    borderColor: '#2F2F2F',
    borderRadius: 5,
    borderWidth: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: '#2F2F2F',
    borderColor: 'white',
    color: 'white' 
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    flex: 1
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    paddingTop: 20,
  },
  cardImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginTop: 10,
  },
  modalText: {
    color: 'white',
    fontSize: 18,
    padding: 10
  },
  closeButton: {
    position: 'relative',
    top: 20,
    right: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 20,
  },
  detailsContainer: {
    padding: 20
  },
  detailsHeader: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    color: 'white',
    lineHeight: 22,
    marginBottom: 10,
  },
  synergyContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#333333',
    borderRadius: 10,
  },
  synergyTitle: {
    fontSize: 18,
    color: '#FFD700',  // Gold color for the title
    marginBottom: 5,
  },
  synergyText: {
    color: 'white',
    fontSize: 16,
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
