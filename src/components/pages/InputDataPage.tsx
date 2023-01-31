import React, {FC, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {ITableParameters} from "../../entities/ITableParameters";
import {ITableData} from "../../entities/ITableData";
import InputTable from "../inputTable/InputTable";
import InputNumber from "../inputNumber/InputNumber";
import InputSelect from "../inputSelect/InputSelect";
import {inputDataURL} from "../../config";

const InputTablePage:FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [tableData, setTableData] = useState<ITableParameters>({
        components: location.state.tableParameters.components,
        stages: location.state.tableParameters.stages,
        experiments: location.state.tableParameters.experiments
    });
    useEffect(() => {
        if (location.state) {
            setTableData(location.state.tableParameters);

        }
    }, [location.state]);

    const [inputData, setInputData] = useState<ITableData>({
        initial_time: 0,
        time: 0,
        step: 0,
        method: "EULER",
        matrix_stechiometric_coefficients: Array(tableData.stages).fill([]).map(() => new Array(tableData.components).fill(0)),
        matrix_indicators: Array(tableData.stages).fill([]).map(() => new Array(tableData.components).fill(0)),
        experimental_data: Array(tableData.experiments).fill([]).map(() => new Array(tableData.components+1).fill(0)),
        constants_speed: Array(tableData.components).fill([]).map(() => new Array(1).fill(0)),
    });

    const methods = [{ value: 'EULER', label: 'Метод Эйлера' },
                    { value: 'IMPLICIT_EULER', label: 'Неявный метод Эйлера' },
                    { value: 'TRAPEZOID', label: 'Метод трапеций' },
                    { value: 'MIDDLE', label: 'Метод средней точки' },
                    { value: 'RK2', label: 'Метод Рунге-Кутты 2-го порядка' },
                    { value: 'RK4', label: 'Метод Рунге-Кутты 4-го порядка' },
                    { value: 'KM', label: 'Метод Кутты-Мерсона' },
                    { value: 'RKF', label: 'Метод Рунге-Кутты-Фелберга' },
                    { value: 'EXPLICIT_ADAMS', label: 'Явный двухшаговый метод Адамса' },]
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch(inputDataURL, {
            method: 'POST',
            body: JSON.stringify({
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
        }).then(response => {
            // handle response
        })
            .catch(error => {
                console.error('Error:', error);
            });
        navigate('/result-page')
        console.log(JSON.stringify(inputData))
    }

    return (
        <div className="flex">
            <form className="w-1/5 p-4 bg-darkGreen" onSubmit={handleSubmit}>
                <label className="block font-medium mb-2">
                    <span className="text-white text-sm">Начальное время:</span>
                    <InputNumber value={inputData.initial_time}
                                 onChange={e => setInputData({ ...inputData, initial_time: e.target.valueAsNumber })}
                                 min={0}
                                 max={1000}
                                 step="any"/>
                </label>
                <label className="block font-medium mb-2">
                    <span className="text-white text-sm">Время:</span>
                    <InputNumber value={inputData.time}
                                 onChange={e => setInputData({ ...inputData, time: e.target.valueAsNumber })}
                                 min={0}
                                 max={1000}
                                 step="any"/>
                </label>
                <label className="block font-medium mb-2">
                    <span className="text-white text-sm">Шаг:</span>
                    <InputNumber value={inputData.step}
                                 onChange={e => setInputData({ ...inputData, step: e.target.valueAsNumber })}
                                 min={0}
                                 max={1000}
                                 step={0.000001}/>
                </label>
                <label className="block font-medium mb-2">
                    <span className="text-white text-sm">Метод:</span>
                    <InputSelect value={inputData.method}
                                options={methods}
                                onChange={e => setInputData({ ...inputData, method: e.target.value })}/>
                </label>
                <label className="block font-medium mb-2 py-2">
                    <button className="bg-white text-black rounded-lg py-2 px-4 w-full
                    hover:bg-blackGreen hover:text-white" type="submit">Далее</button>
                </label>
            </form>
            <form className="overflow-x-auto max-w-screen-lg w-4/5 p-4 bg-white">
                <label className="text-blackGreen font-medium text-xs">
                    <p>*-заполните таблицы</p>
                </label>
                <label className="text-blackGreen font-medium text-xs">
                    <p>Количество компонентов: {tableData.components}</p>
                    <p>Количество стадий: {tableData.stages}</p>
                    <p>Количество экспериментов: {tableData.experiments}</p>
                </label>

                <label className="block text-blackGreen font-medium mt-2 mb-2">Матрица стехиометрических коэффициентов</label>
                <InputTable
                    firstRow={['Номер стадии', ...Array(tableData.components).fill(0).map((_, i) =>
                        `A${i + 1}`)]}
                    inputDataArray={inputData.matrix_stechiometric_coefficients}
                    firstColumnText=""
                    dataName='matrix_stechiometric_coefficients'
                    onChange={(e, row, col) => {
                        if (Number(e.target.value) === 1 || Number(e.target.value) === 0|| Number(e.target.value) === -1) {
                            setInputData((prevData) => {
                                prevData.matrix_stechiometric_coefficients[row][col] = Number(e.target.value);
                                return {...prevData};
                            });
                        }
                    }}/>

                <label className="block text-blackGreen font-medium mt-2 mb-2">Матрица показателей степени</label>
                <InputTable
                    firstRow={['Номер стадии', ...Array(tableData.components).fill(0).map((_, i) =>
                        `A${i + 1}`)]}
                    inputDataArray={inputData.matrix_indicators}
                    firstColumnText=""
                    dataName='matrix_indicators'
                    onChange={(e, row, col) => {
                        if (Number(e.target.value) >= 0 && Number(e.target.value) <= 10) {
                            setInputData((prevData) => {
                                prevData.matrix_indicators[row][col] = Number(e.target.value);
                                return {...prevData};
                            });
                        }
                    }}/>

                <label className="block text-blackGreen font-medium mt-2 mb-2">Экспериментальные данные</label>
                <InputTable
                    firstRow={['Номер стадии','Время', ...Array(tableData.components).fill(0).map((_, i) =>
                        `A${i + 1}`)]}
                    inputDataArray={inputData.experimental_data}
                    firstColumnText=""
                    dataName='experimental_data'
                    onChange={(e, row, col) => {
                        if (Number(e.target.value) >= 0 && Number(e.target.value) <= 1000) {
                            setInputData((prevData) => {
                                prevData.experimental_data[row][col] = Number(e.target.value);
                                return {...prevData};
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
                                prevData.constants_speed[row][col] = Number(e.target.value);
                                return {...prevData};
                            });
                        }
                    }}/>

            </form>

        </div>
    );
};

export default InputTablePage;