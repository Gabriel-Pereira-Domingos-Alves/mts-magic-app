import axios from 'axios';

interface MtgFilters {
    color?: string[];
    text?: string;
    language?: string;
    type?: string;
    name?: string;
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
        params.text = filters.text;
    }
    if (filters.type) {
        params.type = filters.type;
    }
    if (filters.language != 'English') {
        params.language = 'Portuguese (Brazil)';
    }
    try {
        console.log('Fetching cards...');
        console.log('Filters:', filters);
        console.log('Params:', params);

        const response = await axios.get(API_URL, { params });
        console.log('Response:', response.data);

        // Objeto para manter o controle de nomes já processados
        const processedCards: Record<string, boolean> = {};

        const uniqueCards: MtgCards[] = await Promise.all(response.data.cards.map(async (card: any) => {
            let cardData: MtgCards | null = null;
            const englishName = card.name;

            if (filters.language === 'Portuguese') {
                const foreignCard = card.foreignNames?.find((fn: any) => fn.language === 'Portuguese (Brazil)');
                if (foreignCard) {
                    if (!processedCards[englishName]) {
                        cardData = {
                            name: foreignCard.name,
                            imageUrl: card.imageUrl || 'No image available',  // Usando a imagem em inglês
                            manaCost: card.manaCost || 'No mana cost available',
                            oracleText: foreignCard.text || card.oracleText || 'No oracle text available',
                            typeLine: foreignCard.type || card.typeLine || 'No type available',
                            id: card.id
                        };
                        processedCards[englishName] = true;
                    }
                }
            }

            if (!cardData && !processedCards[englishName]) {
                cardData = {
                    name: card.name,
                    imageUrl: card.imageUrl || 'No image available',
                    manaCost: card.manaCost || 'No mana cost available',
                    oracleText: card.text || 'No oracle text available',
                    typeLine: card.type || 'No type available',
                    id: card.id
                };
                processedCards[englishName] = true;
            }

            if (cardData) {
                try {
                    const scryfallResponse = await axios.get(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(englishName)}`);
                    cardData.imageUrl = scryfallResponse.data.image_uris?.normal || cardData.imageUrl;
                } catch (imageError) {
                    console.error(`Error fetching image for card ${englishName}:`, imageError);
                }

                // Busca os combos usando o nome em inglês
                const combos = await fetchCombos(englishName);

                cardData.synergy = combos.map((combo: any) => ({
                    comboName: combo.Feature?.featureName || '',
                    description: combo.description,
                    cards: combo.cards.map((comboCard: ComboCard) => ({
                        name: comboCard.name,
                        imageUrl: comboCard.imageUrl
                    }))
                }));

                return cardData;
            }

            return null;
        }));

        // Filtra os valores nulos para garantir que apenas cartas únicas sejam retornadas
        return uniqueCards.filter(card => card !== null) as MtgCards[];
    } catch (error) {
        console.error('Error fetching cards:', error);
        throw error;
    }
}

async function fetchCombos(cardName: string): Promise<Synergy[]> {
    try {
        const commanderUrl = `https://backend.commanderspellbook.com/variants/?format=json&?ordering=-popularity&q=${encodeURIComponent(cardName)}`;
        const commanderResponse = await fetch(commanderUrl);
        const commanderData = await commanderResponse.json();
        return await extractCombos(commanderData);
    } catch (error) {
        console.error("Failed to fetch combo details:", error);
        return [];
    }
}

async function extractCombos(data: any): Promise<Synergy[]> {
    const combos = data.results.slice(0, 3); // Limita para os primeiros 3 combos

    const formattedCombos = await Promise.all(combos.map(async (combo: any) => {
        const cardDetailsPromises = combo.uses.map(async (use: any) => {
            try {
                const scryfallResponse = await fetch(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(use.card.name)}`);

                if (!scryfallResponse.ok) {
                    throw new Error(`Failed to fetch details for ${use.card.name} from Scryfall.`);
                }

                const cardData = await scryfallResponse.json();

                return {
                    name: use.card.name,
                    imageUrl: cardData.image_uris ? cardData.image_uris.normal : 'No image available',
                };
            } catch (error) {
                console.error(error);
                return {
                    name: use.card.name,
                    imageUrl: 'Error fetching image'
                };
            }
        });

        const cardDetails = await Promise.all(cardDetailsPromises);

        return {
            comboName: combo.produces[0]?.feature.name || 'Unknown Combo',
            description: combo.description,
            cards: cardDetails
        };
    }));

    return formattedCombos;
}
