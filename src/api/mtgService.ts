import axios from 'axios';

interface MtgFilters {
    color?: string[];
    text?: string;
    language?: string;
    type?: string;
    name?: string
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

interface MtgCards {
    name: string;
    imageUrl: string;
    manaCost: string;
    oracleText: string;
    typeLine: string;
    id: string;
    synergy?: Synergy[];
}

const API_URL = 'https://api.magicthegathering.io/v1/cards';

export const fetchCards = async (filters: MtgFilters): Promise<MtgCards[]> => {
    const params: Record<string, string | string[]> = {};

    // Converte os filtros em parâmetros de consulta adequados para a API
    if (filters.name) {
        params.name = filters.name;
    }
    if (filters.color) {
        params.colors = filters.color.join('|');
      }
    if (filters.text) {
        params.text = filters.text; // Corrigido para 'oracleText'
    }
//    if (filters.language) {
//       params.language = filters.language;
//    }
    if (filters.type) {
        params.type = filters.type; // Corrigido para 'typeLine'
    }

    try {
        console.log('Fetching cards...');
        console.log('Filters:', filters);
        console.log('Params:', params);
        const response = await axios.get(API_URL, { params });
        // Usando reduce para remover cartas duplicadas pelo nome
        const uniqueCards = response.data.cards.reduce((acc: MtgCards[], card: any) => {
            if (!acc.some(c => c.name === card.name)) {
                acc.push({
                    name: card.name,
                    imageUrl: 'No image available',
                    manaCost: card.manaCost || 'No mana cost available',
                    oracleText: card.text || 'No oracle text available',
                    typeLine: card.type || 'No type available',
                    id: card.id
                });
            }
            return acc;
        }, []);

        // Obter as imagens das cartas únicas
        const cardsWithImages = await Promise.all(uniqueCards.map(async (card: MtgCards) => {
            try {
                const scryfallResponse = await axios.get(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(card.name)}`);
                card.imageUrl = scryfallResponse.data.image_uris?.normal || 'No image available';
            } catch (imageError) {
                console.error(`Error fetching image for card ${card.name}:`, imageError);
            }
            return card;
        }));

        return cardsWithImages;
    } catch (error) {
        console.error('Error fetching cards:', error);
        throw error;
    }
}
