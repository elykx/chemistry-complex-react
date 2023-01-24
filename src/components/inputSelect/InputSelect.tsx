import React, {FC} from 'react';

interface SelectInputProps {
    value: any;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
}

const SelectInput:FC<SelectInputProps> = ({ value, onChange, options }) => (
    <select
        className="border border-darkGreen text-darkGreen rounded-lg p-2 w-full"
        value={value}
        onChange={onChange}>
        {options.map(({ value, label }) => (
            <option key={value}
                    value={value}>
                {label}
            </option>
        ))}
    </select>
);

export default SelectInput;