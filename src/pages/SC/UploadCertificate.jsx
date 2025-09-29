import common from "@/common/common";
import Pagination from "@/components/component/Pagination";
import { TooltipWrapper } from "@/components/component/Tooltip";
import GenerateZipFiles from "@/components/modals/GenerateZipFiles";
import UploadCertificateModal from "@/components/modals/UploadCertificateModal";
import DynamicTable from "@/components/tables/DynamicTable";
import staticDataContext from "@/context/staticDataContext";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UploadCertificate = () => {
  const entity = "uploadCertificate";

  const { params } = useParams();
  const navigate = useNavigate();
  const { Quarter, financialYear, typeOfCertificate } =
    useContext(staticDataContext);

  const [listData, setListData] = useState([]);
  const [gotoPage, setGotoPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    quarter: "",
    fy: "",
    form: "",
  });

  useEffect(() => {
    const fetchListData = async () => {
      try {
        let response;
        if (params) {
          const pageNo = 0;
          response = await common.getSearchListData(entity, pageNo, params);
          setSearchParams({
            quarter: "",
            fy: "",
            form: "",
          });
        } else {
          response = await common.getListData(entity);
        }

        setListData(response.data.entities || []);
        const count = response.data.count || 0;
        const pages = Math.ceil(count / 100);
        setTotalPages(pages);
      } catch (error) {
        console.error("Error fetching list data:", error);
      }
    };

    fetchListData();
  }, [params]);

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

  const handleSearch = async () => {
    const refinedParams = common.getRefinedSearchParams(searchParams);
    navigate(`/home/listSearch/${entity}/${refinedParams}`);
  };

  const handleGenerateExcel = async () => {
    const refinedParams = common.getRefinedSearchParams(searchParams);
    await common.getGenerateExcel(entity, refinedParams);
  };

  return (
    <>
      <div className="space-y-5">
        <div className="flex justify-between gap-2">
          <h1 className="text-2xl font-bold text-[var(--primary-color)]">
            Upload Certificate
          </h1>
          <div>
            <GenerateZipFiles />
            {/* <button className="h-[38px] cursor-pointer rounded-sm bg-[#dc143c] px-2 text-white">
              Generate Zip Files
            </button> */}
          </div>
        </div>
        <div>
          <div className="flex flex-wrap gap-3">
            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                Quarter
              </label>
              <select
                name="quarter"
                id="quarter"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none",
                  "h-[38px]"
                )}
                value={searchParams.quarter}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
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
              <label className="font-semibold text-[var(--primary-color)]">
                Financial Year
              </label>
              <select
                name="fy"
                id="fy"
                className={
                  "custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                }
                value={searchParams.fy}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
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
              <label className="font-semibold text-[var(--primary-color)]">
                Certificate
              </label>
              <select
                name="form"
                id="form"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none",
                  "h-[38px]"
                )}
                value={searchParams.form}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
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
                <button
                  onClick={handleSearch}
                  className="h-[38px] cursor-pointer rounded-sm bg-[#03d87f] px-3 text-2xl font-black text-white"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </TooltipWrapper>
              {/* <TooltipWrapper tooltipText="Upload Button">
                <button className="h-[38px] cursor-pointer rounded-sm bg-[#f5325c] px-3 text-2xl font-black text-white">
                  <i className="fa-solid fa-upload"></i>
                </button>
              </TooltipWrapper> */}
              <UploadCertificateModal />
              <TooltipWrapper tooltipText="Export to Excel">
                <button
                  onClick={handleGenerateExcel}
                  className="h-[38px] cursor-pointer rounded-sm bg-[#1761fd] px-3 text-2xl text-white"
                >
                  <i className="fa-solid fa-file-excel"></i>
                </button>
              </TooltipWrapper>
            </div>
          </div>
        </div>

        <DynamicTable tableHead={tableHead} tableData={tableData} />
      </div>

      {/* Pagination */}
      {listData.length > 0 && (
        <Pagination
          entity={entity}
          setListData={setListData}
          totalPages={totalPages}
          gotoPage={gotoPage}
          setGotoPage={setGotoPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default UploadCertificate;
