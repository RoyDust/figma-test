import { useState } from "react";
import clsx from "clsx";
import FilterDropdown from "./components/FilterDropdown";

function App() {
  const tabs = ["订单统计", "订单列表"];
  const [activeTab, setActiveTab] = useState(0);
  const [filterOpen, setFilterOpen] = useState<string | null>(null);
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });

  // 表格数据
  const tableData = [
    { id: "整数001", type: "AAAA", contact: "108873889928" },
    { id: "整数002", type: "BBBB", contact: "108873889928" },
    { id: "整数003", type: "CCCC", contact: "108873889928" },
    { id: "整数004", type: "DDDD", contact: "108873889928" },
  ];

  // 筛选选项
  const typeOptions = ["AAAA", "BBBB", "CCCC", "DDDD"];
  const contactOptions = Array.from(
    new Set(tableData.map((row) => row.contact))
  );

  // 根据当前筛选类型获取选项
  const getCurrentFilterOptions = () => {
    if (filterOpen === "type") return typeOptions;
    if (filterOpen === "contact") return contactOptions;
    return [];
  };

  return (
    <div className="min-h-screen bg-black p-8 flex justify-center items-center">
      <div className="w-[736px] h-[407px] bg-[#101010] flex">
        <div className="w-[80px] h-[407px] bg-[#00000099] "></div>
        <div className="flex-1 h-full bg-[#101010] py-[21px] px-[24px] flex flex-col gap-[16px]">
          {/* 顶部 */}
          <div className="w-[572px] h-[43px] rounded-[1px]  border-b border-[#FFFFFF33]">
            <h1 className=" text-[20px] font-600 leading-[30px] tracking-[1px] text-[#FFFFFF] font-semibold  ">
              Title
            </h1>
          </div>
          {/* tab */}
          <div className=" flex gap-[3px] w-[169px] h-[36px] rounded-[6px]">
            {tabs.map((tab, index) => (
              <div
                key={index}
                onClick={() => setActiveTab(index)}
                className="w-[83px]  flex items-center justify-center bg-transparent border-none cursor-pointer"
              >
                <div
                  className={clsx(
                    "text-[14px] w-[70px] h-full  flex items-center justify-center font-400 leading-[20px] tracking-[1px] font-normal transition-colors duration-200",
                    activeTab === index
                      ? "text-[#FFFFFF] border-b border-[#FFFFFF]"
                      : "text-[#969696] border-b border-transparent"
                  )}
                >
                  {tab}
                </div>
              </div>
            ))}
          </div>
          {/* 表格 */}
          <div
            className="w-[572px] h-[211px] bg-[#0A0A0A] border border-[#43434380] rounded-[12px] overflow-hidden"
            style={{ fontFamily: "PingFang SC" }}
          >
            <table className="w-full border-collapse">
              <thead>
                <tr
                  className="h-[48px] text-[#969696] font-regular"
                  style={{ borderBottom: "0.5px solid #434343" }}
                >
                  <th className="w-[120px] text-[14px] font-normal px-[20px] text-left">
                    名称
                  </th>
                  <th
                    className="w-[210px] text-[14px] font-normal px-[20px] text-center relative"
                    style={{ borderLeft: "0.5px solid #434343" }}
                  >
                    类型
                    <img
                      src="/images/icon_filter@2x.png"
                      alt="filter"
                      className="inline-block ml-1 align-middle w-[16px] h-[16px] cursor-pointer"
                      onClick={(e) => {
                        const thRect =
                          e.currentTarget.parentElement?.getBoundingClientRect();
                        if (thRect) {
                          setFilterPosition({
                            top: thRect.bottom + 4,
                            left: thRect.left - 4,
                          });
                        }
                        setFilterOpen(filterOpen === "type" ? null : "type");
                      }}
                    />
                  </th>
                  <th
                    className="text-[14px] font-normal px-[20px] text-center relative"
                    style={{ borderLeft: "0.5px solid #434343" }}
                  >
                    联系方式
                    <img
                      src="/images/icon_filter@2x.png"
                      alt="filter"
                      className="inline-block ml-1 align-middle w-[16px] h-[16px] cursor-pointer"
                      onClick={(e) => {
                        const thRect =
                          e.currentTarget.parentElement?.getBoundingClientRect();
                        if (thRect) {
                          setFilterPosition({
                            top: thRect.bottom + 4,
                            left: thRect.left + 12,
                          });
                        }

                        console.log(thRect);

                        setFilterOpen(
                          filterOpen === "contact" ? null : "contact"
                        );
                      }}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr
                    key={index}
                    className="h-[40px] font-regular text-[#FFFFFF] text-[14px] leading-[16px]   "
                    style={{
                      borderBottom: index < 3 ? "0.5px solid #434343" : "none",
                    }}
                  >
                    <td className="w-[120px]    text-left px-[20px]">
                      {row.id}
                    </td>
                    <td
                      className="w-[210px]    text-center px-[20px]"
                      style={{ borderLeft: "0.5px solid #434343" }}
                    >
                      {row.type}
                    </td>
                    <td
                      className="  text-center px-[20px]"
                      style={{ borderLeft: "0.5px solid #434343" }}
                    >
                      {row.contact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <FilterDropdown
        isOpen={filterOpen !== null}
        onClose={() => setFilterOpen(null)}
        position={filterPosition}
        filterType={filterOpen as "type" | "contact" | null}
        options={getCurrentFilterOptions()}
      />
    </div>
  );
}

export default App;
