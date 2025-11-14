import { useState, useEffect, useRef } from 'react';

interface DropdownFilterProps {
  options: string[];
  selectedOptions: string[];
  onFilterChange: (selected: string[]) => void;
  isOpen: boolean;
  onClose: () => void;
}

const DropdownFilter = ({
  options,
  selectedOptions,
  onFilterChange,
  isOpen,
  onClose,
}: DropdownFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [localSelected, setLocalSelected] = useState<string[]>(selectedOptions);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalSelected(selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleCheckboxChange = (option: string) => {
    const newSelected = localSelected.includes(option)
      ? localSelected.filter((item) => item !== option)
      : [...localSelected, option];

    setLocalSelected(newSelected);
    onFilterChange(newSelected);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div
      className="absolute top-full left-0 mt-2 bg-[#1a1a1a] border border-[#333] rounded-lg min-w-[250px] shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-[1000] overflow-hidden"
      ref={dropdownRef}
    >
      <div className="p-3 border-b border-[#333] flex items-center gap-2">
        <span className="text-base opacity-60">🔍</span>
        <input
          type="text"
          placeholder="搜索"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent border-none text-white text-sm outline-none placeholder:text-[#666]"
        />
      </div>
      <div className="max-h-[200px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-[#1a1a1a] [&::-webkit-scrollbar-thumb]:bg-[#444] [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb:hover]:bg-[#555]">
        {filteredOptions.map((option) => (
          <label
            key={option}
            className="flex items-center gap-3 py-3 px-4 cursor-pointer transition-colors duration-200 hover:bg-[#252525]"
          >
            <input
              type="checkbox"
              checked={localSelected.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className="w-4 h-4 cursor-pointer accent-white"
            />
            <span className="text-white text-sm">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DropdownFilter;
