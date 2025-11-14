import { useState } from "react";

interface FilterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  position: { top: number; left: number };
}

const FilterDropdown = ({ isOpen, onClose, position }: FilterDropdownProps) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");

  const filterOptions = ["AAAA", "BBBB", "CCCC", "DDDD"];

  const toggleFilter = (option: string) => {
    setSelectedFilters((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const filteredOptions = filterOptions.filter((option) =>
    option.toLowerCase().includes(searchText.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Dropdown */}
      <div
        className="fixed z-50 w-[216px] bg-[#00000066] rounded-[12px] p-[8px] flex flex-col gap-[6px] backdrop-blur-[10px]"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          border: "1px solid #43434380",
          boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.15)",
          // backdropFilter: "blur(24px)",
          fontFamily: "PingFang SC",
        }}
      >
        {/* Search Input */}
        <div className="relative w-[200px] h-[32px] bg-[#00000080]  rounded-[8px] border-[0.5px] border-[#434343] flex items-center ">
          <img
            src="/images/icon_search@2x.png"
            alt="search"
            className="absolute left-[12px] top-1/2 transform -translate-y-1/2 w-[16px] h-[16px]"
          />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="搜索"
            className="w-full h-[32px] bg-transparent  rounded-[8px] pl-[40px] pr-[12px] text-[12px] text-[#969696] placeholder-[#FFFFFF66] outline-none"
            style={{ fontFamily: "PingFang SC" }}
          />
        </div>

        {/* Filter Options */}
        <div className="flex flex-col w-[200px] px-[12px]">
          {filteredOptions.map((option, index) => (
            <label
              key={index}
              className="flex items-center gap-[14px] cursor-pointer h-[32px] font-regular  "
            >
              <div
                className="w-[13.5px] h-[13.5px] rounded-[4px] border flex items-center justify-center"
                style={{
                  borderColor: selectedFilters.includes(option)
                    ? "#FFFFFF"
                    : "#FFFFFF33",
                  backgroundColor: selectedFilters.includes(option)
                    ? "#FFFFFF"
                    : "transparent",
                }}
              >
                {selectedFilters.includes(option) && (
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path
                      d="M1 5L4.5 8.5L11 1.5"
                      stroke="#1A1A1A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                checked={selectedFilters.includes(option)}
                onChange={() => toggleFilter(option)}
                className="hidden"
              />
              <span className="text-[12px] leading-[16px] tracking-[2px] text-[#FFFFFF]">
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default FilterDropdown;
