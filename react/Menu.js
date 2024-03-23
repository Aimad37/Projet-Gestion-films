import React from 'react';

export default function Menu({ options, onSelect }) {
  return (
    <nav className="bg-blue-500 py-2">
      <div className="container mx-auto px-2">
        <div className="flex justify-center">
          <ul className="flex space-x-5">
            {options.map((option, index) => (
              <li key={index} onClick={() => onSelect(option.value)} className="text-white hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium cursor-pointer">
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
