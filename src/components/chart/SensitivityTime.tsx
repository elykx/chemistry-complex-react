import React, {FC} from "react";
import {IResultNumber} from "../../entities/IResultNumber";
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";
import {Bar, Line, Scatter} from "react-chartjs-2";

interface Props{
    y: number[][]
    x: number[]
    textY: string
    textX: string
    typeChart: string
}
const SensitivityTime:FC<Props> = ({y, x,textY, textX, typeChart}) => {

    ChartJS.register(
        BarElement,
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
            labels: x,
            datasets: y[0].map((_, i) => ({
            label: `k${i + 1}`,
            data: y.map(row => row[i]),
            borderColor: colors[i],
            fill: false,
            })),

    };

    const options = {
        responsive: true,
        radius: 0.5,
        hoverRadius:3,
        borderWidth: 2,
        scales: {
            y: {
                title:{
                    display: true,
                    text: textY
                },
                min: 0,
                ticks: {
                    beginAtZero: true,
                    precision: 0,
                    min: 0,
                }
            },
            x: {
                title:{
                    display: true,
                    text: textX
                },
            }

        },
        plugins: {
            legend: {
                position: 'right' as const,
                labels: {
                  boxWidth:25,
                    boxHeight:1,
                },
            },
        },
    };
        if (typeChart === 'bar'){
       return <Bar data={chartData} options={options} />;
    }
    else {
       return <Line data={chartData} options={options} />;
    }
    return <div></div>


};

export default SensitivityTime;