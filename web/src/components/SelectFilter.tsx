import { InputHTMLAttributes, useState } from 'react';
import Select from 'react-select';

interface ISelectQuantityProps extends InputHTMLAttributes<HTMLInputElement> {
}

interface GroupBase<Option> {
    value: number;
    label: string;
}

const options = [
    { value: 'cliente', label: 'cliente' },
    { value: 'produto', label: 'produto' }
];


export default function SelectFilter({ name }: ISelectQuantityProps) {
    const [selectedOption, setSelectedOption] = useState({ value: 'cliente', label: 'cliente' });

    return (
        <div className="text-background w-32">
            <Select
                name={name}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        boxShadow: 'none'
                    }),
                }}
                defaultValue={selectedOption}
                onChange={() => setSelectedOption}
                options={options}
            />
        </div>
    );
}