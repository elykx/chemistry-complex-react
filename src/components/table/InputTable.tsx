import React, {FC, useEffect, useState} from 'react';

interface Props {
    firstRow: string[];
    inputDataArray: number[][];
    firstColumnText: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, i: number, j: number) => void;
    dataName:string;
}

const InputTable:FC<Props> = ({ firstRow, inputDataArray, firstColumnText,onChange, dataName}) => {
    const [inputData, setInputData] = useState(inputDataArray);

    useEffect(() => {
        setInputData(inputDataArray);
    }, [inputDataArray]);

    return (
        <table className="border-2 w-4/5">
            <thead>
                <tr>
                    {firstRow.map((cell, i) => (
                        <th className="font-medium text-sm text-white border-2 border-blackGreen bg-lightGreen"
                            key={i} >
                            {cell}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
            {inputData.map((row, i) => (
                <tr key={i}>
                    <td className="font-medium text-sm border-2 border-blackGreen">
                        {`${firstColumnText} ${i + 1}`}
                    </td>
                    {row.map((cell, j) => (
                        <td className="font-medium text-sm border-2 border-blackGreen" key={j}>
                            <input className="w-14"
                                   type="number"
                                   value={
                                    dataName === 'experimental_data' || dataName === 'constants_speed'
                                    ? cell
                                    : dataName === 'matrix_indicators' && cell === -1
                                    ? ''
                                    : dataName === 'matrix_stechiometric_coefficients' && cell === 0
                                    ? ''
                                    : cell}
                                   onChange={(e)=>onChange(e,i,j)}
                            />
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}
export default InputTable