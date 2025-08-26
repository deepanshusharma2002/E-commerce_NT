"use client";

import { ChangeEvent } from "react";

interface InputSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function InputSelect({
  label,
  options,
  onChange,
  value,
}: InputSelectProps) {
  return (
    <div className="flex items-center space-x-2 ml-auto">
      <label className="text-sm font-medium text-gray-600">{label}</label>

      <div className="relative w-[240px]">
        {" "}
        {/* <- pick the width you want */}
        <select
          value={value}
          onChange={onChange}
          className="w-full appearance-none border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        >
          {options.map((option) => (
            <option key={option} value={option} className="text-gray-700">
              {option}
            </option>
          ))}
        </select>
        <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
          ▼
        </span>
      </div>
    </div>
  );
}
