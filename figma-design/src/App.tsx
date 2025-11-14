function App() {
  const tabs = ["订单统计", "订单列表"];

  return (
    <div className="min-h-screen bg-white p-8">
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
                className="w-[83px] h-[40px]  flex items-center justify-center "
              >
                <div className="text-[14px] w-[70px] h-full  flex items-center justify-center   font-400 leading-[20px] tracking-[1px] text-[#FFFFFF] font-normal  border-b border-[#FFFFFF] ">
                  {tab}
                </div>
              </div>
            ))}
          </div>
          {/* 表格 */}
          <div>{/* <Table /> */}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
