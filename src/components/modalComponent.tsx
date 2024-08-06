import React from 'react';
import { Modal, ScrollView, View, Image, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from '@/styles/modal.styles';
import { SvgUri } from 'react-native-svg';

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

interface CardDetailsModalProps {
  cardDetails: Card | null;
  visible: boolean;
  onClose: () => void;
}

const CardDetailsModal: React.FC<CardDetailsModalProps> = ({ cardDetails, visible, onClose }) => {
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
              width="20"
              height="20"
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
          elements.push(<Text key={`last-text-${position}`} style={styles.oracleText}>{oracleText.substring(position)}</Text>);
        }

        return <Text>{elements}</Text>;
      };

  if (!cardDetails) return null;

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.modalContent}>
          <TouchableOpacity onPress={onClose}>
            <AntDesign name="closecircle" size={24} color="red" />
          </TouchableOpacity>
          <Image source={{ uri: cardDetails.imageUrl }} style={styles.cardImage} />
          <Text style={styles.modalCardName}>{cardDetails.name}</Text>
          <View style={styles.manaCost}>
              {parseManaCost(cardDetails.manaCost)}
          </View>
          <Text style={styles.modalTypeLine}>{cardDetails.typeLine}</Text>
          <View style={styles.oracleText}>{parseOracleText(cardDetails.oracleText)}</View>
          {cardDetails.synergy && cardDetails.synergy.map((synergy, index) => (
            <View key={index}>
              <Text style={styles.modalComboFeature}>Feature: {synergy.comboName}</Text>
              <View style={styles.comboImages}>
                {synergy.cards.map((card, idx) => (
                  <Image key={idx} source={{ uri: card.imageUrl }} style={styles.comboImage} />
                ))}
              </View>
              <Text style={styles.modalText}>{synergy.description}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default CardDetailsModal;
