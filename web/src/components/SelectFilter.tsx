import { InputHTMLAttributes, useState } from 'react';
import Select from 'react-select';

interface IOptions {
    value: string;
    label: string;
}
interface ISelectQuantityProps extends InputHTMLAttributes<HTMLInputElement> {
    filterOptions: IOptions[];
}

export default function SelectFilter({ name, filterOptions }: ISelectQuantityProps) {
    const [selectedOption, setSelectedOption] = useState(filterOptions[0]);

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
                options={filterOptions}
            />
        </div>
    );
}