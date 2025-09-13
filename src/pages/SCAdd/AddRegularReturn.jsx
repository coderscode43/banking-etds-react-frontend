import clsx from "clsx";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Field, Label } from "@headlessui/react";

const AddRegularReturn = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="rounded-md p-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
          Add Regular Return
        </h1>

        <div className="mt-4">
          <Field className="">
            <div className="mb-3 flex gap-3">
              <div className="w-full md:w-1/2">
                <Label className="font-semibold text-[var(--primary-color)]">
                  Financial Year <span className="text-red-600">*</span>
                </Label>
                <select
                  name="FY"
                  id="FY"
                  className={clsx(
                    "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                  )}
                >
                  <option value="">Select Financial Year</option>
                  <option value="2025-26">2025-26</option>
                  <option value="2024-25">2024-25</option>
                  <option value="2023-24">2023-24</option>
                </select>
              </div>
              <div className="w-full md:w-1/2">
                <Label className="font-semibold text-[var(--primary-color)]">
                  TAN <span className="text-red-600">*</span>
                </Label>
                <select
                  name="tan"
                  id="tan"
                  className={clsx(
                    "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                  )}
                >
                  <option value="">Select TAN</option>
                  <option value="tan1">TAN 1</option>
                  <option value="tan2">TAN 2</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-full md:w-1/2">
                <Label className="font-semibold text-[var(--primary-color)]">
                  Quarter<span className="text-red-600">*</span>
                </Label>
                <select
                  name="quarter"
                  id="quarter"
                  className={clsx(
                    "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                  )}
                >
                  <option value="">Select Quarter</option>
                  <option value="Q1">Q1</option>
                  <option value="Q2">Q2</option>
                  <option value="Q3">Q3</option>
                </select>
              </div>
              <div className="w-full md:w-1/2">
                <Label className="font-semibold text-[var(--primary-color)]">
                  Form <span className="text-red-600">*</span>
                </Label>
                <select
                  name="form"
                  id="form"
                  className={clsx(
                    "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                  )}
                >
                  {" "}
                  <option value="">Select Form</option>
                  <option value="Form1">Form 1</option>
                  <option value="Form2">Form 2</option>
                  <option value="Form3">Form 3</option>
                </select>
              </div>
            </div>
          </Field>
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
