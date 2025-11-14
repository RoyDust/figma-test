import { useState } from 'react';
import DropdownFilter from '../DropdownFilter/DropdownFilter';

interface TableRow {
  name: string;
  type: string;
  contact: string;
}

const sampleData: TableRow[] = [
  { name: '整数001', type: 'AAAA', contact: '10887388928' },
  { name: '整数002', type: 'BBBB', contact: '10887388928' },
  { name: '整数003', type: 'CCCC', contact: '10887388928' },
  { name: '整数004', type: 'DDDD', contact: '10887388928' },
];

const Table = () => {
  const [data] = useState<TableRow[]>(sampleData);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [contactFilter, setContactFilter] = useState<string[]>([]);
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  // Get unique values for filters
  const typeOptions = Array.from(new Set(data.map((row) => row.type)));
  const contactOptions = Array.from(new Set(data.map((row) => row.contact)));

  // Filter data
  const filteredData = data.filter((row) => {
    const typeMatch = typeFilter.length === 0 || typeFilter.includes(row.type);
    const contactMatch = contactFilter.length === 0 || contactFilter.includes(row.contact);
    return typeMatch && contactMatch;
  });

  const handleFilterToggle = (filterName: string) => {
    setOpenFilter(openFilter === filterName ? null : filterName);
  };

  return (
    <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-6 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-4 text-[#999] font-normal text-sm border-b border-[#2a2a2a]">
              名称
            </th>
            <th className="text-left p-4 text-[#999] font-normal text-sm border-b border-[#2a2a2a]">
              <div className="flex items-center gap-2 relative">
                <span>类型</span>
                <button
                  className="bg-transparent border-none text-[#999] cursor-pointer p-1 flex items-center justify-center transition-colors duration-200 hover:text-white"
                  onClick={() => handleFilterToggle('type')}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 3L6 7L10 3" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
                <DropdownFilter
                  options={typeOptions}
                  selectedOptions={typeFilter}
                  onFilterChange={setTypeFilter}
                  isOpen={openFilter === 'type'}
                  onClose={() => setOpenFilter(null)}
                />
              </div>
            </th>
            <th className="text-left p-4 text-[#999] font-normal text-sm border-b border-[#2a2a2a]">
              <div className="flex items-center gap-2 relative">
                <span>联系方式</span>
                <button
                  className="bg-transparent border-none text-[#999] cursor-pointer p-1 flex items-center justify-center transition-colors duration-200 hover:text-white"
                  onClick={() => handleFilterToggle('contact')}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 3L6 7L10 3" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
                <DropdownFilter
                  options={contactOptions}
                  selectedOptions={contactFilter}
                  onFilterChange={setContactFilter}
                  isOpen={openFilter === 'contact'}
                  onClose={() => setOpenFilter(null)}
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr
              key={index}
              className="border-b border-[#2a2a2a] last:border-b-0 transition-colors duration-200 hover:bg-white/[0.02]"
            >
              <td className="py-5 px-4 text-white text-[15px]">{row.name}</td>
              <td className="py-5 px-4 text-white text-[15px]">{row.type}</td>
              <td className="py-5 px-4 text-white text-[15px]">{row.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
