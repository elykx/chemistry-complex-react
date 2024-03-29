import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import {IResultData} from "../../entities/IResultData";
import {getSensitivityURL, resultDataURL, saveResultDataURL, tableParametersURL} from "../../config";
import {IResultNumber} from "../../entities/IResultNumber";
import LineGraph from "../chart/Chart";
import {useNavigate, useParams} from "react-router-dom";
import ExperimentalPointTable from "../table/ExperimentalPointTable";
import ResultTable from "../table/ResultTable";
import Modal from "react-modal";
import ErrorModal from "../modals/ErrorModal";

const ResultPage: FC = () => {

    Modal.setAppElement('#root');
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [errorTextValue, setErrorTextValue] = useState("");

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
                try {
                    await setResultArray({
                        input_data: {
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
                        error_exp_point: JSON.parse(response.data.error_exp_point),
                        runtime: response.data.runtime,
                    })
                }
                catch(error) {
                        setErrorText(`Невозможно произвести расчет интеграла. Измените шаг интегрирования или входные данные.`);
                        setIsModalOpen(true);
                }
                let data = response.data as any;
                await setTableId(data.input_data.table_parameters.id)
                await setInputId(data.input_data.id)
            }
            if (resultArray){
               let hasNegativeValues = false;
                for (let i = 0; i < resultArray!.result.length; i++) {
                    for (let j = 0; j < resultArray!.result[i].length; j++) {
                        if (resultArray!.result[i][j] < 0) {
                            hasNegativeValues = true;
                            break;
                        }
                    }
                    if (hasNegativeValues) {
                        break;
                    }
                }
                if (hasNegativeValues) {
                    setErrorTextValue(`В расчете интеграла присутствуют некорректные значения. Измените шаг интегрирования или входные данные.`);
                }
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
    const NavigateToSensitivity = (event: React.MouseEvent<HTMLButtonElement>) => {
        navigate(`/sensitivity/${inputId}`)
    }


    const SaveReport = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const saveData = async () => {
            const response = await axios.get(`${saveResultDataURL}${inputDataId}/`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const disposition = response.headers['content-disposition'];
            const filename = disposition ? disposition.split(';')[1].split('filename=')[1].trim() : 'Report.xlsx';
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
        };
        saveData();
    }

    const handleCloseModal = () => {
        setIsModalOpen(false); // закрываем модальное окно
        setErrorText(""); // сбрасываем текст ошибки
    };

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
                            onClick={NavigateToSensitivity}>Провести оценку чувствительности</button>
                </div>
                <div className='m-2'>
                    <button className=" border border-black bg-white text-black text-sm rounded-lg py-1 px-2
                        hover:bg-lightGreen hover:text-white"
                            onClick={SaveReport}>Сохранить отчёт</button>
                </div>
            </div>
            <div className="flex">
                <ErrorModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    errorText={errorText}
                />
                <div className={`${tableIsCollapsed ? 'w-5/6 ' : 'w-1/5'} overflow-x-auto max-w-screen-lg  p-4 bg-white `}>
                    <div>
                        <h1>{errorTextValue}</h1>
                        <button className=" border border-black bg-white text-black text-sm rounded-lg py-2 px-4
                        hover:bg-lightGreen hover:text-white"
                                onClick={() => setTableIsCollapsed(!tableIsCollapsed)}>Свернуть/развернуть решение</button>
                    </div>
                    <p className={`py-2 px-2`}>Время расчета: {resultArray?.runtime} секунд</p>
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
                    { resultArray !== undefined ?
                    <div className={`${expDataIsCollapsed ? 'block' : 'hidden'} py-2 px-2 transition duration-300 ease-in-out`}>
                        <label className="block text-blackGreen font-medium mt-2 mb-2">Экспериментальные значения</label>
                        <ExperimentalPointTable resultArray={resultArray.input_data.experimental_data}/>
                        <label className="block text-blackGreen font-medium mt-2 mb-2">Расчетные значения в экспериментальных точках</label>
                        <ExperimentalPointTable resultArray={resultArray.experimental_point}/>
                        <label className="block text-blackGreen font-medium mt-2 mb-2">Относительная погрешность в экспериментальных точках, %</label>
                        <ExperimentalPointTable resultArray={resultArray.error_exp_point}/>
                    </div>: 'No data'}
                </div>
            </div>
        </div>
    );
};

export default ResultPage;