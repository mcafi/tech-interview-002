"use client";
import React, { ChangeEvent, FC, useId } from "react";

interface NumberInputWrapperProps {
  name: string;
  placeholder: string;
  label: string;
  value: number | null;
  onChange: (value: number) => void;
}

const NumberInputWrapper: FC<NumberInputWrapperProps> = ({
  name,
  placeholder,
  label,
  value,
  onChange,
}) => {
  const inputId = useId();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    onChange(newValue);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={inputId}>{label}</label>
      <input
        className="h-8 px-2 rounded text-black"
        id={inputId}
        type="number"
        value={String(value)}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberInputWrapper;
