import React from 'react';
import { SvgUri } from 'react-native-svg';
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

  const parseManaCost = (manaCost: string) => {
    const manaSymbols = manaCost.match(/\{[^}]+\}/g) || [];
    return manaSymbols.map((symbol, index) => {
      const cleanSymbol = symbol.replace(/[{}]/g, "") // Remove chaves e converte para minúsculas
      const cleanSymbols = cleanSymbol.replace(/\//g, '') // Substitui '/' por ''
      const imageUrl = `https://svgs.scryfall.io/card-symbols/${cleanSymbols}.svg`;
      return (
        <SvgUri
          key={index}
          uri={imageUrl}
          width="15"
          height="15"
        />
      )
    });
  };  
  
  const parseOracleText = (oracleText: string): React.ReactNode => {
    const elements: Array<React.ReactNode> = [];
    let position = 0;
  
    oracleText.replace(/\{([^}]+)\}/g, (match: string, symbol: string, offset: number): string => {
      if (offset > position) {
        elements.push(<Text key={`text-${position}`} style={{ fontSize: 14, color: 'white' }}>{oracleText.substring(position, offset)}</Text>);
      }

      const formattedSymbol = symbol.replace(/\//g, '');

      const iconUrl = `https://svgs.scryfall.io/card-symbols/${formattedSymbol}.svg`;
      elements.push(
        <SvgUri
          key={`mana-${offset}`}
          uri={iconUrl}
          width="12"
          height="12"
          style={{ alignSelf: 'center' }}
        />
      );
      position = offset + match.length;
      return match;
    });
  
    if (position < oracleText.length) {
      elements.push(<Text key={`last-text-${position}`} style={{ fontSize: 14, color: 'white' }}>{oracleText.substring(position)}</Text>);
    }
  
    return <Text>{elements}</Text>;
  };

  return (
    <TouchableOpacity onPress={() => onPress(card)}>
      <View style={styles.cardContainer}>
        <Image source={{ uri: card.imageUrl }} style={styles.image} resizeMode="cover" />
        <View style={styles.cardDetails}>
          <Text style={styles.title}>{card.name}</Text>
          <View style={styles.manaCost}>
            {parseManaCost(card.manaCost)}
          </View>
          <Text style={styles.typeLine}>{card.typeLine}</Text>
          <View style={styles.oracleText}>{parseOracleText(card.oracleText)}</View>
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
    padding: 15,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  manaCost: {
    flexDirection: 'row', 
    marginTop: 5, 
    paddingBottom: 5,
  },
  typeLine: {
    fontSize: 14,
    color: 'white'
  },
  oracleText: {
    fontSize: 14,
    color: 'white',
    flexDirection: 'row',
    lineHeight: 22,
  },
  manaSymbol: {
    marginHorizontal: 2 // Ajusta o espaçamento entre os símbolos de mana
  }
});
