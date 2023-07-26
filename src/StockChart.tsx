import React from "react";
import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLine, VictoryScatter, VictoryTooltip, VictoryVoronoiContainer } from "victory-native";
import { StockData } from "./StockAPI";
import styled from "styled-components/native";
import { View } from "react-native";

const ChartContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #1b2223;
`;

const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};


export const TwelveMonthsChart = (stock: StockData) => {
    const dataForChart = stock.historicalDataPrice
        .map((item) => {
            const yValue = Number(item.adjustedClose);
            return Number.isFinite(yValue) && yValue !== 0 ? { x: new Date(item.date * 1000), y: yValue } : null;
        })
        .filter((item) => item !== null);

    dataForChart.sort((a, b) => {
        if (a !== null && b !== null) {
            return b.y - a.y;
        }
        return 0;
    });

    return (
        <ChartContainer >
            <VictoryChart containerComponent={<VictoryVoronoiContainer />} domainPadding={{ y: 5 }}>
                <VictoryLabel
                    text={`Cotação do ${stock.symbol}`}
                    x={225} // Posição X do título
                    y={30} // Posição Y do título
                    textAnchor="middle" // Alinhamento do texto ao centro
                    style={{
                        fill: "#F4fefd", // Cor do título
                        fontSize: 20, // Tamanho do texto do título
                    }}
                />
                <VictoryAxis
                    tickLabelComponent={<VictoryLabel angle={-45} style={{ fontSize: 8, fill: '#F4fefd' }} />}
                    tickFormat={(x) => formatDate(new Date(x))}
                    style={{
                        axis: { stroke: '#F4fefd' },
                        tickLabels: { fill: '#F4fefd' },
                    }}
                    tickCount={Math.min(25, dataForChart.length)}
                />
                <VictoryAxis dependentAxis
                    style={{
                        axis: { stroke: '#F4fefd' },
                        tickLabels: { fill: '#F4fefd' },
                    }}
                    tickCount={Math.min(6, dataForChart.length)}
                />

                <VictoryLine
                    style={{
                        data: { stroke: "#0ef6cc" },
                    }}
                    labels={({ datum }) => `R$${datum.y.toFixed(2)} \n ${formatDate(new Date(datum.x))}`} // Formatação para exibir com duas casas decimais
                    data={dataForChart}
                    interpolation={"natural"}
                    labelComponent={<VictoryTooltip renderInPortal={false} center={{ x: 220, y: 80 }} flyoutStyle={{ fill: '#F4fefd' }} />}
                />

                <VictoryScatter
                    data={dataForChart}
                    style={{
                        data: {
                            fill: '#3a4f50', // Cor de preenchimento do símbolo de dispersão
                            stroke: '#F4fefd', // Cor da borda do símbolo de dispersão
                            strokeWidth: 1, // Espessura da borda
                        },

                    }}
                    size={1}
                />
            </VictoryChart>
        </ChartContainer>
    );
};

export const DividendsChart = (stock: StockData) => {
    const dataForChart: { [key: string]: { x: Date; y: number } } = {};
    if (!stock.dividendsData || !stock.dividendsData.cashDividends || stock.dividendsData.cashDividends.length === 0) {
        // Caso o array cashDividends não exista, esteja vazio ou seja nulo, você pode retornar ou fazer outra ação apropriada.
        // Por exemplo, você pode retornar null ou um array vazio para não exibir o gráfico de dividendos.
        return null;
    }

    stock.dividendsData.cashDividends.forEach((item) => {
        const paymentDate = new Date(item.paymentDate);
        const yValue = Number(item.rate !== null ? item.rate.toFixed(2) : 0);

        // Verifica se a data já existe no objeto auxiliar
        if (dataForChart[paymentDate.toISOString()]) {
            // Se a data já existe, soma o valor de y ao valor existente
            dataForChart[paymentDate.toISOString()].y += yValue;
        } else {
            // Caso contrário, cria um novo objeto para a data com o valor de y
            dataForChart[paymentDate.toISOString()] = { x: paymentDate, y: yValue };
        }
    });

    // Converte o objeto em um array
    const chartData = Object.values(dataForChart);

    // Ordena o array por data
    chartData.sort((a, b) => a.x.getTime() - b.x.getTime());

    chartData.shift();

    return (
        <ChartContainer>
            <VictoryChart containerComponent={<VictoryVoronoiContainer />} domainPadding={{ y: 5 }}>
                <VictoryLabel
                    text={`Dividendos do ${stock.symbol}`}
                    x={225} // Posição X do título
                    y={30} // Posição Y do título
                    textAnchor="middle" // Alinhamento do texto ao centro
                    style={{
                        fill: "#F4fefd", // Cor do título
                        fontSize: 20, // Tamanho do texto do título
                    }}
                />
                <VictoryAxis
                    tickLabelComponent={<VictoryLabel angle={-45} style={{ fontSize: 8, fill: '#F4fefd' }} />}
                    tickFormat={(x) => formatDate(new Date(x))}
                    style={{
                        axis: { stroke: '#F4fefd' },
                        tickLabels: { fill: '#F4fefd' },
                    }}
                    tickCount={Math.min(25, chartData.length)}
                />
                <VictoryAxis dependentAxis
                    style={{
                        axis: { stroke: '#F4fefd' },
                        tickLabels: { fill: '#F4fefd' },
                    }}
                    tickCount={Math.min(6, chartData.length)}
                />

                <VictoryLine
                    style={{
                        data: { stroke: "#0ef6cc" },
                    }}
                    labels={({ datum }) => `R$${datum.y.toFixed(2)} \n ${formatDate(new Date(datum.x))}`} // Formatação para exibir com duas casas decimais
                    data={chartData}
                    interpolation={"natural"}
                    labelComponent={<VictoryTooltip renderInPortal={false} center={{ x: 220, y: 80 }} flyoutStyle={{ fill: '#F4fefd' }} />}
                />

                <VictoryScatter
                    data={chartData}
                    style={{
                        data: {
                            fill: '#3a4f50', // Cor de preenchimento do símbolo de dispersão
                            stroke: '#F4fefd', // Cor da borda do símbolo de dispersão
                            strokeWidth: 1, // Espessura da borda
                        },

                    }}
                    size={1}
                />
            </VictoryChart>
        </ChartContainer>
    )
}


