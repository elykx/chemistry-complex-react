import React, {FC} from "react";
import { useNavigate } from 'react-router-dom'
import mainImage from '../../assets/images/mainImage.png'

const MainPage:FC = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/table-parameters/input');
    }
    return (
        <div className="h-screen w-full flex">
            <div className="w-2/5 bg-darkGreen">
                <div className="h-full flex flex-col items-center justify-start p-10">
                    <h1 className="text-white text-2xl py-5">Программный комплекс для решения задачи химической кинетики</h1>
                    <p className="text-white text-xs mb-8">Предназначен для численного решения прямой задачи кинетики,
                        обратной задачи, и оценки чувствительности</p>
                    <button className="bg-white text-black px-4 py-2 rounded-lg
                     hover:bg-blackGreen hover:text-white" onClick={handleClick}>Решить</button>
                </div>
            </div>
            <div className="w-3/5 bg-white">
                <div className="relative h-full">
                    <img src={mainImage} alt="" className="h-full w-full object-cover" />
                </div>
            </div>
        </div>
    );
}

export default MainPage
