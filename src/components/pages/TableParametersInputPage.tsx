import React, {FC} from "react";
import { useNavigate } from 'react-router-dom'
import {useState} from "react";
import {ITableParameters} from "../../entities/ITableParameters";
import InputNumber from "../inputNumber/InputNumber";
const TableParametersInputPage:FC = () => {

    const [tableParameters, setTableParameters] = useState<ITableParameters>({
        components: 0,
        stages: 0,
        experiments: 0
    });

    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(tableParameters)
        navigate('input-data', { state: { tableParameters } })
    }

    return (
        <div className="bg-lightGreen">
            <div className="bg-lightGreen p-2 rounded-lg shadow-md mx-auto max-w-md">
                <div className="h-full flex flex-col items-center justify-start p-1">
                    <p className="text-white text-base">Введите данные для генерации таблиц</p>
                </div>
                <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md">
                    <label className="block font-medium text-lg mb-2">
                        <span className="text-darkGreen">Количество компонентов:</span>
                        <InputNumber value={tableParameters.components}
                                     onChange={e => setTableParameters({ ...tableParameters, components: e.target.valueAsNumber })}
                                     min={1}
                                     max={20}
                                     step={1}/>
                    </label>
                    <br />
                    <label className="block font-medium text-lg mb-2">
                        <span className="text-darkGreen">Количество стадий:</span>
                        <InputNumber value={tableParameters.stages}
                                     onChange={e => setTableParameters({ ...tableParameters, stages: e.target.valueAsNumber })}
                                     min={1}
                                     max={20}
                                     step={1}/>
                    </label>
                    <br />
                    <label className="block font-medium text-lg mb-2">
                        <span className="text-darkGreen">Количество экспериментов:</span>
                        <InputNumber value={tableParameters.experiments}
                                     onChange={e => setTableParameters({ ...tableParameters, experiments: e.target.valueAsNumber })}
                                     min={1}
                                     max={20}
                                     step={1}/>
                    </label>
                    <br />
                    <button className="bg-darkGreen text-white rounded-lg py-2 px-4 w-full hover:bg-lightGreen" type="submit">Далее</button>
                </form>
            </div>
        </div>
    );
}

export default TableParametersInputPage