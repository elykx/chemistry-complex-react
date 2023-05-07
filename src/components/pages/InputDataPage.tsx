import React, {FC, useEffect, useState} from "react";
import { useNavigate, useParams} from "react-router-dom";
import {ITableParameters} from "../../entities/ITableParameters";
import {ITableData} from "../../entities/ITableData";
import InputTable from "../table/InputTable";
import InputNumber from "../inputNumber/InputNumber";
import InputSelect from "../inputSelect/InputSelect";
import {inputDataURL, tableParametersURL} from "../../config";
import axios from "axios";

const InputTablePage:FC = () => {
    const navigate = useNavigate();
    const {tableParamId} = useParams();

    const [recordId, setRecordId] = useState<number>(0);

    const [inputData, setInputData] = useState<ITableData>({
        table_parameters:{stages:0, components:0, experiments:0},
        initial_time: 0,
        time: 0,
        step: 0,
        method: "EULER",
        matrix_stechiometric_coefficients: [],
        matrix_indicators: [],
        experimental_data: [],
        constants_speed: [],

    });

    useEffect(() => {
      const fetchData = async() => {
          if (tableParamId){
              const response = await axios.get<ITableParameters>(`${tableParametersURL}${tableParamId}/`);
              await setInputData({
                  table_parameters:response.data,
                  initial_time: 0,
                  time: 0,
                  step: 0,
                  method: "EXPLICIT_EULER",
                  matrix_stechiometric_coefficients: Array(response.data.stages).fill([]).map(() => new Array(response.data.components).fill(0)),
                  matrix_indicators: Array(response.data.stages).fill([]).map(() => new Array(response.data.components).fill(-1)),
                  experimental_data: Array(response.data.experiments).fill([]).map(() => new Array(response.data.components + 1).fill(0)),
                  constants_speed: Array(response.data.stages).fill([]).map(() => new Array(1).fill(0)),
              })
          }
      };
      fetchData();
    }, []);

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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            const response = await fetch(inputDataURL, {
                method: 'POST',
                body: JSON.stringify({
                    "table_parameters": Number(tableParamId),
                    "initial_time": inputData.initial_time,
                    "time": inputData.time,
                    "step": inputData.step,
                    "method": inputData.method,
                    "matrix_stechiometric_coefficients": JSON.stringify(inputData.matrix_stechiometric_coefficients),
                    "matrix_indicators": JSON.stringify(inputData.matrix_indicators),
                    "experimental_data": JSON.stringify(inputData.experimental_data),
                    "constants_speed": JSON.stringify(inputData.constants_speed)
                }),
                headers: {
                    'Content-Type': 'application/json'
                }

            });
            const data = await response.json()
            await setRecordId(data.input_data.id)
            navigate(`/result-page/${data.input_data.id}`);
        }
        catch(error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="flex">
            <form className="w-1/5 p-4 bg-darkGreen" onSubmit={handleSubmit}>
                <label className="block font-medium mb-2">
                    <span className="text-white text-sm">Начальное время, с:</span>
                    <InputNumber value={inputData.initial_time}
                                 onChange={e => setInputData({ ...inputData, initial_time: e.target.valueAsNumber })}
                                 min={0}
                                 max={999999}
                                 step="any"/>
                </label>
                <label className="block font-medium mb-2">
                    <span className="text-white text-sm">Время, с:</span>
                    <InputNumber value={inputData.time}
                                 onChange={e => setInputData({ ...inputData, time: e.target.valueAsNumber })}
                                 min={0}
                                 max={999999}
                                 step="any"/>
                </label>
                <label className="block font-medium mb-2">
                    <span className="text-white text-sm">Шаг, с:</span>
                    <InputNumber value={inputData.step}
                                 onChange={e => setInputData({ ...inputData, step: e.target.valueAsNumber })}
                                 min={0}
                                 max={999999}
                                 step="any"/>
                </label>
                <label className="block font-medium mb-2">
                    <span className="text-white text-sm">Метод:</span>
                    <InputSelect value={inputData.method}
                                options={methods}
                                onChange={e => setInputData({ ...inputData, method: e.target.value })}/>
                </label>
                <label className="block font-medium mb-2 py-2">
                    <button className="bg-white text-black rounded-lg py-2 px-4 w-full
                    hover:bg-blackGreen hover:text-white" type="submit">Решение</button>
                </label>
            </form>

            { inputData.table_parameters.components ?
            <form className="overflow-x-auto max-w-screen-lg w-4/5 p-4 bg-white">
                <label className="text-blackGreen font-medium text-xs">
                    <p>*-заполните таблицы</p>
                </label>
                <label className="text-blackGreen font-medium text-xs">
                    <p>Количество компонентов: {inputData.table_parameters.components}</p>
                    <p>Количество стадий: {inputData.table_parameters.stages}</p>
                    <p>Количество экспериментов: {inputData.table_parameters.experiments}</p>
                </label>

                <label className="block text-blackGreen font-medium mt-2 mb-2">Матрица стехиометрических коэффициентов</label>


                <InputTable
                    firstRow={['Номер стадии', ...Array(inputData.table_parameters.components).fill(0).map((_, i) =>
                        `С${i + 1}`)]}
                    inputDataArray={inputData.matrix_stechiometric_coefficients}
                    firstColumnText=""
                    dataName='matrix_stechiometric_coefficients'
                    onChange={(e, row, col) => {
                        if (Number(e.target.value) === 1 || Number(e.target.value) === 0|| Number(e.target.value) === -1) {
                            setInputData((prevData) => {
                                const updatedData = {...prevData};
                                updatedData.matrix_stechiometric_coefficients[row][col] = Number(e.target.value);
                                return updatedData;
                            });
                        }
                    }}/>

                <label className="block text-blackGreen font-medium mt-2 mb-2">Матрица показателей степени</label>
                <InputTable
                    firstRow={['Номер стадии', ...Array(inputData.table_parameters.components).fill(-1).map((_, i) =>
                        `С${i + 1}`)]}
                    inputDataArray={inputData.matrix_indicators}
                    firstColumnText=""
                    dataName='matrix_indicators'
                    onChange={(e, row, col) => {
                        if (Number(e.target.value) >= -1 && Number(e.target.value) <= 10) {
                            setInputData((prevData) => {
                                const updatedData = {...prevData};
                                updatedData.matrix_indicators[row][col] = Number(e.target.value);
                                return updatedData;
                            });
                        }
                    }}/>

                <label className="block text-blackGreen font-medium mt-2 mb-2">Экспериментальные данные</label>
                <InputTable
                    firstRow={['Номер стадии','Время', ...Array(inputData.table_parameters.components).fill(0).map((_, i) =>
                        `С${i + 1}`)]}
                    inputDataArray={inputData.experimental_data}
                    firstColumnText=""
                    dataName='experimental_data'
                    onChange={(e, row, col) => {
                        if (Number(e.target.value) >= 0 && Number(e.target.value) <= 1000) {
                            setInputData((prevData) => {
                                const updatedData = {...prevData};
                                updatedData.experimental_data[row][col] = Number(e.target.value);
                                return updatedData;
                            });
                        }
                    }}/>

                <label className="block text-blackGreen font-medium mt-2 mb-2">Константы скорости</label>
                <InputTable
                    firstRow={['','Константа скорости']}
                    inputDataArray={inputData.constants_speed}
                    firstColumnText="k"
                    dataName='constants_speed'
                    onChange={(e, row, col) => {
                        if (Number(e.target.value) >= 0 && Number(e.target.value) <= 1000) {
                            setInputData((prevData) => {
                                const updatedData = {...prevData};
                                updatedData.constants_speed[row][col] = Number(e.target.value);
                                return updatedData;
                            });
                        }
                    }}/>

            </form>
                    : "loading..."}
        </div>
    );
};

export default InputTablePage;