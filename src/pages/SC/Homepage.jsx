import DynamicTableEdit from "@/components/tables/DynamicTableEdit";
import React from "react";

const Homepage = () => {
  const tableHead = [
    { key: "month", label: "Month" },
    { key: "challanDueDate", label: "Due Date of Challan Payment" },
    { key: "returnDueDate", label: "Due Date Of Return Filling" },
  ];

  const tableData = [
    { month: "April", challanDueDate: "7 May", returnDueDate: "31 July" },
    { month: "April", challanDueDate: "7 May", returnDueDate: "31 July" },
    { month: "April", challanDueDate: "7 May", returnDueDate: "31 July" },
    { month: "April", challanDueDate: "7 May", returnDueDate: "31 July" },
    { month: "April", challanDueDate: "7 May", returnDueDate: "31 July" },
    { month: "April", challanDueDate: "7 May", returnDueDate: "31 July" },
    { month: "April", challanDueDate: "7 May", returnDueDate: "31 July" },
    { month: "April", challanDueDate: "7 May", returnDueDate: "31 July" },
    { month: "April", challanDueDate: "7 May", returnDueDate: "31 July" },
    { month: "April", challanDueDate: "7 May", returnDueDate: "31 July" },
    { month: "April", challanDueDate: "7 May", returnDueDate: "31 July" },
    { month: "April", challanDueDate: "7 May", returnDueDate: "31 July" },
  ];

  return (
    <>
      <h2 className="my-5 text-center text-3xl font-medium text-[#303e67]">
        TDS Monthly Due Dates
      </h2>

      <div className="relative my-3 flex items-center justify-center">
        <DynamicTableEdit tableHead={tableHead} tableData={tableData} />
      </div>

      <div className="aishadow absolute right-2 bottom-3 flex w-1/6 cursor-pointer rounded-xl bg-linear-to-r from-indigo-600 to-pink-500 px-2 py-2 text-[#ffffff]">
        <span>
          <img
            className="mx-3 h-8 w-6 cursor-move text-white brightness-0 invert saturate-100 filter transition-transform duration-500 hover:rotate-y-[180deg]"
            src="/images/ROBO-TRANSPARENT.png"
            alt="HELP"
          />
        </span>

        <p className="text-base">Get Data With AI</p>
      </div>
    </>
  );
};

export default Homepage;
