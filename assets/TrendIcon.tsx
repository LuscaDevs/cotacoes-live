/**
 * Componente de ícone de tendência.
 * Exibe uma seta para cima, para baixo ou sem variação, dependendo do valor de mudança fornecido.
 * @param {number} changeValue - O valor de mudança para determinar a direção do ícone.
 */

import React from 'react';
import { Path, Svg } from 'react-native-svg';

const up = "M1.41421 16.4322L0 15.018L7.07107 7.94693L13.435 14.3109L17.6777 10.0682L15.9353 8.32587L22.6274 6.53271L20.8343 13.2248L19.0919 11.4825L13.435 17.1393L7.07107 10.7754L1.41421 16.4322Z";
const down = "M1.85104 8.10628L0.436829 9.52049L7.5079 16.5916L13.8719 10.2276L18.1145 14.4702L16.3721 16.2126L23.0642 18.0058L21.2711 11.3136L19.5287 13.056L13.8719 7.39917L7.5079 13.7631L1.85104 8.10628Z";
const noVariation = "M15.0378 6.34317L13.6269 7.76069L16.8972 11.0157L3.29211 11.0293L3.29413 13.0293L16.8619 13.0157L13.6467 16.2459L15.0643 17.6568L20.7079 11.9868L15.0378 6.34317Z";
let iconColor = "";
interface IconProps {
    changeValue: number;
}

export const Trending: React.FC<IconProps> = ({ changeValue }) => {
    let iconPath = '';

    if (changeValue > 0) {
        iconPath = up;
        iconColor = "green";
    } else if (changeValue < 0) {
        iconPath = down;
        iconColor = "red";
    } else {
        iconPath = noVariation;
        iconColor = "grey";
    }

    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" >
            <Path d={iconPath} fill={iconColor} />
        </Svg>
    );
};
