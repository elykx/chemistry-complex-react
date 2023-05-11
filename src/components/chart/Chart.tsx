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
        '#ff2d00', '#916857', '#ff008c', '#ffff00', '#FF00FF',
        '#502c14', '#00ff6f', '#2400ff', '#033403', '#FF6347',
        '#ff0000', '#00ffd1', '#b700ff', '#ff00f2', '#1E90FF',
        '#00FF7F', '#3CB371', '#00FF00', '#FFD700', '#40E0D0',
    ];

    const lines = [
        [], [1, 1], [15, 3, 3, 3], [10, 10], [20, 5],
        [5, 5], [5, 5, 5, 3], [15, 5, 5, 5], [20, 3, 3, 3, 3, 3, 3, 3], [12, 3, 3],
        [2, 2], [3, 13], [15, 10], [10, 10], [20, 5],
        [15, 3, 3, 3], [5, 5, 5, 3], [15, 5, 5, 5], [20, 3, 3, 3, 3, 3, 3, 3], [12, 3, 3],
    ];



    const chartData = {
        labels: data.time.map(value => {
            return value.toFixed(value % 1 !== 0 ? 1 : 0).toString().replace(".", ","); // округляем до 1 знака после запятой, если число не является целым
        }),
        datasets: data.result[0].map((_, i) => ({
        label: `C${i + 1}`,
        data: data.result.map(row => row[i]),
        borderColor: colors[i],
        borderDash: lines[i],
        fill: false,
        })),

    };

    const options = {
        responsive: true,
        radius: 0,
        hoverRadius:3,
        borderWidth: 2,
        scales: {
            y: {
                title:{
                    display: true,
                    text: "Концентрация, моль/л"
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
                    text: "Время, с"
                },
                min: data.time[0],
                ticks: {
                }
            }

        },
        plugins: {
            legend: {
                position: 'right' as const,
                labels: {
                  boxWidth:20,
                    boxHeight:2,
                },
            },
            title: {
                display: true,
                text: 'Зависимость концентраций от времени',
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default LineGraph;