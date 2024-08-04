import React, { useState } from 'react';
import { Modal, SafeAreaView, View, FlatList, TextInput, TouchableOpacity, Text, ActivityIndicator, ScrollView, Image } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import styles from '@/styles/searchCard.styles';
import { fetchCardByName, fetchCardDetails } from '@/api/searchCard';
import { CardComponent } from '@/components/cardComponent';
import { StackNavigationProp } from '@react-navigation/stack';
import CardDetailsModal from '@/components/modalComponent';

type RootStackParamList = {
  SearchScreen: undefined;
  Home: undefined;
};

type SearchScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SearchScreen'>;
};

interface ComboCard {
    name: string;
    imageUrl: string;
  }
  
  interface Synergy {
    comboName: string;
    description: string;
    cards: ComboCard[];
  }
  
  interface Card {
    name: string;
    imageUrl: string;
    manaCost: string;
    oracleText: string;
    typeLine: string;
    id: string;
    synergy?: Synergy[]; // Faça o campo synergy opcional se ele só estiver disponível após detalhes específicos serem buscados
  }

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCardDetails, setSelectedCardDetails] = useState<Card | null>(null);

  const handleSearchSubmit = async () => {
    setLoading(true);
    try {
      const fetchedCards = await fetchCardByName(searchQuery);
      setCards(fetchedCards);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cards:', error);
      setLoading(false);
    }
  };

  const handleCardPress = async (card: Card) => {
    try {
      const details = await fetchCardDetails(card.name);
      setSelectedCardDetails(details);
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching card details:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <AntDesign name="leftcircle" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a card"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearchSubmit}
        />
        <TouchableOpacity onPress={handleSearchSubmit}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {loading ? (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
      ) : (
        <FlatList
          data={cards}
          keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
          renderItem={({ item }) => <CardComponent card={item} onPress={() => handleCardPress(item)} />}
          style={styles.list}
        />
      )}
      {modalVisible && selectedCardDetails && (
        <CardDetailsModal
          cardDetails={selectedCardDetails}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
