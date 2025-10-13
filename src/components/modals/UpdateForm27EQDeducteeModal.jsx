import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import statusContext from "@/context/statusContext";
import common from "@/common/common";
import { errorMessage } from "@/lib/utils";
import { Fragment, useContext, useEffect, useState } from "react";

const UpdateForm27EQDeductee = ({ data }) => {
  const entity = "deducteeremark";

  let [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const { showSuccess, showError } = useContext(statusContext);

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const refinedFormData = common.convertToDateObject(formData);
    try {
      const response = await common.getSubmit(entity, refinedFormData);
      setIsOpen(false);
      showSuccess(response.data.successMsg);
    } catch (error) {
      setIsOpen(false);
      showError(
        `Cannot update ${error?.response?.data?.entityName} - ${errorMessage(error)}`
      );
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!name) return;

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="cursor-pointer rounded-md bg-blue-600 p-2 px-4 font-semibold text-white"
        >
          <i className="fa-solid fa-pen-to-square"></i>&nbsp; Edit
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 rounded-md"
          onClose={() => {}}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="relative w-full max-w-6xl transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h2"
                    className="mb-5 bg-[#eaf0f9] p-[2%] text-lg leading-6 font-medium text-gray-900"
                  >
                    Update Form 27EQ Deductee
                  </DialogTitle>
                  <form onSubmit={handleUpdate}>
                    <div className="justify-center px-6">
                      <Field className="mb-3 flex flex-wrap gap-3">
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Quarter
                          </label>
                          <input
                            name="quarter"
                            id="quarter"
                            placeholder="Quarter"
                            value={formData?.quarter || " "}
                            onChange={handleInputChange}
                            disabled="disabled"
                            className="mt-1 block w-full cursor-not-allowed rounded-md border border-gray-300 bg-[#f1f5fa] px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Month
                          </label>
                          <input
                            name="month"
                            id="month"
                            placeholder="Month"
                            value={formData?.month || " "}
                            onChange={handleInputChange}
                            disabled="disabled"
                            className="mt-1 block w-full cursor-not-allowed rounded-md border border-gray-300 bg-[#f1f5fa] px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Branch Code
                          </label>
                          <input
                            name="branchCode"
                            id="branchCode"
                            placeholder="Branch Code"
                            value={formData?.branchCode || " "}
                            onChange={handleInputChange}
                            disabled="disabled"
                            className="mt-1 block w-full cursor-not-allowed rounded-md border border-gray-300 bg-[#f1f5fa] px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Customer/Vendor ID
                          </label>
                          <input
                            name="customerVendorID"
                            id="customerVendorID"
                            placeholder="Customer/Vendor Id"
                            value={formData?.custVendId || " "}
                            onChange={handleInputChange}
                            disabled="disabled"
                            className="mt-1 block w-full cursor-not-allowed rounded-md border border-gray-300 bg-[#f1f5fa] px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            RO Code
                          </label>
                          <input
                            name="roCode"
                            id="roCode"
                            placeholder="RO Code"
                            value={formData?.roCode || " "}
                            onChange={handleInputChange}
                            disabled="disabled"
                            className="mt-1 block w-full cursor-not-allowed rounded-md border border-gray-300 bg-[#f1f5fa] px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            TAN
                          </label>
                          <input
                            name="TAN"
                            id="TAN"
                            placeholder="TAN"
                            value={formData?.TAN || " "}
                            onChange={handleInputChange}
                            disabled="disabled"
                            className="mt-1 block w-full cursor-not-allowed rounded-md border border-gray-300 bg-[#f1f5fa] px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Unique Ref No.
                          </label>
                          <input
                            name="uniqueRefNo"
                            id="uniqueRefNo"
                            placeholder="Unique Ref No."
                            value={formData?.uniqueRefNo || " "}
                            onChange={handleInputChange}
                            disabled="disabled"
                            className="mt-1 block w-full cursor-not-allowed rounded-md border border-gray-300 bg-[#f1f5fa] px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Account No
                          </label>
                          <input
                            name="accountNo"
                            id="accountNo"
                            placeholder="Account No"
                            value={formData?.acctNo || " "}
                            onChange={handleInputChange}
                            disabled="disabled"
                            className="mt-1 block w-full cursor-not-allowed rounded-md border border-gray-300 bg-[#f1f5fa] px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Challan Heading
                          </label>
                          <input
                            name="challanHeading"
                            id="challanHeading"
                            placeholder="Challan Heading"
                            value={formData?.challanHeading || " "}
                            onChange={handleInputChange}
                            disabled="disabled"
                            className="mt-1 block w-full cursor-not-allowed rounded-md border border-gray-300 bg-[#f1f5fa] px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Party Reference No
                          </label>
                          <input
                            name="deducteeRefNo"
                            id="deducteeRefNo"
                            placeholder="Party Reference No"
                            value={formData?.deducteeRefNo || " "}
                            onChange={handleInputChange}
                            disabled="disabled"
                            className="mt-1 block w-full cursor-not-allowed rounded-md border border-gray-300 bg-[#f1f5fa] px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Party Code
                          </label>
                          <input
                            name="deducteeCode"
                            id="deducteeCode"
                            placeholder="Party Code"
                            value={formData?.deducteeCode || " "}
                            onChange={handleInputChange}
                            disabled="disabled"
                            className="mt-1 block w-full cursor-not-allowed rounded-md border border-gray-300 bg-[#f1f5fa] px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            PAN of the Party
                          </label>
                          <input
                            name="pan"
                            id="pan"
                            placeholder="PAN of the Party"
                            value={formData?.pan || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Name of the Party
                          </label>
                          <input
                            name="name"
                            id="name"
                            placeholder="Name of the Party"
                            value={formData?.name || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Amount Receipt/Debited
                          </label>
                          <input
                            name="amountPaid"
                            id="amountPaid"
                            placeholder="Amount Receipt/Debited"
                            value={formData?.amountPaid || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Date of Received/Debited Date Of Payment
                          </label>
                          <input
                            type="date"
                            name="dateOfPayment"
                            id="dateOfPayment"
                            value={formData?.dateOfPayment || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            TDS
                          </label>
                          <input
                            name="tds"
                            id="tds"
                            placeholder="TDS"
                            value={formData?.tds || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Surcharge
                          </label>
                          <input
                            name="surcharge"
                            id="surcharge"
                            placeholder="Surcharge"
                            value={formData?.surcharge || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Education Cess
                          </label>
                          <input
                            name="eduCess"
                            id="eduCess"
                            placeholder="Education Cess"
                            value={formData?.eduCess || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Total Tax Collected
                          </label>
                          <input
                            name="totalTaxDeducted"
                            id="totalTaxDeducted"
                            placeholder="Total Tax Collected"
                            value={formData?.totalTaxDeducted || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Total Tax Deposited
                          </label>
                          <input
                            name="totalTaxDeposited"
                            id="totalTaxDeposited"
                            placeholder="Total Tax Deposited"
                            value={formData?.totalTaxDeposited || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Date of Collected
                          </label>
                          <input
                            type="date"
                            name="dateOfDeduction"
                            id="dateOfDeduction"
                            value={formData?.dateOfDeduction || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Total Value of Purchase
                          </label>
                          <input
                            name="totalValueofPurchase"
                            id="totalValueofPurchase"
                            placeholder="Total Value of Purchase"
                            value={formData?.totalValueofPurchase || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Rate at Which Tax Collected
                          </label>
                          <input
                            name="rateatwhichTaxCollected"
                            id="rateatwhichTaxCollected"
                            placeholder="Rate at which Tax Collected"
                            value={formData?.rateatwhichTaxCollected || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Reason for Non Collection
                          </label>
                          <input
                            name="remarksReason"
                            id="remarksReason"
                            placeholder="Reason for Non Collection"
                            value={formData?.remarksReason || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Section / Collection Code
                          </label>
                          <input
                            name="sectionCode"
                            id="sectionCode"
                            placeholder="Section / Collection Code"
                            value={formData?.sectionCode || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Certificate Number
                          </label>
                          <input
                            name="certificateNumber"
                            id="certificateNumber"
                            placeholder="Certificate Number"
                            value={formData?.certificateNumber || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Deductee is Non-Resident
                          </label>
                          <input
                            name="deducteeisNonResident"
                            id="deducteeisNonResident"
                            placeholder="Deductee is Non-Resident"
                            value={formData?.deducteeisNonResident || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Permanent Establishment
                          </label>
                          <input
                            name="permanentEstablishment"
                            id="permanentEstablishment"
                            placeholder="Permanent Establishment"
                            value={formData?.permanentEstablishment || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Reason For NonCollection F or G
                          </label>
                          <input
                            name="reasonForNonCollectionForG"
                            id="reasonForNonCollectionForG"
                            placeholder="Reason For NonCollection F or G"
                            value={formData?.reasonForNonCollectionForG || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="text-[15px] font-semibold text-[var(--primary-color)]">
                            If Answer to 681A is Yes Then Challan Number
                          </label>
                          <input
                            name="ifAnswerTo681AisyesthenChallanNumber"
                            id="ifAnswerTo681AisyesthenChallanNumber"
                            placeholder="If Answer to 681A is Yes Then Challan Number"
                            value={
                              formData?.ifAnswerTo681AisyesthenChallanNumber ||
                              " "
                            }
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Payment Of TDS To Central Government
                          </label>

                          <input
                            name="ifAnswerto681AisyesthenDateofpaymentofTDStoCentralGovernment"
                            id="ifAnswerto681AisyesthenDateofpaymentofTDStoCentralGovernment"
                            placeholder="Payment Of TDS To Central Government"
                            value={
                              formData?.ifAnswerto681AisyesthenDateofpaymentofTDStoCentralGovernment ||
                              " "
                            }
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Error Description
                          </label>
                          <input
                            name="errorDescription "
                            id="errorDescription"
                            placeholder="Error Description "
                            value={formData?.errorDescription || " "}
                            onChange={handleInputChange}
                            disabled="disabled"
                            className="mt-1 block w-full cursor-not-allowed rounded-md border border-gray-300 bg-[#f1f5fa] px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Warning Description
                          </label>
                          <input
                            name="waringDescription"
                            id="waringDescription"
                            placeholder="Warning Description"
                            value={formData?.warningDescription || " "}
                            onChange={handleInputChange}
                            disabled="disabled"
                            className="mt-1 block w-full cursor-not-allowed rounded-md border border-gray-300 bg-[#f1f5fa] px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Short Deduction
                          </label>
                          <input
                            name="shortDeduction"
                            id="shortDeduction"
                            placeholder="Short Deduction"
                            value={formData?.shortDeduction || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Interest On Short Deduction
                          </label>
                          <input
                            name="interestOnShortDeduction"
                            id="interestOnShortDeduction"
                            placeholder="Interest On Short Deduction"
                            value={formData?.interestOnShortDeduction || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Interest On Late Payment
                          </label>
                          <input
                            name="interestOnLatePayment"
                            id="interestOnLatePayment"
                            placeholder="Interest On Late Payment"
                            value={formData?.interestOnLatePayment || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Status
                          </label>
                          <input
                            name="status"
                            id="status"
                            placeholder="Status"
                            value={formData?.status || " "}
                            onChange={handleInputChange}
                            disabled="disabled"
                            className="mt-1 block w-full cursor-not-allowed rounded-md border border-gray-300 bg-[#f1f5fa] px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Interest on Late Deduction
                          </label>
                          <input
                            name="interestOnLateDeduction"
                            id="interestOnLateDeduction"
                            placeholder="Interest on Late Deduction"
                            value={formData?.interestOnLateDeduction || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                      </Field>
                      <div
                        className="absolute top-6 right-10 cursor-pointer"
                        onClick={closeModal}
                      >
                        <i className="fa-solid fa-x"></i>
                      </div>
                    </div>
                    <div className="mt-5 flex justify-end bg-[#eaf0f9] p-[2%]">
                      <button
                        type="submit"
                        className="mr-2.5 cursor-pointer rounded-md bg-[#1761fd] p-2 px-4 font-semibold text-white"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="cursor-pointer rounded-md bg-red-600 p-2 px-4 font-semibold text-white"
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default UpdateForm27EQDeductee;
