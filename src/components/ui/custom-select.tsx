"use client";

import React, { useState, useEffect, useRef } from 'react';

interface CustomSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function CustomSelect({ options, value, onChange, placeholder }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [otherValue, setOtherValue] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);

  const isOtherSelected = value === 'Outro';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectRef]);

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
    if (option !== 'Outro') {
      setOtherValue('');
    }
  };

  const handleOtherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherValue(e.target.value);
    onChange(`Outro: ${e.target.value}`);
  };
  
  return (
    <div className="relative" ref={selectRef}>
      <button
        type="button"
        className="w-full text-left px-3 py-3 bg-[#060606] border border-[#272727] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || placeholder}
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-[#060606] border border-[#272727] rounded-lg shadow-lg">
          {options.map((option) => (
            <div
              key={option}
              className="px-4 py-2 cursor-pointer hover:bg-[#1f1f1f]"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
      {isOtherSelected && (
        <div className="mt-4">
          <input
            type="text"
            value={otherValue}
            onChange={handleOtherInputChange}
            placeholder="Por favor, especifique o tipo de agente"
            className="w-full px-3 py-3 bg-[#060606] border border-[#272727] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
      )}
    </div>
  );
}
