import common from "@/common/common";
import { TooltipWrapper } from "@/components/component/Tooltip";
import DynamicTable from "@/components/tables/DynamicTable";
import staticDataContext from "@/context/staticDataContext";
import { Field, Label } from "@headlessui/react";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UploadCertificate = () => {
  const entity = "uploadCertificate";

  const { params } = useParams();
  const { Quarter, financialYear, typeOfCertificate } =
    useContext(staticDataContext);

  const [listData, setListData] = useState([]);
  const [gotoPage, setGotoPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchListData = async () => {
      try {
        const response = await common.getListData(entity);
        const count = response.data.count || 0;
        const pages = Math.ceil(count / 100);
        setTotalPages(pages);
        setListData(response.data.entities || []);
      } catch (error) {
        console.error("Error fetching list data:", error);
      }
    };

    fetchListData();
  }, []);

  const tableHead = [
    { key: "srNo", label: "Sr.No" },
    { key: "fileName", label: "Zip File" },
    { key: "userName", label: "Username" },
    { key: "tan", label: "Tan" },
    { key: "fy", label: "Financial Year" },
    { key: "quarter", label: "Quarter" },
    { key: "form", label: "Form" },
    { key: "uploadedTime", label: "Date" },
    { key: "status", label: "Status" },
  ];

  const tableData = listData?.map((data, index) => ({
    srNo: index + 1,
    ...data,
  }));

  const handlePagination = async (pageNo) => {
    setGotoPage(pageNo);
    setCurrentPage(pageNo);

    try {
      let response;
      if (params !== undefined) {
        response = await common.getSearchPagination(entity, pageNo, params);
      } else {
        response = await common.getPagination(entity, pageNo);
      }
      setListData(response.data.entities || []);
    } catch (err) {
      console.error("Error while loading next page:", err);
    }
  };

  return (
    <>
      <div className="space-y-5">
        <div className="flex justify-between gap-2">
          <h1 className="text-2xl font-bold text-[var(--primary-color)]">
            Upload Certificate
          </h1>
          <div>
            <button className="h-[38px] cursor-pointer rounded-sm bg-[#dc143c] px-2 text-white">
              Generate To Zip
            </button>
          </div>
        </div>
        <div>
          <Field className="flex flex-wrap gap-3">
            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                Quarter
              </Label>
              <select
                name="quarter"
                id="quarter"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none",
                  "h-[38px]"
                )}
              >
                <option value="">Select Quarter</option>
                {Quarter &&
                  Quarter.length > 0 &&
                  Quarter.map((quarter, index) => {
                    return (
                      <option key={index} value={quarter}>
                        {quarter}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                Financial Year
              </Label>
              <select
                name="FY"
                id="FY"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none",
                  "h-[38px]"
                )}
              >
                <option value="">Select Financial Year</option>
                {financialYear &&
                  financialYear.length > 0 &&
                  financialYear.map((fy, index) => {
                    return (
                      <option key={index} value={fy}>
                        {fy}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                Certificate
              </Label>
              <select
                name="certificate"
                id="certificate"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none",
                  "h-[38px]"
                )}
              >
                <option value="">Select Certificate</option>
                {typeOfCertificate &&
                  typeOfCertificate.length > 0 &&
                  typeOfCertificate.map((certificate, index) => {
                    return (
                      <option key={index} value={certificate}>
                        {certificate}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="mt-6.5 flex gap-2">
              <TooltipWrapper tooltipText="Search">
                <button className="h-[38px] cursor-pointer rounded-sm bg-[#03d87f] px-3 text-2xl font-black text-white">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </TooltipWrapper>
              <TooltipWrapper tooltipText="Upload Button">
                <button className="h-[38px] cursor-pointer rounded-sm bg-[#f5325c] px-3 text-2xl font-black text-white">
                  <i className="fa-solid fa-upload"></i>
                </button>
              </TooltipWrapper>
              <TooltipWrapper tooltipText="Export to Excel">
                <button className="h-[38px] cursor-pointer rounded-sm bg-[#1761fd] px-2 text-white">
                  Export to Excel
                </button>
              </TooltipWrapper>
            </div>
          </Field>
        </div>

        <DynamicTable tableHead={tableHead} tableData={tableData} />
      </div>

      {/* Pagination */}
      {listData.length > 0 && (
        <div className="my-5">
          <>
            <div className="flex items-center justify-center gap-5">
              <button
                className="cursor-pointer rounded-md bg-[#024dec] px-3 py-1 text-white disabled:bg-gray-400"
                disabled={currentPage === 1}
                onClick={() => handlePagination(currentPage - 1)}
              >
                Previous
              </button>
              <div className="flex items-center justify-center">
                <h5>
                  Displaying page{" "}
                  <span className="font-semibold">{currentPage}</span> of{" "}
                  <span className="font-semibold">{totalPages}</span>
                </h5>
              </div>
              <button
                className="cursor-pointer rounded-md bg-[#024dec] px-3 py-1 text-white disabled:bg-gray-400"
                disabled={currentPage === totalPages}
                onClick={() => handlePagination(currentPage + 1)}
              >
                Next
              </button>
            </div>

            {totalPages > 1 && (
              <div className="mt-5 flex items-center justify-center gap-3">
                <span>Go to</span>
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  value={gotoPage}
                  onChange={(e) => setGotoPage(Number(e.target.value))}
                  className="w-20 rounded-md border border-gray-400 p-0.5 text-center"
                />
                <button
                  className="ml-2 cursor-pointer rounded-md bg-green-700 px-4 py-1 text-white disabled:bg-gray-400 disabled:opacity-50"
                  disabled={gotoPage < 1 || gotoPage > totalPages}
                  onClick={() => handlePagination(gotoPage)}
                >
                  Go
                </button>
              </div>
            )}
          </>
        </div>
      )}
    </>
  );
};

export default UploadCertificate;
