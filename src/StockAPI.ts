import axios from 'axios';

export interface StockData {
    symbol: string;
    shortName: string;
    longName: string;
    currency: string;
    regularMarketPrice: number;
    regularMarketChange: number;
    regularMarketChangePercent: number;
    regularMarketDayRange: string;
    fiftyTwoWeekRange: string;
    dividendsData: DividendData;
    dividendYield: number;
}

interface Dividend {
    assetIssued: string;
    paymentDate: string;
    rate: number;
}

interface DividendData {
    cashDividends: Dividend[];
}

function getCashDividends(stockData: StockData): Dividend[] {
    if (stockData?.dividendsData?.cashDividends) {
        return stockData.dividendsData.cashDividends;
    }
    return [];
}

// Função auxiliar para verificar se o assetIssued atende às condições
function isValidAssetIssued(symbol: string, assetIssued: string): boolean {
    return (
        (symbol.includes('4') && assetIssued.includes('ACNPR')) ||
        (symbol.includes('3') && assetIssued.includes('ACNOR')) ||
        (symbol.includes('11') && (assetIssued.includes('CTF') || assetIssued.includes('CDAM'))) ||
        (symbol.includes('6') && assetIssued.includes('ACNPB')) ||
        (symbol.includes('5') && assetIssued.includes('ACNPA'))
    );
}


function calculateDividendYieldLast12Months(stock: StockData): number {
    // Preço atual da ação
    const currentPrice = stock.regularMarketPrice;

    // Lista de dividendos dos últimos 12 meses
    const dividendsData = getCashDividends(stock);

    // Data atual
    const currentDate = new Date();

    // Data de 12 meses atrás a partir da data atual
    const twelveMonthsAgo = new Date(currentDate);
    twelveMonthsAgo.setFullYear(currentDate.getFullYear() - 1);

    // Soma dos dividendos pagos nos últimos 12 meses
    let totalDividends = 0;

    // Percorre os dividendos
    dividendsData.forEach((dividend) => {
        const paymentDate = new Date(dividend.paymentDate);
        if (paymentDate >= twelveMonthsAgo && !isNaN(dividend.rate)) {
            // Verifica se o assetIssued atende às condições e só então soma o rate
            if (isValidAssetIssued(stock.symbol, dividend.assetIssued)) {
                totalDividends += dividend.rate;
            }
        }
    });

    // Calcula o Dividend Yield em %
    const dividendYieldPercentage = (totalDividends / currentPrice) * 100;
    return dividendYieldPercentage;
}

class StockAPI {
    static async fetchStockData(symbol: string): Promise<StockData | null> {
        try {
            const response = await axios.get(
                `https://brapi.dev/api/quote/${symbol}?interval=ytd&fundamental=true&dividends=true`
            );

            const stockData = response.data.results[0];
            if (stockData) {
                return {
                    symbol: stockData.symbol,
                    shortName: stockData.shortName,
                    longName: stockData.longName,
                    currency: stockData.currency,
                    regularMarketPrice: stockData.regularMarketPrice,
                    regularMarketChange: stockData.regularMarketChange,
                    regularMarketChangePercent: stockData.regularMarketChangePercent,
                    regularMarketDayRange: stockData.regularMarketDayRange,
                    fiftyTwoWeekRange: stockData.fiftyTwoWeekRange,
                    dividendYield: calculateDividendYieldLast12Months(stockData),
                    dividendsData: stockData.dividendsData
                };
            } else {
                return null;
            }
        } catch (error) {
            console.error('Erro ao buscar a cotação do ativo:', error);
            return null;
        }
    }
}

export default StockAPI;
