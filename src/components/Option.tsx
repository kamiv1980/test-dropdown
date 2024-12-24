import React from 'react';

interface OptionProps {
    option: OptionType;
    isHighlighted: boolean;
    onSelect: (option: OptionType) => void;
}

export const Option: React.FC<OptionProps> = ({ option, isHighlighted, onSelect }) => {
    return (
        <div
            className={`py-1.5 px-2 cursor-pointer ${
                isHighlighted ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
            onClick={() => onSelect(option)}
        >
            {option.name}
        </div>
    );
};

