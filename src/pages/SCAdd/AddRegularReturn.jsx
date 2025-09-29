import staticDataContext from "@/context/staticDataContext";
import clsx from "clsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const AddRegularReturn = () => {
  const navigate = useNavigate();
  const { Quarter, Tan, typeOfForm, financialYear } =
    useContext(staticDataContext);

  return (
    <>
      <div className="rounded-md p-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
          Add Regular Return
        </h1>

        <div className="mt-4">
          <div>
            <div className="mb-3 flex gap-3">
              <div className="w-full md:w-1/2">
                <label className="font-semibold text-[var(--primary-color)]">
                  Financial Year <span className="text-red-600">*</span>
                </label>
                <select
                  name="FY"
                  id="FY"
                  className={clsx(
                    "custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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
              <div className="w-full md:w-1/2">
                <label className="font-semibold text-[var(--primary-color)]">
                  TAN <span className="text-red-600">*</span>
                </label>
                <select
                  name="tan"
                  id="tan"
                  className={clsx(
                    "custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                  )}
                >
                  <option value="">Select TAN</option>
                  {Tan &&
                    Tan.length > 0 &&
                    Tan.map((tan, index) => {
                      return (
                        <option key={index} value={tan}>
                          {tan}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-full md:w-1/2">
                <label className="font-semibold text-[var(--primary-color)]">
                  Quarter<span className="text-red-600">*</span>
                </label>
                <select
                  name="quarter"
                  id="quarter"
                  className={clsx(
                    "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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
              <div className="w-full md:w-1/2">
                <label className="font-semibold text-[var(--primary-color)]">
                  Form <span className="text-red-600">*</span>
                </label>
                <select
                  name="form"
                  id="form"
                  className={clsx(
                    "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                  )}
                >
                  <option value="">Select Form</option>
                  {typeOfForm &&
                    typeOfForm.length > 0 &&
                    typeOfForm.map((form, index) => {
                      return (
                        <option key={index} value={form}>
                          {form}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
          <div className="mt-3 flex justify-end-safe gap-3">
            <button className="cursor-pointer rounded-md bg-green-600 p-2 px-4 font-semibold text-white">
              <i className="fa-solid fa-floppy-disk"></i>&nbsp; Save
            </button>
            <button
              className="cursor-pointer rounded-md bg-red-600 p-2 px-4 font-semibold text-white"
              onClick={() => navigate(-1)}
            >
              <i className="fa-solid fa-reply-all"></i>&nbsp; Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRegularReturn;
