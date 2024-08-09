import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from '@/styles/filterModal.styles';

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  applyFilters: (filters: any) => void;
}

interface Filters {
  color: string[];
  text: string;
  language: string;
  type: string;
  name: string;
}


const FilterModal: React.FC<FilterModalProps> = ({ isVisible, onClose, applyFilters }) => {
  const [filters, setFilters] = useState<Filters>({
    color: [],
    text: '',
    language: 'English',
    type: '',
    name: ''
});

  const toggleColor = (color: string) => {
    setFilters(prevFilters => {
        const newColorArray = prevFilters.color.includes(color)
            ? prevFilters.color.filter(c => c !== color)
            : [...prevFilters.color, color];

        return {
            ...prevFilters,
            color: newColorArray
        };
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Card Name:</Text>
        <TextInput
            placeholder="Enter card name"
            value={filters.name}
            onChangeText={name => setFilters({...filters, name})}
            style={styles.input}
        />
        <Text style={styles.modalText}>Colors:</Text>
        <View style={styles.manaButtonContainer}>
            {['W', 'U', 'B', 'R', 'G'].map((mana, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => toggleColor(mana)}
                    style={[styles.manaButton, {
                        backgroundColor: filters.color.includes(mana) ? 'darkgrey' : '#2F3F3F',

                    }]}
                >
                    <Text style={styles.buttonText}>{mana}</Text>
                </TouchableOpacity>
            ))}
        </View>
        <View style={styles.oracleTextContainer}>
          <Text style={styles.oracleText}>Text Includes:</Text>
          <TextInput
            placeholder="First strike:"
            value={filters.text}
            onChangeText={text => setFilters({...filters, text: text})}
            style={styles.input}
          />
        </View>
        <TouchableOpacity onPress={() => setFilters({...filters, language: filters.language === 'English' ? 'Portuguese' : 'English'})} style={styles.languageButton}>
          <Text style={styles.languageButtonText}>{filters.language}</Text>
        </TouchableOpacity>
        <Text style={styles.oracleText}>Card Type:</Text>
        <TextInput
          placeholder="Type (Land, Creature, etc)"
          value={filters.type}
          onChangeText={text => setFilters({...filters, type: text})}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={() => applyFilters(filters)}>
          <Text style={styles.buttonText}>Search Cards</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default FilterModal;
