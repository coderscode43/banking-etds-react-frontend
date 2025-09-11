import AIButton from "@/components/component/AIButton";
import DynamicTable from "@/components/tables/DynamicTable";
import React from "react";

const Homepage = () => {
  const tableHead = [
    { key: "month", label: "Month" },
    { key: "challanDate", label: "Due Date of Challan Payment" },
    { key: "returnDate", label: "Due Date Of Return Filling" },
  ];

  const tableData = [
    { month: "April", challanDate: "7 May", returnDate: "31 July" },
    { month: "May", challanDate: "7 June", returnDate: "31 July" },
    { month: "June", challanDate: "7 July", returnDate: "31 July" },
    {
      month: "July",
      challanDate: "7 August",
      returnDate: "31 October",
    },
    {
      month: "August",
      challanDate: "7 September",
      returnDate: "31 October",
    },
    {
      month: "September",
      challanDate: "7 October",
      returnDate: "31 October",
    },
    {
      month: "October",
      challanDate: "7 November",
      returnDate: "31 January",
    },
    {
      month: "November",
      challanDate: "7 December",
      returnDate: "31 January",
    },
    {
      month: "December",
      challanDate: "7 January",
      returnDate: "31 January",
    },
    {
      month: "January",
      challanDate: "7 February",
      returnDate: "31 May",
    },
    {
      month: "February",
      challanDate: "7 March",
      returnDate: "31 May",
    },
    { month: "March", challanDate: "30 April", returnDate: "31 May" },
  ];
  const today = new Date();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[today.getMonth()];
  return (
    <>
      <h2 className="my-5 text-center text-3xl font-medium text-[#303e67]">
        TDS Monthly Due Dates
      </h2>

      <div className="relative my-3 flex items-center justify-center">
        <DynamicTable
          tableHead={tableHead}
          tableData={tableData}
          month={month}
        />
      </div>

      <div className="sticky bottom-6 flex justify-end">
        <AIButton />
      </div>
    </>
  );
};

export default Homepage;
