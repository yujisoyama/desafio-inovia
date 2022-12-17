import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import Select from 'react-select';

interface ISelectQuantityProps extends InputHTMLAttributes<HTMLInputElement> {
    quantity: number;
}

interface GroupBase<Option> {
    value: number;
    label: string;
  }

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

export default function SelectQuantity({ name, quantity }: ISelectQuantityProps) {
    const [selectedOption, setSelectedOption] = useState(1);
    const quantityOptions: (number | GroupBase<number>)[] = [];

    for (let i = 1; i <= quantity; i++) {
        quantityOptions.push({
            value: i,
            label: i.toString()
        })
    }
    
    return (
        <div className="text-background w-24">
            <Select
                name={name}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        boxShadow: 'none'
                    }),
                }}
                defaultValue={quantityOptions[0]}
                onChange={() => setSelectedOption}
                options={quantityOptions}
            />
        </div>
    );
}