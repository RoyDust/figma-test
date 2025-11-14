import { useState } from 'react';

interface TabsProps {
  tabs: string[];
  onTabChange?: (index: number) => void;
}

const Tabs = ({ tabs, onTabChange }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <div className="flex gap-8 mb-8">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`bg-transparent border-none text-lg py-2 px-0 cursor-pointer relative transition-colors duration-300 border-b-2 ${
            activeTab === index
              ? 'text-white border-b-white'
              : 'text-[#999] border-b-transparent hover:text-white'
          }`}
          onClick={() => handleTabClick(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
