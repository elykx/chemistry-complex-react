import React, {FC} from 'react';

interface Props {
    resultArray?: number[][];
}

const ExperimentalPointTable: FC<Props> = ({ resultArray }) => {
    return (
        <table className="border-2 w-4/5">
            <thead>
            <tr>
                {['Номер стадии', 'Время',
                    ...Array(resultArray ? resultArray[0].length - 1 : 1)
                    .fill(0)
                    .map((_, i) => `С${i + 1}`),
                ].map((cell, i) => (
                    <th className="font-medium text-sm text-white border-2 border-blackGreen bg-lightGreen" key={i}>
                        {cell}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {resultArray?.map((row, i) => (
                <tr key={i}>
                    <td className="font-medium text-sm border-2 border-blackGreen">
                        {`${i + 1}`}
                    </td>
                    {row.map((cell, j) => (
                        <td className="font-medium text-sm border-2 border-blackGreen" key={j}>
                            {cell}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ExperimentalPointTable;