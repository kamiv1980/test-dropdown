import { KeyboardEvent } from 'react';
import {OptionType} from "@/types/options";

interface UseKeyboardNavigationProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  highlightedIndex: number;
  setHighlightedIndex: (prevIndex: (prevIndex: number) => number) => void;
  options: OptionType[];
  handleSelectOption: (option: OptionType) => void;
  listRef: React.RefObject<HTMLDivElement | null>;
}

export const useKeyboardNavigation = ({
        isOpen,
        setIsOpen,
        highlightedIndex,
        setHighlightedIndex,
        options,
        handleSelectOption,
        listRef,
      }: UseKeyboardNavigationProps) => {
  return (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex((prevIndex) =>
              prevIndex < options.length - 1 ? prevIndex + 1 : prevIndex);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          setHighlightedIndex((prevIndex) =>
              prevIndex > 0 ? prevIndex - 1 : 0);
        }
        break;
      case 'Enter':
        event.preventDefault();
        if (isOpen && highlightedIndex !== -1) {
          handleSelectOption(options[highlightedIndex]);
        } else {
          setIsOpen(true);
        }
        break;
      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        break;
      case 'Tab':
        if (isOpen) {
          event.preventDefault();
          setIsOpen(false);
        }
        break;
    }

    if (isOpen && listRef.current) {
      const highlightedElement = listRef.current.children[highlightedIndex] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  };
};

