import axios from "axios";

const BrapiAvaiableStocks = async () => {
    try {
        const response = await axios.get(
            `https://brapi.dev/api/available`
        );

        return response.data.stocks as string[];
    } catch (error) {
        console.error('Erro ao buscar símbolos:', error);
        return [];
    }
}

export default BrapiAvaiableStocks;
