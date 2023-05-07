import React, {FC, useEffect, useState} from "react";
import {inputDataURL, resultDataURL, tableParametersURL} from "../../config";
import axios from "axios";
import {useParams} from "react-router-dom";
import {ITableData} from "../../entities/ITableData";
import InputSelect from "../inputSelect/InputSelect";
import {IResultData} from "../../entities/IResultData";
import {IResultNumber} from "../../entities/IResultNumber";
import LineGraph from "../chart/Chart";
import ExperimentalPointTable from "../table/ExperimentalPointTable";
import ResultTable from "../table/ResultTable";
import ErrorModal from "../modals/ErrorModal";

const CompareResultPage:FC = () => {

    const [isModalOpenOne, setIsModalOpenOne] = useState(false);
    const [errorTextOne, setErrorTextOne] = useState("");

    const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
    const [errorTextTwo, setErrorTextTwo] = useState("");

    const {inputDataId} = useParams();

    const [tableParamId, setTableParamId] = useState<number>();

    const [inputDataOne, setInputDataOne] = useState<ITableData>({
        table_parameters:{stages:0, components:0, experiments:0},
        initial_time: 0,
        time: 0,
        step: 0,
        method: "EXPLICIT_EULER",
        matrix_stechiometric_coefficients: [],
        matrix_indicators: [],
        experimental_data: [],
        constants_speed: [],

    });
    const [inputDataTwo, setInputDataTwo] = useState<ITableData>({
        table_parameters:{stages:0, components:0, experiments:0},
        initial_time: 0,
        time: 0,
        step: 0,
        method: "EXPLICIT_EULER",
        matrix_stechiometric_coefficients: [],
        matrix_indicators: [],
        experimental_data: [],
        constants_speed: [],

    });

    const [inputDataOneId, setInputDataOneId] = useState<number>();
    const [inputDataTwoId, setInputDataTwoId] = useState<number>();

    const [resultDataOne, setResultDataOne] = useState<IResultNumber>();
    const [resultDataTwo, setResultDataTwo] = useState<IResultNumber>();

    const [firstIsCollapsed, setFirstIsCollapsed] = useState(true);
    const [secondIsCollapsed, setSecondIsCollapsed] = useState(true);

    useEffect(() => {
        const fetchData = async() => {
            if (inputDataId){
                const response = await axios.get<ITableData>(`${inputDataURL}${inputDataId}/`);
                await setInputDataOne({
                    table_parameters:response.data.table_parameters,
                    initial_time: response.data.initial_time,
                    time: response.data.time,
                    step: response.data.step,
                    method: response.data.method,
                    matrix_stechiometric_coefficients: response.data.matrix_stechiometric_coefficients,
                    matrix_indicators: response.data.matrix_indicators,
                    experimental_data: response.data.experimental_data,
                    constants_speed: response.data.constants_speed,
                });
                await setInputDataTwo({
                    table_parameters:response.data.table_parameters,
                    initial_time: response.data.initial_time,
                    time: response.data.time,
                    step: response.data.step,
                    method: response.data.method,
                    matrix_stechiometric_coefficients: response.data.matrix_stechiometric_coefficients,
                    matrix_indicators: response.data.matrix_indicators,
                    experimental_data: response.data.experimental_data,
                    constants_speed: response.data.constants_speed,
                });
                let data = response.data as any;
                await setTableParamId(data.table_parameters.id)
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const fetchDataOne = async () => {
            if (inputDataOne && inputDataTwo) {
                try {
                    const response = await fetch(inputDataURL, {
                        method: 'POST',
                        body: JSON.stringify({
                            "table_parameters": Number(tableParamId),
                            "initial_time": inputDataOne.initial_time,
                            "time": inputDataOne.time,
                            "step": inputDataOne.step,
                            "method": inputDataOne.method,
                            "matrix_stechiometric_coefficients": JSON.stringify(inputDataOne.matrix_stechiometric_coefficients),
                            "matrix_indicators": JSON.stringify(inputDataOne.matrix_indicators),
                            "experimental_data": JSON.stringify(inputDataOne.experimental_data),
                            "constants_speed": JSON.stringify(inputDataOne.constants_speed)
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const data = await response.json()
                    await setInputDataOneId(data.input_data.id)

                } catch (error) {
                    setErrorTextOne(`Невозможно произвести расчет интеграла методом ${inputDataOne.method}. Измените шаг интегрирования или входные данные.`);
                    setIsModalOpenOne(true);
                }

                try {
                    const response = await fetch(inputDataURL, {
                        method: 'POST',
                        body: JSON.stringify({
                            "table_parameters": Number(tableParamId),
                            "initial_time": inputDataTwo.initial_time,
                            "time": inputDataTwo.time,
                            "step": inputDataTwo.step,
                            "method": inputDataTwo.method,
                            "matrix_stechiometric_coefficients": JSON.stringify(inputDataTwo.matrix_stechiometric_coefficients),
                            "matrix_indicators": JSON.stringify(inputDataTwo.matrix_indicators),
                            "experimental_data": JSON.stringify(inputDataTwo.experimental_data),
                            "constants_speed": JSON.stringify(inputDataTwo.constants_speed)
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const data = await response.json()
                    await setInputDataTwoId(data.input_data.id)
                } catch (error) {
                    setErrorTextTwo(`Невозможно произвести расчет интеграла методом ${inputDataTwo.method}. Измените шаг интегрирования или входные данные.`);
                    setIsModalOpenOne(true);
                }
            }
        };
        fetchDataOne();

        console.log(inputDataOneId, inputDataTwoId)

        const fetchData = async () => {
            if (inputDataOneId){
                try {
                    const response = await axios.get<IResultData>(`${resultDataURL}${inputDataOneId}/`);
                    await setResultDataOne({
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
                        error_exp_point: JSON.parse(response.data.error_exp_point),
                    })
                }
                catch (error){
                    setErrorTextOne(`Невозможно произвести расчет интеграла методом ${inputDataOne.method}. Измените шаг интегрирования или входные данные.`);
                    setIsModalOpenOne(true);
                }
            }
            if (inputDataTwoId){
                try{
                    const response = await axios.get<IResultData>(`${resultDataURL}${inputDataTwoId}/`);
                    await setResultDataTwo({
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
                        error_exp_point: JSON.parse(response.data.error_exp_point),
                    })
                }
                catch (error){
                    setErrorTextTwo(`Невозможно произвести расчет интеграла методом ${inputDataTwo.method}. Измените шаг интегрирования или входные данные.`);
                    setIsModalOpenOne(true);
                }

            }

        };
        fetchData();
    }

    const handleCloseModalOne = () => {
        setIsModalOpenOne(false);
        setErrorTextOne("");
    };

    const handleCloseModalTwo = () => {
        setIsModalOpenTwo(false);
        setErrorTextTwo("");
    };

    console.log(typeof resultDataOne?.input_data.experimental_data)

    const methods = [{ value: 'EXPLICIT_EULER', label: 'Явный метод Эйлера' },
        { value: 'IMPLICIT_EULER', label: 'Неявный метод Эйлера' },
        { value: 'SEMI_IMPLICIT_EULER', label: 'Полунеявный метод Эйлера'},
        { value: 'TRAPEZOID', label: 'Метод трапеций' },
        { value: 'MIDDLE', label: 'Метод средней точки' },
        { value: 'EXPLICIT_RK2', label: 'Явный метод Рунге-Кутты 2-го порядка' },
        { value: 'IMPLICIT_RK2', label: 'Неявный метод Рунге-Кутты 2-го порядка' },
        { value: 'SEMI_IMPLICIT_RK2', label: 'Полунеявный метод Рунге-Кутты 2-го порядка'},
        { value: 'EXPLICIT_RK4', label: 'Явный метод Рунге-Кутты 4-го порядка' },
        { value: 'IMPLICIT_RK4', label: 'Неявный метод Рунге-Кутты 4-го порядка' },
        { value: 'SEMI_IMPLICIT_RK4', label: 'Полунеявный метод Рунге-Кутты 4-го порядка' },
        { value: 'KM', label: 'Метод Кутты-Мерсона' },
        { value: 'RKF', label: 'Метод Рунге-Кутты-Фелберга' },
        { value: 'EXPLICIT_ADAMS', label: 'Явный двухшаговый метод Адамса' },]

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="w-full flex ">
                <div className='w-3/6'>
                    <label className="block font-medium mb-2">
                        <span className="text-black text-sm">Расчётные данные #1</span>
                        <InputSelect value={inputDataOne.method}
                                     options={methods}
                                     onChange={e => setInputDataOne({ ...inputDataOne, method: e.target.value })}/>
                    </label>
                </div>
                <div className='w-3/6'>
                    <label className="block font-medium mb-2">
                        <span className="text-black text-sm">Рaсчётные данные #2</span>
                        <InputSelect value={inputDataTwo.method}
                                     options={methods}
                                     onChange={e => setInputDataTwo({ ...inputDataTwo, method: e.target.value })}/>
                    </label>
                </div>
                </div>
                <label className="block font-medium mb-2 py-2">
                    <button className="bg-white text-black rounded-lg py-2 px-4 w-full
                        hover:bg-blackGreen hover:text-white" type="submit">Далее</button>
                </label>
            </form>
            {resultDataOne !== undefined && resultDataTwo !== undefined ?
            <div className="flex">
                <div className={`${firstIsCollapsed ? 'w-5/6 ' : 'w-1/5'} border-2 overflow-x-auto max-w-screen-lg p-4 bg-white `}>
                    <p className=" border-2 text-center">${resultDataOne.input_data.method}</p>
                    <div>
                        <button className=" border border-black bg-white text-black text-sm rounded-lg m-2  py-2 px-4
                        hover:bg-lightGreen hover:text-white"
                                onClick={() => setFirstIsCollapsed(!firstIsCollapsed)}>Скрыть/показать решение</button>
                    </div>
                    <ErrorModal
                        isOpen={isModalOpenOne}
                        onClose={handleCloseModalOne}
                        errorText={errorTextOne}
                    />
                    <ResultTable result={resultDataOne.result} time={resultDataOne.time}/>
                    <div className={`py-2 px-2 transition duration-300 ease-in-out`} style={{ width: "500px", height: "250px"}}>
                        <LineGraph data={resultDataOne} />
                    </div>
                    <div className={`py-2 px-2 transition duration-300 ease-in-out`}>
                        <label className="block text-blackGreen font-medium mt-2 mb-2">Экспериментальные значения</label>
                        <ExperimentalPointTable resultArray={JSON.parse(String(resultDataOne.input_data.experimental_data))}/>
                        <label className="block text-blackGreen font-medium mt-2 mb-2">Расчетные значения в экспериментальных точках</label>
                        <ExperimentalPointTable resultArray={resultDataOne.experimental_point}/>
                        <label className="block text-blackGreen font-medium mt-2 mb-2">Погрешность в экспериментальных точках</label>
                        <ExperimentalPointTable resultArray={resultDataOne.error_exp_point}/>
                    </div>
                </div>
                <div className={`${secondIsCollapsed ? 'w-5/6 ' : 'w-1/5'} border-2 overflow-x-auto max-w-screen-lg p-4 bg-white `}>
                    <div>
                        <p className=" border-2 text-center" >${resultDataTwo.input_data.method}</p>
                        <button className=" border border-black bg-white text-black text-sm rounded-lg m-2 py-2 px-4
                        hover:bg-lightGreen hover:text-white"
                                onClick={() => setSecondIsCollapsed(!secondIsCollapsed)}>Скрыть/показать решение</button>
                    </div>
                    <ErrorModal
                        isOpen={isModalOpenTwo}
                        onClose={handleCloseModalTwo}
                        errorText={errorTextTwo}
                    />
                    <ResultTable result={resultDataTwo.result} time={resultDataTwo?.time}/>
                    <div className={`py-2 px-2 transition duration-300 ease-in-out`} style={{ width: "500px", height: "250px"}}>
                        <LineGraph data={resultDataTwo} />
                    </div>
                    <div className={`py-2 px-2 transition duration-300 ease-in-out`}>
                        <label className="block text-blackGreen font-medium mt-2 mb-2">Экспериментальные значения</label>
                        <ExperimentalPointTable resultArray={JSON.parse(String(resultDataTwo.input_data.experimental_data))}/>
                        <label className="block text-blackGreen font-medium mt-2 mb-2">Расчетные значения в экспериментальных точках</label>
                        <ExperimentalPointTable resultArray={resultDataTwo.experimental_point}/>
                        <label className="block text-blackGreen font-medium mt-2 mb-2">Погрешность в экспериментальных точках</label>
                        <ExperimentalPointTable resultArray={resultDataTwo.error_exp_point}/>
                    </div>
                </div>
            </div> : '..loading'}

        </div>
    );
}

export default CompareResultPage