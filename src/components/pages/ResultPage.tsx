import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import {IResultData} from "../../entities/IResultData";
import {resultDataURL} from "../../config";

interface IResultNumber{
    result: number[][]
    time: number[]
}

const ResultPage: FC = () => {
    const [resultData, setResultData] = useState<IResultData>();
    const [resultArray, setResultArray] = useState<IResultNumber>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get<IResultData>(resultDataURL);
            if (Array.isArray(response.data)) {
                setResultData(response.data[0]);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (resultData) {
            setResultArray({
                time: JSON.parse(resultData.time ),
                result: JSON.parse(resultData.result )
            });
        }
    }, [resultData]);

    return (
        <div>
            <table className="border-2 w-4/5">
                <thead>
                <tr>
                    <th className="font-medium text-sm text-white border-2 border-blackGreen bg-lightGreen">Время</th>
                    {resultArray?.result[0].map((i, index) => (
                        <th className="font-medium text-sm text-white border-2 border-blackGreen bg-lightGreen"
                            key={index}> C {index + 1}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {resultArray?.time.map((time, timeIndex) => (
                    <tr key={timeIndex}>
                        <td className="font-medium text-sm border-2 border-blackGreen">{time}</td>
                        {resultArray?.result[0].map((_, colIndex) => (
                            <td className="font-medium text-sm border-2 border-blackGreen"
                                key={colIndex}>{resultArray?.result.map(row => row[colIndex])[timeIndex]}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultPage;