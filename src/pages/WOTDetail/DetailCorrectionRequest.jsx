import common from "@/common/common";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DynamicTable from "@/components/tables/DynamicTable";
import { DetailGrid } from "@/components/component/DetailGrid";
import DynamicTableAction from "@/components/tables/DynamicTableAction";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { date, dateWithTime } from "@/lib/utils";

const DetailCorrectionRequest = () => {
  const entity = "correctionRequest";

  const navigate = useNavigate();
  const { fy, branchCode, id } = useParams();

  const [loading, setLoading] = useState(false);
  const [detailGridData, setDetailGridData] = useState([]);
  const [challanDetails, setChallanDetails] = useState([]);
  const [correctionTracker, setCorrectionTracker] = useState([]);
  const [otherDetails, setOtherDetails] = useState([]);

  useEffect(() => {
    const fetchDetailListData = async () => {
      try {
        setLoading(true);
        const response = await common.getDetailListData(
          entity,
          fy,
          branchCode,
          id
        );
        setDetailGridData(response.data.details || {});
        setChallanDetails(response.data.details || {});
        setCorrectionTracker(response.data.remark || []);
        setOtherDetails(response.data.amountDetails || []);
      } catch (error) {
        console.error("Error fetching list data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetailListData();
  }, [branchCode, fy, id]);

  const categories = [
    { name: "Correction Tracker" },
    { name: "Other Details" },
  ];

  const fields = [
    { label: "Ticket Number", key: "ticketNumber" },
    { label: "Financial Year", key: "fy" },
    { label: "Quarter", key: "quarter" },
    { label: "Date of Request", key: "correctionRequestDate", formatter: date },
    { label: "Name of Customer", key: "name" },
    { label: "Type of Form", key: "typeOfForm" },
    { label: "Type of Correction", key: "typeOfCorrection" },
    { label: "PAN of Customer", key: "pan" },
    {
      label: "Mobile Number of who Generated Correction/Query Request",
      key: "mobileNumber",
      fullRow: true,
    },
    { label: "Response", key: "status" },
    { label: "Document", key: "fileName" },
  ];

  const fields1 = [
    { label: "Request Created By", key: "makerBy" },
    {
      label: "Request Created On",
      key: "correctionRequestDate",
      formatter: dateWithTime,
    },
    { label: "Status", key: "status" },
    { label: "Checker Approved By", key: "checkerApprovedBy" },
    {
      label: "Checker Approved On",
      key: "checkerApprovedOn",
      formatter: dateWithTime,
    },
    { label: "Tax Team Approved By", key: "taxTeamApprovedBy" },
    {
      label: "Tax Team Approved On",
      key: "taxTeamApprovedOn",
      formatter: dateWithTime,
    },
    { label: "Correction By", key: "correctionBy" },
    { label: "Correction On", key: "correctionOn", formatter: dateWithTime },
  ];

  const tableHeadCorrectionTracker = [
    { key: "srNo", label: "Sr.No" },
    { key: "correctionRemark", label: "Correction Response" },
    { key: "supportingDocName", label: "Supporting Document Name" },
    { key: "addedBy", label: "Added By" },
    { key: "dateTime", label: "Added On", formatter: dateWithTime },
    { key: "remarkStatus", label: "Action" },
  ];

  const tableDataCorrectionTracker = correctionTracker?.map((data, index) => ({
    srNo: index + 1,
    ...data,
  }));

  const tableHeadOtherDetails = [
    { key: "srNo", label: "Sr.No" },
    { key: "name", label: "Name" },
    { key: "dateOfPayment", label: "Date of Payment", formatter: date },
    { key: "tds", label: "TDS Amount" },
    { key: "amountPaid", label: "Gross Amount" },
    { key: "quarter", label: "Quarter" },
    { key: "pan", label: "PAN" },
    { key: "correctPan", label: "Correct PAN" },
    { key: "status", label: "Other Response" },
  ];
  const tableDataOtherDetails = otherDetails?.map((data, index) => ({
    srNo: index + 1,
    ...data,
  }));

  return (
    <>
      <div className="rounded-md border border-gray-100 p-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="ms-2 mb-5 text-2xl font-bold text-[var(--primary-color)]">
          Correction Details
        </h1>

        <DetailGrid fields={fields} data={detailGridData} columns={3} />
        <hr className="m-5 bg-gray-400" />
        <DetailGrid fields={fields1} data={challanDetails} columns={3} />
        <div className="mb-3 flex justify-end gap-4 py-5">
          <button
            className="cursor-pointer rounded-md bg-red-600 p-2 px-4 font-semibold text-white"
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-reply-all"></i>&nbsp; Back
          </button>
        </div>
        <TabGroup className="mx-2 flex w-full flex-col items-center">
          <TabList className="flex w-full justify-around rounded-md border-gray-200 bg-gray-100 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
            {categories.map(({ name }) => (
              <Tab
                key={name}
                className={({ selected }) =>
                  `w-full cursor-pointer space-x-1 rounded-md border-0 px-28 py-2 font-semibold ${
                    selected
                      ? "bg-[#1d3864] text-[#fff] outline-none"
                      : "w-full text-[#1d3864] outline-none"
                  }`
                }
              >
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="mt-9 w-full">
            <TabPanel
              key={categories.name}
              className="rounded-xl bg-gray-100 shadow-sm"
            >
              <DynamicTableAction
                tableHead={tableHeadCorrectionTracker}
                tableData={tableDataCorrectionTracker}
                loading={loading}
              />
            </TabPanel>
            <TabPanel
              key={categories.name}
              className="rounded-xl bg-white shadow-sm"
            >
              <DynamicTable
                tableHead={tableHeadOtherDetails}
                tableData={tableDataOtherDetails}
                loading={loading}
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </>
  );
};

export default DetailCorrectionRequest;
