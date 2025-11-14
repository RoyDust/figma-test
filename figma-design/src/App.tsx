import { useState } from "react";
import clsx from "clsx";

function App() {
  const tabs = ["订单统计", "订单列表"];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-white p-8 flex justify-center items-center">
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
          <div className=" w-[572px] h-[211px] bg-[#0A0A0A] border border-[#43434380] rounded-[12px]"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
