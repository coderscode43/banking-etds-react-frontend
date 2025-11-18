import common from "@/common/common";
import { DetailGrid } from "@/components/component/DetailGrid";
import AddResponseModal from "@/components/correctionRequestModals/AddResponseModal";
import ApproveCorrectionModal from "@/components/correctionRequestModals/ApproveCorrectionModal";
import RegenerateCorrectionModal from "@/components/correctionRequestModals/RegenerateCorrectionModal";
import RejectResponseModal from "@/components/correctionRequestModals/RejectResponseModal";
import ResolvedCorrectionModal from "@/components/correctionRequestModals/ResolvedCorrectionModal";
import DynamicTableDownload from "@/components/tables/DynamicTableDownload";
import statusContext from "@/context/statusContext";
import { errorMessage, zipDownload } from "@/lib/utils";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DetailCorrectionRequest = () => {
  const entity = "correctionRequest";
  const page = "correctionRemark";

  const navigate = useNavigate();
  const { fy, branchCode, id } = useParams();
  const { showSuccess, showError } = useContext(statusContext);

  const [loading, setLoading] = useState(false);
  const [buttonData, setButtonData] = useState([]);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isResolveOpen, setIsResolveOpen] = useState(false);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [detailGridData, setDetailGridData] = useState({});
  const [addResponseOpen, setIsAddResponseOpen] = useState(false);
  const [isRegenerateOpen, setIsRegenerateOpen] = useState(false);
  const [correctionTracker, setCorrectionTracker] = useState([]);
  const [otherDetails, setOtherDetails] = useState([]);
  const [challanDetails, setChallanDetails] = useState({});

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
        setButtonData(response?.data?.button || []);
        setDetailGridData(response?.data?.details || {});
        setCorrectionTracker(response?.data?.remark || []);
        setOtherDetails(response?.data?.amountDetails || []);
        setChallanDetails(response?.data?.ac || {});
      } catch (error) {
        console.error("Error fetching list data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetailListData();
  }, [branchCode, fy, id]);

  const fields = [
    { label: "Ticket Number", key: "ticketNumber" },
    { label: "Financial Year", key: "fy" },
    { label: "Quarter", key: "quarter" },
    { label: "Date of Request", key: "correctionRequestDate" },
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
    { label: "Document", key: "fileName", type: "download", wideValue: true },
  ];

  const fields1 = [
    { label: "Request Created By", key: "makerBy" },
    { label: "Request Created On", key: "" },
    { label: "Status", key: "status" },
    { label: "Checker Approved By", key: "checkerApprovedBy" },
    { label: "Checker Approved On", key: "checkerApprovedOn" },
    { label: "Tax Team Approved By", key: "taxTeamApprovedBy" },
    { label: "Tax Team Approved On", key: "taxTeamApprovedOn" },
    { label: "Correction By", key: "correctionBy" },
    { label: "Correction On", key: "correctionOn" },
  ];

  const categories = [
    { name: "Correction Tracker" },
    { name: "Other Details" },
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
    { label: "Section", key: "sectionCode" },
    { label: "Correct Section", key: "correctSection" },
    { label: "Amount Paid", key: "amountPaid" },
    { label: "Correct Amount Paid", key: "correctAmountPaid" },
    { label: "TDS", key: "tds" },
    { label: "Correct TDS", key: "correctTds" },
    { label: "Other Responses", key: "action" },
  ];

  const tableDataOtherDetails = otherDetails?.map((data, index) => ({
    srNo: index + 1,
    ...data,
  }));

  const challanGrid = [
    { label: "Challan Serial Number", key: "challanSrNo" },
    { label: "BSR Code", key: "challanBsrCode" },
    { label: "Challan Section", key: "challanSection" },
    { label: "Challan Amount", key: "challanAmount" },
    { label: "Challan Date", key: "challanDate" },
    {
      label: "Challan Supporting Document",
      key: "challanSupportingDocument",
      type: "download",
      wideValue: true,
    },
  ];

  const onGridDownload = async (entity) => {
    try {
      if (entity === "correctionRequest") {
        const response = await common.getDownloadDocument(entity, id);
        showSuccess(
          response?.data?.succesMsg || "File Downloaded Successfully"
        );
        zipDownload(response);
      } else {
        const response = await common.getDownloadChallanDocument(entity, id);
        showSuccess(
          response?.data?.succesMsg || "File Downloaded Successfully"
        );
      }
    } catch (error) {
      showError(errorMessage(error));
    }
  };

  const handleTableDownload = async (id) => {
    try {
      const response = await common.getDownloadFile(page, id);
      showSuccess(response?.data?.succesMsg || "File Downloaded Successfully");
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
      <div className="rounded-md p-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="ms-2 mb-5 text-2xl font-bold text-[var(--primary-color)]">
          Correction Details
        </h1>
        <DetailGrid
          fields={fields}
          data={detailGridData}
          columns={3}
          onDownload={() => onGridDownload("correctionRequest")}
          loading={loading}
        />
        <hr className="m-5 bg-gray-400" />
        <DetailGrid
          fields={fields1}
          data={detailGridData}
          columns={3}
          loading={loading}
        />
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
          <TabPanels className="mt-9 w-full">
            <TabPanel key={categories.name}>
              <div className="mb-2.5 flex justify-end space-x-2">
                <AddResponseModal
                  entity={page}
                  isOpen={addResponseOpen}
                  setIsOpen={setIsAddResponseOpen}
                  branchCode={branchCode}
                  fy={fy}
                  correctionRequestId={id}
                  detail={detailGridData}
                />
                {buttonData?.CheckerApproved && (
                  <button
                    className="cursor-pointer rounded-md border border-amber-500 px-2 py-2 font-semibold text-amber-500 transition hover:bg-yellow-500 hover:text-white"
                    onClick={() => setIsApproveOpen(true)}
                  >
                    <i className="fa fa-thumbs-up"></i> Checker Approved
                  </button>
                )}

                {buttonData?.CorrectionApproved && (
                  <button
                    className="cursor-pointer rounded-md border border-gray-700 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-700 hover:text-white"
                    onClick={() => setIsApproveOpen(true)}
                  >
                    <i className="fa fa-thumbs-up"></i> Correction Uploaded
                  </button>
                )}

                {buttonData?.Resolved && (
                  <button
                    className="cursor-pointer rounded-md border border-green-600 px-4 py-2 font-semibold text-green-600 transition hover:bg-green-600 hover:text-white"
                    onClick={() => setIsResolveOpen(true)}
                  >
                    <i className="fa fa-thumbs-up"></i> Resolved
                  </button>
                )}

                {buttonData?.Rejected && (
                  <button
                    className="cursor-pointer rounded-md border border-red-600 px-4 py-2 font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                    onClick={() => setIsRejectOpen(true)}
                  >
                    <i className="fa fa-thumbs-down"></i> Reject
                  </button>
                )}

                {detailGridData.status === "Rejected" &&
                  detailGridData.regenarateRequest === true && (
                    <button
                      className="cursor-pointer rounded-md border border-cyan-500 px-4 py-2 font-semibold text-cyan-600 transition hover:bg-cyan-500 hover:text-white"
                      onClick={() => setIsRegenerateOpen(true)}
                    >
                      <i className="fa fa-refresh"></i> Regenerate Correction
                      Request
                    </button>
                  )}
              </div>
              <DynamicTableDownload
                tableHead={tableHeadCorrectionTracker}
                tableData={tableDataCorrectionTracker}
                loading={loading}
                downloadKey="supportingDocName"
                handleDownload={handleTableDownload}
              />
            </TabPanel>

            <TabPanel key={categories.name}>
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
                onDownload={() => onGridDownload("addChallan")}
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>

      {/* Approve Button Modal  */}
      <ApproveCorrectionModal
        entity={page}
        isOpen={isApproveOpen}
        setIsOpen={setIsApproveOpen}
        branchCode={branchCode}
        fy={fy}
        correctionRequestId={id}
        detail={detailGridData}
      />

      {/* Reject Button Modal */}
      <RejectResponseModal
        entity={page}
        isOpen={isRejectOpen}
        setIsOpen={setIsRejectOpen}
        branchCode={branchCode}
        fy={fy}
        correctionRequestId={id}
        detail={detailGridData}
      />

      {/* Resolve Button Modal */}
      <ResolvedCorrectionModal
        entity={page}
        isOpen={isResolveOpen}
        setIsOpen={setIsResolveOpen}
        branchCode={branchCode}
        fy={fy}
        correctionRequestId={id}
        detail={detailGridData}
      />

      {/* Regenrate Button Modal */}
      <RegenerateCorrectionModal
        entity={page}
        isOpen={isRegenerateOpen}
        setIsOpen={setIsRegenerateOpen}
        branchCode={branchCode}
        fy={fy}
        correctionRequestId={id}
        detail={detailGridData}
      />
    </>
  );
};

export default DetailCorrectionRequest;
