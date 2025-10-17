import common from "@/common/common";
import DynamicTableDownload from "@/components/tables/DynamicTableDownload";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailGrid } from "@/components/component/DetailGrid";
import AddResponseModalWOT from "@/components/correctionRequestModals/AddResponseModalWOT";
import statusContext from "@/context/statusContext";
import { errorMessage } from "@/lib/utils";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

const DetailCorrectionRequest = () => {
  const entity = "correctionRequest";
  const page = "correctionRemark";

  const navigate = useNavigate();
  const { fy, branchCode, id } = useParams();
  const { showSuccess, showError } = useContext(statusContext);

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
        setDetailGridData(response?.data?.details || []);
        setChallanDetails(response?.data?.ac || []);
        setCorrectionTracker(response?.data?.remark || []);
        setOtherDetails(response?.data?.amountDetails || []);
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
    { label: "Date of Request", key: "lastUpdatedOn" },
    { label: "Name of Customer", key: "name" },
    { label: "Type of Form", key: "typeOfForm" },
    { label: "Type of Correction", key: "typeOfCorrection" },
    { label: "PAN of Customer", key: "pan" },
    {
      label: "Mobile Number of who Generated Correction/Query Request",
      key: "mobileNumber",
      fullRow: true,
    },
    { label: "Response", key: "status", wideValue: true },
    {
      label: "Document",
      key: "fileName",
      type: "download",
      wideValue: true,
    },
  ];

  const fields1 = [
    { label: "Request Created By", key: "makerBy" },
    { label: "Request Created On", key: "correctionRequestDate" },
    { label: "Status", key: "status" },
    { label: "Checker Approved By", key: "checkerApprovedBy" },
    { label: "Checker Approved On", key: "checkerApprovedOn" },
    { label: "Tax Team Approved By", key: "taxTeamApprovedBy" },
    { label: "Tax Team Approved On", key: "taxTeamApprovedOn" },
    { label: "Correction By", key: "correctionBy" },
    { label: "Correction On", key: "correctionOn" },
  ];

  const challanGrid = [
    { label: "Challan Serial Number", key: "challanSrNo" },
    { label: "BSR Code", key: "challanBsrCode" },
    { label: "Challan Section", key: "challanSection" },
    { label: "Challan Amount", key: "challanAmount" },
    { label: "Challan Date", key: "challanDate" },
    {
      label: "Challan Supporting Document",
      key: "challanSupportingDocument",
      wideValue: true,
    },
  ];

  const tableHeadCorrectionTracker = [
    { label: "Sr.No", key: "srNo" },
    { label: "Correction Response", key: "correctionRemark" },
    { label: "Supporting Document Name", key: "supportingDocName" },
    { label: "Added By", key: "addedBy" },
    { label: "Added On", key: "dateTime" },
    { label: "Action", key: "download" },
  ];

  const tableDataCorrectionTracker = correctionTracker?.map((data, index) => ({
    srNo: index + 1,
    ...data,
  }));

  const tableHeadOtherDetails = [
    { label: "Sr.No", key: "srNo" },
    { label: "Name", key: "name" },
    { label: "Date of Payment", key: "dateOfPayment" },
    { label: "TDS Amount", key: "tds" },
    { label: "Gross Amount", key: "amountPaid" },
    { label: "Quarter", key: "quarter" },
    { label: "PAN", key: "pan" },
    { label: "Correct PAN", key: "correctPan" },
    { label: "Other Response", key: "status" },
  ];

  const tableDataOtherDetails = otherDetails?.map((data, index) => ({
    srNo: index + 1,
    ...data,
  }));

  const onGridDownload = async () => {
    try {
      await common.getDownloadDocument(entity, id);
      showSuccess("File Downloaded Successfully");
    } catch (error) {
      showError(errorMessage(error));
    }
  };

  const handleTableDownload = async (id) => {
    try {
      await common.getDownloadFile(page, id);
    } catch (error) {
      showError(
        `Can not download.
         ${error?.response?.data?.entityName}  
         ${errorMessage(error)}`
      );
    }
  };

  return (
    <>
      <div className="rounded-md border border-gray-100 p-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="ms-2 mb-5 text-2xl font-bold text-[var(--primary-color)]">
          Correction Details
        </h1>

        <DetailGrid
          fields={fields}
          data={detailGridData}
          columns={3}
          onDownload={onGridDownload}
        />
        <hr className="m-5 bg-gray-400" />
        <DetailGrid fields={fields1} data={detailGridData} columns={3} />
        {/* Back Button */}
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
                      ? "bg-[var(--secondary-color)] text-[#fff] outline-none"
                      : "w-full text-[var(--secondary-color)] outline-none"
                  }`
                }
              >
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="mt-5 w-full">
            <TabPanel key={categories.name} className="p-5">
              <div className="mb-2 flex items-center justify-end">
                <AddResponseModalWOT
                  entity={page}
                  branchCode={branchCode}
                  correctionRequestId={id}
                  detail={detailGridData}
                  fy={fy}
                />
              </div>
              <DynamicTableDownload
                tableHead={tableHeadCorrectionTracker}
                tableData={tableDataCorrectionTracker}
                loading={loading}
                downloadKey="supportingDocName"
                handleDownload={handleTableDownload}
              />
            </TabPanel>
            <TabPanel key={categories.name} className="p-5">
              <div className="mb-2 flex items-center justify-end">
                {/* <AddRegularReturnResponseModalWOT
                  entity={entity}
                  branchCode={branchCode}
                  correctionRequestId={id}
                  status={detailGridData?.remarkStatus}
                  fy={fy}
                  quarter={detailGridData?.quarter}
                /> */}
              </div>
              <DynamicTableDownload
                tableHead={tableHeadOtherDetails}
                tableData={tableDataOtherDetails}
                loading={loading}
              />
              <hr className="m-5 bg-gray-200" />
              <h1 className="ms-2 mb-5 text-2xl font-bold text-[var(--primary-color)]">
                Challan Details
              </h1>

              <DetailGrid
                fields={challanGrid}
                data={challanDetails}
                columns={3}
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </>
  );
};

export default DetailCorrectionRequest;
