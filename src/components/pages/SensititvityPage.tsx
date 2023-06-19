import React, {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {IResultNumber} from "../../entities/IResultNumber";
import {ISensitivityResult} from "../../entities/ISensitivityResult";
import axios from "axios";
import {IResultData} from "../../entities/IResultData";
import {getSensitivityURL, resultDataURL} from "../../config";
import mainImage from "../../assets/images/mainImage.png";
import SensitivityTable from "../table/SensitivityTable";
import SensitivityChart from "../chart/SensitivityChart";
import SensitivityTime from "../chart/SensitivityTime";
import SensitivitySKOmus from "../chart/SensitivitySKOmus";
import Sensitivity3DChart from "../chart/Sensitivity3DChart";

const SensitivityPage: FC = () => {

    const {inputDataId} = useParams();
    const [sensitivity, setSensitivity] = useState<ISensitivityResult>();

    useEffect(() => {
        const fetchData = async () => {
            if (inputDataId) {
                const response = await axios.get<ISensitivityResult>(`${getSensitivityURL}${inputDataId}/`);
                await setSensitivity({
                    average: response.data.average,
                    absolute_average: response.data.absolute_average,
                    standart_deviation: response.data.standart_deviation,
                    constant_speed_num: response.data.constant_speed_num,
                    time: response.data.time,
                })
            }
        }
        fetchData();
    }, []);

    console.log(sensitivity?.average)

    return (
        <div>
            <div className="flex">
                <div className={`border overflow-x-auto max-w-screen-lg w-2/5 p-4 bg-white}`}>
                    <h1>1) График зависимости стандарного отклонения по времени</h1>
                    {sensitivity ? <SensitivityTime y={sensitivity.standart_deviation}
                                  x={sensitivity.time} textX={"Время, с"} textY={"𝜎, -"} typeChart={"line"}/> : <div>No data</div>}
                    <h1>2) График зависимости абсолютного среднего значения по времени</h1>
                    {sensitivity ? <SensitivityTime y={sensitivity.absolute_average}
                                  x={sensitivity.time} textX={"Время, с"} textY={"𝜇∗, -"} typeChart={"scatter"}/> : <div>No data</div>}
                    <h1>3) График зависимости</h1>
                    {sensitivity ? <SensitivityChart y={sensitivity.absolute_average[10]}
                                  x={sensitivity.constant_speed_num} textX={"Константы скорости"} textY={"𝜇∗, -"} typeChart={"bar"}/> : <div>No data</div>}
                </div>
                <div className={`overflow-x-auto max-w-screen-lg w-3/5 p-4 bg-white `}>
                    <h1>График </h1>
                    <h2>Для оценки общего влияние фактора на результат</h2>
                    {sensitivity ? <SensitivityTable result={sensitivity.absolute_average}
                                  time={sensitivity.time}
                                  constant_speed_num={sensitivity.constant_speed_num}/> : <div>No data</div>}
                    <h1>Cтандартное отклонение для оценки совокупности эффектов фактора. </h1>
                    {sensitivity ? <SensitivityTable result={sensitivity.standart_deviation}
                                  time={sensitivity.time}
                                  constant_speed_num={sensitivity.constant_speed_num}/> : <div>No data</div>}
                    <h1>mu</h1>
                    {sensitivity ? <SensitivityTable result={sensitivity.average}
                                  time={sensitivity.time}
                                  constant_speed_num={sensitivity.constant_speed_num}/> : <div>No data</div>}
                </div>

            </div>
            {sensitivity ? <Sensitivity3DChart sko={sensitivity.standart_deviation}
                                  mus={sensitivity.absolute_average} time={sensitivity.time} /> : <div>No data</div>}
        </div>

    );
};
export default SensitivityPage;