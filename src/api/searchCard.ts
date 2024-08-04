interface Card {
    name: string;
    imageUrl: string;
    manaCost: string;
    oracleText: string;
    typeLine: string;
    id: string;
    synergy?: Synergy[]; 
  }
  
  interface Synergy {
    comboName: string;
    description: string;
    cards: ComboCard[]; 
  }
  
  interface ComboCard {
    name: string;
    imageUrl: string;
  }
  
  export const fetchCardByName = async (cardName: string): Promise<Card[]> => {
    console.log("Searching for cards:", cardName);
    const apiUrl = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(cardName)}`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const cards: Card[] = data.data.map((card: any) => ({
        name: card.name,
        imageUrl: card.image_uris ? card.image_uris.small : 'No image available',
        manaCost: card.mana_cost || 'No mana cost available',
        oracleText: card.oracle_text || 'No oracle text available',
        typeLine: card.type_line || 'No type available'
      }));
  
      return cards;
  
    } catch (error) {
      console.error("Failed to fetch card:", error);
      throw new Error("Failed to fetch cards due to an error."); // Mantendo a consistência de tipo de retorno
    }
  }
  
  export async function fetchCardDetails(cardName: string): Promise<Card | null> {
    const scryfallUrl = `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}`;
  
    try {
      const scryfallResponse = await fetch(scryfallUrl);
  
      if (!scryfallResponse.ok) {
        throw new Error(`HTTP error from Scryfall! Status: ${scryfallResponse.status}`);
      }
  
      const scryfallData = await scryfallResponse.json();
      const card = scryfallData;
  
      let combos = [];
  
      // Busca os combos em uma função separada para tratar erros isoladamente
      try {
        const commanderUrl = `https://backend.commanderspellbook.com/variants/?format=json&?ordering=-popularity&q=${encodeURIComponent(cardName)}`;
        const commanderResponse = await fetch(commanderUrl);
        const commanderData = await commanderResponse.json();
        combos = await extractCombos(commanderData);
      } catch (error) {
        console.error("Failed to fetch combo details:", error);
        // Não interrompe o fluxo, continua com combos como array vazio
      }
  
      return {
        name: card.name,
        imageUrl: card.image_uris ? card.image_uris.normal : 'No image available',
        manaCost: card.mana_cost || 'No mana cost available',
        oracleText: card.oracle_text || 'No oracle text available',
        typeLine: card.type_line || 'No type available',
        id: card.id,
        synergy: combos.map(combo => ({
          comboName: combo.Feature?.featureName,
          description: combo.description,
          cards: combo.cards.map((card: { cardName: any; imageUrl: any; }) => ({
            name: card.cardName,
            imageUrl: card.imageUrl
          }))
        }))
      };
  
    } catch (error) {
      console.error("Failed to fetch card details:", error);
      return null;
    }
  }
  
  async function extractCombos(data: any): Promise<any[]> {
    const combos = data.results.slice(0, 3); // Limita para os primeiros 3 combos
  
    // Mapeia cada combo para extrair informações detalhadas de forma assíncrona
    const formattedCombos = await Promise.all(combos.map(async (combo: any) => {
      const cardDetailsPromises = combo.uses.map(async (use: any) => {
        try {
          const scryfallResponse = await fetch(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(use.card.name)}`);
  
          if (!scryfallResponse.ok) {
            throw new Error(`Failed to fetch details for ${use.card.name} from Scryfall.`);
          }
  
          const cardData = await scryfallResponse.json();
  
          return {
            cardName: use.card.name,
            cardId: use.card.id,
            imageUrl: cardData.image_uris ? cardData.image_uris.small : 'No image available',
            manaCost: cardData.mana_cost || 'No mana cost available',
            typeLine: cardData.type_line || 'No type available'
          };
        } catch (error) {
          console.error(error);
          // Handle or log the error as necessary
          return {
            cardName: use.card.name,
            cardId: use.card.id,
            imageUrl: 'Error fetching image',
            manaCost: 'Error fetching mana cost',
            typeLine: 'Error fetching type line'
          };
        }
      });
  
      const cardDetails = await Promise.all(cardDetailsPromises);
  
      const firstFeature = combo.produces && combo.produces.length > 0 ? {
        featureName: combo.produces[0].feature.name,
        quantity: combo.produces[0].quantity,
        uncountable: combo.produces[0].feature.uncountable
      } : null;
  
      return {
        comboId: combo.id,
        description: combo.description,
        cards: cardDetails,
        Feature: firstFeature // Adicionando o primeiro feature do produces
      };
    }));
  
    return formattedCombos;
  }
  