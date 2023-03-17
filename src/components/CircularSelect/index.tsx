import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

export interface IOption {
  value: string 
  label: string
}

interface CircularSelectProps {
  options: IOption[]
  defaultOption: IOption
  onChange: (option: IOption) => void
}

const CircularSelect = ({ 
  options, 
  defaultOption,
  onChange, 
}: CircularSelectProps) => {
  const radius = 100;
  const xCorrection = -20;
  const yCorrection = -15;
  const [selectedOption, setSelectedOption] = useState<IOption>(defaultOption);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const circularSelectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        circularSelectRef.current &&
        !circularSelectRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOptionSelect = (option: IOption) => {
    setSelectedOption(option);
    onChange(option);
    setIsExpanded(false);
  };

  return (
    <div className="circular-select" ref={circularSelectRef}>
      <button className="circular-button" onClick={toggleExpand}>
        {selectedOption.label}
      </button>
      {isExpanded && (
        <div className="circle-options">
          {options.map((option: IOption, index: number) => {
            const angle = (index * 360 * Math.PI) / (180 * options.length);
            const x = xCorrection + radius * Math.cos(angle);
            const y = yCorrection + radius * Math.sin(angle);

            return (
              <button
                key={option.value}
                className="circular-option"
                style={{ left: x, top: y }}
                onClick={() => handleOptionSelect(option)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CircularSelect;
