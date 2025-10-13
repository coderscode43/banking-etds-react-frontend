import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { errorMessage } from "@/lib/utils";
import statusContext from "@/context/statusContext";
import common from "@/common/common";
import { Fragment, useContext, useEffect, useState } from "react";

const UpdateForm27QDeductee = ({ data }) => {
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
                    Update Form 27Q Deductee
                  </DialogTitle>
                  <form onSubmit={handleUpdate}>
                    <div className="justify-center px-5">
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
                            Customer/Vendor ID
                          </label>

                          <input
                            name="custVendId"
                            id="custVendId"
                            placeholder="Customer/Vendor Id"
                            value={formData?.custVendId || " "}
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
                            name="acctNo"
                            id="acctNo"
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
                            Deductee Reference No
                          </label>
                          <input
                            name="deducteeRefNo"
                            id="deducteeRefNo"
                            placeholder="Deductee Reference No"
                            value={formData?.deducteeRefNo || " "}
                            onChange={handleInputChange}
                            disabled="disabled"
                            className="mt-1 block w-full cursor-not-allowed rounded-md border border-gray-300 bg-[#f1f5fa] px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>

                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Unique Acknowledge No
                          </label>

                          <input
                            name="uniqueAcknowledgeNo"
                            id="uniqueAcknowledgeNo"
                            placeholder="Unique Knowledge No"
                            value={formData?.uniqueAcknowledgeNo || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>

                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            No of certificate under section
                          </label>
                          <input
                            name="certificateNumber"
                            id="certificateNumber"
                            placeholder="No of certificate under section"
                            value={formData?.certificateNumber || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Country
                          </label>

                          <input
                            name="countryOfResidence"
                            id="countryOfResidence"
                            placeholder="Country"
                            value={formData?.countryOfResidence || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>

                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            TDS Rate as Per IT Acts
                          </label>
                          <input
                            name="tdsRateAsPerItActs"
                            id="tdsRateAsPerItActs"
                            placeholder="TDS Rate as Per IT Acts"
                            value={formData?.tdsRateAsPerItActs || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Grossing Up Indicator
                          </label>

                          <input
                            type="date"
                            name="grossingUpIndicator"
                            id="grossingUpIndicator"
                            placeholder="Grossing Up Indicator"
                            value={formData?.grossingUpIndicator || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Email ID
                          </label>

                          <input
                            name="emailId"
                            id="emailId"
                            placeholder="Email ID"
                            value={formData?.emailId || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Contact No
                          </label>

                          <input
                            name="contactNoOfDeductee"
                            id="contactNoOfDeductee"
                            placeholder="Contact No"
                            value={formData?.contactNoOfDeductee || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Nature of Remittance
                          </label>
                          <input
                            name="natureOfRemittance"
                            id="natureOfRemittance"
                            placeholder="Nature of Remittance"
                            value={formData?.natureOfRemittance || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Deductee Code
                          </label>

                          <input
                            name="deducteeCode"
                            id="deducteeCode"
                            placeholder="Deductee Code"
                            value={formData?.deducteeCode || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Address of Deductee
                          </label>

                          <input
                            name="addressOfDeductee"
                            id="addressOfDeductee"
                            placeholder="Address of Deductee"
                            value={formData?.addressOfDeductee || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            PAN
                          </label>

                          <input
                            name="pan"
                            id="pan"
                            placeholder="PAN"
                            value={formData?.pan || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Tax Identification Number
                          </label>
                          <input
                            name="taxIdentificationNo"
                            id="taxIdentificationNo"
                            placeholder="Tax Identification Number"
                            value={formData?.taxIdentificationNo || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Name
                          </label>

                          <input
                            name="name"
                            id="name"
                            placeholder="Name"
                            value={formData?.name || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Cash Withdrawal 194N
                          </label>

                          <input
                            name="cashWithdrawal194N"
                            id="cashWithdrawal194N"
                            placeholder="Cash Withdrawal 194N"
                            value={formData?.cashWithdrawal194N || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Section Code
                          </label>
                          <input
                            name="sectionCode"
                            id="sectionCode"
                            placeholder="Section Collection Code"
                            value={formData?.sectionCode || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Cash Withdrawl 194N(20L to 1cr)
                          </label>
                          <input
                            name="cashWithdrawal194N20Lto1Cr"
                            id="cashWithdrawal194N20Lto1Cr"
                            placeholder="Cash Withdrawl 194N(20L to 1cr)"
                            value={formData?.cashWithdrawal194N20Lto1Cr || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Date Of Payment
                          </label>
                          <input
                            type="date"
                            name="dateOfPayment"
                            id="dateOfPayment"
                            placeholder="Date Of Payment"
                            value={formData?.dateOfPayment || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>

                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Cash Withdrawal 194N &gt;1Cr
                          </label>
                          <input
                            name="cashWithdrawal194N1Cr"
                            id="cashWithdrawal194N1Cr"
                            placeholder="Cash Withdrawal 194N >1Cr"
                            value={formData?.cashWithdrawal194N1Cr || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>
                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Amount Paid
                          </label>
                          <input
                            name="amountPaid"
                            id="amountPaid"
                            placeholder="Amount Paid"
                            value={formData?.amountPaid || " "}
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
                          <label className="text-[15px] font-semibold text-[var(--primary-color)]">
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
                            Total Tax Deducted
                          </label>

                          <input
                            name="totalTaxDeducted"
                            id="totalTaxDeducted"
                            placeholder="Total Tax Deducted"
                            value={formData?.totalTaxDeducted || " "}
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
                            Interest On Late Deduction
                          </label>

                          <input
                            name="interestOnLateDeduction"
                            id="interestOnLateDeduction"
                            placeholder="Interest On Late Deduction"
                            value={formData?.interestOnLateDeduction || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>

                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Date Of Deduction
                          </label>

                          <input
                            type="date"
                            name="dateOfDeduction"
                            id="dateOfDeduction"
                            placeholder="Date Of Deduction"
                            value={formData?.dateOfDeduction || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>

                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Reason for non Deduction
                          </label>

                          <input
                            name="remarksReason"
                            id="remarksReason"
                            placeholder="Reason for non Deduction"
                            value={formData?.remarksReason || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>

                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Reason for non Collection
                          </label>

                          <input
                            name="comments"
                            id="comments"
                            placeholder="Reason for non Deduction"
                            value={formData?.comments || " "}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        </div>

                        <div className="w-[32.5%]">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Rate at Which Tax Collected
                          </label>

                          <input
                            name="rateAtWhichTaxCollected"
                            id="rateAtWhichTaxCollected"
                            placeholder="Rate at Which Tax Collected"
                            value={formData?.rateAtWhichTaxCollected || " "}
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

export default UpdateForm27QDeductee;
