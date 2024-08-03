// src/components/PlayerHud_H.styles.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 18,
    color: '#333',
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: "30%"
  },
});
