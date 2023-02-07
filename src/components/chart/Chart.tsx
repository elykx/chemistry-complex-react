import React, { FC } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {IResultNumber} from "../../entities/IResultNumber";

const LineGraph: FC<{ data: IResultNumber }> = ({ data }) => {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const colors = [
        '#FF5733', '#b0745c', '#ff008c', '#FFFF00', '#1E90FF',
        '#8B4513', '#2E8B57', '#6A5ACD', '#228B22', '#FF6347',
        '#006400', '#8B008B', '#8B0000', '#9400D3', '#FF00FF',
        '#00FF7F', '#3CB371', '#00FF00', '#FFD700', '#40E0D0',
    ];

    const chartData = {
        labels: data.time,
        datasets: data.result[0].map((_, i) => ({
        label: `C${i + 1}`,
        data: data.result.map(row => row[i]),
        borderColor: colors[i],
        fill: false,
        })),

    };

    const options = {
        responsive: true,
        radius: 1,
        hoverRadius:2,
        borderWidth: 2,
        plugins: {
            legend: {
                position: 'right' as const,
            },
            title: {
                display: true,
                text: 'График системы ОДУ',
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default LineGraph;