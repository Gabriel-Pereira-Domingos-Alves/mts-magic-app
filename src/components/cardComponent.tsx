import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface CardProps {
  card: {
    name: string;
    imageUrl: string;
    manaCost: string;
    oracleText: string;
    typeLine: string;
    id: string;
    synergy?: Synergy[]; 
  };
  onPress: (card: CardProps['card']) => void;
}

interface ComboCard {
  name: string;
  imageUrl: string;
}

interface Synergy {
  comboName: string;
  description: string;
  cards: ComboCard[];
}

export const CardComponent: React.FC<CardProps> = ({ card, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(card)}>
      <View style={styles.cardContainer}>
        <Image source={{ uri: card.imageUrl }} style={styles.image} resizeMode="cover" />
        <View style={styles.cardDetails}>
          <Text style={styles.title}>{card.name}</Text>
          <Text style={styles.manaCost}>{card.manaCost}</Text>
          <Text style={styles.typeLine}>{card.typeLine}</Text>
          <Text style={styles.oracleText}>{card.oracleText}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#2F2F2F',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 140
  },
  cardDetails: {
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  manaCost: {
    fontSize: 14
  },
  typeLine: {
    fontSize: 14,
    color: 'white'
  },
  oracleText: {
    fontSize: 12,
    color: 'white'
  }
});
