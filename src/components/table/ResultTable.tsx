import React, {FC} from "react";

interface Props{
    result: number[][]
    time: number[]
}

const ResultTable:FC<Props> = ({result, time}) => {

    return (
        <div >
            <table className={`py-2 px-2 transition duration-300 ease-in-out`}>
                <thead>
                <tr>
                    <th className="font-medium text-sm text-white border-2 border-blackGreen bg-lightGreen">Время</th>
                    {result[0].map((i, index) => (
                        <th className="font-medium text-sm text-white border-2 border-blackGreen bg-lightGreen"
                            key={index}> C {index + 1}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {time.map((time, timeIndex) => (
                    <tr key={timeIndex}>
                        <td className="font-medium text-sm border-2 border-blackGreen">{time}</td>
                        {result[0].map((_, colIndex) => (
                            <td className="font-medium text-sm border-2 border-blackGreen"
                                key={colIndex}>{result.map(row => row[colIndex])[timeIndex]}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ResultTable