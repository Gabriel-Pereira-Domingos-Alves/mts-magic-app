import axios from 'axios';

interface MtgFilters {
    colors?: string[];
    text?: string;
    language?: string;
    type?: string;
    name?: string
}

const API_URL = 'https://api.magicthegathering.io/v1/cards';

export const fetchCards = async (filters: MtgFilters): Promise<any> => {
    const params: Record<string, string> = {};

    // Converte os filtros em parâmetros de consulta adequados para a API
    if (filters.name) {
        params.name = filters.name
    }
    if (filters.colors) {
        params.colors = filters.colors.join(','); // Assume que a API aceita cores separadas por vírgula
    }
    if (filters.text) {
        params.text = filters.text;
    }
    if (filters.language) {
        params.language = filters.language;
    }
    if (filters.type) {
        params.type = filters.type;
    }

    try {
        const response = await axios.get(API_URL, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching cards:', error);
        throw error;
    }
}
