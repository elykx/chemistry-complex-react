import React, { FC, useState } from 'react';

interface Props {
    firstRow: string[];
    inputDataArray: any[][];
    firstColumnText: string;
}

const InputTable:FC<Props> = ({ firstRow, inputDataArray, firstColumnText }) => {
    const [inputData, setInputData] = useState(inputDataArray);

    return (
        <table className="border-2 w-4/5">
            <thead>
                <tr>
                    {firstRow.map((cell, i) => (
                        <th className="font-medium text-sm border-2 border-[#12221a]"
                            key={i} >
                            {cell}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
            {inputData.map((row, i) => (
                <tr key={i}>
                    <td className="font-medium text-sm border-2 border-[#12221a]">
                        {`${firstColumnText} ${i + 1}`}
                    </td>
                    {row.map((cell, j) => (
                        <td className="font-medium text-sm border-2 border-[#12221a]" key={j}>
                            <input className="w-7"
                                   type="number"
                                   value={cell}
                                   onChange={(e) =>
                                       setInputData((prevData) => {
                                           prevData[i][j] = Number(e.target.value);
                                           return [...prevData];
                                       })
                                   }
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