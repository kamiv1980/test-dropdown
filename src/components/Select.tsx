import React, { useState, useRef, useEffect } from 'react';
import { Option } from './Option';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import {List} from "@/components/List";
import {OptionType} from "@/types/options";

interface SelectProps {
    options: OptionType[];
    onChange: (option: OptionType) => void;
}

export const Select: React.FC<SelectProps> = ({ options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    //@ts-ignore
    const selectRef = useRef<HTMLDivElement>(null);
    //@ts-ignore
    const listRef = useRef<HTMLDivElement>(null);

    const handleSelectOption = (option: OptionType) => {
        setSelectedOption(option);
        onChange(option);
        setIsOpen(false);
        setHighlightedIndex(options.findIndex(opt => opt.id === option.id));
    };

    const handleKeyDown = useKeyboardNavigation({
        isOpen,
        setIsOpen,
        highlightedIndex,
        setHighlightedIndex,
        options,
        handleSelectOption,
        listRef,
    });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isOpen && listRef.current && highlightedIndex >= 0) {
            const highlightedElement = listRef.current.children[highlightedIndex] as HTMLElement;
            if (highlightedElement) {
                highlightedElement.scrollIntoView({ block: 'nearest' });
            }
        }
    }, [isOpen, highlightedIndex]);

    return (
        <div
            ref={selectRef}
            className="relative w-64"
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            <div
                className={`p-2 cursor-pointer bg-white ${isOpen ? 'border-2 border-blue-600': 'border border-gray-600'} `}
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedOption ? selectedOption.name : 'Select an option'}
            </div>
            {isOpen && (
                <div
                    ref={listRef}
                    className="absolute w-full mt-1 max-h-80 overflow-auto bg-white border border-gray-300 z-10"
                >
                    <List
                        items={options}
                        itemHeight={36}
                        height={300}
                        width="100%"
                        renderItem={(option, index) => (
                            <Option
                                key={option.id}
                                option={option}
                                isHighlighted={index === highlightedIndex}
                                onSelect={handleSelectOption}
                            />
                        )}
                        highlightedIndex={highlightedIndex}
                    />
                </div>
            )}
        </div>
    );
};

