import React, {FC} from "react";
interface InputNumberProps {
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    min: number
    max: number
    step: number | string
}

const InputNumber:FC<InputNumberProps> = ({ value, onChange, className, min,max,step }) => {
    return (
        <input
            className={`border border-darkGreen text-darkGreen rounded-lg p-2 w-full ${className}`}
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
        />
    );
}

export default InputNumber