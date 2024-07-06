"use client";
import React, { ChangeEvent, FC, useId } from "react";

interface NumberInputWrapperProps {
  name: string;
  placeholder: string;
  label: string;
  value: string | null;
  onChange: (value: string) => void;
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
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <div className="flex flex-col w-full min-w-[100px] md:max-w-[100px]">
      <label htmlFor={inputId}>{label}</label>
      <input
        className="h-8 px-2 rounded text-black"
        name={name}
        id={inputId}
        value={value === null ? "" : String(value)}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberInputWrapper;
