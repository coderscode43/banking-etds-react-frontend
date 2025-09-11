import { DetailGrid } from "@/components/component/DetailGrid";
import { Navigate } from "react-router-dom";
import React from "react";
import DynamicTableEdit from "@/components/tables/DynamicTableEdit";

const DetailRegularReturn = () => {
  const navigate = Navigate;
  const handleNavigateBack = navigate(-1);
  const fields = [
    {
      label: "Financial Year  ",

      key: "fy",
    },

    {
      label: "TAN",

      key: "tan",
    },

    {
      label: "Quarter",

      key: "quarter",
    },

    {
      label: "Form",

      key: "form",
    },

    {
      label: "Added On",

      key: "addedOn",
    },

    {
      label: "Added By",

      key: "addedBy",
    },
    {
      label: "Latest Response",

      key: "latestRemark",
    },

    {
      label: "Status",

      key: "status",
    },

    {
      label: "Return Filing Date ",

      key: "returnFilingDate",
    },
  ];

  const data = [
    {
      id: 2291069,
      fy: "2024-25",
      tan: "MUMT08795D-HeadOffice",
      quarter: "Q1",
      form: "26Q-Other than Salary",
      branchCode: "100000",
      addedBy: "tejas",
      addedOn: "2025-08-07T17:23:02",
      latestRemark: "Test",
      status: "Data added from RO",
      returnFilingDate: "2025-08-01T00:00:00",
    },
  ];

  const tableHead = [
    {
      key: "srNo",
      label: "Sr.No",
    },
    {
      key: "",
      label: "Correction Response",
    },
    {
      key: "remarkStatus",
      label: "Status",
    },
    {
      key: "supportingDocName",
      label: "Supporting Document Name",
    },

    {
      key: "addedBy",
      label: "Added By",
    },
    {
      key: "addedOn",
      label: "Added On",
    },
    {
      key: "",
      label: "Action",
    },
  ];

  const tableData = [
    {
      id: 2291074,
      regularReturnId: 2291069,
      addedOn: "2025-08-07T17:25:42",
      remark: "Test",
      addedBy: "Khushi",
      roCode: "100000",
      supportingDocName: "Filename",
      remarkStatus: "Return filedddd",
    },

    {
      id: 2291075,
      regularReturnId: 2291069,
      addedOn: "2025-08-07T17:25:42",
      remark: "Test",
      addedBy: "Tejas",
      roCode: "100000",
      supportingDocName: "File",
      remarkStatus: "Return filed",
    },
  ];

  return (
    <>
      <div className="rounded-md p-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="ms-2 mb-5 text-2xl font-bold text-[var(--primary-color)]">
          Regular Return
        </h1>

        <DetailGrid fields={fields} data={data[0]} columns={2} />
        <div className="flex justify-end gap-4 pr-5">
          <button className="cursor-pointer rounded-md bg-blue-600 p-2 px-4 font-semibold text-white">
            <i class="fa-solid fa-plus"></i>&nbsp; Add Response
          </button>
          <button
            className="cursor-pointer rounded-md bg-red-600 p-2 px-4 font-semibold text-white"
            onClick={handleNavigateBack}
          >
            <i class="fa-solid fa-reply-all"></i>&nbsp; Back
          </button>
        </div>
        <div className="mt-5">
          <DynamicTableEdit tableHead={tableHead} tableData={tableData} />
        </div>
      </div>
    </>
  );
};

export default DetailRegularReturn;
