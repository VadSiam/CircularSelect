import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

export interface IOption {
  value: string
  label: string
}

export interface ICircleOptionsStyles {
  radius: number;
  xCorrection: number;
  yCorrection: number;
}

const defaultCircleOptionsStyles: ICircleOptionsStyles = {
  radius: 100,
  xCorrection: -20,
  yCorrection: -15,
};

export type CSSProperties = {
  [key: string]: string | number | CSSProperties;
};

export interface CircularSelectProps {
  options: IOption[]
  defaultOption: IOption
  onChange: (option: IOption) => void
  circleOptionsStyles?: ICircleOptionsStyles
  wrapperStyles?: CSSProperties
  mainButtonStyles?: CSSProperties
  optionsStyles?: CSSProperties
  optionStyles?: CSSProperties
}

const CircularSelect = ({
  options,
  defaultOption,
  onChange,
  circleOptionsStyles = defaultCircleOptionsStyles,
  wrapperStyles,
  mainButtonStyles,
  optionsStyles,
  optionStyles,
}: CircularSelectProps) => {
  const { radius, xCorrection, yCorrection } = circleOptionsStyles;
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
    <div
      style={wrapperStyles}
      className="circular-select-wrapper"
      ref={circularSelectRef}
    >
      <button
        className="circular-button"
        onClick={toggleExpand}
        style={mainButtonStyles}
      >
        {selectedOption.label}
      </button>
      {isExpanded && (
        <div
          className="circle-options"
          style={optionsStyles}
        >
          {options.map((option: IOption, index: number) => {
            const angle = (index * 360 * Math.PI) / (180 * options.length);
            const x = xCorrection + radius * Math.cos(angle);
            const y = yCorrection + radius * Math.sin(angle);

            return (
              <button
                key={option.value}
                className="circular-option"
                style={{ left: x, top: y , ...optionStyles}}
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
