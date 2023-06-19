import React, {FC} from "react";
import {ISensitivityResult} from "../../entities/ISensitivityResult";

interface Props{
    result: number[][]
    time: number[]
    constant_speed_num: number[]
}

const SensitivityTable:FC<Props> = ({result, time, constant_speed_num}) => {

    return(
        <div>
            <table className={`py-2 px-2 transition duration-300 ease-in-out`}>
                <thead>
                <tr>
                     <th className="font-medium text-sm text-white border-2 border-blackGreen bg-lightGreen">Время, с</th>
                    {constant_speed_num.map((k, ki) => (
                        <th className="font-medium text-sm text-white border-2 border-blackGreen bg-lightGreen"
                            key={ki}> k{ki + 1} </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {time.map((t, tIndex) => (
                    <tr key={tIndex}>
                        <td className="font-medium text-sm border-2 border-blackGreen">{t.toString().replace(".", ",") }</td>
                        {result[0].map((_, colIndex) => (
                            <td className="font-medium text-sm border-2 border-blackGreen"
                                key={colIndex}>{(result.map(row => row[colIndex])[tIndex].toString().replace(".", ",") )}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default SensitivityTable