import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import {IResultData} from "../../entities/IResultData";
import {resultDataURL} from "../../config";
import {IResultNumber} from "../../entities/IResultNumber";
import LineGraph from "../chart/Chart";
import {useNavigate, useParams} from "react-router-dom";
import ExperimentalPointTable from "../table/ExperimentalPointTable";
import ResultTable from "../table/ResultTable";

const ResultPage: FC = () => {
    const navigate = useNavigate();

    const [resultArray, setResultArray] = useState<IResultNumber>();
    const [tableId, setTableId] = useState<number>();
    const [inputId, setInputId] = useState<number>();

    const [tableIsCollapsed, setTableIsCollapsed] = useState(true);
    const [graphIsCollapsed, setGraphIsCollapsed] = useState(true);
    const [expDataIsCollapsed, setExpDataIsCollapsed] = useState(true);

    const {inputDataId} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            if (inputDataId){
                const response = await axios.get<IResultData>(`${resultDataURL}${inputDataId}/`);
                await setResultArray({
                    input_data:{
                        table_parameters: response.data.input_data.table_parameters,
                        initial_time: JSON.parse(String(response.data.input_data.initial_time)),
                        time: JSON.parse(String(response.data.input_data.time)),
                        step: JSON.parse(String(response.data.input_data.step)),
                        method: response.data.input_data.method,
                        matrix_stechiometric_coefficients: JSON.parse(String(response.data.input_data.matrix_stechiometric_coefficients)),
                        matrix_indicators: JSON.parse(String(response.data.input_data.matrix_indicators)),
                        experimental_data: JSON.parse(String(response.data.input_data.experimental_data)),
                        constants_speed: JSON.parse(String(response.data.input_data.constants_speed)),
                    },
                    time: JSON.parse(response.data.time),
                    result: JSON.parse(response.data.result),
                    experimental_point: JSON.parse(response.data.experimental_point),
                })
                let data = response.data as any;
                await setTableId(data.input_data.table_parameters.id)
                await setInputId(data.input_data.id)
            }
        };
        fetchData();
    }, []);

    const NavigateToCompare = (event: React.MouseEvent<HTMLButtonElement>) =>{
        navigate(`/compare-result/${inputId}`)
    }
    const NavigateToInput = (event: React.MouseEvent<HTMLButtonElement>) => {
        navigate(`/input-data/${tableId}`)
    }

    return (
        <div>
            <div className='flex flex-wrap justify-center items-center mx-auto max-w-screen-xl bg-lightGreen' >
                <div className='m-2'>
                    <button className=" border border-black bg-white text-black text-sm rounded-lg py-1 px-2
                        hover:bg-lightGreen hover:text-white"
                             onClick={NavigateToInput}>Решить другим методом</button>
                </div>
                <div className='m-2'>
                    <button className=" border border-black bg-white text-black text-sm rounded-lg py-1 px-2
                        hover:bg-lightGreen hover:text-white"
                            onClick={NavigateToCompare}>Сравнить решение</button>
                </div>
                <div className='m-2'>
                    <button className=" border border-black bg-white text-black text-sm rounded-lg py-1 px-2
                        hover:bg-lightGreen hover:text-white"
                            onClick={NavigateToInput}>Провести оптимизацию</button>
                </div>
                <div className='m-2'>
                    <button className=" border border-black bg-white text-black text-sm rounded-lg py-1 px-2
                        hover:bg-lightGreen hover:text-white"
                            onClick={NavigateToInput}>Провести оценку чувствительности</button>
                </div>
            </div>
            <div className="flex">
                <div className={`${tableIsCollapsed ? 'w-5/6 ' : 'w-1/5'} overflow-x-auto max-w-screen-lg  p-4 bg-white `}>
                    <div>
                        <button className=" border border-black bg-white text-black text-sm rounded-lg py-2 px-4
                        hover:bg-lightGreen hover:text-white"
                                onClick={() => setTableIsCollapsed(!tableIsCollapsed)}>Скрыть/показать решение</button>
                    </div>
                    <div className={`${tableIsCollapsed ? 'w-5/6 ' : 'w-1/5'} py-2 px-2 transition duration-300 ease-in-out`} >
                        { resultArray ? <ResultTable result={resultArray.result} time={resultArray.time}/> : <div>No data</div> }
                    </div>
                </div>

                <div className={`border overflow-x-auto max-w-screen-lg  p-4 bg-white ${graphIsCollapsed || expDataIsCollapsed ? 'w-5/6' : 'w-1/6'}`}>
                    <button className=" border border-black bg-white text-black text-sm rounded-lg py-2 px-4
                        hover:bg-lightGreen hover:text-white"
                            onClick={() => setGraphIsCollapsed(!graphIsCollapsed)}>Скрыть/показать график</button>
                    <div className={`${graphIsCollapsed ? 'block' : 'hidden'} py-2 px-2 transition duration-300 ease-in-out`}
                         style={{ width: "500px", height: "250px"}}>
                        {resultArray ? <LineGraph data={resultArray} /> : <div>No data</div>}
                    </div>

                    <button className="border border-black bg-white text-black text-sm rounded-lg py-2 px-2
                        hover:bg-lightGreen hover:text-white"
                            onClick={() => setExpDataIsCollapsed(!expDataIsCollapsed)}>Скрыть/показать эксп. данные</button>
                    <div className={`${expDataIsCollapsed ? 'block' : 'hidden'} py-2 px-2 transition duration-300 ease-in-out`}>
                        <label className="block text-blackGreen font-medium mt-2 mb-2">Экспериментальные значения</label>
                        <ExperimentalPointTable resultArray={resultArray?.input_data.experimental_data}/>
                        <label className="block text-blackGreen font-medium mt-2 mb-2">Рассчетные значения в экспериментальных точках</label>
                        <ExperimentalPointTable resultArray={resultArray?.experimental_point}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;