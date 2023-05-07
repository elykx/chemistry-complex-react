import React, {FC} from 'react';

interface Props {
    resultArray: number[][];
}

const ExperimentalPointTable: FC<Props> = ({ resultArray }) => {
    return (
        <table className="border-2 w-4/5 mb-2 ml-4">
            <thead>
            <tr>
                {['№', 'Время, с',
                    ...Array(resultArray[0].length - 1)
                    .fill(0)
                    .map((_, i) => `С${i + 1}, моль/л`),
                ].map((cell, i) => (
                    <th className="font-medium text-sm text-white border-2 border-blackGreen bg-lightGreen" key={i}>
                        {cell}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {resultArray && Array.isArray(resultArray) ? resultArray.map((row, i) => (
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
            )): null}
            </tbody>
        </table>
    );
};

export default ExperimentalPointTable;