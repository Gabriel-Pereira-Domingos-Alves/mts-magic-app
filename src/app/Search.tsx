import React, { useState } from "react";
import {
  Modal,
  SafeAreaView,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import styles from "@/styles/searchCard.styles";
import { fetchCardByName, fetchCardDetails } from "@/api/searchCard";
import { fetchCards } from "@/api/mtgService";
import { CardComponent } from "@/components/cardComponent";
import { StackNavigationProp } from "@react-navigation/stack";
import CardDetailsModal from "@/components/modalComponent";
import FilterModal from "@/components/FilterModal";

type RootStackParamList = {
  SearchScreen: undefined;
  Home: undefined;
};

type SearchScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "SearchScreen">;
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
  synergy?: Synergy[]; 
}

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(8);
  const [selectedCardDetails, setSelectedCardDetails] = useState<Card | null>(null,);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const handleSearchSubmit = async () => {
    setLoading(true);
    try {
      const fetchedCards = await fetchCardByName(searchQuery);
      setCards(fetchedCards);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cards:", error);
      setLoading(false);
    }
  };
  
  const applyFilters = async (filters: any) => {
    setLoading(true);
    try {
      const filterCards = await fetchCards(filters);
      setCards(filterCards);
      setFilterModalVisible(false);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleLoadMore = () => {
    setDisplayLimit(prevLimit => prevLimit + 8)
  }

  const handleCardPress = async (card: Card) => {
    try {
      const details = await fetchCardDetails(card.name);
      setSelectedCardDetails(details);
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching card details:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.someContent}>
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.backButton}>
            <AntDesign name="leftcircle" style={styles.backButtonIcon}  />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a card"
            placeholderTextColor={"gray"}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearchSubmit}
          />
          <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
            <Ionicons name="filter" style={styles.filterIcon}/>
          </TouchableOpacity>
          <FilterModal
            isVisible={filterModalVisible}
            onClose={() => setFilterModalVisible(false)}
            applyFilters={applyFilters}
          />
        </View>
        {loading ? (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <FlatList
            data={cards.slice(0, displayLimit)}
            keyExtractor={(item) =>
              item.id ? item.id.toString() : Math.random().toString()
            }
            renderItem={({ item }) => (
              <CardComponent card={item} onPress={() => handleCardPress(item)} />
            )}
            style={styles.list}
            ListFooterComponent={() => (
              cards.length > displayLimit && (
                <TouchableOpacity onPress={handleLoadMore} style={styles.loadMoreButton}>
                  <Text style={styles.loadMoreButtonText}>Mostrar mais</Text>
                </TouchableOpacity>
              )
            )}
          />
        )}
        {modalVisible && selectedCardDetails && (
          <CardDetailsModal
            cardDetails={selectedCardDetails}
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
