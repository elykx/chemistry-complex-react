import React, {FC, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {ITableParameters} from "../../entities/ITableParameters";
import {ITableData} from "../../entities/ITableData";
import InputTable from "../inputTable/InputTable";

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
        initialTime: 0,
        time: 0,
        step: 0,
        method: "",
        matrixStechiometricCoefficients: new Array(tableData.stages).fill([]).map(() => new Array(tableData.components).fill(0)),
        matrixIndicators: new Array(tableData.stages).fill([]).map(() => new Array(tableData.components).fill(0)),
        experimentalData: new Array(tableData.experiments).fill([]).map(() => new Array(tableData.components).fill(0)),
        constantsSpeed: new Array(tableData.components).fill([]).map(() => new Array(1).fill(0)),
    });

    const firstRow = ["Номер стадии", ...Array.from({ length: tableData.components }, (_, i) => `A${i+1}`)];

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(tableData.components)
        console.log(inputData)
    }

    return (
        <div className="flex">
            <form className="w-1/5 p-4 bg-gray-200" onSubmit={handleSubmit}>
                <label className="block text-[#12221a] font-medium mb-2">Начальное время</label>
                <input className="bg-white focus:outline-none focus:shadow-outline border
                 border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" type="number" min="0" max="1000" step="any"
                       value={inputData.initialTime} onChange={e => setInputData({ ...inputData, initialTime: e.target.valueAsNumber })}/>

                <label className="block text-[#12221a] font-medium mt-4 mb-2">Время</label>
                <input className="bg-white focus:outline-none focus:shadow-outline
                 border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" type="number" min="0" max="1000" step="any"
                       value={inputData.time} onChange={e => setInputData({ ...inputData, time: e.target.valueAsNumber })}/>

                <label className="block text-[#12221a] font-medium mt-4 mb-2">Шаг</label>
                <input className="bg-white focus:outline-none focus:shadow-outline border
                 border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" type="number" min="0" max="10" step="any"
                       value={inputData.step} onChange={e => setInputData({ ...inputData, step: e.target.valueAsNumber })}/>
                <label className="block text-[#12221a] font-medium mt-4 mb-2">Метод</label>
                <select
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    id="select"
                    value={inputData.method}
                    onChange={e => setInputData({ ...inputData, method: e.target.value })}
                >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select><br/>
                <br/>
                <button className="bg-[#06160E] text-white rounded-lg py-2 px-4 w-full hover:bg-[#365043]" type="submit">Далее</button>
            </form>
            <form className="overflow-x-auto max-w-screen-lg w-4/5 p-4 bg-gray-300">
                <p className="text-[#12221a] font-medium text-xs">Количество компонентов: {tableData.components}</p>
                <p className="text-[#12221a] font-medium text-xs">Количество стадий: {tableData.stages}</p>
                <p className="text-[#12221a] font-medium text-xs">Количество экспериментов: {tableData.experiments}</p>
                <label className="block text-[#12221a] font-medium mt-2 mb-2">Матрица стехиометрических коэффициентов</label>

                <InputTable firstRow={['Номер стадии', ...Array(tableData.components).fill(0).map((_, i) =>
                    `A${i + 1}`)]} inputDataArray={inputData.matrixStechiometricCoefficients} firstColumnText=""/>

                <label className="block text-[#12221a] font-medium mt-2 mb-2">Матрица показателей степени</label>

                <InputTable firstRow={['Номер стадии', ...Array(tableData.components).fill(0).map((_, i) =>
                    `A${i + 1}`)]} inputDataArray={inputData.matrixIndicators} firstColumnText=""/>

                <label className="block text-[#12221a] font-medium mt-2 mb-2">Экспериментальные данные</label>

                <InputTable firstRow={['Номер эксперимента', ...Array(tableData.components).fill(0).map((_, i) =>
                    `A${i + 1}`)]} inputDataArray={inputData.experimentalData} firstColumnText=""/>

                <label className="block text-[#12221a] font-medium mt-2 mb-2">Константы скорости</label>

                <InputTable firstRow={['','Константа скорости']} inputDataArray={inputData.constantsSpeed} firstColumnText="k"/>
            </form>

        </div>
    );
};

export default InputTablePage;