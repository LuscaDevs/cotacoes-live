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
    historicalDataPrice: IHistoricalDataPrice[];
    twelveMonthsVariationPercent: number;
    logourl: string;
}
export interface IHistoricalDataPrice {
    date: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    adjustedClose: number;
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

function getTwelveMonthsVariationPercent(stock: StockData): number {
    const currentPrice = stock.regularMarketPrice;
    const historicalData = stock.historicalDataPrice;

    // Data atual
    const currentDate = new Date();

    // Data de 12 meses atrás a partir da data atual
    const twelveMonthsAgo = new Date(currentDate);
    twelveMonthsAgo.setFullYear(currentDate.getFullYear() - 1);

    // Verifica se a data de 12 meses atrás é um sábado (6) ou domingo (0)
    const dayOfWeekTwelveMonthsAgo = twelveMonthsAgo.getDay();
    if (dayOfWeekTwelveMonthsAgo === 0) { // Domingo
        twelveMonthsAgo.setDate(twelveMonthsAgo.getDate() - 2); // Obtém a sexta-feira anterior
    } else if (dayOfWeekTwelveMonthsAgo === 6) { // Sábado
        twelveMonthsAgo.setDate(twelveMonthsAgo.getDate() - 1); // Obtém a sexta-feira anterior
    }

    const lastTwelveMonthsData = historicalData.filter(
        (data) => new Date(data.date * 1000) >= twelveMonthsAgo
    );

    const twelveMonthsAgoPrice =
        lastTwelveMonthsData.length > 0
            ? lastTwelveMonthsData[0].adjustedClose
            : stock.regularMarketPrice;

    // Calcula a variação percentual entre o preço atual e o preço de 12 meses atrás
    const variationPercent = ((currentPrice - twelveMonthsAgoPrice) / twelveMonthsAgoPrice) * 100;

    return variationPercent;
}


class StockAPI {
    static async fetchStockData(symbol: string, range: string = '1y', interval: string = '1d'): Promise<StockData | null> {
        try {
            const response = await axios.get(
                `https://brapi.dev/api/quote/${symbol}?range=${range}&interval=${interval}&fundamental=true&dividends=true`
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
                    dividendsData: stockData.dividendsData,
                    historicalDataPrice: stockData.historicalDataPrice,
                    twelveMonthsVariationPercent: getTwelveMonthsVariationPercent(stockData),
                    logourl: stockData.logourl
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
